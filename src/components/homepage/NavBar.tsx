//imports
import AuthClient from "./AuthClient";
import DarkClient from "./DarkClient";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import NavListElement from "./NavListElement";

//navigate between roots
//home
//auth
//journal
//toggle

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

const navIcons = {
  home: {
    emoji: <HomeIcon />,
    label: "home",
  },
  journal: {
    emoji: <LibraryBooksIcon />,
    label: "journal",
  },
  profile: {
    emoji: <AccountCircleIcon />,
    label: "profile",
  },
};

//profile
export default function NavBar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full">
      <ul className="w-full h-full flex justify-center items-center gap-4 p-2 border-b-2 border-red-800 bg-red-50 md:gap-8">
        {/*Dark mode toggle*/}
        <DarkClient />
        <NavListElement href="/" icon={navIcons.home} />
        <NavListElement href="/journal" icon={navIcons.journal} />
        <NavListElement href="/profile" icon={navIcons.profile} />
        {/*Auth toggle, change it with mui icons*/}
        <AuthClient icons={authIcons} />
      </ul>
    </nav>
  );
}
