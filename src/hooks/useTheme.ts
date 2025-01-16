//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/darkSlice";
import { useEffect } from "react";

export function useTheme() {
  //dispatch
  const dispatch = useAppDispatch();
  //ui state
  const { theme } = useAppSelector((state) => state.theme);

  //check for system preferences
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    dispatch(setTheme(systemTheme));
  }, [dispatch]);

  //apply or remove dark class based on the theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
}
