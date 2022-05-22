import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import {
  LeftAppbar,
  rightElementWidth,
} from "../../components/Core/LeftAppbar";
import { PostCard } from "../../components/Core/PostCard";
import { ProfileInfo } from "../../components/UserDetail/ProfileInfo";
import { SettingToggleBar } from "../../components/UserDetail/SettingToggleBar";
import {
  selectAllProfiles,
  selectMyprofile,
  startProfile,
} from "../auth/authSlice";
import { selectSettingToggleMyPost } from "../core/coreSlice";
import { selectLike, selectPosts } from "../post/postSlice";

const customStyle = {
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "white",
  display: "flex",
  alignItems: "stretch",
};

export const UserDetailPage = () => {
  const location = useLocation()
  const userDetailPath: string = window.location.pathname.slice(1);

  // reflesh userDetailPath on url changing
  useEffect(() => {
    const userDetailPath: string = window.location.pathname.slice(1);
  }, [location])

  // define redux state
  const dispatch: AppDispatch = useDispatch();
  const allPosts = useSelector(selectPosts);
  const allProfile = useSelector(selectAllProfiles);
  const allLikes = useSelector(selectLike);
  const myprofile = useSelector(selectMyprofile);
  const toggleMyPost = useSelector(selectSettingToggleMyPost);

  const selectedUser = allProfile.find(
    (prof) => prof.user_id === userDetailPath
  );

  const editProfile = () => {
    dispatch(startProfile());
  };

  const relatedPosts = allPosts.filter((post) => {
    return post.userPost === selectedUser?.userProfile;
  });

  const relatedLikes = allLikes.filter((like) => {
    return like.userLike === selectedUser?.userProfile;
  });

  const mediaRelatedPost = relatedPosts.filter((post) => {
    return post.post_image !== null;
  });

  const isMyPage: boolean = myprofile.user_id === userDetailPath;

  return (
    <div style={customStyle}>
      <LeftAppbar />
      <Box
        width={rightElementWidth}
        display="flex"
        sx={{ flexDirection: "column" }}
      >
        <ProfileInfo
          profileInfo={selectedUser}
          onClickEditProfile={isMyPage ? editProfile : null}
        />
        <Box className="all-my-posts">
          <SettingToggleBar />
          {/* showing postcard related tweet only */}
          {toggleMyPost === "tweet" && (
            <>
              {relatedPosts.map((post, idx) => (
                <PostCard post_id={post.id} key={idx} />
              ))}
            </>
          )}
          {/* showing postcard related media only */}
          {toggleMyPost === "media" && (
            <>
              {mediaRelatedPost.map((post, idx) => (
                <PostCard post_id={post.id} key={idx} />
              ))}
            </>
          )}
          {/* showing postcard related like only */}
          {toggleMyPost === "like" && (
            <>
              {relatedLikes.map((like, idx) => (
                <PostCard post_id={like.postLike} key={idx} />
              ))}
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};
