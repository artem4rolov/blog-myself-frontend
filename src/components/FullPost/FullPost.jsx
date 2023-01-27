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
import GetComments from "../Comments/GetComments";
import AddComment from "../Comments/AddComment";

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
          }}
        >
          {/* Дата поста */}
          <Box>
            <Typography sx={{ color: "#9a9a9a", mb: 2 }}>
              {getFormattedDate(currentPost.date)}
            </Typography>
          </Box>

          {/* <Button size="md" variant="soft" color="info">
            {currentPost.author.split("@")[0]}
          </Button> */}

          <Box>
            <Typography sx={{ color: "#9a9a9a" }}>
              Просмотров: {currentPost.viewCount}
            </Typography>
          </Box>
        </Box>
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
            backgroundImage: `url(${img})`,
          }}
        >
          {<img style={{ display: "none" }} src={img} alt="post image" />}
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

        {/* Текст поста */}
        <Typography sx={{ marginBottom: "20px" }} variant="h5">
          {/* <ReactMarkdown>{currentPost.body}</ReactMarkdown> */}
          {currentPost.body}
        </Typography>

        {/* Оставить комментарий */}
        <AddComment />

        <GetComments />
      </Container>
    )
  );
};

export default FullPost;
