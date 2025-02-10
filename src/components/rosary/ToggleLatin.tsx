"use client";

//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleLatin } from "@/store/slices/rosarySlice";
import TranslateIcon from "@mui/icons-material/Translate";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function ToggleLatin() {
  const dispatch = useAppDispatch();
  const { isLatin } = useAppSelector((s) => s.rosary);

  function onClick() {
    dispatch(toggleLatin());
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center capitalize p-1 rounded mt-2 font-ui bg-gray-600 text-gray-200 hover:cursor-pointer hover:bg-gray-500 select-none "
    >
      <div className="flex flex-col justify-center items-center font-serifSecondary">
        <TranslateIcon className={isLatin ? "text-gold" : "text-crimson"} />
        <span>rosary language</span>
      </div>
      {isLatin ? (
        <div className="flex gap-2">
          <AutoStoriesIcon className="text-gold" />
          <span className="font-quotePrimary text-yellow-100">latin</span>
        </div>
      ) : (
        <div className="flex gap-2">
          <AutoStoriesIcon className="text-crimson" />
          <span className="font-quotePrimary text-red-100">english</span>
        </div>
      )}
    </button>
  );
}
