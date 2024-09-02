import { FieldErrors, UseFormRegister } from "react-hook-form";
import pokeball from "../assets/pokeball.svg";
import { formData } from "./Registration";

interface PokeballInputProps {
  name: keyof formData;
  label: string;
  register: UseFormRegister<formData>;
  errors: FieldErrors<formData>;
  focusedField: string;
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
const PokeballInput: React.FC<PokeballInputProps> = ({
  name,
  label,
  register,
  errors,
  focusedField,
  handleFocus,
  handleBlur,
  // value,
  // onChange,
  // disabled,
}) => {
  // const {register,} = useForm();
  console.log(register);
  return (
    <div className="flex flex-col relative">
      <label
        htmlFor={name}
        className="text-white xl:text-xl text-base font-bold"
      >
        {label}
      </label>
      <div className="flex items-center">
        <img
          src={pokeball}
          alt=""
          className={`md:size-12 xl:size-16 size-11 absolute md:-left-7 -left-5 transition-all ${
            focusedField === name ? "rotate-[-26deg]" : ""
          }`}
        />
        <input
          type="text"
          id={name}
          {...register(name)}
          // value={value}
          // onChange={onChange}
          // disabled={disabled}
          className="bg-white xl:pl-8 pl-6 xl:p-4 p-2 rounded-xl text-lg w-full"
          onFocus={(e) => handleFocus(e)}
          onBlur={handleBlur}
        />
      </div>
      {errors[name] && (
        <span className="text-yellow mx-2 px-2 text-sm font-bold">
          * {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default PokeballInput;
