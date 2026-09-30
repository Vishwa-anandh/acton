import { useEffect, useRef, useState } from "react";
import "./index.scss";
import zeroImg from "../../assets/images/intro/zero.webp";
import oneImg from "../../assets/images/intro/one.webp";
import wingsImg from "../../assets/images/intro/wings.webp";
import finalImg from "../../assets/images/intro/final.webp";

const SEEN_KEY = "ats_intro_seen";
// Two mirrored ribbons enter from the left and right edges and meet to form the ring.
const RIBBON_PATHS = [
  "M-700 620 C-300 620 240 720 240 500 A260 260 0 0 1 760 500",
  "M1700 380 C1300 380 760 280 760 500 A260 260 0 0 1 240 500",
];
const GOLD = ["#f8e08a", "#f0c95a", "#e8b84a", "#d4a537", "#fff2b8", "#c9982f"];
// Where the round seal sits inside the 1400px artwork (measured from the image).
const SEAL = { cx: 0.589, cy: 0.467, d: 0.6186 };
const LAND_MS = 625;
const CLEANUP_MS = 4500;

function shouldPlay() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

function preload(srcs) {
  return Promise.all(
    srcs.map((src) => {
      const img = new Image();
      img.src = src;
      return img.decode ? img.decode() : Promise.resolve();
    })
  );
}

function endIntro() {
  document.documentElement.classList.remove("ai-playing");
  window.dispatchEvent(new Event("ats:intro-end"));
}

function logoTarget() {
  const el = document.querySelector(".brand-logo-wrap");
  const r = el ? el.getBoundingClientRect() : null;
  if (r && r.width) return { x: r.left + r.width / 2, y: r.top + r.height / 2, size: r.width };
  return { x: 55, y: 41, size: 62 };
}

