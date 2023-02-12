import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/slices/posts/postsActions";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Container,
  Grid,
  Skeleton,
  Snackbar,
  Toolbar,
} from "@mui/material";
import Input from "@mui/joy/Input";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";

import PostModel from "./PostModel";
import { Box } from "@mui/system";

const Post = () => {
  const { loading, posts, error, refreshPosts, handleDeletePost } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const { userName, userEmail, successLogin, favoritePosts } = useSelector(
    (state) => state.auth
  );

  // для вывода пуш-сообщений
  const [open, setOpen] = React.useState(false);
  // для сортировки постов
  const [content, setContent] = React.useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // сортировка по просмотрам
  const handleSortPopular = async () => {
    const data = await dispatch(getPosts());
    const sortedContent = [...data.payload];
    sortedContent.sort((a, b) => {
      return b.viewCount - a.viewCount;
    });
    setContent(sortedContent);
  };

  // вывод избранных постов
  const handleGetFavorite = async () => {
    if (favoritePosts) {
      const data = await dispatch(getPosts());
      const sortedContent = [...data.payload];
      const favorite = [];
      favoritePosts.forEach((favPost) => {
        sortedContent.forEach((post) => {
          if (favPost === post._id) {
            favorite.push(post);
          }
        });
      });
      setContent(favorite);
    } else {
      return "Избранных постов нет";
    }
  };

  // сортировка по дате
  const handleSortByDate = async () => {
    const data = await dispatch(getPosts());
    const sortedContent = [...data.payload];
    sortedContent.sort((a, b) => {
      // console.log(aData, bData);
      return new Date(b.date) - new Date(a.date);
    });
    setContent(sortedContent);
  };

  // поиск поста по заголовку
  const handleSearchPostOnTitle = (e) => {
    async function getContent() {
      const data = await dispatch(getPosts());
      const allPosts = [...data.payload];
      const searchedPosts = [];
      if (allPosts) {
        allPosts.map((post) => {
          if (post.title.includes(e.target.value)) {
            searchedPosts.push(post);
          }
        });
        setContent(searchedPosts);
      }
    }
    getContent();
  };

  // как только компонент готов - получаем посты с бэка (не зависит от авторизации)

  React.useEffect(() => {
    async function getContent() {
      const data = await dispatch(getPosts());
      setContent([...data.payload]);
    }
    getContent();
  }, [refreshPosts]);

  React.useEffect(() => {
    if (handleDeletePost) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [handleDeletePost]);

  return (
    <Container maxWidth="lg" sx={{ marginBottom: 4 }}>
      {/* пуш уведомление об удалении поста */}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Пост удалён
        </Alert>
      </Snackbar>
      {/* если пользователь вошел - показываем кнопки по сортировке */}
      {userEmail && successLogin ? (
        <Box
          sx={{
            marginBottom: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Button
              size="large"
              startIcon={<BarChartIcon />}
              onClick={() => handleSortPopular()}
            >
              Популярные
            </Button>
            <Button
              size="large"
              startIcon={<CalendarMonthIcon />}
              onClick={() => handleSortByDate()}
            >
              По дате
            </Button>
            <Button
              size="large"
              color="success"
              startIcon={<BookmarksIcon />}
              onClick={() => {
                handleGetFavorite();
              }}
            >
              Избранное
            </Button>
          </Box>
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <SearchIcon sx={{ marginRight: 1 }} />
            <Input
              placeholder="Поиск по заголовкам постов..."
              sx={{ width: "100%" }}
              onInput={(e) => handleSearchPostOnTitle(e)}
            />
          </Box>
        </Box>
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
          : content
          ? content.map((post) => (
              <Grid item key={post.title + Math.random()} xs={12} sm={6} md={4}>
                <PostModel key={post._id} post={post} />
              </Grid>
            ))
          : posts
          ? posts.map((post) => (
              <Grid item key={post.title + Math.random()} xs={12} sm={6} md={4}>
                <PostModel key={post._id} post={post} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default Post;
