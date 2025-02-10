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
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/Loading";
import { Drawer } from "@mui/material";
import BtnPage from "./BtnPage";
import MenuIcon from "@mui/icons-material/Menu";

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
  //navigation loading
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  //drawer
  const [open, setOpen] = useState(false);

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
    <nav className="fixed top-3 right-3 md:right-5 md:top-4 lg:right-10 lg:top-5 xl:right-14 xl:top-6">
      <BtnPage onClick={() => setOpen(true)}>
        <MenuIcon />
      </BtnPage>

      <Drawer open={open} anchor="top" onClose={() => setOpen(false)}>
        <ul className="flex justify-center items-center gap-4 p-2 border-b-2 border-red-800 bg-red-50 md:gap-8 text-xs md:text-base dark:bg-slate-900 dark:border-white">
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
      </Drawer>
    </nav>
  );
}
