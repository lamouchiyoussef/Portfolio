import type { Project } from './projects';

/**
 * Projets issus de l'analyse des dépôts GitLab privés (le 21/10/2026).
 *
 * Règles appliquées :
 * - dépôts privés (employeur ou clients freelance) : aucun lien vers le code ;
 * - noms de clients et de produits internes anonymisés ;
 * - uniquement des informations vérifiées dans les dépôts (README, manifests
 *   package.json / .csproj, structure des modules, hubs temps réel).
 */
export const GITLAB_CURATED_PROJECTS: Project[] = [
  {
    id: 'gestion-hoteliere-vision',
    title: 'Gestion hôtelière & vision par ordinateur',
    tagline:
      "Plateforme hôtelière web et mobile, avec un service d'IA qui analyse les photos de contrôle des chambres.",
    description:
      "Plateforme de gestion hôtelière composée d'un back-office web, d'une application mobile pour le personnel et d'un microservice de vision par ordinateur. Ce service analyse les photos des checklists de chambres : détection et comptage d'objets, comparaison avec l'inventaire, signalement d'anomalies, puis validation humaine. Les opérations sont diffusées en temps réel.",
    category: 'professionnel',
    status: 'en-cours',
    date: '2026-10-16',
    technologies: [
      'Angular 18',
      'ASP.NET Core',
      'SignalR',
      'SQL Server',
      'Python',
      'FastAPI',
      'Ionic',
      'Capacitor',
      'Tailwind CSS',
      'Angular Material',
      'Chart.js',
      'Three.js',
      'Leaflet',
    ],
    features: [
      'Analyse IA des photos de chambres : détection, comptage, anomalies',
      "Comparaison automatique avec l'inventaire attendu, puis validation humaine",
      'Application mobile du personnel : passages en chambre, room service, historique',
      'Suivi des opérations en temps réel (SignalR)',
      'Back-office web de gestion hôtelière et administration',
      'Modèles de vision exécutés en local, sur CPU par défaut (GPU optionnel)',
    ],
    architecture:
      'Frontend Angular 18 · API ASP.NET Core + hub SignalR · base SQL Server · app mobile Ionic / Capacitor (Android) · microservice Python 3.12 / FastAPI appelé uniquement par le backend.',
    cover: 'vision',
    demos: [],
    docs: [],
    visibility: 'private',
    featured: true,
    priority: 95,
    origin: 'gitlab',
  },
  {
    id: 'wms-laboratoire',
    title: "Gestion d'entrepôt (WMS) pour laboratoire",
    tagline:
      "WMS sur mesure pour un laboratoire : graphiques, exports PDF et alertes MQTT diffusées en temps réel.",
    description:
      "Système de gestion d'entrepôt développé pour un laboratoire, en complément de sa plateforme B2B. Le backend .NET reçoit des données via MQTT et pousse les alertes vers l'interface en temps réel grâce à SignalR.",
    category: 'professionnel',
    status: 'en-cours',
    date: '2026-10-12',
    technologies: [
      'Angular 18',
      '.NET',
      'SignalR',
      'MQTT',
      'SQL Server',
      'Tailwind CSS',
      'Angular Material',
      'Chart.js',
      'jsPDF',
    ],
    features: [
      'Alertes diffusées en temps réel (hub SignalR dédié)',
      'Réception et relais des messages MQTT',
      'Graphiques (Chart.js)',
      'Génération de documents PDF',
    ],
    architecture:
      'Frontend Angular 18 · API .NET avec hubs SignalR (alertes, MQTT) · base de données SQL dédiée.',
    cover: 'warehouse',
    demos: [],
    docs: [],
    visibility: 'private',
    priority: 75,
    origin: 'gitlab',
  },
  {
    id: 'rh-pointage',
    title: 'Gestion RH & pointage',
    tagline: 'Applications de gestion des ressources humaines et de pointage des employés.',
    description:
      'Deux applications métier construites sur le même socle : la gestion des ressources humaines et le pointage des employés, avec exports Excel.',
    category: 'professionnel',
    date: '2026-10-12',
    technologies: ['Angular 18', 'ASP.NET Core', 'MediatR', 'Tailwind CSS', 'Angular Material', 'Chart.js', 'Excel'],
    features: ['Gestion des ressources humaines', 'Pointage des employés', 'Exports Excel'],
    architecture: 'Frontend Angular 18 · API ASP.NET Core organisée avec MediatR.',
    cover: 'hr',
    demos: [],
    docs: [],
    visibility: 'private',
    priority: 55,
    origin: 'gitlab',
  },
  {
    id: 'import-mesures',
    title: 'Import & historisation de mesures',
    tagline:
      'Application full stack qui importe des fichiers de mesures JSONL dans PostgreSQL, avec dédoublonnage.',
    description:
      "Application d'import de mesures : les fichiers JSONL sont chargés dans une base PostgreSQL existante, et une mesure est ignorée si elle existe déjà (même identifiant et même horodatage). L'API est documentée avec Swagger et protégée par JWT. L'ensemble démarre avec Docker.",
    category: 'professionnel',
    date: '2026-10-12',
    technologies: ['React', 'Vite', 'Material UI', 'Express.js', 'PostgreSQL', 'Sequelize', 'JWT', 'Docker', '.NET 8'],
    features: [
      'Import de fichiers JSONL (upload Multer)',
      'Dédoublonnage des mesures par identifiant et horodatage',
      'API REST documentée (Swagger) et protégée par JWT',
      'Démarrage complet via Docker Compose',
    ],
    architecture:
      'Frontend React / Vite + Material UI · API Express + Sequelize · PostgreSQL · client bureau .NET 8 · Docker Compose.',
    cover: 'import',
    demos: [],
    docs: [],
    visibility: 'private',
    priority: 45,
    origin: 'gitlab',
  },
  {
    id: 'plateforme-immobiliere',
    title: 'Plateforme immobilière',
    tagline: 'Plateforme web immobilière pour le marché tunisien, avec cartographie interactive.',
    description:
      "Plateforme immobilière développée en freelance : site public, espace d'administration et authentification, avec cartographie interactive et fonctionnalités temps réel. Frontend et backend sont conteneurisés.",
    category: 'freelance',
    status: 'en-cours',
    date: '2026-10-12',
    technologies: ['Angular 18', '.NET', 'SignalR', 'Leaflet', 'Tailwind CSS', 'Angular Material', 'Docker'],
    features: [
      'Site public et espace d’administration',
      'Authentification',
      'Cartographie interactive (Leaflet)',
      'Fonctionnalités temps réel (SignalR)',
      'Exports Excel',
    ],
    architecture: 'Frontend Angular 18 · API .NET · conteneurs Docker (Docker Compose).',
    cover: 'map',
    demos: [],
    docs: [],
    visibility: 'private',
    featured: true,
    priority: 85,
    origin: 'gitlab',
  },
  {
    id: 'plateforme-educative',
    title: 'Plateforme éducative',
    tagline: 'Plateforme éducative en ligne : site public, authentification et espace d’administration.',
    description:
      "Plateforme éducative développée en freelance, avec un site public, l'authentification des utilisateurs et un espace d'administration. Frontend Angular 18 et backend .NET, conteneurisés avec Docker.",
    category: 'freelance',
    date: '2026-10-12',
    technologies: ['Angular 18', '.NET', 'SignalR', 'Tailwind CSS', 'Angular Material', 'Docker'],
    features: ['Site public', 'Authentification', "Espace d'administration", 'Conteneurisation Docker'],
    architecture: 'Frontend Angular 18 · API .NET · Docker.',
    cover: 'education',
    demos: [],
    docs: [],
    visibility: 'private',
    priority: 40,
    origin: 'gitlab',
  },
  {
    id: 'application-connectee-mqtt',
    title: 'Application web connectée (MQTT)',
    tagline: 'Application web avec tableau de bord, gestion des rôles et backend Node.js connecté en MQTT.',
    description:
      "Application développée en freelance : site vitrine (services, contact, vidéo de présentation), inscription et connexion avec gestion des rôles, tableau de bord et modules de gestion (CRUD). Le backend Node.js communique en MQTT et stocke ses données dans MySQL.",
    category: 'freelance',
    status: 'termine',
    date: '2025-10-03',
    technologies: ['Angular', 'PrimeNG', 'Chart.js', 'Express.js', 'MQTT', 'MySQL', 'Sequelize', 'JWT'],
    features: [
      'Site vitrine : services, contact, vidéo de présentation',
      'Inscription / connexion et gestion des rôles',
      'Tableau de bord',
      'Modules de gestion (CRUD)',
      'Exports Excel et PDF',
    ],
    architecture: 'Frontend Angular + PrimeNG · API Express.js + Sequelize · MySQL · broker MQTT · authentification JWT.',
    cover: 'iot',
    demos: [],
    docs: [],
    visibility: 'private',
    priority: 35,
    origin: 'gitlab',
  },
];
