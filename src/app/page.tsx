//import
import BibleReading from "@/components/homepage/BibleReading";
import Footer from "@/components/homepage/Footer";
import NavBar from "@/components/NavBar";
import SaintReading from "@/components/homepage/SaintReading";
import { Divider } from "@mui/material";
import OpenReflection from "@/components/homepage/OpenReflection";
import { checkSession } from "@/services/getUser";

//home page
export default async function HomePage() {
  const isLoggedIn = await checkSession();
  //app
  return (
    <main className="h-dvh w-dvw relative overflow-hidden bg-gray-200 overflow-y-auto flex flex-col justify-safe-center items-safe-center dark:bg-slate-900">
      <NavBar isLoggedIn={isLoggedIn} />

      <div className="absolute top-16 flex flex-col justify-center items-center">
        {/*Reading container*/}
        <div className="flex flex-col justify-center items-center ">
          <BibleReading />
          <Divider
            flexItem
            variant="middle"
            className="bg-yellow-500 dark:bg-white"
          />
          <SaintReading />
        </div>
        {/*if logged in express your thoughts button*/}
        <OpenReflection />
        <Divider
          flexItem
          variant="middle"
          className="bg-yellow-500 dark:bg-white"
        />
        <Footer />
      </div>
    </main>
  );
}
