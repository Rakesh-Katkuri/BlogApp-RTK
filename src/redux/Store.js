import { configureStore } from "@reduxjs/toolkit";
import likesSlice from "./reducer/likesSlice";
import blogsSlice from "./reducer/blogsSlice";
import myFavoriteSlice from "./reducer/myFavoriteSlice";

// Configure the Redux store using `configureStore` from Redux Toolkit
export const store = configureStore({
  // Define reducers to manage different parts of the application state
  reducer: {
    // `likesSlice` reducer manages the state related to likes
    likes: likesSlice,
    // `blogsSlice` reducer manages the state related to blogs
    blogs: blogsSlice,
    // `myFavoriteSlice` reducer manages the state related to favorite blogs
    myFavorites: myFavoriteSlice,
  },
  // Apply middleware to handle additional functionality like async actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Ignore serializable check for non-serializable data
});
