import React from 'react';
import { ArrowRight, Download, MapPin, Activity, Gauge, Factory, Users } from 'lucide-react';
import CV from '../assets/CV_Lamouchi_Youssef.pdf';
import { useReveal } from '../../hooks/useReveal';
import { PROFILE, yearsOfExperience } from '../../data/profile';

const Hero = () => {
  const ref = useReveal<HTMLElement>();
  const years = yearsOfExperience();

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
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
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Colonne texte */}
          <div>
            <div className="reveal mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 backdrop-blur-sm">
              <span className="relative grid h-5 w-5 place-items-center">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400" />
                <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-slate-300">
                Ouvert aux opportunités Full Stack
              </span>
            </div>

            <p
              className="reveal font-mono text-sm text-accent-soft"
              style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
            >
              Bonjour, je suis
            </p>

            <h1
              className="reveal mt-3 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]"
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              Youssef
              <br />
              <span className="animate-gradient-pan gradient-text">Lamouchi</span>
            </h1>

            <p
              className="reveal mt-6 font-display text-lg font-semibold text-slate-200 sm:text-xl"
              style={{ '--reveal-delay': '140ms' } as React.CSSProperties}
            >
              {PROFILE.title}
              <span className="mx-2.5 text-accent/50">·</span>
              <span className="whitespace-nowrap text-slate-400">{PROFILE.role}</span>
            </p>

            <p
              className="reveal text-balance mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-[17px]"
              style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
            >
              {years} ans à concevoir des solutions industrielles —{' '}
              <span className="text-slate-200">traçabilité, Industrie 4.0 et IoT</span>.
              J'écris des API REST en .NET 8 et des interfaces Angular rapides, de la
              maquette à la mise en production.
            </p>

            <div
              className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
            >
              <a href="#projects" className="btn-primary group">
                Voir mes projets
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href={CV} download="CV_Youssef_Lamouchi.pdf" className="btn-ghost group">
                <Download
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
                Télécharger mon CV
              </a>
            </div>

            <div
              className="reveal mt-8 flex items-center gap-2 text-sm text-slate-500"
              style={{ '--reveal-delay': '360ms' } as React.CSSProperties}
            >
              <MapPin size={15} className="text-accent-soft" />
              {PROFILE.location}
            </div>
          </div>

          {/* Colonne visuelle : tableau de bord d'impact */}
          <div
            className="reveal relative mx-auto w-full max-w-lg lg:max-w-none"
            style={{ '--reveal-delay': '260ms' } as React.CSSProperties}
          >
            <ImpactCard years={years} />
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Carte « tableau de bord » : reprend l'univers des projets (supervision
 * temps réel) pour présenter les chiffres clés du CV.
 */
const ImpactCard = ({ years }: { years: number }) => (
  <div className="relative animate-float">
    <div
      aria-hidden
      className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/25 via-transparent to-cyan-glow/20 blur-2xl"
    />

    <div className="glass relative overflow-hidden shadow-card">
      {/* Barre de titre */}
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-xs text-slate-500">impact.dashboard</span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
        <Metric
          icon={<Activity size={16} />}
          value={`${years} ans`}
          label="d'expérience Full Stack"
        />
        <Metric
          icon={<Gauge size={16} />}
          value="−60 %"
          label="temps de chargement (5 s → 2 s)"
          tone="emerald"
        />
        <Metric
          icon={<Factory size={16} />}
          value="5"
          label="lignes de production connectées"
          tone="cyan"
        />
        <Metric
          icon={<Users size={16} />}
          value="5"
          label="clients sur la plateforme B2B"
        />
      </div>

      {/* Pseudo-graphe de flux capteurs MQTT */}
      <div className="border-t border-white/[0.07] p-5">
        <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-slate-500">
          <span>mqtt://capteurs/ligne-*</span>
          <span>1 msg / min</span>
        </div>
        <div aria-hidden className="flex h-16 items-end gap-1">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-accent/30 to-cyan-glow/70"
              style={{ height: `${h}%`, opacity: 0.35 + (i / BARS.length) * 0.65 }}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {['Angular 18', '.NET 8', 'SQL Server', 'MQTT', 'Docker'].map((t) => (
            <span key={t} className="chip text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
      />
    </div>
  </div>
);

const BARS = [38, 52, 44, 61, 48, 70, 58, 66, 54, 78, 63, 72, 85, 69, 80, 74, 90, 82, 76, 88];

const TONES = {
  violet: 'bg-accent/15 text-accent-soft',
  emerald: 'bg-emerald-400/10 text-emerald-300',
  cyan: 'bg-cyan-glow/10 text-cyan-glow',
};

const Metric = ({
  icon,
  value,
  label,
  tone = 'violet',
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  tone?: keyof typeof TONES;
}) => (
  <div className="bg-ink-850/90 p-5">
    <span className={`mb-3 grid h-8 w-8 place-items-center rounded-lg ${TONES[tone]}`}>
      {icon}
    </span>
    <div className="font-display text-2xl font-bold text-white sm:text-3xl">{value}</div>
    <div className="mt-1 text-xs leading-snug text-slate-500">{label}</div>
  </div>
);

export default Hero;
