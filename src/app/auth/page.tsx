//imports
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ClientForms from "@/components/auth/ClientForms";

//auth page
export default function AuthPage() {
  return (
    <div className="h-dvh w-dvw relative bg-gray-200">
      {/*Back to Home Page*/}
      <Link
        href="/"
        className="h-18 w-18 flex flex-col justify-center items-center absolute top-2 right-4 p-3 border-2 border-red-100 rounded-full bg-red-50 text-sky-900 hover:cursor-pointer hover:bg-yellow-50 hover:border-red-300 hover:text-stone-900 font-serifPrimary select-none"
      >
        <HomeIcon />
        <span>Home</span>
      </Link>

      {/*Client Auth: includes both forms (login-signup)*/}
      {/*displays one of them with the ui state coming from authUiSlice*/}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 h-5/6  w-11/12 mt-3">
        <ClientForms />
      </div>
    </div>
  );
}
