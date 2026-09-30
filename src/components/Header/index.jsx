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

  const navLinkClasses =
    "relative rounded-full px-3 py-2 text-ink-soft text-[0.88rem] font-[620] tracking-control no-underline transition-colors duration-[160ms] ease mw1024:min-h-[46px] mw1024:py-[13px] mw1024:px-[15px] mw560:min-h-[48px] mw560:p-[14px] hover:bg-[rgba(29,29,31,0.05)] hover:text-ink";
  const navClass = ({ isActive }) =>
    `${navLinkClasses} ${isActive ? "bg-[rgba(29,29,31,0.05)] !text-ink" : ""}`;

  const mobileNavItemClasses =
    "flex items-center gap-[10px] min-h-[46px] py-3 px-4 rounded-xl text-ink-soft text-[0.95rem] font-[620] no-underline transition-colors duration-[160ms] ease hover:bg-[rgba(29,29,31,0.06)] hover:text-ink";
  const mobileNavClass = ({ isActive }) =>
    `${mobileNavItemClasses} ${isActive ? "bg-[rgba(29,29,31,0.06)] !text-ink" : ""}`;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-[background-color,border-color,box-shadow] duration-[180ms] ease [backdrop-filter:saturate(180%)_blur(20px)] [-webkit-backdrop-filter:saturate(180%)_blur(20px)] ${
        scrolled
          ? "border-line bg-[rgba(255,253,249,0.92)] shadow-[0_8px_24px_rgba(61,43,31,0.05)]"
          : "border-transparent bg-[rgba(255,253,249,0.78)]"
      }`}
    >
      <div className="section-shell flex items-center justify-between min-h-[78px] mw560:min-h-[70px]">
        {/* Brand logo & School name */}
        <div className="flex items-center gap-[18px] py-[10px] min-w-0 [@media(max-width:480px)]:gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-[11px] text-ink no-underline hover:text-ink [@media(max-width:480px)]:gap-[6px]"
            aria-label="Acton Tamil School home"
          >
            <span
              className={`brand-logo-wrap w-[62px] h-[62px] object-contain mw560:w-[52px] mw560:h-[52px] [@media(max-width:480px)]:w-[46px] [@media(max-width:480px)]:h-[46px] ${showAnniversary ? "is-anniversary" : ""}`}
            >
              <img src={logo} alt="" className="brand-logo-img brand-logo-default" />
              <img
                src={anniversaryLogo}
                alt=""
                className="brand-logo-img brand-logo-hover"
              />
            </span>
            <span className="grid gap-px leading-[1.15]">
              <strong className="text-[0.98rem] font-[730] tracking-[-0.015em] mw560:text-[0.91rem] [@media(max-width:480px)]:text-[12px]">
                Acton Tamil School
              </strong>
              <span
                lang="ta"
                className="text-ink-soft text-[0.73rem] font-semibold mw560:text-[0.68rem] [@media(max-width:480px)]:text-[9px]"
              >
                ஆக்டன் தமிழ்ப் பள்ளி
              </span>
            </span>
          </Link>
          <Link
            className="inline-flex items-center gap-[6px] w-fit m-0 py-1 px-[10px] border border-[#dec27b] rounded-full bg-[#fff4d7] text-[#644b12] text-[10px] font-bold no-underline whitespace-nowrap min-h-[28px] hover:bg-[#f8e7b9] hover:text-[#172f65] [@media(max-width:480px)]:px-[7px] [@media(max-width:480px)]:gap-[3px] [@media(max-width:480px)]:text-[9px]"
            to="/#anniversary"
            onClick={() => setMenuOpen(false)}
          >
            <span aria-hidden="true">✦</span>{" "}
            <span className="[@media(max-width:480px)]:hidden">Celebrating</span> 10 Years
            <i
              className="bi bi-arrow-down-right [@media(max-width:480px)]:hidden"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* ----------------------------------------------------
            1. DESKTOP VIEW NAVIGATION
            ---------------------------------------------------- */}
        <nav
          id="desktop-navigation"
          className="flex items-center gap-[6px] mw1024:hidden"
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
          <Link to="/#faq" className={navLinkClasses}>
            FAQ
          </Link>
          <Link to="/#contact" className={navLinkClasses}>
            Contact
          </Link>
          <a
            className="button button-small button-primary ml-[7px]"
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
          className="hidden mw1024:inline-flex items-center justify-center w-[46px] h-[46px] p-0 border border-line rounded-full bg-white text-ink text-[1.35rem]"
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
          className={`hidden mw1024:absolute mw1024:top-[calc(100%+8px)] mw1024:right-[18px] mw1024:left-[18px] mw1024:flex-col mw1024:items-stretch mw1024:gap-1 mw1024:p-[14px] mw1024:border mw1024:border-line mw1024:rounded-[22px] mw1024:bg-[rgba(255,253,249,0.98)] mw1024:shadow-md mw560:right-[14px] mw560:left-[14px] mw560:max-h-[calc(100dvh-86px)] mw560:p-[10px] mw560:overflow-y-auto mw560:rounded-[18px] ${menuOpen ? "mw1024:flex" : ""}`}
          aria-label="Mobile navigation"
        >
          <NavLink to="/" end className={mobileNavClass} onClick={() => setMenuOpen(false)}>
            <i className="bi bi-house-door" aria-hidden="true" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/about"
            className={mobileNavClass}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-info-circle" aria-hidden="true" />
            <span>Our school</span>
          </NavLink>

          <NavLink
            to="/events"
            className={mobileNavClass}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-calendar-event" aria-hidden="true" />
            <span>Community</span>
          </NavLink>

          <Link
            to="/#faq"
            className={mobileNavItemClasses}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-question-circle" aria-hidden="true" />
            <span>FAQ</span>
          </Link>

          <Link
            to="/#contact"
            className={mobileNavItemClasses}
            onClick={() => setMenuOpen(false)}
          >
            <i className="bi bi-envelope" aria-hidden="true" />
            <span>Contact</span>
          </Link>

          <a
            className="button button-primary mt-2 justify-center w-full"
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
