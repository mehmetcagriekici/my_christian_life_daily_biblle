import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-black">
      <CircularProgress color="success" size={100} />
    </div>
  );
}
