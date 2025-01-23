import Father from "./Father";
import Fatima from "./Fatima";
import Glory from "./Glory";
import Maria from "./Maria";
import Mystery from "./Mystery";

export default function MysteryContainer({ index }: { index: number }) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-5">
      <Mystery index={index} />
      <Father />
      <Maria />
      <Glory />
      <Fatima />
    </div>
  );
}
