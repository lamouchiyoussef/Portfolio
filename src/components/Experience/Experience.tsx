import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Expérience Professionnelle</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <ExperienceItem
              date="Avril 2023 - Présent"
              title="Développeur Full Stack"
              company="Canadian System Technology"
              description={[
                "Développement d'applications web avec Angular et .NET 8",
                "Conception et implémentation d'APIs RESTful",
                "Collaboration avec l'équipe pour améliorer l'architecture des applications",
                "Participation aux revues de code et à l'amélioration continue"
              ]}
              position="right"
            />

            <ExperienceItem
              date="Projet fin d'études - 2022"
              title="Développeur Web Junior"
              company="CGI Studio"
              description={[
                "Créer un jeu mobile (Attack Of Zombie) basée sur Réalité Augmentée (AR) ",
                "Initiation au développement web professionnel",
                "Participation au développement de fonctionnalités frontend",
                "Apprentissage des bonnes pratiques de développement"
              ]}
              position="left"
            />
                <ExperienceItem
              date="Stage de perfectionnement - 2021"
              title="Développeur Web Junior"
              company="Office de l'aviation civile et des aéroports"
              description={[
                "Au cours de ce stage, j'ai créé un site web à travers le langage de programmation PHP et une base de données avec SQL "
               
              ]}
              position="right"
            />
              <ExperienceItem
              date="Stage d'initiation - 2020"
              title="Développeur Web Junior"
              company="SIMOP TUNISIE"
              description={[
                "Ce stage m' a permis de bien découvrir les pratiques de l'informatique tels que installation carte mère, ventilateur, ram, disque dur et installation windows 10.",
            
              ]}
              position="left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface ExperienceItemProps {
  date: string;
  title: string;
  company: string;
  description: string[];
  position: 'left' | 'right';
}

const ExperienceItem = ({ date, title, company, description, position }: ExperienceItemProps) => {
  const isRight = position === 'right';
  const containerClasses = `flex md:w-1/2 ${isRight ? 'md:ml-auto' : 'md:mr-auto'} mb-8`;
  const contentClasses = `bg-white p-6 rounded-lg shadow-lg ${isRight ? 'md:ml-6' : 'md:mr-6'}`;

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <span className="text-sm text-blue-600 font-semibold">{date}</span>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <p className="text-gray-600 mb-4">{company}</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;