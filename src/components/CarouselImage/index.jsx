import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import pongalImage from "../../assets/images/event17.webp";
import achievementImage from "../../assets/images/event20.webp";
import communityImage from "../../assets/images/event16.webp";
import communityRecognitionImage from "../../assets/images/event28.jpeg";
import volunteerRecognitionImage from "../../assets/images/event29.jpeg";
import schoolTeamImage from "../../assets/images/event26.jpeg";
import celebrationImage from "../../assets/images/event21.jpeg";
import schoolCommunityImage from "../../assets/images/event23.jpeg";
import soloSpeakerImage from "../../assets/images/event27.jpeg";
import littleOnesImage from "../../assets/images/event22.jpeg";
import teenLeadersImage from "../../assets/images/event24.jpeg";
import bigWelcomeImage from "../../assets/images/event25.jpeg";
import teacherTeamImage from "../../assets/images/event2.webp";
import allAgesImage from "../../assets/images/event3.webp";
import hostSpeakerImage from "../../assets/images/event1.webp";
import fullTeamImage from "../../assets/images/event001.webp";
import quizCompetitionImage from "../../assets/images/event5.webp";
import pongalPotImage from "../../assets/images/event6.webp";
import ceremonyImage from "../../assets/images/event7.webp";
import historySkitImage from "../../assets/images/event8.webp";
import independenceDayImage from "../../assets/images/event9.webp";

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
  {
    image: soloSpeakerImage,
    alt: "An Acton Tamil School student speaking on stage in front of a decorative shell banner",
    label: "Finding their voice",
    caption: "Every student gets a moment at the mic to share and shine.",
  },
  {
    image: littleOnesImage,
    alt: "Young Acton Tamil School students lined up on stage in colorful traditional outfits",
    label: "Little ones, big moments",
    caption: "Our youngest learners take their first steps onto the stage.",
  },
  {
    image: teenLeadersImage,
    alt: "Teen students and a teacher standing together on stage at an Acton Tamil School event",
    label: "Growing with the community",
    caption: "Older students step into leadership roles as they grow with us.",
  },
  {
    image: bigWelcomeImage,
    alt: "A large group of Acton Tamil School students and teachers gathered on stage for a welcome",
    label: "One big welcome",
    caption: "Every new school year begins with a stage full of familiar faces.",
  },
  {
    image: teacherTeamImage,
    alt: "Acton Tamil School volunteer teachers standing together on stage",
    label: "The people behind it all",
    caption: "Volunteer teachers give their time to keep Tamil learning alive.",
  },
  {
    image: allAgesImage,
    alt: "Acton Tamil School students of all ages standing together on stage with their teacher",
    label: "All ages, one school",
    caption: "From kindergarten to high school, our students share one stage.",
  },
  {
    image: hostSpeakerImage,
    alt: "A speaker addressing the audience on stage at an Acton Tamil School event",
    label: "Voices that guide us",
    caption: "Hosts and speakers help bring every gathering to life.",
  },
  {
    image: fullTeamImage,
    alt: "The full team of Acton Tamil School volunteer teachers on stage together",
    label: "A community of educators",
    caption: "Dozens of volunteers show up each week so Tamil keeps being taught.",
  },
  {
    image: quizCompetitionImage,
    alt: "Acton Tamil School students taking part in a stage debate or quiz competition",
    label: "Sharpening young minds",
    caption: "Friendly competitions build confidence in speaking Tamil.",
  },
  {
    image: pongalPotImage,
    alt: "Acton Tamil School students performing a Pongal skit around a traditional clay pot",
    label: "Traditions, retold",
    caption: "Students act out festival stories to keep traditions vivid and fun.",
  },
  {
    image: ceremonyImage,
    alt: "Acton Tamil School students and teachers with a decorative red rope during a stage ceremony",
    label: "Milestones worth marking",
    caption: "Small ceremonies celebrate the progress students make together.",
  },
  {
    image: historySkitImage,
    alt: "Acton Tamil School students performing a tribute to a historical figure on stage",
    label: "History comes alive",
    caption: "Skits and stories help children connect with Tamil and Indian heritage.",
  },
  {
    image: independenceDayImage,
    alt: "Acton Tamil School students celebrating Independence Day with the Indian flag on stage",
    label: "Honoring our roots",
    caption: "National and cultural holidays connect our students to their heritage.",
  },
];

