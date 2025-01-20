"use client";

//imports
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import BtnPage from "../BtnPage";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";

export default function ClientForms() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  function toggleForms() {
    setIsLoginForm((s) => !s);
  }

  return (
    <div className="relative h-full w-full bg-stone-100 rounded border-2 border-gray-300 overflow-hidden dark:bg-slate-900">
      <BtnPage onClick={toggleForms}>
        {isLoginForm ? (
          <div className="flex md:flex-col justify-center items-center fixed -top-6 gap-1 md:-top-14 left-2 select-none text-sm font-ui tracking-wide text-sky-900 hover:underline hover:text-black dark:text-sky-300 dark:hover:text-gold">
            <AppRegistrationIcon />
            <span>open signup form</span>
          </div>
        ) : (
          <div className="flex md:flex-col justify-center items-center fixed -top-6 gap-1 md:-top-14 left-2 select-none text-sm font-ui tracking-wide text-sky-900 hover:underline hover:text-black dark:text-sky-300 dark:hover:text-gold">
            <LoginIcon />
            <span>open login form</span>
          </div>
        )}
      </BtnPage>
      {isLoginForm ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
