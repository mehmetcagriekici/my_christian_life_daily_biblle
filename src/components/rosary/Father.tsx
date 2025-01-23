"use client";

import { useAppSelector } from "@/store/hooks";

export default function Father() {
  const { isLatin } = useAppSelector((s) => s.rosary);

  return (
    <div className="w-full p-5">
      {/*some meaningful image*/}
      <p className="w-full text-amber-900 font-serifSecondary tracking-wider text-center dark:text-amber-100 leading-relaxed">
        {isLatin
          ? `
    Pater noster, qui es in cælis, sanctificétur nomen tuum;  
    advéniat regnum tuum; fiat volúntas tua, sicut in cælo et in terra.  
    Panem nostrum quotidiánum da nobis hódie, et dimítte nobis débita nostra,  
    sicut et nos dimíttimus debitóribus nostris;  
    et ne nos indúcas in tentatiónem, sed líbera nos a malo. Amen.
    `
          : `
    Our Father, who art in heaven, hallowed be Thy name;  
    Thy kingdom come; Thy will be done on earth as it is in heaven.  
    Give us this day our daily bread, and forgive us our trespasses,  
    as we forgive those who trespass against us;  
    and lead us not into temptation, but deliver us from evil. Amen.
    `}
      </p>
    </div>
  );
}
