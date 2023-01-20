// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { registerUser } from "./authActions";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // АВТОРИЗАЦИЯ
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // РЕГИСТРАЦИЯ
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.userInfo = payload;
      state.success = true; // регистрация успешна - можем войти в систему
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
