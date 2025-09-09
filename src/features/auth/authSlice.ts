import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
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

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  role: "role_doctor" | "role_representative" | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string | null>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = {
        ...action.payload,
        authorities: action.payload.authorities.map((r) => r.toLowerCase()),
      };
    },
    setRole: (
      state,
      action: PayloadAction<"role_doctor" | "role_representative">
    ) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.role = null;
    },
  },
});

export const { logout, login, setUser, setRole } = authSlice.actions;
export default authSlice.reducer;
