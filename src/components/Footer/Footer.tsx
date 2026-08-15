import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const LINKS = [
  { id: 'about', label: 'À propos' },
  { id: 'experience', label: 'Expérience' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const SOCIALS = [
  { href: 'https://github.com/lamouchiyoussef', label: 'GitHub', Icon: Github },
  {
    href: 'https://www.linkedin.com/in/youssef-lamouchi/',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  { href: 'mailto:youssef.lamouchi@esprit.tn', label: 'Email', Icon: Mail },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div aria-hidden className="orb -bottom-40 left-1/2 h-64 w-[560px] -translate-x-1/2 bg-accent/10" />

      <div className="container relative z-10 mx-auto px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Identité */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-deep to-accent font-display text-sm font-bold text-white">
                LY
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  Lamouchi Youssef
                </h3>
                <p className="text-xs text-slate-500">Développeur Full Stack</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              Applications web modernes avec Angular et .NET 8. Basé à Tunis,
              disponible pour de nouveaux projets.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation du pied de page">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-1">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Réseaux */}
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
              Me suivre
            </h4>
            <div className="flex gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-7 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Lamouchi Youssef. Tous droits réservés.
          </p>
          <p className="font-mono text-xs text-slate-600">
            Construit avec React, Vite &amp; Tailwind CSS
          </p>
          <a
            href="#home"
            aria-label="Retour en haut"
            className="group inline-flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-accent-soft"
          >
            Haut de page
            <ArrowUp
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
