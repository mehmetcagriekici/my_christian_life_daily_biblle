"use client";

//imports
import { useAppSelector } from "@/store/hooks";

export default function Cross() {
  //get lang
  const { isLatin } = useAppSelector((s) => s.rosary);

  return (
    <div className="w-full p-5">
      {/*Cross Image*/}
      <p className="w-full text-gray-900 font-quotePrimary tracking-wide text-center dark:text-gray-100">
        {isLatin
          ? "In nomine Patris, et Filii, et Spiritus Sancti. Amen."
          : "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."}
      </p>
    </div>
  );
}
