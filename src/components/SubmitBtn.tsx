//imports
import React from "react";

export default function SubmitBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="font-ui font-black tracking-wide p-2 pl-5 pr-5 rounded-full border-2 border-gray-700 text-lg text-sky-900 bg-gray-200 hover:cursor-pointer hover:text-stone-800 hover:underline hover:bg-white hover:border-crimson"
    >
      {children}
    </button>
  );
}
