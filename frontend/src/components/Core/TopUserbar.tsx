import { Box } from "@mui/material";
import { margin } from "@mui/system";

export const TopUserbar = () => {
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
        <h2>ホーム</h2>
      </Box>
    </Box>
  );
};
