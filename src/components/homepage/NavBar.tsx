//navigate between roots
//home
//auth
//journal
//toggle

import DarkClient from "./DarkClient";

//profile
export default function NavBar() {
  return (
    <nav>
      {/*Dark mode toggle*/}
      <DarkClient />
    </nav>
  );
}
