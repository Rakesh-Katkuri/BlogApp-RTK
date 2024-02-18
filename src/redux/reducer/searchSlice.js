// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  searchResults: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    clearSearch(state) {
      state.searchTerm = "";
      state.searchResults = [];
    },
  },
});

export const { setSearchTerm, setSearchResults, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
