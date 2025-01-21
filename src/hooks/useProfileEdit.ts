//imports
import { getCities, getStates } from "@/services/getCities";
import { getCountries, getSubRegions } from "@/services/getCountries";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useMemo, useReducer, useEffect } from "react";
import {
  setCities,
  setCountries,
  setStates,
  setSubRegions,
} from "@/store/slices/locationSlice";
import { useAppDispatch } from "@/store/hooks";

//types
type editState = {
  email: string;
  username: string;
  region: string;
  sub_region: string;
  country: string;
  state: string;
  city: string;
  church: string;
  clergy_member: string;
  regions: string[];
  sub_regions: string[];
  countries: string[];
  states: string[];
  cities: string[];
  clergy_options: string[];
  countryCodes: { [key: string]: string };
  stateCodes: { [key: string]: string };
  avatar: string;
};

type editAction =
  | { type: "SET_STATE"; payload: Partial<editState> }
  | { type: "RESET_FIELDS"; payload: Partial<editState> };

//actions
const ACTIONS = {
  SET_STATE: "SET_STATE",
  RESET_FIELDS: "RESET_FIELDS",
};

//reducer
function editReducer(state: editState, action: editAction) {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };
    case ACTIONS.RESET_FIELDS:
      return { ...state, ...action.payload };
    default:
      throw new Error("Undefined Action Type on Edit Profile!");
  }
}

