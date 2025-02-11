//footer
//logo
//information

import { Divider } from "@mui/material";
import Image from "next/image";

//terms of use
export default function Footer() {
  return (
    <footer className="relative w-full p-3 bg-red-800 flex flex-col justify-center items-center gap-5 dark:bg-emerald-900">
      {/*Terms of Usage*/}
      <section className="w-full flex justify-center items-center gap-3">
        <p className="font-serifPrimary tracking-wide text-sm text-center text-sky-200 hover:cursor-pointer hover:text-yellow-200 hover:underline active:text-red-200">
          Even though this is a small hobby project, you still need to create an
          account to use the other features inside this app. With V0 relase,
          these fetaures are writing reflections on daily readings, being able
          to display the previous reflections, and edit your profile -adding an
          avatar, or changing the location-. Once you login, your email, and the
          data you shared in this application will be stored safely in a
          supabase server, only I can reach. You can use this application
          freely, you can copy the code in the public repositiory from my
          github. Keep this in mind this is only a hobby project, and version 0
          is pretty limited.
        </p>
      </section>
      {/*API*/}
      <section className="w-full flex justify-center items-center gap-3">
        {/*LOGO*/}
        <Image
          src="https://files.evangelizo.org/images/website/logo/logo_2018_118.png"
          alt="evangelizo_icon"
          className="rounded-full object-contain"
          height={100}
          width={100}
        />
        {/*SOURCE LINK*/}
        <a
          href="https://www.evangelizo.org/"
          target="blank"
          className="hover:underline text-sky-200 hover:cursor-pointer hover:text-yellow-200 active:text-red-200"
        >
          Daily bible readings and the Saint of the day informations are coming
          from the Evangelizo API. Click here to visit evangelizo
        </a>
      </section>
      <Divider flexItem variant="middle" className="bg-white dark:bg-sky-600" />
      {/*USED APIS*/}
      <section className="w-full flex justify-center items-center">
        {/*REST COUNTRIES*/}
        <a
          href="https://restcountries.com/"
          target="blank"
          className="w-full font-serifPrimary tracking-wide text-sm text-center text-sky-200 hover:cursor-pointer hover:text-yellow-200 hover:underline active:text-red-200"
        >
          All the regions, subregions, and countries in signup form are coming
          from the REST Countries API. Click here to visit them.
        </a>
      </section>
      <Divider flexItem variant="middle" className="bg-white dark:bg-sky-600" />
      {/*COUNTRY STATE CITY API*/}
      <section className="w-full flex justify-center items-center gap-3">
        <Image
          src="https://countrystatecity.in/img/world.svg"
          alt="csc api"
          className="rounded-full object-contain"
          height={100}
          width={100}
        />
        <a
          href="https://countrystatecity.in/"
          target="blank"
          className="font-serifPrimary tracking-wide text-sm text-center text-sky-200 hover:cursor-pointer hover:text-yellow-200 hover:underline active:text-red-200"
        >
          The cities in the signup form are coming from the Country State City
          API.Click here to visit them
        </a>
      </section>
      <Divider flexItem variant="middle" className="bg-white dark:bg-sky-600" />
      <section className="w-full flex justify-center items-center gap-3">
        <a
          href="https://openai.com/"
          target="blank"
          className="font-serifPrimary tracking-wide text-sm text-center text-sky-200 hover:cursor-pointer hover:text-yellow-200 hover:underline active:text-red-200"
        >
          Rosary data (both Latin and English) provided with assistance from
          ChatGPT by OpenAI.
        </a>
      </section>
    </footer>
  );
}
