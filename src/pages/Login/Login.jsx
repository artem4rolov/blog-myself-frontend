import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/slices/users/authActions";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ButtonRoot } from "@mui/joy/Button/Button";

const theme = createTheme();

const Login = () => {
  // достаем переменные из redux
  const { loading, userEmail, error, successLogin, userToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    dispatch(
      userLogin({ email: data.get("email"), password: data.get("password") })
    );
  };
  React.useEffect(() => {
    // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
    if (successLogin && error.login == null) {
      navigate("/");
    }
  }, [successLogin]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {error.login && (
              <Typography
                component="h5"
                variant="h5"
                color="inherit"
                align="center"
                sx={{ color: "red" }}
              >
                {error.login ? error.login.email : null}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error.login && (
              <Typography
                component="h5"
                variant="h5"
                color="inherit"
                align="center"
                sx={{ color: "red" }}
              >
                {error.login ? error.login.password : null}
              </Typography>
            )}
            <Button
              disabled={loading && !error.login}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Авторизация..." : "Вход"}
            </Button>
            {/* Нам приходят разные ошибки с бэка - если объект - выводим каждое значение ошибки под соответствующим инпутом, а если строка - выводим ее внизу под кнопкой */}
            {typeof error.login === "string" ? (
              <Typography
                component="h5"
                variant="h5"
                color="inherit"
                align="center"
                sx={{ color: "red" }}
              >
                {error.login}
              </Typography>
            ) : null}
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" align="center">
                  {"Нет аккаунта? Зарегистрируйтесь"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
