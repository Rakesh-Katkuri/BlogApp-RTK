import { configureStore } from "@reduxjs/toolkit";
import likesSlice from "./reducer/likesSlice";
import blogsSlice from "./reducer/blogsSlice";

export const store = configureStore({
  reducer: {
    likes: likesSlice,
    blogs: blogsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
