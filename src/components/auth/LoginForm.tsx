//imports
import { useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import FormInput from "../FormInput";
import { useAuth } from "@/hooks/useAuth";
import { Divider } from "@mui/material";

//login form
/*email + password*/
export default function LoginForm() {
  //icons
  const icons = {
    email: {
      emoji: <EmailIcon />,
      label: "email",
    },
    password: {
      emoji: <PasswordIcon />,
      label: "password",
    },
  };

  //use hook form
  const { register, handleSubmit } = useForm();
  //ui auth
  const { uiLogin } = useAuth();

  //submit
  function onSubmit() {
    //login
    uiLogin();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full overflow-y-auto p-3 rounded flex flex-col justify-center items-center gap-5"
    >
      <FormInput icon={icons.email} fieldName="email" register={register} />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.password}
        fieldName="password"
        register={register}
      />
    </form>
  );
}
