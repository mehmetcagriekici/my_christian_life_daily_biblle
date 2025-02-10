"use client";

import { useAppSelector } from "@/store/hooks";

export default function Father() {
  const { isLatin } = useAppSelector((s) => s.rosary);

  return (
    <p className="w-full text-gray-900 font-serifPrimary tracking-wider text-center dark:text-gray-100 leading-relaxed">
      {isLatin
        ? `
          O mi Iesu, dimítte nobis debíta nostra, salva nos ab ignibus inférni,  
          perduc omnes animas ad cælum, præsertim eos qui misericórdiæ tuæ maxime indigent. Amen.
          `
        : `
          O my Jesus, forgive us our sins, save us from the fires of hell,  
          lead all souls to heaven, especially those in most need of Thy mercy. Amen.
          `}
    </p>
  );
}
