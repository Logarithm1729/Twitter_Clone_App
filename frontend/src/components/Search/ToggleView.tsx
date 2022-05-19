import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  accountSearchResultShow,
  selectSearchResultShow,
  tweetSearchResultShow,
} from "../../features/core/coreSlice";

export const ToggleView = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchResultShow = useSelector(selectSearchResultShow);

  return (
    <ToggleButtonGroup
      color="primary"
      value={searchResultShow}
      exclusive
    >
      <ToggleButton
        value="account"
        onClick={() => dispatch(accountSearchResultShow())}
      >
        アカウント
      </ToggleButton>
      <ToggleButton
        value="tweet"
        onClick={() => dispatch(tweetSearchResultShow())}
      >
        ツイート
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
