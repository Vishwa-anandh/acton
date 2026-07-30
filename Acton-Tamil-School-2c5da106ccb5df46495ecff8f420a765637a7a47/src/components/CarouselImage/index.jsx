import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pongalImage from "../../assets/images/event17.webp";
import achievementImage from "../../assets/images/event20.webp";
import communityImage from "../../assets/images/event16.webp";
import communityRecognitionImage from "../../assets/images/event28.jpeg";
import volunteerRecognitionImage from "../../assets/images/event29.jpeg";
import schoolTeamImage from "../../assets/images/event26.jpeg";
import celebrationImage from "../../assets/images/event21.jpeg";
import schoolCommunityImage from "../../assets/images/event23.jpeg";

const slides = [
  {
    image: pongalImage,
    alt: "Acton Tamil School students presenting a Pongal celebration on stage",
    label: "Culture in every moment",
    caption: "Students bring Pongal stories and traditions to life.",
  },
  {
    image: achievementImage,
    alt: "Acton Tamil School community members presenting an award on stage",
    label: "Every milestone matters",
    caption: "Learning is celebrated with families, teachers, and friends.",
  },
  {
    image: communityImage,
    alt: "Acton Tamil School teachers and families gathered on stage",
    label: "Powered by community",
    caption: "Volunteer educators create a place where every child belongs.",
  },
  {
    image: communityRecognitionImage,
    alt: "Acton Tamil School community members presenting recognition certificates on stage",
    label: "Community recognition",
    caption: "The people who strengthen our school are celebrated together.",
  },
  {
    image: volunteerRecognitionImage,
    alt: "An Acton Tamil School volunteer receiving recognition on stage",
    label: "Celebrating service",
    caption: "Volunteer leadership keeps Tamil learning vibrant in Acton.",
  },
  {
    image: schoolTeamImage,
    alt: "Acton Tamil School teachers and volunteers standing together on stage",
    label: "Teachers who care",
    caption: "Volunteer educators are recognized for the community they build.",
  },
  {
    image: celebrationImage,
    alt: "Acton Tamil School students taking part in a school celebration",
    label: "Joyful traditions",
    caption: "Celebrations help children experience Tamil culture together.",
  },
  {
    image: schoolCommunityImage,
    alt: "Young Acton Tamil School students standing on stage with two teachers",
    label: "Growing together",
    caption: "Children build confidence with encouragement from their teachers.",
  },
];

const visibleSlideCount = 5;
const carouselSlides = [...slides, ...slides];
const secondsPerImage = 16;

const CarouselImage = () => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [focusPaused, setFocusPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isPaused = focusPaused || userPaused || reducedMotion;

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updateMotionPreference = () =>
      setReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const contentInterval = window.setInterval(() => {
      setSelectedSlide((current) => (current + 1) % slides.length);
    }, secondsPerImage * 1000);

    return () => window.clearInterval(contentInterval);
  }, [isPaused]);

  const activeContent = slides[selectedSlide];

  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="tamil-kicker" lang="ta">
          தமிழோடு வளர்வோம்
        </p>
        <h1 id="hero-title">
          <span>Language.</span>
          <span>Culture.</span>
          <span>Belonging.</span>
        </h1>
        <p className="hero-intro">
          A joyful Sunday school where children grow through Tamil language,
          culture, and community.
        </p>
      </div>

      <div className="hero-visual">
        <div
          className="hero-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Acton Tamil School highlights"
          onFocusCapture={() => setFocusPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setFocusPaused(false);
            }
          }}
        >
          <div className="hero-image-wrap">
            <div
              className={`hero-slide-track ${isPaused ? "is-paused" : ""}`}
              style={{
                animationDuration: `${slides.length * secondsPerImage}s`,
              }}
            >
              {carouselSlides.map((slide, index) => {
                const logicalIndex = index % slides.length;
                const isClone = index >= slides.length;

                return (
                  <button
                    type="button"
                    className={`hero-slide ${
                      selectedSlide === logicalIndex ? "is-active" : ""
                    }`}
                    onClick={() => setSelectedSlide(logicalIndex)}
                    disabled={isClone}
                    aria-label={
                      isClone
                        ? undefined
                        : `Highlight image ${logicalIndex + 1}: ${slide.label}`
                    }
                    aria-pressed={
                      isClone
                        ? undefined
                        : selectedSlide === logicalIndex
                    }
                    aria-hidden={isClone ? "true" : undefined}
                    tabIndex={isClone ? -1 : 0}
                    key={`${slide.label}-${index}`}
                  >
                    <img
                      src={slide.image}
                      alt={isClone ? "" : slide.alt}
                      width="1000"
                      height="800"
                      loading={index < visibleSlideCount ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="hero-carousel-toggle"
              onClick={() => setUserPaused((paused) => !paused)}
              disabled={reducedMotion}
              aria-label={
                reducedMotion
                  ? "Moving image ribbon is disabled by reduced motion preference"
                  : userPaused
                    ? "Play moving image ribbon"
                    : "Pause moving image ribbon"
              }
              aria-pressed={userPaused}
            >
              <i
                className={`bi ${userPaused ? "bi-play-fill" : "bi-pause-fill"}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="hero-footer">
        <div className="hero-active-copy" aria-live="polite" aria-atomic="true">
          <span>{activeContent.label}</span>
          <p>{activeContent.caption}</p>
        </div>
        <div className="hero-actions">
          <a
            className="button button-primary"
            href="https://www.catamilacademy.org/cta/login.aspx?ReturnUrl=%2fcta"
            target="_blank"
            rel="noreferrer"
          >
            Enroll your child
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>
          <Link className="button button-secondary" to="/about">
            Discover our school
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CarouselImage;
