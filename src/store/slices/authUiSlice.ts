//imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserMetadata } from "@supabase/supabase-js";

// Define a type for the slice state
export interface AuthState {
  isLoggedIn: boolean; //for both signup and login
  isLoginForm: boolean; //to decide either signup or login form should display
  userData: UserMetadata;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  isLoginForm: true, //when true display login form
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    toggleForm: (state) => {
      state.isLoginForm = !state.isLoginForm;
    },
    updateGlobalUserData: (state, action: PayloadAction<UserMetadata>) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, toggleForm, updateGlobalUserData } =
  authSlice.actions;

export default authSlice.reducer;
