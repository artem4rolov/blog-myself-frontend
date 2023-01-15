import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function Post() {
  const posts = [
    {
      title: "first",
      text: "first",
      image: "https://source.unsplash.com/random",
    },
    {
      title: "second",
      text: "second",
      image: "https://source.unsplash.com/random",
    },
    {
      title: "third",
      text: "third",
      image: "https://source.unsplash.com/random",
    },
    {
      title: "fourth",
      text: "fourth",
      image: "https://source.unsplash.com/random",
    },
    {
      title: "fifth",
      text: "fifth",
      image: "https://source.unsplash.com/random",
    },
  ];

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item key={post.title} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: "100%" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={post.image}
              title={post.title}
            />
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
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          ;
        </Grid>
      ))}
    </Grid>
  );
}
