import { userLogout } from "@/services/getUser";
import BtnPage from "../BtnPage";
import LogoutIcon from "@mui/icons-material/Logout";

export default function NavLogout() {
  function logout() {
    userLogout();
  }

  return (
    <li>
      <BtnPage onClick={logout}>
        <LogoutIcon />
        <span>logout</span>
      </BtnPage>
    </li>
  );
}
