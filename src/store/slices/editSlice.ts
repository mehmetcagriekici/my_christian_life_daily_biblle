//imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a generic for the slice state
type Toptions<NameKey extends string, CodeKey extends string> = {
  [key in NameKey]: string[];
} & {
  [key in CodeKey]: { [k: string]: string };
};

type Tcountries = Toptions<"countries", "countryCodes">;
type Tstates = Toptions<"states", "stateCodes">;

export interface LocationSlice {
  subRegions: string[];
  countries: Tcountries;
  states: Tstates;
  cities: string[];
}

interface EditSlice extends LocationSlice {
  username: string;
  region: string;
  sub_region: string;
  country: string;
  state: string;
  city: string;
  church: string;
  avatar: string;
  clergy_member: string;
}

// Define the initial state using that type
const initialState: EditSlice = {
  subRegions: [],
  countries: { countries: [], countryCodes: {} },
  states: { states: [], stateCodes: {} },
  cities: [],
  username: "",
  region: "",
  sub_region: "",
  country: "",
  state: "",
  city: "",
  church: "",
  avatar: "",
  clergy_member: "",
};

export const locationSlice = createSlice({
  name: "location",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubRegions: (state, action: PayloadAction<string[]>) => {
      state.subRegions = action.payload;
      //reset all below
      state.countries = initialState.countries;
      state.states = initialState.states;
      state.cities = initialState.cities;
    },
    setCountries: (state, action: PayloadAction<Tcountries>) => {
      state.countries = action.payload;
      //reset all below
      state.states = initialState.states;
      state.cities = initialState.cities;
    },
    setStates: (state, action: PayloadAction<Tstates>) => {
      state.states = action.payload;
      //reset all below
      state.cities = initialState.cities;
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
    setSubRegion: (state, action: PayloadAction<string>) => {
      state.sub_region = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setChurch: (state, action: PayloadAction<string>) => {
      state.church = action.payload;
    },
    setClergy: (state, action: PayloadAction<string>) => {
      state.clergy_member = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const {
  setSubRegions,
  setCountries,
  setStates,
  setCities,
  setChurch,
  setCity,
  setClergy,
  setCountry,
  setRegion,
  setState,
  setSubRegion,
  setUsername,
  setAvatar,
} = locationSlice.actions;

export default locationSlice.reducer;
