import { createSlice } from "@reduxjs/toolkit";

export interface settingsState {
  appTheme: "light" | "dark";
  lang: "en" | "ar";
  dir: "ltr" | "rtl";
}

export const settingsStateInitial: settingsState = {
  appTheme: "light",
  lang: "en",
  dir: "ltr",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsStateInitial,
  reducers: {
    setAppTheme: (state, action) => {
      state.appTheme = action.payload;
      document.documentElement.setAttribute("data-theme", action.payload.value);
      document.documentElement.setAttribute("data-mode", action.payload.mode);
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },

    setDir: (state, action) => {
      state.dir = action.payload;
    },
  },
});

export const { setAppTheme, setLang, setDir } = settingsSlice.actions;

export default settingsSlice.reducer;
