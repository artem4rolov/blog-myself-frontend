import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsOfPost } from "../../redux/slices/posts/postsActions";
import Comment from "./Comment";

const GetComments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, currentPost, comments, error, refreshComments } =
    useSelector((state) => state.posts);

  // обновляем компонент с комментариями, когда refreshComments изменится в state redux
  React.useEffect(() => {
    dispatch(getCommentsOfPost(id));
  }, [refreshComments]);

  return (
    <>
      {/* Комменты пользователей */}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default GetComments;
