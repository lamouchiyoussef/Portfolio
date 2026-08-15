import React from 'react';
import { Layout, Server, Wrench } from 'lucide-react';
import { Section, SectionHeading, Backdrop } from '../ui/Section';
import { useInView } from '../../hooks/useReveal';

interface Skill {
  name: string;
  level: number;
}

const CATEGORIES: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  skills: Skill[];
}[] = [
  {
    title: 'Frontend',
    icon: <Layout className="h-5 w-5" />,
    accent: 'from-accent to-accent-soft',
    skills: [
      { name: 'Angular', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML / CSS', level: 90 },
      { name: 'RxJS', level: 75 },
    ],
  },
  {
    title: 'Backend',
    icon: <Server className="h-5 w-5" />,
    accent: 'from-cyan-glow to-sky-400',
    skills: [
      { name: '.NET 8', level: 80 },
      { name: 'Express.js', level: 85 },
      { name: 'SQL', level: 75 },
      { name: 'APIs RESTful', level: 85 },
    ],
  },
  {
    title: 'Outils & DevOps',
    icon: <Wrench className="h-5 w-5" />,
    accent: 'from-emerald-400 to-teal-300',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'VS Code', level: 90 },
      { name: 'JetBrains Rider', level: 85 },
      { name: 'WebStorm', level: 90 },
    ],
  },
];

const ALSO = [
  'React',
  'Tailwind CSS',
  'MongoDB',
  'MySQL',
  'SQL Server',
  'MQTT',
  'PHP',
  'C#',
  'Vite',
];

const Skills = () => {
  return (
    <Section id="skills">
      <Backdrop variant="both" />

      <SectionHeading
        eyebrow="Stack"
        title="Compétences techniques"
        description="Les technologies que j'utilise au quotidien, du composant Angular à la base de données."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {CATEGORIES.map((category, index) => (
          <SkillCategory key={category.title} {...category} delay={index * 120} />
        ))}
      </div>

      {/* Technologies secondaires */}
      <div
        className="reveal mt-14 text-center"
        style={{ '--reveal-delay': '200ms' } as React.CSSProperties}
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Également à l'aise avec
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {ALSO.map((tech) => (
            <span
              key={tech}
              className="chip hover:border-accent/40 hover:bg-accent/10 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

const SkillCategory = ({
  title,
  icon,
  accent,
  skills,
  delay,
}: {
  title: string;
  icon: React.ReactNode;
  accent: string;
  skills: Skill[];
  delay: number;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className="reveal glass glass-hover group p-7"
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="mb-7 flex items-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${accent} text-ink-900 transition-transform duration-500 group-hover:scale-110`}
        >
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-5">
        {skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-sm text-slate-300">{skill.name}</span>
              <span className="font-mono text-xs text-slate-500">
                {skill.level}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                role="progressbar"
                aria-label={skill.name}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                className={`h-full rounded-full bg-gradient-to-r ${accent}`}
                style={{
                  width: inView ? `${skill.level}%` : '0%',
                  transition: `width 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${
                    delay + i * 110
                  }ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
