import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateMyFavorite = createAsyncThunk(
  "favorites/updateFavorites",
  async (blogId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
      const post = response.data;
      console.log("myfav post", post);
      const userFavorites = post.favorites.includes(userId);

      if (userFavorites) {
        post.favorites = post.favorites.filter((id) => id !== userId);
      } else {
        post.favorites.push(userId);
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
