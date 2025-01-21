//imports
import { FieldValues, useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import FormInput from "../FormInput";
import { Divider } from "@mui/material";
import SubmitBtn from "../SubmitBtn";
import { userLogin } from "@/services/getUser";
import DividerText from "../DividerText";

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
  const { register, handleSubmit, reset } = useForm();

  //submit
  async function onSubmit(formData: FieldValues) {
    const { email, password } = formData;
    //server login with data
    await userLogin({ email, password });

    //reset all fields
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full overflow-y-auto p-3 rounded flex flex-col justify-center items-center gap-5"
    >
      {/*A cross image (Red)*/}
      <FormInput
        icon={icons.email}
        fieldName="email"
        register={register}
        type="email"
      />
      <FormInput
        icon={icons.password}
        fieldName="password"
        register={register}
        type="password"
      />
      <SubmitBtn>Login</SubmitBtn>
      {/*Another Cross (Gold)*/}
      {/*A motto*/}
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <section className="w-full flex flex-col justify-center items-center gap-2 p-3">
        <DividerText
          psalm="Psalm 115:1"
          quote="Non nobis, Domine, non nobis, sed nomini tuo da gloriam."
        />
      </section>
    </form>
  );
}
