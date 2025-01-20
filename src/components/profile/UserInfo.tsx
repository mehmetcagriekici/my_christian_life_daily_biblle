//imports

export default function UserInfo({
  data,
}: {
  data: [string, string | number][];
}) {
  return (
    <ul className="w-full h-full flex flex-col justify-safe-center items-safe-center gap-3 border-2 border-gold rounded-lg p-3 overflow-y-auto font-serifSecondary bg-gray-100 text-gray-800 select-none">
      {data.map((d, i) => (
        <li key={i} className="flex flex-col justify-center items-center">
          <span className="capitalize">{d[0].replaceAll("_", " ")}</span>
          <span className="font-serifPrimary">{d[1]}</span>
        </li>
      ))}
    </ul>
  );
}
