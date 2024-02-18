import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk action to fetch user data
export const fetchUsersSlice = createAsyncThunk(
  "users/fetchAuthorsSlice",
  async () => {
    const response = await axios.get(`http://localhost:3002/user`);
    console.log("authers listtttt", response);
    return response.data;
  }
);

// Async thunk action to delete a user
export const deleteUserSlice = createAsyncThunk(
  "users/deleteUserSlice",
  async (userId) => {
    const response = await axios.delete(`http://localhost:3002/user/${userId}`);
    console.log("deleted user", response);
    return userId; // Return the deleted userId to update the state
  }
);

// Async thunk action to delete blogs by user ID
export const deleteBlogsByUserId = createAsyncThunk(
  "blogs/deleteBlogsByUserId",
  async (userId) => {
    const response = axios.delete(`http://localhost:3002/posts/user/${userId}`);
    console.log("response deleteBlogsByUserId", response);
    return response.data;
  }
);
