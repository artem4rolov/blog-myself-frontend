import Container from "@mui/material/Container";
import Home from "./pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Registration from "../src/pages/Registration/Registration";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
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
