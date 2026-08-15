import React from 'react';
import { Github, PlayCircle, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import zombieImage from '../assets/zombie.jpeg';
import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import industrie from '../assets/industrie.jpg';
import food from '../assets/food.jpg';
import labo from '../assets/labo.jpg';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'Food Safety Smart System',
    description:
      "Plateforme de supervision de la sécurité alimentaire : capteurs temps réel via MQTT, tableaux de bord et alertes.",
    technologies: ['Angular', 'TypeScript', '.NET 8', 'SQL Server', 'Tailwind CSS', 'MQTT'],
    image: food,
    github: 'https://github.com/lamouchiyoussef',
    demo: 'https://drive.google.com/file/d/17vhZJ6yzgAXHI6m4rLgjLFh3jQZZdBrV/view?usp=sharing',
    featured: true,
  },
  {
    title: 'Gestion des clients',
    description:
      'Application de gestion de clients et de laboratoires : CRUD complet, filtres avancés et exports.',
    technologies: ['Angular', 'TypeScript', '.NET 8', 'SQL Server', 'Tailwind CSS'],
    image: labo,
    github: 'https://github.com/lamouchiyoussef',
    demo: 'https://drive.google.com/file/d/1PJhWvy8Rezf4bdqt5vCU-keJCWroMIuQ/view?usp=sharing',
  },
  {
    title: 'Industrie 4.0',
    description:
      "Suivi de production industrielle connecté : remontée des machines en MQTT et visualisation des indicateurs.",
    technologies: ['Angular', 'TypeScript', '.NET 8', 'SQL Server', 'Tailwind CSS', 'MQTT'],
    image: industrie,
    github: 'https://github.com/lamouchiyoussef',
    demo: 'https://drive.google.com/file/d/1MXuMq4rUuHyy4dVBXskIsFr1TL_iGKC-/view?usp=sharing',
  },
  {
    title: 'Système de Traçabilité Universel v1',
    description:
      "Première version du produit de traçabilité : architecture Angular 12 et suivi complet des lots.",
    technologies: ['Angular', 'TypeScript'],
    image: b1,
    github: 'https://cst.tn/wp-content/uploads/2023/07/plaquette-DTU18072023_f.pdf',
    demo: 'https://drive.google.com/file/d/1GIjVT55QWKRb0Q4zYKaTqP05KTj6mtnB/view',
  },
  {
    title: 'Système de Traçabilité Universel v2',
    description:
      "Refonte complète : Angular 15, backend Express.js, MySQL et communication MQTT temps réel.",
    technologies: ['Angular', 'TypeScript', 'Express.js', 'MySQL', 'MQTT'],
    image: b2,
    github: 'https://cst.tn/wp-content/uploads/2023/07/plaquette-DTU18072023_f.pdf',
    demo: 'https://drive.google.com/file/d/13-JVxOhl2eOvODEzRTJrVReCjjjN8_SB/view',
  },
  {
    title: 'Attack Of Zombie',
    description:
      'Jeu mobile en Réalité Augmentée (AR) développé sous Unity dans le cadre du projet de fin d’études.',
    technologies: ['C#', 'Unity', 'AR'],
    image: zombieImage,
    github: 'https://github.com/lamouchiyoussef',
    demo: 'https://drive.google.com/file/d/1_HiwYobVRIkXTDCdCVE0Y4fjfeUOYHnd/view',
  },
];

const Projects = () => {
  return (
    <Section id="projects" className="bg-ink-950/40">
      <Backdrop variant="violet" />

      <SectionHeading
        eyebrow="Réalisations"
        title="Projets récents"
        description="Une sélection d'applications livrées, du produit industriel connecté au jeu en réalité augmentée."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { title, description, technologies, image, github, demo, featured } = project;

  return (
    <article
      className="reveal glass group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-glow"
      style={{ '--reveal-delay': `${(index % 3) * 110}ms` } as React.CSSProperties}
    >
      {/* Visuel */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        {/* Fondu vers le fond de carte */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/40 to-transparent"
        />
        {featured && (
          <span className="absolute left-4 top-4 rounded-full border border-accent/30 bg-ink-900/80 px-3 py-1 text-[11px] font-medium text-accent-soft backdrop-blur-sm">
            ★ Projet phare
          </span>
        )}
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir la démo de ${title}`}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-ink-900/70 text-slate-300 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:text-white group-hover:opacity-100"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-accent-soft">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="chip text-[11px]">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:border-accent/50 hover:bg-accent/20"
          >
            <PlayCircle size={16} />
            Démo
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Code ou documentation de ${title}`}
            className="grid h-[42px] w-[42px] place-items-center rounded-lg border border-white/10 text-slate-400 transition-colors duration-300 hover:border-white/25 hover:text-white"
          >
            <Github size={17} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default Projects;
