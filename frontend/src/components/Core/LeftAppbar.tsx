import { Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { borderLeftColor, Box } from "@mui/system";

const barWidth = { xs: "20%", sm: "15%", md: "10%" };

export const LeftAppbar = (props: any) => {
  const { AddIconFunc } = props;
  return (
    <Box width={barWidth} paddingY={3} paddingX={2} borderRight={1}>
      <Stack
        spacing={{ xs: 5, md: 10 }}
        height="100%"
        width={barWidth}
        alignItems="center"
        justifyContent="flex-start"
        position="fixed"
        // bgcolor="black"
      >
        <TwitterIcon
          sx={{ fontSize: "35px", marginBottom: "10px" }}
          color="primary"
        />
        <AddCircleIcon
          sx={{ fontSize: "35px", cursor: "pointer" }}
          color="primary"
          onClick={AddIconFunc}
        />
        <SearchIcon sx={{ fontSize: "35px" }} color="primary" />
      </Stack>
    </Box>
  );
};
