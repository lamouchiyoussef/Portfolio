import { Github, Gitlab, Linkedin, Mail } from 'lucide-react';

/** Coordonnées uniques du site : à modifier ici seulement. */
export const PROFILE = {
  name: 'Youssef Lamouchi',
  initials: 'YL',
  title: 'Ingénieur en informatique',
  role: 'Développeur Full Stack .NET / Angular',
  email: 'yousef.lamouchii@gmail.com',
  phone: '+216 22 554 114',
  phoneHref: 'tel:+21622554114',
  location: 'Tunis, Tunisie',
  linkedin: 'https://www.linkedin.com/in/youssef-lamouchi/',
  github: 'https://github.com/lamouchiyoussef',
  gitlab: 'https://gitlab.com/youssef.lamouchi',
  site: 'https://lamouchiyoussef.github.io/Portfolio/',
};

export const SOCIALS = [
  { href: PROFILE.github, label: 'GitHub', Icon: Github },
  { href: PROFILE.gitlab, label: 'GitLab', Icon: Gitlab },
  { href: PROFILE.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: `mailto:${PROFILE.email}`, label: 'Email', Icon: Mail },
];

export const NAV_ITEMS = [
  { id: 'about', label: 'À propos' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
];

/** Expérience calculée depuis le début du poste actuel : jamais à re-éditer. */
const CAREER_START = new Date(2023, 3); // Avril 2023

export const yearsOfExperience = () => {
  const now = new Date();
  const months =
    (now.getFullYear() - CAREER_START.getFullYear()) * 12 +
    (now.getMonth() - CAREER_START.getMonth());
  return Math.max(1, Math.floor(months / 12));
};
