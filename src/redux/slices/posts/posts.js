import { createSlice } from "@reduxjs/toolkit";

import { getPosts, uploadImage } from "./postsActions";
import { getPostById } from "./postsActions";
import { createPost } from "./postsActions";
import { deletePost } from "./postsActions";
import { getCommentsOfPost } from "./postsActions";
import { createCommentOfPost } from "./postsActions";
import { deleteCommentOfPost } from "./postsActions";

const initialState = {
  posts: [],
  currentPost: null,
  comments: [],
  refreshComments: false,
  refreshPosts: false,
  error: null,
  loading: false,
  newPost: null,
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
      state.currentPost = null;
      state.newPost = null;
      state.refreshPosts = false;
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
      state.newPost = null;
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
    // удалить комментарий из поста (зависит от авторизации)
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
    // удалить пост (зависит от авторизации)
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshPosts = true;
      state.currentPost = null;
      state.error = payload;
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    // создать пост (зависит от авторизации)
    [createPost.pending]: (state) => {
      state.loading = true;
      state.refreshPosts = false;
      state.error = null;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshPosts = true;
      state.newPost = payload;
      state.currentPost = null;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.refreshPosts = false;
    },
    // загрузка изображений (зависит от авторизации)
    [uploadImage.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [uploadImage.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [uploadImage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default postsSlice.reducer;
