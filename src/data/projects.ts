import zombieImage from '../components/assets/zombie.jpeg';
import b2 from '../components/assets/b2.jpg';
import industrie from '../components/assets/industrie.jpg';
import food from '../components/assets/food.jpg';
import labo from '../components/assets/labo.jpg';
import gitlabProjects from './gitlab-projects.json';
import { GITLAB_OVERRIDES } from './gitlab-overrides';
import { GITLAB_CURATED_PROJECTS } from './projects-gitlab';

/**
 * Source unique des projets affichés sur le site.
 *
 * - MANUAL_PROJECTS : projets décrits à la main (code propriétaire).
 * - projects-gitlab.ts : projets analysés dans les dépôts GitLab privés.
 * - gitlab-projects.json : généré par `npm run sync:gitlab`, ne pas éditer.
 * - gitlab-overrides.ts : corrections et choix éditoriaux sur les projets GitLab.
 */

export type ProjectCategory =
  | 'professionnel'
  | 'freelance'
  | 'personnel'
  | 'academique'
  | 'stage'
  | 'autre';
export type ProjectStatus = 'termine' | 'en-cours' | 'experimental' | 'archive';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  /** Ligne courte affichée sur la carte. */
  tagline: string;
  /** Texte complet de la fenêtre de détails. */
  description: string;
  category: ProjectCategory;
  status?: ProjectStatus;
  /** Date ISO (dernière activité connue), utilisée pour le tri. */
  date?: string;
  technologies: string[];
  features: string[];
  architecture?: string;
  impact?: string;
  image?: string;
  demos: ProjectLink[];
  docs: ProjectLink[];
  /** Lien vers le code : uniquement pour un dépôt public. */
  sourceUrl?: string;
  visibility: 'public' | 'private';
  featured?: boolean;
  /** Plus la valeur est haute, plus le projet remonte en tri « pertinence ». */
  priority: number;
  origin: 'manual' | 'gitlab';
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  professionnel: 'Professionnel',
  freelance: 'Freelance',
  personnel: 'Personnel',
  academique: 'Académique',
  stage: 'Stage / PFE',
  autre: 'Autre',
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  termine: 'Terminé',
  'en-cours': 'En cours',
  experimental: 'Expérimental',
  archive: 'Archivé',
};

