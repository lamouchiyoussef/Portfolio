import React from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { useActiveSection } from '../../hooks/useReveal';

const NAV_ITEMS = [
  { id: 'about', label: 'À propos' },
  { id: 'experience', label: 'Expérience' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = ['home', ...NAV_ITEMS.map((i) => i.id)];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const active = useActiveSection(SECTION_IDS);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Empêche le défilement de l'arrière-plan quand le menu mobile est ouvert.
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-5 sm:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <a href="#home" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-deep to-accent font-display text-sm font-bold text-white shadow-glow">
              LY
            </span>
            <span className="hidden font-display text-base font-semibold text-white sm:block">
              Lamouchi Youssef
              <span className="block font-sans text-[11px] font-normal text-slate-500">
                Développeur Full Stack
              </span>
            </span>
          </a>

          {/* Navigation desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative rounded-lg px-4 py-2 text-sm transition-colors duration-300 ${
                  active === item.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <SocialLinks />
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-accent/60 hover:bg-accent/20"
            >
              Discutons
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-200 transition-colors hover:border-accent/40 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Panneau mobile */}
      <div
        className={`overflow-hidden border-t border-white/[0.06] bg-ink-900/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          isMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto flex flex-col gap-1 px-5 py-6 sm:px-8">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsMenuOpen(false)}
              style={{ transitionDelay: `${index * 40}ms` }}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                active === item.id
                  ? 'bg-accent/10 text-white'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs text-slate-600">
                0{index + 1}
              </span>
            </a>
          ))}
          <div className="mt-4 flex justify-center gap-6 border-t border-white/[0.06] pt-5">
            <SocialLinks />
          </div>
        </div>
      </div>
    </header>
  );
};

const SOCIALS = [
  {
    href: 'https://github.com/lamouchiyoussef',
    label: 'GitHub',
    Icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/youssef-lamouchi/',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  {
    href: 'mailto:youssef.lamouchi@esprit.tn',
    label: 'Email',
    Icon: Mail,
  },
];

const SocialLinks = () => (
  <div className="flex items-center gap-2">
    {SOCIALS.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={label}
        className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
      >
        <Icon size={18} />
      </a>
    ))}
  </div>
);

export default Header;
