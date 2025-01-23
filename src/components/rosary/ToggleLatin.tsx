"use client";

//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BtnPage from "../BtnPage";
import { toggleLatin } from "@/store/slices/rosarySlice";

export default function ToggleLatin() {
  const dispatch = useAppDispatch();
  const { isLatin } = useAppSelector((s) => s.rosary);

  return (
    <BtnPage
      onClick={() => {
        dispatch(toggleLatin());
      }}
    >
      {isLatin ? "Latin" : "English"}
    </BtnPage>
  );
}
