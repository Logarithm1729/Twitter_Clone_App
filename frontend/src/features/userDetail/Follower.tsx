import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { LeftAppbar } from "../../components/Core/LeftAppbar";
import { ProfResultCard } from "../../components/Search/ProfResultCard";
import { FollowTopbar } from "../../components/UserDetail/FollowTopbar";
import { UserColumnCard } from "../../components/UserDetail/UsersColumnCard";
import { selectAllFollow, selectAllProfiles } from "../auth/authSlice";

const customStyle = {
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "white",
  display: "flex",
  alignItems: "stretch",
};

export const Follower = () => {
  const location = useLocation();
  const userDetailPath: string = window.location.pathname
    .slice(1)
    .replace("/follower/", "");

  // reflesh userDetailPath on url changing
  useEffect(() => {
    const userDetailPath: string = window.location.pathname
      .slice(1)
      .replace("/follower/", "");
  }, [location]);

  const allFollows = useSelector(selectAllFollow);
  const allProfiles = useSelector(selectAllProfiles);

  const relatedUser = allProfiles.find((prof) => {
    return prof.user_id === userDetailPath;
  });

  const thisUserFollower = allFollows.filter((follow) => {
    return follow.userFollower === relatedUser?.userProfile;
  });

  return (
    <div style={customStyle}>
      <LeftAppbar />
      <Box width="100%">
        {relatedUser?.username !== undefined && (
          <FollowTopbar
            username={relatedUser?.username}
            isFollower={true}
            isFollow={false}
          />
        )}
        <Box display="flex" sx={{ flexDirection: "column" }} mt="50px">
          {thisUserFollower.map((follow, idx) => (
            <UserColumnCard key={idx} relatedUserId={follow.userFollowing} />
          ))}
        </Box>
      </Box>
    </div>
  );
};
