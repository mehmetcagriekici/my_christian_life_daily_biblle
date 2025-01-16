//Large button for pages

import React from "react";

export default function BtnPage({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="h-full w-full flex flex-col justify-center items-center font-ui text-sky-800 font-bold capitalize hover:text-stone-800 hover:cursor-pointer hover:underline dark:text-gray-200 dark:hover:text-gold"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
