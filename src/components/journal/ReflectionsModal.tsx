"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import ReadReflection from "./ReadReflection";
import ReflectionForm from "./ReflectionForm";
import ReflectionsList from "@/components/journal/ReflectionsList";

import { TReflection } from "@/utils/types";

export default function ReflectionsModal({
  id,
  reflections,
}: {
  id: string;
  reflections: { [key: string]: TReflection };
}) {
  //get current reflection and the toggle from the ui state
  const { isReading, showList } = useAppSelector((s) => s.reflection);

  return isReading ? (
    <ReadReflection />
  ) : showList ? (
    <ReflectionsList reflections={reflections} />
  ) : (
    <ReflectionForm id={id} reflections={reflections} />
  );
}
