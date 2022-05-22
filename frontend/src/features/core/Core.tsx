import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import styles from "./Core.module.css";
import {
  LeftAppbar,
  rightElementWidth,
} from "../../components/Core/LeftAppbar";
import { PostCard } from "../../components/Core/PostCard";
import { selectPosts } from "../post/postSlice";
import { TopUserbar } from "../../components/Core/TopUserbar";
import { HomeNewPostForm } from "../../components/Core/HomeNewPostForm";
import { selectAllFollow, selectMyprofile } from "../auth/authSlice";
import { NoFollowing } from "../../components/Core/NoFollowing";

export const Core = () => {
  const allPosts = useSelector(selectPosts);
  const allFollows = useSelector(selectAllFollow);
  const myprofile = useSelector(selectMyprofile);

  const myFollowing = allFollows.filter((follow) => {
    return follow.userFollowing === myprofile.userProfile;
  });

  const myFollowingUser = myFollowing.map((follow) => follow.userFollower);

  // add post created me
  const showUsers = [...myFollowingUser, myprofile.userProfile];

  const myFollowingUsersPosts = allPosts.filter((post) => {
    return showUsers.includes(post.userPost);
  });

  console.log(myFollowingUsersPosts);

  return (
    <div className={styles.core_container}>
      <LeftAppbar />
      <Box width={rightElementWidth}>
        <TopUserbar />
        <Stack
          sx={{
            paddingTop: "50px",
            zIndex: "100",
            position: "relative",
            minHeight: "90vh",
          }}
        >
          <HomeNewPostForm />
          {myFollowingUsersPosts.length > 0 ? (
            <>
              {myFollowingUsersPosts.map((post, idx) => (
                <PostCard post_id={post.id} key={idx} />
              ))}
            </>
          ) : (
            <NoFollowing />
          )}
        </Stack>
      </Box>
    </div>
  );
};
