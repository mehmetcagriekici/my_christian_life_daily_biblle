//imports
import ReflectionsList from "@/components/journal/ReflectionsList";
import ReflectionsModal from "@/components/journal/ReflectionsModal";
import NavBar from "@/components/NavBar";
import { getReflections } from "@/services/reflectionsServerServices";
import { getUserData } from "@/services/getUser";
import { format } from "date-fns";

export default async function JournalPage() {
  //get user id
  const {
    userData: { id },
  }: { userData: { [key: string]: string } } = await getUserData();

  //get reflections with the user id
  const {
    reflections: { reflections },
  } = await getReflections({ id });

  //get the current date, used as reflections key
  const today = format(new Date(), "y-MM-dd");

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-gray-950">
      {/*NavBar*/}
      <NavBar isLoggedIn={true} />
      {/*Journal page*/}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3 flex flex-col justify-center items-center p-3 bg-gray-100 rounded dark:bg-gray-900">
        {/*display only if there are reflections belong to this user*/}
        {reflections ? <ReflectionsList reflections={reflections} /> : ""}
        {/*Contains ReflectionForm and ReadReflection, and toggle form and read*/}
        {/*always display, if there are no reflections, this will only display the ReflectionForm*/}
        <ReflectionsModal id={id} today={reflections[today]} />
      </div>
    </div>
  );
}
