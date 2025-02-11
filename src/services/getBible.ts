//helper function
const removeVerticalLines = (str: string) => str.replaceAll("|", "");
const getHeadingsFromTheReadings = (str: string) =>
  str.split("\n").filter((s) => s);

//get daily bible reading from evengalizo
export function orgBible(bibleData: string) {
  //stricted data structure only applies for Evangelizo Reader API
  //replace all html elements with |
  //there are 3 ||| between sections
  //except for the main heading and the rest
  //if gospel, reading_2 exist
  //else reading_2_or_gospel is gospel
  const [heading_reading_1, psalms, reading_2_or_gospel, gospel] = bibleData
    .replace(/\<[^>]+>/g, "|")
    .replace(/&[a-z0-9#]+;/gi, "")
    .split("|||");

  const [heading, reading_1] = heading_reading_1.split("||");

  //remove all the "|"s
  const finalHeading = removeVerticalLines(heading);
  const finalReading_1 = removeVerticalLines(reading_1);
  const finalPsalms = removeVerticalLines(psalms);
  const finalReading2OrGospel = removeVerticalLines(reading_2_or_gospel);
  const finalGospel = removeVerticalLines(gospel);

  //get the headers from the readings, psalms and the gospel
  const [reading_1_heading, ...restReading_1] =
    getHeadingsFromTheReadings(finalReading_1);

  const [psalms_heading, ...restPsalms] =
    getHeadingsFromTheReadings(finalPsalms);

  const [reading_2_or_gospel_heading, ...rest_reading_2_or_gospel] =
    getHeadingsFromTheReadings(finalReading2OrGospel);

  const [gospel_heading, ...restGospel] =
    getHeadingsFromTheReadings(finalGospel);

  //return
  return {
    dataHeading: finalHeading,
    dataReading1: { heading: reading_1_heading, textArray: restReading_1 },
    dataPsalms: { heading: psalms_heading, textArray: restPsalms },
    dataReading2:
      finalGospel.length > 1
        ? {
            heading: reading_2_or_gospel_heading,
            textArray: rest_reading_2_or_gospel,
          }
        : { heading: "", textArray: [] },
    dataGospel:
      finalGospel.length > 1
        ? { heading: gospel_heading, textArray: restGospel }
        : {
            heading: reading_2_or_gospel_heading,
            textArray: rest_reading_2_or_gospel,
          },
  };
}
