import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
