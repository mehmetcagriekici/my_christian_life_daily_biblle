//imports
import ReflectionsModal from "@/components/journal/ReflectionsModal";
import NavBar from "@/components/NavBar";
import { getReflections } from "@/services/reflectionsServerServices";
import { getUserData } from "@/services/getUser";
import { Suspense } from "react";
import Loading from "./Loading";

export default async function JournalPage() {
  //get user id
  const {
    userData: { id },
  }: { userData: { [key: string]: string } } = await getUserData();

  //get reflections with the user id
  //might be null
  const response = await getReflections({ id });

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex flex-col justify-center items-center dark:bg-gray-950">
      {/*NavBar*/}
      <NavBar isLoggedIn={true} />

      <Suspense fallback={<Loading />}>
        {/*client component that controls the list, read, and the form.*/}
        <ReflectionsModal
          id={id}
          reflections={response.reflections?.reflections}
        />
      </Suspense>
    </div>
  );
}