export function useProfileEdit({
  initialStateData,
}: {
  initialStateData: { [key: string]: string | number };
}) {
  //get all location options from the global state
  const { subRegions, countries, states, cities } = useAppSelector(
    (state) => state.location
  );

  //init form location options
  //init form options for locations
  //send options to global state
  const globalDispatch = useAppDispatch();

  useEffect(() => {
    const fetchOptions = async () => {
      const { subRegions } = await getSubRegions(
        initialStateData.region as string
      );

      globalDispatch(setSubRegions(subRegions));

      const { countries } = await getCountries(
        initialStateData.sub_region as string
      );

      globalDispatch(
        setCountries({
          countries: countries.map((country) => country.name),
          countryCodes: Object.fromEntries(
            countries.map((country) => [country.name, country.code])
          ),
        })
      );

      const currentCountryCode = countries.find(
        (c) => c.name === initialStateData.country
      )?.code;

      if (currentCountryCode) {
        const { states } = await getStates(currentCountryCode);

        globalDispatch(
          setStates({
            states: states.map((state) => state.name),
            stateCodes: Object.fromEntries(
              states.map((state) => [state.name, state.code])
            ),
          })
        );

        const currentStateCode = states.find(
          (s) => s.name === initialStateData.state
        )?.code;

        if (currentStateCode) {
          const { cities } = await getCities(
            currentCountryCode,
            currentStateCode
          );

          globalDispatch(setCities(cities));
        }
      }
    };

    fetchOptions();
  }, [globalDispatch, initialStateData]);

  //get initial state from the initial state data
  const initialState: editState = useMemo(
    () => ({
      email: initialStateData.email as string,
      username: initialStateData.username as string,
      region: initialStateData.region as string,
      sub_region: initialStateData.sub_region as string,
      country: initialStateData.country as string,
      state: initialStateData.state as string,
      city: initialStateData.city as string,
      church: initialStateData.church as string,
      avatar: initialStateData.avatar as string,
      clergy_member: initialStateData.clergy_member as string,
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      //if global state updated
      sub_regions: subRegions,
      countries: countries.countries,
      states: states.states,
      cities,
      clergy_options: [
        "No, I am not an official clergy member.",
        "Yes, I am an official clergy member.",
      ],
      countryCodes: countries.countryCodes,
      stateCodes: states.stateCodes,
    }),
    [initialStateData, subRegions, countries, states, cities]
  );

  //edit profile form state
  const [state, dispatch] = useReducer(editReducer, initialState);

  //function to clear all values
  const clear = useCallback(() => {
    dispatch({ type: "RESET_FIELDS", payload: initialState });
  }, [initialState]);

  //control email
  function controlEmail(email: string) {
    //update email
    dispatch({ type: "SET_STATE", payload: { email } });
  }

  //control username
  function controlUsername(username: string) {
    //update username
    dispatch({ type: "SET_STATE", payload: { username } });
  }

  //control church
  function controlChurch(church: string) {
    dispatch({ type: "SET_STATE", payload: { church } });
  }

  //control clergy_member
  function controlClergyMember(clergy_member: string) {
    dispatch({ type: "SET_STATE", payload: { clergy_member } });
  }

  //control avatar (src)
  function controlAvatar(avatar: string) {
    dispatch({ type: "SET_STATE", payload: { avatar } });
  }

  //LOCATIONS //////////////////////////////////////////
  //function to select region
  function selectRegion(region: string) {
    //reset all location fields
    dispatch({
      type: "RESET_FIELDS",
      payload: {
        sub_regions: [],
        countries: [],
        states: [],
        cities: [],
        region: "",
        sub_region: "",
        country: "",
        state: "",
        city: "",
      },
    });

    //update region
    dispatch({ type: "SET_STATE", payload: { region } });
  }

  //function to select sub region
  function selectSubRegion(sub_region: string) {
    //reset location fields under the sub region
    dispatch({
      type: "RESET_FIELDS",
      payload: {
        countries: [],
        states: [],
        cities: [],
        country: "",
        state: "",
        city: "",
      },
    });

    //update sub region
    dispatch({ type: "SET_STATE", payload: { sub_region } });
  }

  //function to select country
  function selectCountry(country: string) {
    //reset location fields under the countries
    dispatch({
      type: "RESET_FIELDS",
      payload: {
        states: [],
        cities: [],
        state: "",
        city: "",
      },
    });

    //update country
    dispatch({ type: "SET_STATE", payload: { country } });
  }

  //function to select state
  function selectState(state: string) {
    //reset location fields below states
    dispatch({
      type: "RESET_FIELDS",
      payload: {
        cities: [],
        city: "",
      },
    });

    //update state
    dispatch({ type: "SET_STATE", payload: { state } });
  }

  //control city
  function controlCity(city: string) {
    //update the city
    dispatch({ type: "SET_STATE", payload: { city } });
  }

  //update subregions with region name
  const updateSubRegions = useCallback(async (regionName: string) => {
    //select region
    selectRegion(regionName); //update the form field
    //get possible sub regions from the api
    const { subRegions } = await getSubRegions(regionName);
    //update sub regions
    dispatch({ type: "SET_STATE", payload: { sub_regions: subRegions } });
  }, []);

  //update countries with sub region name
  const updateCountries = useCallback(async (subRegionName: string) => {
    //select sub region
    selectSubRegion(subRegionName); //update the form field
    //get possible countries from the api
    const { countries } = await getCountries(subRegionName);
    //update countries
    //update country codes
    dispatch({
      type: "SET_STATE",
      payload: {
        countries: countries.map((country) => country.name),
        countryCodes: Object.fromEntries(
          countries.map((country) => [country.name, country.code])
        ),
      },
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
      //update state codes
      dispatch({
        type: "SET_STATE",
        payload: {
          states: states.map((state) => state.name),
          stateCodes: Object.fromEntries(
            states.map((state) => [state.name, state.code])
          ),
        },
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
        state.countryCodes[state.country],
        state.stateCodes[stateName]
      );
      //update cities
      dispatch({ type: "SET_STATE", payload: { cities } });
    },
    [state.stateCodes, state.countryCodes, state.country]
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
      controlAvatar,
      controlEmail,
      controlChurch,
      controlClergyMember,
      controlUsername,
    }),
    [
      state,
      updateSubRegions,
      updateCountries,
      updateStates,
      updateCities,
      clear,
    ]
  );
}
