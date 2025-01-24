//imports
import { createClient } from "@/lib/supabaseServer";

//select user reflections
//use only in server components
export async function getReflections({ id }: { id: string }) {
  const supabase = await createClient();

  //reflections will be created after user initiation, might not exist
  const { data: reflections } = await supabase
    .from("reflections")
    .select("*")
    .eq("id", id)
    .single();

  return { reflections };
}
