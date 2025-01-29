//imports
import { JSX, MouseEventHandler } from "react";

export default function NavListElement({
  onClick,
  icon,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: { emoji: JSX.Element; label: string };
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex flex-col justify-center items-center capitalize font-ui text-sky-800 font-bold tracking-wide hover:text-stone-800 hover:cursor-pointer hover:underline dark:text-gray-200 dark:hover:text-gold"
        type="button"
      >
        {icon.emoji}
        <span>{icon.label}</span>
      </button>
    </li>
  );
}
