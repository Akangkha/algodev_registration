import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ash from "../assets/ash.svg";
// import pikachu from "../assets/pikachu.svg";
import snorlax from "../assets/snorlax.svg";
import pokeball from "../assets/pokeball.svg";
import { useEffect, useState } from "react";
import PokeballInput from "./PokeballInput";

export interface formData {
  name: string;

  branch: string;
  year: string;
  phone: string;
  rollNumber: string;
  email: string;
}
const schema: ZodType<formData> = z.object({
  name: z
    .string({ message: "First name is required" })
    .max(30, { message: "First name must be less than 30 characters" })
    .min(1, { message: "First name is required" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Enter valid KIIT email" })
    .includes("@kiit.ac.in", { message: "Enter valid KIIT email" }),
  branch: z
    .string()
    .max(100, { message: "Branch name must be less than 100 characters" })
    .min(1, { message: "Branch name is required" }),
  year: z.string({ message: "Year is reqiured" }),
  phone: z
    .string({ message: "Phone number is required" })
    .min(10, { message: "Enter valid phone number" })
    .max(10, { message: "Enter valid phone number" })
    .regex(
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
      { message: "Enter valid phone number" }
    ),
  rollNumber: z.string(),
});

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<formData>({ resolver: zodResolver(schema), mode: "onChange" });

  const date = "8";
  const location = "14, Seminar Hall";

  const [, setPhoneValue] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rollNumber, setRollNumber] = useState("");

  useEffect(() => {
    const email = watch("email");
    if (email) {
      const match = email.match(/^(\d+)@kiit\.ac\.in$/);
      if (match) {
        setRollNumber(match[1]);
      }
    }
  }, [watch("email")]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocusedField(e.target.id);
  };

  const handleBlur = () => {
    setFocusedField("");
  };
  const submitForm = async (data: formData) => {
    try {
      console.log("Form data:", data);
      data.rollNumber = rollNumber;

      const params = new URLSearchParams();
      params.append("entry.1652795774", String(data.name));
      params.append("emailAddress", String(data.email));
      params.append("entry.1996017194", String(data.branch));
      params.append("entry.1564484452", String(data.year));
      params.append("entry.1417320345", String(data.phone));
      params.append("entry.10240631", String(data.rollNumber));
      // params.append("entry.1669604705", data.isSame ? "true" : "false");

      const googleFormUrl = import.meta.env.VITE_GOOGLE_FORMS_ENDPOINT;

      await fetch(`${googleFormUrl}?${params.toString()}`, {
        method: "POST",
        mode: "no-cors",
      }).then(() => {
        setIsSubmitted(true);
        console.log("Form submitted successfully!");
        const form = document.getElementById(
          "registrationForm"
        ) as HTMLFormElement;
        form?.reset();
        reset();
      });
    } catch (error) {
      const form = document.getElementById(
        "registrationForm"
      ) as HTMLFormElement;
      form?.reset();
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="w-full min-h-screen flex relative">
      {isSubmitted && (
        <div
          className="fixed z-40 top-0 left-0 w-full h-full flex-col md:flex-row bg-black gap-4 cursor-default bg-opacity-50 transition-all flex justify-center items-center"
          onClick={() => setIsSubmitted(false)}
        >
          <div className="pokeball w-[192px] h-[192px] "></div>
          <div className="bg-white p-4 rounded-xl text-xl montserrat font-bold">
            Registration Successful!
          </div>
        </div>
      )}

      <img
        src={ash}
        alt=""
        className="hidden h-3/4 xl:block size-[500px] absolute -translate-x-1/2 bottom-0 left-1/2 z-10"
      />
      <div className="w-1/2 bg-yellow md:flex justify-center items-center relative hidden">
        <img
          src={ash}
          alt=""
          className="hidden h-[70%] xl:hidden md:block size-[500px] absolute bottom-0 left-1/2 z-10"
        />

        <div className="absolute p-8 top-0 right-0 solid text-blue text-3xl">
          xxx
        </div>
        <div className="text-center flex flex-col">
          <div className="hollow font-bold text-blue xl:text-[160px] text-8xl flex flex-nowrap m-auto px-14 xl:px-0 w-fit">
            P
            <span className="relative">
              o
              <img
                src={pokeball}
                alt=""
                className="absolute xl:top-[90px] top-[55px] xl:-left-[5px] -left-[3px] pokeballText"
              />
            </span>
            k&eacute;Dev
          </div>
          <div className="xl:mt-[4rem] mt-[3rem]">
            <div className="bowlby text-blue xl:text-3xl xl:m-0 mt-4 text-xl">
              Sep {date} 2024, 10 am Onwards
            </div>
            <div className="bowlby text-blue xl:text-3xl text-xl">
              Campus {location}
            </div>
          </div>
        </div>
        <div className="absolute p-8 bottom-0 left-0 solid text-blue text-3xl">
          xxx
        </div>
      </div>
      <div className="md:w-1/2 w-full bg-blue xl:p-12 p-4">
        <div className="text-center md:hidden flex flex-col gap-4">
          <div className="solid mt-6 text-yellow text-7xl flex flex-nowrap m-auto w-fit">
            P
            <span className="relative">
              o
              <img
                src={pokeball}
                alt=""
                className="absolute top-[42px] -left-[3px] pokeballText"
              />
            </span>
            keDev
          </div>
          <div>
            <div className="bowlby text-yellow mt-4 text-lg">
              Sep {date} 2024, 10 am Onwards
            </div>
            <div className="bowlby text-yellow text-lg">Campus {location}</div>
          </div>
        </div>
        <h1 className="text-white solid xl:text-7xl text-4xl m-auto w-fit xl:my-12 my-10 text-center">
          Register Now
        </h1>
        <div className="flex flex-col justify-center items-center h-max">
          <form
            className="flex flex-col xl:px-7 md:pl-14 xl:pl-0 xl:gap-3 gap-2 montserrat z-20 w-4/5"
            onSubmit={handleSubmit(submitForm)}
            id="registrationForm"
          >
            <div className="flex flex-col xl:flex-row xl:gap-8 gap-2 w-full xl:justify-between">
              <PokeballInput
                type="text"
                name="name"
                label="Full Name"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              />
            </div>

            <PokeballInput
              type="text"
              name="email"
              label="KIIT Email"
              register={register}
              errors={errors}
              focusedField={focusedField}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
            />
            <div className="flex flex-col xl:flex-row xl:gap-8 gap-2 w-full xl:justify-between">
              <PokeballInput
                type="text"
                name="branch"
                label="Branch"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              />

              {/* <PokeballInput
                type="number"
                name="year"
                label="Year"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
              /> */}
              <div className="flex flex-col relative w-full text-white">
                <label
                  htmlFor="year"
                  className="text-white xl:text-lg text-base font-bold"
                >
                  Year
                </label>
                <div className="flex text-center items-center text-xl font-bold py-2 justify-between">
                  <div className="flex flex-row w-1/4">
                    <input
                      type="radio"
                      id="1"
                      {...register("year")}
                      value={1}
                      className="bg-white w-1/2 xl:pl-8 pl-6 p-2 rounded-xl text-lg"
                    />
                    <label htmlFor="1" className=" w-1/2">
                      1
                    </label>
                  </div>
                  <div className="flex flex-row w-1/4">
                    <input
                      type="radio"
                      id="2"
                      {...register("year")}
                      value={2}
                      className="bg-white w-1/2 xl:pl-8 pl-6 p-2 rounded-xl text-lg"
                    />
                    <label htmlFor="2" className=" w-1/2">
                      2
                    </label>
                  </div>
                  <div className="flex flex-row w-1/4">
                    <input
                      type="radio"
                      id="3"
                      {...register("year")}
                      value={3}
                      className="bg-white w-1/2 xl:pl-8 pl-6 p-2 rounded-xl text-lg"
                    />
                    <label htmlFor="3" className=" w-1/2">
                      3
                    </label>
                  </div>
                  <div className="flex flex-row w-1/4">
                    <input
                      type="radio"
                      id="4"
                      {...register("year")}
                      value={4}
                      className="bg-white w-1/2 xl:pl-8 pl-6 p-2 rounded-xl text-lg"
                    />
                    <label htmlFor="4" className=" w-1/2">
                      4
                    </label>
                  </div>
                </div>
                {errors["year"] && (
                  <span className="text-yellow mx-2 px-2 text-sm font-bold">
                    * {errors["year"].message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex text-nowrap flex-col xl:flex-row md:gap-6 xl:gap-8 gap-2 w-full xl:justify-between">
              <PokeballInput
                type="tel"
                name="phone"
                label="Phone No. (Whatsapp)"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                onChange={(e) => setPhoneValue(e.target.value)}
              />
              <PokeballInput
                type="number"
                name="rollNumber"
                label="Roll Number"
                register={register}
                errors={errors}
                focusedField={focusedField}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>

            {/* <PokeballInput
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
              /> */}

            <button
              type="submit"
              className="hover:scale-105 active:scale-95 transition-all mt-5 bg-yellow w-fit m-auto text-blue montserrat font-bold text-2xl py-2 px-8 rounded-xl flex gap-4 justify-center items-center"
            >
              Register <img src={snorlax} alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
