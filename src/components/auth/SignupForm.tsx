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
import { useState } from "react";
import { fullSignup } from "@/utils/types";
import { userSignup } from "@/services/getUser";
import FormLoading from "../FormLoading";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setChurch,
  setCities,
  setCity,
  setClergy,
  setCountries,
  setCountry,
  setRegion,
  setState,
  setStates,
  setSubRegion,
  setSubRegions,
  setUsername,
} from "@/store/slices/editSlice";
import { getCountries, getSubRegions } from "@/services/getCountries";
import { getCities, getStates } from "@/services/getCities";

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
    age: { emoji: <CalendarMonthIcon />, label: "date of birth" },
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

  //router
  const router = useRouter();

  //edit slice state that will also be used in signup form
  const {
    username,
    region,
    sub_region,
    country,
    state,
    city,
    church,
    subRegions,
    countries,
    states,
    cities,
    clergy_member,
  } = useAppSelector((s) => s.location);
  //dispatch
  const dispatch = useAppDispatch();

  //other select values control
  //gender
  const [gender, setGender] = useState("");
  //email
  const [email, setEmail] = useState("");
  //password
  const [password, setPassword] = useState("");
  //password confirm
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
    dispatch(setUsername(e.target.value));
  }

  function onChurchChange(e: SelectChangeEvent<string>) {
    dispatch(setChurch(e.target.value));
  }

  //isLoading
  const [isLoading, setIsLoading] = useState(false);
  //form errors
  const [formError, setFormError] = useState("");

  //onSubmit
  async function onSubmit(formData: FieldValues) {
    try {
      console.log(formData);
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
      //navigate to home page
      router.push("/");
    }
  }

  //on gender change
  function onGenderChange(e: SelectChangeEvent<string>) {
    setGender(e.target.value);
  }

  //on clergy change
  function onClergyChange(e: SelectChangeEvent<string>) {
    dispatch(setClergy(e.target.value));
  }

  //on region change
  async function onRegionChange(e: SelectChangeEvent<string>) {
    //set current region
    dispatch(setRegion(e.target.value));
    //to prevent out of range select values
    //reset current sub region
    dispatch(setSubRegion(""));
    //reset current country
    dispatch(setCountry(""));
    //reset current state
    dispatch(setState(""));
    //reset current city
    dispatch(setCity(""));
    //update sub regions
    const { subRegions } = await getSubRegions(e.target.value);
    dispatch(setSubRegions(subRegions));
  }

  //on sub region change
  async function onSubRegionChange(e: SelectChangeEvent<string>) {
    //set current sub region
    dispatch(setSubRegion(e.target.value));
    //to prevent out of range select values
    //reset current country
    dispatch(setCountry(""));
    //reset current state
    dispatch(setState(""));
    //reset current city
    dispatch(setCity(""));
    //update countries
    const { countries } = await getCountries(e.target.value);
    const updatedCountries = {
      countries: countries.map((country) => country.name),
      countryCodes: Object.fromEntries(
        countries.map((country) => [country.name, country.code])
      ),
    };
    dispatch(setCountries(updatedCountries));
  }

  //on country change
  async function onCountryChange(e: SelectChangeEvent<string>) {
    dispatch(setCountry(e.target.value));
    //to prevent out of range select values
    //reset current state
    dispatch(setState(""));
    //reset current city
    dispatch(setCity(""));
    //update states
    const { states } = await getStates(countries.countryCodes[e.target.value]);
    const updatedStates = {
      states: states.map((state) => state.name),
      stateCodes: Object.fromEntries(
        states.map((state) => [state.name, state.code])
      ),
    };
    dispatch(setStates(updatedStates));
  }

  //on state change
  async function onStateChange(e: SelectChangeEvent<string>) {
    dispatch(setState(e.target.value));
    //to prevent out of range select values
    //reset current city
    dispatch(setCity(""));
    //update cities
    const { cities } = await getCities(
      countries.countryCodes[country],
      states.stateCodes[e.target.value]
    );

    dispatch(setCities(cities));
  }

  //on city change
  //nothing really happens
  //this is just to control the field
  function onCityChange(e: SelectChangeEvent<string>) {
    dispatch(setCity(e.target.value));
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
        value={region}
        options={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
        onChange={onRegionChange}
        error={errors.region}
      />
      {subRegions.length ? (
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
            options={subRegions}
            onChange={onSubRegionChange}
            value={sub_region}
            error={errors.sub_region}
          />
        </>
      ) : (
        ""
      )}
      {countries.countries.length ? (
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
            options={countries.countries}
            onChange={onCountryChange}
            value={country}
            error={errors.country}
          />
        </>
      ) : (
        ""
      )}
      {states.states.length ? (
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
            options={states.states}
            value={state}
            onChange={onStateChange}
            error={errors.state}
          />
        </>
      ) : (
        ""
      )}
      {cities.length ? (
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
            options={cities}
            value={city}
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
