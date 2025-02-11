"use server";

//imports
import axios from "axios";
//API Stuff

//get states of a country
export async function getStates(country: string) {
  const config = {
    method: "get",
    url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
    headers: {
      "X-CSCAPI-KEY": process.env.NEXT_CSC_KEY,
    },
  };

  const { data } = await axios<{ id: number; name: string; iso2: string }[]>(
    config
  );

  const states = [
    ...new Set(data.map((state) => ({ name: state.name, code: state.iso2 }))),
  ].sort((x, y) => x.name.localeCompare(y.name));

  return { states };
}

//function to get the cities of the selected state in the country
export async function getCities(countryCode: string, stateCode: string) {
  const config = {
    method: "get",
    url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
    headers: {
      "X-CSCAPI-KEY": process.env.NEXT_CSC_KEY,
    },
  };

  const { data } = await axios<{ id: number; name: string }[]>(config);

  const cities = [...new Set(data.map((city) => city.name))].sort();

  return { cities };
}
