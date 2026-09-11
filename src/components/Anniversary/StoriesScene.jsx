import { useEffect, useRef } from "react";

export default function StoriesScene() {
  const hostRef = useRef(null);
  useEffect(() => {
    const host = hostRef.current;
    let disposed = false;
    let cleanup = () => {};
    import("three").then(THREE => {
      if (disposed) return;
      let renderer;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      host.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
      camera.position.z = 9;
      const group = new THREE.Group();
      scene.add(group);
      const letters = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];
      const textures = [];
      const materials = [];
      const pieces = letters.map((letter, i) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 256;
        const context = canvas.getContext("2d");
        context.font = '600 150px "Nirmala UI", "Noto Sans Tamil", sans-serif';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = i % 2 ? "#8f1538" : "#b38a3e";
        context.fillText(letter, 128, 138);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        textures.push(texture);
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: .38, depthWrite: false });
        materials.push(material);
        const piece = new THREE.Sprite(material);
        piece.scale.set(.46, .46, 1);
        piece.position.y = (i / 11 - .5) * 5.6;
        piece.userData.baseY = piece.position.y;
        group.add(piece); return piece;
      });      let target = 0, active = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const render = () => renderer.render(scene, camera);
      const resize = () => {
        const bounds = host.getBoundingClientRect();
        renderer.setSize(bounds.width, bounds.height);
        camera.aspect = bounds.width / Math.max(1, bounds.height);
        camera.updateProjectionMatrix();
        const edge = Math.tan(THREE.MathUtils.degToRad(20)) * camera.position.z * camera.aspect;
        pieces.forEach((piece, i) => { piece.position.x = (i % 2 ? 1 : -1) * Math.max(.25, edge - .15); });
        render();
      };
      const observer = new ResizeObserver(resize); observer.observe(host);
      const visibility = new IntersectionObserver(entries => { active = entries[0].isIntersecting; }); visibility.observe(host);
      const move = event => { const bounds = host.getBoundingClientRect(); target = ((event.clientX - bounds.left) / bounds.width - .5) * .18; };
      const parent = host.parentElement;
      parent.addEventListener("pointermove", move);
      renderer.setAnimationLoop(time => {
        if (!active || document.hidden || reduced.matches) return;
        group.rotation.y += (target - group.rotation.y) * .035;
        pieces.forEach((piece, i) => {
          piece.position.y = piece.userData.baseY + Math.sin(time * .0005 + i) * .09;
          piece.material.rotation = Math.sin(time * .0002 + i) * .12;
        }); render();
      });
      resize();
      cleanup = () => { renderer.setAnimationLoop(null); observer.disconnect(); visibility.disconnect(); parent.removeEventListener("pointermove", move); textures.forEach(texture => texture.dispose()); materials.forEach(material => material.dispose()); renderer.dispose(); renderer.domElement.remove(); };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div ref={hostRef} className="stories-three-scene" aria-hidden="true" />;
}
