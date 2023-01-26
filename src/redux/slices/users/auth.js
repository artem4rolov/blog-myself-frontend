import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import { userLogin } from "./authActions";
// функция регистрации
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
  error: { login: null, register: null }, // ошибки
  successLogin: false, // успешна ли авторизация
  successRegister: false, // успешна ли регистрация
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.userId = null;
      state.userName = null;
      state.userEmail = null;
      state.userToken = null;
      state.successLogin = false;
      state.successRegister = false;
      state.error.login = null;
      state.error.register = null;
    },
    // обновляем каждые 15 минут (в Header.jsx) данные о пользователе, чтобы не сбрасывать аутентификацию
    setCredentials: (state, { payload }) => {
      state.loading = false;
      state.successLogin = true;
      state.userName = payload.user_name;
      state.userEmail = payload.email;
      state.userId = payload.user_id;
    },
  },
  extraReducers: {
    // АВТОРИЗАЦИЯ
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error.login = null;
      state.error.register = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successLogin = true;
      state.userName = payload.user_name;
      state.userEmail = payload.email;
      state.userId = payload._id;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.login = payload;
    },
    // РЕГИСТРАЦИЯ
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error.login = null;
      state.error.register = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error.register = payload;
      state.successRegister = true; // регистрация успешна - можем войти в систему
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.register = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
