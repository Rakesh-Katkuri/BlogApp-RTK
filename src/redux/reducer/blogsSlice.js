import { createSlice } from "@reduxjs/toolkit";
import {
  addBlogSlice,
  deleteSlice,
  getByIdSlice,
  updateBlogSlice,
} from "../actions/blogAction";
import { getAllBlogsSlice } from "../actions/blogAction";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  post: {},
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducer: {},
  //add blog
  extraReducers: (builder) => {
    builder.addCase(addBlogSlice.pending, (state, action) => {
      state.loading = true;
      console.log("addblogs slice action add case", action.payload);
    });

    builder.addCase(addBlogSlice.fulfilled, (state, action) => {
      console.log("addblogs slice action", action);
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(addBlogSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("addblog slice action reject payload", action.payload);
      state.error = "error";
    });
    builder.addCase(getAllBlogsSlice.pending, (state, action) => {
      state.loading = true;
      console.log("getAllBlogsSlice action add case", action.payload);
    });

    builder.addCase(getAllBlogsSlice.fulfilled, (state, action) => {
      console.log("getAllBlogsSlice action", action);
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllBlogsSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("getAllBlogsSlice action reject payload", action.payload);
      state.error = "error";
    });

    builder.addCase(updateBlogSlice.pending, (state, action) => {
      state.loading = true;
      console.log("updateBlogSlice action add case", action.payload);
    });

    builder.addCase(updateBlogSlice.fulfilled, (state, action) => {
      console.log("updateBlogSlice action", action);
      state.loading = false;
      //   state.posts = action.payload;
    });
    builder.addCase(updateBlogSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("updateBlogSlice action reject payload", action.payload);
      state.error = "error";
    });

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
  },
});

export default blogsSlice.reducer;
