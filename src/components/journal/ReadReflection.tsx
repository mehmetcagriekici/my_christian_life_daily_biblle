"use client";

//imports
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BtnPage from "../BtnPage";
import { closeReading } from "@/store/slices/reflectionSlice";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Divider } from "@mui/material";
import { useState } from "react";
import AccordionComponent from "../AccordionComponent";

export default function ReadReflection() {
  //current reflection
  const { currentReflection } = useAppSelector((s) => s.reflection);
  const dispatch = useAppDispatch();

  //accordion
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  //only display if there is a selected reflection, and toggle is on the ReadReflection
  return (
    <div className="h-full w-full select-none overflow-y-auto flex flex-col justify-safe-center items-safe-center gap-5 p-3">
      <section>
        {/*show reflection form*/}
        {/*show reflections list*/}
        <BtnPage onClick={() => dispatch(closeReading())}>
          close reading
        </BtnPage>
      </section>
      {/*reflection date*/}
      <section className="w-full flex flex-col gap-1 justify-center items-center font-serifPrimary text-crimson dark:text-gold">
        <CalendarTodayIcon className="text-gray-800 dark:text-gray-200" />
        <span>{currentReflection?.reflection_date}</span>
      </section>
      <Divider flexItem variant="middle" className="bg-black dark:bg-white" />
      {/*reflection text*/}
      <section className="w-full">
        <p className="text-center leading-relaxed tracking-wider font-quoteSecondary text-gray-800 dark:text-gray-200">
          {currentReflection?.reflection}
        </p>
      </section>
      <Divider flexItem variant="middle" className="bg-black dark:bg-white" />
      {/*reflection bible reading Accordion*/}
      {currentReflection?.reflection_readings ? (
        <section className="w-full flex flex-col justify-center items-center gap-3">
          <h1 className="w-full text-center leading-relaxed tracking-wider font-quotePrimary text-crimson dark:text-gold">
            {currentReflection.reflection_readings.dataHeading}
          </h1>
          <AccordionComponent
            expanded={expanded}
            handleChange={handleChange}
            summary={currentReflection.reflection_readings.dataReading1.heading}
            detailsArray={
              currentReflection.reflection_readings.dataReading1.textArray
            }
            panel="panel1"
          />
          <AccordionComponent
            expanded={expanded}
            handleChange={handleChange}
            summary={currentReflection.reflection_readings.dataPsalms.heading}
            detailsArray={
              currentReflection.reflection_readings.dataPsalms.textArray
            }
            panel="panel2"
          />
          {currentReflection.reflection_readings.dataReading2.heading ? (
            <AccordionComponent
              expanded={expanded}
              handleChange={handleChange}
              summary={
                currentReflection.reflection_readings.dataReading2.heading
              }
              detailsArray={
                currentReflection.reflection_readings.dataReading2.textArray
              }
              panel="panel1"
            />
          ) : (
            ""
          )}
          <AccordionComponent
            expanded={expanded}
            handleChange={handleChange}
            summary={currentReflection.reflection_readings.dataGospel.heading}
            detailsArray={
              currentReflection.reflection_readings.dataGospel.textArray
            }
            panel="panel3"
          />
        </section>
      ) : (
        ""
      )}
      {/*reflection saints*/}
      <section>
        {currentReflection?.reflection_saints ? (
          <ul className="w-full">
            {currentReflection.reflection_saints.map((s, i) => (
              <li key={i} className="w-full text-center font-serifPrimary">
                <a
                  href={s.link}
                  target="blank"
                  className="w-full text-sky-900 hover:underline hover:text-sky-600 dark:text-sky-300 dark:hover:text-green-300"
                >
                  {s.saint}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}
