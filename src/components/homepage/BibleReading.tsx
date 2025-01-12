//daily bible reading component
//data coming from the api

//imports
import {
  STYLES_HEADING_PRIMARY,
  STYLES_HEADING_SECONDARY,
  STYLES_PARAGRAPH,
} from "@/utils/commonStyles";
import { Divider } from "@mui/material";

export default function BibleReading() {
  return (
    <section className="flex flex-col justify-center items-center p-5 gap-4 md:w-3/5 lg:w-2/5">
      <h1 className={STYLES_HEADING_PRIMARY}>Header</h1>
      <Divider flexItem variant="middle" className="bg-red-500" />
      <h3 className={STYLES_HEADING_SECONDARY}>Header Reading</h3>
      <p className={STYLES_PARAGRAPH}>
        reading: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa
        quibusdam odit provident doloremque similique cumque cum aut ex, laborum
        ipsum? Sit nihil vero ea consequatur labore, exercitationem natus at
        voluptates.
      </p>
      <Divider flexItem variant="middle" className="bg-red-500" />
      <h3 className={STYLES_HEADING_SECONDARY}>Header Psalm</h3>
      <p className={STYLES_PARAGRAPH}>
        psalm: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
        recusandae velit, molestiae ducimus iste distinctio corporis doloribus
        quis doloremque exercitationem impedit inventore accusamus earum, nulla
        voluptates soluta! Earum, aliquam tempore!
      </p>
      <Divider flexItem variant="middle" className="bg-red-500" />
      <h3 className={STYLES_HEADING_SECONDARY}>Header Gospel</h3>
      <p className={STYLES_PARAGRAPH}>
        Gospel: Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
        itaque provident quidem, fuga deleniti similique! Reprehenderit, aliquam
        magnam animi libero delectus perspiciatis maiores tenetur, voluptas,
        laborum iste consequuntur! Magni, natus?
      </p>
    </section>
  );
}
