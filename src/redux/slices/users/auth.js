// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { registerUser } from "./authActions";

// если есть токен в localStorage - забираем его
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false, // отображение загрузки
  userId: null, // id пользователя
  userName: null, // имя пользователя
  userEmail: null, // email пользоватея
  userToken, // токен авторизации (jwt token)
  error: null, // ошибки
  success: false, // успешна ли авторизация или регистрация
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
      state.userName = payload.user_name;
      state.userEmail = payload.email;
      state.userToken = payload.token;
      state.userId = payload._id;
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
