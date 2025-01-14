//imports
import { formInputProps } from "@/utils/types";

//possible props
//pattern
//required
//type

export default function FormInput({
  icon,
  register,
  fieldName,
  isSelect = false,
}: formInputProps) {
  //isSelect
  //select element with options coming as props
  return (
    <section className="flex flex-col justify-center items-center gap-3 w-full select-none">
      <label className="flex flex-col justify-center items-center font-ui">
        {icon.emoji}
        <span>{icon.label}</span>
      </label>
      <input
        {...register(fieldName, { required: true })}
        className="w-full text-xl indent-2 p-1 rounded-sm bg-gray-300 outline-none  font-serifPrimary tracking-wide text-gray-900 hover:text-sky-800 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-400"
      />
    </section>
  );
}
