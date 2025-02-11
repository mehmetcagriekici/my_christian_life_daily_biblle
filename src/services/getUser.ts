"use server";

//imports;
import { createClient } from "@/lib/supabase";
import { typeSignupUser } from "@/utils/types";
import { redirect } from "next/navigation";

export async function checkSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  return true;
}

//get user data
export async function getUserData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const userId = user.id;

  //getting the data from the server
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  return { userData };
}

//supabase functions to login, signup, and edit user profile
//logout
export async function userLogout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);

  redirect("/auth");
}

//login
export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
}

//signup
export async function userSignup({
  user,
  password,
}: {
  user: typeSignupUser;
  password: string;
}) {
  const supabase = await createClient();

  //email and password for supabase auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: user.email,
    password,
    options: {
      data: user,
    },
  });

  if (authError) throw new Error(authError.message);

  const userID = authData.user?.id;

  if (!userID) throw new Error("User ID not found after signup!");

  //insert the user into the server
  const { error } = await supabase
    .from("users")
    .insert({ ...user, id: userID })
    .select();

  if (error) throw new Error(error.message);
}

//update user auth
export async function updateUser({
  data,
}: {
  data: { [key: string]: string };
}) {
  const supabase = await createClient();

  //update user in auth
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    data,
  });

  if (error) throw new Error(error.message);

  if (!user)
    throw new Error("An error occured while updating the user profile.");

  //update users table
  const { error: tableError } = await supabase
    .from("users")
    .update(data)
    .eq("id", user.id)
    .select();

  if (tableError) throw new Error(tableError.message);
}

//update user avatar
export async function updateAvatar({
  file_name,
  file,
}: {
  file_name: string;
  file: File;
}) {
  //get user id for unique file name
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  if (!user)
    throw new Error(
      "An error occured trying the fetch user from the server while updating the user avatar."
    );

  const fileName = `${user.id}/${file_name}`;

  //update storage
  const { error: uploadError } = await supabase.storage
    .from("user_images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  //update users avatar string
  //incase it is not updated in update user
  const { error: updateError } = await supabase
    .from("users")
    .update({ avatar: fileName })
    .eq("id", user.id);

  if (updateError) throw new Error(updateError.message);
}
