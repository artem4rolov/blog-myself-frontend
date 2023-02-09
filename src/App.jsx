import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Home from "./pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Registration from "../src/pages/Registration/Registration";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { textareaClasses } from "@mui/joy";

function CircularUnderLoad() {
  return <CircularProgress disableShrink />;
}

const App = () => {
  // достаем переменные из redux
  const {
    loading,
    userEmail,
    userName,
    error,
    successLogin,
    userToken,
    refreshUser,
  } = useSelector((state) => state.auth);

  const { currentPost, comments, newPost } = useSelector(
    (state) => state.posts
  );

  // для вывода пуш-сообщений
  const [open, setOpen] = React.useState(false);
  // для выбора цвета пуш-сообщения
  const [variant, setVariant] = React.useState("success");
  // для текста пуш-сообщения
  const [text, setText] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // пуш-уведомление об авторизации
  React.useEffect(() => {
    if (successLogin) {
      setOpen(true);
      setVariant("success");
      setText("Авторизация успешна");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [successLogin]);

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

  // пуш-уведомление об изменении профиля пользователя
  React.useEffect(() => {
    if (refreshUser) {
      setOpen(true);
      setVariant("success");
      setText("Изменения сохранены");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [refreshUser]);

  // пуш-уведомление о добавлении нового поста
  React.useEffect(() => {
    if (newPost) {
      setOpen(true);
      setVariant("success");
      setText("Пост добавлен");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [newPost]);

  // удаляем дефолтный спиннер при загрузке DOM
  React.useEffect(() => {
    const el = document.querySelector(".loader-container");
    if (el) {
      el.remove();
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={variant} variant="filled">
          {text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
