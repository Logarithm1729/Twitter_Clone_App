import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

import { selectMyprofile } from "../../features/auth/authSlice";
import {
  asyncDeletePost,
  asyncGetAllPosts,
  endIsPosting,
  startIsPosting,
} from "../../features/post/postSlice";
import { AppDispatch } from "../../app/store";

interface PROPS_SETTING_BUTTON {
  post_id: string;
  userPost: string;
}

export default function PostSettingButton(props: PROPS_SETTING_BUTTON) {
  const { post_id, userPost } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Add
  const dispatch: AppDispatch = useDispatch();
  const myProfile = useSelector(selectMyprofile);
  const isAuthentication = () => {
    if (myProfile.userProfile === userPost) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isAuthentication() && (
          <Box>
            <span
              onClick={async () => {
                await dispatch(startIsPosting());
                const res = await dispatch(asyncDeletePost(post_id));
                if (asyncDeletePost.fulfilled.match(res)) {
                  await dispatch(asyncGetAllPosts());
                  await dispatch(endIsPosting());
                }
              }}
            >
              <MenuItem onClick={handleClose}>
                <Box
                  display="flex"
                  color="red"
                  sx={{ justifyContent: "center" }}
                >
                  削除
                  <DeleteIcon />
                </Box>
              </MenuItem>
            </span>
          </Box>
        )}
      </Menu>
    </div>
  );
}
