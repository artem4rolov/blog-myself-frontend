import * as React from "react";
import { useNavigate } from "react-router-dom";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DOMPurify from "dompurify";

import { CssVarsProvider } from "@mui/joy/styles";
import getFormattedDate from "../../services/getFormattedDate";
import { Box, Button } from "@mui/joy";
import { deletePost } from "../../redux/slices/posts/postsActions";
import { useDispatch, useSelector } from "react-redux";

import default_post from "../../assets/img/default_post.svg";

// создаем правильную разметку будущего поста
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

const PostModel = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userEmail, userName, successLogin } = useSelector(
    (state) => state.auth
  );

  const handleDeletePost = (id) => {
    dispatch(deletePost({ postId: id }));
  };

  return (
    <CssVarsProvider>
      <Card variant="outlined">
        <CardOverflow>
          <AspectRatio
            ratio="2"
            sx={{
              cursor: "pointer",
            }}
          >
            {loading ? (
              <Skeleton variant="rounded" width={210} height={60} />
            ) : (
              <img
                src={
                  post.cover
                    ? `http://localhost:5000${post.cover}`
                    : default_post
                }
                loading="lazy"
                alt=""
                // открываем конкретный пост по id
                onClick={() => navigate(`/post/${post._id}`)}
              />
            )}
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "md", mt: 2, mb: 2 }}>
          {post.title}
        </Typography>
        <Box>
          {userName && successLogin && (
            <>
              <Button
                startDecorator={<BookmarksIcon />}
                color="success"
                size="sm"
                variant="soft"
                sx={{ mt: 0.5, mb: 2, mr: 1 }}
              >
                В избранное
              </Button>
              {userName === post.author && (
                <Button
                  startDecorator={<DeleteIcon />}
                  color="danger"
                  variant="plain"
                  // sx={{ ml: 2 }}
                  onClick={() => handleDeletePost(post._id)}
                >
                  Удалить
                </Button>
              )}
            </>
          )}
        </Box>
        <Divider />
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)",
            bgcolor: "background.level1",
          }}
        >
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
            startDecorator={<RemoveRedEyeIcon />}
          >
            {post.viewCount}
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
            startDecorator={<CalendarMonthIcon />}
          >
            {getFormattedDate(post.date)}
          </Typography>
        </CardOverflow>
      </Card>
    </CssVarsProvider>
  );
};

export default PostModel;
