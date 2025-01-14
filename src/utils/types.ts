//imports
import { JSX } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

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
};
