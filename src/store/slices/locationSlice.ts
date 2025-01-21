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

// Define the initial state using that type
const initialState: LocationSlice = {
  subRegions: [],
  countries: { countries: [], countryCodes: {} },
  states: { states: [], stateCodes: {} },
  cities: [],
};

export const locationSlice = createSlice({
  name: "location",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSubRegions: (state, action: PayloadAction<string[]>) => {
      state.subRegions = action.payload;
    },
    setCountries: (state, action: PayloadAction<Tcountries>) => {
      state.countries = action.payload;
    },
    setStates: (state, action: PayloadAction<Tstates>) => {
      state.states = action.payload;
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
  },
});

export const { setSubRegions, setCountries, setStates, setCities } =
  locationSlice.actions;

export default locationSlice.reducer;
