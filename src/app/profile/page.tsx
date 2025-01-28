//imports
import NavBar from "@/components/NavBar";
import { getUserData } from "@/services/getUser";
import EditModal from "@/components/profile/EditModal";

export default async function ProfilePage() {
  //get user data from the server
  const { userData }: { userData: { [key: string]: string | number } } =
    await getUserData();

  //get the reflections

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-slate-950">
      {/*NavBar, if there is not session, the app will redirect to auth page*/}
      <NavBar isLoggedIn={true} />

      <EditModal userData={userData} />
    </div>
  );
}
