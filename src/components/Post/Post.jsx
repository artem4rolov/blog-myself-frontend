import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Toolbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

import img from "../../assets/img/image.png";

const Post = () => {
  const user = false;

  const posts = [
    {
      title: "first",
      text: "first",
    },
    {
      title: "second",
      text: "second",
    },
    {
      title: "third",
      text: "third",
    },
    {
      title: "fourth",
      text: "fourth",
    },
    {
      title: "fifth",
      text: "fifth",
    },
  ];

  return (
    <>
      {/* если пользователь вошел - показываем кнопки по сортировке */}
      {user ? (
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: "transparent",
          }}
        >
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
      ) : null}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.title} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia sx={{ height: 140 }} image={img} title={post.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                {user ? (
                  <>
                    <Button
                      size="small"
                      color="success"
                      startIcon={<BookmarksIcon />}
                    >
                      В избранное
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Удалить
                    </Button>
                  </>
                ) : (
                  <Button size="small">Подробнее</Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Post;
