import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./slices/url";
import userReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    urls: urlReducer,
    users: userReducer,
  },
});
