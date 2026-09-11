import { useEffect, useRef, useState } from "react";
import "animate.css/animate.min.css";
import anniversaryLogo from "../../assets/images/anniversary-10th.png";

const SESSION_KEY = "ats-intro-seen";
const CONFETTI_COLORS = ["#1c3766", "#eba92f", "#8f1538", "#c9497a"];
const BALLOON_COLORS = ["#1c3766", "#eba92f", "#8f1538", "#c9497a"];
const FLOATING_TAMIL_WORDS = ["தமிழ்", "பள்ளி", "வாழ்த்துக்கள்", "மகிழ்ச்சி", "பத்தாண்டு", "நன்றி"];
const BALLOON_COUNT = 10;
const FLOATING_WORD_COUNT = 8;
const AUTO_DISMISS_MS = 6000;
const FADE_OUT_MS = 500;

function createConfettiPiece(width) {
  return {
    x: Math.random() * width,
    y: -20 - Math.random() * 200,
    size: 6 + Math.random() * 8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 10,
    tilt: Math.random() * Math.PI,
  };
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Evenly slices the vertical space into `count` bands (with a small top/bottom
// margin) and jitters within each band, so items sharing a side never land in
// the same stretch of height and end up overlapping.
function assignTopSlots(count) {
  const margin = 6;
  const usable = 100 - margin * 2;
  const slotHeight = usable / count;
  const slots = Array.from(
    { length: count },
    (_, i) => margin + i * slotHeight + Math.random() * slotHeight * 0.5
  );
  return shuffle(slots);
}

function createBalloonsAndWords() {
  const leftBalloonCount = Math.ceil(BALLOON_COUNT / 2);
  const rightBalloonCount = BALLOON_COUNT - leftBalloonCount;
  const leftWordCount = Math.ceil(FLOATING_WORD_COUNT / 2);
  const rightWordCount = FLOATING_WORD_COUNT - leftWordCount;

  const leftSlots = assignTopSlots(leftBalloonCount + leftWordCount);
  const rightSlots = assignTopSlots(rightBalloonCount + rightWordCount);
  let nextLeft = 0;
  let nextRight = 0;

  const balloons = Array.from({ length: BALLOON_COUNT }, (_, index) => {
    const onLeft = index % 2 === 0;
    return {
      id: index,
      left: onLeft ? 2 + Math.random() * 13 : 85 + Math.random() * 13,
      top: onLeft ? leftSlots[nextLeft++] : rightSlots[nextRight++],
      color: BALLOON_COLORS[index % BALLOON_COLORS.length],
      delay: Math.random() * 1.2,
      duration: 5 + Math.random() * 2,
      drift: Math.round((Math.random() - 0.5) * 26),
      width: Math.round(55 + Math.random() * 80),
    };
  });

  const floatingWords = Array.from({ length: FLOATING_WORD_COUNT }, (_, index) => {
    const onLeft = index % 2 === 0;
    return {
      id: index,
      text: FLOATING_TAMIL_WORDS[index % FLOATING_TAMIL_WORDS.length],
      left: onLeft ? 2 + Math.random() * 13 : 85 + Math.random() * 13,
      top: onLeft ? leftSlots[nextLeft++] : rightSlots[nextRight++],
      delay: Math.random() * 1.8,
      duration: 5.5 + Math.random() * 2,
      drift: Math.round((Math.random() - 0.5) * 26),
      color: onLeft ? "#8f1538" : "#1c3766",
    };
  });

  return { balloons, floatingWords };
}

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [{ balloons, floatingWords }] = useState(createBalloonsAndWords);
  const canvasRef = useRef(null);
  const skipRef = useRef(null);
  const animationRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Private browsing / storage disabled: intro still plays this load,
      // just may repeat on the next one. Not worth blocking the intro for.
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleClose = () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setClosing(true);
      setTimeout(() => setVisible(false), FADE_OUT_MS);
    };

    closeTimerRef.current = setTimeout(handleClose, AUTO_DISMISS_MS);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    let cleanupCanvas = () => {};
    if (!prefersReducedMotion && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let pieces = [];

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      pieces = Array.from({ length: 90 }, () => createConfettiPiece(canvas.width));
      window.addEventListener("resize", resize);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach((piece) => {
          piece.y += piece.speedY;
          piece.x += piece.speedX + Math.sin(piece.tilt) * 0.5;
          piece.rotation += piece.spin;
          piece.tilt += 0.02;
          if (piece.y > canvas.height + 20) {
            piece.y = -20;
            piece.x = Math.random() * canvas.width;
          }
          ctx.save();
          ctx.translate(piece.x, piece.y);
          ctx.rotate((piece.rotation * Math.PI) / 180);
          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
          ctx.restore();
        });
        animationRef.current = requestAnimationFrame(draw);
      };
      draw();

      cleanupCanvas = () => {
        window.removeEventListener("resize", resize);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      cleanupCanvas();
    };
  }, [visible]);

  if (!visible) return null;

  const handleSkip = () => {
    setClosing(true);
    setTimeout(() => setVisible(false), FADE_OUT_MS);
  };

  return (
    <div
      className={`intro-splash ${closing ? "is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="10th anniversary celebration"
    >
      <canvas className="intro-splash-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="intro-splash-decor" aria-hidden="true">
        {balloons.map((balloon) => (
          <span
            key={`balloon-${balloon.id}`}
            className="intro-balloon"
            style={{
              left: `${balloon.left}%`,
              top: `${balloon.top}%`,
              width: `${balloon.width}px`,
              height: `${Math.round(balloon.width * 1.25)}px`,
              animationDelay: `${balloon.delay}s`,
              animationDuration: `${balloon.duration}s`,
              "--drift": `${balloon.drift}px`,
              "--balloon-color": balloon.color,
            }}
          />
        ))}
        {floatingWords.map((word) => (
          <span
            key={`word-${word.id}`}
            className="intro-floating-word"
            lang="ta"
            style={{
              left: `${word.left}%`,
              top: `${word.top}%`,
              color: word.color,
              animationDelay: `${word.delay}s`,
              animationDuration: `${word.duration}s`,
              "--drift": `${word.drift}px`,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
      <div className="intro-splash-content">
        <img
          src={anniversaryLogo}
          alt=""
          className="intro-splash-logo animate__animated animate__zoomIn"
        />
        <h1 className="intro-splash-heading animate__animated animate__fadeInDown animate__delay-1s">
          10 Years of Acton Tamil School
        </h1>
        <p className="intro-splash-tamil animate__animated animate__fadeIn animate__delay-1s" lang="ta">
          தமிழோடு வளர்ந்த பத்து ஆண்டுகள்
        </p>
        <button
          type="button"
          className="intro-splash-skip"
          ref={skipRef}
          onClick={handleSkip}
        >
          Skip <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
