"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import ReadReflection from "./ReadReflection";
import ReflectionForm from "./ReflectionForm";

import { TReflection } from "@/utils/types";

export default function ReflectionsModal({
  id,
  today,
}: {
  id: string;
  today: TReflection;
}) {
  //user can only have one reflection per day

  //get current reflection and the toggle from the ui state
  const { isReading, currentReflection } = useAppSelector((s) => s.reflection);

  return (
    <div className="w-full h-1/2 flex flex-col justify-center items-center">
      {currentReflection ? (
        isReading ? (
          <ReadReflection />
        ) : (
          <ReflectionForm id={id} reflectionToday={today} />
        )
      ) : (
        <ReflectionForm id={id} reflectionToday={today} />
      )}
    </div>
  );
}
