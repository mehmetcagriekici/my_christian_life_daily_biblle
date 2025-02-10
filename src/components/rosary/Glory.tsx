"use client";

import { useAppSelector } from "@/store/hooks";

export default function Father() {
  const { isLatin } = useAppSelector((s) => s.rosary);

  return (
    <p className="w-full text-crimson font-serifPrimary tracking-wider text-center dark:text-gold leading-relaxed">
      {isLatin
        ? `
          Glória Patri, et Fílio, et Spíritui Sancto,  
          sicut erat in principio, et nunc, et semper, et in sæcula sæculórum. Amen
          `
        : `
          Glory be to the Father, and to the Son, and to the Holy Spirit,  
          as it was in the beginning, is now, and ever shall be, world without end. Amen.
          `}
    </p>
  );
}
