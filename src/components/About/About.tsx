import React from 'react';
import { Code2, Database, Globe, Target } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';

const About = () => {
  return (
    <Section id="about">
      <Backdrop variant="violet" />

      <SectionHeading
        eyebrow="À propos"
        title="Construire du web qui tient dans le temps"
        description="Développeur Full Stack, je transforme des besoins métier en applications claires, rapides et maintenables."
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Récit */}
        <div className="reveal space-y-5 text-[15px] leading-relaxed text-slate-400">
          <p>
            Je suis un développeur Full Stack passionné par la création
            d'applications web modernes, performantes et adaptées aux besoins des
            utilisateurs.
          </p>
          <p>
            Mon parcours m'a permis de bâtir une solide expertise dans le
            développement frontend avec{' '}
            <Hl>Angular et React</Hl>, ainsi que dans le développement backend avec{' '}
            <Hl>.NET 8, Express.js</Hl> et l'intégration de protocoles comme{' '}
            <Hl>MQTT</Hl>.
          </p>
          <p>
            Je travaille également avec des technologies avancées comme Tailwind CSS
            pour un design élégant et réactif, et je maîtrise la gestion des bases de
            données relationnelles (SQL) et non relationnelles (MongoDB).
          </p>
          <p>
            Toujours curieux et motivé, je reste constamment à l'affût des dernières
            innovations pour offrir des solutions robustes et évolutives. Ma passion
            pour le développement va de pair avec une approche centrée sur la qualité :
            des applications aux standards modernes et faciles à maintenir.
          </p>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            <SkillCard
              icon={<Globe className="h-5 w-5" />}
              title="Frontend"
              description="Interfaces modernes avec Angular & React"
              delay={0}
            />
            <SkillCard
              icon={<Database className="h-5 w-5" />}
              title="Backend"
              description="APIs robustes avec .NET 8 & Express.js"
              delay={90}
            />
            <SkillCard
              icon={<Code2 className="h-5 w-5" />}
              title="Full Stack"
              description="Intégration complète front ↔ back"
              delay={180}
            />
          </div>
        </div>

        {/* Objectifs */}
        <div
          className="reveal"
          style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
        >
          <div className="glass glass-hover group p-8">
            {/* Filet lumineux en haut de carte */}
            <span
              aria-hidden
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            <div className="mb-8 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent-soft">
                <Target className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-white">
                Mes objectifs
              </h3>
            </div>

            <ol className="space-y-6">
              {GOALS.map((goal, index) => (
                <li key={goal} className="flex gap-4">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/10 font-mono text-sm font-medium text-accent-soft">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-[15px] leading-relaxed text-slate-300">
                    {goal}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <p className="font-mono text-xs leading-relaxed text-slate-500">
                <span className="text-accent-soft">{'// '}</span>
                Ouvert aux opportunités Full Stack, Angular ou .NET.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const GOALS = [
  'Créer des applications web performantes et évolutives',
  'Approfondir mes connaissances en architecture logicielle',
  'Contribuer à des projets innovants et impactants',
];

const Hl = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-slate-200">{children}</span>
);

const SkillCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <div
    className="reveal glass glass-hover group p-5"
    style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
  >
    <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-cyan-glow/10 text-accent-soft transition-transform duration-500 group-hover:scale-110">
      {icon}
    </span>
    <h3 className="mb-1.5 font-display text-base font-semibold text-white">
      {title}
    </h3>
    <p className="text-[13px] leading-relaxed text-slate-500">{description}</p>
  </div>
);

export default About;
