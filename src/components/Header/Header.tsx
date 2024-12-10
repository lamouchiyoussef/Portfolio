import React from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-gray-800">
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <SocialLinks />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6">
            <NavLinks mobile />
            <div className="flex justify-center space-x-6 mt-4">
              <SocialLinks />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLinks = ({ mobile }: { mobile?: boolean }) => {
  const baseClasses = mobile
    ? "flex flex-col space-y-4 items-center"
    : "flex space-x-8";
  
  return (
    <div className={baseClasses}>
      <a href="#about" className="hover:text-blue-600 transition-colors">À propos</a>
      <a href="#experience" className="hover:text-blue-600 transition-colors">Expérience</a>
      <a href="#skills" className="hover:text-blue-600 transition-colors">Compétences</a>
      <a href="#projects" className="hover:text-blue-600 transition-colors">Projets</a>
      <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
    </div>
  );
};

const SocialLinks = () => (
  <div className="flex items-center space-x-4">
    <a
      href="https://github.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Github size={20} />
    </a>
    <a
      href="https://linkedin.com/in/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Linkedin size={20} />
    </a>
    <a
      href="mailto:your.email@example.com"
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Mail size={20} />
    </a>
  </div>
);

export default Header;