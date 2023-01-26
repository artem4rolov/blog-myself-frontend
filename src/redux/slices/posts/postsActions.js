import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// бэкенд по адресу
const backendURL = "http://localhost:5000";

export const getPosts = createAsyncThunk("posts/get", async () => {
  try {
    const { data } = await axios.get(`${backendURL}/api/posts`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  try {
    const { data } = await axios.get(`${backendURL}/api/posts/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});
