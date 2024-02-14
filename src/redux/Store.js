import { configureStore } from "@reduxjs/toolkit";
import likesSlice from "./reducer/likesSlice";
import blogsSlice from "./reducer/blogsSlice";
import myFavoriteSlice from "./reducer/myFavoriteSlice";

export const store = configureStore({
  reducer: {
    likes: likesSlice,
    blogs: blogsSlice,
    myFavorites: myFavoriteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
