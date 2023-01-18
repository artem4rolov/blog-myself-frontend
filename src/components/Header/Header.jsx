import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const user = false;

  return (
    <>
      <Toolbar sx={{ borderBottom: 0, borderColor: "none" }}>
        {user ? (
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
        {user ? (
          <>
            <Link to="post/add-post">
              <Button>Создать пост</Button>
            </Link>
            <Link to="/login">
              <Button color="error">Выйти</Button>
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
