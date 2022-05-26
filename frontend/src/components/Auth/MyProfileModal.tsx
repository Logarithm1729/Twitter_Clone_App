import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import {
  asyncUpdateMyProfile,
  endLoading,
  endProfile,
  selectMyprofile,
  selectOpenProfile,
  startLoading,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import { Button, TextField } from "@mui/material";
import { defaultImage } from "../../types/auth_types";

const customStyle = {
  position: "absolute" as "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 500,
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

  const [image, setImage] = useState<null | File>(null);
  const [userId, setUserId] = useState(myprofile.user_id);
  const [username, setUsername] = useState(myprofile.username);
  const [age, setAge] = useState(myprofile.age);
  const [errorOfUserId, setErrorOfUserId] = useState("");
  const [isChange, setIsChange] = useState(false);

  const connectSpanToInput = () => {
    const target = document.getElementById("profile-image");
    target?.click();
  };

  const onClickUpload = async () => {
    await dispatch(startLoading());
    const profData = {
      id: myprofile.id,
      prof_image: image,
      user_id: userId,
      username: username,
      age: age,
      userProfile: myprofile.userProfile,
    };
    const res = await dispatch(asyncUpdateMyProfile(profData));
    if (asyncUpdateMyProfile.fulfilled.match(res)) {
      window.location.pathname = `/${userId}`;
      if (window.location.pathname === `/${userId}`) {
        await setAge(0);
        await setImage(null);
        await setUserId("");
        await setUsername("");
        await dispatch(endProfile());
        await dispatch(endLoading());
      }
    } else if (asyncUpdateMyProfile.rejected.match(res)) {
      await setErrorOfUserId("このIDは既に使用されています");
      await dispatch(endLoading());
    }
  };

  return (
    <Modal
      open={openProfile}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={customStyle}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <CloseIcon
            sx={{ top: "0", left: "0", cursor: "pointer" }}
            onClick={() => {
              dispatch(endProfile());
              setImage(null);
              setUserId(myprofile.user_id);
              setUsername(myprofile.username);
              setAge(myprofile.age);
            }}
          />
          <Box
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>プロフィール</h2>
            <img
              src={myprofile.prof_image ? myprofile.prof_image : defaultImage}
              alt="auth"
              width="140px"
              height="140px"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <input
              type="file"
              id="profile-image"
              hidden
              onChange={(event: any) => {
                if (event.target.files.length > 0) {
                  setImage(event.target.files[0]);
                  setIsChange(true);
                } else {
                  setImage(null);
                }
              }}
            />
            {image === null ? (
              <span onClick={connectSpanToInput} style={{ cursor: "pointer" }}>
                <AddAPhotoIcon />
              </span>
            ) : (
              <Box
                display="flex"
                sx={{
                  cursor: "pointer",
                  justifyContent: "center",

                  alignItems: "center",
                }}
                onClick={() => setImage(null)}
              >
                <p style={{ color: "red" }}>
                  <DeleteForeverIcon />
                </p>
                <p style={{ fontSize: "6px" }}>{image.name}</p>
              </Box>
            )}
            {errorOfUserId === "" ? (
              <TextField
                type="text"
                name="user_id"
                label="ユーザーID"
                variant="standard"
                defaultValue={myprofile.user_id}
                sx={{ marginBottom: "10px", width: "70%" }}
                onChange={(event: any) => {
                  setUserId(event.target.value);
                  setIsChange(true);
                }}
              />
            ) : (
              <TextField
                error
                type="text"
                name="user_id"
                label="ユーザーID"
                variant="standard"
                defaultValue={myprofile.user_id}
                sx={{ marginBottom: "10px", width: "70%" }}
                onChange={(event: any) => {
                  setUserId(event.target.value);
                  setIsChange(true);
                }}
                helperText={errorOfUserId}
              />
            )}
            <TextField
              type="text"
              name="username"
              label="ユーザー名"
              variant="standard"
              defaultValue={myprofile.username}
              sx={{ marginBottom: "10px", width: "70%" }}
              onChange={(event: any) => {
                setUsername(event.target.value);
                setIsChange(true);
              }}
            />
            <TextField
              type="number"
              name="age"
              label="年齢"
              variant="standard"
              defaultValue={myprofile.age}
              sx={{ marginBottom: "20px", width: "70%" }}
              onChange={(event: any) => {
                setAge(event.target.value);
                setIsChange(true);
              }}
            />
            <Button
              onClick={onClickUpload}
              variant="contained"
              disabled={!isChange}
            >
              更新する
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
