import * as React from "react";
import getFormattedDate from "../../services/getFormattedDate";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/joy/Typography";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";

import img from "../../assets/img/image.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostModel = ({ post, userEmail, successLogin }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: "20px",
        cursor: "pointer",
        ":hover": { boxShadow: "1px 4px 25px 7px rgba(46, 125, 185, 0.23)" },
      }}
      onClick={() => navigate(`/post/${post._id}`)}
    >
      <CardMedia sx={{ height: 140 }} image={img} />
      <CardContent>
        <Typography
          gutterBottom
          component="div"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          {post.title}
        </Typography>
        <Typography variant="h2">{post.body}</Typography>
      </CardContent>
      <CardActions>
        {userEmail && successLogin ? (
          <>
            <Button size="small" color="success" startIcon={<BookmarksIcon />}>
              В избранное
            </Button>
            {/* если автор поста не совпадает с текущим авторизованным пользователем - кнопка удаления недоступна */}
            {userEmail === post.author ? (
              <Button size="small" color="error" startIcon={<DeleteIcon />}>
                Удалить
              </Button>
            ) : null}
          </>
        ) : (
          <Button size="small">Подробнее</Button>
        )}
      </CardActions>

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#f0f0f0",
        }}
      >
        <Typography sx={{ color: "" }}>
          Автор: {post.author.split("@")[0]}
        </Typography>
        <Typography sx={{ color: "#9a9a9a" }}>
          Дата: {getFormattedDate(post.date)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostModel;
