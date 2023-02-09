import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPostById,
  getCommentsOfPost,
  deletePost,
} from "../../redux/slices/posts/postsActions";
// UI
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  Alert,
  CircularProgress,
  Container,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { Button } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

// end UI
import img from "../../assets/img/image.png";
import getFormattedDate from "../../services/getFormattedDate";
import GetComments from "../../components/Comments/GetComments";
import AddComment from "../../components/Comments/AddComment";

import DOMPurify from "dompurify";

import default_post from "../../assets/img/default_post.svg";
import {
  addFavorite,
  getUser,
  removeFavorite,
} from "../../redux/slices/users/authActions";

// создаем правильную разметку будущего поста
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

const FullPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading,
    currentPost,
    comments,
    error,
    handleDeleteComment,
    newComment,
  } = useSelector((state) => state.posts);
  const {
    userEmail,
    userName,
    userImg,
    successLogin,
    userToken,
    favoritePosts,
  } = useSelector((state) => state.auth);

  const [loadUser, setLoadUser] = React.useState(false);

  // для вывода пуш-сообщений
  const [open, setOpen] = React.useState(false);
  // для текста пуш-сообщения
  const [text, setText] = React.useState("");
  // для выбора цвета пуш-сообщения
  const [variant, setVariant] = React.useState("success");

  // закрываем пуш по крестику
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // при монтировании компонента, забираем с бэка данные о посте и его комментариях
  React.useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getCommentsOfPost(id));
  }, []);

  // при удалении комментария выводится пуш
  React.useEffect(() => {
    if (handleDeleteComment) {
      setOpen(true);
      setVariant("success");
      setText("Комментарий удален");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [handleDeleteComment]);

  // при создании комментария выводится пуш
  React.useEffect(() => {
    if (newComment) {
      setOpen(true);
      setVariant("success");
      setText("Комментарий создан");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [newComment]);

  // пуш-уведомление об авторизации
  React.useEffect(() => {
    if (userToken && !userEmail && !userName) {
      setOpen(true);
      setVariant("error");
      setText("Сессия истекла, авторизуйтесь");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [successLogin]);

  // переход на страницу профиля пользователя (создателя поста)
  const getUserProfile = async (user_name) => {
    setLoadUser(true);
    // ждем получения данных с бэка
    const user = await dispatch(getUser(user_name));
    // если имя текущего пользователя в системе (если он авторизован) совпадает с именем автора поста, на который кликнул пользователь - открываем свой профиль
    setLoadUser(false);
    userName && user.payload[0].user_name === userName
      ? navigate("/user-profile")
      : navigate(`/user-profile/${user.payload[0].user_name}`);
  };

  // добавляем или удаляем пост из избранной коллекции пользователя
  const handleFavoritePost = async (id) => {
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
    await dispatch(addFavorite({ id }));
  };

  // меняем надпись кнопки избранного
  const handleChangeLabel = (id) => {
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

  // удаление поста
  const handleDeletePost = (id) => {
    dispatch(deletePost({ postId: id }));
    dispatch(removeFavorite({ id }));
    navigate("/");
  };

  return (
    currentPost && (
      <Container maxWidth="lg">
        {/* пуш-уведомления */}
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity={variant} variant="filled">
            {text}
          </Alert>
        </Snackbar>
        {/* скелетон при загрузке данных */}
        {loading ? (
          <Skeleton />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            {/* Дата поста */}
            <Box>
              <Typography sx={{ color: "#9a9a9a" }}>
                {getFormattedDate(currentPost.date)}
              </Typography>
            </Box>
            {/* Просмотры */}
            <Box>
              <Typography sx={{ color: "#9a9a9a" }}>
                Просмотров: {currentPost.viewCount}
              </Typography>
            </Box>
          </Box>
        )}
        {/* Обложка, на фоне - текст */}
        {loading ? (
          <Skeleton variant="rectangular" height={440} />
        ) : (
          <Paper
            sx={{
              position: "relative",
              backgroundColor: "grey.800",
              borderRadius: "20px",
              color: "#fff",
              minHeight: "400px",
              mb: 2,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${
                currentPost.cover
                  ? `http://localhost:5000${currentPost.cover}`
                  : default_post
              })`,
            }}
          >
            {
              <img
                style={{ display: "none" }}
                src={currentPost.cover ? currentPost.cover : default_post}
                alt="post image"
              />
            }
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,.3)",
                borderRadius: "20px",
              }}
            />
            <Grid container>
              <Grid item md={6}>
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 3, md: 6 },
                    pr: { md: 0 },
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      marginTop: "25%",
                    }}
                    // заголовок на фоне картинки
                  >
                    {currentPost.title}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Автор */}
          {loading ? (
            <Skeleton width="60%" />
          ) : (
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <Typography sx={{ marginRight: 1 }} variant="h5">
                Автор:
              </Typography>
              <Button
                size="md"
                variant="soft"
                color="info"
                onClick={() => getUserProfile(currentPost.author)}
              >
                {loadUser ? (
                  <CircularProgress color="secondary" />
                ) : (
                  currentPost.author
                )}
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {/* кнопка добавления в избранное */}
            <Button
              startDecorator={<BookmarksIcon />}
              color="success"
              size="md"
              variant="soft"
              onClick={() => handleFavoritePost(currentPost._id)}
            >
              {handleChangeLabel(currentPost._id)}
            </Button>

            {/* кнопка удаление поста */}
            {userName === currentPost.author && (
              <Button
                startDecorator={<DeleteIcon />}
                color="danger"
                size="md"
                variant="soft"
                sx={{ marginLeft: 1 }}
                onClick={() => handleDeletePost(currentPost._id)}
              >
                Удалить пост
              </Button>
            )}
          </Box>
        </Box>

        {/* Текст поста */}
        <Box sx={{ marginBottom: 2 }}>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(currentPost.body)}
          ></div>
        </Box>

        {/* Оставить комментарий */}
        <AddComment />

        {/* Комменты к посту */}
        <GetComments />
      </Container>
    )
  );
};

export default FullPost;
