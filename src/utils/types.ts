//imports
import { SelectChangeEvent } from "@mui/material";
import { JSX } from "react";
import { UseFormRegister, FieldValues, Control } from "react-hook-form";

//bible reading type
type TBibleReading = {
  dataHeading: string;
  dataReading1: {
    heading: string;
    textArray: string[];
  };
  dataReading2: {
    heading: string;
    textArray: string[];
  };
  dataPsalms: {
    heading: string;
    textArray: string[];
  };
  dataGospel: {
    heading: string;
    textArray: string[];
  };
};

type TSaint = {
  saint: string;
  link: string;
};

export type TReflection = {
  reflection_date: string;
  reflection_readings: TBibleReading;
  reflection_saints: TSaint[];
  reflection: string;
};

//auth toggle
export type typeAuthIcons = {
  on: {
    icon: JSX.Element;
    label: string;
  };
  off: {
    icon: JSX.Element;
    label: string;
  };
};

//flexible form input
export type formInputProps = {
  icon: {
    emoji: JSX.Element;
    label: string;
  };

  register: UseFormRegister<FieldValues>;
  fieldName: string;
  isSelect?: boolean;
  options?: string[];
  type: string;
  control?: Control;
  value?: string;
  onChange?: (e: SelectChangeEvent<string>) => void;
  readonly?: boolean;
};

//type user
export type typeSignupUser = {
  email: string;
  username: string;
  age: number;
  gender: string;
  region: string;
  sub_region: string;
  country: string;
  state: string;
  city: string;
  church: string;
  clergy_member: string;
};

export type fullSignup = typeSignupUser & {
  password: string;
  passwordConfirmation: string;
};
