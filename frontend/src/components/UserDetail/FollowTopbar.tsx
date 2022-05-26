import { Box } from "@mui/material";

interface PROPS_FOLLOW_TOPBAR {
  username: string;
  isFollow: boolean | undefined;
  isFollower: boolean | undefined;
}

export const FollowTopbar = (props: PROPS_FOLLOW_TOPBAR) => {
  const { username, isFollow, isFollower } = props;
  return (
    <Box
      position="fixed"
      width="100%"
      height="50px"
      zIndex="200"
      borderBottom="solid 1px gray"
    >
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
        {isFollow && <h2>{username}さんのフォローリスト</h2>}
        {isFollower && <h2>{username}さんのフォロワー</h2>}
      </Box>
    </Box>
  );
};
