//imports
import React from "react";

export default function RosaryContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 p-5 flex flex-col justify-center items-center gap-3">
      {children}
    </div>
  );
}
