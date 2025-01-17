"use client";
//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleTheme } from "@/store/slices/darkSlice";

//darkmode toggle button
export default function ThemeToggle() {
  //ui state
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <li className="text-nowrap">
      <BtnPage
        onClick={() => {
          dispatch(toggleTheme());
        }}
      >
        {theme === "light" ? (
          <>
            <LightModeIcon />
            Light Mode
          </>
        ) : (
          <>
            <DarkModeIcon />
            Dark Mode
          </>
        )}
      </BtnPage>
    </li>
  );
}
