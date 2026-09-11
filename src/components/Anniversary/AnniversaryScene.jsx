import { useEffect, useRef } from "react";

export default function AnniversaryScene() {
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
      camera.position.z = 6;
      const group = new THREE.Group();
      scene.add(group);
      const geometry = new THREE.TorusGeometry(1.65, .012, 8, 120);
      const material = new THREE.MeshBasicMaterial({ color: 0xb98a36, transparent: true, opacity: .65 });
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = .35 + i * .3;
        ring.rotation.y = -.3 + i * .3;
        ring.scale.setScalar(1 + i * .09);
        group.add(ring);
      }
      const dotsGeometry = new THREE.SphereGeometry(.035, 8, 8);
      for (let i = 0; i < 10; i++) {
        const bead = new THREE.Mesh(dotsGeometry, material);
        const angle = i / 10 * Math.PI * 2;
        bead.position.set(Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, Math.sin(angle * 2) * .3);
        group.add(bead);
      }
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let inView = true;
      let targetX = 0, targetY = 0;
      const render = () => renderer.render(scene, camera);
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix(); render();
      };
      const observer = new ResizeObserver(resize); observer.observe(host);
      const visibility = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }); visibility.observe(host);
      const pointer = event => {
        const bounds = host.getBoundingClientRect();
        targetY = ((event.clientX - bounds.left) / bounds.width - .5) * .3;
        targetX = ((event.clientY - bounds.top) / bounds.height - .5) * .2;
      };
      host.parentElement.addEventListener("pointermove", pointer);
      renderer.setAnimationLoop(time => {
        if (!inView || document.hidden || motion.matches) return;
        group.rotation.z = Math.sin(time * .00012) * .12;
        group.rotation.x += (targetX - group.rotation.x) * .04;
        group.rotation.y += (targetY - group.rotation.y) * .04;
        render();
      });
      resize();
      cleanup = () => {
        renderer.setAnimationLoop(null); observer.disconnect(); visibility.disconnect();
        host.parentElement?.removeEventListener("pointermove", pointer);
        geometry.dispose(); dotsGeometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div ref={hostRef} className="anniversary-three-scene" aria-hidden="true" />;
}
