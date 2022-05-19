import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSearchText } from "../../features/core/coreSlice";

export const NoResult = () => {
  const searchText = useSelector(selectSearchText);
  return (
    <Box margin="auto">
      {searchText !== "" ? (
        <h2 style={{ fontWeight: "300" }}>
          {searchText}の検索結果はありませんでした
        </h2>
      ) : (
        <h2 style={{ fontWeight: "300" }}>
          アカウントとツイートを検索できます
        </h2>
      )}
    </Box>
  );
};
