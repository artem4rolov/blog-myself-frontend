import { configureStore } from "@reduxjs/toolkit";
// импорт всех редюсеров из auth.js
import authReducer from "../redux/slices/users/auth";
// добавление токена jwt при каждом запросе
import { authService } from "../services/authService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authService.reducerPath]: authService.reducer,
  },
  // явно указываем, что наш authService является middleware для нашего store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authService.middleware),
});

export default store;
