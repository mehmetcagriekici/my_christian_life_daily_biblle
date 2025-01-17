//get countries
//data will be use in signup form

//get sub region from the region
export async function getSubRegions(region: string) {
  const base = process.env.NEXT_PUBLIC_REST_COUNTRIES;

  const resRegion = await fetch(`${base}region/${region}`);
  if (!resRegion)
    throw new Error("Failed to fetch region from the REST countries API.");

  //only to get the subregion name
  const dataRegion: { subregion: string }[] = await resRegion.json();

  return {
    subRegions: [...new Set(dataRegion.map((country) => country.subregion))],
  };
}

//get countries in that region
export async function getCountries(subregion: string) {
  const base = process.env.NEXT_PUBLIC_REST_COUNTRIES;

  const resSubRegion = await fetch(`${base}subregion/${subregion}`);
  if (!subregion)
    throw new Error("Failed to fetch subregion from the REST countries API.");

  //only to get the country name
  const dataSubRegion: { name: { common: string }; cca2: string }[] =
    await resSubRegion.json();

  //return countries for the form
  //and the codes for getCities
  return {
    countries: [
      ...new Set(
        dataSubRegion.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }))
      ),
    ],
  };
}
