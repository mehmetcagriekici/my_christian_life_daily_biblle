//imports
import NavBar from "@/components/NavBar";
import EditProfile from "@/components/profile/EditProfileForm";
import JournalSummary from "@/components/profile/JournalSummary";
import UserInfo from "@/components/profile/UserInfo";
import { getUserData } from "@/services/getUser";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import PublicIcon from "@mui/icons-material/Public";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ChurchIcon from "@mui/icons-material/Church";
import BadgeIcon from "@mui/icons-material/Badge";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import { Divider } from "@mui/material";
import DividerText from "@/components/DividerText";

export default async function ProfilePage() {
  //get user data from the server
  const { userData }: { userData: { [key: string]: string | number } } =
    await getUserData();

  //icons
  const icons = {
    email: <EmailIcon className="text-sky-700 dark:text-sky-100" />,
    username: <AccountCircleIcon className="text-sky-700 dark:text-sky-100" />,
    age: <CalendarMonthIcon className="text-sky-700 dark:text-sky-100" />,
    gender: <WcIcon className="text-sky-700 dark:text-sky-100" />,
    region: <PublicIcon className="text-sky-700 dark:text-sky-100" />,
    sub_region: <SouthAmericaIcon className="text-sky-700 dark:text-sky-100" />,
    country: <LanguageIcon className="text-sky-700 dark:text-sky-100" />,
    state: <FlagIcon className="text-sky-700 dark:text-sky-100" />,
    city: <LocationCityIcon className="text-sky-700 dark:text-sky-100" />,
    church: <ChurchIcon className="text-sky-700 dark:text-sky-100" />,
    clergy_member: <BadgeIcon className="text-sky-700 dark:text-sky-100" />,
    avatar: <PersonIcon className="text-sky-700 dark:text-sky-100" />,
  };

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-slate-950">
      {/*NavBar, if there is not session, the app will redirect to auth page*/}
      <NavBar isLoggedIn={true} />
      {/*display user journal list*/}
      <JournalSummary />

      {/*Open Edit Proflie Form*/}
      <EditProfile icons={icons} initialStateData={userData} />

      <div className="absolute top-3/4 left-1/2 z-20 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3 flex flex-col justify-center items-center gap-3">
        <Divider
          flexItem
          variant="middle"
          className="hidden md:flex dark:bg-white"
        />
        <DividerText
          quote="Dominus illuminatio mea et salus mea; quem timebo?"
          psalm="Psalm 26:1"
        />

        {/*display user information*/}
        <UserInfo icons={icons} initialStateData={userData} />

        <Divider flexItem variant="middle" className="dark:bg-white" />
        <DividerText
          quote="Dominus petra mea, et fortitudo mea, et salvator meus."
          psalm="Psalm 17:2"
        />
      </div>
    </div>
  );
}
