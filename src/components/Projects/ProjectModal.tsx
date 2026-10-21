import { useEffect, useRef } from 'react';
import { X, PlayCircle, FileText, Gitlab, Lock, CheckCircle2, Layers } from 'lucide-react';
import { CATEGORY_LABELS, STATUS_LABELS, type Project } from '../../data/projects';

/**
 * Fenêtre de détails d'un projet. Basée sur <dialog> : focus piégé, fermeture
 * par Échap et rendu au-dessus de tout, sans dépendance.
 */
const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Écouteur natif : la fermeture par Échap passe par l'événement `close`,
  // qui ne remonte pas de façon fiable via la prop React.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handle = () => onCloseRef.current();
    dialog.addEventListener('close', handle);
    return () => dialog.removeEventListener('close', handle);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!project && dialog.open) dialog.close();
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      // Clic sur le fond (hors contenu) : fermeture.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink-850 p-0 text-slate-300 shadow-card backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-ink-900/80 text-slate-300 backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-white"
          >
            <X size={18} />
          </button>
          <div className="max-h-[92vh] overflow-y-auto">
            {project.image && (
              <div className="relative h-48 sm:h-64">
                <img src={project.image} alt="" className="h-full w-full object-cover" />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-850 to-transparent"
                />
              </div>
            )}

            <div className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-cyan-glow/25 text-cyan-glow">
                  {CATEGORY_LABELS[project.category]}
                </span>
                {project.status && <span className="chip">{STATUS_LABELS[project.status]}</span>}
                {project.date && (
                  <span className="chip">
                    {new Date(project.date).toLocaleDateString('fr-FR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>

              <h2
                id="project-modal-title"
                className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
                {project.description}
              </p>

              {project.impact && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-sm font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {project.impact}
                </p>
              )}

              {project.features.length > 0 && (
                <section className="mt-8">
                  <h3 className="mb-3 font-display text-base font-semibold text-white">
                    Fonctionnalités
                  </h3>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-soft" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.architecture && (
                <section className="mt-8">
                  <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-white">
                    <Layers className="h-4 w-4 text-cyan-glow" />
                    Architecture
                  </h3>
                  <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 font-mono text-[13px] leading-relaxed text-slate-400">
                    {project.architecture}
                  </p>
                </section>
              )}

              <section className="mt-8">
                <h3 className="mb-3 font-display text-base font-semibold text-white">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
                {project.demos.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent/50 hover:bg-accent/20"
                  >
                    <PlayCircle size={16} />
                    {d.label}
                  </a>
                ))}
                {project.docs.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <FileText size={16} />
                    {d.label}
                  </a>
                ))}
                <SourceButton project={project} />
              </div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

/** Lien « Code source » pour un dépôt public, mention neutre sinon. */
export const SourceButton = ({ project }: { project: Project }) =>
  project.sourceUrl ? (
    <a
      href={project.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Code source de ${project.title}`}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white"
    >
      <Gitlab size={16} />
      Code source
    </a>
  ) : (
    <span
      title="Code propriétaire, non publié"
      className="inline-flex items-center gap-2 rounded-lg px-1 py-2.5 text-sm text-slate-500"
    >
      <Lock size={15} />
      Code privé
    </span>
  );

export default ProjectModal;
