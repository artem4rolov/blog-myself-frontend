import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Skeleton } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../services/authService";
import { logout, setCredentials } from "../../redux/slices/users/auth";
import default_avatar from "../../assets/img/default_avatar.svg";

const Header = () => {
  const { loading, userEmail, userImg, error, successLogin } = useSelector(
    (state) => state.auth
  );
  const { posts, refreshPosts, handleDeletePost, currentPost } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // автоматически аутентифицируем пользователя, если найден jwt токен в заголовке запроса
  const { data } = useGetUserDetailsQuery("userDetails", {
    // делаем повторный запрос каждые 15 минут
    pollingInterval: 90000,
  });

  React.useEffect(() => {
    // если есть данные о пользователе из заголовоков запроса - заносим эти данные в store Redux, чтобы не сбрасывать аутентификацию пользователя
    if (data) dispatch(setCredentials(data));
    console.log(data);
  }, [data, dispatch]);

  return (
    <>
      <Toolbar sx={{ borderBottom: 0, borderColor: "none" }}>
        {userEmail ? (
          <>
            {loading && !userImg ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={
                  userImg ? `http://localhost:5000${userImg}` : default_avatar
                }
                sx={{
                  cursor: "pointer",
                  backgroundSize: "contain",
                  backgroundPosition: "10",
                  marginRight: 1,
                }}
                onClick={() => navigate("/user-profile")}
              />
            )}
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
            <Button
              sx={{
                background: "black",
                color: "white",
                ":hover": { background: "gray" },
              }}
              size="small"
            >
              Blog
            </Button>
          </Link>
        </Typography>
        {userEmail ? (
          <>
            {!currentPost && (
              <Link to="post/add-post">
                <Button variant="outlined" size="small">
                  Создать пост
                </Button>
              </Link>
            )}
            <Link to="/login">
              <Button
                size="small"
                sx={{ marginLeft: 1 }}
                variant="contained"
                onClick={() => dispatch(logout())}
                color="error"
              >
                Выйти
              </Button>
            </Link>
          </>
        ) : (
          <>
            <NavLink to="/register">
              <Button variant="contained" size="small">
                Регистрация
              </Button>
            </NavLink>
            <NavLink to="/login">
              <Button sx={{ marginLeft: 1 }} variant="contained" size="small">
                Войти
              </Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </>
  );
};

export default Header;
