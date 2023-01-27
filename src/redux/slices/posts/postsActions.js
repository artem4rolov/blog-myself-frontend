import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// бэкенд по адресу
const backendURL = "http://localhost:5000";

// получить все посты
export const getPosts = createAsyncThunk("posts/get", async () => {
  try {
    const { data } = await axios.get(`${backendURL}/api/posts`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// получить конкретный пост
export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  try {
    const { data } = await axios.get(`${backendURL}/api/posts/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

// получить все комменты конкретного поста
export const getCommentsOfPost = createAsyncThunk(
  "posts/getCommentsOfPost",
  async (id) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/posts/${id}/comments`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// создать коммент к конкретному посту
export const createCommentOfPost = createAsyncThunk(
  "posts/createCommentOfPost",
  async ({ id, text }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        };
        const { data } = await axios.post(
          `${backendURL}/api/posts/${id}/comments/create`,
          { text },
          config
        );
        return data;
      } else {
        return new Error("Токен авторизации не получен");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// удалить конкретный коммент конкретного поста
export const deleteCommentOfPost = createAsyncThunk(
  "posts/deleteCommentOfPost",
  async ({ postId, id }) => {
    try {
      // берем токен из локального хранилища
      const token = localStorage.getItem("userToken");
      if (token) {
        const config = {
          headers: {
            // при удалении не нужно обозначать тип отправляемых данных, поскольку мы ничего не отправляем, а лишь обозначаем действие на бэке по конкретному роуту
            "Content-Type": "application/json",
            // токен нужен обязательно, поскольку только автор комментария может удалить свой комментарий
            token: `${token}`,
          },
        };
        await axios.delete(
          `${backendURL}/api/posts/${postId}/comments/${id}`,
          // передавать никаких данных на бэк не нужно - достаточно просто указать роут и конфиг запроса (в который добавили токен авторизации)
          // { id },
          config
        );
        // возвращать при удалении также ничего не нужно
        // return data;
      } else {
        return new Error("Токен авторизации не получен");
      }
    } catch (err) {
      console.log(err);
    }
  }
);
