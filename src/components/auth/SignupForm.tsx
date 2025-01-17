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
import { useAuth } from "@/hooks/useAuth";
import { Divider, SelectChangeEvent } from "@mui/material";
import SubmitBtn from "../SubmitBtn";
import { useLocationSelect } from "@/hooks/useLocationSelect";
import { useState } from "react";
import { fullSignup } from "@/utils/types";

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
  const { register, handleSubmit, reset } = useForm();

  //other select values control
  //gender
  const [gender, setGender] = useState("");
  //clergy_member
  const [clergy_member, setclergy_member] = useState("");

  //ui auth
  const { serverSignup } = useAuth();

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
  function onSubmit(formData: FieldValues) {
    //destructure form data
    const { password, passwordConfirmation, ...user } = formData as fullSignup;

    //submit data
    if (password === passwordConfirmation)
      serverSignup({ password, user: { ...user } });
    else throw new Error("Passwords do not match!");

    //reset all fields
    reset();

    //reset selects
    //locations
    clear();
    setclergy_member("");
    setGender("");
  }

  //on gender change
  function onGenderChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    setGender(value);
  }

  //on clergy change
  function onClergyChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    setclergy_member(value);
  }

  //on region change
  function onRegionChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateSubRegions(value);
  }

  //on sub region change
  function onSubRegionChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateCountries(value);
  }

  //on country change
  function onCountryChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateStates(value);
  }

  //on state change
  function onStateChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    updateCities(value);
  }

  //on city change
  //nothing really happens
  //this is just to control the field
  function onCityChange(e: SelectChangeEvent<string>) {
    const value = e.target.value;
    controlCity(value);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full overflow-y-auto p-3 rounded flex flex-col justify-safe-center items-safe-center gap-5"
    >
      <FormInput
        icon={icons.email}
        fieldName="email"
        register={register}
        type="email"
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.password}
        fieldName="password"
        register={register}
        type="password"
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.passwordConfirmation}
        fieldName="passwordConfirmation"
        register={register}
        type="password"
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.username}
        fieldName="username"
        register={register}
        type="text"
      />
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      <FormInput
        icon={icons.age}
        fieldName="age"
        register={register}
        type="number"
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
      />
      <SubmitBtn>Signup</SubmitBtn>
    </form>
  );
}
