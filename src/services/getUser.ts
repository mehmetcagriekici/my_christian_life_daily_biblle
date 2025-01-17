//imports
import { supabase } from "@/lib/supabaseClient";
import { typeSignupUser } from "@/utils/types";

//get user
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user };
}

//supabase functions to login, signup, and edit user profile
//logout
export async function userLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

//login
export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { data };
}

//signup
export async function userSignup({
  user,
  password,
}: {
  user: typeSignupUser;
  password: string;
}) {
  //email and password for supabase auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: user.email,
    password,
    options: {
      data: user,
    },
  });

  if (authError) throw new Error(authError.message);

  //insert the user into the server
  const { data, error } = await supabase
    .from("users")
    .insert([{ ...user }])
    .select();

  if (error) throw new Error(error.message);

  return { userData: data, auth: authData };
}
