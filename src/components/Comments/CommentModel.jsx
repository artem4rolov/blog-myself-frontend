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
import { useNavigate, useParams } from "react-router-dom";
import { deleteCommentOfPost } from "../../redux/slices/posts/postsActions";
import { getUser } from "../../redux/slices/users/authActions";

const CommentModel = ({ comment }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, userEmail, userName } = useSelector((state) => state.auth);

  const handleDeleteComment = (commentId) => {
    // console.log(postId, id);
    dispatch(deleteCommentOfPost({ postId: id, id: commentId }));
  };

  // переход на страницу профиля пользователя (создателя поста)
  const getUserProfile = async (user_name) => {
    // ждем получения данных с бэка
    const user = await dispatch(getUser(user_name));
    // если имя текущего пользователя в системе (если он авторизован) совпадает с именем автора поста, на который кликнул пользователь - открываем свой профиль
    userName && user.payload[0].user_name === userName
      ? navigate("/user-profile")
      : navigate(`/user-profile/${user.payload[0].user_name}`);
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
          <Avatar
            alt="Remy Sharp"
            src={
              comment.userImg
                ? `http://localhost:5000${comment.userImg}`
                : "/static/images/avatar/1.jpg"
            }
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ display: "inline", wordBreak: "break-word" }}
          primary={
            <Button
              size="md"
              variant="soft"
              color="info"
              onClick={() => getUserProfile(comment.author)}
            >
              {comment.author}
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
          {userName === comment.author && (
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

export default CommentModel;
