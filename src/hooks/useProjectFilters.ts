import { useMemo, useState } from 'react';
import { CATEGORY_LABELS, type Project, type ProjectCategory } from '../data/projects';

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as ProjectCategory[];

export type SortMode = 'pertinence' | 'date';

/** Normalise pour une recherche insensible à la casse et aux accents. */
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Recherche, filtres (catégorie, techno) et tri sur une liste de projets. */
export const useProjectFilters = (projects: Project[]) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [tech, setTech] = useState<string>('all');
  const [sort, setSort] = useState<SortMode>('pertinence');

  // Catégories et technologies réellement présentes, triées par fréquence.
  const { categories, technologies } = useMemo(() => {
    const cats = new Set<ProjectCategory>();
    const counts = new Map<string, number>();
    for (const p of projects) {
      cats.add(p.category);
      for (const t of p.technologies) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return {
      categories: CATEGORY_ORDER.filter((c) => cats.has(c)),
      technologies: [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([t]) => t),
    };
  }, [projects]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    const filtered = projects.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (tech !== 'all' && !p.technologies.includes(tech)) return false;
      if (!q) return true;
      return norm([p.title, p.tagline, ...p.technologies].join(' ')).includes(q);
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'date') {
        // Projets sans date connue en dernier.
        if (a.date && b.date) return b.date.localeCompare(a.date);
        if (a.date || b.date) return a.date ? -1 : 1;
      }
      return b.priority - a.priority;
    });
  }, [projects, query, category, tech, sort]);

  const isFiltered = query !== '' || category !== 'all' || tech !== 'all';

  const reset = () => {
    setQuery('');
    setCategory('all');
    setTech('all');
  };

  return {
    query, setQuery,
    category, setCategory,
    tech, setTech,
    sort, setSort,
    categories, technologies,
    results, isFiltered, reset,
  };
};
