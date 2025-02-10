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
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";
import { FieldValues, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import { Alert, Divider, SelectChangeEvent } from "@mui/material";
import SubmitBtn from "../SubmitBtn";
import { useLocationSelect } from "@/hooks/useLocationSelect";
import { useState } from "react";
import { fullSignup } from "@/utils/types";
import { userSignup } from "@/services/getUser";
import FormLoading from "../FormLoading";

//signup form
export default function SignupForm() {
  /*
  email + password + password confirmation + username + age + gender + region(continent) + country + city + church + clergy_member + avatar: default avar, update on edit
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
    region: { emoji: <PublicIcon />, label: "region" },
    subregion: { emoji: <SouthAmericaIcon />, label: "sub region" },
    country: { emoji: <LanguageIcon />, label: "country" },
    state: { emoji: <FlagIcon />, label: "state" },
    city: { emoji: <LocationCityIcon />, label: "city" },
    church: { emoji: <ChurchIcon />, label: "church" },
    clergy_member: { emoji: <BadgeIcon />, label: "clergy member" },
  };

  //use hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //other select values control
  //gender
  const [gender, setGender] = useState("");
  //clergy_member
  const [clergy_member, setclergy_member] = useState("");
  //email
  const [email, setEmail] = useState("");
  //password
  const [password, setPassword] = useState("");
  //password confirm
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //username
  const [username, setUsername] = useState("");
  //age
  const [age, setAge] = useState("");
  //church
  const [church, setChurch] = useState("");

  //form control functions for local values [email-church]
  function onEmailChange(e: SelectChangeEvent<string>) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e: SelectChangeEvent<string>) {
    setPassword(e.target.value);
  }

  function onPasswordConfirmChange(e: SelectChangeEvent<string>) {
    setPasswordConfirm(e.target.value);
  }

  function onUsernameChange(e: SelectChangeEvent<string>) {
    setUsername(e.target.value);
  }

  function onAgeChange(e: SelectChangeEvent<string>) {
    setAge(e.target.value);
  }

  function onChurchChange(e: SelectChangeEvent<string>) {
    setChurch(e.target.value);
  }

  //isLoading
  const [isLoading, setIsLoading] = useState(false);
  //form errors
  const [formError, setFormError] = useState("");

  //region, country, city selections
  const {
    state,
    updateSubRegions,
    updateCountries,
    updateStates,
    updateCities,
    controlCity,
    clear,
  } = useLocationSelect();

  //onSubmit
  async function onSubmit(formData: FieldValues) {
    try {
      setIsLoading(true);
      //destructure form data
      const { password, passwordConfirmation, ...user } =
        formData as fullSignup;

      if (password !== passwordConfirmation)
        throw new Error("Passwords do not match");

      await userSignup({ user, password });
    } catch (error) {
      setFormError(error as string);
      throw new Error(error as string);
    } finally {
      //reset
      clear();
      setIsLoading(false);
    }
  }

  //on gender change
  function onGenderChange(e: SelectChangeEvent<string>) {
    setGender(e.target.value);
  }

  //on clergy change
  function onClergyChange(e: SelectChangeEvent<string>) {
    setclergy_member(e.target.value);
  }

  //on region change
  function onRegionChange(e: SelectChangeEvent<string>) {
    updateSubRegions(e.target.value);
  }

  //on sub region change
  function onSubRegionChange(e: SelectChangeEvent<string>) {
    updateCountries(e.target.value);
  }

  //on country change
  function onCountryChange(e: SelectChangeEvent<string>) {
    updateStates(e.target.value);
  }

  //on state change
  function onStateChange(e: SelectChangeEvent<string>) {
    updateCities(e.target.value);
  }

  //on city change
  //nothing really happens
  //this is just to control the field
  function onCityChange(e: SelectChangeEvent<string>) {
    controlCity(e.target.value);
  }

  if (isLoading) return <FormLoading />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full overflow-y-auto p-3 rounded flex flex-col justify-safe-center items-safe-center gap-5"
    >
      {formError && (
        <Alert variant="filled" severity="error">
          {formError}
        </Alert>
      )}
      <FormInput
        icon={icons.email}
        fieldName="email"
        register={register}
        type="email"
        error={errors.email}
        value={email}
        onChange={onEmailChange}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.password}
        fieldName="password"
        register={register}
        type="password"
        error={errors.password}
        value={password}
        onChange={onPasswordChange}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.passwordConfirmation}
        fieldName="passwordConfirmation"
        register={register}
        type="password"
        error={errors.passwordConfirmation}
        value={passwordConfirm}
        onChange={onPasswordConfirmChange}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.username}
        fieldName="username"
        register={register}
        type="text"
        error={errors.username}
        value={username}
        onChange={onUsernameChange}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.age}
        fieldName="age"
        register={register}
        type="number"
        error={errors.age}
        value={age}
        onChange={onAgeChange}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.gender}
        fieldName="gender"
        register={register}
        isSelect={true}
        options={["male", "female"]}
        type=""
        value={gender}
        onChange={onGenderChange}
        error={errors.gender}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.region}
        fieldName="region"
        register={register}
        isSelect={true}
        type=""
        value={state.currRegion}
        options={state.regions}
        onChange={onRegionChange}
        error={errors.region}
      />
      {state.subRegions.length ? (
        <>
          <Divider
            flexItem
            variant="middle"
            className="bg-gold dark:bg-white"
          />
          <FormInput
            icon={icons.subregion}
            fieldName="sub_region"
            register={register}
            isSelect={true}
            type=""
            options={state.subRegions}
            onChange={onSubRegionChange}
            value={state.currSubRegion}
            error={errors.sub_region}
          />
        </>
      ) : (
        ""
      )}
      {state.countries.length ? (
        <>
          <Divider
            flexItem
            variant="middle"
            className="bg-gold dark:bg-white"
          />
          <FormInput
            icon={icons.country}
            fieldName="country"
            register={register}
            isSelect={true}
            type=""
            options={state.countries}
            onChange={onCountryChange}
            value={state.currCountry}
            error={errors.country}
          />
        </>
      ) : (
        ""
      )}
      {state.states.length ? (
        <>
          <Divider
            flexItem
            variant="middle"
            className="bg-gold dark:bg-white"
          />
          <FormInput
            icon={icons.state}
            fieldName="state"
            register={register}
            isSelect={true}
            type=""
            options={state.states}
            value={state.currState}
            onChange={onStateChange}
            error={errors.state}
          />
        </>
      ) : (
        ""
      )}
      {state.cities.length ? (
        <>
          <Divider
            flexItem
            variant="middle"
            className="bg-gold dark:bg-white"
          />
          <FormInput
            icon={icons.city}
            fieldName="city"
            register={register}
            isSelect={true}
            type=""
            options={state.cities}
            value={state.currCity}
            onChange={onCityChange}
            error={errors.city}
          />
        </>
      ) : (
        ""
      )}
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.church}
        fieldName="church"
        register={register}
        type="text"
        error={errors.church}
        value={church}
        onChange={onChurchChange}
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.clergy_member}
        fieldName="clergy_member"
        register={register}
        isSelect={true}
        options={[
          "No, I am not an official clergy member.",
          "Yes, I am an official clergy member.",
        ]}
        type=""
        value={clergy_member}
        onChange={onClergyChange}
        error={errors.clergy_member}
      />
      <SubmitBtn>Signup</SubmitBtn>
    </form>
  );
}
