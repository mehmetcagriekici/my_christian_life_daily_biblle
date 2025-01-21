//imports
import { formInputProps } from "@/utils/types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

//possible props
//pattern
//required
//type

export default function FormInput({
  icon,
  register,
  fieldName,
  isSelect = false,
  options = [""],
  type,
  value = "",
  onChange = () => {},
  readonly = false,
}: formInputProps) {
  //isSelect
  //select element with options coming as props
  return (
    <section className="flex flex-col justify-center items-center gap-3 w-full select-none text-stone-800">
      <InputLabel className="flex flex-col justify-center items-center font-ui dark:text-gray-200">
        {icon.emoji}
        <span>{icon.label}</span>
      </InputLabel>
      {isSelect ? (
        <FormControl size="small" className="w-full max-h-10">
          <Select
            {...register(fieldName, { required: true })}
            className="w-full text-sm p-1 rounded-sm bg-gray-300 outline-none font-serifPrimary tracking-wide hover:text-sky-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-400"
            defaultValue={""}
            value={value}
            onChange={onChange}
            label={icon.label}
            readOnly={readonly}
          >
            {/*options come from the parent component*/}
            {options.map((option, i) => (
              <MenuItem key={i} value={option} className="text-sm">
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <input
          {...register(fieldName, { required: true })}
          className="w-full text-xl indent-2 p-1 rounded-sm bg-gray-300 outline-none  font-serifPrimary tracking-wide hover:text-sky-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-400"
          type={type}
          readOnly={readonly}
        />
      )}
    </section>
  );
}
