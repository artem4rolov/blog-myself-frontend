import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AddPost.scss";
import { Box, Button, Paper, Typography } from "@mui/material";

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

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(convertedContent);

  return (
    <>
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
        <Button variant="contained">Загрузить превью</Button>
      </Paper>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        Текст вашего поста:
      </Typography>
      <div className="App">
        <Editor
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
      <Button variant="contained">Добавить пост</Button>
    </>
  );
};

export default AddPost;
