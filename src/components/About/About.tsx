import React from 'react';
import { Code2, Database, Globe } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">À propos de moi</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 mb-6">
             
            Je suis un développeur Full Stack passionné par la création d'applications web modernes, 
            performantes et adaptées aux besoins des utilisateurs.</p>
            <p className="text-gray-600 mb-6">
             Mon parcours m'a permis de bâtir une solide expertise dans le développement frontend avec Angular et React,
              ainsi que dans le développement backend avec .NET 8, Express.js, 
              et l'intégration de protocoles comme MQTT.
              </p>
              <p className="text-gray-600 mb-6">
              Je travaille également avec des technologies avancées comme Tailwind CSS pour un design élégant et réactif,
               et je maîtrise la gestion des bases de données relationnelles (SQL)
                et non relationnelles (MongoDB).
                </p>
                <p className="text-gray-600 mb-6">
                 Toujours curieux et motivé, je reste constamment à l'affût des dernières
                  innovations pour offrir des solutions robustes et évolutives
            </p>
            <p className="text-gray-600 mb-6">
            Ma passion pour le développement web va de pair avec une approche centrée sur la qualité,
            ce qui me permet de concevoir des applications qui répondent aux standards modernes tout
             en étant faciles à maintenir.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <SkillCard
                icon={<Globe className="w-8 h-8 text-blue-600" />}
                title="Frontend"
                description="Développement d'interfaces utilisateur modernes avec Angular & React"
              />
              <SkillCard
                icon={<Database className="w-8 h-8 text-blue-600" />}
                title="Backend"
                description="Création d'APIs robustes avec .NET 8 & Express js "
              />
              <SkillCard
                icon={<Code2 className="w-8 h-8 text-blue-600" />}
                title="Full Stack"
                description="Integration complète frontend-backend"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Mes objectifs</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">1</span>
                <span>Créer des applications web performantes et évolutives</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">2</span>
                <span>Approfondir mes connaissances en architecture logicielle</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">3</span>
                <span>Contribuer à des projets innovants et impactants</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 bg-gray-50 rounded-lg">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default About;