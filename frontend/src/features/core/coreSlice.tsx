import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const coreSlice = createSlice({
  name: "core",
  initialState: {
    searchResultProfiles: [""],
    searchResultPosts: [""],
    searchResultShow: "account",
    searchText: "",
  },
  reducers: {
    setSearchResultProfiles(state, action) {
      state.searchResultProfiles.push(action.payload);
    },
    resetSearchResultProfiles(state) {
      state.searchResultProfiles = [""];
    },
    setSearchResultPosts(state, action) {
      state.searchResultPosts.push(action.payload);
    },
    resetSearchResultPosts(state) {
      state.searchResultPosts = [""];
    },
    accountSearchResultShow(state) {
      state.searchResultShow = "account";
    },
    tweetSearchResultShow(state) {
      state.searchResultShow = "tweet";
    },
    editSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setSearchResultProfiles,
  setSearchResultPosts,
  resetSearchResultPosts,
  resetSearchResultProfiles,
  accountSearchResultShow,
  tweetSearchResultShow,
  editSearchText,
} = coreSlice.actions;

export const selectSearchResultProfiles = (state: RootState) =>
  state.core.searchResultProfiles;
export const selectSearchResultPosts = (state: RootState) =>
  state.core.searchResultPosts;
export const selectSearchResultShow = (state: RootState) =>
  state.core.searchResultShow;
export const selectSearchText = (state: RootState) => state.core.searchText;

export default coreSlice.reducer;
