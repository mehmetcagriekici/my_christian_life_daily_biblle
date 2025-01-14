//daily bible reading component
//data coming from the api

//imports
import { getDailyBible } from "@/services/getBible";
import { STYLES_HEADING_PRIMARY } from "@/utils/commonStyles";
import { Divider } from "@mui/material";
import PresentText from "../PresentText";

export default async function BibleReading() {
  //get data
  const { dataHeading, dataReading1, dataReading2, dataPsalms, dataGospel } =
    await getDailyBible();

  return (
    <section className="flex flex-col justify-center items-center p-5 gap-4 md:bg-gray-100 mt-3 mb-5 md:w-3/5 lg:w-2/5 overflow-y-auto">
      <h1 className={STYLES_HEADING_PRIMARY}>{dataHeading}</h1>
      <Divider flexItem variant="middle" className="bg-red-500" />
      <PresentText
        heading={dataReading1.heading}
        textArray={dataReading1.textArray}
      />
      <Divider flexItem variant="middle" className="bg-red-500" />
      <PresentText
        heading={dataPsalms.heading}
        textArray={dataPsalms.textArray}
      />
      <Divider flexItem variant="middle" className="bg-red-500" />
      {dataReading2.heading && (
        <>
          <PresentText
            heading={dataReading2.heading}
            textArray={dataReading2.textArray}
          />
          <Divider flexItem variant="middle" className="bg-red-500" />
        </>
      )}
      <PresentText
        heading={dataGospel.heading}
        textArray={dataGospel.textArray}
      />
    </section>
  );
}
