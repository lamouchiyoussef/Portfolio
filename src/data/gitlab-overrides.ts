import type { Project, ProjectCategory, ProjectLink, ProjectStatus } from './projects';
import type { CoverKind } from '../components/Projects/ProjectCover';

/**
 * Choix éditoriaux sur les projets synchronisés depuis GitLab, indexés par
 * chemin complet du dépôt (ex. "lamouchiyoussef/mon-projet").
 *
 * Par défaut :
 * - un dépôt public est affiché, avec son lien de code ;
 * - un dépôt privé/interne est masqué. Mettre `publish: true` après avoir
 *   vérifié que sa description peut être rendue publique (le code, lui,
 *   n'est jamais lié).
 */
export interface GitlabOverride {
  publish?: boolean;
  hidden?: boolean;
  featured?: boolean;
  priority?: number;
  title?: string;
  tagline?: string;
  description?: string;
  category?: ProjectCategory;
  status?: ProjectStatus;
  technologies?: string[];
  features?: string[];
  architecture?: string;
  impact?: string;
  cover?: CoverKind;
  image?: Project['image'];
  demos?: ProjectLink[];
}

export const GITLAB_OVERRIDES: Record<string, GitlabOverride> = {
  // 'lamouchiyoussef/exemple': { category: 'personnel', featured: true },
};
