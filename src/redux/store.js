import { configureStore } from "@reduxjs/toolkit";
// импорт всех редюсеров из auth.js
import authReducer from "../redux/slices/users/auth";
import postsReducer from "../redux/slices/posts/posts";
// добавление токена jwt при каждом запросе
import { authService } from "../services/authService";

const store = configureStore({
  reducer: {
    // авторизация
    auth: authReducer,
    // get-запрос к серверу каждые 15 минут для обновления доступа пользователя
    // если токен jwt изменился - повторная авторизация
    [authService.reducerPath]: authService.reducer,
    // посты
    posts: postsReducer,
  },
  // явно указываем, что наш authService является middleware для нашего store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware),
});

export default store;
