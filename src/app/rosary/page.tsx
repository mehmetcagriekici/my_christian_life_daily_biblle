//imports
import NavBar from "@/components/NavBar";
import Closing from "@/components/rosary/Closing";
import Creed from "@/components/rosary/Creed";
import Cross from "@/components/rosary/Cross";
import Father from "@/components/rosary/Father";
import Glory from "@/components/rosary/Glory";
import Maria from "@/components/rosary/Maria";
import MysteryContainer from "@/components/rosary/MysteryContainer";
import Queen from "@/components/rosary/Queen";
import ToggleLatin from "@/components/rosary/ToggleLatin";

import { checkSession } from "@/services/getUser";
import { Divider } from "@mui/material";
import { Suspense } from "react";
import Loading from "./Loading";

//Static page for Rosary
//Latin, English
export default async function RosaryPage() {
  const isLoggedIn = await checkSession();

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex justify-center items-center dark:bg-gray-900">
      {/*NavBar*/}
      <NavBar isLoggedIn={isLoggedIn} />

      {/*Toggle*/}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2">
        <ToggleLatin />
      </div>

      {/*Rosary page*/}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 h-5/6 w-11/12 mt-3 md:w-3/5 xl:w-1/3 bg-gray-100 rounded flex flex-col justify-safe-center items-safe-center overflow-y-auto dark:bg-gray-950">
        <Suspense fallback={<Loading />}>
          {/*Step one: cross*/}
          <Cross />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step two: creed*/}
          <Creed />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step three: father*/}
          <Father />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step four: maria*/}
          <Maria />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step five: glory*/}
          <Glory />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step six: first mystery*/}
          <MysteryContainer index={0} />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step ten: second mystery*/}
          <MysteryContainer index={1} />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step fourteen: first mystery*/}
          <MysteryContainer index={2} />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step eighteen: third mystery*/}
          <MysteryContainer index={3} />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step twenty one: Conclude*/}
          <Queen />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step twenty tow: Closing*/}
          <Closing />
          <Divider
            flexItem
            variant="middle"
            className="bg-crimson dark:bg-gray-700"
          />
          {/*Step twenty three: Cross*/}
          <Cross />
        </Suspense>
      </div>
    </div>
  );
}
