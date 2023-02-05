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
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/posts/postsActions";

// создаем правильную разметку будущего поста
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

const AddPost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");

  const { loading, posts, error, refreshPosts } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const { userName, userEmail, successLogin } = useSelector(
    (state) => state.auth
  );

  const createCover = (e) => {
    e.preventDefault();
    setImg(e.target.files[0]);
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const handleCreate = () => {
    const formData = new FormData();
    // отправляем на бэк объект со свойствами email и password и с соответствующими ключами
    formData.append("cover", img);
    formData.append("title", title);
    formData.append("body", convertedContent);
    dispatch(createPost(formData));
    // console.log(formData);
  };

  console.log(convertedContent);
  console.log(title);

  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          minHeight: "400px",
          mb: 6,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${img})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src={img} alt={title} />}
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
        <Button
          variant="contained"
          component="label"
          // fullWidth
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => createCover(e)}
          />
          Загрузить обложку
        </Button>
      </Paper>
      <Input
        placeholder="Заголовок вашего поста"
        fullWidth
        sx={{ fontSize: "24px", marginBottom: "20px" }}
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
        variant="contained"
        sx={{ marginBottom: "20px", marginTop: "20px" }}
        onClick={() => handleCreate()}
      >
        Добавить пост
      </Button>
    </Container>
  );
};

export default AddPost;