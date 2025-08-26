import { configureStore } from "@reduxjs/toolkit";
import { UserProfileReducer } from "./userProfile/reducer";
import { themeReducerToolkit } from "./theme/reducer";

const initialState = {};

const reducer = {
  userProfileState: UserProfileReducer,
  themeState: themeReducerToolkit,
};
const store = configureStore({
  reducer,
  preloadedState: initialState,
  //   middleware,
  devTools: true,
  //   import.meta.env.VITE_DEVELOPMENT_MODE === "production" ? false : true,
});

export default store;
