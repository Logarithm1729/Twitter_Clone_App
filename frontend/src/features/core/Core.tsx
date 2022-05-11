import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Stack } from "@mui/material";

import { Auth } from "../auth/Auth";
import { Post } from "../post/Post";
import styles from "./Core.module.css";
import { AppDispatch } from "../../app/store";
import {
  asyncGetAllComments,
  asyncGetAllPosts,
  asyncGetLikes,
  startOpenNewPost,
} from "../post/postSlice";
import { LeftAppbar } from "../../components/Core/LeftAppbar";
import { PostCard } from "../../components/Core/PostCard";
import { selectPosts } from "../post/postSlice";
import { Box } from "@mui/system";
import {
  asyncGetAllProfiles,
  asyncGetMyProfile,
  endSignIn,
  startProfile,
  startSignIn,
} from "../auth/authSlice";
import { TopUserbar } from "../../components/Core/TopUserbar";
import { HomeNewPostForm } from "../../components/Core/HomeNewPostForm";
import { MyProfileModal } from "../../components/Auth/MyProfileModal";

// const barWidth = { xs: "20%", sm: "15%", md: "10%" };
const tweetListWidth = { xs: "80%", sm: "85%", md: "90%" };

export const Core = () => {
  const posts = useSelector(selectPosts);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT) {
        dispatch(endSignIn());
        const res = await dispatch(asyncGetMyProfile());
        if (asyncGetMyProfile.rejected.match(res)) {
          await dispatch(startSignIn());
          return null;
        }
        await dispatch(asyncGetAllProfiles());
        await dispatch(asyncGetAllPosts());
        await dispatch(asyncGetAllComments());
        await dispatch(asyncGetLikes());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div className={styles.core_container}>
      <Auth />
      <Post />
      <LeftAppbar
        AddIconFunc={() => dispatch(startOpenNewPost())}
        PersonIconFunc={() => dispatch(startProfile())}
      />
      <MyProfileModal />
      <Box width={tweetListWidth}>
        <TopUserbar />
        <Stack sx={{ paddingTop: "50px", zIndex: "100", position: "relative" }}>
          <HomeNewPostForm />
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard
                post_id={post.id}
                title={post.title}
                content={post.content}
                post_image={post.post_image}
                created_at={post.created_at}
                userPost={post.userPost}
              />
            </div>
          ))}
        </Stack>
      </Box>
    </div>
  );
};
