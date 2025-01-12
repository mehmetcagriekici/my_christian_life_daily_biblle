"use client";

//imports
import { useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

//darkmode toggle button
export default function DarkClient() {
  //ui darkmode (isDarkMode)
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  //if logged in, can reflect else must log in to reflect
  return (
    <div>
      {isDarkMode ? (
        <BtnPage onClick={() => {}}>
          <LightModeIcon />
          Light Mode
        </BtnPage>
      ) : (
        <BtnPage onClick={() => {}}>
          <DarkModeIcon />
          Dark Mode
        </BtnPage>
      )}
    </div>
  );
}
