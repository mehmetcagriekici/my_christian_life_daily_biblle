//saint of the day component
//data coming from the api

//imports
import { getSaintOfTheDay } from "@/services/getSaint";
import { Divider } from "@mui/material";

export default async function SaintReading() {
  //data
  const { saints } = await getSaintOfTheDay();

  return saints.length > 0 ? (
    <section className="flex flex-col justify-center items-center p-5 gap-4 md:bg-gray-100 mt-3 mb-5 md:w-3/5 lg:w-2/5 overflow-y-auto">
      <h1 className="font-serifPrimary font-bold uppercase tracking-wider text-lg text-stone-900 lg:text-xl text-center">
        saints of the day
      </h1>
      <Divider flexItem variant="middle" className="bg-red-500" />
      <p className="font-sans text-sm">
        Click on the links below to read detailed information about the saints
        on Evangalizo.org
      </p>
      <ul className="flex flex-col justify-start items-start gap-1">
        {saints.map((saint, index) => (
          <li key={index} className="">
            <a
              href={saint.link}
              target="blank"
              className="font-serifPrimary text-yellow-800 hover:cursor-pointer hover:underline hover:text-sky-800 active:text-red-800 text-sm md:text-base"
            >
              {saint.saint}
            </a>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    ""
  );
}
