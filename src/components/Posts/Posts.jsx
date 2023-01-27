import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/slices/posts/postsActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Toolbar } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PostModel from "./PostModel";

const Post = () => {
  const { loading, posts, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const { userName, userEmail, successLogin } = useSelector(
    (state) => state.auth
  );

  // как только компонент готов - получаем посты с бэка (не зависит от авторизации)
  React.useEffect(() => {
    dispatch(getPosts());
  }, []);

  console.log(posts);

  return (
    <Container maxWidth="lg">
      {/* если пользователь вошел - показываем кнопки по сортировке */}
      {userEmail && successLogin ? (
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
        {posts
          ? posts.map((post) => (
              <Grid item key={post.title} xs={12} sm={6} md={4}>
                <PostModel
                  key={post._id}
                  post={post}
                  userEmail={userEmail}
                  successLogin={successLogin}
                />
              </Grid>
            ))
          : "Не удалось получить посты"}
      </Grid>
    </Container>
  );
};

export default Post;
