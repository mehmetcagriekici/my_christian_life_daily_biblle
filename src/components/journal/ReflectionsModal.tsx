"use client";

//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ReadReflection from "./ReadReflection";
import ReflectionForm from "./ReflectionForm";
import ReflectionsList from "@/components/journal/ReflectionsList";

import { TBibleReading, TReflection, TSaint } from "@/utils/types";
import { useEffect } from "react";
import { setReflections } from "@/store/slices/reflectionSlice";

export default function ReflectionsModal({
  id,
  reflections,
  saints,
  bibleData,
}: {
  id: string;
  reflections: { [key: string]: TReflection };
  saints: TSaint[];
  bibleData: TBibleReading;
}) {
  //get current reflection and the toggle from the ui state
  const { isReading, showList } = useAppSelector((s) => s.reflection);
  const dispatch = useAppDispatch();

  //init global reflections
  useEffect(() => {
    dispatch(setReflections(reflections));
  }, [reflections, dispatch]);

  return isReading ? (
    <ReadReflection />
  ) : showList ? (
    <ReflectionsList />
  ) : (
    <ReflectionForm
      id={id}
      saints={saints}
      bibleData={bibleData}
      reflections={reflections}
    />
  );
}
