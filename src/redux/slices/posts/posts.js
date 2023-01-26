import { createSlice } from "@reduxjs/toolkit";

import { getPosts } from "./postsActions";
import { getPostById } from "./postsActions";

const initialState = {
  posts: [],
  currentPost: null,
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Получить все посты (не зависит от авторизации)
    [getPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Получить один пост по id (не зависит от авторизации)
    [getPostById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPostById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.currentPost = payload;
    },
    [getPostById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default postsSlice.reducer;
