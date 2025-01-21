//imports
import { Divider } from "@mui/material";
import Image from "next/image";
import { JSX } from "react";

export default function UserInfo({
  data,
  icons,
}: {
  data: [string, string | number][];
  icons: { [x: string]: JSX.Element };
}) {
  return (
    <ul className="w-full flex flex-col justify-safe-center items-safe-center gap-3 border-2 border-gold rounded-lg p-3 overflow-y-auto bg-gray-100 select-none dark:border-white dark:bg-gray-900 md:text-xl">
      {data.map((d, i) =>
        d[0] === "avatar" ? (
          <div key={i} className="flex gap-3 justify-center items-center">
            {icons[d[0]]}
            <span className="capitalize font-serifSecondary tracking-wide text-gray-800 dark:text-gray-200">
              {d[0]}:
            </span>
            {d[1] ? (
              "avatar"
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/app_images/default-user.jpg`}
                alt="default avatar"
                height={80}
                width={80}
                className="rounded-full"
              />
            )}
          </div>
        ) : (
          <li
            key={i}
            className="w-full flex flex-col justify-center items-center"
          >
            {icons[d[0]]}
            <span className="capitalize font-quotePrimary tracking-widest text-gray-800 dark:text-gray-200">
              {d[0].replaceAll("_", " ")}
            </span>
            <span className="font-serifPrimary text-sky-900 dark:text-sky-300">
              {d[1]}
            </span>
            {i < data.length - 1 && (
              <Divider
                flexItem
                variant="middle"
                className="bg-gray-300 dark:bg-gray-600"
              />
            )}
          </li>
        )
      )}
    </ul>
  );
}
