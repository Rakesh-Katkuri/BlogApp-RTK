import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addToFavorites,
  removeFromFavorites,
} from "../reducer/myFavoriteSlice";

export const updateMyFavorite = createAsyncThunk(
  "favorites/updateFavorites",
  async (blogId, { getState, dispatch }) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
      const post = response.data;
      console.log("myfav post", post);
      const userFavorites = post.favorites.includes(userId);

      if (userFavorites) {
        post.favorites = post.favorites.filter((id) => id !== userId);
        dispatch(removeFromFavorites(blogId)); // Update Redux state to remove from favorites
      } else {
        post.favorites.push(userId);
        dispatch(addToFavorites(blogId)); // Update Redux state to add to favorites
      }

      const upadatedPostData = await axios.put(
        `http://localhost:3002/posts/${blogId}`,
        post
      );
      console.log("upadatedPostData", upadatedPostData);
      return upadatedPostData.data;
    } catch (error) {
      throw error;
    }
  }
);

// export const fetchFavorites = createAsyncThunk(
//   "favorites/fetchFavorites",
//   async (blogId) => {
//     const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
//     console.log("respones fav ", response);
//     return response.data;
//   }
// );
