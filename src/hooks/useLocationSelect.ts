//imports
import { getCities, getStates } from "@/services/getCities";
import { getCountries, getSubRegions } from "@/services/getCountries";
import { useCallback, useMemo, useReducer } from "react";

//types
type locationState = {
  regions: string[];
  subRegions: string[];
  countries: string[];
  states: string[];
  cities: string[];
  currRegion: string;
  currSubRegion: string;
  currCountry: string;
  currState: string;
  currCity: string;
  countryCodes: { [key: string]: string };
  stateCodes: { [key: string]: string };
};

type locationAction =
  | { type: "SET_STATE"; payload: Partial<locationState> }
  | { type: "RESET_REGION"; payload: "" }
  | { type: "RESET_SUB_REGION"; payload: "" }
  | { type: "RESET_COUNTRY"; payload: "" }
  | { type: "RESET_STATE"; payload: "" }
  | { type: "RESET"; payload: "" };

//action types
const ACTIONS = {
  SET_STATE: "SET_STATE",
  //reset the states below the current state
  RESET: "RESET",
  RESET_REGION: "RESET_REGION",
  RESET_SUB_REGION: "RESET_SUB_REGION",
  RESET_COUNTRY: "RESET_COUNTRY",
  RESET_STATE: "RESET_STATE",
};

//initial state
const initialState: locationState = {
  regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
  subRegions: [],
  countries: [],
  states: [],
  cities: [],
  currRegion: "",
  currSubRegion: "",
  currCountry: "",
  currState: "",
  currCity: "",
  countryCodes: {},
  stateCodes: {},
};

//reducer function
function locationReducer(
  state: locationState,
  action: locationAction
): locationState {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    case ACTIONS.RESET:
      return initialState;
    case ACTIONS.RESET_REGION:
      return {
        ...state,
        subRegions: [],
        countries: [],
        states: [],
        cities: [],
        currRegion: "",
        currSubRegion: "",
        currCountry: "",
        currState: "",
        currCity: "",
      };
    case ACTIONS.RESET_SUB_REGION:
      return {
        ...state,
        countries: [],
        states: [],
        cities: [],
        currCountry: "",
        currState: "",
        currCity: "",
      };
    case ACTIONS.RESET_COUNTRY:
      return { ...state, states: [], cities: [], currState: "", currCity: "" };
    case ACTIONS.RESET_STATE:
      return { ...state, cities: [], currCity: "" };
    default:
      throw new Error("Undefined Action Type on Location Select!");
  }
}

export function useLocationSelect() {
  //location state and dispatch
  const [state, dispatch] = useReducer(locationReducer, initialState);

  //function to reset all
  function clear() {
    dispatch({ type: "RESET", payload: "" });
  }

  //select regions
  function selectRegion(currRegion: string) {
    //reset all
    dispatch({ type: "RESET_REGION", payload: "" });
    //select region
    dispatch({ type: "SET_STATE", payload: { currRegion } });
  }

  //select sub region
  function selectSubRegion(currSubRegion: string) {
    //reset sub regions
    dispatch({ type: "RESET_SUB_REGION", payload: "" });
    //select sub region
    dispatch({ type: "SET_STATE", payload: { currSubRegion } });
  }

  //function select country
  function selectCountry(currCountry: string) {
    //reset countries
    dispatch({ type: "RESET_COUNTRY", payload: "" });
    //select country
    dispatch({ type: "SET_STATE", payload: { currCountry } });
  }

  //function to select state
  function selectState(currState: string) {
    //reset states
    dispatch({ type: "RESET_STATE", payload: "" });
    //select state
    dispatch({ type: "SET_STATE", payload: { currState } });
  }

  //select city - control only
  function controlCity(currCity: string) {
    dispatch({ type: "SET_STATE", payload: { currCity } });
  }

  //update subregions with region name
  const updateSubRegions = useCallback(async (regionName: string) => {
    //select region
    selectRegion(regionName); //update the form field
    //get possible sub regions from the api
    const { subRegions } = await getSubRegions(regionName);
    //update sub regions
    dispatch({ type: "SET_STATE", payload: { subRegions } });
  }, []);

  //update countries with sub region name
  const updateCountries = useCallback(async (subRegionName: string) => {
    //select sub region
    selectSubRegion(subRegionName); //update the form field
    //get possible countries from the api
    const { countries } = await getCountries(subRegionName);
    //update countries
    const updatedCountries = {
      countries: countries.map((country) => country.name),
      countryCodes: Object.fromEntries(
        countries.map((country) => [country.name, country.code])
      ),
    };
    //update country codes
    dispatch({
      type: "SET_STATE",
      payload: updatedCountries,
    });
  }, []);

  //update states with the country code
  const updateStates = useCallback(
    async (countryName: string) => {
      //select country
      selectCountry(countryName);
      //get all possible states from the api
      const { states } = await getStates(state.countryCodes[countryName]);
      //update states
      const updatedStates = {
        states: states.map((state) => state.name),
        stateCodes: Object.fromEntries(
          states.map((state) => [state.name, state.code])
        ),
      };
      //update state codes
      dispatch({
        type: "SET_STATE",
        payload: updatedStates,
      });
    },
    [state.countryCodes]
  );

  //update cities with the state and country code
  const updateCities = useCallback(
    async (stateName: string) => {
      //select state
      selectState(stateName);
      //get all cities using the state and country codes
      const { cities } = await getCities(
        state.countryCodes[state.currCountry],
        state.stateCodes[stateName]
      );
      //update cities
      dispatch({ type: "SET_STATE", payload: { cities } });
    },
    [state.stateCodes, state.countryCodes, state.currCountry]
  );

  return useMemo(
    () => ({
      state,
      updateSubRegions,
      updateCountries,
      updateStates,
      updateCities,
      controlCity,
      clear,
    }),
    [state, updateSubRegions, updateCountries, updateStates, updateCities]
  );
}
