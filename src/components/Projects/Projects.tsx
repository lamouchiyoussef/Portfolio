import React, { useState } from 'react';
import { Search, SearchX, ArrowRight, Boxes, X } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import { PROJECTS, CATEGORY_LABELS, type Project } from '../../data/projects';
import { useProjectFilters, type SortMode } from '../../hooks/useProjectFilters';
import ProjectModal, { SourceButton } from './ProjectModal';

const FEATURED = PROJECTS.filter((p) => p.featured).sort((a, b) => b.priority - a.priority);

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const f = useProjectFilters(PROJECTS);
  const [lead, ...others] = FEATURED;

  return (
    <Section id="projects">
      <Backdrop variant="violet" />

      <SectionHeading
        eyebrow="Réalisations"
        title="Mes projets"
        description="Des applications livrées à des clients industriels, des projets personnels et académiques."
      />

      {/* À la une */}
      {lead && (
        <div className="mb-20">
          <SubHeading>À la une</SubHeading>
          <div className="grid gap-6 md:grid-cols-2">
            <FeaturedCard project={lead} onOpen={setSelected} />
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </div>
        </div>
      )}

      {/* Catalogue complet */}
      <SubHeading>
        Tous les projets <span className="text-slate-600">· {PROJECTS.length}</span>
      </SubHeading>

      <div className="reveal glass mb-8 flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Rechercher un projet</span>
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={f.query}
              onChange={(e) => f.setQuery(e.target.value)}
              placeholder="Nom du projet ou technologie…"
              className={`${fieldClasses} w-full pl-10`}
            />
          </label>

          <div className="grid grid-cols-2 gap-3 md:flex">
            <label>
              <span className="sr-only">Filtrer par technologie</span>
              <select
                value={f.tech}
                onChange={(e) => f.setTech(e.target.value)}
                className={`${fieldClasses} w-full md:w-48`}
              >
                <option value="all">Technologie</option>
                {f.technologies.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Trier</span>
              <select
                value={f.sort}
                onChange={(e) => f.setSort(e.target.value as SortMode)}
                className={`${fieldClasses} w-full md:w-40`}
              >
                <option value="pertinence">Pertinence</option>
                <option value="date">Plus récents</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Catégorie">
          {(['all', ...f.categories] as const).map((c) => {
            const active = f.category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => f.setCategory(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'border-accent/50 bg-accent/20 text-white'
                    : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                }`}
              >
                {c === 'all' ? 'Tous' : CATEGORY_LABELS[c]}
              </button>
            );
          })}
          {f.isFiltered && (
            <button
              type="button"
              onClick={f.reset}
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-accent-soft"
            >
              <X size={13} />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mb-5 text-sm text-slate-500">
        {f.results.length} projet{f.results.length > 1 ? 's' : ''}
        {f.isFiltered ? ' correspondant' + (f.results.length > 1 ? 's' : '') : ''}
      </p>

      {f.results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {f.results.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </div>
      ) : (
        <div className="glass flex flex-col items-center px-6 py-16 text-center">
          <SearchX className="mb-4 h-10 w-10 text-slate-600" />
          <p className="font-display text-lg font-semibold text-white">Aucun projet trouvé</p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Essayez un autre mot-clé ou retirez un filtre.
          </p>
          <button type="button" onClick={f.reset} className="btn-ghost mt-6 px-5 py-2.5 text-sm">
            Afficher tous les projets
          </button>
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
};

const fieldClasses =
  'rounded-xl border border-white/10 bg-ink-900/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 transition-colors focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/40 [&>option]:bg-ink-850';

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="reveal mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
    {children}
    <span aria-hidden className="h-px flex-1 bg-white/[0.06]" />
  </h3>
);

/** Projet principal : occupe toute la largeur, image et texte côte à côte. */
const FeaturedCard = ({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) => (
  <article className="reveal glass group grid overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-glow md:col-span-2 lg:grid-cols-[1.1fr_1fr]">
    <div className="relative min-h-[240px] overflow-hidden lg:min-h-[340px]">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      ) : (
        <Placeholder />
      )}
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
        {CATEGORY_LABELS[project.category]}
      </span>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{project.tagline}</p>
      {project.impact && <Impact text={project.impact} />}
      <Chips items={project.technologies} max={6} />
      <Actions project={project} onOpen={onOpen} />
    </div>
  </article>
);

// Pas de classe `reveal` : les cartes sont remontées à chaque filtrage.
const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) => (
  <article className="glass group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-glow">
    <div className="relative h-44 overflow-hidden">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      ) : (
        <Placeholder />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/30 to-transparent"
      />
      {project.featured && (
        <span className="absolute left-4 top-4 rounded-full border border-accent/30 bg-ink-900/80 px-2.5 py-0.5 text-[11px] font-medium text-accent-soft backdrop-blur-sm">
          ★
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-glow/80">
        {CATEGORY_LABELS[project.category]}
      </span>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-accent-soft">
        {project.title}
      </h3>
      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
        {project.tagline}
      </p>
      {project.impact && <Impact text={project.impact} />}
      <Chips items={project.technologies} max={4} />
      <Actions project={project} onOpen={onOpen} />
    </div>
  </article>
);

const Placeholder = () => (
  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/20 via-ink-800 to-cyan-glow/10">
    <Boxes className="h-14 w-14 text-accent-soft/60 transition-transform duration-700 group-hover:scale-110" />
  </div>
);

const Impact = ({ text }: { text: string }) => (
  <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    {text}
  </p>
);

const Chips = ({ items, max }: { items: string[]; max: number }) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {items.slice(0, max).map((tech) => (
      <span key={tech} className="chip text-[11px]">
        {tech}
      </span>
    ))}
    {items.length > max && <span className="chip text-[11px]">+{items.length - max}</span>}
  </div>
);

const Actions = ({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) => (
  <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/[0.06] pt-5">
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className="group/btn inline-flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:border-accent/50 hover:bg-accent/20"
    >
      Voir le projet
      <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
    </button>
    <SourceButton project={project} />
  </div>
);

export default Projects;
