//imports
import { FieldValues, useForm } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import FormInput from "../FormInput";
import { Alert, Divider, SelectChangeEvent } from "@mui/material";
import SubmitBtn from "../SubmitBtn";
import { userLogin } from "@/services/getUser";
import DividerText from "../DividerText";
import { useState } from "react";
import FormLoading from "../FormLoading";
import { useRouter } from "next/navigation";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //form control values
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  //form control functions
  function onEmailChange(e: SelectChangeEvent<string>) {
    setEmailInput(e.target.value);
  }

  function onPasswordChange(e: SelectChangeEvent<string>) {
    setPasswordInput(e.target.value);
  }

  //login form is loading
  const [isLoading, setIsLoading] = useState(false);
  //form errors
  const [formError, setFormError] = useState("");

  //router
  const router = useRouter();

  //submit
  async function onSubmit(formData: FieldValues) {
    try {
      setIsLoading(true);
      const { email, password } = formData;

      //server login with data
      await userLogin({ email, password });

      //reset all fields
    } catch (error) {
      setFormError("Login Error!");
      throw new Error(error as string);
    } finally {
      //navigate to home page
      router.push("/");
    }
  }

  if (isLoading) return <FormLoading />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full overflow-y-auto p-3 rounded flex flex-col justify-center items-center gap-5"
    >
      {formError && (
        <Alert variant="filled" severity="error">
          {formError}
        </Alert>
      )}
      {/*A cross image (Red)*/}
      <FormInput
        icon={icons.email}
        fieldName="email"
        register={register}
        type="email"
        error={errors.email}
        value={emailInput}
        onChange={onEmailChange}
      />
      <FormInput
        icon={icons.password}
        fieldName="password"
        register={register}
        type="password"
        error={errors.password}
        value={passwordInput}
        onChange={onPasswordChange}
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
