//import
import { typeAuthIcons } from "@/utils/types";
import BibleReading from "@/components/homepage/BibleReading";
import Footer from "@/components/homepage/Footer";
import AuthClient from "@/components/homepage/AuthClient";
import NavBar from "@/components/homepage/NavBar";
import SaintReading from "@/components/homepage/SaintReading";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import { Divider } from "@mui/material";

//home page
export default function HomePage() {
  //icons for AuthClient
  const authIcons: typeAuthIcons = {
    on: {
      icon: <CreateIcon />,
      label: "Express Your Thoughts",
    },
    off: {
      icon: <LoginIcon />,
      label: "Log In to Reflect",
    },
  };

  //app
  return (
    <main className="h-dvh w-dvw relative overflow-hidden bg-gray-200 overflow-y-auto flex flex-col justify-safe-center items-safe-center dark:bg-slate-900">
      <NavBar />
      <div className="absolute top-16 flex flex-col justify-center items-center">
        {/*Reading container*/}
        <div className="flex flex-col justify-center items-center ">
          <BibleReading />
          <Divider flexItem variant="middle" className="bg-yellow-500" />
          <SaintReading />
        </div>
        {/*Enter a reflection, or login*/}
        <AuthClient icons={authIcons} />
        <Footer />
      </div>
    </main>
  );
}
