"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";
import { typeAuthIcons } from "@/utils/types";
import Link from "next/link";

//client component to toggle between reflection button and login button
export default function AuthClient({ icons }: { icons: typeAuthIcons }) {
  //ui auth (isLoggedIn)
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  //if logged in, can reflect else must log in to reflect
  return (
    <div>
      {isLoggedIn ? (
        <BtnPage onClick={() => {}}>
          <Link href="/auth">
            {icons.on.icon}
            {icons.on.label}
          </Link>
        </BtnPage>
      ) : (
        <BtnPage onClick={() => {}}>
          <Link href="/auth">
            {icons.off.icon}
            {icons.off.label}
          </Link>
        </BtnPage>
      )}
    </div>
  );
}
