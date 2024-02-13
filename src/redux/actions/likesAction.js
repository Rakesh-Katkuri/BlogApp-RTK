import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateLikes = createAsyncThunk(
  "likes/updateLikes",
  async (blogId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3002/posts/${blogId}`);
      const post = response.data;
      const userLiked = post.likesBy.includes(userId);

      if (userLiked) {
        post.likes -= 1;
        post.likesBy = post.likesBy.filter((id) => id !== userId);
      } else {
        post.likes += 1;
        post.likesBy.push(userId);
      }

      await axios.put(`http://localhost:3002/posts/${blogId}`, post);
      return post;
    } catch (error) {
      throw error;
    }
  }
);
