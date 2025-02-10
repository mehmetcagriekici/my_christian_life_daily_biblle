//import
import BibleReading from "@/components/homepage/BibleReading";
import Footer from "@/components/homepage/Footer";
import NavBar from "@/components/NavBar";
import SaintReading from "@/components/homepage/SaintReading";
import { Divider } from "@mui/material";
import { checkSession } from "@/services/getUser";
import { getDailyBible } from "@/services/getBible";
import { getSaintOfTheDay } from "@/services/getSaint";

//home page
export default async function HomePage() {
  const isLoggedIn = await checkSession();
  //get bible
  const { dataGospel, dataHeading, dataPsalms, dataReading1, dataReading2 } =
    await getDailyBible();
  //get saints
  const { saints } = await getSaintOfTheDay();

  //app
  return (
    <main className="h-dvh w-dvw relative overflow-hidden bg-gray-200 overflow-y-auto flex flex-col justify-safe-center items-safe-center dark:bg-slate-900">
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
