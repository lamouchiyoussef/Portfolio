import React from 'react';
import { Layout, Server, Database, Cloud, Users } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';

interface Category {
  title: string;
  icon: React.ReactNode;
  accent: string;
  /** Technologies principales, mises en avant. */
  core: string[];
  other: string[];
  span?: string;
}

const CATEGORIES: Category[] = [
  {
    title: 'Backend',
    icon: <Server className="h-5 w-5" />,
    accent: 'from-accent to-accent-soft',
    core: ['.NET 8', 'ASP.NET Core', 'C#', 'Entity Framework Core'],
    other: ['API REST', 'JWT', 'MQTT', 'Node.js', 'Express.js'],
    span: 'lg:col-span-2',
  },
  {
    title: 'Frontend',
    icon: <Layout className="h-5 w-5" />,
    accent: 'from-cyan-glow to-sky-400',
    core: ['Angular 18', 'TypeScript', 'RxJS'],
    other: ['JavaScript ES6+', 'React', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Bases de données',
    icon: <Database className="h-5 w-5" />,
    accent: 'from-amber-300 to-orange-400',
    core: ['SQL Server'],
    other: ['MySQL', 'MongoDB'],
  },
  {
    title: 'DevOps & outils',
    icon: <Cloud className="h-5 w-5" />,
    accent: 'from-emerald-400 to-teal-300',
    core: ['Docker', 'GitLab CI/CD'],
    other: ['Ansible', 'Git', 'Linux', 'Jira'],
  },
  {
    title: 'Méthodes & domaines',
    icon: <Users className="h-5 w-5" />,
    accent: 'from-pink-400 to-fuchsia-400',
    core: ['Agile / Scrum', 'Industrie 4.0', 'IoT'],
    other: ['Tests unitaires', 'Revue de code'],
  },
];

const Skills = () => {
  return (
    <Section id="skills" className="bg-ink-950/40">
      <Backdrop variant="both" />

      <SectionHeading
        eyebrow="Stack"
        title="Compétences techniques"
        description="Les outils que j'utilise au quotidien, de la base de données au pipeline de déploiement."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category, index) => (
          <SkillCategory key={category.title} category={category} delay={index * 90} />
        ))}
      </div>
    </Section>
  );
};

const SkillCategory = ({ category, delay }: { category: Category; delay: number }) => {
  const { title, icon, accent, core, other, span = '' } = category;

  return (
    <div
      className={`reveal glass glass-hover group p-7 ${span}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="mb-6 flex items-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accent} text-ink-900 transition-transform duration-500 group-hover:scale-110`}
        >
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label={`${title} — principales`}>
        {core.map((tech) => (
          <li
            key={tech}
            className="rounded-lg border border-white/15 bg-white/[0.07] px-3 py-1.5 text-sm font-medium text-white"
          >
            {tech}
          </li>
        ))}
      </ul>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${title} — autres`}>
        {other.map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
