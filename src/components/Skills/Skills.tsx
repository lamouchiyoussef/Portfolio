import React from 'react';

const Skills = () => {
  const skills = {
    frontend: [
      { name: 'Angular', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'RxJS', level: 75 },
    ],
    backend: [
      { name: '.NET 8', level: 80 },
      { name: 'Express Js', level: 85 },
      { name: 'SQL', level: 75 },
      { name: 'RESTful APIs', level: 85 },
    ],
    tools: [
      { name: 'Git', level: 80 },
      { name: 'Vs Code', level: 90 },
      { name: 'Raider', level: 85 },
      { name: 'WebStorm', level: 90 },
    ],
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Compétences Techniques</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <SkillCategory title="Frontend" skills={skills.frontend} />
          <SkillCategory title="Backend" skills={skills.backend} />
          <SkillCategory title="Outils & DevOps" skills={skills.tools} />
        </div>
      </div>
    </section>
  );
};

interface Skill {
  name: string;
  level: number;
}

const SkillCategory = ({ title, skills }: { title: string; skills: Skill[] }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-6">{title}</h3>
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="text-gray-700">{skill.name}</span>
            <span className="text-gray-600">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skills;