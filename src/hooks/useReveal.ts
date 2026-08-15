import { useEffect, useRef, useState } from 'react';

/**
 * Ajoute la classe `is-visible` aux éléments `.reveal` contenus dans le nœud
 * référencé, dès qu'ils entrent dans le viewport. Un seul observer par section,
 * et l'élément n'est plus observé une fois révélé.
 */
export const useReveal = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.reveal');

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
};

/**
 * Passe à `true` la première fois que l'élément entre dans le viewport.
 * Utile pour déclencher une animation qui ne se joue qu'une fois (barres de
 * progression, compteurs…).
 */
export const useInView = <T extends HTMLElement = HTMLElement>(
  threshold = 0.3
) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

/**
 * Renvoie l'id de la section actuellement la plus visible, pour surligner le
 * lien de navigation correspondant.
 */
export const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // On garde la section la plus visible à l'écran.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (best) setActive(best.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
