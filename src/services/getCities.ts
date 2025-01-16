//imports
import axios from "axios";
//API Stuff

//function to get the cities of a country
export default async function getCities(code: string) {
  const config = {
    method: "get",
    url: `https://api.countrystatecity.in/v1/countries/${code}/cities`,
    headers: {
      "X-CSCAPI-KEY": "API_KEY",
    },
  };

  const { data } = await axios(config);

  return { cities: data };
}
