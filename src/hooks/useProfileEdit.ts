//imports
import { getCities, getStates } from "@/services/getCities";
import { getCountries, getSubRegions } from "@/services/getCountries";
import { useCallback, useMemo, useReducer, useEffect } from "react";
import {
  setAvatar,
  setChurch,
  setCities,
  setCity,
  setClergy,
  setCountries,
  setCountry,
  setRegion,
  setState,
  setStates,
  setSubRegion,
  setSubRegions,
  setUsername,
} from "@/store/slices/editSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

//types
type editState = {
  regions: string[];
  clergy_options: string[];
  openEdit: boolean;
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
  const initialState: editState = useMemo(
    () => ({
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      clergy_options: [
        "No, I am not an official clergy member.",
        "Yes, I am an official clergy member.",
      ],
      openEdit: false,
    }),
    []
  );

  //edit profile form state
  const [state, dispatch] = useReducer(editReducer, initialState);
  //global state
  const { states, countries } = useAppSelector((s) => s.location);

  //init form location options
  //init form options for locations
  //send options to global state
  const globalDispatch = useAppDispatch();

  useEffect(() => {
    const fetchOptions = async () => {
      //init data on global state
      globalDispatch(setUsername(initialStateData.username as string));
      globalDispatch(setRegion(initialStateData.region as string));
      globalDispatch(setSubRegion(initialStateData.sub_region as string));
      globalDispatch(setCountry(initialStateData.country as string));
      globalDispatch(setState(initialStateData.state as string));
      globalDispatch(setCity(initialStateData.city as string));
      globalDispatch(setChurch(initialStateData.church as string));
      globalDispatch(setAvatar(initialStateData.avatar as string));
      globalDispatch(setClergy(initialStateData.clergy_member as string));

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

  //open edit form
  function openEditForm() {
    dispatch({ type: "SET_STATE", payload: { openEdit: true } });
  }

  //close edit form
  function closeEditForm() {
    dispatch({ type: "SET_STATE", payload: { openEdit: false } });
  }

  //control username
  const controlUsername = useCallback(
    (username: string) => {
      //update username
      globalDispatch(setUsername(username));
    },
    [globalDispatch]
  );

  //control church
  const controlChurch = useCallback(
    (church: string) => {
      globalDispatch(setChurch(church));
    },
    [globalDispatch]
  );

  //control clergy_member
  const controlClergyMember = useCallback(
    (clergy_member: string) => {
      globalDispatch(setClergy(clergy_member));
    },
    [globalDispatch]
  );

  //control avatar (src)
  const controlAvatar = useCallback(
    (avatar: string) => {
      globalDispatch(setAvatar(avatar));
    },
    [globalDispatch]
  );

  //LOCATIONS //////////////////////////////////////////

  //control city
  const controlCity = useCallback(
    (city: string) => {
      //update the city
      globalDispatch(setCity(city));
    },
    [globalDispatch]
  );

  //update subregions with region name
  const updateSubRegions = useCallback(
    async (regionName: string) => {
      //select region
      globalDispatch(setRegion(regionName));
      //get possible sub regions from the api
      const { subRegions } = await getSubRegions(regionName);
      globalDispatch(setSubRegions(subRegions));
    },
    [globalDispatch]
  );

  //update countries with sub region name
  const updateCountries = useCallback(
    async (subRegionName: string) => {
      //select sub region
      //update the form field
      globalDispatch(setSubRegion(subRegionName));
      //get possible countries from the api
      const { countries } = await getCountries(subRegionName);
      globalDispatch(
        setCountries({
          countries: countries.map((country) => country.name),
          countryCodes: Object.fromEntries(
            countries.map((country) => [country.name, country.code])
          ),
        })
      );
    },
    [globalDispatch]
  );

  //update states with the country code
  const updateStates = useCallback(
    async (countryName: string) => {
      //select country
      globalDispatch(setCountry(countryName));
      //get all possible states from the api
      const { states } = await getStates(countries.countryCodes[countryName]);
      //update states
      //update state codes
      globalDispatch(
        setStates({
          states: states.map((state) => state.name),
          stateCodes: Object.fromEntries(
            states.map((state) => [state.name, state.code])
          ),
        })
      );
    },
    [countries.countryCodes, globalDispatch]
  );
  //update cities with the state and country code
  const updateCities = useCallback(
    async (stateName: string) => {
      //select state
      globalDispatch(setState(stateName));
      //get all cities using the state and country codes
      const { cities } = await getCities(
        countries.countryCodes[initialStateData.country],
        states.stateCodes[stateName]
      );
      //update cities
      globalDispatch(setCities(cities));
    },
    [
      countries.countryCodes,
      states.stateCodes,
      globalDispatch,
      initialStateData,
    ]
  );

  return useMemo(
    () => ({
      state,
      updateSubRegions,
      updateCountries,
      updateStates,
      updateCities,
      controlCity,
      controlAvatar,
      controlChurch,
      controlClergyMember,
      controlUsername,
      openEditForm,
      closeEditForm,
    }),
    [
      state,
      updateSubRegions,
      updateCountries,
      updateStates,
      updateCities,
      controlAvatar,
      controlChurch,
      controlClergyMember,
      controlUsername,
      controlCity,
    ]
  );
}
