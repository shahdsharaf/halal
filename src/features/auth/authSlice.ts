import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

interface User {
  id: number;
  login: string | null;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  authorities: string[];
  countryId: number | null;
  hasDashboard: boolean;
  langKey: string;
  mobile: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});
export const { logout, login, setUser } = authSlice.actions;
export default authSlice.reducer;
