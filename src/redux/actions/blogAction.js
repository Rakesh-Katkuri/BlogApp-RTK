import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addBlogSlice = createAsyncThunk(
  "posts/addPost",
  async (addPost) => {
    const response = await axios.post(`http://localhost:3002/posts`, addPost);
    console.log("respones addblog ", response);
    return response.data;
  }
);

export const getAllBlogsSlice = createAsyncThunk("posts/getBlogs", async () => {
  const response = await axios.get(`http://localhost:3002/posts`);
  console.log("respones getallblogs ", response);
  return response.data;
});

export const updateBlogSlice = createAsyncThunk(
  "posts/updateBlog",
  async (updatedPost) => {
    const response = await axios.put(
      `http://localhost:3002/posts/${updatedPost.id}`,
      updatedPost
    );
    console.log("respones getallblogs ", response);
    return response.data;
  }
);

export const getByIdSlice = createAsyncThunk(
  "posts/getById",
  async (updatedPostId) => {
    const response = await axios.get(
      `http://localhost:3002/posts/${updatedPostId}`
    );

    console.log("respones getallblogs ", response);
    return response.data;
  }
);

export const deleteSlice = createAsyncThunk(
  "posts/deleteById",
  async (postId) => {
    const response = axios.delete(`http://localhost:3002/posts/${postId}`);

    console.log("respones getallblogs ", response);
    return response.data;
  }
);
