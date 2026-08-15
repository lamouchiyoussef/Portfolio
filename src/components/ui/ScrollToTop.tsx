import React from 'react';
import { ArrowUp } from 'lucide-react';

/** Bouton de retour en haut, avec anneau de progression du scroll. */
const ScrollToTop = () => {
  const [progress, setProgress] = React.useState(0);
  const visible = progress > 8;

  React.useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Retour en haut de la page"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-ink-850/90 text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-accent/50 hover:text-white ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {/* Anneau de progression */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(#8b5cf6 ${progress}%, transparent ${progress}%)`,
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
        }}
      />
      <ArrowUp size={18} className="relative z-10" />
    </button>
  );
};

export default ScrollToTop;
