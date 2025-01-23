"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import { ROSARY_DATA_ENG } from "@/utils/rosaryDataEnglish";
import { ROSARY_DATA_LAT } from "@/utils/rosaryDataLatin";
import { Divider } from "@mui/material";
import { format } from "date-fns";

export default function Mystery({ index }: { index: number }) {
  //lang
  const { isLatin } = useAppSelector((s) => s.rosary);

  //get the day
  const today = format(new Date(), "EEEE").toLocaleLowerCase() as
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  //today's mystery with current index
  const currentMyster = isLatin
    ? ROSARY_DATA_LAT[today][index]
    : ROSARY_DATA_ENG[today][index];

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <h3 className="w-full text-black font-quotePrimary tracking-wide text-center dark:text-white">
        {currentMyster.name}
      </h3>
      <h5 className="w-full text-sky-900 font-serifPrimary tracking-wider text-center dark:text-crimson leading-relaxed">
        {currentMyster.parentGroup}
      </h5>
      <p className="w-full text-stone-900 font-serifSecondary tracking-wider text-center dark:text-stone-100 leading-relaxed">
        {currentMyster.announcement}
      </p>
      <Divider flexItem variant="middle" className="bg-black dark:bg-white" />
      <p className="w-full text-stone-900 font-serifSecondary tracking-wider text-center dark:text-stone-100 leading-relaxed">
        {currentMyster.scripture}
      </p>
      <p className="w-full text-sky-900 font-quotePrimary tracking-wider text-center dark:text-gold text-sm">
        {currentMyster.citation}
      </p>
      <Divider flexItem variant="middle" className="bg-black dark:bg-white" />
      <p className="w-full text-stone-900 font-serifSecondary tracking-wider text-center dark:text-stone-100 leading-relaxed">
        {currentMyster.extraNotes}
      </p>
    </div>
  );
}
