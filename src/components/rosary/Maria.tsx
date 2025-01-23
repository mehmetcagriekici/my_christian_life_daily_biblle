"use client";

import { useAppSelector } from "@/store/hooks";

export default function Father() {
  const { isLatin } = useAppSelector((s) => s.rosary);

  return (
    <div className="w-full p-5">
      {/*some meaningful image*/}
      <p className="w-full text-teal-900 font-serifPrimary tracking-wider text-center dark:text-teal-100 leading-relaxed">
        {isLatin
          ? `
    Ave Maria, gratia plena, Dominus tecum;  
    benedícta tu in muliéribus, et benedíctus fructus ventris tui, Jesus.  
    Sancta Maria, Mater Dei, ora pro nobis peccatóribus,  
    nunc et in hora mortis nostræ. Amen.
    `
          : `
    Hail Mary, full of grace, the Lord is with thee;  
    blessed art thou among women, and blessed is the fruit of thy womb, Jesus.  
    Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.
    `}
      </p>
    </div>
  );
}
