//import
import BibleReading from "@/components/homepage/BibleReading";
import Footer from "@/components/homepage/Footer";
import AuthClient from "@/components/homepage/AuthClient";
import NavBar from "@/components/homepage/NavBar";
import SaintReading from "@/components/homepage/SaintReading";

//home page
export default function HomePage() {
  //app
  return (
    <main className="h-dvh w-dv overflow-hidden">
      <NavBar />
      <BibleReading />
      <SaintReading />
      <AuthClient />
      <Footer />
    </main>
  );
}
