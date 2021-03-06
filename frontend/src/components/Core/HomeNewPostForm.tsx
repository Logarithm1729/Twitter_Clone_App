import { PhotoCamera } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  asyncGetAllComments,
  asyncGetAllPosts,
  asyncGetLikes,
  asyncPostCreate,
  endIsPosting,
  startIsPosting,
} from "../../features/post/postSlice";

export const HomeNewPostForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImg, setPostImg] = useState<null | File>(null);

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
          display="flex"
          sx={{
            width: "80%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="icon-button-file" style={{ textAlign: "center" }}>
            <input
              id="home-post-image"
              type="file"
              // multiple
              style={{ display: "none" }}
              accept="image/png, image/jpeg"
              onChange={async (event: any) => {
                if (event.target.files.length > 0) {
                  setPostImg(event.target.files[0]);
                } else {
                  setPostImg(null);
                }
              }}
            />
            {postImg === null ? (
              <Box
                onClick={editPostImage}
                display="flex"
                sx={{
                  cursor: "pointer",
                  color: "#3f79bb",
                }}
              >
                <PhotoCamera />
              </Box>
            ) : (
              <Box
                display="flex"
                sx={{
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => setPostImg(null)}
              >
                <p style={{ color: "red" }}>
                  <DeleteForeverIcon />
                </p>
                <p style={{ paddingBottom: "7px" }}>{postImg.name}</p>
              </Box>
            )}
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
