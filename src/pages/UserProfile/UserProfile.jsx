import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileUser } from "../../redux/slices/users/authActions";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import { Divider, Skeleton } from "@mui/material";
import {
  getCommentsOfPost,
  getCommentsOfUser,
  getPosts,
  uploadImage,
} from "../../redux/slices/posts/postsActions";

const theme = createTheme();

const UserProfile = () => {
  // достаем переменные из redux
  const {
    loading,
    userEmail,
    userName,
    userToken,
    userImg,
    error,
    successLogin,
  } = useSelector((state) => state.auth);
  // достаем переменные из redux
  const { posts, usersComments } = useSelector((state) => state.posts);

  // стейт комментариев, поскольку роута на бэкенде для получения всех комментов нет - сделаем через стейт
  const [comments, setComments] = React.useState(null);
  // стейт для аватарки
  const [imgUrl, setImgUrl] = React.useState(null);
  // стейт для контролируемого инпута с именем пользователя
  const [name, setName] = React.useState(userName ? userName : "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // выбор аватара пользователем
  const updateAvatar = async (e) => {
    e.preventDefault();
    // создаем специальный объект form Data для отправки на бэк
    const formData = new FormData();
    // достаем файл из ивента
    const file = e.target.files[0];
    // пихаем его в formData
    formData.append("image", file);
    // ждем загрузки на сервер и возвращаем новое имя файла (ссылку) для превью
    const data = await dispatch(uploadImage(formData));
    // достаем ссылку на превью
    const preview = data.payload.url;
    // ставим новую ссылку в state для моментального отображения аватара пользователя
    setImgUrl(preview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // отправляем на бэк объект со свойствами email и avatar и с соответствующими ключами
    dispatch(editProfileUser({ user_name: name, avatar: imgUrl }));
  };

  // обновляем поле пользователя при изменении
  React.useEffect(() => {
    if (successLogin && !loading && userName) {
      setName(userName);
      dispatch(getPosts());
      dispatch(getCommentsOfUser());
    }
  }, [loading, userName]);

  React.useEffect(() => {
    // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
    if (!userToken) {
      navigate("/");
    }
  }, [userEmail, userName, userToken]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={200} height={200} />
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={
                // если есть аватар, который загрузил только что пользователь - отображаем его
                // если пользователь ничего не выбрал - отображаем старый аватар
                imgUrl
                  ? `https://nice-pink-lapel.cyclic.app/${imgUrl}`
                  : `https://nice-pink-lapel.cyclic.app/${userImg}`
              }
              sx={{
                // m: 1,
                bgcolor: "secondary.main",
                width: "200px",
                height: "200px",
              }}
            />
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              maxWidth: "350px",
            }}
          >
            <Button
              variant="contained"
              component="label"
              fullWidth
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => updateAvatar(e)}
              />
              {loading ? "Сохранение..." : "Выбрать аватар"}
            </Button>
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="Ваше имя"
              name="user_name"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
            {/* Нам приходят разные ошибки с бэка - если объект - выводим каждое значение ошибки под соответствующим инпутом, а если строка - выводим ее внизу под кнопкой */}
          </Box>
          <Box>
            <Divider sx={{ marginBottom: "25px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "350px",
                marginBottom: "25px",
              }}
            >
              <Typography variant="h5" sx={{ marginRight: 2 }}>
                E-mail:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {userEmail}
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "25px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "350px",
                marginBottom: "25px",
              }}
            >
              <Typography variant="h5" sx={{ marginRight: 2 }}>
                Написано постов:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {posts
                  ? posts.filter((post) => post.author === userName).length
                  : 0}
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "25px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "350px",
                marginBottom: "25px",
              }}
            >
              <Typography variant="h5" sx={{ marginRight: 2 }}>
                Комментариев:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {usersComments
                  ? usersComments.filter(
                      (comment) => comment.author === userName
                    ).length
                  : 0}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserProfile;
