import { Box } from "@mui/system";

import { ToggleItem } from "./atom/ToggleItem";

export const SettingToggleBar = () => {
  return (
    <Box
      display="flex"
      width="100%"
      minHeight="50px"
      sx={{
        justifyContent: "space-around",
        alignItems: "center",
        borderBottom: "solid 1px #c3c3c3",
      }}
    >
      <ToggleItem elementhName='tweet'>ツイート</ToggleItem>
      <ToggleItem elementhName='media'>メディア</ToggleItem>
      <ToggleItem elementhName='like'>いいね</ToggleItem>
    </Box>
  );
};
