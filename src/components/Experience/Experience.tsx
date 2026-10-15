import React from 'react';
import { Briefcase, GraduationCap, Building2, MapPin } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';

interface Job {
  date: string;
  title: string;
  company: string;
  location: string;
  type: 'job' | 'internship';
  current?: boolean;
  highlights?: { value: string; label: string }[];
  description: React.ReactNode[];
  stack: string[];
}

const JOBS: Job[] = [
  {
    date: 'Avril 2023 — Présent',
    title: 'Développeur Full Stack',
    company: 'Canadian System Technology',
    location: 'Tunis, Tunisie',
    type: 'job',
    current: true,
    highlights: [
      { value: '−60 %', label: 'temps de chargement' },
      { value: '5', label: 'lignes de production' },
      { value: '6', label: 'devs dans l\'équipe' },
    ],
    description: [
      <>
        Conception et développement d'applications web full stack (
        <b>Angular 18, .NET 8 / ASP.NET Core, SQL Server</b>) en équipe Agile / Scrum,
        de la maquette à la mise en production.
      </>,
      <>
        Développement d'<b>API REST sécurisées par JWT</b> et intégration aux systèmes
        d'information existants (ERP, postes de production).
      </>,
      <>
        Solutions <b>Industrie 4.0</b> : acquisition et traitement de données capteurs à
        la minute via <b>MQTT</b>, sur 5 lignes de production.
      </>,
      <>
        Optimisation frontend (lazy loading, OnPush, mise en cache) : chargement ramené
        de <b>5 s à 2 s</b>, soit −60 %.
      </>,
      <>
        Conteneurisation <b>Docker</b>, déploiement automatisé via{' '}
        <b>GitLab CI/CD et Ansible</b>, revues de code et tests.
      </>,
    ],
    stack: ['Angular 18', '.NET 8', 'SQL Server', 'MQTT', 'JWT', 'Docker', 'GitLab CI/CD', 'Ansible'],
  },
  {
    date: 'Février 2022 — Juin 2022',
    title: "Développeur — Projet de fin d'études",
    company: 'CGI Studio',
    location: 'Manzel Temime, Tunisie',
    type: 'internship',
    description: [
      <>
        Développement d'<b>Attack Of Zombie</b>, jeu mobile en Réalité Augmentée :
        gameplay, détection de surface et interface utilisateur.
      </>,
    ],
    stack: ['Unity', 'C#', 'Réalité Augmentée'],
  },
];

const Experience = () => {
  return (
    <Section id="experience" className="bg-ink-950/40">
      <Backdrop variant="cyan" />

      <SectionHeading
        eyebrow="Parcours"
        title="Expérience professionnelle"
        description="Des applications métier en production pour l'industrie, livrées en équipe Agile."
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Ligne de temps */}
        <div
          aria-hidden
          className="absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-[23px]"
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

  return (
    <div
      className="reveal relative pl-14 sm:pl-20"
      style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
    >
      {/* Point sur la ligne */}
      <span className="absolute left-0 top-6 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-ink-850 text-accent-soft sm:h-12 sm:w-12">
        <Icon className="h-[18px] w-[18px]" />
        {job.current && (
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse-ring rounded-xl bg-accent/40"
          />
        )}
      </span>

      <article className="glass glass-hover group p-6 sm:p-8">
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
          <div className="flex flex-shrink-0 flex-wrap items-center gap-2.5">
            <span className="font-mono text-xs tracking-wide text-accent-soft">
              {job.date}
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
                <dd className="font-display text-xl font-bold text-white sm:text-2xl">
                  {value}
                </dd>
                <dd className="mt-0.5 text-[11px] leading-snug text-slate-500 sm:text-xs">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        )}

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

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          {job.stack.map((tech) => (
            <span key={tech} className="chip text-[11px]">
              {tech}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Experience;
