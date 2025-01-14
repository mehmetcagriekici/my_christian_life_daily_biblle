"use client";

//imports
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import BtnPage from "../BtnPage";
import { useAuth } from "@/hooks/useAuth";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

export default function ClientForms() {
  //to toggle between forms
  const { toggleForms, isLoginForm } = useAuth();

  return (
    <div className="relative h-full w-full bg-stone-100 rounded border-2 border-gray-300 overflow-hidden">
      <BtnPage onClick={toggleForms}>
        {isLoginForm ? (
          <div className="flex flex-col justify-center items-center fixed -top-14 left-2 select-none text-sm font-ui tracking-wide text-sky-900 hover:underline hover:text-black">
            <AppRegistrationIcon />
            <span>open signup form</span>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center fixed -top-14 left-2 select-none text-sm font-ui tracking-wide text-sky-900 hover:underline hover:text-black">
            <LoginIcon />
            <span>open login form</span>
          </div>
        )}
      </BtnPage>
      {isLoginForm ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
