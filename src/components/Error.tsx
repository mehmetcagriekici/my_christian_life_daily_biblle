import { Alert } from "@mui/material";

export default function ErrorComponent({ message }: { message: string }) {
  return (
    <div className="h-dvh w-dvw flex justify-center items-center bg-gray-200 dark:bg-gray-900">
      <Alert variant="outlined" severity="error">
        {message}
      </Alert>
    </div>
  );
}
