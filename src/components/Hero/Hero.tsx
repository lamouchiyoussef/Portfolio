import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ArrowRight, Download, MapPin, Activity, Gauge, Factory, Users } from 'lucide-react';
import CV from '../assets/CV_Lamouchi_Youssef.pdf';
import { useReveal } from '../../hooks/useReveal';
import { PROFILE, SOCIALS, yearsOfExperience } from '../../data/profile';
import OrbitFallback from './OrbitFallback';

// Three.js dans son propre chunk, chargé seulement si la 3D est utilisée.
const TechOrbit = lazy(() => import('./TechOrbit'));

const Hero = () => {
  const ref = useReveal<HTMLElement>();
  const years = yearsOfExperience();

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-12"
    >
      {/* Décor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_75%)]"
      />
      <div aria-hidden className="orb -left-40 -top-20 h-[520px] w-[520px] bg-accent/20" />
      <div aria-hidden className="orb -right-40 top-1/4 h-[520px] w-[520px] bg-cyan-glow/[0.10]" />

      <div className="container relative z-10 mx-auto px-5 sm:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
          {/* Colonne texte */}
          <div>
            <div className="reveal mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] py-1.5 pl-2 pr-4 backdrop-blur-sm">
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400" />
                <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-200">Ouvert aux opportunités</span>
            </div>

            <p
              className="reveal font-mono text-sm text-accent-soft"
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              Bonjour, je suis
            </p>

            <h1
              className="reveal mt-3 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]"
              style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
            >
              <span className="animate-gradient-pan gradient-text">{PROFILE.name}</span>
            </h1>

            <p
              className="reveal mt-5 font-display text-lg font-semibold text-slate-200 sm:text-xl"
              style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
            >
              <span className="block">{PROFILE.title}</span>
              <span className="mt-1 block text-slate-400">{PROFILE.role}</span>
            </p>

            <p
              className="reveal text-balance mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-[17px]"
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            >
              Je conçois des applications web et mobiles pour l'industrie —{' '}
              <span className="text-slate-200">traçabilité, Industrie 4.0, IoT et IA</span> —
              avec des API .NET 8 robustes et des interfaces Angular rapides, de la maquette
              à la production.
            </p>

            <div
              className="reveal mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
            >
              <a href="#projects" className="btn-primary group">
                Découvrir mes projets
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={CV} download="CV_Youssef_Lamouchi.pdf" className="btn-ghost group">
                <Download size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Télécharger mon CV
              </a>
            </div>

            <div
              className="reveal mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ '--reveal-delay': '360ms' } as React.CSSProperties}
            >
              <span className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={15} className="text-accent-soft" />
                {PROFILE.location}
              </span>
              <span aria-hidden className="hidden h-4 w-px bg-white/10 sm:block" />
              <ul className="flex items-center gap-1.5" aria-label="Liens professionnels">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      className="group grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-accent/40 hover:text-white"
                    >
                      <Icon size={17} className="icon-pop" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne visuelle */}
          <div
            className="reveal relative mx-auto aspect-[11/12] w-full max-w-[540px] lg:max-w-none"
            style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
          >
            <HeroVisual />
          </div>
        </div>

        <ImpactStrip years={years} />
      </div>
    </section>
  );
};

/** Choisit entre la scène 3D (chargée après le premier rendu) et la version SVG. */
const HeroVisual = () => {
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
    if (reduced || lowEnd || !supportsWebGL()) return;

    // Laisse le contenu s'afficher d'abord, puis charge Three.js.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setUse3d(true));
    return () => cancel(id);
  }, []);

  const fallback = <OrbitFallback className="h-full w-full" />;

  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full bg-gradient-to-tr from-accent/25 via-transparent to-cyan-glow/20 blur-3xl"
      />
      {use3d ? (
        <Suspense fallback={fallback}>
          <TechOrbit className="relative h-full w-full" />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

/** Chiffres réels issus du CV. */
const ImpactStrip = ({ years }: { years: number }) => {
  const items = [
    { icon: <Activity size={16} />, value: `${years} ans`, label: "d'expérience Full Stack" },
    { icon: <Gauge size={16} />, value: '−60 %', label: 'temps de chargement (5 s → 2 s)' },
    { icon: <Factory size={16} />, value: '5', label: 'lignes de production connectées' },
    { icon: <Users size={16} />, value: '5', label: 'clients sur la plateforme B2B' },
  ];

  return (
    <dl
      className="reveal mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:mt-4 lg:grid-cols-4"
      style={{ '--reveal-delay': '420ms' } as React.CSSProperties}
    >
      {items.map(({ icon, value, label }) => (
        <div key={label} className="group flex flex-col items-start gap-3 bg-ink-850/95 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-5">
          <span className="icon-pop grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-cyan-glow/10 text-accent-soft">
            {icon}
          </span>
          <div className="flex min-w-0 flex-col-reverse">
            <dt className="text-xs leading-snug text-slate-500">{label}</dt>
            <dd className="whitespace-nowrap font-display text-2xl font-bold text-white">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
};

export default Hero;
