import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPostById,
  getCommentsOfPost,
} from "../../redux/slices/posts/postsActions";
// UI
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Button } from "@mui/joy";
// end UI
import img from "../../assets/img/image.png";
import getFormattedDate from "../../services/getFormattedDate";
import GetComments from "../../components/Comments/GetComments";
import AddComment from "../../components/Comments/AddComment";

import DOMPurify from "dompurify";

import default_post from "../../assets/img/default_post.svg";

// создаем правильную разметку будущего поста
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

const FullPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, currentPost, comments, error } = useSelector(
    (state) => state.posts
  );

  React.useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getCommentsOfPost(id));
  }, []);

  return (
    currentPost && (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          {/* Дата поста */}
          <Box>
            <Typography sx={{ color: "#9a9a9a" }}>
              {getFormattedDate(currentPost.date)}
            </Typography>
          </Box>
          {/* Просмотры */}
          <Box>
            <Typography sx={{ color: "#9a9a9a" }}>
              Просмотров: {currentPost.viewCount}
            </Typography>
          </Box>
        </Box>
        {/* Обложка, на фоне - текст */}
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            minHeight: "400px",
            mb: 2,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${
              currentPost.cover ? currentPost.cover : default_post
            })`,
          }}
        >
          {
            <img
              style={{ display: "none" }}
              src={currentPost.cover ? currentPost.cover : default_post}
              alt="post image"
            />
          }
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: "25%",
                  }}
                  // заголовок на фоне картинки
                >
                  {currentPost.title}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Автор */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography sx={{ marginRight: 1 }} variant="h5">
            Автор:
          </Typography>
          <Button size="md" variant="soft" color="info">
            {currentPost.author}
          </Button>
        </Box>

        {/* Текст поста */}
        <Box sx={{ marginBottom: 2 }}>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(currentPost.body)}
          ></div>
        </Box>

        {/* Оставить комментарий */}
        <AddComment />

        {/* Комменты к посту */}
        <GetComments />
      </Container>
    )
  );
};

export default FullPost;
