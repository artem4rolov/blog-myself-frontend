import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import { CssVarsProvider } from "@mui/joy/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createCommentOfPost } from "../../redux/slices/posts/postsActions";

const AddComment = () => {
  // параметры шрифта при создании коммента
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);
  // текст в окне
  const [commentText, setCommentText] = React.useState("");

  const { loading, currentPost, comments, error } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();
  // берем id поста из state redux, страница которого сейчас открыта
  const id = currentPost._id;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (commentText === "" || commentText == null) {
      return;
    }
    // создаем пост, бэк ожидает от нас обязательное поле text, id нужен чтобы axios отправил id поста на бэк, в котором нужно создать коммент
    dispatch(createCommentOfPost({ id: id, text: commentText }));
    setCommentText("");
  };

  return (
    <CssVarsProvider>
      <FormControl onSubmit={handleSubmit} component="form">
        <Textarea
          placeholder="Создайте комментарий"
          value={commentText}
          onInput={(e) => setCommentText(e.target.value)}
          minRows={3}
          endDecorator={
            <Box
              sx={{
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
                sx={{ "--List-decorator-size": "24px" }}
              >
                {["200", "normal", "bold"].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight);
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>
                      {fontWeight === weight && <Check fontSize="sm" />}
                    </ListItemDecorator>
                    {weight === "200" ? "lighter" : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? "soft" : "plain"}
                color={italic ? "primary" : "neutral"}
                aria-pressed={italic}
                onClick={() => setItalic((bool) => !bool)}
              >
                <FormatItalic />
              </IconButton>
              <Button
                startDecorator={<SendIcon />}
                variant="plain"
                sx={{ ml: "auto" }}
                type="submit"
              >
                Отправить
              </Button>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight,
            fontStyle: italic ? "italic" : "initial",
          }}
        />
      </FormControl>
    </CssVarsProvider>
  );
};

export default AddComment;
