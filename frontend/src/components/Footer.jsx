import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-dark-200/80 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary-500" />
            <span className="font-bold text-lg text-white">Emo<span className="text-primary-500">AI</span></span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/api-docs" className="hover:text-white transition-colors">API Docs</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Emotion Detection AI. All rights reserved. Built with React & FastAPI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;