"use client";

import { store } from "@/store/store";
//imports
import React from "react";
import { Provider } from "react-redux";

//redux provider
//to prevent entire app turning into a client component

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
