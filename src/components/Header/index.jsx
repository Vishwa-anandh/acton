import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoweb.png";
import anniversaryLogo from "../../assets/images/anniversary-10th.png";

const LOGO_CYCLE = { normal: 4500, anniversary: 2500 };

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnniversary, setShowAnniversary] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  // Quietly cycles the header logo between the normal seal and the
  // anniversary emblem. Skipped for prefers-reduced-motion visitors,
  // who just see the normal logo.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    let timer;
    const tick = (showingAnniversary) => {
      setShowAnniversary(showingAnniversary);
      timer = setTimeout(
        () => tick(!showingAnniversary),
        showingAnniversary ? LOGO_CYCLE.anniversary : LOGO_CYCLE.normal
      );
    };
    timer = setTimeout(() => tick(true), LOGO_CYCLE.normal);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="header-brand-group">
        <Link to="/" className="brand" aria-label="Acton Tamil School home">
          <span
            className={`brand-logo brand-logo-wrap ${showAnniversary ? "is-anniversary" : ""}`}
          >
            <img src={logo} alt="" className="brand-logo-img brand-logo-default" />
            <img
              src={anniversaryLogo}
              alt=""
              className="brand-logo-img brand-logo-hover"
            />
          </span>
          <span className="brand-copy">
            <strong>Acton Tamil School</strong>
            <span lang="ta">ஆக்டன் தமிழ்ப் பள்ளி</span>
          </span>
        </Link>
        <Link className="anniversary-badge" to="/#anniversary" onClick={() => setMenuOpen(false)}>
          <span aria-hidden="true">✦</span> <span className="anniversary-prefix">Celebrating</span> 10 Years
          <i className="bi bi-arrow-down-right" aria-hidden="true" />
        </Link>
        </div>

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
