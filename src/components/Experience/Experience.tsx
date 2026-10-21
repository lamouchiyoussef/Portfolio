import React from 'react';
import { Briefcase, GraduationCap, Building2, MapPin, Sparkles } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import { useScrollFill } from '../../hooks/useScrollFill';

interface Job {
  date: string;
  duration?: string;
  title: string;
  company: string;
  location: string;
  contract: string;
  type: 'job' | 'internship';
  current?: boolean;
  highlights?: { value: string; label: string }[];
  description: React.ReactNode[];
  /** Projet marquant mené pendant le poste, affiché en encart. */
  feature?: { label: string; title: string; items: React.ReactNode[] };
  stack: string[];
}

/** Données issues du CV et du profil LinkedIn. */
const JOBS: Job[] = [
  {
    date: 'Avril 2023 — Présent',
    title: 'Développeur Full Stack',
    company: 'Canadian System Technology',
    location: 'Tunis, Tunisie · Sur site',
    contract: 'Temps plein',
    type: 'job',
    current: true,
    highlights: [
      { value: '−60 %', label: 'temps de chargement' },
      { value: '5', label: 'lignes de production' },
      { value: '6', label: "devs dans l'équipe" },
    ],
    description: [
      <>
        Conception et développement d'applications web full stack (
        <b>Angular 18, .NET 8 / ASP.NET Core, SQL Server</b>) en équipe Agile / Scrum, de la
        maquette à la mise en production.
      </>,
      <>
        Développement d'<b>API REST sécurisées par JWT</b> et intégration aux systèmes d'information
        existants (ERP, postes de production).
      </>,
      <>
        Solutions <b>Industrie 4.0</b> : acquisition et traitement de données capteurs à la minute
        via <b>MQTT</b>, sur 5 lignes de production.
      </>,
      <>
        Optimisation frontend (lazy loading, OnPush, mise en cache) : chargement ramené de{' '}
        <b>5 s à 2 s</b>, soit −60 %.
      </>,
      <>
        Conteneurisation <b>Docker</b>, déploiement automatisé via <b>GitLab CI/CD et Ansible</b>,
        revues de code et tests.
      </>,
      <>
        Première phase du poste (2023) sur une stack <b>Node.js / Express.js / MongoDB</b>, avec
        authentification JWT via Passport.js.
      </>,
    ],
    feature: {
      label: "Projet de fin d'études — diplôme d'ingénieur",
      title: 'RTOM — plateforme MES de pilotage de la production pharmaceutique',
      items: [
        <>
          Backend <b>.NET 8</b> en <b>Clean Architecture / DDD / CQRS</b>, SQL Server avec EF Core 8
          et traçabilité complète des entités.
        </>,
        <>
          Collecte temps réel des données machines via <b>MQTT</b>, supervision <b>SignalR</b> avec
          alertes d'arrêts et indicateurs TRS.
        </>,
        <>
          Frontend <b>Angular 18</b> : dashboard interactif, planification Gantt, analyses
          multidimensionnelles (Pivot Grid).
        </>,
        <>Authentification JWT et gestion des rôles (RBAC).</>,
        <>
          CI/CD <b>Azure DevOps</b>, conteneurisation Docker, déploiement sur <b>Azure</b> (App
          Service, Container Registry).
        </>,
        <>
          Module d'<b>intelligence artificielle</b> pour interroger les données en langage naturel.
        </>,
      ],
    },
    stack: [
      'Angular 18',
      '.NET 8',
      'SQL Server',
      'MQTT',
      'SignalR',
      'JWT',
      'Docker',
      'GitLab CI/CD',
      'Azure DevOps',
      'Node.js',
      'MongoDB',
    ],
  },
  {
    date: 'Septembre 2022 — Avril 2023',
    duration: '8 mois',
    title: "Agent technique d'exploitation",
    company: 'Mediterranean Air Service (MAS)',
    location: 'Aérogare fret, Tunis-Carthage',
    contract: 'CDD',
    type: 'job',
    description: [],
    stack: [],
  },
  {
    date: 'Février 2022 — Juin 2022',
    duration: '5 mois',
    title: 'Développeur de jeux vidéo',
    company: 'CGI Studio',
    location: 'Manzel Temime, Tunisie',
    contract: "Stage · Projet de fin d'études",
    type: 'internship',
    description: [
      <>
        Développement d'<b>Attack Of Zombie</b>, jeu mobile de combat en <b>Réalité Augmentée</b>,
        commercialisé.
      </>,
      <>Conception du gameplay, de la détection de surface et de l'interface utilisateur.</>,
      <>
        Intégration d'éléments 3D dans l'environnement réel : superposition d'images de synthèse sur
        le flux caméra du smartphone.
      </>,
      <>
        Mode de visualisation de produits 3D dans un espace restreint, sans déplacement des objets.
      </>,
    ],
    stack: ['Unity', 'C#', 'Réalité Augmentée', 'Modélisation 3D'],
  },
  {
    date: 'Juillet 2021',
    duration: '1 mois',
    title: 'Stagiaire développeur web',
    company: "Office de l'Aviation Civile et des Aéroports (OACA)",
    location: 'Tunisie',
    contract: 'Stage',
    type: 'internship',
    description: [
      <>
        Développement d'un site web dynamique en <b>PHP</b>, adossé à une base de données{' '}
        <b>MySQL</b>.
      </>,
      <>Conception du schéma de données et des requêtes SQL associées.</>,
    ],
    stack: ['PHP', 'MySQL', 'HTML5'],
  },
  {
    date: 'Janvier 2020',
    duration: '1 mois',
    title: "Stage d'initiation",
    company: 'SIMOP Tunisie',
    location: 'Tunisie',
    contract: 'Stage',
    type: 'internship',
    description: [],
    stack: [],
  },
];

