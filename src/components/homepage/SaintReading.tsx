//saint of the day component
//data coming from the api

//imports
import { STYLES_HEADING_PRIMARY } from "@/utils/commonStyles";
import { Divider } from "@mui/material";

export default function SaintReading() {
  return (
    <section className="flex flex-col justify-center items-center p-5 gap-4 md:bg-gray-100 mt-3 mb-5 md:w-3/5 lg:w-2/5 overflow-y-auto">
      <h1 className={STYLES_HEADING_PRIMARY}>Header</h1>
      <Divider flexItem variant="middle" className="bg-red-500" />
    </section>
  );
}
