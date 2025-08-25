import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  isTransparent: boolean;
}

const initialState: NavbarState = {
  isTransparent: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setTransparent: (state, action: PayloadAction<boolean>) => {
      state.isTransparent = action.payload;
    },
  },
});

export const { setTransparent } = navbarSlice.actions;
export default navbarSlice.reducer;
