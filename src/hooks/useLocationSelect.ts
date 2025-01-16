//imports
import getCities from "@/services/getCities";
import { getCountries, getSubRegions } from "@/services/getCountries";
import { useState } from "react";

export function useLocationSelect() {
  //all sub regions in REST Countries
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  //region and country
  //only to be used in the form ui
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  //possible countries and cities
  const [subRegions, setSubRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  //country codes for cities
  const [codes, setCodes] = useState<{ [key: string]: string }>({});

  //update sub regions
  async function updateSubRegions(regionName: string) {
    //update field value
    setRegion(regionName);
    //reset fields
    setSubRegion("");
    setCountry("");
    setCity("");

    //reset options //////
    //reset sub regions
    setSubRegions([]);
    //reset countries
    setCountries([]);
    //reset cities
    setCities([]);
    ///////////////////

    //await get sub regions
    const { subregions } = await getSubRegions(regionName);
    //supdate sub regions
    setSubRegions(subregions);
  }

  //function to update the countries
  //input region
  async function updateCountries(subRegionName: string) {
    //update field value
    setSubRegion(subRegionName);

    //reset field
    setCountry("");
    setCity("");

    //reset options //////
    //reset countries
    setCountries([]);
    //reset cities
    setCities([]);
    ///////////////////

    //await get countries
    const { countries, codes } = await getCountries(subRegionName);
    //update countries
    setCountries(countries);
    //update codes
    setCodes(codes);
  }

  //function to update the cities
  async function updateCities(country: string) {
    //update field value
    setCountry(country);

    //reset options //////
    //reset cities
    setCities([]);
    ///////////////////

    const { cities } = await getCities(codes[country]);
    //update cities
    setCities(cities);
  }

  function controlCity(cityName: string) {
    setCity(cityName);
  }

  return {
    region,
    subRegion,
    country,
    city,
    regions,
    subRegions,
    countries,
    cities,
    updateSubRegions,
    updateCountries,
    updateCities,
    controlCity,
  };
}
