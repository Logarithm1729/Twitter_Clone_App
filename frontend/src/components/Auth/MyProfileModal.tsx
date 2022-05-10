import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

import {
  asyncGetMyProfile,
  asyncUpdateMyProfile,
  endLoading,
  endProfile,
  selectMyprofile,
  selectOpenProfile,
  startLoading,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";

const customStyle = {
  position: "absolute" as "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 460,
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

export const MyProfileModal = () => {
  const openProfile = useSelector(selectOpenProfile);
  const myprofile = useSelector(selectMyprofile);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Modal
      open={openProfile}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={customStyle}>
        <Formik
          initialValues={{
            id: myprofile.id,
            userProfile: myprofile.userProfile,
            user_id: myprofile.user_id,
            username: myprofile.username,
            age: myprofile.age,
            prof_image: myprofile.prof_image,
          }}
          onSubmit={async (values) => {
            await dispatch(startLoading());
            const res = await dispatch(asyncUpdateMyProfile(values));
            if (asyncUpdateMyProfile.fulfilled.match(res)) {
              await dispatch(endProfile());
              await dispatch(asyncGetMyProfile());
              await dispatch(endLoading());
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
            isValid,
          }) => (
            <Box sx={{ width: "100%", height: "100%" }}>
              <CloseIcon
                sx={{ top: "0", left: "0", cursor: "pointer" }}
                onClick={() => dispatch(endProfile())}
              />
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h2 style={{ marginBottom: "10px" }}>プロフィール</h2>
                  <img
                    src={
                      myprofile.prof_image
                        ? myprofile.prof_image
                        : "https://source.unsplash.com/random"
                    }
                    width="150px"
                    height="150px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                  <TextField
                    type="text"
                    name="user_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="ユーザーID"
                    defaultValue={values.user_id}
                    variant="standard"
                    sx={{ marginBottom: "10px", width: "70%" }}
                  />
                  <TextField
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="ユーザー名"
                    defaultValue={values.username}
                    variant="standard"
                    sx={{ marginBottom: "10px", width: "70%" }}
                  />
                  <TextField
                    type="number"
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="年齢"
                    defaultValue={values.age}
                    variant="standard"
                    sx={{ marginBottom: "20px", width: "70%" }}
                  />
                  <Button type="submit" variant="contained">
                    更新する
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
