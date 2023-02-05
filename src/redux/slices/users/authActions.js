import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// бэкенд по адресу
// const backendURL = "http://localhost:5000";
const backendURL = "https://nice-pink-lapel.cyclic.app";

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
  async (formData, { rejectWithValue }) => {
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
          formData,
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
