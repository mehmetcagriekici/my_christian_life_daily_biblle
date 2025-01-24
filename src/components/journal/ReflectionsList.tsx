"use client";

//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {} from "@/store/slices/authUiSlice";
import {
  closeReading,
  openReading,
  setCurrentReflection,
} from "@/store/slices/reflectionSlice";
import { TReflection } from "@/utils/types";
import BookIcon from "@mui/icons-material/Book";

export default function ReflectionsList({
  reflections,
}: {
  reflections: { [key: string]: TReflection };
}) {
  //click on a reflection, open ReadReflection, close ReflectionForm
  //set current reflection to the ui state

  const dispatch = useAppDispatch();
  const { isReading } = useAppSelector((s) => s.reflection);

  function onClick(reflection: TReflection) {
    dispatch(setCurrentReflection(reflection));

    if (isReading) dispatch(closeReading());
    else dispatch(openReading());
  }

  return (
    <ul className="w-full flex flex-col justify-safe-center items-safe-center gap-5 overflow-y-auto bg-gray-50 p-3 rounded-xl border-2 border-crimson dark:bg-gray-800 dark:border-gold select-none">
      {Object.entries(reflections).map(([key, value]) => (
        <li
          key={key}
          className="w-10/12 flex flex-col justify-center items-center p-5 rounded-xl shadow bg-yellow-100 tracking-wide text-gray-900 hover:cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-200"
          onClick={() => onClick(value)}
        >
          <BookIcon className="text-crimson" />
          <span className="font-quotePrimary text-sky-700">
            {value.reflection_date}
          </span>
          <span className="w-full text-nowrap truncate font-serifPrimary">
            {value.reflection}
          </span>
        </li>
      ))}
    </ul>
  );
}
