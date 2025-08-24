import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

interface SignInPayload {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
  user: null,
};

export const signinUser = createAsyncThunk<
  User,
  SignInPayload,
  { rejectValue: string }
>("auth/signinUser", async (payload, thunkAPI) => {
  try {
    const response = await axios.post<User>(
      "https://dummyjson.com/auth/login",
      {
        username: payload.username,
        password: payload.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login response:", response.data);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Invalid credentials"
      );
    }
    return thunkAPI.rejectWithValue("Network error");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Sign in failed";
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
