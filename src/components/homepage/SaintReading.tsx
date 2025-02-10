//saint of the day component

//imports
import { TSaint } from "@/utils/types";
import { Divider } from "@mui/material";
import HomeContainer from "./HomeContainer";

export default function SaintReading({ saints }: { saints: TSaint[] }) {
  return saints.length > 0 ? (
    <HomeContainer>
      <h1 className="font-serifPrimary font-bold uppercase tracking-wider text-lg text-stone-900 lg:text-xl text-center dark:text-gray-200">
        saints of the day
      </h1>
      <Divider flexItem variant="middle" className="bg-crimson dark:bg-white" />
      <p className="font-sans text-sm text-sky-900 dark:text-gray-200">
        Click on the links below to read detailed information about the saints
        on Evangalizo.org
      </p>
      <ul className="flex flex-col justify-start items-start gap-1">
        {saints.map((saint, index) => (
          <li key={index} className="">
            <a
              href={saint.link}
              target="blank"
              className="font-serifPrimary text-yellow-800 hover:cursor-pointer hover:underline hover:text-sky-800 active:text-red-800 text-sm md:text-base dark:text-amber-600 dark:hover:text-gold"
            >
              {saint.saint}
            </a>
          </li>
        ))}
      </ul>
    </HomeContainer>
  ) : (
    ""
  );
}
