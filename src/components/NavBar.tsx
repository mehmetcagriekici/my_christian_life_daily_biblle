"use client";

//imports
import ThemeToggle from "./homepage/ThemeToggle";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavListElement from "./NavListElement";
import ChurchIcon from "@mui/icons-material/Church";
import NavLogout from "./auth/NavLogout";
import NavLogin from "./auth/NavLogin";

//navigate between roots
//home
//auth
//journal
//toggle

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
  rosary: {
    emoji: <ChurchIcon />,
    label: "rosary",
  },
};

//profile
export default function NavBar({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full">
      <ul className="w-full h-full flex justify-center items-center gap-4 p-2 border-b-2 border-red-800 bg-red-50 md:gap-8 text-xs md:text-base dark:bg-slate-900 dark:border-white">
        {/*Dark mode toggle*/}
        <ThemeToggle />
        <NavListElement href="/" icon={navIcons.home} />
        <NavListElement href="/rosary" icon={navIcons.rosary} />
        {isLoggedIn && (
          <NavListElement href="/journal" icon={navIcons.journal} />
        )}
        {isLoggedIn && (
          <NavListElement href="/profile" icon={navIcons.profile} />
        )}
        {isLoggedIn ? <NavLogout /> : <NavLogin />}
      </ul>
    </nav>
  );
}
