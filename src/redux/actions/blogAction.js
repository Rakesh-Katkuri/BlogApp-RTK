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
    const response = await axios.delete(
      `http://localhost:3002/posts/${postId}`
    );

    console.log("respones getallblogs ", response);
    return response.data;
  }
);

// Async thunk action to delete blog posts by user ID
export const deleteBlogsByUserId = createAsyncThunk(
  "blogs/deleteBlogsByUserId",
  async (userId) => {
    // Fetch all blog posts
    const response = await axios.get(`http://localhost:3002/posts`);
    const allPosts = response.data;

    // Filter out blog posts associated with the specified user ID
    const postsToDelete = allPosts.filter((post) => post.userId === userId);

    // Delete each blog post associated with the user ID
    const deletionPromises = postsToDelete.map(async (post) => {
      await axios.delete(`http://localhost:3002/posts/${post.id}`);
      console.log(`Deleted blog post with ID ${post.id}`);
    });

    // Wait for all deletion operations to complete
    await Promise.all(deletionPromises);

    // Return the number of deleted blog posts (optional)
    return postsToDelete.length;
  }
);

// Thunk action creator for fetching favorite blogs by user ID
export const getFavoriteBlogs = createAsyncThunk(
  "posts/getFavoriteBlogs", // Action type
  async (userId) => {
    try {
      // Make an HTTP request to fetch favorite blogs by user ID
      const response = await axios.get(
        `http://localhost:3002/posts?userId=${userId}&favorites.length>0`
      );

      // Log the response for debugging
      console.log("Response from getFavoriteBlogs:", response);

      // Return the favorite blogs data to be used by the reducer
      return response.data;
    } catch (error) {
      // Handle errors, such as network errors or server errors
      console.error("Error fetching favorite blogs:", error);
      throw error; // Throw the error for further handling
    }
  }
);

// Define the async thunk action to fetch blogs by user ID
export const fetchBlogsByUserId = createAsyncThunk(
  "blogs/fetchBlogsByUserId",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/posts?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// export const blogDetailSlice = createAsyncThunk(
//   "posts/blogDetail",
//   async (Id) => {
//     const response = await axios.get(`http://localhost:3002/posts/${Id}`);
//     return response.data;
//   }
// );
