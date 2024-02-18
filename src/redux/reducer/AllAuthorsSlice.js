import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBlogsByUserId,
  deleteUserSlice,
  fetchUsersSlice,
} from "../actions/authorsActions";

const authorsSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersSlice.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsersSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; // Update posts array with new data
      state.status = "fulfilled";
    });
    builder.addCase(fetchUsersSlice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Set error message
      state.status = "rejected";
    });
    // Case for delete users
    builder.addCase(deleteUserSlice.pending, (state, action) => {
      state.loading = true;
      console.log("deleteSlice action add case", action.payload);
    });
    builder.addCase(deleteUserSlice.fulfilled, (state, action) => {
      console.log("deleteSlice action", action);
      state.loading = false;
    });
    builder.addCase(deleteUserSlice.rejected, (state, action) => {
      state.loading = false;
      console.log("deleteSlice action reject payload", action.payload);
      state.error = "error";
    });
    //
    // Case for delete users associated with blogs
    builder.addCase(deleteBlogsByUserId.pending, (state, action) => {
      state.loading = true;
      console.log("deleteSlice action add case", action.payload);
    });
    builder.addCase(deleteBlogsByUserId.fulfilled, (state, action) => {
      console.log("deleteSlice action", action);
      state.loading = false;
    });
    builder.addCase(deleteBlogsByUserId.rejected, (state, action) => {
      state.loading = false;
      console.log("deleteSlice action reject payload", action.payload);
      state.error = "error";
    });
  },
});

export default authorsSlice.reducer;
