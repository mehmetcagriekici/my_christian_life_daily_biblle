//imports
import AuthClient from "./AuthClient";
import DarkClient from "./DarkClient";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

//navigate between roots
//home
//auth
//journal
//toggle

//styles
//navbar list element
const listElementStyles =
  "flex flex-col justify-center items-center capitalize font-ui text-stone-800 font-bold tracking-wide";

const authIcons = {
  on: {
    icon: <LogoutIcon />,
    label: "logout",
  },

  off: {
    icon: <LoginIcon />,
    label: "login",
  },
};

//profile
export default function NavBar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full">
      <ul className="w-full h-full flex justify-center items-center gap-4 p-2 border-b-2 border-red-800 bg-red-50 md:gap-8">
        {/*Dark mode toggle*/}
        <DarkClient />
        <li className={listElementStyles}>
          <HomeIcon />
          home
        </li>
        <li className={listElementStyles}>
          <LibraryBooksIcon />
          journal
        </li>
        <li className={listElementStyles}>
          <AccountCircleIcon />
          profile
        </li>
        {/*Auth toggle, change it with mui icons*/}
        <AuthClient icons={authIcons} />
      </ul>
    </nav>
  );
}
