import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, FormControl, Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../app/store";
import {
  selectAllProfiles,
  selectMyprofile,
} from "../../features/auth/authSlice";
import {
  resetSearchResultPosts,
  resetSearchResultProfiles,
  editSearchText,
  setSearchResultPosts,
  setSearchResultProfiles,
} from "../../features/core/coreSlice";
import { selectPosts } from "../../features/post/postSlice";

export const TopSearchbar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const allProfiles = useSelector(selectAllProfiles);
  const allPosts = useSelector(selectPosts);
  const myprofile = useSelector(selectMyprofile);

  const onClickSearch = () => {
    dispatch(resetSearchResultPosts());
    dispatch(resetSearchResultProfiles());
    dispatch(editSearchText(searchText))

    const searchTextInstance = new RegExp(searchText);

    allProfiles.filter((prof) => {
      if (prof.id === myprofile.id) {
        // 自分のプロフィールは非表示
        return;
      }
      // (user_id === username)時の対策
      if (searchTextInstance.test(prof.user_id.toLowerCase())) {
        dispatch(setSearchResultProfiles(prof.id));
        return;
      } else if (searchTextInstance.test(prof.username.toLowerCase())) {
        dispatch(setSearchResultProfiles(prof.id));
        return;
      }
    });
    // (content === title)時の対策
    allPosts.filter((post) => {
      if (searchTextInstance.test(post.content.toLowerCase())) {
        dispatch(setSearchResultPosts(post.id));
        return;
      } else if (searchTextInstance.test(post.title.toLowerCase())) {
        dispatch(setSearchResultPosts(post.id));
        return;
      }
    });
  };

  return (
    <Box position="fixed" width="100%" height="50px" zIndex="200">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fffffff5",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <Box
          width={{ xs: "65%", sm: "70%" }}
          display="flex"
          sx={{ alignItems: "center" }}
        >
          <FormControl variant="outlined" fullWidth>
            <Input
              placeholder="キーワード検索"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={(e: any) => {
                setSearchText(String(e.target.value).toLowerCase())
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            size="small"
            onClick={onClickSearch}
            disabled={searchText === ""}
          >
            検索
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
