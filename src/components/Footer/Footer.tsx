import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Lamouchi Youssef</h3>
            <p className="text-gray-400">Développeur Full Stack</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/lamouchiyoussef"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/youssef-lamouchi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:youssef.lamouchi@esprit.tn"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;