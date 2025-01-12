//footer
//logo
//information
//terms of use
export default function Footer() {
  return (
    <footer className="relative w-full min-h-[16%] bg-red-50 flex justify-center items-center gap-5 border-t-2 border-red-800 md:absolute md:top-full">
      {/*LOGO*/}
      <div>logo</div>
      <div className="flex flex-col gap-1 justify-center items-center">
        {/*Information*/}
        <div>information</div>
        {/*Terms of Use*/}
        <div>terms of use</div>
      </div>
    </footer>
  );
}
