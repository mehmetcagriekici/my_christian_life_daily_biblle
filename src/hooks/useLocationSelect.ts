//imports
import { getCities, getCountries } from "@/services/getCountries";
import { useState } from "react";

export function useLocationSelect() {
  //all sub regions in REST Countries
  const regions = [
    "Northern Africa",
    "Sub-Saharan Africa",
    "Caribbean",
    "Central America",
    "Northern America",
    "South America",
    "Central Asia",
    "Eastern Asia",
    "Southern Asia",
    "Southeastern Asia",
    "Western Asia",
    "Eastern Europe",
    "Northern Europe",
    "Southern Europe",
    "Western Europe",
    "Australia and New Zealand",
    "Melanesia",
    "Micronesia",
    "Polynesia",
  ];

  //region and country
  //only to be used in the form ui
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  //possible countries and cities
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  //function to update the countries
  async function updateCountries(region: string) {
    const { countries } = await getCountries(region);

    setRegion(region);
    setCountries(countries);

    console.log(countries);
  }

  //function to update the cities
  async function updateCities(country: string) {
    const { cities } = await getCities(country);
    setCountry(country);

    console.log(cities);
  }

  return {
    region,
    country,
    regions,
    countries,
    cities,
    updateCountries,
    updateCities,
  };
}
