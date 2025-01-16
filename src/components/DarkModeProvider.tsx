"use client";

//imports
import { useTheme } from "@/hooks/useTheme";
import React from "react";

//dark mode is handled in client side

export default function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useTheme();

  return <div>{children}</div>;
}
