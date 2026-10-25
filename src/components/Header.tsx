'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Download, Menu, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: '// WORK', href: '#projects' },
  { name: '// ABOUT', href: '#story' },
  { name: '// STACK', href: '#skills' },
  { name: '// CONTACT', href: '#contact' },
];

const resumes = [
  { name: 'AF', href: '/resumeAF.pdf' },
  { name: 'AI', href: '/others/resumeA.pdf' },
  { name: 'Full-stack', href: '/others/resumeF.pdf' },
  { name: 'ML/DL', href: '/others/resumeM.pdf' },
];

export default function Header({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
    >
      <nav className="section-container flex items-center justify-between py-5">
        {/* Exact Layout from Screenshot: [ AM ] - ABDULLAH AL MUHAIMINE */}
        <a href="#about" className="flex items-center gap-2 group" aria-label="Go to top">
          <span className="font-mono text-xs font-bold text-white/50 tracking-wider">
            [ <span className="text-[#3df5ff]">AM</span> ]
          </span>
          <span className="font-mono text-xs text-white/40">—</span>
          <span className="font-mono text-xs font-bold tracking-widest text-[#ecebe6] uppercase group-hover:text-[#3df5ff] transition-colors">
            ABDULLAH AL MUHAIMINE
          </span>
        </a>

        {/* Center Nav: // WORK // ABOUT // STACK // CONTACT */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`font-mono text-xs font-semibold tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-[#3df5ff]'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right Status from Screenshot: ● AVAILABLE + ⌘K & Resumes */}
        <div className="flex items-center gap-4">
          {/* AVAILABLE Indicator */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#3df5ff]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3df5ff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3df5ff]" />
            </span>
            <span>AVAILABLE</span>
          </div>

          {/* Quick Command Palette Button */}
          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden sm:flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/60 hover:border-[#3df5ff]/40 hover:text-[#3df5ff] transition-all"
              title="Command Palette (⌘K)"
            >
              <Command size={12} />
              <span>⌘K</span>
            </button>
          )}

          {/* Resume Downloads */}
          <div className="hidden md:flex items-center gap-1 border-l border-white/10 pl-3">
            {resumes.map((resume) => (
              <a
                key={resume.name}
                href={resume.href}
                download
                className="flex items-center gap-1 border border-white/10 bg-[#07080a] px-2 py-0.5 font-mono text-[10px] font-semibold text-white/60 hover:border-[#3df5ff]/40 hover:text-[#3df5ff] transition-all"
                title={`Download ${resume.name} Resume`}
              >
                <Download size={10} />
                {resume.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center border border-white/10 bg-[#07080a] text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-white/10 bg-[#07080a]/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="section-container space-y-2 py-4">
              {navItems.map((item, i) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className="block font-mono text-xs font-bold tracking-widest text-white/80 hover:text-[#3df5ff] py-1.5"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 font-mono text-xs">
                {resumes.map((resume) => (
                  <a
                    key={resume.name}
                    href={resume.href}
                    download
                    className="flex items-center justify-center gap-1.5 border border-white/10 bg-white/5 py-1.5 text-white/70 hover:border-[#3df5ff] hover:text-[#3df5ff]"
                  >
                    <Download size={12} />
                    {resume.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
