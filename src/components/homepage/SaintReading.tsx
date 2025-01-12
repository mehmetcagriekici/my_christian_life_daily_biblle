//saint of the day component
//data coming from the api

//imports
import {
  STYLES_HEADING_PRIMARY,
  STYLES_HEADING_SECONDARY,
  STYLES_PARAGRAPH,
} from "@/utils/commonStyles";
import { Divider } from "@mui/material";

export default function SaintReading() {
  return (
    <section className="flex flex-col justify-center items-center p-5 gap-3 md:w-3/5 lg:w-2/5">
      <h1 className={STYLES_HEADING_PRIMARY}>Header</h1>
      <Divider flexItem variant="middle" className="bg-red-500" />
      <h3 className={STYLES_HEADING_SECONDARY}>Saint Header</h3>
      <p className={STYLES_PARAGRAPH}>
        saint: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Temporibus officia quae repudiandae iste sit sequi tempore omnis est.
        Excepturi ipsa voluptates expedita nesciunt similique, minus dolor magni
        quibusdam corrupti sint.
      </p>
    </section>
  );
}
