//presentational component
export default function PresentText({
  heading,
  textArray,
}: {
  heading: string;
  textArray: string[];
}) {
  return (
    <>
      <h3 className="font-serifSecondary font-semibold capitalize tracking-wide text-xl text-stone-800 text-center lg:text-2xl">
        {heading}
      </h3>
      <div className="flex flex-col justify-center items-center gap-1">
        {textArray.map((text, i) => (
          <p
            className="text-center tracking-wide leading-relaxed text-base font-sans lg:text-lg"
            key={i}
          >
            {text}
          </p>
        ))}
      </div>
    </>
  );
}
