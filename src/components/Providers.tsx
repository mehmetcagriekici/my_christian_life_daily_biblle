"use client";

//imports
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";
import DarkModeProvider from "./DarkModeProvider";

//redux provider
//to prevent entire app turning into a client component

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DarkModeProvider>{children}</DarkModeProvider>
    </Provider>
  );
}
