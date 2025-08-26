import { createSlice } from "@reduxjs/toolkit";
import { THEME_SLICE_NAME } from "./constants";

const initialState = {
  screenSize: null,
  activeTheme: "dark",
};

const themeSlice = createSlice({
  name: THEME_SLICE_NAME,
  initialState,
  reducers: {
    setScreenSizeState: (state, action) => {
      state.screenSize = action.payload;
    },

    setActiveThemeState: (state, action) => {
      state.activeTheme = action.payload;
    },

    updateThemeState: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetThemeState: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setScreenSizeState,
  setActiveThemeState,
  updateThemeState,
  resetThemeState,
} = themeSlice.actions;
export const themeReducerToolkit = themeSlice.reducer;
