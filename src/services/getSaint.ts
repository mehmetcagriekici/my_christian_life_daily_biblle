//imports
import * as cheerio from "cheerio";

//get saint of the day readingfrom evengalizo
export function orgSaints(data: string) {
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
        link: `http://feed.evangelizo.org${link}`,
      });
  });

  return { saints };
}
