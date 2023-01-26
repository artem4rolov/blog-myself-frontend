import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/users/authActions";

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
import { NavLink, useNavigate } from "react-router-dom";

import Modal from "../../components/Modal/Modal";

const theme = createTheme();

const Registration = () => {
  // стейт для модалки
  const [open, setOpen] = React.useState(false);
  // достаем переменные из redux
  const { loading, userEmail, error, successRegister } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    dispatch(
      registerUser({
        user_name: data.get("user_name"),
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };

  // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
  React.useEffect(() => {
    if (successRegister && !loading) {
      // navigate("/login");
      setOpen(true);

      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {open && !error.register ? (
            <Box
              sx={{
                marginTop: 25,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "24px",
              }}
            >
              <Typography
                sx={{ textAlign: "center" }}
                component="h2"
                variant="h5"
              >
                Регистрация успешна!
              </Typography>
              <NavLink to="/login">
                <Button sx={{ fontSize: "24px" }} size="lg">
                  Войти
                </Button>
              </NavLink>
            </Box>
          ) : (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Регистрация
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  <input hidden accept="image/*" multiple type="file" />
                  Добавить аватар
                </Button>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_name"
                  label="Ваше имя"
                  name="user_name"
                  autoFocus
                />
                {error.register && (
                  <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    align="center"
                    sx={{ color: "red" }}
                  >
                    {error.register ? error.register.user_name : null}
                  </Typography>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
                {error.register && (
                  <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    align="center"
                    sx={{ color: "red" }}
                  >
                    {error.register ? error.register.email : null}
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
                {error.register && (
                  <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    align="center"
                    sx={{ color: "red" }}
                  >
                    {error.register ? error.register.password : null}
                  </Typography>
                )}
                <Button
                  disabled={loading && !error.register}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>
                {/* Нам приходят разные ошибки с бэка - если объект - выводим каждое значение ошибки под соответствующим инпутом, а если строка - выводим ее внизу под кнопкой */}
                {typeof error.register === "string" ? (
                  <Typography
                    component="h5"
                    variant="h5"
                    color="inherit"
                    align="center"
                    sx={{ color: "red" }}
                  >
                    {error.register}
                  </Typography>
                ) : null}
                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Есть аккаунт? Войдите"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Registration;
