"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";

//darkmode toggle button
export default function DarkClient() {
  //ui darkmode (isDarkMode)
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  //if logged in, can reflect else must log in to reflect
  return (
    <div>{isDarkMode ? <BtnPage>Light</BtnPage> : <BtnPage>Dark</BtnPage>}</div>
  );
}
