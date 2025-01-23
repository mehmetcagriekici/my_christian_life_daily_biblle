//imports
import { TReflection } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isReading: boolean;
  currentReflection: null | TReflection;
} = {
  isReading: false, //when false display form
  currentReflection: null,
};

export const reflectionSlice = createSlice({
  name: "reflection",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.isReading = !state.isReading;
    },

    setCurrentReflection: (state, action: PayloadAction<TReflection>) => {
      state.currentReflection = action.payload;
    },
  },
});

export const { toggleForm, setCurrentReflection } = reflectionSlice.actions;
export default reflectionSlice.reducer;
