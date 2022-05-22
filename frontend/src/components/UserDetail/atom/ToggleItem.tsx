import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  likeToggleMyPost,
  mediaToggleMyPost,
  selectSettingToggleMyPost,
  tweetToggleMyPost,
} from "../../../features/core/coreSlice";

export const ToggleItem = (props: any) => {
  const { elementhName } = props;
  const dispatch: AppDispatch = useDispatch();
  const toggleMyPost = useSelector(selectSettingToggleMyPost);

  const toggleItem = () => {
    elementhName === "tweet" && dispatch(tweetToggleMyPost());
    elementhName === "media" && dispatch(mediaToggleMyPost());
    elementhName === "like" && dispatch(likeToggleMyPost());
  };

  const isSelected: boolean = toggleMyPost === elementhName;

  return (
    <Box width="33%" textAlign="center" sx={{backgroundColor: `${isSelected && "#b7fcff96"}`}}>
      <Button fullWidth onClick={toggleItem} sx={{color: `${isSelected && "#515151"}`, 'fontWeight': '600'}}>
        {props.children}
      </Button>
    </Box>
  );
};
