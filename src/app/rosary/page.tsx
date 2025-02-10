//imports
import NavBar from "@/components/NavBar";
import Creed from "@/components/rosary/Creed";
import Cross from "@/components/rosary/Cross";
import Father from "@/components/rosary/Father";
import Glory from "@/components/rosary/Glory";
import Maria from "@/components/rosary/Maria";
import MysteryContainer from "@/components/rosary/MysteryContainer";
import ToggleLatin from "@/components/rosary/ToggleLatin";

import { checkSession } from "@/services/getUser";
import { Divider } from "@mui/material";
import { Suspense } from "react";
import Loading from "./Loading";
import RosaryContainer from "@/components/rosary/RosaryContainer";

//Static page for Rosary
//Latin, English
export default async function RosaryPage() {
  const isLoggedIn = await checkSession();

  return (
    <div className="h-dvh w-dvw relative bg-gray-200 flex flex-col justify-safe-center items-safe-center overflow-y-auto dark:bg-gray-900">
      {/*NavBar*/}
      <NavBar isLoggedIn={isLoggedIn} />
      <RosaryContainer>
        <ToggleLatin />
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
          {/*Step twenty three: Cross*/}
          <Cross />
        </Suspense>
      </RosaryContainer>
    </div>
  );
}
