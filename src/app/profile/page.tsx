//imports
import NavBar from "@/components/NavBar";
import EditProfile from "@/components/profile/EditProfileForm";
import JournalSummary from "@/components/profile/JournalSummary";
import UserInfo from "@/components/profile/UserInfo";
import { getUserData } from "@/services/getUser";

export default async function ProfilePage() {
  //get user data from the server
  const { userData }: { userData: { [key: string]: string | number } } =
    await getUserData();

  //icons

  //only the necessary data
  //will be used in UserInfo and EditProfile
  const data = Object.entries(userData).filter(
    ([key]) => key !== "id" && key !== "created_at"
  );

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-slate-800">
      {/*NavBar, if there is not session, the app will redirect to auth page*/}
      <NavBar isLoggedIn={true} />
      {/*Profile page*/}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3">
        {/*display user journal list*/}
        <JournalSummary />
        {/*display user information*/}
        <UserInfo data={data} />
        {/*Open Edit Proflie Form*/}
        <EditProfile />
      </div>
    </div>
  );
}
