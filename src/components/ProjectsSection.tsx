'use client';

import { useState, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import ProjectsWheel from './ProjectsWheel';
import HorizontalProjectsScroll from './HorizontalProjectsScroll';
import ProjectModal from './ProjectModal';
import { Project } from './ProjectCard';
import SectionReveal from './SectionReveal';
import { Sparkles, Disc, List, ExternalLink, Github, ArrowUpRight, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'wheel' | 'showcase' | 'list'>('wheel');

  // Floating cursor preview state for matrix list mode
  const [hoveredListProject, setHoveredListProject] = useState<Project | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  const categories = ['All', 'AI Reasoning', 'Full-Stack', 'ML & Deep Learning'];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'AI Reasoning') {
      return (
        p.category.includes('AI') ||
        p.category.includes('Capstone') ||
        p.category.includes('RAG') ||
        p.category.includes('Education')
      );
    }
    if (selectedCategory === 'Full-Stack') {
      return p.category.includes('Full-Stack') || p.category.includes('E-commerce');
    }
    if (selectedCategory === 'ML & Deep Learning') {
      return (
        p.category.includes('ML') ||
        p.category.includes('Deep Learning') ||
        p.category.includes('Forecasting') ||
        p.category.includes('Sentiment')
      );
    }
    return true;
  });

  const handleListMouseMove = (e: MouseEvent) => {
    setPreviewPos({ x: e.clientX + 24, y: e.clientY - 120 });
  };

  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-24 py-20 md:py-28"
    >
      <div className="section-container">
        {/* Section Header */}
        <SectionReveal>
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">
                <span className="live-dot" />
                // 04. Selected Work & Architectures
              </div>
              <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
                AI Systems with Real{' '}
                <span className="text-[#3df5ff]">Application Layers</span>
              </h2>
              <p className="mt-3 max-w-2xl font-mono text-xs text-white/50">
                3D circular carousel wheel: scroll or drag to rotate through system architectures. Switch to Showcase for locked horizontal 3D cards.
              </p>
            </div>

            {/* Layout Mode & Category Controls */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Layout Switcher: 3D Wheel (main), Showcase (second), Matrix (third) */}
              <div className="flex items-center border border-white/10 bg-[#07080a] p-1 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('wheel')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                    viewMode === 'wheel'
                      ? 'bg-white/10 text-[#3df5ff]'
                      : 'text-white/40 hover:text-white'
                  }`}
                  title="3D Circular Wheel"
                >
                  <Disc size={13} />
                  <span>3D WHEEL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('showcase')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                    viewMode === 'showcase'
                      ? 'bg-white/10 text-[#3df5ff]'
                      : 'text-white/40 hover:text-white'
                  }`}
                  title="Locked Horizontal Showcase"
                >
                  <Layers size={13} />
                  <span>SHOWCASE</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white/10 text-[#3df5ff]'
                      : 'text-white/40 hover:text-white'
                  }`}
                  title="List with Cursor Preview"
                >
                  <List size={13} />
                  <span>MATRIX</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`border px-3 py-1 font-mono text-xs font-semibold transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'border-[#3df5ff] bg-[#3df5ff]/10 text-[#3df5ff]'
                        : 'border-white/10 bg-[#07080a] text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* MODE 1: 3D Circular Wheel Carousel (Default) */}
        {viewMode === 'wheel' && (
          <div className="mt-8">
            <ProjectsWheel
              projects={filteredProjects}
              onInspect={(p) => setActiveProject(p)}
            />
          </div>
        )}

        {/* MODE 2: Locked Horizontal Showcase (Second) */}
        {viewMode === 'showcase' && (
          <HorizontalProjectsScroll
            projects={filteredProjects}
            onInspect={(p) => setActiveProject(p)}
          />
        )}

        {/* MODE 3: Editorial Matrix List with Cursor Floating Preview */}
        {viewMode === 'list' && (
          <div
            className="relative mt-12 divide-y divide-white/10 border-y border-white/10"
            onMouseMove={handleListMouseMove}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.title}
                onMouseEnter={() => setHoveredListProject(project)}
                onMouseLeave={() => setHoveredListProject(null)}
                onClick={() => setActiveProject(project)}
                className="group flex cursor-pointer flex-col justify-between gap-4 py-6 transition-all md:flex-row md:items-center hover:bg-white/[0.02] px-4"
                data-cursor="view"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm font-bold text-[#3df5ff]">
                    [{`0${idx + 1}`}]
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#3df5ff] md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#8e929b] line-clamp-1 max-w-xl">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <span className="hidden lg:inline text-white/50">{project.category}</span>
                  {project.metrics && (
                    <span className="text-[#c8ff3d]">{project.metrics}</span>
                  )}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-white/40 hover:text-white"
                        title="GitHub"
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-[#3df5ff] hover:underline"
                        title="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="flex items-center gap-1 border border-white/10 bg-white/5 px-2.5 py-1 text-white/70 hover:border-[#3df5ff] hover:text-[#3df5ff]"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Floating Image Following Cursor in List Mode */}
            {hoveredListProject && (
              <div
                className="pointer-events-none fixed z-50 hidden overflow-hidden border border-[#3df5ff]/40 bg-[#07080a] p-1.5 shadow-2xl md:block"
                style={{
                  left: `${previewPos.x}px`,
                  top: `${previewPos.y}px`,
                  width: '320px',
                  height: '200px',
                  transform: 'translate3d(0, 0, 0)',
                  transition: 'transform 0.05s ease-out',
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={hoveredListProject.imageUrl}
                    alt={hoveredListProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] text-white">
                    <span className="font-bold text-[#3df5ff]">{hoveredListProject.title}</span>
                    <span className="text-white/60">{hoveredListProject.category}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3D Interactive Inspection Modal (Shared Element Detail View) */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
