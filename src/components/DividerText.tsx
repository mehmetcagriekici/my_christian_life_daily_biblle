export default function DividerText({
  quote,
  psalm,
}: {
  quote: string;
  psalm: string;
}) {
  return (
    <h3 className="font-quoteSecondary text-crimson text-center tracking-widest w-full capitalize dark:text-gold flex flex-col pt-2">
      {quote}
      <span className="font-quotePrimary text-sky-900 text-end tracking-tight w-full uppercase underline text-xs dark:text-white">
        {psalm}
      </span>
    </h3>
  );
}
