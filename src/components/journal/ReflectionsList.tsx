"use client";

//imports
import { TReflection } from "@/utils/types";

export default function ReflectionsList({
  reflections,
}: {
  reflections: TReflection[];
}) {
  //click on a reflection, open ReadReflection, close ReflectionForm
  //set current reflection to the ui state
  return (
    <ul>
      {reflections.map((r, i) => (
        <li key={i}>{r.reflection_date}</li>
      ))}
    </ul>
  );
}
