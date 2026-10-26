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
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const wheelLockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsMobile(w < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Mouse wheel scroll to smoothly rotate the wheel - locked horizontally only
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: globalThis.WheelEvent) => {
      // Prevent page from scrolling vertically when cursor is over the 3D wheel
      if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
        e.preventDefault();
        e.stopPropagation();

        if (wheelLockRef.current) return;
        wheelLockRef.current = true;

        if (e.deltaY > 0 || e.deltaX > 0) {
          nextProject();
        } else {
          prevProject();
        }

        setTimeout(() => {
          wheelLockRef.current = false;
        }, 260);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
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
    if (dragDeltaX.current < -35) {
      nextProject();
    } else if (dragDeltaX.current > 35) {
      prevProject();
    }
  };

  // Touch Drag handlers with mobile pan-y support
  const handleTouchStart = (e: TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    dragDeltaX.current = e.touches[0].clientX - dragStartX.current;
  };

  const handleTouchEnd = () => {
    if (dragDeltaX.current < -28) {
      nextProject();
    } else if (dragDeltaX.current > 28) {
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
      data-lenis-prevent
      className="relative select-none py-6 sm:py-12 touch-pan-y overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Circular Wheel Stage */}
      <div
        className="relative mx-auto flex h-[520px] sm:h-[580px] md:h-[660px] w-full max-w-6xl items-center justify-center overflow-visible"
        style={{ perspective: isMobile ? '1100px' : '1500px', transformStyle: 'preserve-3d' }}
      >
        {/* Saturn Cosmic Planetary Ring Guide */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
          style={{
            perspective: isMobile ? '1100px' : '1500px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Outer Luminous Saturn Planetary Ring */}
          <div
            className="absolute rounded-[50%] border border-[#3df5ff]/35 opacity-70 pointer-events-none"
            style={{
              width: isMobile ? 'min(94vw, 560px)' : '1120px',
              height: isMobile ? '240px' : '360px',
              transform: 'rotateX(73deg) rotateZ(-3deg) translateY(80px)',
              boxShadow: '0 0 50px rgba(61,245,255,0.22), inset 0 0 40px rgba(61,245,255,0.14)',
              background: 'radial-gradient(ellipse at center, transparent 58%, rgba(61,245,255,0.08) 64%, transparent 74%)',
            }}
          />

          {/* Secondary Dashed Inner Orbit Ring */}
          <div
            className="absolute rounded-[50%] border border-dashed border-[#c8ff3d]/25 opacity-45 pointer-events-none"
            style={{
              width: isMobile ? 'min(82vw, 470px)' : '940px',
              height: isMobile ? '200px' : '300px',
              transform: 'rotateX(73deg) rotateZ(-3deg) translateY(80px)',
            }}
          />
        </div>

        {projects.map((project, idx) => {
          const offset = getOffset(idx);
          const isCenter = offset === 0;

          // On mobile, only render offset -1, 0, 1 for ultra smooth mobile performance & clean bounds
          const maxVisibleOffset = isMobile ? 1 : 2;
          const isVisible = Math.abs(offset) <= maxVisibleOffset;

          if (!isVisible) return null;

          // Saturn Ring Incline & Arc Math
          const radius = isMobile ? Math.min(320, windowWidth * 0.74) : 660;
          const angleStep = isMobile ? 26 : 34;
          const angleRad = (offset * angleStep * Math.PI) / 180;

          const translateX = Math.sin(angleRad) * radius;
          const translateZ = (Math.cos(angleRad) - 1) * radius * 0.85;

          // Saturn Ring Elevation: Center card rests forward; before and after cards swoop upward along the ring
          const translateY = isCenter
            ? (isMobile ? 10 : 16)
            : -Math.pow(Math.abs(offset), 1.28) * (isMobile ? 48 : 78);

          // Banking tilt along the cosmic ring arc
          const rotateY = -offset * (isMobile ? 22 : 28);
          const rotateZ = offset * (isMobile ? -4.5 : -6.5);
          const rotateX = isCenter ? -1 : 6 + Math.abs(offset) * 4;

          const scale = isCenter ? 1 : isMobile ? 0.82 : Math.max(0.72, 1 - Math.abs(offset) * 0.15);
          const opacity = isCenter ? 1 : isMobile ? 0.35 : Math.max(0.2, 0.6 - Math.abs(offset) * 0.18);
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
                width: isMobile ? 'min(330px, 86vw)' : 'min(460px, 88vw)',
                transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
              className="group"
            >
              {/* Rounded, Glassmorphic 3D Card Shell */}
              <div
                className={`relative flex flex-col overflow-hidden rounded-2xl sm:rounded-[28px] border bg-[#07080a]/95 p-4 sm:p-6 backdrop-blur-2xl transition-all duration-300 ${
                  isCenter
                    ? 'border-[#3df5ff]/60 shadow-[0_16px_60px_rgba(61,245,255,0.22)]'
                    : 'border-white/10 hover:border-white/25 shadow-xl'
                }`}
              >
                {/* Glowing Top Edge Flare for Focused Card */}
                {isCenter && (
                  <div className="pointer-events-none absolute inset-x-6 sm:inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#3df5ff] to-transparent shadow-[0_0_15px_#3df5ff]" />
                )}

                {/* Card Top Pill Bar: [01] / CATEGORY / 2026 */}
                <div className="mb-3 sm:mb-4 flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 font-mono text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`font-bold ${isCenter ? 'text-[#3df5ff]' : 'text-white/40'}`}>
                      [{formattedIndex}]
                    </span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/70 uppercase tracking-wider line-clamp-1 text-[11px] sm:text-xs">
                      {project.category}
                    </span>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] sm:text-[10px] text-white/50">
                    2026
                  </span>
                </div>

                {/* Smooth Rounded Screenshot Viewport */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#0d1017]">
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
                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 flex items-center gap-1.5 rounded-full border border-[#3df5ff]/40 bg-[#07080a]/90 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-[#3df5ff] backdrop-blur-md">
                      <Sparkles size={10} />
                      <span className="line-clamp-1">{project.metrics}</span>
                    </div>
                  )}

                  {/* Rounded Inspect Icon on Focused Card */}
                  {isCenter && (
                    <div className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#3df5ff] bg-[#07080a]/90 text-[#3df5ff] shadow-lg">
                      <Eye size={13} />
                    </div>
                  )}
                </div>

                {/* Card Typography & Highlights */}
                <div className="mt-3.5 sm:mt-5 flex flex-1 flex-col">
                  <h3
                    className={`text-base sm:text-xl font-bold tracking-tight transition-colors line-clamp-1 ${
                      isCenter ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-[#8e929b] line-clamp-2">
                    {project.description}
                  </p>

                  {/* Rounded Tech Stack Chips */}
                  <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
                    {project.techStack.split(',').slice(0, isMobile ? 4 : 6).map((tech, i) => (
                      <span
                        key={i}
                        className={`rounded-full border px-2 sm:px-2.5 py-0.5 font-mono text-[9px] sm:text-[10px] transition-colors ${
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
                  <div className="mt-3.5 sm:mt-5 flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4 font-mono text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-[#3df5ff] text-[11px] sm:text-xs">
                      <Layers size={12} />
                      <span>INSPECT DETAILS</span>
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 hover:border-[#3df5ff] hover:text-[#3df5ff] transition-all"
                          title="Source Code"
                        >
                          <Github size={13} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-lg border border-[#3df5ff] bg-[#3df5ff]/10 px-2.5 sm:px-3 py-1 font-bold text-[#3df5ff] hover:bg-[#3df5ff] hover:text-black text-[11px] sm:text-xs transition-all"
                          title="Live Demo"
                        >
                          <span>DEMO</span>
                          <ExternalLink size={11} />
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
      <div className="mt-4 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4">
        {/* Floating Rounded Nav Pill */}
        <div className="flex items-center gap-3 sm:gap-5 rounded-full border border-white/15 bg-[#07080a]/90 px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-xs shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={prevProject}
            className="flex items-center gap-1 rounded-full px-2.5 sm:px-3 py-1 text-white/70 hover:bg-white/10 hover:text-[#3df5ff] transition-all"
            aria-label="Previous Project"
          >
            <ChevronLeft size={15} />
            <span className="text-[11px] sm:text-xs">PREV</span>
          </button>

          {/* Segmented Dial Gauge */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#3df5ff]/40 bg-[#3df5ff]/10 px-3 py-0.5 sm:px-3.5 sm:py-1 text-xs font-bold text-[#3df5ff]">
            <span>0{activeIndex + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/40">0{total}</span>
          </div>

          <button
            type="button"
            onClick={nextProject}
            className="flex items-center gap-1 rounded-full px-2.5 sm:px-3 py-1 text-white/70 hover:bg-white/10 hover:text-[#3df5ff] transition-all"
            aria-label="Next Project"
          >
            <span className="text-[11px] sm:text-xs">NEXT</span>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Rounded Progress Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {projects.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={p.title}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-1.5 sm:h-2 w-6 sm:w-7 bg-[#3df5ff] shadow-[0_0_12px_rgba(61,245,255,0.8)]'
                    : 'h-1.5 sm:h-2 w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Jump to ${p.title}`}
                aria-label={`Jump to project ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Wheel Helper Hint */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-white/40">
          <RotateCw size={11} className="text-[#3df5ff]" />
          <span>SWIPE OR TAP SIDES TO ROTATE WHEEL</span>
        </div>
      </div>
    </div>
  );
}
