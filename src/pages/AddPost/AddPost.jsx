import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  updatePost,
  uploadImage,
} from "../../redux/slices/posts/postsActions";
import { useNavigate } from "react-router-dom";

// создаем правильную разметку будущего поста
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

const AddPost = () => {
  // стейт для тектового редактора
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  // стейт для обложки
  const [imgUrl, setImgUrl] = React.useState(null);
  // стейт для заголовка
  const [title, setTitle] = useState("");

  const { loading, error, newPost, currentPost } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, userEmail, successLogin } = useSelector(
    (state) => state.auth
  );

  const createCover = async (e) => {
    e.preventDefault();
    // создаем специальный объект form Data для отправки на бэк
    const formData = new FormData();
    // достаем файл из ивента
    const file = e.target.files[0];
    // пихаем его в formData
    formData.append("image", file);
    // ждем загрузки на сервер и возвращаем новое имя файла (ссылку) для превью
    const data = await dispatch(uploadImage(formData));
    // достаем ссылку на превью
    const preview = data.payload.url;
    // ставим новую ссылку в state для моментального отображения аватара пользователя
    setImgUrl(preview);
  };

  React.useEffect(() => {
    // редиректим, если пользователь уже вошел в систему (вдруг токен остался в localStorage)
    if (!successLogin && !userEmail) {
      navigate("/");
    }
  }, [successLogin, userEmail]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setImgUrl(currentPost.cover);
    }
  }, [currentPost]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() => {
    if (newPost && !loading) {
      navigate(`/post/${newPost._id}`);
    }
  }, [newPost, loading]);

  const handleCreate = () => {
    if (currentPost) {
      // обновляем пост
      dispatch(
        updatePost({
          id: currentPost._id,
          title,
          body: convertedContent,
          cover: imgUrl,
        })
      );
      return;
    }
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    dispatch(createPost({ title, body: convertedContent, cover: imgUrl }));

    // console.log(formData);
  };

  return (
    <Container maxWidth="lg">
      {loading ? (
        <Skeleton variant="rectangle" height={380} />
      ) : (
        <Paper
          sx={{
            borderRadius: "20px",
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            minHeight: "400px",
            mb: 6,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${
              // если есть изображение текущего поста (значит мы нажали на кнопку изменить пост), соответственно выводим изображение, которое хотим изменить
              imgUrl ? `http://localhost:5000${imgUrl}` : null
            })`,
          }}
        >
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none" }}
              src={
                // если есть изображение текущего поста (значит мы нажали на кнопку изменить пост), соответственно выводим изображение, которое хотим изменить
                imgUrl ? `http://localhost:5000${imgUrl}` : null
              }
              alt={title}
            />
          }
          <Box
            sx={{
              borderRadius: "20px",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) => createCover(e)}
            />
            {loading ? "Загрузка..." : "Загрузить обложку"}
          </Button>
        </Paper>
      )}
      <Input
        placeholder="Заголовок вашего поста"
        fullWidth
        sx={{ fontSize: "24px", marginBottom: "20px" }}
        // если есть текущий пост (значит мы нажали на редактирование поста), соответственно выводим данные поста, которые хотим изменить
        value={title}
        onInput={(e) => setTitle(e.target.value)}
      />

      <div className="App">
        <Editor
          placeholder="Текст вашего поста"
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ["inline", "blockType"],
          }}
        />
        {/* <div
          className="preview"
          dangerouslySetInnerHTML={createMarkup(convertedContent)}
        ></div> */}
      </div>
      <Button
        disabled={loading}
        variant="contained"
        sx={{ marginBottom: "20px", marginTop: "20px" }}
        onClick={() => handleCreate()}
      >
        {loading
          ? "Секунду..."
          : currentPost
          ? "Обновить пост"
          : "Добавить пост"}
      </Button>
    </Container>
  );
};

export default AddPost;
