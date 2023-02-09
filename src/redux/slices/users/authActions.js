import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// бэкенд по адресу
const backendURL = "http://localhost:5000";
// const backendURL = "https://nice-pink-lapel.cyclic.app";

// добавляем пост в избранное
export const addFavorite = createAsyncThunk(
  "auth/addFavorite",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const config = {
          headers: {
            token: `${token}`,
          },
        };
        const { data } = await axios.post(
          `${backendURL}/api/users/addFavorite/${id}`,
          { id },
          config
        );
        return data;
      } else {
        return new Error("Токен авторизации не получен");
      }
    } catch (error) {
      // возвращаем текст ошибки, если она есть
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// удаляем пост из избранного
export const removeFavorite = createAsyncThunk(
  "auth/addFavorite",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const config = {
          headers: {
            token: `${token}`,
          },
        };
        const { data } = await axios.post(
          `${backendURL}/api/users/removeFavorite/${id}`,
          { id },
          config
        );
        return data;
      } else {
        return new Error("Токен авторизации не получен");
      }
    } catch (error) {
      // возвращаем текст ошибки, если она есть
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// поиск автора по имени
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (user_name, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/users/profile/${user_name}`
      );
      return data;
    } catch (error) {
      // возвращаем текст ошибки, если она есть
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// вход
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // указываем тип отправляемых данных пользоваетелем на сервер
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/users/login`,
        { email, password },
        config
      );
      // заносим токен авторизации в localStorage
      localStorage.setItem("userToken", data.token);
      return data;
    } catch (error) {
      // возвращаем текст ошибки, если она есть
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// регистрация
export const registerUser = createAsyncThunk(
  "auth/register",
  // отправляем formData с введенными данными пользователя и выбранным аватаром
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/users/register`,
        formData
      );
      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// обновление профиля пользователя
export const editProfileUser = createAsyncThunk(
  "auth/editProfileUser",
  // отправляем formData с введенным именем пользователя и выбранным аватаром
  async ({ user_name, avatar }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const config = {
          headers: {
            token: `${token}`,
          },
        };
        const { data } = await axios.patch(
          `${backendURL}/api/users/editProfile`,
          { user_name, avatar },
          config
        );
        // заносим токен авторизации в localStorage
        localStorage.setItem("userToken", data.token);
        return data;
      } else {
        return new Error("Токен авторизации не получен");
      }
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// authMe (проверка calStorage на наличие token jwt)
// выход