const visibleSlideCount = 5;
const carouselSlides = [...slides, ...slides];
const secondsPerImage = 16;
// Full loop (one full, non-cloned set of slides) takes this long to drift past.
const loopDurationSeconds = slides.length * secondsPerImage;
// How many extra pixels the ribbon is shoved left per pixel of raw mouse
// movement — this is what gives the "swipe" feel rather than a subtle drift.
const swipePushMultiplier = 1.4;
// Per-event clamp so a cursor jump (e.g. re-entering the window elsewhere)
// can't shove the ribbon a huge distance in one frame.
const maxSwipePushPx = 90;

const CarouselImage = () => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [focusPaused, setFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isPaused = focusPaused || reducedMotion;

  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const isPausedRef = useRef(isPaused);
  const reducedMotionRef = useRef(reducedMotion);
  const pxPerSecondRef = useRef(0);
  const autoOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(null);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

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

  // Measure the ribbon so the base drift speed stays proportional to its
  // actual rendered size, then keep it in sync on resize.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    const updateMeasurements = () => {
      const halfWidth = track.scrollWidth / 2 || 0;
      pxPerSecondRef.current = halfWidth / loopDurationSeconds;
    };

    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, []);

  // Drive the ribbon's position directly via a rAF loop instead of a CSS
  // keyframe animation, so the constant left-drift and any mouse-driven
  // swipe pushes land on the same running offset every frame.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    let rafId;
    let lastTime = null;

    const step = (time) => {
      if (lastTime === null) {
        lastTime = time;
      }
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const halfWidth = track.scrollWidth / 2 || 1;

      if (!isPausedRef.current) {
        autoOffsetRef.current += pxPerSecondRef.current * dt;
      }

      if (autoOffsetRef.current >= halfWidth) {
        autoOffsetRef.current -= halfWidth;
      } else if (autoOffsetRef.current < 0) {
        autoOffsetRef.current += halfWidth;
      }

      track.style.transform = `translate3d(${-autoOffsetRef.current}px, 0, 0)`;
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // Pressing down starts a drag: while held, moving the mouse shoves the
  // ribbon further left by an amount proportional to how far the cursor
  // moved — like swiping/dragging a touch carousel.
  const handlePointerDown = useCallback((event) => {
    if (reducedMotionRef.current || event.button !== 0) {
      return;
    }
    // A plain mousedown on one of the slide buttons would otherwise focus
    // it, which flips focusPaused true via onFocusCapture below and (before
    // this fix) silently blocked the drag the instant it started.
    event.preventDefault();
    isDraggingRef.current = true;
    lastPointerXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event) => {
    if (!isDraggingRef.current || lastPointerXRef.current === null) {
      return;
    }

    const delta = Math.min(
      Math.abs(event.clientX - lastPointerXRef.current),
      maxSwipePushPx,
    );
    lastPointerXRef.current = event.clientX;

    // A drag is a deliberate user action — it should always move the
    // ribbon, even while auto-drift is paused (focus or user pause).
    // Only reduced-motion is respected here.
    if (reducedMotionRef.current) {
      return;
    }

    autoOffsetRef.current += delta * swipePushMultiplier;
  }, []);

  const endDrag = useCallback((event) => {
    isDraggingRef.current = false;
    lastPointerXRef.current = null;
    setIsDragging(false);
    try {
      event?.currentTarget?.releasePointerCapture?.(event.pointerId);
    } catch {
      // Pointer capture may already be released (e.g. after pointercancel).
    }
  }, []);

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
          <div
            className={`hero-image-wrap ${isDragging ? "is-dragging" : ""}`}
            ref={wrapRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
          >
            <div className="hero-slide-track" ref={trackRef}>
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
                      draggable="false"
                      onDragStart={(event) => event.preventDefault()}
                    />
                  </button>
                );
              })}
            </div>
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
