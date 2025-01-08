//imports
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface DarkSlice {
  isDarkMode: boolean;
}

// Define the initial state using that type
const initialState: DarkSlice = {
  isDarkMode: false,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openDark: (state) => {
      state.isDarkMode = true;
    },
    closeDark: (state) => {
      state.isDarkMode = false;
    },
  },
});

export const { openDark, closeDark } = authSlice.actions;

export default authSlice.reducer;
