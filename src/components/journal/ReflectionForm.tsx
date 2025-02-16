"use client";

//imports
import { FieldValues, useForm } from "react-hook-form";
import SubmitBtn from "../SubmitBtn";
import { format } from "date-fns";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Alert, Divider, TextField } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import { sendReflection } from "@/services/getReflections";
import { TBibleReading, TReflection, TSaint } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openList,
  setReflections,
  setReflectionText,
} from "@/store/slices/reflectionSlice";
import { useState } from "react";
import BtnPage from "../BtnPage";
import FormLoading from "../FormLoading";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function ReflectionForm({
  id,
  saints,
  bibleData,
  reflections,
}: {
  id: string;

  saints: TSaint[];
  bibleData: TBibleReading;
  reflections: { [key: string]: TReflection };
}) {
  //todays reflection
  const { reflectionText } = useAppSelector((s) => s.reflection);
  const dispatch = useAppDispatch();

  //get the current date, used as reflections key
  const today = format(new Date(), "y-MM-dd");

  //use form
  const { handleSubmit, reset, register } = useForm();

  //form loading
  const [isLoading, setIsLoading] = useState(false);
  //form errors
  const [formError, setFormError] = useState("");

  //submit and edit
  async function onSubmit(formData: FieldValues) {
    try {
      setIsLoading(true);
      //form fields
      const { reflection, reflection_date } = formData as {
        reflection: string;
        reflection_date: string;
      };

      let reflection_data: TReflection = {
        reflection,
        reflection_date,
        reflection_readings: {
          dataHeading: "",
          dataGospel: { heading: "", textArray: [] },
          dataPsalms: { heading: "", textArray: [] },
          dataReading1: { heading: "", textArray: [] },
          dataReading2: { heading: "", textArray: [] },
        },
        reflection_saints: [],
      };

      if (reflections[today]) {
        reflection_data = {
          reflection,
          reflection_date,
          reflection_readings: reflections[today].reflection_readings,
          reflection_saints: reflections[today].reflection_saints,
        };
      } else {
        //if there is no reflectionToday
        // get the daily bible readings
        const {
          dataHeading,
          dataReading1,
          dataReading2,
          dataGospel,
          dataPsalms,
        } = bibleData;

        //build the data
        const reflection_readings = {
          dataHeading,
          dataReading1,
          dataPsalms,
          dataReading2,
          dataGospel,
        };

        reflection_data = {
          reflection_date,
          reflection_readings,
          reflection_saints: saints,
          reflection,
        };
      }
      //update text field
      dispatch(setReflectionText(reflection));
      //send it to the server
      await sendReflection({ id, reflection_data });
      //update reflections
      dispatch(
        setReflections({
          ...reflections,
          [reflection_data.reflection_date]: reflection_data,
        })
      );
    } catch (error) {
      setFormError("Reflection Error!");
      throw new Error(error as string);
    } finally {
      //reset fields
      reset();
      setIsLoading(false);
    }
  }

  function showPastReflections() {
    dispatch(openList());
  }

  if (isLoading) return <FormLoading />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-11/12 h-5/6 xl:w-3/5 flex flex-col justify-center items-center gap-4 bg-gray-100 dark:bg-gray-900 rounded"
    >
      {formError && (
        <Alert variant="filled" severity="error">
          {formError}
        </Alert>
      )}
      <section className="flex">
        {/*show past reflections*/}
        {reflections ? (
          <BtnPage onClick={showPastReflections}>
            <LibraryBooksIcon />
            <span>display reflections</span>
          </BtnPage>
        ) : (
          ""
        )}
      </section>
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      {/*reflection date read-only*/}
      <section className="w-1/3 flex justify-center items-center gap-3 font-quotePrimary uppercase text-gray-900 dark:text-white text-sm md:text-base">
        <label
          htmlFor="reflection_date"
          className="w-full flex gap-1 justify-center items-center"
        >
          <CalendarTodayIcon className="text-sky-900 dark:text-sky-600" />
          <span>today</span>
        </label>
        <input
          {...register("reflection_date", { value: today })}
          readOnly={true}
          type="date"
          id="reflection_date"
          className="bg-transparent select-none outline-none border-none w-full text-center tracking-wide"
        />
      </section>
      <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />

      {/*reflection text field*/}
      <section className="relative w-full flex flex-col justify-safe-center gap-3 items-safe-center rounded p-1">
        <label
          htmlFor="reflection"
          className="font-quotePrimary text-sky-900 dark:text-sky-100"
        >
          <NotesIcon />
          <span>your reflection</span>
        </label>

        <div className="w-full flex justify-safe-center items-safe-center overflow-y-auto p-3">
          <TextField
            {...register("reflection", {
              required: true,
              value: reflectionText
                ? reflectionText
                : reflections
                ? reflections[today].reflection
                : reflectionText,
              onChange: (e) => {
                dispatch(setReflectionText(e.target.value));
              },
            })}
            id="reflection"
            label="To create is to reflect the Creator. (St. John Paul II)"
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            slotProps={{
              input: {
                className: "text-gray-900 dark:text-gray-200",
              },
              inputLabel: {
                className: "text-sky-900 dark:text-gold indent-2",
              },
            }}
            className="bg-gray-200 rounded dark:bg-gray-800 "
          />
        </div>
      </section>

      {/*submit*/}
      <section>
        <SubmitBtn>{reflectionText ? "Send Edit" : "Submit"}</SubmitBtn>
      </section>
    </form>
  );
}
