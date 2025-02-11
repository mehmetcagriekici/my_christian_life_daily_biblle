//import
import BibleReading from "@/components/homepage/BibleReading";
import Footer from "@/components/homepage/Footer";
import NavBar from "@/components/NavBar";
import SaintReading from "@/components/homepage/SaintReading";
import { Divider } from "@mui/material";
import { checkSession } from "@/services/getUser";
import { orgBible } from "@/services/getBible";
import { orgSaints } from "@/services/getSaint";
import { format } from "date-fns";
import ErrorComponent from "@/components/Error";

//home page
export default async function HomePage() {
  //server
  const isLoggedIn = await checkSession();

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

  //app
  return (
    <main className="h-dvh w-dvw relative overflow-hidden bg-gray-200 overflow-y-auto flex flex-col justify-safe-center items-safe-center dark:bg-gray-900">
      <NavBar isLoggedIn={isLoggedIn} />
      <BibleReading
        bible={{
          dataGospel,
          dataHeading,
          dataPsalms,
          dataReading1,
          dataReading2,
        }}
      />
      <Divider
        flexItem
        variant="middle"
        className="bg-yellow-500 dark:bg-white"
      />
      <SaintReading saints={saints} />
      <Footer />
    </main>
  );
}
