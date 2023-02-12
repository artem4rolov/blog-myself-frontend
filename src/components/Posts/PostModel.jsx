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
import {
  addFavorite,
  removeFavorite,
} from "../../redux/slices/users/authActions";
import { Skeleton } from "@mui/material";

// создаем правильную разметку будущего поста
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

const PostModel = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // достаем переменные из redux
  const {
    loading,
    userEmail,
    userName,
    successLogin,
    favoritePosts,
    userToken,
  } = useSelector((state) => state.auth);

  const { posts, error, refreshPosts } = useSelector((state) => state.posts);

  // удаляем пост
  const handleDeletePost = (id) => {
    // удаляем пост из БД
    dispatch(deletePost({ postId: id }));
    // удаляем пост из коллекции пользователя (если он там есть)
    dispatch(removeFavorite({ id }));
  };

  // добавляем или удаляем пост из избранной коллекции пользователя
  const handleFavoritePost = async (id) => {
    if (favoritePosts && favoritePosts.length > 0) {
      // ищем такой же id в массиве избранных постов пользователя
      const index = favoritePosts.indexOf(id);
      // если такой id уже есть - удаляем его из БД
      if (index !== -1) {
        await dispatch(removeFavorite({ id }));
        return;
      } else {
        // если такого id нет - добавляем его
        await dispatch(addFavorite({ id }));
        return;
      }
    }
    dispatch(addFavorite({ id }));
  };

  // меняем надпись кнопки избранного
  const handleChangeLabel = (id) => {
    // если jwt-токен устарел - выводим сообщение пользователю
    if (userToken && !userEmail && !userName) {
      setOpen(true);
      setVariant("error");
      setText("Сессия истекла, авторизуйтесь");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }

    // если с токеном все ок - продолжаем функционал избранного
    if (favoritePosts && favoritePosts.length > 0) {
      // если текущий id поста совпадает с id поста в избранном
      const index = favoritePosts.indexOf(id);
      if (index !== -1) {
        // даем надпись удаления из избранного
        return <>Удалить из избранного</>;
        // если же совпадений нет - даем надпись добавить в избранное
      } else return <>Добавить в избранное</>;
    }
    // если массив с избранным пуст - даем надпись добавить в избранное
    return <>Добавить в избранное</>;
  };

  // блокируем кнопку при добавлении в избранное
  const handleSetDisableButton = (id) => {
    if (favoritePosts && favoritePosts.length > 0) {
      // если текущий id поста совпадает с id поста в избранном
      const index = favoritePosts.indexOf(id);
      if (index !== -1 && loading) {
        // блокируем кнопку
        return true;
        // если же совпадений нет - разблокируем кнопку
      } else return false;
    }
    // по дефолту кнопка не заблокирована
    return false;
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
            <img
              src={
                post.cover ? `http://localhost:5000${post.cover}` : default_post
              }
              loading="lazy"
              alt=""
              // открываем конкретный пост по id
              onClick={() => navigate(`/post/${post._id}`)}
            />
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
                sx={{ mt: 0.5, mb: 2, mr: 0.5 }}
                onClick={() => handleFavoritePost(post._id)}
                disabled={handleSetDisableButton(post._id)}
              >
                {/* меняем надпись кнопки в зависимости от избранных постов */}
                {handleChangeLabel(post._id)}
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
