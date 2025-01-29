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
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/Loading";

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
  //navigation is loading

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function navigate(href: string) {
    startTransition(() => {
      router.push(href);
    });
  }

  function navigateHome() {
    navigate("/");
  }

  function navigateRosary() {
    navigate("/rosary");
  }

  function navigateJournal() {
    navigate("/journal");
  }

  function navigateProfile() {
    navigate("/profile");
  }

  if (isPending) return <Loading />;

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full">
      <ul className="w-full h-full flex justify-center items-center gap-4 p-2 border-b-2 border-red-800 bg-red-50 md:gap-8 text-xs md:text-base dark:bg-slate-900 dark:border-white">
        {/*Dark mode toggle*/}
        <ThemeToggle />
        <NavListElement onClick={navigateHome} icon={navIcons.home} />
        <NavListElement onClick={navigateRosary} icon={navIcons.rosary} />
        {isLoggedIn && (
          <NavListElement onClick={navigateJournal} icon={navIcons.journal} />
        )}
        {isLoggedIn && (
          <NavListElement onClick={navigateProfile} icon={navIcons.profile} />
        )}
        {isLoggedIn ? <NavLogout /> : <NavLogin />}
      </ul>
    </nav>
  );
}
