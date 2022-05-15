import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TwitterIcon from "@mui/icons-material/Twitter";
import { PhotoCamera } from "@mui/icons-material";

import { AppDispatch } from "../../app/store";
import styles from "./Post.module.css";
import {
  asyncPostCreate,
  endOpenNewPost,
  selectOpenNewPost,
  selectIsPosting,
  startIsPosting,
  endIsPosting,
  asyncGetAllPosts,
  asyncGetAllComments,
  asyncGetLikes,
} from "./postSlice";
import { selectIsLogin } from "../auth/authSlice";

const customStyle = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 400,
  bgcolor: "white",
  boxShadow: 24,
  pt: 2,
  pb: 2,
  pr: 3,
  pl: 3,
  outline: "none",
  borderRadius: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const Post = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewPost = useSelector(selectOpenNewPost);
  const isPosting = useSelector(selectIsPosting);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImg, setPostImg] = useState(null);

  const editPostImage = () => {
    const target = document.getElementById("modal-post-image");
    target?.click();
  };

  const uploadPostData = async () => {
    const data = {
      title: title,
      content: content,
      post_image: postImg,
    };
    await dispatch(startIsPosting());
    const res = await dispatch(asyncPostCreate(data));
    if (asyncPostCreate.fulfilled.match(res)) {
      await dispatch(asyncGetAllPosts());
      await dispatch(asyncGetAllComments());
      await dispatch(asyncGetLikes());
      await dispatch(endOpenNewPost());
      await dispatch(endIsPosting());
    }
  };

  return (
    <div>
      <Modal
        open={openNewPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customStyle}>
          <div className={styles.post_div}>
            <CloseIcon
              style={{ top: "0", left: "0" }}
              onClick={() => dispatch(endOpenNewPost())}
            />
            <h2 style={{ textAlign: "center", margin: "0" }}>新しいツイート</h2>
            <Stack
              sx={{
                width: "80%",
                height: "100%",
                margin: "0 auto 20px auto",
              }}
              alignItems="stretch"
              justifyContent="space-evenly"
              maxHeight="350px"
            >
              <TextField
                type="text"
                name="title"
                label="タイトル"
                size="small"
                variant="standard"
                defaultValue=""
                onChange={(event: any) => {
                  setTitle(event.target.value);
                }}
              />
              <TextField
                type="text"
                name="content"
                label="投稿内容"
                multiline
                rows={4}
                onChange={(event: any) => {
                  setContent(event.target.value);
                }}
              />
              <input
                id="modal-post-image"
                type="file"
                style={{ display: "none" }}
                onChange={(event: any) => {
                  setPostImg(event.target.files[0]);
                }}
              />
              <label style={{ textAlign: "center" }} onClick={editPostImage}>
                <PhotoCamera />
              </label>
              <Button
                variant="contained"
                endIcon={<TwitterIcon />}
                onClick={uploadPostData}
              >
                {!isPosting ? (
                  <p>ツイートする</p>
                ) : (
                  <CircularProgress size="small" />
                )}
              </Button>
            </Stack>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
