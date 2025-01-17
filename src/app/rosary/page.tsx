//imports
import NavBar from "@/components/NavBar";

//Static page for Rosary
//Latin, English
export default function RosaryPage() {
  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-slate-800">
      {/*NavBar*/}
      <NavBar />
      {/*Rosary page*/}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3"></div>
    </div>
  );
}
