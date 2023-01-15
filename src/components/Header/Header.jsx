import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const Header = () => {
  const user = false;

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
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
          <Button>Blog</Button>
        </Typography>
        {user ? (
          <>
            <Button color="error">Выйти</Button>
          </>
        ) : (
          <>
            <Button>Регистрация</Button>
            <Button>Войти</Button>
          </>
        )}
      </Toolbar>
      <Toolbar sx={{ borderBottom: 1, borderColor: "transparent" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Button size="small" startIcon={<BarChartIcon />}>
            Популярные
          </Button>
          <Button size="small" color="success" startIcon={<BookmarksIcon />}>
            Избранное
          </Button>
        </Typography>
      </Toolbar>
    </>
  );
};

export default Header;
