//imports
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLatin: false,
};

export const rosarySlice = createSlice({
  name: "rosary",
  initialState,
  reducers: {
    toggleLatin: (state) => {
      state.isLatin = !state.isLatin;
    },
  },
});

export const { toggleLatin } = rosarySlice.actions;
export default rosarySlice.reducer;
