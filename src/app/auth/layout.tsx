//imports
import React from "react";

//auth page
//contains both login and signup forms
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
