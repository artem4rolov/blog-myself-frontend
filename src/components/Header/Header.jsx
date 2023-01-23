import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../services/authService";
import { logout, setCredentials } from "../../redux/slices/users/auth";

const Header = () => {
  const { loading, userEmail, error, successLogin } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // автоматически аутентифицируем пользователя, если найден jwt токен в заголовке запроса
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // делаем повторный запрос каждые 15 минут
    pollingInterval: 90000,
  });

  React.useEffect(() => {
    // если есть данные о пользователе из заголовоков запроса - заносим эти данные в store Redux, чтобы не сбрасывать аутентификацию пользователя
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <>
      <Toolbar sx={{ borderBottom: 0, borderColor: "none" }}>
        {userEmail ? (
          <>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </>
        ) : null}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link to="/">
            <Button>Blog</Button>
          </Link>
        </Typography>
        {userEmail ? (
          <>
            <Link to="post/add-post">
              <Button>Создать пост</Button>
            </Link>
            <Link to="/login">
              <Button onClick={() => dispatch(logout())} color="error">
                Выйти
              </Button>
            </Link>
          </>
        ) : (
          <>
            <NavLink to="/register">
              <Button>Регистрация</Button>
            </NavLink>
            <NavLink to="/login">
              <Button>Войти</Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </>
  );
};

export default Header;
