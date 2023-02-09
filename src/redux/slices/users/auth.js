import { createSlice } from "@reduxjs/toolkit";
// функция авторизации
import {
  addFavorite,
  editProfileUser,
  getUser,
  removeFavorite,
  userLogin,
} from "./authActions";
// функция регистрации
import { registerUser } from "./authActions";
import { uploadImage } from "../posts/postsActions";

// если есть токен в localStorage - забираем его
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false, // отображение загрузки
  userId: null, // id пользователя
  userName: null, // имя пользователя
  userImg: null, // аватар пользователя
  userEmail: null, // email пользоватея
  userToken, // токен авторизации (jwt token)
  error: { login: null, register: null }, // ошибки
  successLogin: false, // успешна ли авторизация
  successRegister: false, // успешна ли регистрация
  currentUser: {},
  refreshUser: false,
  favoritePosts: [],
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
      state.userImg = null;
    },
    // обновляем каждые 15 минут (в Header.jsx) данные о пользователе, чтобы не сбрасывать аутентификацию
    setCredentials: (state, { payload }) => {
      state.loading = false;
      state.successLogin = true;
      state.userName = payload.user_name;
      state.userEmail = payload.email;
      state.userId = payload.user_id;
      state.userImg = payload.avatar;
      state.favoritePosts = payload.favorites;
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
      state.userImg = payload.avatar;
      state.userToken = localStorage.getItem("userToken")
        ? localStorage.getItem("userToken")
        : null;
      state.favoritePosts = payload.favorites;
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
      state.error.register = payload.message;
      state.successRegister = true; // регистрация успешна - можем войти в систему
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.register = payload;
    },
    // ОБНОВЛЕНИЕ ПРОФИЛЯ
    [editProfileUser.pending]: (state) => {
      state.loading = true;
      state.error.login = null;
      state.error.register = null;
      state.refreshUser = false;
    },
    [editProfileUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.successLogin = true;
      state.userName = payload.user_name;
      state.userImg = payload.avatar;
      state.userToken = localStorage.getItem("userToken")
        ? localStorage.getItem("userToken")
        : null;
      state.refreshUser = true;
    },
    [editProfileUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.login = payload;
      state.refreshUser = false;
    },
    // загрузка изображений (зависит от авторизации)
    [uploadImage.pending]: (state) => {
      state.loading = true;
      state.error.login = null;
    },
    [uploadImage.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [uploadImage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.login = payload;
    },
    // найти юзера по никнейму (не зависит от авторизации)
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload[0];
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error.login = payload;
    },
    // добавить пост в избранное (зависит от авторизации)
    [addFavorite.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addFavorite.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.favoritePosts = payload;
    },
    [addFavorite.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // удалить пост из избранного (зависит от авторизации)
    [removeFavorite.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [removeFavorite.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.favoritePosts = payload;
    },
    [removeFavorite.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
