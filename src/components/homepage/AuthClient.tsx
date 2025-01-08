"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";

//client component to toggle between reflection button and login button
export default function AuthClient() {
  //ui auth (isLoggedIn)
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  //if logged in, can reflect else must log in to reflect
  return (
    <div>
      {isLoggedIn ? (
        <BtnPage>Express Your Thoughts</BtnPage>
      ) : (
        <BtnPage>Log In to Reflect</BtnPage>
      )}
    </div>
  );
}
