import { createSlice } from "@reduxjs/toolkit";

import { getPosts } from "./postsActions";
import { getPostById } from "./postsActions";
import { getCommentsOfPost } from "./postsActions";
import { createCommentOfPost } from "./postsActions";
import { deleteCommentOfPost } from "./postsActions";

const initialState = {
  posts: [],
  currentPost: null,
  comments: [],
  refreshComments: false,
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
    // Получить все комменты поста по id поста (не зависит от авторизации)
    [getCommentsOfPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCommentsOfPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
    },
    [getCommentsOfPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Создать комментарий к посту (зависит от авторизации)
    [createCommentOfPost.pending]: (state) => {
      state.loading = true;
      state.refreshComments = false;
      state.error = null;
    },
    [createCommentOfPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = true;
      state.comments = [...state.comments, payload];
    },
    [createCommentOfPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = false;
      state.error = payload;
    },
    // удалить комментарий из посту (зависит от авторизации)
    [deleteCommentOfPost.pending]: (state) => {
      state.loading = true;
      state.refreshComments = false;
      state.error = null;
    },
    [deleteCommentOfPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = true;
    },
    [deleteCommentOfPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = false;
    },
  },
});

export default postsSlice.reducer;
