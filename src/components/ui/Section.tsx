import React from 'react';
import { useReveal } from '../../hooks/useReveal';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/** Enveloppe de section : espacement homogène + révélation au scroll. */
export const Section = ({ id, children, className = '' }: SectionProps) => {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden py-24 md:py-32 ${className}`}
    >
      <div className="container relative z-10 mx-auto px-5 sm:px-8">{children}</div>
    </section>
  );
};

interface HeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

/** Titre de section : petit label, titre en dégradé, filet lumineux. */
export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
}: HeadingProps) => (
  <div
    className={`reveal mb-16 max-w-2xl ${
      align === 'center' ? 'mx-auto text-center' : 'text-left'
    }`}
  >
    <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-soft" />
      {eyebrow}
    </span>
    <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
      {title}
    </h2>
    {description && (
      <p className="text-balance mt-5 text-base leading-relaxed text-slate-400">
        {description}
      </p>
    )}
  </div>
);

/** Décor de fond : grille estompée + halos colorés. */
export const Backdrop = ({
  variant = 'violet',
}: {
  variant?: 'violet' | 'cyan' | 'both';
}) => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
    />
    {(variant === 'violet' || variant === 'both') && (
      <div
        aria-hidden
        className="orb -left-32 top-0 h-[420px] w-[420px] bg-accent/[0.12]"
      />
    )}
    {(variant === 'cyan' || variant === 'both') && (
      <div
        aria-hidden
        className="orb -right-32 bottom-0 h-[420px] w-[420px] bg-cyan-glow/[0.09]"
      />
    )}
  </>
);
