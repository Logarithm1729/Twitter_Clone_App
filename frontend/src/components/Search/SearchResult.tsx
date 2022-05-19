import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectSearchResultPosts,
  selectSearchResultProfiles,
  selectSearchResultShow,
} from "../../features/core/coreSlice";
import { PostCard } from "../Core/PostCard";
import { NoResult } from "./NoResult";
import { ProfResultCard } from "./ProfResultCard";

import styles from "./Search.module.css";

export const SearchResult = () => {
  const searchResultProfiles = useSelector(selectSearchResultProfiles);
  const searchResultPosts = useSelector(selectSearchResultPosts);
  const searchResultShow = useSelector(selectSearchResultShow);

  return (
    <Box
      display="flex"
      sx={{ flexDirection: "column", alignItems: "flex-start" }}
      width="100%"
      minHeight='80vh'
    >
      {searchResultShow === "account" && (
        <>
          {searchResultProfiles.length > 1 ? (
            <Box
              className="profilesResult"
              display="flex"
              width="100%"
              sx={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {searchResultProfiles.map((prof_id, idx) => (
                <ProfResultCard key={idx} prof_id={prof_id} />
              ))}
            </Box>
          ) : (
            <NoResult />
          )}
        </>
      )}
      {searchResultShow === "tweet" && (
        <>
          {searchResultPosts.length > 1 ? (
            <Box
              className="postsResult"
              display="flex"
              width="100%"
              sx={{ flexDirection: "column" }}
            >
              {searchResultPosts.map((post_id, idx) => (
                <PostCard post_id={post_id} key={idx} />
              ))}
            </Box>
          ) : (
            <NoResult />
          )}
        </>
      )}
    </Box>
  );
};
