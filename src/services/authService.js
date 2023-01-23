import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = "http://localhost:5000";

// добавляем jwt токен к каждому запросу пользователя на сайте

export const authService = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // адрес нашего бэкенда
    baseUrl: backendURL,
    // prepareHeaders используется для настройки каждого нового запроса на бэк, в который мы будем включать новую пару "ключ-значение"
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        // добавляем новое поле в заголовки каждого запроса
        headers.set("token", `${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "api/users/profile",
        method: "GET",
      }),
    }),
  }),
});

// экспортируем хук для использоваения в компонентах
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authService;
