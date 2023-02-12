import { createSlice } from "@reduxjs/toolkit";

import {
  getCommentsOfUser,
  getPosts,
  updatePost,
  uploadImage,
} from "./postsActions";
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
  usersComments: [],
  refreshComments: false,
  refreshPosts: false,
  error: null,
  loading: false,
  // newPost нужен для создания поста и перехода на только что созданный пост
  newPost: null,
  // для пуш-уведомлений
  newComment: false,
  handleDeletePost: false,
  handleDeleteComment: false,
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
      state.handleDeletePost = false;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.currentPost = null;
      state.newPost = null;
      state.refreshPosts = false;
      state.handleDeletePost = false;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.handleDeletePost = false;
    },
    // Получить один пост по id (не зависит от авторизации)
    [getPostById.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.newComment = false;
      state.handleDeletePost = false;
      state.handleDeleteComment = false;
    },
    [getPostById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.currentPost = payload;
      state.newPost = null;
      state.newComment = false;
      state.handleDeletePost = false;
      state.handleDeleteComment = false;
    },
    [getPostById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.handleDeletePost = false;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    // Получить все комменты поста по id поста (не зависит от авторизации)
    [getCommentsOfPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    [getCommentsOfPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    [getCommentsOfPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    // Получить все комменты пользователя (зависит от авторизации)
    [getCommentsOfUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    [getCommentsOfUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.usersComments = payload;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    [getCommentsOfUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.handleDeleteComment = false;
      state.newComment = false;
    },
    // Создать комментарий к посту (зависит от авторизации)
    [createCommentOfPost.pending]: (state) => {
      state.loading = true;
      state.refreshComments = false;
      state.error = null;
      state.newComment = false;
    },
    [createCommentOfPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = true;
      state.comments = [...state.comments, payload];
      state.newComment = true;
    },
    [createCommentOfPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = false;
      state.error = payload;
      state.newComment = false;
    },
    // удалить комментарий из поста (зависит от авторизации)
    [deleteCommentOfPost.pending]: (state) => {
      state.loading = true;
      state.refreshComments = false;
      state.error = null;
      state.handleDeleteComment = false;
    },
    [deleteCommentOfPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = true;
      state.handleDeleteComment = true;
    },
    [deleteCommentOfPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.refreshComments = false;
      state.handleDeleteComment = false;
    },
    // удалить пост (зависит от авторизации)
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.handleDeletePost = false;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshPosts = true;
      state.currentPost = null;
      state.error = payload;
      state.handleDeletePost = true;
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.handleDeletePost = false;
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
    // обновить пост (зависит от авторизации)
    [updatePost.pending]: (state) => {
      state.loading = true;
      state.refreshPosts = false;
      state.error = null;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.refreshPosts = true;
      state.newPost = payload;
      state.currentPost = null;
    },
    [updatePost.rejected]: (state, { payload }) => {
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
