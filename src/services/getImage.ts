//imports
import { createClient } from "@/lib/supabaseClient";

//create a signed url for the user avatar
export default async function getSignedUrl(filePath: string) {
  const supabase = createClient();

  //get user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  if (user) {
    const { data, error } = await supabase.storage
      .from("user_images")
      .createSignedUrl(`${user.id}/${filePath}`, 3600);

    if (error) throw new Error(error.message);

    return { signedUrl: data.signedUrl };
  }

  return { signedUrl: "" };
}
