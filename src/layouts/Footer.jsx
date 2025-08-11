import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black backdrop-blur-md border-t border-dark-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary-500 mb-4">
              Code Buddy
            </h3>
            <p className="text-gray-300 text-sm">
              Learn programming with expert instructors in small, interactive
              online classes.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <a
                href="mailto:info@codebuddy.com"
                className="flex items-center text-gray-300 hover:text-primary-500 transition-colors text-sm"
              >
                <FaEnvelope className="mr-2" /> info@codebuddy.com
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-500 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-500 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-dark-200 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Code Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
