import React from 'react';
import { ArrowRight, Download, MapPin, Sparkles } from 'lucide-react';
import CV from '../assets/CV_Lamouchi_Youssef.pdf';
import { useReveal } from '../../hooks/useReveal';

const Hero = () => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Décor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_75%)]"
      />
      <div aria-hidden className="orb -left-40 -top-20 h-[520px] w-[520px] bg-accent/20" />
      <div
        aria-hidden
        className="orb -right-40 top-1/3 h-[480px] w-[480px] bg-cyan-glow/[0.12]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent"
      />

      <div className="container relative z-10 mx-auto px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Colonne texte */}
          <div>
            <div className="reveal mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 backdrop-blur-sm">
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400" />
                <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-slate-300">
                Disponible pour de nouveaux projets
              </span>
            </div>

            <h1
              className="reveal font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              Développeur
              <br />
              <span className="animate-gradient-pan gradient-text">Full Stack</span>
            </h1>

            <div
              className="reveal mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-slate-400"
              style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            >
              {['Angular', '.NET 8', 'TypeScript', 'SQL'].map((tech, i) => (
                <React.Fragment key={tech}>
                  {i > 0 && <span className="text-accent/50">/</span>}
                  <span>{tech}</span>
                </React.Fragment>
              ))}
            </div>

            <p
              className="reveal text-balance mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            >
              Je conçois des applications web modernes, performantes et pensées pour
              leurs utilisateurs. {formatExperience()} d'expérience à construire des
              interfaces Angular et des APIs .NET qui tiennent la charge.
            </p>

            <div
              className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ '--reveal-delay': '320ms' } as React.CSSProperties}
            >
              <a href="#projects" className="btn-primary group">
                Voir mes projets
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="#contact" className="btn-ghost">
                Me contacter
              </a>
              <a href={CV} download="CV_Lamouchi_Youssef.pdf" className="btn-ghost group">
                <Download
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
                Mon CV
              </a>
            </div>

            <div
              className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-8"
              style={{ '--reveal-delay': '400ms' } as React.CSSProperties}
            >
              <Stat value="6+" label="Projets livrés" />
              <Stat value={formatExperience()} label="D'expérience" />
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={15} className="text-accent-soft" />
                Tunis, Ariana
              </div>
            </div>
          </div>

          {/* Colonne visuelle : carte de code */}
          <div
            className="reveal relative mx-auto w-full max-w-lg lg:max-w-none"
            style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
          >
            <CodeCard />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="font-display text-2xl font-bold text-white">{value}</div>
    <div className="mt-0.5 text-xs uppercase tracking-wider text-slate-500">
      {label}
    </div>
  </div>
);

/** Fenêtre de code décorative : plus parlante qu'une photo générique. */
const CodeCard = () => (
  <div className="relative animate-float">
    {/* Halo derrière la carte */}
    <div
      aria-hidden
      className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/25 via-transparent to-cyan-glow/20 blur-2xl"
    />

    <div className="glass relative overflow-hidden shadow-card">
      {/* Barre de titre */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 font-mono text-xs text-slate-500">
          developer.ts
        </span>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13.5px]">
        <code>
          <Ln n={1}>
            <K>const</K> <V>developer</V> <O>:</O> <T>Developer</T> <O>=</O> <P>{'{'}</P>
          </Ln>
          <Ln n={2}>
            {'  '}
            <A>name</A>
            <O>:</O> <S>'Lamouchi Youssef'</S>
            <O>,</O>
          </Ln>
          <Ln n={3}>
            {'  '}
            <A>role</A>
            <O>:</O> <S>'Full Stack Developer'</S>
            <O>,</O>
          </Ln>
          <Ln n={4}>
            {'  '}
            <A>stack</A>
            <O>:</O> <P>[</P>
            <S>'Angular'</S>
            <O>,</O> <S>'.NET 8'</S>
            <O>,</O> <S>'SQL'</S>
            <P>]</P>
            <O>,</O>
          </Ln>
          <Ln n={5}>
            {'  '}
            <A>focus</A>
            <O>:</O> <S>'performance &amp; clean code'</S>
            <O>,</O>
          </Ln>
          <Ln n={6}>
            {'  '}
            <A>openToWork</A>
            <O>:</O> <B>true</B>
            <O>,</O>
          </Ln>
          <Ln n={7}>
            <P>{'}'}</P>
            <O>;</O>
          </Ln>
        </code>
      </pre>

      {/* Reflet animé */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
      />
    </div>

    {/* Badges flottants */}
    <div className="glass absolute -bottom-6 -left-4 flex items-center gap-2.5 px-4 py-3 shadow-glow sm:-left-8">
      <Sparkles size={16} className="text-accent-soft" />
      <span className="text-xs font-medium text-slate-200">Angular + .NET 8</span>
    </div>
    <div className="glass absolute -right-3 -top-5 px-4 py-2.5 shadow-glow-cyan sm:-right-6">
      <span className="font-mono text-xs text-cyan-glow">{'</> clean code'}</span>
    </div>
  </div>
);

/* Petits helpers de coloration syntaxique */
const Ln = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <span className="block whitespace-pre">
    <span className="mr-4 inline-block w-3 select-none text-right text-slate-700">
      {n}
    </span>
    {children}
  </span>
);
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-purple-400">{children}</span>
);
const V = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-300">{children}</span>
);
const T = ({ children }: { children: React.ReactNode }) => (
  <span className="text-emerald-300">{children}</span>
);
const A = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sky-300">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-amber-200/90">{children}</span>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <span className="text-orange-400">{children}</span>
);
const O = ({ children }: { children: React.ReactNode }) => (
  <span className="text-slate-500">{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-slate-400">{children}</span>
);

/** Expérience calculée depuis le début du poste actuel : jamais à re-éditer. */
const CAREER_START = new Date(2023, 3); // Avril 2023

const formatExperience = (from: Date = CAREER_START) => {
  const now = new Date();
  let months =
    (now.getFullYear() - from.getFullYear()) * 12 + (now.getMonth() - from.getMonth());
  if (months < 0) months = 0;

  const years = Math.floor(months / 12);
  const rest = months % 12;

  const yearPart = years > 0 ? `${years} an${years > 1 ? 's' : ''}` : '';
  const monthPart = rest > 0 ? `${rest} mois` : '';

  return [yearPart, monthPart].filter(Boolean).join(' et ') || 'Moins d’un mois';
};

export default Hero;
