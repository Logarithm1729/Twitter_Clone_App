import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { selectMyprofile } from "../../features/auth/authSlice";
import {
  asyncGetAllComments,
  asyncGetAllPosts,
  asyncGetLikes,
  asyncPostCreate,
  endIsPosting,
  endOpenNewPost,
  selectIsPosting,
  startIsPosting,
} from "../../features/post/postSlice";

export const HomeNewPostForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImg, setPostImg] = useState(null);
  const isPosting = useSelector(selectIsPosting);

  console.log(content);

  const myprofile = useSelector(selectMyprofile);

  const editPostImage = () => {
    const target = document.getElementById("home-post-image");
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
      await setTitle("");
      await setContent("");
      await setPostImg(null);
      await dispatch(asyncGetAllPosts());
      await dispatch(asyncGetAllComments());
      await dispatch(asyncGetLikes());
      await dispatch(endIsPosting());
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "50px",
        padding: "10px 10px",
        borderBottom: "solid #0000002b 1px",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <TextField
            type="text"
            name="title"
            placeholder="タイトル"
            maxRows={2}
            variant="standard"
            multiline
            sx={{ width: "40%", marginBottom: "10px" }}
            value={title}
            onChange={(event: any) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            type="text"
            placeholder="いまどうしてる？"
            name="content"
            maxRows={4}
            variant="standard"
            multiline
            sx={{ width: "100%", marginBottom: "10px" }}
            value={content}
            onChange={async (event: any) => {
              await setContent(event.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="icon-button-file" style={{ textAlign: "center" }}>
            <input
              id="home-post-image"
              type="file"
              // multiple
              style={{ display: "none" }}
              onChange={async (event: any) => {
                await setPostImg(event.target.files[0]);
              }}
            />
            <span onClick={editPostImage} style={{ cursor: "pointer" }}>
              <PhotoCamera />
            </span>
          </label>
          <Button
            variant="contained"
            sx={{ top: "0", right: "0", borderRadius: "20px" }}
            onClick={uploadPostData}
          >
            ツイートする
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
