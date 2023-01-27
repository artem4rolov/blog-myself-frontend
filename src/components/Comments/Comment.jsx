import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import getFormattedDate from "../../services/getFormattedDate";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteCommentOfPost } from "../../redux/slices/posts/postsActions";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, userEmail } = useSelector((state) => state.auth);

  const handleDeleteComment = (commentId) => {
    // console.log(postId, id);
    dispatch(deleteCommentOfPost({ postId: id, id: commentId }));
  };

  return (
    <List
      sx={{
        marginTop: "20px",
        // width: "100%",
        // maxWidth: "100%",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          sx={{ display: "inline", wordBreak: "break-word" }}
          primary={
            <Button size="md" variant="soft" color="info">
              {comment.author.split("@")[0]}
            </Button>
          }
          secondary={
            <Typography component="span" variant="h5" color="text.primary">
              {comment.text}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ display: "inline", marginLeft: "60px" }}
            component="span"
            variant="body2"
            color="gray"
          >
            {getFormattedDate(comment.date)}
          </Typography>
          {userEmail === comment.author && (
            <Button
              startDecorator={<DeleteIcon />}
              color="danger"
              variant="plain"
              sx={{ ml: 2 }}
              onClick={() => handleDeleteComment(comment._id)}
            >
              Удалить
            </Button>
          )}
        </Box>
      </ListItem>
    </List>
  );
};

export default Comment;
