import React from 'react';
import CV from '../assets/CV_Lamouchi_Youssef.pdf';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Développeur Full Stack
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
              Angular | .NET 8 | Développement Web
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg">
              Passionné par le développement web avec {calculateExperience()} d'expérience.
              Spécialisé dans la création d'applications web modernes avec Angular et .NET.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Me contacter
              </a>
              <a
                href="#projects"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Voir mes projets
              </a>
              <a
                href={CV}// Chemin vers le fichier CV dans le dossier public
                download="Mon_CV.pdf" // Nom par défaut du fichier téléchargé
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Télécharger mon CV
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
              alt="Developer workspace"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const calculateExperience = () => {
  const experience = 1.75; // 1 an et 9 mois
  return experience === Math.floor(experience)
    ? `${experience} ans`
    : `${Math.floor(experience)} an et ${Math.round((experience % 1) * 12)} mois`;
};

export default Hero;
