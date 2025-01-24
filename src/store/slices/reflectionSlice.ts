//imports
import { TReflection } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isReading: boolean;
  currentReflection: null | TReflection;
  reflectionText: string; //to protect the changes made between page changes, maybe user will want to re-read the bible and then continue writing the reflection
} = {
  isReading: false, //when false display form
  currentReflection: null,
  reflectionText: "",
};

export const reflectionSlice = createSlice({
  name: "reflection",
  initialState,
  reducers: {
    setCurrentReflection: (state, action: PayloadAction<TReflection>) => {
      state.currentReflection = action.payload;
    },
    setReflectionText: (state, action: PayloadAction<string>) => {
      state.reflectionText = action.payload;
    },
    openReading: (state) => {
      state.isReading = true;
    },
    closeReading: (state) => {
      state.isReading = false;
    },
  },
});

export const {
  setCurrentReflection,
  setReflectionText,
  openReading,
  closeReading,
} = reflectionSlice.actions;
export default reflectionSlice.reducer;
