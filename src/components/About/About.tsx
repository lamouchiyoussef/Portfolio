import React from 'react';
import { Server, Layout, Cpu, Languages, CheckCircle2 } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import { yearsOfExperience } from '../../data/profile';

const About = () => {
  return (
    <Section id="about">
      <Backdrop variant="violet" />

      <SectionHeading
        eyebrow="À propos"
        title="Du capteur à l'écran, sans perte en route"
        description="Ingénieur en informatique, je construis des applications métier qui font remonter la donnée industrielle jusqu'aux bonnes personnes."
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Récit */}
        <div className="reveal space-y-5 text-[15px] leading-relaxed text-slate-400">
          <p>
            Développeur Full Stack depuis {yearsOfExperience()} ans chez{' '}
            <Hl>Canadian System Technology</Hl>, je travaille sur des solutions
            industrielles : <Hl>traçabilité de production</Hl>, Industrie 4.0 et IoT.
          </p>
          <p>
            Je suis spécialisé dans la conception d'<Hl>API REST avec .NET 8 / ASP.NET
            Core</Hl> et d'<Hl>interfaces Angular performantes</Hl>, au sein d'une
            équipe Agile / Scrum de six développeurs — de la maquette jusqu'à la mise
            en production.
          </p>
          <p>
            Ce qui m'anime, c'est l'<Hl>architecture logicielle</Hl> : découper un
            système en modules clairs, choisir le bon canal entre le terrain et l'écran
            (MQTT, SignalR, API REST) et garder un code que toute l'équipe peut faire
            évoluer.
          </p>
          <p>
            Côté terrain, j'ai mis en place l'acquisition de données capteurs à la
            minute via <Hl>MQTT</Hl> sur cinq lignes de production. Côté utilisateur,
            j'ai ramené le temps de chargement d'une application de 5 s à 2 s grâce au
            lazy loading, à la stratégie OnPush et à la mise en cache.
          </p>
          <p>
            Formé en <Hl>Ingénierie Cloud à ESPRIT</Hl> en cours du soir, j'automatise
            aussi le déploiement avec Docker, GitLab CI/CD et Ansible.
          </p>

          <div className="grid gap-4 pt-6 sm:grid-cols-3">
            <SkillCard
              icon={<Server className="h-5 w-5" />}
              title="Backend"
              description=".NET 8, ASP.NET Core, EF Core, API sécurisées JWT"
              delay={0}
            />
            <SkillCard
              icon={<Layout className="h-5 w-5" />}
              title="Frontend"
              description="Angular 18, RxJS, TypeScript, Tailwind CSS"
              delay={90}
            />
            <SkillCard
              icon={<Cpu className="h-5 w-5" />}
              title="Industrie 4.0"
              description="MQTT, capteurs temps réel, intégration ERP"
              delay={180}
            />
          </div>
        </div>

        {/* Ce que j'apporte */}
        <div
          className="reveal space-y-6"
          style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
        >
          <div className="glass glass-hover glow-border p-8">
            <span
              aria-hidden
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
            />

            <h3 className="mb-6 font-display text-xl font-semibold text-white">
              Ce que j'apporte à une équipe
            </h3>

            <ul className="space-y-4">
              {STRENGTHS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <Languages className="h-[18px] w-[18px] text-cyan-glow" />
              <h3 className="font-display text-base font-semibold text-white">Langues</h3>
            </div>
            <dl className="grid grid-cols-3 gap-3">
              {LANGUAGES.map(({ name, level }) => (
                <div
                  key={name}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center"
                >
                  <dt className="text-sm font-medium text-slate-200">{name}</dt>
                  <dd className="mt-0.5 text-xs text-slate-500">{level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
};

const STRENGTHS = [
  'Une vision de bout en bout : base de données, API, interface et déploiement',
  'Le réflexe performance : mesurer, optimiser, prouver le gain',
  "L'habitude du terrain industriel : ERP, postes de production, capteurs",
  'La rigueur d\'équipe : Scrum, revues de code, tests unitaires',
];

const LANGUAGES = [
  { name: 'Arabe', level: 'Maternelle' },
  { name: 'Français', level: 'Pro (B2)' },
  { name: 'Anglais', level: 'Pro (B2)' },
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
    className="reveal glass glass-hover glow-border group p-5"
    style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
  >
    <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-cyan-glow/10 text-accent-soft icon-pop">
      {icon}
    </span>
    <h3 className="mb-1.5 font-display text-base font-semibold text-white">
      {title}
    </h3>
    <p className="text-[13px] leading-relaxed text-slate-500">{description}</p>
  </div>
);

export default About;
