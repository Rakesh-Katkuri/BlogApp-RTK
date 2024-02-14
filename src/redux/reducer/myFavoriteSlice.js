import { createSlice } from "@reduxjs/toolkit";
import { updateMyFavorite } from "../actions/myFavoriteAction";

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const myFavoriteSlice = createSlice({
  name: "myFavorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const blogId = action.payload;
      if (!state.favorites.includes(blogId)) {
        state.favorites.push(blogId);
      }
    },
    removeFromFavorites(state, action) {
      const blogId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== blogId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMyFavorite.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      console.log("updateMyFavorite slice action add case", action.payload);
    });

    builder.addCase(updateMyFavorite.fulfilled, (state, action) => {
      console.log("updateMyFavorite slice action", action);
      state.loading = false;
      console.log("action payload", action.payload);
      state.favorites = [action.payload];
    });
    builder.addCase(updateMyFavorite.rejected, (state, action) => {
      state.loading = false;
      console.log(
        "updateMyFavorite slice action reject payload",
        action.payload
      );
      state.error = "error";
    });
  },
});

export const { addToFavorites, removeFromFavorites } = myFavoriteSlice.actions;

export default myFavoriteSlice.reducer;