const MANUAL_PROJECTS: Project[] = [
  {
    id: 'tracabilite',
    title: 'Système Universel de Traçabilité',
    tagline:
      'Traçabilité temps réel de la production : relevés capteurs à la minute via MQTT, historisation et tableaux de bord.',
    description:
      "Produit de traçabilité industrielle développé chez Canadian System Technology. Les données des capteurs sont collectées à la minute via MQTT, historisées en base, puis restituées dans des tableaux de bord. Une première version (B1) a été suivie d'une refonte complète (B2).",
    category: 'professionnel',
    technologies: ['Angular', '.NET 8', 'SQL Server', 'MQTT', 'Express.js', 'MySQL'],
    features: [
      'Relevés capteurs à la minute via MQTT',
      'Historisation de la production',
      'Tableaux de bord de suivi',
      'Version B1 (Angular 12) puis refonte B2 (Angular 15, Express.js, MySQL)',
    ],
    architecture:
      'Frontend Angular · API backend (.NET 8, Express.js pour la B2) · base relationnelle (SQL Server / MySQL) · broker MQTT pour les capteurs.',
    impact: 'Déployé sur 5 lignes de production',
    image: b2,
    demos: [
      { label: 'Démo v2', href: 'https://drive.google.com/file/d/13-JVxOhl2eOvODEzRTJrVReCjjjN8_SB/view' },
      { label: 'Démo v1', href: 'https://drive.google.com/file/d/1GIjVT55QWKRb0Q4zYKaTqP05KTj6mtnB/view' },
    ],
    docs: [
      { label: 'Plaquette', href: 'https://cst.tn/wp-content/uploads/2023/07/plaquette-DTU18072023_f.pdf' },
    ],
    visibility: 'private',
    featured: true,
    priority: 100,
    origin: 'manual',
  },
  {
    id: 'securite-alimentaire',
    title: 'Système Intelligent de Sécurité Alimentaire',
    tagline:
      'Surveillance des points critiques HACCP et alerting, avec notifications en temps réel.',
    description:
      'Application de surveillance des points critiques (HACCP) développée chez Canadian System Technology : suivi des mesures, alertes et notifications en temps réel.',
    category: 'professionnel',
    technologies: ['Angular', '.NET 8', 'SQL Server', 'MQTT', 'Tailwind CSS'],
    features: [
      'Surveillance des points critiques HACCP',
      'Alerting',
      'Notifications en temps réel',
    ],
    image: food,
    demos: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/17vhZJ6yzgAXHI6m4rLgjLFh3jQZZdBrV/view?usp=sharing' },
    ],
    docs: [],
    visibility: 'private',
    priority: 90,
    origin: 'manual',
  },
  {
    id: 'b2b-labo',
    title: 'B2B Labo Dhaouadi',
    tagline: "Plateforme B2B de commande et de suivi d'analyses pour laboratoires.",
    description:
      "Plateforme B2B permettant aux clients d'un laboratoire de commander des analyses et d'en suivre l'avancement. Déployée chez 5 clients.",
    category: 'professionnel',
    technologies: ['Angular', 'Tailwind CSS', 'API REST .NET'],
    features: ["Commande d'analyses", 'Suivi des analyses'],
    impact: 'Déployée chez 5 clients',
    image: labo,
    demos: [],
    docs: [],
    visibility: 'private',
    priority: 80,
    origin: 'manual',
  },
  {
    id: 'industrie-40',
    title: 'Industrie 4.0 — Suivi de production (MES)',
    tagline:
      "Suivi de production connecté : remontée des machines, applications mobiles pour l'atelier et pour le gérant.",
    description:
      "Solution MES de suivi de production industrielle. Les machines remontent leurs données en temps réel et deux applications mobiles s'appuient sur la même API : une application opérateur pour l'atelier, et une application de supervision en lecture seule pour le gérant (production du jour, rejets, TRS, équipes par ligne).",
    category: 'professionnel',
    status: 'en-cours',
    date: '2026-10-21',
    technologies: ['Angular 18', 'Ionic', 'Capacitor', '.NET', 'SQL Server', 'SignalR', 'MQTT'],
    features: [
      'App opérateur : ordres de fabrication, lignes de production, prélèvements, arrêts',
      'Visualisation temps réel et monitoring des machines',
      'App gérant (lecture seule) : production du jour bon / brut, taux de rejet',
      'Indicateurs TRS et disponibilité, OF actifs et en retard, alertes',
      'Équipes par ligne : présence, heures travaillées, machine et OF',
    ],
    architecture:
      'Frontend web Angular · API .NET + SQL Server · deux apps mobiles Ionic 8 / Angular 18 / Capacitor 8 partageant la même API et la même authentification.',
    image: industrie,
    demos: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/1MXuMq4rUuHyy4dVBXskIsFr1TL_iGKC-/view?usp=sharing' },
    ],
    docs: [],
    visibility: 'private',
    featured: true,
    priority: 92,
    origin: 'manual',
  },
  {
    id: 'gestion-clients-stock',
    title: 'Gestion des Clients & Gestion de Stock',
    tagline: "Modules CRM et gestion d'inventaire pour clients industriels.",
    description:
      "Modules CRM et gestion d'inventaire développés pour des clients industriels : gestion complète des fiches, filtres avancés et exports.",
    category: 'professionnel',
    technologies: ['Angular', '.NET 8', 'SQL Server', 'Tailwind CSS'],
    features: ['Gestion des clients (CRM)', "Gestion d'inventaire", 'Filtres avancés et exports'],
    demos: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/1PJhWvy8Rezf4bdqt5vCU-keJCWroMIuQ/view?usp=sharing' },
    ],
    docs: [],
    visibility: 'private',
    priority: 60,
    origin: 'manual',
  },
  {
    id: 'attack-of-zombie',
    title: 'Attack Of Zombie',
    tagline: 'Jeu mobile en Réalité Augmentée réalisé en projet de fin d’études chez CGI Studio.',
    description:
      "Jeu mobile en Réalité Augmentée développé pendant le projet de fin d'études chez CGI Studio (février – juin 2022).",
    category: 'stage',
    status: 'termine',
    date: '2022-06-30',
    technologies: ['Unity', 'C#', 'Réalité Augmentée'],
    features: ['Gameplay', 'Détection de surface', 'Interface utilisateur'],
    image: zombieImage,
    demos: [
      { label: 'Démo', href: 'https://drive.google.com/file/d/1_HiwYobVRIkXTDCdCVE0Y4fjfeUOYHnd/view' },
    ],
    docs: [],
    visibility: 'private',
    priority: 50,
    origin: 'manual',
  },
];

/** Forme d'un projet dans le JSON généré par scripts/sync-gitlab.mjs. */
interface GitlabProject {
  id: number;
  path: string;
  name: string;
  description: string;
  readmeSummary: string;
  features: string[];
  technologies: string[];
  languages: string[];
  topics: string[];
  visibility: 'public' | 'private' | 'internal';
  webUrl: string;
  demoUrl?: string;
  image?: string;
  archived: boolean;
  createdAt: string;
  lastActivityAt: string;
}

const fromGitlab = (p: GitlabProject): Project | null => {
  const o = GITLAB_OVERRIDES[p.path] ?? {};
  const isPublic = p.visibility === 'public';

  // Un dépôt privé ou interne n'est publié qu'après relecture explicite.
  if (o.hidden || (!isPublic && !o.publish)) return null;

  const summary = p.description || p.readmeSummary;
  return {
    id: `gitlab-${p.id}`,
    title: o.title ?? p.name,
    tagline: o.tagline ?? summary,
    description: o.description ?? (p.readmeSummary || p.description),
    category: o.category ?? 'autre',
    status: o.status ?? (p.archived ? 'archive' : undefined),
    date: p.lastActivityAt,
    technologies: o.technologies ?? [...new Set([...p.technologies, ...p.languages])].slice(0, 10),
    features: o.features ?? p.features,
    architecture: o.architecture,
    impact: o.impact,
    image: o.image ?? (isPublic ? p.image : undefined),
    demos: o.demos ?? (p.demoUrl ? [{ label: 'Démo en ligne', href: p.demoUrl }] : []),
    docs: [],
    // Jamais de lien de code pour un dépôt non public.
    sourceUrl: isPublic ? p.webUrl : undefined,
    visibility: isPublic ? 'public' : 'private',
    featured: o.featured,
    priority: o.priority ?? 10,
    origin: 'gitlab',
  };
};

export const PROJECTS: Project[] = [
  ...MANUAL_PROJECTS,
  ...GITLAB_CURATED_PROJECTS,
  ...(gitlabProjects as GitlabProject[])
    .map(fromGitlab)
    .filter((p): p is Project => p !== null),
];
