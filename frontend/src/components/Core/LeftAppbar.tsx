import React from "react";
import { Avatar, Menu, MenuItem, Stack, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TwitterIcon from "@mui/icons-material/Twitter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { AppDispatch } from "../../app/store";
import { selectMyprofile } from "../../features/auth/authSlice";
import { defaultImage } from "../../types/auth_types";
import { startOpenNewPost } from "../../features/post/postSlice";

const barWidth = { xs: "15%", sm: "15%", md: "20%", lg: "25%" };
export const rightElementWidth = { xs: "85%", sm: "85%", md: "80%", lg: "75%" };

const pStyle = {
  fontWeight: "600",
  color: "#353535",
  padding: "0 10px",
};

export const LeftAppbar = () => {
  const dispatch: AppDispatch = useDispatch();

  const myprofile = useSelector(selectMyprofile);

  const AddIconFunc = () => dispatch(startOpenNewPost());

  const onClickLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const isLgUp: boolean = useMediaQuery("(min-width:1200px)");

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
    <Box width={barWidth} paddingY={3} borderRight={1}>
      <Stack alignItems="center" height="90%" position="fixed" width={barWidth}>
        <Stack
          spacing={{ xs: 5, md: 7 }}
          height="100%"
          // alignItems="center"
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              sx={{
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <TwitterIcon sx={{ fontSize: "35px" }} color="primary" />
              {isLgUp && <p style={pStyle}>ホーム</p>}
            </Box>
          </Link>
          <Box
            display="flex"
            sx={{ alignItems: "center", cursor: "pointer" }}
            onClick={AddIconFunc}
          >
            <AddCircleIcon
              sx={{ fontSize: "35px", cursor: "pointer" }}
              color="primary"
            />
            {isLgUp && <p style={pStyle}>新しいツイート</p>}
          </Box>
          <Link to="/search/" style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              sx={{ alignItems: "center", cursor: "pointer" }}
            >
              <SearchIcon sx={{ fontSize: "35px" }} color="primary" />
              {isLgUp && <p style={pStyle}>検索</p>}
            </Box>
          </Link>
          <Link to={`/${myprofile.user_id}`} style={{ textDecoration: "none" }}>
            <Box
              display="flex"
              sx={{ alignItems: "center", cursor: "pointer" }}
            >
              <PersonIcon
                sx={{ fontSize: "35px", cursor: "pointer" }}
                color="primary"
              />
              {isLgUp && <p style={pStyle}>プロフィール</p>}
            </Box>
          </Link>
        </Stack>
        <Box sx={{ cursor: "pointer" }}>
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
            <MenuItem disabled>
              <Box
                display="flex"
                sx={{
                  alignItems: "flex-end",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "2px",
                    marginRight: '3px'
                  }}
                >
                  login...
                </p>
                <p>{myprofile.username}</p>
              </Box>
            </MenuItem>
            <MenuItem>
              <Link
                to={`/${myprofile.user_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Box display="flex" sx={{ alignItems: "center" }}>
                  <PersonIcon />
                  <p>アカウント</p>
                </Box>
              </Link>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await onClickLogout();
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <Box display="flex">
                  <LogoutIcon />
                  <p>ログアウト</p>
                </Box>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
};
