//imports
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authUiSlice";
import themeReducer from "./slices/darkSlice";
import locationReducer from "./slices/editSlice";
import rosaryReducer from "./slices/rosarySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    location: locationReducer,
    rosary: rosaryReducer,
  },
});

//directly from the documantation
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
