import {
  setScreenSizeState,
  setActiveThemeState,
  updateThemeState,
  resetThemeState,
} from "./reducer";
import { setSessionStorageTheme } from "@/helpers/session-storage";

const setScreenSizeAction = (screenSize) => (dispatch) => {
  dispatch(setScreenSizeState(screenSize));
};

const setActiveThemeAction = (activeTheme) => (dispatch) => {
  if (activeTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  setSessionStorageTheme(activeTheme);
  dispatch(setActiveThemeState(activeTheme));
};

const updateThemeAction = (data) => (dispatch) => {
  dispatch(updateThemeState(data));
};

const resetThemeAction = () => (dispatch) => {
  dispatch(resetThemeState());
};

export default {
  setScreenSizeAction,
  setActiveThemeAction,
  updateThemeAction,
  resetThemeAction,
};
