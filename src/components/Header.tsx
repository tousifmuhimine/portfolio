'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-blue-500/10'
          : 'bg-transparent'
      } border-b border-gray-800/50`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-5">
        <a href="#about" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent px-3 py-1">
              AM
            </div>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative font-medium text-gray-300 hover:text-white transition-colors group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all hover:scale-105"
          >
            <Download size={18} />
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-t border-gray-700">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block p-3 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium"
            >
              <Download size={18} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
