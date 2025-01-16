"use client";
//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BtnPage from "@/components/BtnPage";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleTheme } from "@/store/slices/darkSlice";

//darkmode toggle button
export default function FormThemeToggle() {
  //ui state
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className="h-18 w-18 flex flex-col justify-center items-center absolute top-2 right-24 p-3 border-2 border-red-100 rounded-full bg-red-50 text-sky-900 hover:cursor-pointer hover:bg-yellow-50 hover:border-red-300 hover:text-stone-900 font-serifPrimary select-none dark:bg-sky-900 dark:border-transparent dark:hover:border-crimson hover:underline">
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
    </div>
  );
}
