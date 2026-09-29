import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./index.scss";
import logo from "../../assets/images/logoweb.png";
import anniversaryLogo from "../../assets/images/anniversary-10th.png";

const LOGO_CYCLE = { normal: 4500, anniversary: 2500 };

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnniversary, setShowAnniversary] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  // Quietly cycles the header logo seal
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
        {/* Brand logo & School name */}
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

        {/* ----------------------------------------------------
            1. DESKTOP VIEW NAVIGATION
            ---------------------------------------------------- */}
        <nav
          id="desktop-navigation"
          className="primary-nav desktop-nav-view"
          aria-label="Desktop primary navigation"
        >
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            Our school
          </NavLink>
          <NavLink to="/events" className={navClass}>
            Community
          </NavLink>
          <Link to="/#faq" className="nav-item-link">
            FAQ
          </Link>
          <Link to="/#contact" className="nav-item-link">
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

        {/* Hamburger menu toggle button for Mobile */}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i
            className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}
            aria-hidden="true"
          />
        </button>

        {/* ----------------------------------------------------
            2. MOBILE VIEW NAVIGATION (SEPARATE MOBILE CODE)
            ---------------------------------------------------- */}
        <nav
          id="mobile-navigation-menu"
          className={`primary-nav mobile-nav-view ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-item ${isActive ? "is-active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-house-door" aria-hidden="true" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-item ${isActive ? "is-active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-info-circle" aria-hidden="true" />
            <span>Our school</span>
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) => `mobile-nav-item ${isActive ? "is-active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-calendar-event" aria-hidden="true" />
            <span>Community</span>
          </NavLink>

          <Link
            to="/#faq"
            className="mobile-nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-question-circle" aria-hidden="true" />
            <span>FAQ</span>
          </Link>

          <Link
            to="/#contact"
            className="mobile-nav-item"
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-envelope" aria-hidden="true" />
            <span>Contact</span>
          </Link>

          <a
            className="button button-primary mobile-nav-cta"
            href="https://www.catamilacademy.org/cta/login.aspx?ReturnUrl=%2fcta"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
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
