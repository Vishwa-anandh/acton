import Content from "../Content";
import "./index.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroSplash from "../components/IntroSplash";

function App() {
  return (
    <>
      <IntroSplash />
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
