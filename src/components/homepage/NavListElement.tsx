import Link from "next/link";
import { JSX } from "react";

export default function NavListElement({
  href,
  icon,
}: {
  href: string;
  icon: { emoji: JSX.Element; label: string };
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex flex-col justify-center items-center capitalize font-ui text-sky-800 font-bold tracking-wide hover:text-stone-800 hover:cursor-pointer hover:underline"
      >
        {icon.emoji}
        <span>{icon.label}</span>
      </Link>
    </li>
  );
}
