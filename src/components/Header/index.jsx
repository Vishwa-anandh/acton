import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoweb.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navClass = ({ isActive }) =>
    `nav-item-link ${isActive ? "is-active" : ""}`;

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <Link to="/" className="brand" aria-label="Acton Tamil School home">
          <img src={logo} alt="" className="brand-logo" />
          <span className="brand-copy">
            <strong>Acton Tamil School</strong>
            <span lang="ta">ஆக்டன் தமிழ்ப் பள்ளி</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i
            className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}
            aria-hidden="true"
          />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <NavLink to="/" end className={navClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass} onClick={() => setMenuOpen(false)}>
            Our school
          </NavLink>
          <NavLink to="/events" className={navClass} onClick={() => setMenuOpen(false)}>
            Community
          </NavLink>
          <Link to="/#faq" className="nav-item-link" onClick={() => setMenuOpen(false)}>
            FAQ
          </Link>
          <Link to="/#contact" className="nav-item-link" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <a
            className="button button-small button-primary nav-cta"
            href="https://www.catamilacademy.org/cta/login.aspx?ReturnUrl=%2fcta"
            target="_blank"
            rel="noreferrer"
          >
            Enroll now
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
