//imports
import { Divider } from "@mui/material";

export default function EditFormSection({
  children,
  displayDivider = true,
}: {
  children: React.ReactNode;
  displayDivider?: boolean;
}) {
  return (
    <section className=" w-4/5 flex flex-col justify-center items-center gap-6">
      {children}
      {displayDivider && (
        <Divider flexItem variant="middle" className="bg-gold dark:bg-white" />
      )}
    </section>
  );
}
