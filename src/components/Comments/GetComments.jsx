import { Box, Container, Skeleton } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsOfPost } from "../../redux/slices/posts/postsActions";
import CommentModel from "./CommentModel";

const GetComments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, currentPost, comments, error, refreshComments } =
    useSelector((state) => state.posts);
  const { userEmail, userName } = useSelector((state) => state.auth);

  // обновляем компонент с комментариями, когда refreshComments изменится в state redux
  React.useEffect(() => {
    dispatch(getCommentsOfPost(id));
  }, [refreshComments, userName]);

  return (
    <>
      {/* Комменты пользователей */}
      {loading
        ? Array.from(new Array(3)).map((item, index) => (
            <Box key={index + Math.random()} sx={{ marginBottom: 3 }}>
              <Skeleton variant="rectangular" height={50} />
              <Skeleton width="60%" />
            </Box>
          ))
        : comments &&
          comments.map((comment) => (
            <CommentModel key={comment._id} comment={comment} />
          ))}
      {!comments && "Комментариев пока нет..."}
    </>
  );
};

export default GetComments;
