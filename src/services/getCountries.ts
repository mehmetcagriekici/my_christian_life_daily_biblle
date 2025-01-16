//get countries
//data will be use in signup form

//get region
//get countries in that region
//get cities in that country
export async function getCountries(region: string) {
  const base = process.env.NEXT_PUBLIC_REST_COUNTRIES;

  const res = await fetch(`${base}subregion/${region}`);

  if (!res) throw new Error("Couldn't fetch countries from the API.");

  const data = (await res.json()) as { name: { common: string } }[];

  const countries = data.map((country) => country.name.common);

  return { countries };
}

export async function getCities(country: string) {
  const base = process.env.NEXT_PUBLIC_REST_COUNTRIES;

  const res = await fetch(`${base}name/${country}`);

  if (!res) throw new Error("Couldn't fetch cities from the API.");

  const data = await res.json();

  return { cities: data };
}
