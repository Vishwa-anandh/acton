import Content from "../Content";
import "./index.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
