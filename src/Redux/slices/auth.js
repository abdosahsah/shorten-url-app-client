import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/baseUrl";

export const userLogin = createAsyncThunk(
  "users/login",
  async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      localStorage.removeItem("token");
      return response.data;
    }
  }
);

export const userRegister = createAsyncThunk(
  "users/register",
  async ({ fullname, email, password, confirmPassword }) => {
    const response = await api.post("/auth/signup", {
      fullname,
      email,
      password,
      confirmPassword,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      localStorage.removeItem("token");
      return response.data;
    }
  }
);

export const userLogout = createAsyncThunk("users/logout", async () => {
  const response = await api.post("/auth/logout");
  localStorage.removeItem("token");
  return response.data;
});

export const validateToken = createAsyncThunk(
  "users/validate",
  async (token) => {
    const response = await api.post("/auth/token/validate", { token });
    return response.data;
  }
);

const userReducer = createSlice({
  name: "users",
  initialState: {
    isAuthenticated: false,
    error: null,
    registerError: null,
  },

  extraReducers(builder) {
    builder
      // Login
      .addCase(userLogin.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isAuthenticated = false;
        state.error = "Invalid email or password";
      })
      // Register
      .addCase(userRegister.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isAuthenticated = false;
        state.registerError = "Please enter valid information";
      })
      // Logout
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
      })
      // Validate Token
      .addCase(validateToken.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      });
  },
});

export default userReducer.reducer;
