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
import { Divider } from "@mui/material";

const theme = createTheme();

const UserProfile = () => {
  const { loading, userEmail, userName, userToken, userImg, error } =
    useSelector((state) => state.auth);

  const { posts, comments } = useSelector((state) => state.posts);
  // стейт для модалки
  const [open, setOpen] = React.useState(false);
  // стейт для аватарки
  const [img, setImg] = React.useState(null);

  // const [name, setName] = React.useState(userName ? userName : "");
  // достаем переменные из redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateAvatar = (e) => {
    e.preventDefault();
    setImg(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    formData.append("avatar", img);
    // formData.append("user_name", name);
    dispatch(editProfileUser(formData));
  };

  // console.log(img);

  // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
  // React.useEffect(() => {
  //   if (successLogin && !loading && userName) {
  //     setName(userName);
  //   }
  // }, [loading, userName]);

  // React.useEffect(() => {
  //   // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
  //   if (!userEmail || !userName || !userToken) {
  //     navigate("/");
  //   }
  // }, [userEmail, userName, userToken]);

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
          <Avatar
            alt="Remy Sharp"
            src={userImg ? userImg : <LockOutlinedIcon />}
            sx={{
              // m: 1,
              bgcolor: "secondary.main",
              width: "200px",
              height: "200px",
            }}
          />

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
              sx={{ mt: 3, mb: 2 }}
            >
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => updateAvatar(e)}
              />
              Добавить аватар
            </Button>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="Ваше имя"
              name="user_name"
              placeholder={userName}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "350px",
                marginBottom: "25px",
              }}
            >
              <Typography variant="h5" sx={{ marginRight: 2 }}>
                Ваше имя:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {userName}
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
                {posts.filter((post) => post.author === userName).length}
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
                {
                  comments.filter((comment) => comment.author === userName)
                    .length
                }
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserProfile;
