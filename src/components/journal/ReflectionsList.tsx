"use client";

//imports
import { useAppDispatch } from "@/store/hooks";
import {} from "@/store/slices/authUiSlice";
import {
  closeList,
  openReading,
  setCurrentReflection,
} from "@/store/slices/reflectionSlice";
import { TReflection } from "@/utils/types";
import BookIcon from "@mui/icons-material/Book";
import BtnPage from "../BtnPage";

export default function ReflectionsList({
  reflections,
}: {
  reflections: { [key: string]: TReflection };
}) {
  //click on a reflection, open ReadReflection, close ReflectionForm
  //set current reflection to the ui state

  const dispatch = useAppDispatch();

  function onClick(reflection: TReflection) {
    dispatch(setCurrentReflection(reflection));
    dispatch(openReading());
  }

  //close reflections list, open form
  function openReflectionForm() {
    dispatch(closeList());
  }

  return (
    <ul className="w-full h-full xl:w-3/5 flex flex-col justify-safe-center items-safe-center gap-5 overflow-y-auto p-3 rounded-xl select-none">
      <li>
        {/*show reflection form*/}
        <BtnPage onClick={openReflectionForm}>open reflection form</BtnPage>
      </li>
      {reflections
        ? Object.entries(reflections).map(([key, value]) => (
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
          ))
        : ""}
    </ul>
  );
}
