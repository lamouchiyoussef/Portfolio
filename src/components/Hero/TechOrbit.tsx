import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Visualisation 3D du Hero : un noyau lumineux, des technologies en orbite
 * reliées par des flux de données, des particules discrètes.
 *
 * Chargée en différé (React.lazy) : Three.js reste dans son propre chunk.
 * Budget volontairement bas : ~250 particules, géométries simples, DPR plafonné,
 * rendu suspendu hors écran et onglet masqué.
 */

const NODES = [
  { label: 'Angular', color: 0xf0408b, ring: 0 },
  { label: '.NET 8', color: 0x8b5cf6, ring: 1 },
  { label: 'SQL Server', color: 0x22d3ee, ring: 2 },
  { label: 'Docker', color: 0x3b82f6, ring: 0 },
  { label: 'IoT · MQTT', color: 0x22d3ee, ring: 1 },
  { label: 'IA', color: 0xa78bfa, ring: 2 },
];

// Inclinaisons modérées : orbites lisibles, nœuds bien répartis à l'écran.
const RINGS = [
  { radius: 2.0, tilt: new THREE.Euler(0.55, 0.2, 0.25), speed: 0.16 },
  { radius: 2.5, tilt: new THREE.Euler(-0.45, 0.35, -0.5), speed: -0.11 },
  { radius: 2.95, tilt: new THREE.Euler(0.9, -0.25, 0.8), speed: 0.08 },
];

/** Texture de halo radial (dégradé), partagée par le noyau et les impulsions. */
const makeGlowTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
};

/** Étiquette en forme de pastille, dessinée sur canvas puis affichée en sprite. */
const makeLabel = (text: string, color: number) => {
  const dpr = 2;
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d')!;
  const font = `600 ${15 * dpr}px "Plus Jakarta Sans", Inter, system-ui, sans-serif`;
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width + 34 * dpr);
  const h = 32 * dpr;
  c.width = w;
  c.height = h;
  const hex = `#${color.toString(16).padStart(6, '0')}`;

  ctx.font = font;
  ctx.fillStyle = 'rgba(17,19,26,0.88)';
  ctx.strokeStyle = `${hex}99`;
  ctx.lineWidth = 1.5 * dpr;
  const r = h / 2;
  ctx.beginPath();
  ctx.roundRect(1, 1, w - 2, h - 2, r);
  ctx.fill();
  ctx.stroke();
  // Pastille de couleur
  ctx.fillStyle = hex;
  ctx.beginPath();
  ctx.arc(13 * dpr, h / 2, 4 * dpr, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F8FAFC';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 23 * dpr, h / 2 + 1);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })
  );
  const scale = 0.0042;
  sprite.scale.set(w * scale, h * scale, 1);
  return sprite;
};

