import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Header />
      <Home />
    </Container>
  );
};

export default App;
