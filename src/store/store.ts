//imports
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authUiSlice";
import darkReducer from "./slices/darkSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkReducer,
  },
});

//directly from the documantation
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;