const TechOrbit = ({ className = '' }: { className?: string }) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.3, 12);

    const root = new THREE.Group();
    scene.add(root);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => {
      disposables.push(x);
      return x;
    };

    const glowTex = track(makeGlowTexture());

    // --- Noyau : sphère pleine + icosaèdre filaire + halo -----------------
    const coreGeo = track(new THREE.IcosahedronGeometry(0.62, 1));
    const coreMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x2a1a55,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.55,
        roughness: 0.3,
        metalness: 0.6,
        flatShading: true,
      })
    );
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    const shellSrc = track(new THREE.IcosahedronGeometry(1.0, 1));
    const shellGeo = track(new THREE.EdgesGeometry(shellSrc));
    const shellMat = track(new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.45 }));
    const shell = new THREE.LineSegments(shellGeo, shellMat);
    root.add(shell);

    const haloMat = track(
      new THREE.SpriteMaterial({
        map: glowTex,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(3.6);
    root.add(halo);

    // Lumières violet / cyan
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const lightV = new THREE.PointLight(0x8b5cf6, 30, 20);
    lightV.position.set(-4, 3, 4);
    const lightC = new THREE.PointLight(0x22d3ee, 24, 20);
    lightC.position.set(4, -2, 3);
    scene.add(lightV, lightC);

    // --- Anneaux d'orbite --------------------------------------------------
    const ringMat = track(new THREE.LineBasicMaterial({ color: 0x8b8fff, transparent: true, opacity: 0.16 }));
    const ringPivots = RINGS.map((ring) => {
      const pts = new THREE.EllipseCurve(0, 0, ring.radius, ring.radius).getPoints(128);
      const geo = track(new THREE.BufferGeometry().setFromPoints(pts));
      const line = new THREE.LineLoop(geo, ringMat);
      const pivot = new THREE.Group();
      pivot.rotation.copy(ring.tilt);
      pivot.add(line);
      root.add(pivot);
      return pivot;
    });

    // --- Nœuds technologiques + liaisons + impulsions -----------------------
    const nodeGeo = track(new THREE.SphereGeometry(0.11, 16, 16));
    const labels: { sprite: THREE.Sprite; base: THREE.Vector3 }[] = [];
    const perRing = [0, 0, 0];
    const nodes = NODES.map((n) => {
      const index = perRing[n.ring]++;
      const mat = track(new THREE.MeshBasicMaterial({ color: n.color }));
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const glow = new THREE.Sprite(
        track(
          new THREE.SpriteMaterial({
            map: glowTex,
            color: n.color,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
      glow.scale.setScalar(0.75);
      const label = makeLabel(n.label, n.color);
      track(label.material.map!);
      track(label.material);
      label.position.set(0, 0.36, 0);
      labels.push({ sprite: label, base: label.scale.clone() });
      const holder = new THREE.Group();
      holder.add(mesh, glow, label);
      ringPivots[n.ring].add(holder);

      const linkGeo = track(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]));
      const linkMat = track(new THREE.LineBasicMaterial({ color: n.color, transparent: true, opacity: 0.22 }));
      const link = new THREE.Line(linkGeo, linkMat);
      root.add(link);

      const pulse = new THREE.Sprite(
        track(
          new THREE.SpriteMaterial({
            map: glowTex,
            color: n.color,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        )
      );
      pulse.scale.setScalar(0.32);
      root.add(pulse);

      return {
        holder,
        link,
        pulse,
        ring: RINGS[n.ring],
        angle: index * Math.PI + n.ring * 1.05,
        phase: Math.random(),
      };
    });

    // --- Particules ---------------------------------------------------------
    const COUNT = 240;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3.3 + Math.random() * 3;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions.set([r * Math.sin(p) * Math.cos(t), r * Math.cos(p) * 0.7, r * Math.sin(p) * Math.sin(t)], i * 3);
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const dustMat = track(
      new THREE.PointsMaterial({
        size: 0.045,
        map: glowTex,
        color: 0xa5b4fc,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- Interaction : parallaxe à la souris (aucune action requise au toucher)
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // --- Taille -----------------------------------------------------------
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = width / height;
      // Recul de caméra sur écrans étroits pour garder les étiquettes visibles.
      camera.position.z = width < 420 ? 14 : 12;
      camera.updateProjectionMatrix();
      // Étiquettes agrandies sur petit écran pour rester lisibles.
      const k = width < 420 ? 1.6 : width < 640 ? 1.25 : 1;
      for (const l of labels) l.sprite.scale.copy(l.base).multiplyScalar(k);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // --- Boucle de rendu, suspendue hors écran ------------------------------
    const clock = new THREE.Clock();
    const world = new THREE.Vector3();
    const corePos = new THREE.Vector3();
    let visible = true;
    let frame = 0;

    const tick = () => {
      frame = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      root.rotation.y += dt * 0.12;
      root.rotation.x += (target.y * 0.25 - root.rotation.x) * 0.04;
      root.position.x += (target.x * 0.2 - root.position.x) * 0.04;
      root.position.y = Math.sin(t * 0.6) * 0.12;

      core.rotation.y -= dt * 0.25;
      core.rotation.z += dt * 0.1;
      shell.rotation.y += dt * 0.18;
      shell.rotation.x -= dt * 0.07;
      haloMat.opacity = 0.42 + Math.sin(t * 1.6) * 0.08;
      dust.rotation.y -= dt * 0.02;

      core.getWorldPosition(corePos);
      root.worldToLocal(corePos);
      for (const n of nodes) {
        n.angle += dt * n.ring.speed;
        n.holder.position.set(Math.cos(n.angle) * n.ring.radius, Math.sin(n.angle) * n.ring.radius, 0);
        n.holder.getWorldPosition(world);
        root.worldToLocal(world);

        const attr = n.link.geometry.attributes.position as THREE.BufferAttribute;
        attr.setXYZ(0, corePos.x, corePos.y, corePos.z);
        attr.setXYZ(1, world.x, world.y, world.z);
        attr.needsUpdate = true;

        // Impulsion qui voyage du nœud vers le noyau (flux de données).
        const k = (t * 0.35 + n.phase) % 1;
        n.pulse.position.lerpVectors(world, corePos, k);
        (n.pulse.material as THREE.SpriteMaterial).opacity = Math.sin(k * Math.PI) * 0.9;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame && visible && !document.hidden) {
        clock.getDelta();
        frame = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(host);
    const onVisibility = () => start();
    document.addEventListener('visibilitychange', onVisibility);
    start();

    // --- Nettoyage complet des ressources WebGL ---------------------------
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className={className} />;
};

export default TechOrbit;
