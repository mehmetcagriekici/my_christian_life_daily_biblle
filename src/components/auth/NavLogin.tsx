import Link from "next/link";

import LoginIcon from "@mui/icons-material/Login";

export default function NavLogin() {
  return (
    <li>
      <Link
        href="/auth"
        className="flex flex-col justify-center items-center capitalize font-ui text-sky-800 font-bold tracking-wide hover:text-stone-800 hover:cursor-pointer hover:underline dark:text-gray-200 dark:hover:text-gold"
      >
        <LoginIcon />
        <span>login</span>
      </Link>
    </li>
  );
}
