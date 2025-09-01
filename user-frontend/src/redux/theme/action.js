import {
  setScreenSizeState,
  setActiveThemeState,
  updateThemeState,
  resetThemeState,
  openLoginState,
  openPasswordState
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
  if(value=='true')
    dispatch(openLoginState(true))
  else dispatch(openLoginState(false));
}

const openPasswordAction = (value)=>(dispatch) =>{
  if(value == 'true')
    dispatch(openPasswordState(true))
  else dispatch(openPasswordState(false));
}


export default {
  setScreenSizeAction,
  setActiveThemeAction,
  updateThemeAction,
  resetThemeAction,
  openLoginAction,
  openPasswordAction
};
