'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  Download,
  Briefcase,
  Layers,
  GraduationCap,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PaletteItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Resumes' | 'Social';
  title: string;
  subtitle?: string;
  action: () => void;
  icon: any;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText('abdullahtsn13@gmail.com');
    alert('Email copied to clipboard: abdullahtsn13@gmail.com');
    onClose();
  };

  const items: PaletteItem[] = [
    // Navigation
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'About // Overview',
      subtitle: 'Jump to bio, specs, and verified identity',
      icon: Briefcase,
      action: () => navigateTo('#about'),
    },
    {
      id: 'nav-story',
      category: 'Navigation',
      title: 'What I Do // Scroll Storyline',
      subtitle: 'From raw tensors to production reality',
      icon: Sparkles,
      action: () => navigateTo('#story'),
    },
    {
      id: 'nav-roles',
      category: 'Navigation',
      title: 'Roles // Focus Profiles',
      subtitle: '4 ways to read profile (AI, Full-Stack, Backend, ML)',
      icon: Layers,
      action: () => navigateTo('#roles'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Projects // Gallery Showpiece',
      subtitle: 'Featured AI systems with real application layers',
      icon: Layers,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Skills // Bento Matrix',
      subtitle: 'LLMs, ML, Frameworks, Backend, Frontend, Data',
      icon: Sparkles,
      action: () => navigateTo('#skills'),
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Experience & Education // Timeline',
      subtitle: 'Cognisor AI, Fleek BD, FabricoMartBD, NSU',
      icon: GraduationCap,
      action: () => navigateTo('#experience'),
    },
    {
      id: 'nav-resumes',
      category: 'Navigation',
      title: 'Resumes // Download Hub',
      subtitle: 'Targeted PDFs for specific engineering roles',
      icon: Download,
      action: () => navigateTo('#resumes'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Contact // Terminal Uplink',
      subtitle: 'Direct email and developer channels',
      icon: Mail,
      action: () => navigateTo('#contact'),
    },

    // Projects
    {
      id: 'proj-1',
      category: 'Projects',
      title: 'PorteHobe AI Capstone',
      subtitle: 'Gemma 3:4B, GSM8K, +15% Reasoning Gain',
      icon: Sparkles,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'proj-2',
      category: 'Projects',
      title: 'Data Structure Learning LLM',
      subtitle: 'FastAPI, LangGraph, MCP Server, PGVector',
      icon: Sparkles,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'proj-3',
      category: 'Projects',
      title: 'Bouncy Book Store',
      subtitle: 'Next.js, Node.js, Supabase, JWT RBAC',
      icon: Sparkles,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'proj-4',
      category: 'Projects',
      title: 'Flood Forecasting AI System',
      subtitle: 'Time-series forecasting with 90% accuracy',
      icon: Sparkles,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'proj-5',
      category: 'Projects',
      title: 'Physics RAG Chatbot',
      subtitle: 'Semantic retrieval first, PGVector, LangChain',
      icon: Sparkles,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'proj-6',
      category: 'Projects',
      title: 'Multimodal Sentiment Analysis',
      subtitle: 'CNNs & temporal sequence models for video/audio',
      icon: Sparkles,
      action: () => navigateTo('#projects'),
    },

    // Resumes
    {
      id: 'res-af',
      category: 'Resumes',
      title: 'Download AF Resume (AI Full-Stack Allrounder)',
      subtitle: '/resumeAF.pdf',
      icon: Download,
      action: () => {
        window.open('/resumeAF.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'res-a',
      category: 'Resumes',
      title: 'Download Resume A (AI Engineer)',
      subtitle: '/others/resumeA.pdf',
      icon: Download,
      action: () => {
        window.open('/others/resumeA.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'res-f',
      category: 'Resumes',
      title: 'Download Resume F (Full-Stack / Backend Engineer)',
      subtitle: '/others/resumeF.pdf',
      icon: Download,
      action: () => {
        window.open('/others/resumeF.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'res-m',
      category: 'Resumes',
      title: 'Download Resume M (ML / DL Engineer)',
      subtitle: '/others/resumeM.pdf',
      icon: Download,
      action: () => {
        window.open('/others/resumeM.pdf', '_blank');
        onClose();
      },
    },

    // Social / Contact
    {
      id: 'soc-email',
      category: 'Social',
      title: 'Copy Email // abdullahtsn13@gmail.com',
      subtitle: 'Send direct email transmission',
      icon: Mail,
      action: copyEmail,
    },
    {
      id: 'soc-github',
      category: 'Social',
      title: 'GitHub Profile // @tousifmuhimine',
      subtitle: 'https://github.com/tousifmuhimine',
      icon: Github,
      action: () => {
        window.open('https://github.com/tousifmuhimine', '_blank');
        onClose();
      },
    },
    {
      id: 'soc-linkedin',
      category: 'Social',
      title: 'LinkedIn Profile // in/tousifmuhimine',
      subtitle: 'https://linkedin.com/in/tousifmuhimine',
      icon: Linkedin,
      action: () => {
        window.open('https://linkedin.com/in/tousifmuhimine', '_blank');
        onClose();
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open handled by parent
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10001] flex items-start justify-center p-4 pt-16 sm:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Raycast Palette Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/20 bg-[#07080a] shadow-2xl shadow-cyan-500/10"
        >
          {/* Top Search Field */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
            <Search size={18} className="text-[#3df5ff]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command or jump to section... (e.g. projects, resume, gemma)"
              className="w-full bg-transparent font-mono text-sm text-[#ecebe6] placeholder-white/30 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="rounded p-1 text-white/40 hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* List of Results */}
          <div className="max-h-[360px] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-white/40">
                NO COMMANDS FOUND FOR &quot;{query}&quot;
              </div>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded border ${
                          isSelected
                            ? 'border-[#3df5ff]/40 bg-[#3df5ff]/10 text-[#3df5ff]'
                            : 'border-white/10 bg-white/5 text-white/50'
                        }`}
                      >
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-semibold">{item.title}</div>
                        {item.subtitle && (
                          <div className="font-mono text-[11px] text-white/40">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
                        {item.category}
                      </span>
                      {isSelected && <ArrowRight size={14} className="text-[#3df5ff]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Footer Shortcuts */}
          <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-2 font-mono text-[11px] text-white/40">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Exit</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3df5ff]">
              <Command size={12} />
              <span>K</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
