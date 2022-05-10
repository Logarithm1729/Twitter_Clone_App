import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  asyncGetAllPosts,
  asyncPostCreate,
  endIsPosting,
  endOpenNewPost,
  startIsPosting,
} from "../../features/post/postSlice";

export const HomeNewPostForm = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "50px",
        padding: "10px 10px",
        borderBottom: "solid #0000002b 1px",
      }}
    >
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
            values.title = "";
            values.content = "";
            values.post_image = "";
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
          <Box>
            <form onSubmit={handleSubmit}>
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
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "40%", marginBottom: "10px" }}
                />
                <TextField
                  type="text"
                  placeholder="いまどうしてる？"
                  name="content"
                  maxRows={4}
                  variant="standard"
                  multiline
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "100%", marginBottom: "10px" }}
                />
              </Box>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                  sx={{ top: "0", right: "0", borderRadius: "20px" }}
                >
                  ツイートする
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};
