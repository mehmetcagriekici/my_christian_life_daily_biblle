//footer
//logo
//information

import { Divider } from "@mui/material";

//terms of use
export default function Footer() {
  return (
    <footer className="relative w-full min-h-[16%] p-3 bg-red-900 flex justify-center items-center gap-5 border-t-2 border-red-800 md:absolute md:top-full lg:min-h-[20%]">
      {/*API*/}
      <section className="w-full h-1/6 flex justify-center items-center gap-3">
        {/*LOGO*/}
        <div>
          <img
            src=" https://files.evangelizo.org/images/website/logo/logo_2018_118.png"
            alt="evangelizo_icon"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-2 font-serifPrimary tracking-wide text-base text-stone-100">
          {/*Disclaimer*/}
          <p>
            Daily bible readings and the Saint of the day informations are
            coming from the Evangelizo API.
          </p>
          {/*SOURCE LINK*/}
          <a
            href="https://www.evangelizo.org/"
            target="blank"
            className="capitalize underline text-sky-200 hover:cursor-pointer hover:text-yellow-200 active:text-red-200"
          >
            click here to visit evangelizo
          </a>
        </div>
      </section>
      <Divider flexItem variant="middle" className="bg-black" />
      {/*Terms of usage*/}
      <section></section>
    </footer>
  );
}
