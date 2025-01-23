"use client";

//imports
import { FieldValues, useForm } from "react-hook-form";
import SubmitBtn from "../SubmitBtn";
import { format } from "date-fns";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TextField } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import { getDailyBible } from "@/services/getBible";
import { getSaintOfTheDay } from "@/services/getSaint";
import { sendReflection } from "@/services/getReflections";

export default function ReflectionForm({ id }: { id: string }) {
  //get readings of the day
  //get saints of the day

  //get the current date
  const today = format(new Date(), "y-MM-dd");

  //use form
  const { handleSubmit, reset, register } = useForm();

  async function onSubmit(formData: FieldValues) {
    //form fields
    const { reflection, reflection_date } = formData as {
      reflection: string;
      reflection_date: string;
    };
    // get the daily bible readings
    const { dataHeading, dataReading1, dataReading2, dataGospel, dataPsalms } =
      await getDailyBible();
    //get the saints
    const { saints } = await getSaintOfTheDay();

    //build the data
    const reflection_readings = {
      dataHeading,
      dataReading1,
      dataPsalms,
      dataReading2,
      dataGospel,
    };

    const reflection_data = {
      reflection_date,
      reflection_readings,
      reflection_saints: saints,
      reflection,
    };

    //send it to the server
    await sendReflection({ id, reflection_data });

    //reset fields
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/*reflection date read-only*/}
      <section>
        <label htmlFor="reflection_date">
          <CalendarTodayIcon />
          <span>{today}</span>
        </label>
        <input
          {...register("reflection_date", { value: today })}
          readOnly={true}
          type="date"
          id="reflection_date"
        />
      </section>
      {/*reflection text field*/}
      <section>
        <label htmlFor="reflection">
          <NotesIcon />
          <span>your reflection</span>
        </label>
        <TextField
          {...register("reflection", { required: true })}
          id="reflection"
          multiline
        />
      </section>
      {/*submit*/}
      <section>
        <SubmitBtn>submit</SubmitBtn>
      </section>
    </form>
  );
}
