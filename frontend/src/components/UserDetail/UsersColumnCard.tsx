import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import {
  asyncDeleteFollowing,
  asyncGetFollows,
  asyncPostFollowing,
  selectAllFollow,
  selectAllProfiles,
  selectMyprofile,
} from "../../features/auth/authSlice";
import { defaultImage } from "../../types/auth_types";

interface PROPS_COLUMN_LIST {
  relatedUserId: string;
}

export const UserColumnCard = (props: PROPS_COLUMN_LIST) => {
  // if isFollow is false, follower page is true
  const { relatedUserId } = props;
  const [onFollowButton, setOnFollowButton] = useState(false);

  const allProfiles = useSelector(selectAllProfiles);
  const myprofile = useSelector(selectMyprofile);
  const allFollows = useSelector(selectAllFollow);
  const dispatch: AppDispatch = useDispatch();

  const showUser = allProfiles.find(
    (prof) => prof.userProfile === relatedUserId
  );

  const myFollowingFollowInstance = allFollows.filter((follow) => {
    return follow.userFollowing === myprofile.userProfile;
  });

  const checkArrayOfImFollowing = myFollowingFollowInstance.filter(
    (ins) => ins.userFollower === relatedUserId
  );

  const targetDeleteFollow = myFollowingFollowInstance.find(
    (follow) => follow.userFollower === relatedUserId
  );

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"space-between"}
      px={3}
      py={2}
      sx={{ borderBottom: "solid 1px #c5c5c5" }}
    >
      <Link
        to={`/${showUser?.user_id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box className="prof-info" display="flex">
          <img
            src={
              showUser?.prof_image === null
                ? defaultImage
                : showUser?.prof_image
            }
            alt="prof"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "solid 1px #c5c5c5",
            }}
          />
          <Box
            className="username-userid"
            display="flex"
            px={2}
            sx={{ flexDirection: "column", justifyContent: "center" }}
          >
            <h2>{showUser?.username}</h2>
            <h4 style={{ fontWeight: "500" }}>@{showUser?.user_id}</h4>
          </Box>
        </Box>
      </Link>
      {showUser?.userProfile !== myprofile.userProfile && (
        <Box className="follow-state">
          {checkArrayOfImFollowing.length > 0 ? (
            <Button
              variant="outlined"
              sx={{
                height: "30px",
                borderColor: "gray",
                borderRadius: "30px",
              }}
              onClick={async () => {
                targetDeleteFollow?.id !== undefined &&
                  (await dispatch(asyncDeleteFollowing(targetDeleteFollow.id)));
                await dispatch(asyncGetFollows());
              }}
              onMouseEnter={() => setOnFollowButton(true)}
              onMouseLeave={() => setOnFollowButton(false)}
            >
              {onFollowButton ? (
                <p style={{ fontWeight: "700", color: "red" }}>
                  フォローを外す
                </p>
              ) : (
                <p style={{ fontWeight: "700", color: "black" }}>フォロー中</p>
              )}
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{
                height: "30px",
                borderColor: "gray",
                borderRadius: "30px",
              }}
              onClick={() => {
                const followInfo = {
                  userFollowing: myprofile.userProfile,
                  userFollower: showUser?.userProfile,
                };
                dispatch(asyncPostFollowing(followInfo));
              }}
            >
              <p style={{ fontWeight: "700", color: "black" }}>フォローする</p>
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};
