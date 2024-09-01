import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import ash from "../assets/ash.svg";
import pikachu from "../assets/pikachu.svg";
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

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const submitForm = async (data: formData) => {
    console.log(data);

    const entryMap = {
      firstName: "entry.521128088",
      lastName: "entry.1938341443",
      email: "entry.2027588860",
      phone: "entry.1956564773",
      whatsapp: "entry.922164047",
      isSame: "entry.1669604705",
    };

    // const params = new URLSearchParams();
    // for (const [key, value] of Object.entries(data)) {
    //    // Convert value to string
    // }
    // const formData = new FormData();

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      params.append(entryMap[key], value.toString());
    }

    fetch(
      `https://docs.google.com/forms/d/e/1FAIpQLSfBRZh39FYS-tCgLu51UdyozovyDK9_hMxkjW8R5SncsdjjEQ/formResponse?${params}`,
      {
        method: "POST",
        mode: "no-cors",
      }
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
        className="size-[500px] absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
      />
      <div className="w-1/2 bg-yellow flex justify-center items-center relative">
        <div className="absolute p-8 top-0 right-0 solid text-blue text-3xl">
          xxx
        </div>
        <div className="text-center">
          <div className="hollow font-bold text-blue text-[160px] flex flex-nowrap">
            P
            <span className="relative">
              o
              <img
                src={pokeball}
                alt=""
                className="absolute top-[74px] left-0 pokeballText"
              />
            </span>
            keM
            <span className="relative">L</span>
          </div>
          <div>
            <div className="bowlby text-blue text-3xl">
              Sep XX 2024, 10 am Onwards
            </div>
            <div className="bowlby text-blue text-3xl">Campus X Auditorium</div>
          </div>
        </div>
        <div className="absolute p-8 bottom-0 left-0 solid text-blue text-3xl">
          xxx
        </div>
      </div>
      <div className="w-1/2 bg-blue p-12">
        <h1 className="text-white solid text-7xl m-auto w-fit my-24">
          Register Now
        </h1>
        <div className="flex flex-col justify-center items-center h-max">
          <form
            className="flex flex-col gap-7 montserrat"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex gap-14 w-full">
              <div className="flex flex-col w-1/2 relative">
                <label
                  htmlFor="firstName"
                  className="text-white text-xl font-bold"
                >
                  First Name
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="size-16 absolute top-[26px] -left-[23px]"
                />
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  name="entry.521128088"
                  className="bg-white p-4 rounded-xl text-lg pl-[50px]"
                />
                {errors.firstName && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-1/2 relative">
                <label
                  htmlFor="lastName"
                  className="text-white text-xl font-bold"
                >
                  Last Name
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="size-16 absolute top-[26px] -left-[23px]"
                />
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  name="entry.1938341443"
                  className="bg-white p-4 rounded-xl text-lg pl-[50px]"
                />
                {errors.lastName && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col relative">
              <label htmlFor="email" className="text-white text-xl font-bold">
                Email (Personal)
              </label>
              <img
                src={pokeball}
                alt=""
                className="size-16 absolute top-[26px] -left-[23px]"
              />
              <input
                type="email"
                id="email"
                {...register("email")}
                name="entry.2027588860"
                className="bg-white p-4 rounded-xl text-lg pl-[50px]"
              />
              {errors.email && (
                <span className="text-red-500 mx-2 px-2 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex gap-14 w-full">
              <div className="flex flex-col w-1/2 relative">
                <label htmlFor="phone" className="text-white text-xl font-bold">
                  Phone
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="size-16 absolute top-[26px] -left-[23px]"
                />
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  name="entry.1956564773"
                  className="bg-white p-4 rounded-xl text-lg pl-[50px]"
                />
                {errors.phone && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-1/2 relative">
                <label
                  htmlFor="whatsapp"
                  className="text-white text-xl font-bold"
                >
                  Whatsapp
                </label>
                <img
                  src={pokeball}
                  alt=""
                  className="size-16 absolute top-[26px] -left-[23px]"
                />
                <input
                  type="tel"
                  id="whatsapp"
                  {...register("whatsapp")}
                  name="entry.922164047"
                  className="bg-white p-4 rounded-xl text-lg pl-[50px]"
                />
                {errors.whatsapp && (
                  <span className="text-red-500 mx-2 px-2 text-sm">
                    {errors.whatsapp.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                id="isSame"
                {...register("isSame")}
                name="entry.1669604705"
                className="bg-white p-4 rounded-xl text-lg pl-[50px]"
                value="Yes"
              />
              <label
                htmlFor="isSame"
                className="text-white text-xl font-bold ml-5"
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
              className="bg-yellow w-fit m-auto text-blue montserrat font-bold text-2xl py-2 px-8 rounded-xl flex gap-4 justify-center items-center"
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
