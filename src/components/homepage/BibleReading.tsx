//daily bible reading component

//imports
import { Divider } from "@mui/material";
import PresentText from "../PresentText";
import { TBibleReading } from "@/utils/types";
import HomeContainer from "./HomeContainer";

export default function BibleReading({ bible }: { bible: TBibleReading }) {
  //get data
  const { dataHeading, dataReading1, dataReading2, dataPsalms, dataGospel } =
    bible;

  return (
    <HomeContainer>
      <h1 className="font-serifPrimary font-bold uppercase tracking-wider text-2xl text-stone-900 lg:text-3xl text-center dark:text-gray-200">
        {dataHeading}
      </h1>
      <Divider flexItem variant="middle" className="bg-crimson dark:bg-white" />
      <PresentText
        heading={dataReading1.heading}
        textArray={dataReading1.textArray}
      />
      <Divider flexItem variant="middle" className="bg-crimson dark:bg-white" />
      <PresentText
        heading={dataPsalms.heading}
        textArray={dataPsalms.textArray}
      />
      <Divider flexItem variant="middle" className="bg-crimson dark:bg-white" />
      {dataReading2.heading && (
        <>
          <PresentText
            heading={dataReading2.heading}
            textArray={dataReading2.textArray}
          />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-white"
          />
        </>
      )}
      <PresentText
        heading={dataGospel.heading}
        textArray={dataGospel.textArray}
      />
    </HomeContainer>
  );
}
