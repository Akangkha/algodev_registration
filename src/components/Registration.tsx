import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ash from "../assets/ash.svg";
// import pikachu from "../assets/pikachu.svg";
import snorlax from "../assets/snorlax.svg";
import pokeball from "../assets/pokeball.svg";

interface formData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  whatsapp: string;
  isSame: boolean;
}
const schema: ZodType<formData> = z.object({
  firstName: z.string({ message: "This field is required" }),
  // .max(30, { message: "First name must be less than 30 characters" })
  // .min(1, { message: "First name must be more than 1 characters" }),
  lastName: z.string({ message: "This field is required" }),
  // .max(30, { message: "Last name must be less than 30 characters" })
  // .min(1, { message: "Last name must be more than 1 characters" }),
  email: z.string({ message: "This field is required" }),
  // .email({ message: "Enter valid email" }),
  phone: z.string({ message: "This field is required" }),
  // .regex(
  // /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
  // { message: "Enter valid phone number" }
  // ),
  whatsapp: z.string(),
  isSame: z.boolean(),
});

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const submitForm = async (data: formData) => {
    console.log(data);

    const formData = new FormData();
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      params.append(key, value);
    }

    fetch(
      `https://docs.google.com/forms/d/e/1FAIpQLSfBRZh39FYS-tCgLu51UdyozovyDK9_hMxkjW8R5SncsdjjEQ/formResponse?${params}`,
      {
        method: "POST",
        mode: "no-cors",
      } // this posts the data to google sheets linked with the google form but the values passed are empty
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Form submitted successfully!");
        } else {
          console.error("Error submitting form1:", response.status);
        }
      })
      .catch((error) => console.error("Error submitting form:", error));
  };
  return (
    <div className="w-full h-screen flex relative">
      <img
        src={ash}
        alt=""
        className="hidden xl:block size-[500px] absolute -translate-x-1/2 bottom-0 left-1/2  z-10"
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
      <div className="xl:w-1/2 w-full bg-blue xl:p-12 p-4">
        <h1 className="text-white solid xl:text-7xl text-4xl m-auto w-fit xl:my-12 my-10 text-center">
          Register Now
        </h1>
        <div className="flex flex-col justify-center items-center h-max">
          <form
            className="flex flex-col xl:gap-7 gap-2 montserrat z-20"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col xl:flex-row xl:gap-14 gap-2 w-full">
              <div className="flex flex-col xl:w-1/2 w-full relative">
                <label
                  htmlFor="firstName"
                  className="text-white xl:text-xl text-base font-bold"
                >
                  First Name
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="md:size-12 xl:size-16 size-11 absolute md:top-[22px] xl:top-[26px] top-[24px]  md:-left-[17px] xl:-left-[23px] -left-[15px]"
                />
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  name="entry.521128088"
                  className="bg-white xl:p-4 xl:pl-[50px] p-2 rounded-xl text-lg md:pl-[50px] pl-[30px]"
                />
                {errors.firstName && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col xl:w-1/2 w-full relative">
                <label
                  htmlFor="lastName"
                  className="text-white xl:text-xl text-base font-bold"
                >
                  Last Name
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="md:size-12 xl:size-16 size-11 absolute md:top-[22px] xl:top-[26px] top-[24px]  md:-left-[17px] xl:-left-[23px] -left-[15px]"
                />
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  name="entry.1938341443"
                  className="bg-white xl:p-4 xl:pl-[50px] p-2 rounded-xl text-lg md:pl-[50px] pl-[30px]"
                />
                {errors.lastName && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor="email"
                className="text-white xl:text-xl text-base font-bold"
              >
                Email (Personal)
              </label>
              <img
                src={pokeball}
                alt=""
                className="md:size-12 xl:size-16 size-11 absolute md:top-[22px] xl:top-[26px] top-[24px]  md:-left-[17px] xl:-left-[23px] -left-[15px]"
              />
              <input
                type="email"
                id="email"
                {...register("email")}
                name="entry.2027588860"
                className="bg-white xl:p-4 xl:pl-[50px] p-2 rounded-xl text-lg md:pl-[50px] pl-[30px]"
              />
              {errors.email && (
                <span className="text-red-500 mx-2 px-2 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col xl:flex-row md:gap-6 xl:gap-14 gap-2 w-full">
              <div className="flex flex-col xl:w-1/2 w-full relative">
                <label
                  htmlFor="phone"
                  className="text-white xl:text-xl text-base font-bold"
                >
                  Phone
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="md:size-12 xl:size-16 size-11 absolute md:top-[22px] xl:top-[26px] top-[24px]  md:-left-[17px] xl:-left-[23px] -left-[15px]"
                />
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  name="entry.1956564773"
                  className="bg-white xl:p-4 xl:pl-[50px] p-2 rounded-xl text-lg md:pl-[50px] pl-[30px]"
                />
                {errors.phone && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col xl:w-1/2 w-full relative">
                <label
                  htmlFor="whatsapp"
                  className="text-white xl:text-xl text-base font-bold"
                >
                  Whatsapp
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="md:size-12 xl:size-16 size-11 absolute md:top-[22px] xl:top-[26px] top-[24px]  md:-left-[17px] xl:-left-[23px] -left-[15px]"
                />
                <input
                  type="tel"
                  id="whatsapp"
                  {...register("whatsapp")}
                  name="entry.922164047"
                  className="bg-white xl:p-4 xl:pl-[50px] p-2 rounded-xl text-lg md:pl-[50px] pl-[30px]"
                />
                {errors.whatsapp && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.whatsapp.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-2 z-20">
              <input
                type="checkbox"
                id="isSame"
                {...register("isSame")}
                name="entry.1669604705"
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
                <span className="text-red-500 mx-2 px-2 text-sm">
                  {errors.isSame.message}
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
