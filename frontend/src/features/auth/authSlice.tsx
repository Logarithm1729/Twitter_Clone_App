import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

import {
  FOLLOW,
  PROFILE,
  PROFILE_ID,
  PROPS_AUTHEN,
  PROPS_ID,
} from "../../types/auth_types";

// const API_URL = process.env.DJANGO_TO_REACT_API_URL;
const API_URL = "http://localhost:8000";

export const asyncTakeToken = createAsyncThunk(
  "auth/jwt/post",
  async (authen: PROPS_AUTHEN) => {
    const res = await axios.post(`${API_URL}/authen/jwt/create/`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const asyncUserRegister = createAsyncThunk(
  "user/register",
  async (auth: PROPS_AUTHEN) => {
    const res = await axios.post(`${API_URL}/rest_api/user/register/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const asyncGetAllUsers = createAsyncThunk("user/list", async () => {
  const res = await axios.get(`${API_URL}/rest_api/user/list/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const asyncGetDetailUser = createAsyncThunk(
  "user/detail",
  async (id: string) => {
    const res = await axios.get(`${API_URL}/rest_api/user/detail/${id}/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const asyncGetMyProfile = createAsyncThunk(
  "profile/my/get",
  async () => {
    const res = await axios.get(`${API_URL}/rest_api/compose/myprofile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data[0];
  }
);

export const asyncGetAllProfiles = createAsyncThunk(
  "profile/all/get",
  async () => {
    const res = await axios.get(`${API_URL}/rest_api/compose/profile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const asyncGetProfile = createAsyncThunk(
  "profile/all/get/detail",
  async (prof_id: PROFILE_ID) => {
    const res = await axios.get(
      `${API_URL}/rest_api/compose/profile/${prof_id}/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const asyncUpdateMyProfile = createAsyncThunk(
  "profile/update",
  async (prof_info: PROFILE) => {
    const uploadData = new FormData();
    uploadData.append("id", prof_info.id);
    uploadData.append("userProfile", prof_info.userProfile);
    prof_info.user_id && uploadData.append("user_id", prof_info.user_id);
    prof_info.username && uploadData.append("username", prof_info.username);
    prof_info.age && uploadData.append("age", String(prof_info.age));
    prof_info.prof_image &&
      uploadData.append("prof_image", prof_info.prof_image, prof_info.prof_image.name);
    const res = await axios.put(
      `${API_URL}/rest_api/compose/profile/${prof_info.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
export const asyncFollowing = createAsyncThunk(
  "following",
  async (userFollowing) => {
    const res = await axios.post(
      `${API_URL}/rest_api/compose/follow/`,
      userFollowing,
      {
        headers: {
          "Content-Type": "appication/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    openSignIn: true,
    openSignUp: false,
    openSettings: false,
    openProfile: false,
    isLoading: false,
    isLogin: false,
    myProfile: {
      id: "",
      user_id: "",
      username: "",
      age: 0,
      prof_image: "",
      userProfile: "",
    },
    allProfiles: [
      {
        id: "",
        user_id: "",
        username: "",
        age: 0,
        prof_image: "",
        userProfile: "",
      },
    ],
    follow: {
      userFollowing: "",
      userFollower: "",
    },
  },
  reducers: {
    startSignIn(state) {
      state.openSignIn = true;
    },
    endSignIn(state) {
      state.openSignIn = false;
    },
    startSignUp(state) {
      state.openSignUp = true;
    },
    endSignUp(state) {
      state.openSignUp = false;
    },
    startProfile(state) {
      state.openProfile = true;
    },
    endProfile(state) {
      state.openProfile = false;
    },
    startSettings(state) {
      state.openSettings = true;
    },
    endSettings(state) {
      state.openSettings = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    startLogin(state) {
      state.isLogin = true;
    },
    endLogin(state) {
      state.isLogin = false;
    },
    editMyProfile(state, action) {
      state.myProfile = action.payload;
    },
    editFollow(state, action: PayloadAction<FOLLOW>) {
      state.follow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncTakeToken.fulfilled, (state, aciton) => {
      localStorage.setItem("localJWT", aciton.payload.access);
    });
    builder.addCase(asyncGetMyProfile.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });
    builder.addCase(asyncGetAllProfiles.fulfilled, (state, action) => {
      state.allProfiles = action.payload;
    });
  },
});

export const {
  startSignIn,
  startSignUp,
  startSettings,
  startProfile,
  startLoading,
  startLogin,
  endSignIn,
  endSignUp,
  endSettings,
  endProfile,
  endLoading,
  endLogin,
  editMyProfile,
  editFollow,
} = authSlice.actions;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectOpenSettings = (state: RootState) => state.auth.openSettings;
export const selectOpenProfile = (state: RootState) => state.auth.openProfile;
export const selectMyprofile = (state: RootState) => state.auth.myProfile;
export const selectAllProfiles = (state: RootState) => state.auth.allProfiles;

export default authSlice.reducer;
