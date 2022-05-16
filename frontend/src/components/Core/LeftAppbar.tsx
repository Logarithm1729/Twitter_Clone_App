import { Avatar, Menu, MenuItem, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { endLogin, selectMyprofile, startProfile } from "../../features/auth/authSlice";
import React from "react";
import { defaultImage } from "../../types/auth_types";

const barWidth = { xs: "15%", sm: "15%", md: "10%" };

export const LeftAppbar = (props: any) => {
  const { AddIconFunc, PersonIconFunc } = props;
  const dispatch: AppDispatch = useDispatch();

  const myprofile = useSelector(selectMyprofile);

  const onClickLogout = () => {
    localStorage.clear()
    window.location.reload()
  };

  // Avatar
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width={barWidth} paddingY={3} paddingX={2} borderRight={1}>
      <Stack alignItems="center" height="90%" position="fixed" width={barWidth}>
        <Stack
          spacing={{ xs: 5, md: 7 }}
          height="100%"
          // alignItems="center"
        >
          <TwitterIcon
            sx={{ fontSize: "35px", marginBottom: "10px" }}
            color="primary"
          />
          <AddCircleIcon
            sx={{ fontSize: "35px", cursor: "pointer" }}
            color="primary"
            onClick={AddIconFunc}
          />
          <SearchIcon sx={{ fontSize: "35px" }} color="primary" />
          <PersonIcon
            sx={{ fontSize: "35px", cursor: "pointer" }}
            color="primary"
            onClick={PersonIconFunc}
          />
        </Stack>
        <Box>
          <Avatar
            src={myprofile.prof_image ? myprofile.prof_image : defaultImage}
            sx={{ border: "solid 1px #c5c5c5" }}
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={async () => {
                await dispatch(startProfile());
                await handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await onClickLogout()
                // await handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
};
