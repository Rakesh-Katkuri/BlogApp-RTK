import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action creator for adding a new blog post
export const addBlogSlice = createAsyncThunk(
  "posts/addPost", // Action type
  async (addPost) => {
    // Payload creator function
    const response = await axios.post(`http://localhost:3002/posts`, addPost);
    console.log("respones addblog ", response);
    // Return the response data to be used by the reducer
    return response.data;
  }
);

// Thunk action creator for fetching all blog posts
export const getAllBlogsSlice = createAsyncThunk("posts/getBlogs", async () => {
  const response = await axios.get(`http://localhost:3002/posts`);
  console.log("respones getallblogs ", response);
  // Return the response data to be used by the reducer
  return response.data;
});

// Thunk action creator for updating a blog post
export const updateBlogSlice = createAsyncThunk(
  "posts/updateBlog", // Action type
  async (updatedPost) => {
    // Payload creator function
    const response = await axios.put(
      `http://localhost:3002/posts/${updatedPost.id}`,
      updatedPost
    );
    console.log("respones getallblogs ", response);
    // Return the response data to be used by the reducer
    return response.data;
  }
);

// Thunk action creator for fetching a blog post by ID
export const getByIdSlice = createAsyncThunk(
  "posts/getById", // Action type
  async (updatedPostId) => {
    // Payload creator function
    const response = await axios.get(
      `http://localhost:3002/posts/${updatedPostId}`
    );

    console.log("respones getallblogs ", response);
    // Return the response data to be used by the reducer
    return response.data;
  }
);

// Thunk action creator for deleting a blog post by ID
export const deleteSlice = createAsyncThunk(
  "posts/deleteById",
  async (postId) => {
    const response = axios.delete(`http://localhost:3002/posts/${postId}`);

    console.log("respones getallblogs ", response);
    return response.data;
  }
);

// export const blogDetailSlice = createAsyncThunk(
//   "posts/blogDetail",
//   async (Id) => {
//     const response = await axios.get(`http://localhost:3002/posts/${Id}`);
//     return response.data;
//   }
// );
