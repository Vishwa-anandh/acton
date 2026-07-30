import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const HomeLayout = lazy(() => import("../../layout/Home"));
const AboutLayout = lazy(() => import("../../layout/About"));
const EventsLayout = lazy(() => import("../../layout/Events"));

const Routers = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 480);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const usesSectionTarget =
      location.hash ||
      location.pathname === "/faq" ||
      location.pathname === "/contact";

    if (!usesSectionTarget) {
      window.requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "auto" }),
      );
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/faq" element={<HomeLayout />} />
          <Route path="/contact" element={<HomeLayout />} />
          <Route path="/about" element={<AboutLayout />} />
          <Route path="/events" element={<EventsLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <button
        type="button"
        className={`scroll-top ${showScrollTop ? "is-visible" : ""}`}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="bi bi-arrow-up" aria-hidden="true" />
      </button>
    </>
  );
};

export default Routers;
