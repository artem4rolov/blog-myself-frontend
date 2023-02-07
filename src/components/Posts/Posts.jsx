import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/slices/posts/postsActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Skeleton, Toolbar } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PostModel from "./PostModel";

const Post = () => {
  const { loading, posts, error, refreshPosts } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const { userName, userEmail, successLogin } = useSelector(
    (state) => state.auth
  );

  // как только компонент готов - получаем посты с бэка (не зависит от авторизации)
  React.useEffect(() => {
    dispatch(getPosts());
  }, [refreshPosts]);

  return (
    <Container maxWidth="lg" sx={{ marginBottom: 4 }}>
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
        {loading
          ? Array.from(new Array(6)).map((item, index) => (
              <Grid item key={index + Math.random()} xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton />
                <Skeleton width="60%" />
              </Grid>
            ))
          : posts &&
            posts.map((post) => (
              <Grid item key={post.title + Math.random()} xs={12} sm={6} md={4}>
                <PostModel key={post._id} post={post} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default Post;
