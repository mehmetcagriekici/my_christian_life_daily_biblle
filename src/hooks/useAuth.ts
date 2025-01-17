//import
import { useAppDispatch } from "@/store/hooks";
import { login, logout, toggleForm } from "@/store/slices/authUiSlice";
import { useAppSelector } from "@/store/hooks";
import { userLogin, userLogout, userSignup } from "@/services/getUser";
import { typeSignupUser } from "@/utils/types";

//UI and server logic of the entire auth feature
export function useAuth() {
  ///// UI //////////////////////////////////////
  //authed
  const { isLoginForm, isLoggedIn } = useAppSelector((state) => state.auth);
  //loading
  //dispatch
  const dispatch = useAppDispatch();

  //function to toggle between login and signup forms
  function toggleForms() {
    dispatch(toggleForm());
  }

  function uiLogin() {
    dispatch(login());
  }

  function uiLogout() {
    dispatch(logout());
  }

  //////////////////////////////////////////////////

  //// SERVER /////////////////////////////////////

  //signup
  async function serverSignup({
    password,
    user,
  }: {
    password: string;
    user: typeSignupUser;
  }) {
    const { userData, auth } = await userSignup({ password, user });

    uiLogin();
  }

  //logout
  async function serverLogout() {
    await userLogout();
    uiLogout();
  }

  //login
  async function serverLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data } = await userLogin({ email, password });

    console.log(data);

    uiLogin();
  }

  return {
    isLoginForm,
    isLoggedIn,
    toggleForms,
    serverLogin,
    serverLogout,
    serverSignup,
  };
}
