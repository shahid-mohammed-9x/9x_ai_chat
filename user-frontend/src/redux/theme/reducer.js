import { createSlice } from '@reduxjs/toolkit';
import { THEME_SLICE_NAME } from './constants';

const initialState = {
  screenSize: null,
  activeTheme: 'dark',
  loginPopup: false
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

    openLoginState: (state, action)=>{
      // return {...state, loginPopup:!stat.loginPopup}
      state.loginPopup = action.payload
    },

    updateThemeState: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetThemeState: (state, action) => {
      state = initialState;
    },
   
  },
});

export const { setScreenSizeState, setActiveThemeState, updateThemeState, resetThemeState, openLoginState } =
  themeSlice.actions;
export const themeReducerToolkit = themeSlice.reducer;
