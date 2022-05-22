import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  asyncDeleteFollowing,
  asyncGetFollows,
  asyncPostFollowing,
  selectAllFollow,
  selectMyprofile,
} from "../../features/auth/authSlice";
import { defaultImage } from "../../types/auth_types";

interface PROPS_PROF_INFO {
  profileInfo:
    | {
        id: string;
        user_id: string;
        username: string;
        age: number;
        prof_image: string;
        userProfile: string;
      }
    | undefined;
  onClickEditProfile: any;
}

export const ProfileInfo = (props: PROPS_PROF_INFO) => {
  // onClickEditProfile === null >> my profile page now
  const { profileInfo, onClickEditProfile } = props;
  const [onFollowButton, setOnFollowButton] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const myprofile = useSelector(selectMyprofile);
  const allFollows = useSelector(selectAllFollow);

  const myFollowingUsersList = allFollows.filter((follow) => {
    return follow.userFollowing === myprofile.userProfile;
  });

  // if this list is empty, then this user is not followed.
  const pendingIamFollowingThisUser = myFollowingUsersList.filter((follow) => {
    return follow.userFollower === profileInfo?.userProfile;
  });

  const isFollowedThisUser: boolean = pendingIamFollowingThisUser.length > 0;

  const culcFollowing = () => {
    if (onClickEditProfile === null) {
      const followingList = allFollows.filter((follow) => {
        return follow.userFollowing === profileInfo?.userProfile;
      });
      return followingList.length;
    } else {
      const followingList = allFollows.filter((follow) => {
        return follow.userFollowing === myprofile.userProfile;
      });
      return followingList.length;
    }
  };

  const culcFollower = () => {
    if (onClickEditProfile === null) {
      const followerList = allFollows.filter((follow) => {
        return follow.userFollower === profileInfo?.userProfile;
      });
      return followerList.length;
    } else {
      const followerList = allFollows.filter((follow) => {
        return follow.userFollower === myprofile.userProfile;
      });
      return followerList.length;
    }
  };

  return (
    <Box
      className="account-information"
      px={2}
      py={3}
      sx={{ borderBottom: "solid 1px #c3c3c3" }}
    >
      <Box
        className="image-profEdit"
        mb={2}
        mx={2}
        display="flex"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <img
          src={profileInfo?.prof_image ? profileInfo.prof_image : defaultImage}
          alt="prof"
          width="100px"
          height="100px"
          style={{
            borderRadius: "50%",
            border: "solid 1px #c5c5c5",
            objectFit: "cover",
          }}
        />
        {onClickEditProfile !== null ? (
          <Button
            variant="outlined"
            sx={{ height: "30px", borderColor: "gray", borderRadius: "30px" }}
            onClick={onClickEditProfile}
          >
            <p style={{ fontWeight: "700", color: "black" }}>
              プロフィールを編集
            </p>
          </Button>
        ) : !isFollowedThisUser ? (
          <Button
            variant="outlined"
            sx={{ height: "30px", borderColor: "gray", borderRadius: "30px" }}
            onClick={() => {
              const followInfo = {
                userFollowing: myprofile.userProfile,
                userFollower: profileInfo?.userProfile,
              };
              dispatch(asyncPostFollowing(followInfo));
            }}
          >
            <p style={{ fontWeight: "700", color: "black" }}>フォローする</p>
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{
              height: "30px",
              borderColor: "gray",
              borderRadius: "30px",
            }}
            onClick={async () => {
              await dispatch(
                asyncDeleteFollowing(pendingIamFollowingThisUser[0].id)
              );
              await dispatch(asyncGetFollows());
            }}
            onMouseEnter={() => setOnFollowButton(true)}
            onMouseLeave={() => setOnFollowButton(false)}
          >
            {onFollowButton ? (
              <p style={{ fontWeight: "700", color: "red" }}>フォローを外す</p>
            ) : (
              <p style={{ fontWeight: "700", color: "black" }}>フォロー中</p>
            )}
          </Button>
        )}
      </Box>
      <Box
        className="user-id-name"
        display="flex"
        sx={{ flexDirection: "column" }}
        mb={2}
      >
        <h2>{profileInfo?.username}</h2>
        <h4 style={{ fontWeight: "500" }}>@{profileInfo?.user_id}</h4>
      </Box>
      <Box className="created-at"></Box>
      <Box className="following-follower" display="flex">
        <Box className="following" mr={2} display="flex" sx={{ alignItems: "center" }}>
          <p>フォロー中</p>
          <p>{culcFollowing()}</p>
        </Box>
        <Box className="follower"  display="flex" sx={{ alignItems: "center" }}>
          <p>フォロワー</p>
          <p>{culcFollower()}</p>
        </Box>
      </Box>
    </Box>
  );
};
