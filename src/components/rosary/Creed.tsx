"use client";

//imports
import { useAppSelector } from "@/store/hooks";

export default function Creed() {
  const { isLatin } = useAppSelector((s) => s.rosary);
  return (
    <p className="w-full text-sky-900 font-quoteSecondary tracking-wider text-center dark:text-sky-100 leading-relaxed">
      {isLatin
        ? `  
    Credo in Deum, Patrem omnipoténtem, Creatórem cæli et terræ,  
    et in Iesum Christum, Fílium eius únicum, Dóminum nostrum,  
    qui concéptus est de Spíritu Sancto, natus ex María Vírgine,  
    passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus;  
    descéndit ad ínferos; tértia die resurréxit a mórtuis;  
    ascéndit ad cælos, sedet ad déxteram Dei Patris omnipoténtis;  
    inde ventúrus est iudicáre vivos et mórtuos.  
    Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam,  
    sanctórum communiónem, remissiónem peccatórum,  
    carnis resurrectiónem, vitam ætérnam. Amen.
    `
        : `
    I believe in God, the Father Almighty, Creator of heaven and earth,  
    and in Jesus Christ, His only Son, our Lord,  
    who was conceived by the Holy Spirit, born of the Virgin Mary,  
    suffered under Pontius Pilate, was crucified, died, and was buried;  
    He descended into hell; on the third day He rose again from the dead;  
    He ascended into heaven, and is seated at the right hand of God the Father Almighty;  
    from there He will come to judge the living and the dead.  
    I believe in the Holy Spirit, the holy Catholic Church,  
    the communion of saints, the forgiveness of sins,  
    the resurrection of the body, and life everlasting. Amen.
          `}
    </p>
  );
}
