"use server";

//imports;
import { createClient } from "@/lib/supabaseServer";
import { typeSignupUser } from "@/utils/types";
import { revalidatePath } from "next/cache";
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

  revalidatePath("/", "layout");
  redirect("/");
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

  revalidatePath("/", "layout");
  redirect("/");
}
