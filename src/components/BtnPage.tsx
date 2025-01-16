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
      className="flex flex-col justify-center items-center font-ui text-sky-800 font-bold capitalize hover:text-stone-800 hover:cursor-pointer hover:underline"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
