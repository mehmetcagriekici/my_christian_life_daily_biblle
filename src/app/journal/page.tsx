//imports
import ReflectionsModal from "@/components/journal/ReflectionsModal";
import NavBar from "@/components/NavBar";
import { getReflections } from "@/services/reflectionsServerServices";
import { getUserData } from "@/services/getUser";

export default async function JournalPage() {
  //get user id
  const {
    userData: { id },
  }: { userData: { [key: string]: string } } = await getUserData();

  //get reflections with the user id
  const {
    reflections: { reflections },
  } = await getReflections({ id });

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-gray-950">
      {/*NavBar*/}
      <NavBar isLoggedIn={true} />
      {/*Journal page*/}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3 flex flex-col justify-center items-center p-3 bg-gray-100 rounded dark:bg-gray-900">
        {/*client component that controls the list, read, and the form.*/}
        <ReflectionsModal id={id} reflections={reflections} />
      </div>
    </div>
  );
}
