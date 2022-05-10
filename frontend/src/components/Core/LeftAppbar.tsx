import { Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import { AppDispatch } from "../../app/store";

const barWidth = { xs: "20%", sm: "15%", md: "10%" };

export const LeftAppbar = (props: any) => {
  const { AddIconFunc, PersonIconFunc } = props;
  return (
    <Box width={barWidth} paddingY={3} paddingX={2} borderRight={1}>
      <Stack
        spacing={{ xs: 5, md: 7 }}
        height="100%"
        width={barWidth}
        alignItems="center"
        justifyContent="flex-start"
        position="fixed"
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
        <PersonIcon
          sx={{ fontSize: "35px", cursor: "pointer" }}
          color="primary"
          onClick={PersonIconFunc}
        />
      </Stack>
    </Box>
  );
};
