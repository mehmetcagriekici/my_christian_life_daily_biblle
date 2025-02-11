"use server";

//imports
import { createClient } from "@/lib/supabase";
import { TReflection } from "@/utils/types";

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

//insert reflection
export async function sendReflection({
  id,
  reflection_data,
}: {
  id: string;
  reflection_data: TReflection;
}) {
  const supabase = await createClient();

  //check if the user has already reflections table
  const { data: reflections } = await supabase
    .from("reflections")
    .select("*")
    .eq("id", id);

  if (reflections?.length) {
    //update reflections

    const { error } = await supabase
      .from("reflections")
      .update({
        reflections: {
          ...reflections[0].reflections,
          [reflection_data.reflection_date]: reflection_data,
        },
      })
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);
  } else {
    //insert a reflection
    const first_reflection = {
      [reflection_data.reflection_date]: reflection_data,
    };

    const { error } = await supabase
      .from("reflections")
      .insert({ id, reflections: first_reflection })
      .select();

    if (error) throw new Error(error.message);
  }
}
