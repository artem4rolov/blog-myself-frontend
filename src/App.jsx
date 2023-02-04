import * as React from "react";
import Container from "@mui/material/Container";
import Home from "./pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Registration from "../src/pages/Registration/Registration";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const App = () => {
  React.useEffect(() => {
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="inherit" />
    </Stack>;
    return () => {};
  }, []);

  return (
    <Container maxWidth="lg">
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Container>
  );
};

export default App;
