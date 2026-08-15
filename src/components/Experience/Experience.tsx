import React from 'react';
import { Briefcase, GraduationCap, Building2 } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';

interface Job {
  date: string;
  title: string;
  company: string;
  type: 'job' | 'internship';
  current?: boolean;
  description: string[];
}

const JOBS: Job[] = [
  {
    date: 'Avril 2023 — Présent',
    title: 'Développeur Full Stack',
    company: 'Canadian System Technology',
    type: 'job',
    current: true,
    description: [
      "Développement d'applications web avec Angular et .NET 8",
      "Conception et implémentation d'APIs RESTful",
      "Collaboration avec l'équipe pour améliorer l'architecture des applications",
      "Participation aux revues de code et à l'amélioration continue",
    ],
  },
  {
    date: "Projet de fin d'études — 2022",
    title: 'Développeur Web Junior',
    company: 'CGI Studio',
    type: 'internship',
    description: [
      'Création du jeu mobile « Attack Of Zombie » basé sur la Réalité Augmentée (AR)',
      'Initiation au développement web professionnel',
      'Participation au développement de fonctionnalités frontend',
      'Apprentissage des bonnes pratiques de développement',
    ],
  },
  {
    date: 'Stage de perfectionnement — 2021',
    title: 'Développeur Web Junior',
    company: "Office de l'aviation civile et des aéroports",
    type: 'internship',
    description: [
      "Création d'un site web en PHP avec une base de données SQL, de la conception à la mise en ligne",
    ],
  },
  {
    date: "Stage d'initiation — 2020",
    title: 'Découverte de l’informatique',
    company: 'SIMOP TUNISIE',
    type: 'internship',
    description: [
      "Découverte des pratiques matérielles : montage carte mère, ventilateur, RAM, disque dur et installation de Windows 10",
    ],
  },
];

const Experience = () => {
  return (
    <Section id="experience" className="bg-ink-950/40">
      <Backdrop variant="cyan" />

      <SectionHeading
        eyebrow="Parcours"
        title="Expérience professionnelle"
        description="Du premier stage matériel au développement d'applications métier en production."
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Ligne de temps */}
        <div
          aria-hidden
          className="absolute bottom-0 left-[19px] top-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent md:left-1/2 md:-translate-x-px"
        />

        <div className="space-y-8 md:space-y-2">
          {JOBS.map((job, index) => (
            <TimelineItem key={job.title + job.date} job={job} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TimelineItem = ({ job, index }: { job: Job; index: number }) => {
  const isRight = index % 2 === 1;
  const Icon = job.type === 'job' ? Briefcase : GraduationCap;

  return (
    <div
      className={`reveal relative pl-14 md:w-1/2 md:pl-0 ${
        isRight ? 'md:ml-auto md:pl-14' : 'md:pr-14'
      }`}
      style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Point sur la ligne */}
      <span
        className={`absolute left-0 top-6 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-ink-850 text-accent-soft md:top-8 ${
          isRight ? 'md:-left-5' : 'md:-right-5 md:left-auto'
        }`}
      >
        <Icon className="h-[18px] w-[18px]" />
        {job.current && (
          <span
            aria-hidden
            className="absolute inset-0 animate-pulse-ring rounded-xl bg-accent/40"
          />
        )}
      </span>

      <article className="glass glass-hover group p-6 md:my-4">
        <div className="mb-3 flex flex-wrap items-center gap-3">
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

        <h3 className="font-display text-lg font-semibold text-white">
          {job.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-400">
          <Building2 className="h-4 w-4 flex-shrink-0 text-slate-600" />
          {job.company}
        </p>

        <ul className="mt-5 space-y-2.5">
          {job.description.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-400">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50 transition-colors duration-500 group-hover:bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export default Experience;
