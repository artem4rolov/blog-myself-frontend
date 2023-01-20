import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/users/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
