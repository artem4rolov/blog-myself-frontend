import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// authActions.js
const backendURL = "http://localhost:5000";

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
  async ({ user_name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/api/users/register`,
        { user_name, email, password },
        config
      );
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
