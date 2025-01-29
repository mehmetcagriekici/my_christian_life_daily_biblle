import { CircularProgress } from "@mui/material";

export default function FormLoading() {
  return (
    <div className="h-full w-full bg-inherit flex justify-center items-center">
      <CircularProgress size={80} />
    </div>
  );
}
