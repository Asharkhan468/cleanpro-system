"use client"

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpiral, 
  faHome, 
  faCalendarCheck, 
  faArrowRight,
  faBars,
  faTimes,
  faInfoCircle,
  faClipboardList,
  faBrush,
  faStar
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', icon: faHome, label: 'Home' },
    { href: '#about', icon: faInfoCircle, label: 'About' },
    { href: '#process', icon: faClipboardList, label: 'Process' },
    { href: '#services', icon: faBrush, label: 'Services' },
    { href: '#testimonials', icon: faStar, label: 'Testimonials' },
    { href: '/booking', icon: faCalendarCheck, label: 'Book Service' }
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with icon */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faSpiral} className="text-white text-sm" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              CleanPro
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                <FontAwesomeIcon icon={link.icon} className="mr-2 text-blue-500" />
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            {/* CTA Button */}
            <button className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium text-sm hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              className="text-gray-600 text-xl"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={link.icon} className="mr-3 text-blue-500 w-5" />
                {link.label}
              </a>
            ))}
            <button className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
              <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}