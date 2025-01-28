"use client";

//imports
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
import EditProfile from "./EditProfileForm";
import UserInfo from "./UserInfo";
import { useAppSelector } from "@/store/hooks";

export default function EditModal({
  userData, //initial data
}: {
  userData: {
    [key: string]: string | number;
  };
}) {
  //icons that will be used in the formm and in the user information
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

  //state to toggle edit form
  const { openEdit } = useAppSelector((s) => s.location);

  return (
    <div className="absolute top-3/4 left-1/2 z-20 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3 flex flex-col justify-center items-center gap-3">
      {/*edit form and user information*/}
      {openEdit ? (
        <EditProfile icons={icons} initialStateData={userData} />
      ) : (
        <UserInfo icons={icons} initialStateData={userData} />
      )}
    </div>
  );
}
