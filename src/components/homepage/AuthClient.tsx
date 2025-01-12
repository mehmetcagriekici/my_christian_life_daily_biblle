"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";
import { typeAuthIcons } from "@/utils/types";

//client component to toggle between reflection button and login button
export default function AuthClient({ icons }: { icons: typeAuthIcons }) {
  //ui auth (isLoggedIn)
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  //if logged in, can reflect else must log in to reflect
  return (
    <div>
      {isLoggedIn ? (
        <BtnPage onClick={() => {}}>
          {icons.on.icon}
          {icons.on.label}
        </BtnPage>
      ) : (
        <BtnPage onClick={() => {}}>
          {icons.off.icon}
          {icons.off.label}
        </BtnPage>
      )}
    </div>
  );
}
