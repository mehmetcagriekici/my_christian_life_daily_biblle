//imports
import ReflectionsModal from "@/components/journal/ReflectionsModal";
import NavBar from "@/components/NavBar";
import { getReflections } from "@/services/getReflections";
import { getUserData } from "@/services/getUser";
import { Suspense } from "react";
import Loading from "./Loading";
import { orgBible } from "@/services/getBible";
import ErrorComponent from "@/components/Error";
import { orgSaints } from "@/services/getSaint";
import { format } from "date-fns";
export default async function JournalPage() {
  //get user id
  const {
    userData: { id },
  }: { userData: { [key: string]: string } } = await getUserData();

  //get reflections with the user id
  //might be null
  const response = await getReflections({ id });

  //today
  const today = format(new Date(), "yyyMMdd");

  //fetch bible data from the api
  const resBible = await fetch(
    `http://feed.evangelizo.org/v2/reader.php?date=${today}&lang=AM&type=all`
  );

  if (!resBible.ok)
    return (
      <ErrorComponent message="An error occured while getting Bible data from the evangelizo api." />
    );

  //convert html to objects using the structure of the API
  const bibleHtml = await resBible.text();

  const { dataGospel, dataHeading, dataPsalms, dataReading1, dataReading2 } =
    orgBible(bibleHtml);

  //fetch saint data from the api
  const resSaint = await fetch(
    `http://feed.evangelizo.org/v2/reader.php?date=${today}&lang=AM&type=saint`
  );

  if (!resSaint.ok)
    return (
      <ErrorComponent message="And error occured while getting Saints data from the evangelizo api." />
    );

  const saintHtml = await resSaint.text();

  //convert html to objects using the structure of the API
  const { saints } = orgSaints(saintHtml);

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex flex-col justify-center items-center dark:bg-gray-950">
      {/*NavBar*/}
      <NavBar isLoggedIn={true} />

      <Suspense fallback={<Loading />}>
        {/*client component that controls the list, read, and the form.*/}
        <ReflectionsModal
          id={id}
          reflections={response.reflections?.reflections}
          bibleData={{
            dataGospel,
            dataHeading,
            dataPsalms,
            dataReading1,
            dataReading2,
          }}
          saints={saints}
        />
      </Suspense>
    </div>
  );
}
