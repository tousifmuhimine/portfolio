'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/20 bg-[#07080a] p-6 text-[#ecebe6] shadow-2xl shadow-cyan-500/10 md:p-8"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-[#3df5ff] hover:text-[#3df5ff]"
          >
            <X size={18} />
          </button>

          {/* Top Category & Metric Header */}
          <div className="flex flex-wrap items-center gap-3 pr-10 font-mono">
            <span className="border border-[#3df5ff]/40 bg-[#3df5ff]/10 px-3 py-1 text-xs font-bold text-[#3df5ff]">
              // {project.category}
            </span>
            {project.metrics && (
              <span className="flex items-center gap-1.5 border border-[#c8ff3d]/40 bg-[#c8ff3d]/10 px-3 py-1 text-xs text-[#c8ff3d]">
                <Sparkles size={12} />
                {project.metrics}
              </span>
            )}
            <span className="text-xs text-white/40">ID: ARCH_SPEC_2026</span>
          </div>

          {/* Title */}
          <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl md:text-4xl text-white">
            {project.title}
          </h2>

          {/* Screenshot Display */}
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden border border-white/10 bg-[#0d1017]">
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              width={1200}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Deep Breakdown */}
          <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#3df5ff]">
                <Terminal size={14} />
                <span>// SYSTEM OVERVIEW</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#8e929b] md:text-base">
                {project.description}
              </p>

              <h4 className="mt-6 font-mono text-xs font-bold uppercase tracking-wider text-[#c8ff3d]">
                // CORE TECHNICAL ACHIEVEMENTS
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 md:text-sm">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#3df5ff]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Meta */}
            <div className="border border-white/10 bg-white/[0.02] p-5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#3df5ff]">
                // TECH STACK & INFRASTRUCTURE
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.split(',').map((tech, i) => (
                  <span
                    key={i}
                    className="border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white/40">
                  // REPOSITORY & DEPLOYMENT
                </h4>
                <div className="mt-3 flex flex-col gap-2.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#3df5ff] px-4 py-2.5 font-mono text-xs font-bold text-black transition-transform hover:scale-[1.02]"
                    >
                      <span>LAUNCH LIVE DEMO</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs font-semibold text-white transition-all hover:border-[#3df5ff] hover:text-[#3df5ff]"
                    >
                      <Github size={15} />
                      <span>VIEW GITHUB CODE</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
