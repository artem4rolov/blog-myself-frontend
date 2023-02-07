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
import default_avatar from "../../assets/img/default_avatar.svg";

import Modal from "../../components/Modal/Modal";
import { Divider, Skeleton } from "@mui/material";
import { uploadImage } from "../../redux/slices/posts/postsActions";
import { current } from "@reduxjs/toolkit";

const theme = createTheme();

const UserProfileById = () => {
  const navigate = useNavigate();

  // достаем переменные из redux
  const {
    loading,
    userEmail,
    userName,
    userToken,
    userImg,
    error,
    successLogin,
    currentUser,
  } = useSelector((state) => state.auth);
  // достаем переменные из redux
  const { posts, comments } = useSelector((state) => state.posts);

  React.useEffect(() => {
    // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

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
                currentUser
                  ? `http://localhost:5000${currentUser.avatar}`
                  : default_avatar
              }
              sx={{
                // m: 1,
                bgcolor: "secondary.main",
                width: "200px",
                height: "200px",
              }}
            />
          )}

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "350px",
                marginBottom: "25px",
                marginTop: "25px",
              }}
            >
              <Typography variant="h5" sx={{ marginRight: 2 }}>
                E-mail:
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {currentUser.email}
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
                  ? posts.filter(
                      (post) => post.author === currentUser.user_name
                    ).length
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
                {comments
                  ? comments.filter(
                      (comment) => comment.author === currentUser.user_name
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

export default UserProfileById;
