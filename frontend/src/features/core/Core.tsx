import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./Core.module.css";
import { AppDispatch } from "../../app/store";
import { startOpenNewPost } from "../post/postSlice";
import { LeftAppbar } from "../../components/Core/LeftAppbar";
import { PostCard } from "../../components/Core/PostCard";
import { selectPosts } from "../post/postSlice";
import { startProfile } from "../auth/authSlice";
import { TopUserbar } from "../../components/Core/TopUserbar";
import { HomeNewPostForm } from "../../components/Core/HomeNewPostForm";

// const barWidth = { xs: "20%", sm: "15%", md: "10%" };
const tweetListWidth = { xs: "80%", sm: "85%", md: "90%" };

export const Core = () => {
  const allPosts = useSelector(selectPosts);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className={styles.core_container}>
      <LeftAppbar
        AddIconFunc={() => dispatch(startOpenNewPost())}
        PersonIconFunc={() => dispatch(startProfile())}
      />
      <Box width={tweetListWidth}>
        <TopUserbar />
        <Stack sx={{ paddingTop: "50px", zIndex: "100", position: "relative" }}>
          <HomeNewPostForm />
          {allPosts.map((post) => (
            <PostCard post_id={post.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};
