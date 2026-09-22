import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";

export const store = configureStore({
  reducer: { auth: authSlice },
});
