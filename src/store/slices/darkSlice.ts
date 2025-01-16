//imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface ThemeSlice {
  theme: string;
}

// Define the initial state using that type
const initialState: ThemeSlice = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
