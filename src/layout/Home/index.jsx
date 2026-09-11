import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FAQ from "../../components/FAQ";
import Experience from "../../components/Experience";
import Offerings from "../../components/Offerings";
import ContactUs from "../../components/Contact";
import CarouselImage from "../../components/CarouselImage";
import Anniversary from "../../components/Anniversary";

const HomeLayout = () => {
  const location = useLocation();
  const faqRef = useRef(null);
  const anniversaryRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const target =
      location.hash === "#anniversary"
        ? anniversaryRef.current
        : location.pathname === "/faq" || location.hash === "#faq"
        ? faqRef.current
        : location.pathname === "/contact" || location.hash === "#contact"
          ? contactRef.current
          : null;

    if (target) {
      window.requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } else if (location.pathname === "/" && !location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  return (
    <main id="main-content" className="home-main">
      <CarouselImage />
      <div ref={anniversaryRef} className="anniversary-anchor"><Anniversary /></div>
      <Experience />
      <aside
        className="landing-notice section-shell"
        aria-label="Enrollment update"
      >
        <div className="landing-notice-copy">
          <span>2026–27 school year</span>
          <strong>Enrollment is now open</strong>
          <p>Classes begin September 13 · Sundays, 10:30 AM–12:00 PM</p>
        </div>
        <a
          className="button button-primary button-small"
          href="https://www.catamilacademy.org/cta/login.aspx?ReturnUrl=%2fcta"
          target="_blank"
          rel="noreferrer"
        >
          Register now
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </a>
      </aside>
      <Offerings />
      <section ref={faqRef} id="faq" className="section section-soft anchor-section">
        <FAQ />
      </section>
      <section ref={contactRef} id="contact" className="section anchor-section">
        <ContactUs />
      </section>
    </main>
  );
};

export default HomeLayout;
