export default function HomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-4 xl:bg-gray-100 mt-3 mb-5 rounded md:w-4/5 xl:w-2/5 xl:dark:bg-slate-800">
      {children}
    </div>
  );
}