export default function Intro() {
  const [active] = useState(shouldPlay);
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    document.documentElement.classList.add("ai-playing");
    let cancelled = false;
    const bail = setTimeout(() => {
      if (!cancelled && !ready) {
        endIntro();
        setGone(true);
      }
    }, 6000);
    preload([zeroImg, oneImg, wingsImg, finalImg])
      .then(() => {
        if (cancelled) return;
        clearTimeout(bail);
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* private mode: just replay next visit */
        }
        setReady(true);
      })
      .catch(() => {
        clearTimeout(bail);
        endIntro();
        setGone(true);
      });
    return () => {
      cancelled = true;
      clearTimeout(bail);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (!ready) return undefined;
    document.documentElement.classList.add("ai-playing");
    const root = rootRef.current;
    const $ = (sel) => root.querySelector(sel);
    const inner = $(".ai-inner");
    const stage = $(".ai-stage");
    const fin = $(".ai-final");
    const shine = $(".ai-shine");
    const cv = $(".ai-cf");
    const cc = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const timers = [];
    let particles = [];
    let raf = 0;
    let celebrated = false;
    let done = false;

    shine.style.webkitMaskImage = shine.style.maskImage = `url(${finalImg})`;

    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const fit = () => {
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
    };
    fit();
    window.addEventListener("resize", fit);

    const burst = (x, y, n, sp) => {
      for (let i = 0; i < n; i++) {
        const s = document.createElement("i");
        s.className = "ai-sp";
        const a = Math.random() * 6.28;
        const d = sp * (0.4 + Math.random());
        s.style.cssText = `left:${x}%;top:${y}%;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;animation-delay:${Math.random() * 0.125}s`;
        inner.appendChild(s);
        timers.push(setTimeout(() => s.remove(), 800));
      }
    };

    const tick = () => {
      cc.clearRect(0, 0, cv.width, cv.height);
      particles = particles.filter((p) => {
        for (let step = 0; step < 2; step++) {
          p.vy += 0.32 * dpr;
          p.vx *= 0.992;
          p.vy *= 0.992;
          p.x += p.vx;
          p.y += p.vy;
          p.r += p.vr;
          p.t += 0.18;
        }
        if (p.y > cv.height + 60) return false;
        cc.save();
        cc.translate(p.x, p.y);
        cc.rotate(p.r);
        cc.scale(1, Math.cos(p.t));
        cc.fillStyle = p.c;
        cc.globalAlpha = 0.95;
        cc.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        cc.restore();
        return true;
      });
      raf = particles.length ? requestAnimationFrame(tick) : 0;
    };

    const fire = (x, y, n, ang, spread, pw) => {
      for (let i = 0; i < n; i++) {
        const a = ang + (Math.random() - 0.5) * spread;
        const v = pw * (0.45 + Math.random() * 0.75);
        particles.push({
          x: x * dpr,
          y: y * dpr,
          vx: Math.cos(a) * v * dpr,
          vy: Math.sin(a) * v * dpr,
          w: (6 + Math.random() * 7) * dpr,
          h: (10 + Math.random() * 10) * dpr,
          r: Math.random() * 6.28,
          vr: (Math.random() - 0.5) * 0.4,
          t: Math.random() * 6.28,
          c: GOLD[(Math.random() * GOLD.length) | 0],
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const celebrate = () => {
      if (celebrated) return;
      celebrated = true;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const pw = Math.max(14, H * 0.028);
      fire(W * 0.04, H, 110, -Math.PI / 3, 0.55, pw);
      fire(W * 0.96, H, 110, (-2 * Math.PI) / 3, 0.55, pw);
      timers.push(setTimeout(() => fire(W * 0.5, H, 120, -Math.PI / 2, 1.1, pw * 1.1), 225));
      timers.push(
        setTimeout(() => {
          fire(W * 0.15, H, 80, -1.25, 0.6, pw);
          fire(W * 0.85, H, 80, -1.9, 0.6, pw);
        }, 475)
      );
      for (let k = 0; k < 14; k++) {
        timers.push(
          setTimeout(() => {
            for (let i = 0; i < 8; i++) fire(Math.random() * W, -20, 1, Math.PI / 2, 0.5, pw * 0.12);
          }, 300 + k * 75)
        );
      }
    };

    const finish = () => {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      timers.length = 0;
      celebrate();
      $(".ai-pan").style.animation = "none";
      inner.style.animation = "none";
      $(".ai-rib").style.display = "none";
      inner
        .querySelectorAll("img:not(.ai-final),.ai-glow,.ai-sp")
        .forEach((e) => (e.style.display = "none"));
      fin.style.animation = "none";
      fin.style.opacity = 1;
      shine.style.display = "none";
      $(".ai-skip").style.display = "none";

      // Fly the seal onto the real header logo (scale + translate about the stage centre).
      const S = stage.getBoundingClientRect().width;
      const t = logoTarget();
      const k = t.size / (SEAL.d * S);
      const dx = t.x - window.innerWidth / 2 - (SEAL.cx - 0.5) * S * k;
      const dy = t.y - window.innerHeight / 2 - (SEAL.cy - 0.5) * S * k;
      stage.classList.add("out");
      stage.style.transform = `translate(-50%,-50%) translate(${dx}px,${dy}px) scale(${k})`;
      $(".ai-overlay").classList.add("done");
      root.classList.add("ai-done");

      at(LAND_MS, () => {
        endIntro();
        stage.classList.add("gone");
      });
      at(CLEANUP_MS, () => setGone(true));
    };

    at(1200, () => burst(59, 46, 18, 170));
    at(2175, () => burst(30, 78, 12, 90));
    at(2500, () => burst(50, 50, 24, 230));
    at(2800, celebrate);
    at(4600, finish);

    const skipBtn = $(".ai-skip");
    skipBtn.addEventListener("click", finish);
    const onKey = (e) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("keydown", onKey);
      skipBtn.removeEventListener("click", finish);
      document.documentElement.classList.remove("ai-playing");
    };
  }, [ready]);

  if (!active || gone) return null;

  return (
    <div className="ai-root" ref={rootRef}>
      <div className="ai-overlay" />
      {ready && (
        <>
          <svg className="ai-rib" viewBox="0 0 1000 1000" aria-hidden="true">
            <defs>
              <linearGradient id="ai-gg" gradientUnits="userSpaceOnUse" x1="240" y1="240" x2="760" y2="760">
                <stop offset="0" stopColor="#b8862b" />
                <stop offset=".5" stopColor="#f1cf6e" />
                <stop offset="1" stopColor="#a97a1f" />
              </linearGradient>
              <filter id="ai-gl" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              {RIBBON_PATHS.map((d) => (
                <g key={d}>
                  <path
                    className="ln"
                    pathLength="1"
                    filter="url(#ai-gl)"
                    stroke="url(#ai-gg)"
                    strokeWidth="15"
                    d={d}
                  />
                  <circle r="14" fill="#fff" filter="url(#ai-gl)" opacity="0">
                    <animateMotion dur=".85s" begin=".05s" fill="freeze" path={d} />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;.02;.94;1"
                      dur=".85s"
                      begin=".05s"
                      fill="freeze"
                    />
                  </circle>
                </g>
              ))}
            </g>
          </svg>
          <canvas className="ai-cf" aria-hidden="true" />
          <button type="button" className="ai-skip" aria-label="Skip intro">
            Skip &rsaquo;
          </button>
          <div className="ai-stage">
            <div className="ai-pan">
              <div className="ai-inner">
                <div className="ai-glow" />
                <img className="ai-zero" alt="" src={zeroImg} />
                <img className="ai-one" alt="" src={oneImg} />
                <img className="ai-wings" alt="" src={wingsImg} />
                <img className="ai-final" alt="Acton Tamil School 10th Anniversary" src={finalImg} />
                <div className="ai-shine" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
