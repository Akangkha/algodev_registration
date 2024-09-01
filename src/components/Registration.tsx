import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ash from "../assets/ash.svg";
// import pikachu from "../assets/pikachu.svg";
import snorlax from "../assets/snorlax.svg";
import pokeball from "../assets/pokeball.svg";
import { useState } from "react";
import PokeballInput from "./PokeballInput";

export interface formData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  whatsapp: string;
  isSame?: string;
}
const schema: ZodType<formData> = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .max(30, { message: "First name must be less than 30 characters" })
    .min(1, { message: "First name is required" }),
  lastName: z
    .string({ message: "Last name is required" })
    .max(30, { message: "Last name must be less than 30 characters" })
    .min(1, { message: "Last name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Enter valid email" }),
  phone: z
    .string({ message: "Phone number is required" })
    .regex(
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
      { message: "Enter valid phone number" }
    ),
  whatsapp: z.string(),
  isSame: z.string().optional(),
});

const Registration: React.FC = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedField(e.target.id);
  };

  const handleBlur = () => {
    setFocusedField("");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<formData>({ resolver: zodResolver(schema), mode: "onChange" });

  const submitForm = async (data: formData) => {
    try {
      console.log("Form data:", data);

      const params = new URLSearchParams();
      params.append("entry.521128088", String(data.firstName));
      params.append("entry.1938341443", String(data.lastName));
      params.append("entry.2027588860", String(data.email));
      params.append("entry.1956564773", String(data.phone));
      params.append("entry.922164047", String(data.whatsapp));
      // params.append("entry.1669604705", data.isSame ? "true" : "false");

      const googleFormUrl = import.meta.env.VITE_GOOGLE_FORMS_ENDPOINT;

      const response = await fetch(`${googleFormUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      });
      console.log(params.toString());
      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error(
          "Error submitting form:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="w-full h-screen flex relative">
      <img
        src={ash}
        alt=""
        className="hidden xl:block size-[500px] absolute -translate-x-1/2 bottom-0 left-1/2 z-10"
      />
      <div className="w-1/2 bg-yellow md:flex justify-center items-center relative hidden">
        <img
          src={ash}
          alt=""
          className="hidden xl:hidden md:block size-[500px] absolute bottom-0 left-1/2  z-10"
        />

        <div className="absolute p-8 top-0 right-0 solid text-blue text-3xl">
          xxx
        </div>
        <div className="text-center">
          <div className="hollow font-bold text-blue xl:text-[160px] text-8xl flex flex-nowrap m-auto px-14 xl:px-0 w-fit">
            P
            <span className="relative">
              o
              <img
                src={pokeball}
                alt=""
                className="absolute xl:top-[40px] top-[23px] xl:left-0 -left-[3px] pokeballText"
              />
            </span>
            keM
            <span className="relative">L</span>
          </div>
          <div>
            <div className="bowlby text-blue xl:text-3xl xl:m-0 mt-4 text-xl">
              Sep XX 2024, 10 am Onwards
            </div>
            <div className="bowlby text-blue xl:text-3xl text-xl">
              Campus X Auditorium
            </div>
          </div>
        </div>
        <div className="absolute p-8 bottom-0 left-0 solid text-blue text-3xl">
          xxx
        </div>
      </div>
      <div className="md:w-1/2 w-full bg-blue xl:p-12 p-4">
        <h1 className="text-white solid xl:text-7xl text-4xl m-auto w-fit xl:my-12 my-10 text-center">
          Register Now
        </h1>
        <div className="flex flex-col justify-center items-center h-max">
          <form
            className="flex flex-col xl:px-7 md xl:gap-3 gap-2 montserrat z-20 w-4/5"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col xl:flex-row xl:gap-8 gap-2 w-full">
              <PokeballInput
                name="firstName"
                label="First Name"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              />

              <PokeballInput
                name="lastName"
                label="Last Name"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              />
            </div>

            <PokeballInput
              name="email"
              label="Email (Personal)"
              register={register}
              errors={errors}
              focusedField={focusedField}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />

            <div className="flex flex-col xl:flex-row md:gap-6 xl:gap-8 gap-2 w-full">
              <PokeballInput
                name="phone"
                label="Phone"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                onChange={(e) => setPhoneValue(e.target.value)}
              />

              <PokeballInput
                name="whatsapp"
                label="Whatsapp"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                value={watch("isSame") ? phoneValue : watch("whatsapp") || ""}
                onChange={(e) => {
                  if (!watch("isSame")) {
                    setValue("whatsapp", e.target.value);
                  }
                }}
              />
            </div>

            <div className="mt-2 z-20">
              <input
                type="checkbox"
                id="isSame"
                {...register("isSame")}
                // name="entry.1669604705"
                className="bg-white xl:p-4 p-2 rounded-xl text-lg pl-[50px]"
                value="Yes"
              />
              <label
                htmlFor="isSame"
                className="text-white xl:text-xl text-sm font-bold ml-5"
              >
                Phone Number is same as Whatsapp Number?
              </label>
              {errors.isSame && (
                <span className="text-yellow mx-2 px-2 text-sm font-bold">
                  * {errors.isSame.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="hover:scale-105 active:scale-95 transition-all mt-5 bg-yellow w-fit m-auto text-blue montserrat font-bold text-2xl py-2 px-8 rounded-xl flex gap-4 justify-center items-center"
            >
              Next <img src={snorlax} alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
