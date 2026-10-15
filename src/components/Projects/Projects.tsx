import React from 'react';
import { PlayCircle, FileText, Lock, Boxes } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import zombieImage from '../assets/zombie.jpeg';
import b2 from '../assets/b2.jpg';
import industrie from '../assets/industrie.jpg';
import food from '../assets/food.jpg';
import labo from '../assets/labo.jpg';

interface ProjectLink {
  label: string;
  href: string;
  kind: 'demo' | 'doc';
}

interface Project {
  title: string;
  tag: string;
  description: string;
  impact?: string;
  technologies: string[];
  image?: string;
  links: ProjectLink[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'Système Universel de Traçabilité',
    tag: 'Industrie 4.0 · B1 / B2',
    description:
      'Traçabilité temps réel de la production : relevés capteurs à la minute via MQTT, historisation des lots et tableaux de bord pour les responsables de ligne.',
    impact: 'Déployé sur 5 lignes de production',
    technologies: ['Angular', '.NET 8', 'SQL Server', 'MQTT', 'Express.js'],
    image: b2,
    links: [
      { label: 'Démo v2', href: 'https://drive.google.com/file/d/13-JVxOhl2eOvODEzRTJrVReCjjjN8_SB/view', kind: 'demo' },
      { label: 'Démo v1', href: 'https://drive.google.com/file/d/1GIjVT55QWKRb0Q4zYKaTqP05KTj6mtnB/view', kind: 'demo' },
      { label: 'Plaquette', href: 'https://cst.tn/wp-content/uploads/2023/07/plaquette-DTU18072023_f.pdf', kind: 'doc' },
    ],
    featured: true,
  },
  {
    title: 'Système Intelligent de Sécurité Alimentaire',
    tag: 'IoT · HACCP',
    description:
      'Surveillance des points critiques HACCP et alerting : capteurs, seuils et notifications en temps réel.',
    technologies: ['Angular', '.NET 8', 'SQL Server', 'MQTT', 'Tailwind CSS'],
    image: food,
    links: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/17vhZJ6yzgAXHI6m4rLgjLFh3jQZZdBrV/view?usp=sharing', kind: 'demo' },
    ],
  },
  {
    title: 'B2B Labo Dhaouadi',
    tag: 'Plateforme B2B',
    description:
      "Plateforme de commande et de suivi d'analyses pour laboratoires, de la demande au résultat.",
    impact: 'Déployée chez 5 clients',
    technologies: ['Angular', 'Tailwind CSS', 'API REST .NET'],
    image: labo,
    links: [],
  },
  {
    title: 'Industrie 4.0 — Suivi de production',
    tag: 'Industrie 4.0',
    description:
      'Remontée des machines en MQTT et visualisation des indicateurs de production en temps réel.',
    technologies: ['Angular', '.NET 8', 'SQL Server', 'MQTT'],
    image: industrie,
    links: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/1MXuMq4rUuHyy4dVBXskIsFr1TL_iGKC-/view?usp=sharing', kind: 'demo' },
    ],
  },
  {
    title: 'Gestion des Clients & Gestion de Stock',
    tag: 'CRM · Inventaire',
    description:
      "Modules CRM et gestion d'inventaire pour clients industriels : CRUD complet, filtres avancés et exports.",
    technologies: ['Angular', '.NET 8', 'SQL Server', 'Tailwind CSS'],
    links: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/1PJhWvy8Rezf4bdqt5vCU-keJCWroMIuQ/view?usp=sharing', kind: 'demo' },
    ],
  },
  {
    title: 'Attack Of Zombie',
    tag: "Réalité Augmentée · PFE",
    description:
      "Jeu mobile en Réalité Augmentée développé chez CGI Studio : gameplay, détection de surface et interface.",
    technologies: ['Unity', 'C#', 'AR'],
    image: zombieImage,
    links: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/1_HiwYobVRIkXTDCdCVE0Y4fjfeUOYHnd/view', kind: 'demo' },
    ],
  },
];

const Projects = () => {
  return (
    <Section id="projects">
      <Backdrop variant="violet" />

      <SectionHeading
        eyebrow="Réalisations"
        title="Projets en production"
        description="Des applications livrées à des clients industriels — et un détour par la réalité augmentée."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) =>
          project.featured ? (
            <FeaturedCard key={project.title} project={project} />
          ) : (
            <ProjectCard key={project.title} project={project} index={index} />
          )
        )}
      </div>

      <p className="reveal mt-10 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
        <Lock size={13} />
        Code source propriétaire : les démos vidéo montrent les applications réelles.
      </p>
    </Section>
  );
};

/** Projet phare : occupe toute la largeur, image et texte côte à côte. */
const FeaturedCard = ({ project }: { project: Project }) => (
  <article className="reveal glass group grid overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-glow md:col-span-2 lg:col-span-3 lg:grid-cols-[1.1fr_1fr]">
    <div className="relative min-h-[240px] overflow-hidden lg:min-h-[360px]">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink-850/90"
      />
      <span className="absolute left-5 top-5 rounded-full border border-accent/30 bg-ink-900/80 px-3 py-1 text-[11px] font-medium text-accent-soft backdrop-blur-sm">
        ★ Projet phare
      </span>
    </div>

    <div className="flex flex-col p-7 sm:p-9">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-glow">
        {project.tag}
      </span>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{project.description}</p>
      {project.impact && <Impact text={project.impact} />}
      <Chips items={project.technologies} />
      <Links links={project.links} title={project.title} />
    </div>
  </article>
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { title, tag, description, impact, technologies, image, links } = project;

  return (
    <article
      className="reveal glass group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-glow"
      style={{ '--reveal-delay': `${(index % 3) * 110}ms` } as React.CSSProperties}
    >
      <div className="relative h-44 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          // Pas de capture disponible : visuel de remplacement
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/20 via-ink-800 to-cyan-glow/10">
            <Boxes className="h-14 w-14 text-accent-soft/60 transition-transform duration-700 group-hover:scale-110" />
          </div>
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/30 to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-glow/80">
          {tag}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-accent-soft">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">{description}</p>
        {impact && <Impact text={impact} />}
        <Chips items={technologies} />
        <Links links={links} title={title} />
      </div>
    </article>
  );
};

const Impact = ({ text }: { text: string }) => (
  <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    {text}
  </p>
);

const Chips = ({ items }: { items: string[] }) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {items.map((tech) => (
      <span key={tech} className="chip text-[11px]">
        {tech}
      </span>
    ))}
  </div>
);

const Links = ({ links, title }: { links: ProjectLink[]; title: string }) => (
  <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/[0.06] pt-5">
    {links.length === 0 ? (
      <span className="inline-flex items-center gap-2 text-sm text-slate-500">
        <Lock size={15} />
        Projet client — démo sur demande
      </span>
    ) : (
      links.map(({ label, href, kind }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} — ${title}`}
          className={
            kind === 'demo'
              ? 'inline-flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:border-accent/50 hover:bg-accent/20'
              : 'inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors duration-300 hover:border-white/25 hover:text-white'
          }
        >
          {kind === 'demo' ? <PlayCircle size={16} /> : <FileText size={16} />}
          {label}
        </a>
      ))
    )}
  </div>
);

export default Projects;
