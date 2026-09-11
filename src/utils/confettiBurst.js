const BURST_COLORS = ["#1c3766", "#eba92f", "#8f1538", "#c9497a"];
const BURST_DURATION_MS = 1400;
const PIECE_COUNT = 60;

function createBurstPiece(originX, originY) {
  return {
    x: originX,
    y: originY,
    size: 5 + Math.random() * 7,
    color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
    speedX: (Math.random() - 0.5) * 8,
    speedY: Math.random() * -6 - 2,
    gravity: 0.25 + Math.random() * 0.15,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 14,
  };
}

/**
 * Fires a one-shot confetti burst from a screen position (defaults to
 * top-center of the viewport). Self-removes its canvas once the burst
 * fades out. No-ops for prefers-reduced-motion.
 */
export function fireConfettiBurst(originX, originY) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = window.devicePixelRatio || 1;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "3000";
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const startX = originX ?? width / 2;
  const startY = originY ?? 0;
  const pieces = Array.from({ length: PIECE_COUNT }, () =>
    createBurstPiece(startX, startY)
  );

  const start = performance.now();

  function draw(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, width, height);
    pieces.forEach((piece) => {
      piece.speedY += piece.gravity;
      piece.x += piece.speedX;
      piece.y += piece.speedY;
      piece.rotation += piece.spin;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - elapsed / BURST_DURATION_MS);
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
      ctx.restore();
    });
    if (elapsed < BURST_DURATION_MS) {
      requestAnimationFrame(draw);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}
