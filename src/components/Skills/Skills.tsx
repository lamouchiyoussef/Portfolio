import React from 'react';
import {
  siAngular,
  siTypescript,
  siJavascript,
  siHtml5,
  siCss3,
  siReactivex,
  siTailwindcss,
  siIonic,
  siReact,
  siDotnet,
  siNodedotjs,
  siJsonwebtokens,
  siSwagger,
  siMysql,
  siPostgresql,
  siMongodb,
  siDocker,
  siGitlab,
  siAnsible,
  siGit,
  siLinux,
  siJira,
  siMqtt,
  siPython,
  siFastapi,
  siPytorch,
} from 'simple-icons';
import {
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  BrainCircuit,
  Braces,
  Code2,
  Radio,
  ScanSearch,
  Factory,
  Route,
  Workflow,
} from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import { useTilt } from '../../hooks/useTilt';
import TechIcon from './TechIcon';
import { iconColor, type IconSource } from './iconSource';

interface Tech {
  name: string;
  icon: IconSource;
}

interface Category {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  techs: Tech[];
  span?: string;
}

/** Uniquement des technologies présentes dans le CV ou dans les dépôts analysés. */
const CATEGORIES: Category[] = [
  {
    title: 'Frontend',
    description: 'Interfaces web et mobiles réactives',
    span: 'lg:col-span-2',
    icon: <Layout className="h-5 w-5" />,
    accent: 'from-[#F0408B] to-accent',
    techs: [
      { name: 'Angular 18', icon: { brand: siAngular, color: '#F0408B' } },
      { name: 'TypeScript', icon: { brand: siTypescript } },
      { name: 'JavaScript', icon: { brand: siJavascript } },
      { name: 'HTML5', icon: { brand: siHtml5 } },
      { name: 'CSS3', icon: { brand: siCss3 } },
      { name: 'RxJS', icon: { brand: siReactivex } },
      { name: 'Tailwind CSS', icon: { brand: siTailwindcss } },
      { name: 'Ionic / Capacitor', icon: { brand: siIonic } },
      { name: 'React', icon: { brand: siReact } },
    ],
  },
  {
    title: 'Backend',
    description: 'API robustes et temps réel',
    icon: <Server className="h-5 w-5" />,
    accent: 'from-accent to-[#6366f1]',
    techs: [
      { name: '.NET 8', icon: { brand: siDotnet, color: '#A78BFA' } },
      { name: 'C#', icon: { lucide: Code2, color: '#A78BFA' } },
      { name: 'ASP.NET Core', icon: { brand: siDotnet, color: '#C4B5FD' } },
      { name: 'API REST', icon: { lucide: Braces, color: '#22D3EE' } },
      { name: 'SignalR', icon: { lucide: Workflow, color: '#22D3EE' } },
      { name: 'JWT', icon: { brand: siJsonwebtokens } },
      { name: 'Swagger', icon: { brand: siSwagger } },
      { name: 'Express.js', icon: { brand: siNodedotjs } },
    ],
  },
  {
    title: 'Bases de données',
    description: 'Modélisation et historisation',
    icon: <Database className="h-5 w-5" />,
    accent: 'from-amber-300 to-orange-400',
    techs: [
      { name: 'SQL Server', icon: { lucide: Database, color: '#F87171' } },
      { name: 'PostgreSQL', icon: { brand: siPostgresql, color: '#7AA2F7' } },
      { name: 'MySQL', icon: { brand: siMysql, color: '#5AA0D8' } },
      { name: 'MongoDB', icon: { brand: siMongodb } },
    ],
  },
  {
    title: 'Intelligence artificielle',
    description: 'Vision par ordinateur en production',
    span: 'lg:col-span-2',
    icon: <BrainCircuit className="h-5 w-5" />,
    accent: 'from-fuchsia-400 to-pink-400',
    techs: [
      { name: 'Python', icon: { brand: siPython, color: '#FFD43B' } },
      { name: 'FastAPI', icon: { brand: siFastapi } },
      { name: 'PyTorch', icon: { brand: siPytorch } },
      { name: 'Vision par ordinateur', icon: { lucide: ScanSearch, color: '#F472B6' } },
    ],
  },
  {
    title: 'DevOps & outils',
    description: 'Conteneurs et livraison continue',
    span: 'lg:col-span-2',
    icon: <Cloud className="h-5 w-5" />,
    accent: 'from-cyan-glow to-sky-500',
    techs: [
      { name: 'Docker', icon: { brand: siDocker } },
      { name: 'GitLab CI/CD', icon: { brand: siGitlab } },
      { name: 'Ansible', icon: { brand: siAnsible, color: '#F87171' } },
      { name: 'Git', icon: { brand: siGit } },
      { name: 'Linux', icon: { brand: siLinux } },
      { name: 'Jira', icon: { brand: siJira, color: '#4C9AFF' } },
    ],
  },
  {
    title: 'IoT & industrie',
    description: 'Du capteur au tableau de bord',
    icon: <Cpu className="h-5 w-5" />,
    accent: 'from-emerald-400 to-teal-300',
    techs: [
      { name: 'MQTT', icon: { brand: siMqtt, color: '#C084FC' } },
      { name: 'Capteurs temps réel', icon: { lucide: Radio, color: '#34D399' } },
      { name: 'Traçabilité', icon: { lucide: Route, color: '#34D399' } },
      { name: 'MES / TRS', icon: { lucide: Factory, color: '#34D399' } },
    ],
  },
];

const Skills = () => (
  <Section id="skills" className="bg-ink-950/40">
    <Backdrop variant="both" />

    <SectionHeading
      eyebrow="Stack"
      title="Compétences techniques"
      description="Les technologies que j'utilise réellement dans mes projets, du composant Angular au modèle de vision."
    />

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((category, index) => (
        <div
          key={category.title}
          className={`reveal ${category.span ?? ''}`}
          style={{ '--reveal-delay': `${(index % 3) * 90}ms` } as React.CSSProperties}
        >
          <SkillCategory category={category} />
        </div>
      ))}
    </div>
  </Section>
);

const SkillCategory = ({ category }: { category: Category }) => {
  const tilt = useTilt<HTMLDivElement>(3);
  const { title, description, icon, accent, techs, span } = category;

  return (
    <div ref={tilt} className="glass glow-border tilt tilt-sheen group h-full p-6 sm:p-7">
      <div className="mb-6 flex items-center gap-3.5">
        <span
          className={`icon-pop grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${accent} text-ink-900 shadow-lg`}
        >
          {icon}
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>

      <ul className={`grid gap-2.5 ${span ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
        {techs.map((t) => (
          <li
            key={t.name}
            className="group/tech flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
            style={{ '--tech': iconColor(t.icon) } as React.CSSProperties}
          >
            <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-white/[0.04] transition-transform duration-300 group-hover/tech:scale-110 group-hover/tech:[box-shadow:0_0_16px_-4px_var(--tech)]">
              <TechIcon src={t.icon} size={16} />
            </span>
            <span className="truncate text-[13px] font-medium text-slate-200">{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
