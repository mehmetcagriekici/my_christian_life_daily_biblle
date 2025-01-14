//import
import { useAppDispatch } from "@/store/hooks";
import { login, logout, toggleForm } from "@/store/slices/authUiSlice";
import { useAppSelector } from "@/store/hooks";

//UI and Data logic of the entire auth feature
export function useAuth() {
  //state
  const { isLoginForm } = useAppSelector((state) => state.auth);
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

  return { toggleForms, uiLogin, uiLogout, isLoginForm };
}
