"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
//imports
import ReadReflection from "./ReadReflection";
import ReflectionForm from "./ReflectionForm";
import BtnPage from "../BtnPage";
import { toggleForm } from "@/store/slices/reflectionSlice";

export default function ReflectionsModal({ id }: { id: string }) {
  //user can only have one reflection per day
  //toggle between form and read
  const dispatch = useAppDispatch();
  //get current reflection and the toggle from the ui state
  const { isReading, currentReflection } = useAppSelector((s) => s.reflection);

  function toggleReflection() {
    dispatch(toggleForm()); //for the reflection
  }

  return (
    <div>
      {currentReflection ? (
        <BtnPage onClick={toggleReflection}>
          {isReading ? "open reflection form" : "open selected reflection"}
        </BtnPage>
      ) : (
        ""
      )}

      {currentReflection ? (
        isReading ? (
          <ReadReflection reflection={currentReflection} />
        ) : (
          <ReflectionForm id={id} />
        )
      ) : (
        <ReflectionForm id={id} />
      )}
    </div>
  );
}