const Experience = () => {
  const timeline = useScrollFill<HTMLDivElement>();

  return (
    <Section id="experience" className="bg-ink-950/40">
      <Backdrop variant="cyan" />

      <SectionHeading
        eyebrow="Parcours"
        title="Expérience professionnelle"
        description="De l'aéroport à l'usine connectée : un parcours construit sur le terrain, aujourd'hui centré sur les applications industrielles."
      />

      <div ref={timeline} className="relative mx-auto max-w-4xl">
        {/* Ligne de temps : rail discret + tracé lumineux qui progresse au défilement */}
        <div
          aria-hidden
          className="absolute bottom-0 left-[19px] top-2 w-px bg-white/[0.07] sm:left-[23px]"
        />
        <div
          aria-hidden
          className="absolute left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent-soft to-cyan-glow shadow-[0_0_12px_rgba(139,92,246,0.8)] sm:left-[23px]"
          style={{ height: 'calc((100% - 0.5rem) * var(--fill, 0))' }}
        />

        <div className="space-y-10">
          {JOBS.map((job, index) => (
            <TimelineItem key={job.company} job={job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TimelineItem = ({ job, index }: { job: Job; index: number }) => {
  const Icon = job.type === 'job' ? Briefcase : GraduationCap;
  const compact = job.description.length === 0;

  return (
    <div
      className="reveal relative pl-14 sm:pl-20"
      style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
    >
      {/* Point sur la ligne */}
      <span className="absolute left-0 top-6 z-10 grid h-10 w-10 place-items-center rounded-xl border border-accent/30 bg-ink-850 text-accent-soft shadow-[0_0_20px_-6px_rgba(139,92,246,0.8)] sm:h-12 sm:w-12">
        <Icon className="h-[18px] w-[18px]" />
        {job.current && (
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse-ring rounded-xl bg-accent/40"
          />
        )}
      </span>

      <article
        className={`glass glass-hover glow-border group ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'}`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{job.title}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-slate-600" />
                {job.company}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-600" />
                {job.location}
              </span>
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            <span className="font-mono text-xs tracking-wide text-accent-soft">
              {job.date}
              {job.duration && <span className="text-slate-500"> · {job.duration}</span>}
            </span>
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-400">
              {job.contract}
            </span>
            {job.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                En poste
              </span>
            )}
          </div>
        </div>

        {job.highlights && (
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {job.highlights.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
              >
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-xl font-bold text-white sm:text-2xl">{value}</dd>
                <dd className="mt-0.5 text-[11px] leading-snug text-slate-500 sm:text-xs">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {!compact && (
          <ul className="mt-6 space-y-3">
            {job.description.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-slate-400 [&_b]:font-medium [&_b]:text-slate-200"
              >
                <span
                  aria-hidden
                  className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50 transition-colors duration-500 group-hover:bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {job.feature && (
          <section className="mt-6 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/[0.08] to-cyan-glow/[0.04] p-5">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-glow">
              <Sparkles className="h-3.5 w-3.5" />
              {job.feature.label}
            </p>
            <h4 className="mt-2 font-display text-base font-semibold text-white">
              {job.feature.title}
            </h4>
            <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
              {job.feature.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400 [&_b]:font-medium [&_b]:text-slate-200"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-cyan-glow"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {job.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
            {job.stack.map((tech) => (
              <span key={tech} className="chip text-[11px]">
                {tech}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default Experience;
