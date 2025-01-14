//imports
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ChurchIcon from "@mui/icons-material/Church";
import BadgeIcon from "@mui/icons-material/Badge";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput";
import { useAuth } from "@/hooks/useAuth";
import { Divider } from "@mui/material";

//signup form
export default function SignupForm() {
  /*
  email + password + password confirmation + username + age + gender + region(continent) + country + city + church + isClergy + avatar: default avar, update on edit
  */

  const icons = {
    email: { emoji: <EmailIcon />, label: "email" },
    password: { emoji: <PasswordIcon />, label: "password" },
    passwordConfirmation: {
      emoji: <PasswordIcon />,
      label: "confirm password",
    },
    username: { emoji: <PersonIcon />, label: "username" },
    age: { emoji: <CalendarMonthIcon />, label: "age" },
    gender: { emoji: <WcIcon />, label: "gender" },
    region: { emoji: <SouthAmericaIcon />, label: "region" },
    country: { emoji: <LanguageIcon />, label: "country" },
    city: { emoji: <LocationCityIcon />, label: "city" },
    church: { emoji: <ChurchIcon />, label: "church" },
    isClergy: { emoji: <BadgeIcon />, label: "clergy member" },
  };

  //use hook form
  const { register, handleSubmit } = useForm();
  //ui auth
  const { uiLogin } = useAuth();

  //onSubmit
  function onSubmit() {
    //login
    uiLogin();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full overflow-y-auto p-3 rounded flex flex-col justify-safe-center items-safe-center gap-5"
    >
      <FormInput icon={icons.email} fieldName="email" register={register} />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.password}
        fieldName="password"
        register={register}
      />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.passwordConfirmation}
        fieldName="password_confirmation"
        register={register}
      />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.username}
        fieldName="username"
        register={register}
      />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput icon={icons.age} fieldName="age" register={register} />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.gender}
        fieldName="gender"
        register={register}
        isSelect={true}
      />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput icon={icons.region} fieldName="region" register={register} />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.country}
        fieldName="country"
        register={register}
        isSelect={true}
      />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.city}
        fieldName="city"
        register={register}
        isSelect={true}
      />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput icon={icons.church} fieldName="church" register={register} />
      <Divider flexItem variant="middle" className="bg-amber-200" />
      <FormInput
        icon={icons.isClergy}
        fieldName="isClergy"
        register={register}
        isSelect={true}
      />
    </form>
  );
}
