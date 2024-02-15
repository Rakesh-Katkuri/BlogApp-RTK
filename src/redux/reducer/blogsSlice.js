import { createSlice } from "@reduxjs/toolkit";
import {
  addBlogSlice,
  blogDetailSlice,
  deleteSlice,
  getByIdSlice,
  updateBlogSlice,
} from "../actions/blogAction";
import { getAllBlogsSlice } from "../actions/blogAction";

const initialState = {
  loading: false, // Flag to indicate loading state
  error: null, // Holds potential error messages
  posts: [], // Holds an array of blog posts
  post: {}, // Holds a single blog post
};

// Create a slice for managing blog-related state
export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducer: {},
  // Handling asynchronous actions with `extraReducers`
  extraReducers: (builder) => {
    // Case for adding a new blog post
    builder.addCase(addBlogSlice.pending, (state, action) => {
      state.loading = true;
      console.log("addblogs slice action add case", action.payload);
    });
    builder.addCase(addBlogSlice.fulfilled, (state, action) => {
      console.log("addblogs slice action", action);
      state.loading = false;
      state.posts = action.payload; // Update posts array with new data
    });
    builder.addCase(addBlogSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("addblog slice action reject payload", action.payload);
      state.error = "error";
    });

    // Case for getting all blog posts
    builder.addCase(getAllBlogsSlice.pending, (state, action) => {
      state.loading = true;
      console.log("getAllBlogsSlice action add case", action.payload);
    });
    builder.addCase(getAllBlogsSlice.fulfilled, (state, action) => {
      console.log("getAllBlogsSlice action", action);
      state.loading = false;
      state.posts = action.payload; // Update posts array with new data
    });
    builder.addCase(getAllBlogsSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("getAllBlogsSlice action reject payload", action.payload);
      state.error = "error";
    });

    // Case for update blog posts
    builder.addCase(updateBlogSlice.pending, (state, action) => {
      state.loading = true;
      console.log("updateBlogSlice action add case", action.payload);
    });
    builder.addCase(updateBlogSlice.fulfilled, (state, action) => {
      console.log("updateBlogSlice action", action);
      state.loading = false;
    });
    builder.addCase(updateBlogSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("updateBlogSlice action reject payload", action.payload);
      state.error = "error";
    });

    // Case for get by id blog posts
    builder.addCase(getByIdSlice.pending, (state, action) => {
      state.loading = true;
      console.log("getByIdSlice action add case", action.payload);
    });
    builder.addCase(getByIdSlice.fulfilled, (state, action) => {
      console.log("getByIdSlice action", action);
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getByIdSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("getByIdSlice action reject payload", action.payload);
      state.error = "error";
    });

    // Case for delete blog posts
    builder.addCase(deleteSlice.pending, (state, action) => {
      state.loading = true;
      console.log("deleteSlice action add case", action.payload);
    });
    builder.addCase(deleteSlice.fulfilled, (state, action) => {
      console.log("deleteSlice action", action);
      state.loading = false;
    });
    builder.addCase(deleteSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("deleteSlice action reject payload", action.payload);
      state.error = "error";
    });
    //blogdetail
    // builder.addCase(blogDetailSlice.pending, (state, action) => {
    //   state.loading = true;
    //   console.log("getByIdSlice action add case", action.payload);
    // });

    // builder.addCase(blogDetailSlice.fulfilled, (state, action) => {
    //   console.log("getByIdSlice action", action);
    //   state.loading = false;
    //   state.posts = action.payload;
    // });
    // builder.addCase(blogDetailSlice.rejected, (state, action) => {
    //   state.loading = false;
    //   console.log("getByIdSlice action reject payload", action.payload);
    //   state.error = "error";
    // });
  },
});

export default blogsSlice.reducer; // Export the reducer function
