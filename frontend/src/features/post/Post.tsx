import React, { useEffect } from "react";
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
} from "./postSlice";
import { selectIsLogin } from "../auth/authSlice";

const customStyle = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 320,
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
  const isLogin = useSelector(selectIsLogin); 

  return (
    <div>
      <Modal
        open={openNewPost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customStyle}>
          <Formik
            initialValues={{ title: "", content: "", post_image: "" }}
            onSubmit={async (values) => {
              await dispatch(startIsPosting());
              const res = await dispatch(asyncPostCreate(values));
              if (asyncPostCreate.fulfilled.match(res)) {
                await dispatch(startIsPosting());
                await dispatch(asyncGetAllPosts());
                await dispatch(endOpenNewPost());
                await dispatch(endIsPosting());
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <div className={styles.post_div}>
                <CloseIcon
                  style={{ top: "0", left: "0" }}
                  onClick={() => dispatch(endOpenNewPost())}
                />
                <form onSubmit={handleSubmit} className={styles.post_form}>
                  <Stack
                    sx={{
                      width: "80%",
                      height: "100%",
                      margin: "0 auto 20px auto",
                    }}
                    alignItems="stretch"
                    justifyContent="space-evenly"
                  >
                    <TextField
                      value={values.title}
                      type="text"
                      name="title"
                      onChange={handleChange}
                      label="タイトル"
                      onBlur={handleBlur}
                      size="small"
                      variant="standard"
                    />
                    <TextField
                      value={values.content}
                      type="text"
                      name="content"
                      onChange={handleChange}
                      label="投稿内容"
                      onBlur={handleBlur}
                      multiline
                      rows={4}
                    />
                    <label
                      htmlFor="icon-button-file"
                      style={{ textAlign: "center" }}
                    >
                      <input
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        value={values.post_image}
                        onChange={handleChange}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    <Button
                      variant="contained"
                      type="submit"
                      endIcon={<TwitterIcon />}
                    >
                      {!isPosting ? (
                        <p>ツイートする</p>
                      ) : (
                        <CircularProgress size="small" />
                      )}
                    </Button>
                  </Stack>
                </form>
              </div>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
