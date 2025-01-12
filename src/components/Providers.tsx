"use client";

//imports
import { store } from "@/store/store";
import React from "react";
import { Provider } from "react-redux";

//redux provider
//to prevent entire app turning into a client component

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
