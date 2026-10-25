'use client';

import { useState, useRef, useEffect, useCallback, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  Github,
  Eye,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectsWheelProps {
  projects: Project[];
  onInspect: (project: Project) => void;
}

export default function ProjectsWheel({ projects, onInspect }: ProjectsWheelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const wheelLockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Mouse wheel scroll to smoothly rotate the wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: globalThis.WheelEvent) => {
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        if (wheelLockRef.current) return;
        wheelLockRef.current = true;

        if (e.deltaY > 0 || e.deltaX > 0) {
          nextProject();
        } else {
          prevProject();
        }

        setTimeout(() => {
          wheelLockRef.current = false;
        }, 360);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [nextProject, prevProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Mouse Drag handlers
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX.current < -45) {
      nextProject();
    } else if (dragDeltaX.current > 45) {
      prevProject();
    }
  };

  // Touch Drag handlers
  const handleTouchStart = (e: TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    dragDeltaX.current = e.touches[0].clientX - dragStartX.current;
  };

  const handleTouchEnd = () => {
    if (dragDeltaX.current < -35) {
      nextProject();
    } else if (dragDeltaX.current > 35) {
      prevProject();
    }
  };

  // Shortest circular offset on the wheel (-2, -1, 0, 1, 2)
  const getOffset = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;
    return diff;
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none py-12"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Circular Wheel Stage */}
      <div
        className="relative mx-auto flex h-[620px] w-full max-w-6xl items-center justify-center overflow-visible"
        style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
      >
        {projects.map((project, idx) => {
          const offset = getOffset(idx);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // True 3D Circular Arc Math (positions cards along an authentic cylinder circumference)
          const radius = 640; // 3D arc radius
          const angleStep = 32; // degrees per card
          const angleRad = (offset * angleStep * Math.PI) / 180;

          const translateX = Math.sin(angleRad) * radius;
          const translateZ = (Math.cos(angleRad) - 1) * radius;
          const rotateY = -offset * angleStep;

          const scale = isCenter ? 1 : Math.max(0.74, 1 - Math.abs(offset) * 0.14);
          const opacity = isCenter ? 1 : Math.max(0.18, 0.55 - Math.abs(offset) * 0.2);
          const zIndex = 30 - Math.abs(offset) * 10;

          const formattedIndex = `0${idx + 1}`.slice(-2);

          return (
            <div
              key={project.title}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(idx);
                } else {
                  onInspect(project);
                }
              }}
              style={{
                position: 'absolute',
                width: 'min(460px, 88vw)',
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'all 0.68s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              className="group"
            >
              {/* Rounded, Glassmorphic 3D Card Shell */}
              <div
                className={`relative flex flex-col overflow-hidden rounded-[28px] border bg-[#07080a]/92 p-6 backdrop-blur-2xl transition-all duration-300 ${
                  isCenter
                    ? 'border-[#3df5ff]/60 shadow-[0_24px_80px_rgba(61,245,255,0.22)]'
                    : 'border-white/10 hover:border-white/25 shadow-2xl'
                }`}
              >
                {/* Glowing Top Edge Flare for Focused Card */}
                {isCenter && (
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#3df5ff] to-transparent shadow-[0_0_15px_#3df5ff]" />
                )}

                {/* Card Top Pill Bar: [01] / CATEGORY / 2026 */}
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${isCenter ? 'text-[#3df5ff]' : 'text-white/40'}`}>
                      [{formattedIndex}]
                    </span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/70 uppercase tracking-wider line-clamp-1">
                      {project.category}
                    </span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/50">
                    2026_SYS
                  </span>
                </div>

                {/* Smooth Rounded Screenshot Viewport */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={900}
                    height={580}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      isCenter ? 'grayscale-0 contrast-105' : 'grayscale contrast-125'
                    }`}
                  />

                  {/* Gradient Depth Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent" />

                  {/* Rounded Metrics Pill */}
                  {project.metrics && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-[#3df5ff]/40 bg-[#07080a]/90 px-3 py-1 font-mono text-[11px] font-semibold text-[#3df5ff] backdrop-blur-md">
                      <Sparkles size={11} />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  {/* Rounded Inspect Icon on Focused Card */}
                  {isCenter && (
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#3df5ff] bg-[#07080a]/90 text-[#3df5ff] shadow-lg">
                      <Eye size={14} />
                    </div>
                  )}
                </div>

                {/* Card Typography & Highlights */}
                <div className="mt-5 flex flex-1 flex-col">
                  <h3
                    className={`text-xl font-bold tracking-tight transition-colors ${
                      isCenter ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#8e929b] line-clamp-2 md:text-sm">
                    {project.description}
                  </p>

                  {/* Rounded Tech Stack Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] transition-colors ${
                          isCenter
                            ? 'border-[#3df5ff]/30 bg-[#3df5ff]/10 text-[#3df5ff]'
                            : 'border-white/5 bg-white/[0.02] text-white/40'
                        }`}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Rounded Action Bar */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-[#3df5ff]">
                      <Layers size={13} />
                      <span>INSPECT ARCHITECTURE</span>
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:border-[#3df5ff] hover:text-[#3df5ff] transition-all"
                          title="Source Code"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-lg border border-[#3df5ff] bg-[#3df5ff]/10 px-3 py-1 font-bold text-[#3df5ff] hover:bg-[#3df5ff] hover:text-black transition-all"
                          title="Live Demo"
                        >
                          <span>DEMO</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rounded Floating Navigation Controls & Dial */}
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        {/* Floating Rounded Nav Pill */}
        <div className="flex items-center gap-5 rounded-full border border-white/15 bg-[#07080a]/90 px-5 py-2 font-mono text-xs shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={prevProject}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/70 hover:bg-white/10 hover:text-[#3df5ff] transition-all"
          >
            <ChevronLeft size={16} />
            <span>PREV</span>
          </button>

          {/* Segmented Dial Gauge */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#3df5ff]/40 bg-[#3df5ff]/10 px-3.5 py-1 text-xs font-bold text-[#3df5ff]">
            <span>0{activeIndex + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/40">0{total}</span>
          </div>

          <button
            type="button"
            onClick={nextProject}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/70 hover:bg-white/10 hover:text-[#3df5ff] transition-all"
          >
            <span>NEXT</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Rounded Progress Pills */}
        <div className="flex items-center gap-2">
          {projects.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.title}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2 w-7 bg-[#3df5ff] shadow-[0_0_12px_rgba(61,245,255,0.8)]'
                    : 'h-2 w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to ${p.title}`}
              />
            );
          })}
        </div>

        {/* Wheel Helper Hint */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
          <RotateCw size={12} className="text-[#3df5ff]" />
          <span>WHEEL INTERACTION: SCROLL, DRAG, OR CLICK SIDE CARDS TO ROTATE</span>
        </div>
      </div>
    </div>
  );
}
