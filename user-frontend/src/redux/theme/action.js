import {
  setScreenSizeState,
  setActiveThemeState,
  updateThemeState,
  resetThemeState,
  openLoginPopup
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

const openLoginAction =(value) =>(dispatch)=>{
  console.log(value)
  dispatch(openLoginPopup(value));
}

export default {
  setScreenSizeAction,
  setActiveThemeAction,
  updateThemeAction,
  resetThemeAction,
  openLoginAction
};
