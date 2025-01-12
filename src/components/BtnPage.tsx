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
      className="flex flex-col justify-center items-center font-ui text-stone-800 font-bold capitalize"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
