import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";

import img from "../../assets/img/image.png";
import { Container } from "@mui/material";

const FullPost = () => {
  const post = {
    title: "first",
    text: "# 🍕 React Pizza v2 (REMASTERED) 🍕Это обновлённый курс на 2022 год, одного из [самых популярных курсов](https://www.youtube.com/watch?v=bziVFvq8cLQ&list=PL0FGkDGJQjJFMRmP7wZ771m1Nx-m2_qXq) по ReactJS для начинающих.В данном курсе подробно раскрывается тема создания фронтенд части интернет-магазина пиццерии на всех нижеперечисленных технологиях. Я собрал все самые **топовые** и **актуальные** темы по фронтенду + React на 2022 год, которые тебе пригодятся для **трудоустройства** или же разработки приложений на заказ.Обновлённый курс идеально подойдёт как для начинающих разработчиков (junior), так и для pre-middle/middle.## 🔥 Ты научишься:- Разрабатывать полноценное фронтенд-приложение на ReactJS - Создавать компоненты, страницы, сортировку, поиск, пагинацию, фильтрацию, popup-окна и т.д. - Взаимодействовать с серверной частью, отправлять запросы на бэкенд.- Разрабатывать навигацию по странице без перезагрузки.- Создавать глобальное хранилище данных для всего приложения.- Писать строго типизированный код на TypeScript.- Работать с LocalStorage для хранения настроек сайта.- Lazy Loading (ленивую подгрузку) + debounce (оптимизацию для поиска пицц).- Оптимизировать перерисовки/ререндеры компонентов, code splitting (разделение кода на отдельные JS-файлы), что такое tree shaking и как сокращать импорты компонентов.- Делать адаптивную вёрстку.- Деплоить приложение в интернет- и т.д.# 🛠 Технологии:",
    image: img,
  };

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
        {<img style={{ display: "none" }} src={img} alt={post.text} />}
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
              >
                {post.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {post.title}
              </Typography>
              <Link variant="subtitle1" href="#">
                {post.title}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Container maxWidth="lg">
        <ReactMarkdown>{post.text}</ReactMarkdown>
      </Container>
    </>
  );
};

export default FullPost;
