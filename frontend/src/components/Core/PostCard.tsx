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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import { Formik } from "formik";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { selectAllProfiles } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import {
  asyncCommentCreate,
  asyncGetAllComments,
  asyncGetAllPosts,
  selectComments,
} from "../../features/post/postSlice";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface PROPS_POST {
  post_id: string;
  title: string | undefined;
  content: string | undefined;
  post_image: string | File | undefined;
  created_at: string;
  userPost: number | string;
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

  const prof = allProfiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  const getRelatedComment = allComments.filter((comment) => {
    return comment.postComment === post_id;
  })

  return (
    <Card sx={{ boxShadow: "none", borderRadius: "none" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title={prof[0].username}
        subheader={created_at}
      />
      {post_image && (
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>コメント欄</Typography>
          <Formik
            initialValues={{ comment: "", postComment: post_id }}
            onSubmit={async (values) => {
              const res = await dispatch(asyncCommentCreate(values));
              if (asyncCommentCreate.fulfilled.match(res)) {
                await dispatch(asyncGetAllPosts());
                await dispatch(asyncGetAllComments());
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
                      label="コメント"
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
          {getRelatedComment.map((com) => {
            return <Typography paragraph>{com.comment}</Typography>
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};
