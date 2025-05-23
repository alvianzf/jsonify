import React from 'react';
import { Github, HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} JSONify. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/alvianzf/jsonify"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <div className="flex items-center text-gray-600 text-sm">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500 mx-1" />
              <span>by Alvian Zachry Faturrahman</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;