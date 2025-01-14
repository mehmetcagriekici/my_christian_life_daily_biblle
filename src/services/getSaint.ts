//imports
import axios from "axios";
import { format } from "date-fns";
import * as cheerio from "cheerio";

//get saint of the day readingfrom evengalizo
export async function getSaintOfTheDay() {
  const baseApiKey = process.env.NEXT_EVANGELIZO_API as string;
  //date format = year/month/day
  const currDate = format(new Date(), "yyyMMdd");
  //final api to get data
  const key = `${baseApiKey}date=${currDate}&lang=AM&type=saint`;

  //get data (htm/text)
  const { data } = await axios.get<string>(key, { responseType: "text" });

  if (!data)
    throw new Error(
      "Failed getting Saint of the Day Data from Evangelizo API."
    );

  //use cherio to get the text and extract href values
  const saints: { saint: string; link: string }[] = [];

  const $ = cheerio.load(data);

  //get the saints, href + text
  $("a").each((_, i) => {
    const saint = $(i).text().trim();
    const link = $(i).attr("href");

    if (saint && link)
      saints.push({
        saint,
        link: `${process.env.NEXT_EVANGELIZO_FEED}${link}`,
      });
  });

  return { saints };
}
