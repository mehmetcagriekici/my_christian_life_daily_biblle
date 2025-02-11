//imports
import { formInputProps } from "@/utils/types";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  error,
}: formInputProps) {
  //file input
  if (type === "file")
    return (
      <section className="flex flex-col justify-center items-center gap-3 w-full select-none text-stone-800">
        <InputLabel className="flex flex-col justify-center items-center font-ui dark:text-gray-200">
          {icon.emoji}
          <span>{icon.label}</span>
        </InputLabel>
        <input
          {...register("avatar", { required: false })}
          type={type}
          accept=".jpg, .jpeg, .png"
          className="w-full text-xl indent-2 p-1 rounded-sm bg-gray-300 outline-none  font-serifPrimary tracking-wide hover:text-sky-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-400"
          name={fieldName}
          id={fieldName}
        />
        {error?.message && (
          <Alert variant="filled" severity="error">
            {error.message.toString()}
          </Alert>
        )}
      </section>
    );

  //isSelect
  //select element with options coming as props
  if (isSelect)
    return (
      <section className="flex flex-col justify-center items-center gap-3 w-full select-none text-stone-800">
        <InputLabel className="flex flex-col justify-center items-center font-ui dark:text-gray-200">
          {icon.emoji}
          <span>{icon.label}</span>
        </InputLabel>
        <FormControl size="small" className="w-full max-h-10">
          <Select
            {...register(fieldName, {
              required: `${fieldName} field is required!`,
            })}
            className="w-full text-sm p-1 rounded-sm bg-gray-300 outline-none font-serifPrimary tracking-wide hover:text-sky-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-400"
            value={value}
            onChange={(e: SelectChangeEvent<string>) => onChange(e)}
            label={icon.label}
            readOnly={readonly}
            name={fieldName}
            id={fieldName}
          >
            {/*options come from the parent component*/}
            {options.map((option, i) => (
              <MenuItem key={i} value={option} className="text-sm">
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error?.message && (
          <Alert variant="filled" severity="error">
            {error.message.toString()}
          </Alert>
        )}
      </section>
    );

  //default
  return (
    <section className="flex flex-col justify-center items-center gap-3 w-full select-none text-stone-800">
      <InputLabel className="flex flex-col justify-center items-center font-ui dark:text-gray-200">
        {icon.emoji}
        <span>{icon.label}</span>
      </InputLabel>
      <input
        {...register(fieldName, {
          required: `${fieldName.replaceAll("_", " ")} field is required!`,
        })}
        className="w-full text-xl indent-2 p-1 rounded-sm bg-gray-300 outline-none  font-serifPrimary tracking-wide hover:text-sky-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-400"
        type={type}
        readOnly={readonly}
        value={value}
        onChange={onChange}
        name={fieldName}
        id={fieldName}
      />
      {error?.message && (
        <Alert variant="filled" severity="error">
          {error.message.toString()}
        </Alert>
      )}
    </section>
  );
}
