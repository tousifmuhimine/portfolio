'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Sparkles, Layers } from 'lucide-react';
import { Project } from './ProjectCard';

interface ProjectCard3DProps {
  project: Project;
  index: number;
  onInspect: (project: Project) => void;
}

export default function ProjectCard3D({ project, index, onInspect }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReduced(isTouch || isReduced);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchOrReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Restrained 3D tilt strictly clamped to max ±10deg following cursor
    const rawRotX = ((y - centerY) / centerY) * -10;
    const rawRotY = ((x - centerX) / centerX) * 10;
    const rotX = Math.max(-10, Math.min(10, rawRotX));
    const rotY = Math.max(-10, Math.min(10, rawRotY));

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchOrReduced) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth spring-back to 0
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const formattedIndex = `0${index + 1}`.slice(-2);

  return (
    <div
      style={{ perspective: '1200px' }}
      className="h-full select-none"
      data-cursor="view"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onInspect(project)}
        style={{
          transform: isTouchOrReduced
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden border border-white/10 bg-[#07080a] p-5 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-[#3df5ff]/50 hover:shadow-[0_0_35px_rgba(61,245,255,0.14)]"
      >
        {/* Cursor-following radial spotlight / glare */}
        {!isTouchOrReduced && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 340px at ${glarePosition.x}% ${glarePosition.y}%, rgba(61, 245, 255, 0.22), transparent 70%)`,
              opacity: glarePosition.opacity,
            }}
          />
        )}

        {/* Top Header Tag: [01] / CATEGORY / 2026_SYS */}
        <div
          style={{ transform: isTouchOrReduced ? 'none' : 'translateZ(25px)' }}
          className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#3df5ff]">[{formattedIndex}]</span>
            <span className="text-white/40">/</span>
            <span className="text-white/70 uppercase tracking-wider">{project.category}</span>
          </div>
          <span className="border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
            2026_SYS
          </span>
        </div>

        {/* Image Frame with slow scale-up and subtle saturation shift */}
        <div
          style={{ transform: isTouchOrReduced ? 'none' : 'translateZ(35px)' }}
          className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#0d1017]"
        >
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            width={900}
            height={620}
            className="h-full w-full object-cover filter saturate-[0.8] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-115"
          />

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-80" />

          {/* Floating Metrics Badge */}
          {project.metrics && (
            <div
              style={{ transform: isTouchOrReduced ? 'none' : 'translateZ(45px)' }}
              className="absolute bottom-3 left-3 flex items-center gap-1.5 border border-[#3df5ff]/40 bg-[#07080a]/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#3df5ff] backdrop-blur-md"
            >
              <Sparkles size={11} />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Inspect Reticle Icon */}
          <div
            style={{ transform: isTouchOrReduced ? 'none' : 'translateZ(50px)' }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/20 bg-[#07080a]/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:border-[#3df5ff] hover:text-[#3df5ff]"
          >
            <Eye size={14} />
          </div>
        </div>

        {/* Project Info with Title Roll/Swap effect */}
        <div
          style={{ transform: isTouchOrReduced ? 'none' : 'translateZ(30px)' }}
          className="mt-5 flex flex-1 flex-col"
        >
          {/* Title Swap / Roll Effect */}
          <div className="relative h-7 overflow-hidden">
            <div className="transition-transform duration-300 ease-out group-hover:-translate-y-7">
              <h3 className="h-7 text-xl font-bold text-white leading-7 line-clamp-1">
                {project.title}
              </h3>
              <h3 className="h-7 text-xl font-bold text-[#3df5ff] leading-7 flex items-center gap-1.5 line-clamp-1">
                <span>{project.title}</span>
                <span className="font-mono text-xs opacity-80">↗</span>
              </h3>
            </div>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-[#8e929b] md:text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Staggered Monospace Tech Tags */}
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.split(',').map((tech, idx) => (
                <span
                  key={idx}
                  className="border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#3df5ff]/40 group-hover:bg-[#3df5ff]/10 group-hover:text-[#3df5ff]"
                  style={{
                    transitionDelay: `${idx * 35}ms`,
                  }}
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{ transform: isTouchOrReduced ? 'none' : 'translateZ(40px)' }}
            className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"
          >
            <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white/70 transition-colors group-hover:text-[#3df5ff]">
              <Layers size={13} />
              <span>INSPECT ARCHITECTURE</span>
            </span>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/5 text-white/70 hover:border-[#3df5ff] hover:text-[#3df5ff] transition-all"
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
                  className="flex items-center gap-1 border border-[#3df5ff]/40 bg-[#3df5ff]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#3df5ff] hover:bg-[#3df5ff] hover:text-black transition-all"
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
}
