//imports
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AuthState {
  isLoggedIn: boolean; //for both signup and login
  isLoginForm: boolean; //to decide either signup or login form should display
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  isLoginForm: true, //when true display login form
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
  },
});

export const { login, logout, toggleForm } = authSlice.actions;

export default authSlice.reducer;
