import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import { Formik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";

import {
  selectAllProfiles,
  selectMyprofile,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import {
  asyncCommentCreate,
  asyncDeleteComment,
  asyncDeleteLike,
  asyncGetAllComments,
  asyncGetAllPosts,
  asyncGetLikes,
  asyncPushLike,
  endIsPosting,
  selectComments,
  selectLike,
  startIsPosting,
} from "../../features/post/postSlice";
import PostSettingButton from "./PostSettingButton";
import { defaultImage, PROFILE } from "../../types/auth_types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface PROPS_POST {
  post_id: string;
  title: string | undefined;
  content: string | undefined;
  post_image: string | undefined | null;
  created_at: string;
  userPost: string;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostCard = (props: PROPS_POST) => {
  const { post_id, title, content, post_image, created_at, userPost } = props;
  const dispatch: AppDispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const allProfiles = useSelector(selectAllProfiles);
  const allComments = useSelector(selectComments);
  const myprofile = useSelector(selectMyprofile);
  const likes = useSelector(selectLike);

  const prof = allProfiles.find((prof) => {
    return prof.userProfile === userPost;
  });

  const relatedComments = allComments.filter((comment) => {
    return comment.postComment === post_id;
  });

  const getCommentedUser = (userComment: string) => {
    return allProfiles.find((prof) => prof.userProfile === userComment);
  };

  const likesRelatedMe = likes.filter(
    (like) => like.userLike === myprofile.userProfile
  );

  const likesRelatedPostandMe = likesRelatedMe.filter(
    (like) => like.postLike === post_id
  );

  const isLiked = () => {
    if (likesRelatedPostandMe.length === 0) {
      return false;
    } else if (likesRelatedPostandMe.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const likesRelatedPost = likes.filter((like) => {
    return like.postLike === post_id;
  });

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "none",
        borderBottom: "solid #0000002b 1px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={prof?.prof_image ? prof.prof_image : defaultImage}
          ></Avatar>
        }
        action={<PostSettingButton post_id={post_id} userPost={userPost} />}
        title={prof !== undefined && prof.username}
        subheader={created_at}
      />
      <CardContent>
        <h6>タイトル</h6>
        <h4 style={{'paddingBottom': '20px'}}>{title}</h4>
        {post_image && (
          <img
            src={post_image}
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
              borderRadius: "20px",
              border: "solid 1px #c5c5c5",
            }}
          />
        )}
        <Typography variant="body2" color="text.secondary">
          <p style={{'fontSize': '18px', 'fontWeight': '500'}}>{content}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={async () => {
            await dispatch(startIsPosting());
            if (!isLiked()) {
              const res = await dispatch(
                asyncPushLike({
                  userLike: myprofile.userProfile,
                  postLike: post_id,
                })
              );
              if (asyncPushLike.fulfilled.match(res)) {
                await dispatch(asyncGetLikes());
                await dispatch(endIsPosting());
              }
            } else {
              const res = await dispatch(
                asyncDeleteLike(likesRelatedPostandMe[0].id)
              );
              if (asyncDeleteLike.fulfilled.match(res)) {
                await dispatch(asyncGetLikes());
                await dispatch(endIsPosting());
              }
            }
          }}
        >
          {isLiked() ? (
            <FavoriteIcon sx={{ color: "#ff7b9b" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
          {likesRelatedPost.length}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ChatIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            border: "solid #0000002b 1px",
            borderRadius: "20px",
            margin: "10px",
          }}
        >
          <Typography paragraph sx={{ fontSize: "20px", fontWeight: "600" }}>
            コメント欄
          </Typography>
          <Formik
            initialValues={{ comment: "", postComment: post_id }}
            onSubmit={async (values) => {
              const res = await dispatch(asyncCommentCreate(values));
              if (asyncCommentCreate.fulfilled.match(res)) {
                await dispatch(startIsPosting());
                await dispatch(asyncGetAllPosts());
                await dispatch(asyncGetAllComments());
                values.comment = "";
                await dispatch(endIsPosting());
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <Box>
                <form onSubmit={handleSubmit}>
                  <Stack direction="row">
                    <TextField
                      value={values.comment}
                      type="text"
                      name="comment"
                      onChange={handleChange}
                      label="返信をツイート"
                      onBlur={handleBlur}
                      size="small"
                      variant="outlined"
                      sx={{ width: "80%" }}
                    />
                    <Button type="submit">
                      <CreateIcon />
                    </Button>
                  </Stack>
                </form>
              </Box>
            )}
          </Formik>
          {relatedComments.map((com) => {
            return (
              <Box key={com.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 10px",
                  }}
                >
                  <Box display="flex">
                    <h5 style={{ marginRight: "10px" }}>
                      {getCommentedUser(com.userComment)?.username}さん:
                    </h5>
                    <p>{com.comment}</p>
                  </Box>
                  <Button
                    onClick={async () => {
                      await dispatch(asyncDeleteComment(com.id));
                      await dispatch(asyncGetAllComments());
                    }}
                  >
                    {com.userComment === myprofile.userProfile && (
                      <DeleteIcon />
                    )}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};
