import { useEffect, useRef } from 'react';

/**
 * Écrit dans `--fill` (0 → 1) la part de l'élément déjà passée sous le
 * milieu de l'écran. Sert à « remplir » une ligne de temps au défilement.
 * Mise à jour par requestAnimationFrame, sans re-rendu React.
 */
export const useScrollFill = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--fill', '1');
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const fill = (window.innerHeight * 0.6 - r.top) / r.height;
      el.style.setProperty('--fill', String(Math.min(1, Math.max(0, fill))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return ref;
};
