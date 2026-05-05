'use client';

import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Roles', href: '#roles' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const resumes = [
  { name: 'AF', href: '/resumeAF.pdf' },
  { name: 'AI', href: '/others/resumeA.pdf' },
  { name: 'Full-stack', href: '/others/resumeF.pdf' },
  { name: 'ML/DL', href: '/others/resumeM.pdf' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#about" className="brand-mark" aria-label="Go to top">
          <span>AM</span>
          <small>Tousif</small>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link">
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {resumes.map((resume) => (
            <a key={resume.name} href={resume.href} download className="resume-chip">
              <Download size={15} />
              {resume.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="mobile-menu-button lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="mobile-panel lg:hidden">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
              {item.name}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {resumes.map((resume) => (
              <a key={resume.name} href={resume.href} download className="resume-chip justify-center">
                <Download size={15} />
                {resume.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
