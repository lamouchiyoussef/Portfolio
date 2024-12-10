import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import zombieImage from '../assets/zombie.jpeg';
import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import industrie from '../assets/industrie.jpg';
import food from '../assets/food.jpg';
import labo from '../assets/labo.jpg'

const Projects = () => {
  const projects = [
    {
      title: "Food Safety Smart System",
      description: "Application web complète développée avec Angular 18 et .net 8.",
      technologies: ["Angular", "TypeScript",".Net 8","Sql Server","Tailwind CSS","MQTT"],
      image: food,
      github: "https://github.com/lamouchiyoussef",
      demo: "https://drive.google.com/file/d/17vhZJ6yzgAXHI6m4rLgjLFh3jQZZdBrV/view?usp=sharing"
    },
    {
      title: "Gestion des clients",
      description: "Application web complète développée avec Angular 18 et .net 8.",
      technologies: ["Angular", "TypeScript",".Net 8","Sql Server","Tailwind CSS"],
      image: labo,
      github: "https://github.com/lamouchiyoussef",
      demo: "https://drive.google.com/file/d/1PJhWvy8Rezf4bdqt5vCU-keJCWroMIuQ/view?usp=sharing"
    },
    {
      title: "Industrie 4.0",
      description: "Application web complète développée avec Angular 18 et .net 8.",
      technologies: ["Angular", "TypeScript",".Net 8","Sql Server","Tailwind CSS","MQTT"],
      image: industrie,
      github: "https://github.com/lamouchiyoussef",
      demo: "https://drive.google.com/file/d/1MXuMq4rUuHyy4dVBXskIsFr1TL_iGKC-/view?usp=sharing"
    },
    {
      title: "Système de Traçabilité Universel v1",
      description: "Application web complète développée avec Angular 12.",
      technologies: ["Angular", "TypeScript"],
      image: b1,
      github: "https://cst.tn/wp-content/uploads/2023/07/plaquette-DTU18072023_f.pdf",
      demo: "https://drive.google.com/file/d/1GIjVT55QWKRb0Q4zYKaTqP05KTj6mtnB/view"
    },
    {
      title: "Système de Traçabilité Universel v2",
      description: "Application web complète développée avec Angular 15 et Express Js.",
      technologies: ["Angular", "TypeScript", "Express Js ", "MySql","MQTT"],
      image: b2,
      github: "https://cst.tn/wp-content/uploads/2023/07/plaquette-DTU18072023_f.pdf",
      demo: "https://drive.google.com/file/d/13-JVxOhl2eOvODEzRTJrVReCjjjN8_SB/view"
    },
    {
      title: "Attack Of Zombie",
      description: "Jeu mobile (Attack Of Zombie) basée sur Réalité Augmentée (AR)",
      technologies: ["C#"],
      image: zombieImage,
      github: "https://github.com/lamouchiyoussef",
      demo: "https://drive.google.com/file/d/1_HiwYobVRIkXTDCdCVE0Y4fjfeUOYHnd/view"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projets Récents</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
}

const ProjectCard = ({ title, description, technologies, image, github, demo }: ProjectCardProps) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
    <div className="relative h-48">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Github className="w-5 h-5 mr-2" />
          Code
        </a>
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Demo
        </a>
      </div>
    </div>
  </div>
);

export default Projects;