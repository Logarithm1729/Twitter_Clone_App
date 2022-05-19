import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

import styles from "./Search.module.css";
import { AppDispatch } from "../../app/store";
import { startProfile } from "../auth/authSlice";
import { startOpenNewPost } from "../post/postSlice";
import { LeftAppbar } from "../../components/Core/LeftAppbar";
import { SearchResult } from "../../components/Search/SearchResult";
import { TopSearchbar } from "../../components/Search/TopSearchBar";
import { ToggleView } from "../../components/Search/ToggleView";

const tweetListWidth = { xs: "80%", sm: "85%", md: "90%" };

export const SearchPage = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={styles.search_container}>
      <LeftAppbar
        AddIconFunc={() => dispatch(startOpenNewPost())}
        PersonIconFunc={() => dispatch(startProfile())}
      />
      <Box width={tweetListWidth}>
        <TopSearchbar />
        <Box mt="50px" sx={{ position: "relative", zIndex: "100" }}>
          <Box ml={2} mb={1}>
            <ToggleView />
          </Box>
          <SearchResult />
        </Box>
      </Box>
    </div>
  );
};
