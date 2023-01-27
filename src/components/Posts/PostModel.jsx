import * as React from "react";
import { useNavigate } from "react-router-dom";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { CssVarsProvider } from "@mui/joy/styles";
import getFormattedDate from "../../services/getFormattedDate";
import { Box, Button } from "@mui/joy";

const PostModel = ({ post, userEmail, successLogin }) => {
  const navigate = useNavigate();

  return (
    <CssVarsProvider>
      <Card
        variant="outlined"
        sx={{
          // width: "100%",
          cursor: "pointer",
          ":hover": {
            boxShadow: "1px solid black",
          },
        }}
        // открываем конкретный пост по id
        onClick={() => navigate(`/post/${post._id}`)}
      >
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
              srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
          {post.title}
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          {post.body.length < 30
            ? post.body
            : post.body.substring(0, 30) + "..."}
        </Typography>
        <Box>
          {userEmail && successLogin && (
            <>
              <Button
                startDecorator={<BookmarksIcon />}
                color="success"
                variant="plain"
                sx={{ mt: 0.5, mb: 2, mr: 1 }}
              >
                В избранное
              </Button>
              {userEmail === post.author && (
                <Button
                  startDecorator={<DeleteIcon />}
                  color="danger"
                  variant="plain"
                  // sx={{ ml: 2 }}
                  onClick={() => {}}
                >
                  Удалить
                </Button>
              )}
            </>
          )}
        </Box>
        <Divider />
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)",
            bgcolor: "background.level1",
          }}
        >
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
            startDecorator={<RemoveRedEyeIcon />}
          >
            {post.viewCount}
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
            startDecorator={<CalendarMonthIcon />}
          >
            {getFormattedDate(post.date)}
          </Typography>
        </CardOverflow>
      </Card>
    </CssVarsProvider>
  );
};

export default PostModel;
