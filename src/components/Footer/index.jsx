import { Link } from "react-router-dom";
import logo from "../../assets/images/logoweb.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div className="footer-intro">
          <Link to="/" className="brand brand-footer">
            <img src={logo} alt="" className="brand-logo" />
            <span className="brand-copy">
              <strong>Acton Tamil School</strong>
              <span lang="ta">ஆக்டன் தமிழ்ப் பள்ளி</span>
            </span>
          </Link>
          <p>
            Helping the next generation speak, read, and celebrate Tamil with
            confidence.
          </p>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <Link to="/about">Our school</Link>
          <Link to="/events">Community events</Link>
          <Link to="/#faq">Frequently asked questions</Link>
        </div>

        <div className="footer-column">
          <h2>Get in touch</h2>
          <a href="tel:+1-978-393-1772">+1 978-393-1772</a>
          <a href="mailto:actontamilschool@gmail.com">
            actontamilschool@gmail.com
          </a>
          <span>36 Charter Road, Acton, MA 01720</span>
        </div>

        <div className="footer-column">
          <h2>Follow our community</h2>
          <div className="social-links">
            <a
              href="https://www.facebook.com/ActonTamilSchool/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acton Tamil School on Facebook"
            >
              <i className="bi bi-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@actontamilschool8567"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acton Tamil School on YouTube"
            >
              <i className="bi bi-youtube" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© {new Date().getFullYear()} Acton Tamil School</span>
        <span>Language · Culture · Community</span>
      </div>
    </footer>
  );
};

export default Footer;
