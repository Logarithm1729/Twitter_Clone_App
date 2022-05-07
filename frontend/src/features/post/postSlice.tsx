import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
  COMMENT_CREATE,
  POST_CREATE,
  POST_GET_RESPONCE,
} from "../../types/post_types";

const api_url = "http://localhost:8000";

export const asyncPostCreate = createAsyncThunk(
  "post/create",
  async (post_info: POST_CREATE) => {
    const uploadData = new FormData();
    post_info.title && uploadData.append("title", post_info.title);
    post_info.content && uploadData.append("content", post_info.content);
    post_info.post_image &&
      uploadData.append("post_image", post_info.post_image);
    const res = await axios.post(
      `${api_url}/rest_api/compose/posts/`,
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

export const asyncGetAllPosts = createAsyncThunk("post/get/all", async () => {
  const res = await axios.get<[POST_GET_RESPONCE]>(
    `${api_url}/rest_api/compose/posts/`,
    {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    }
  );
  return res.data;
});

export const asyncCommentCreate = createAsyncThunk(
  "comment/create",
  async (comment_info: COMMENT_CREATE) => {
    const res = await axios.post(
      `${api_url}/rest_api/compose/comments/`,
      comment_info,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const asyncGetAllComments = createAsyncThunk("comment/get", async () => {
  const res = await axios.get(`${api_url}/rest_api/compose/comments/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    openNewPost: false,
    isPosting: false,
    posts: [
      {
        id: "",
        title: "",
        content: "",
        post_image: "",
        userPost: 0,
        created_at: "",
      },
    ],
    comments: [
      {
        comment: 0,
        postComment: "",
        userComment: "",
        created_at: "",
      },
    ],
    likes: [
      {
        userLike: 0,
        postLike: 0,
        commentLike: 0,
      },
    ],
  },
  reducers: {
    startOpenNewPost(state) {
      state.openNewPost = true;
    },
    endOpenNewPost(state) {
      state.openNewPost = false;
    },
    startIsPosting(state) {
      state.isPosting = true;
    },
    endIsPosting(state) {
      state.isPosting = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(asyncPostCreate.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(asyncGetAllComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export const {
  startOpenNewPost,
  endOpenNewPost,
  startIsPosting,
  endIsPosting,
} = postSlice.actions;

export const selectOpenNewPost = (state: RootState) => state.post.openNewPost;
export const selectIsPosting = (state: RootState) => state.post.isPosting;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectComments = (state: RootState) => state.post.comments;
export const selectLike = (state: RootState) => state.post.likes;

export default postSlice.reducer;