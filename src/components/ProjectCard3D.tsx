'use client';

import { useState, useRef, MouseEvent } from 'react';
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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
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
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden border border-white/10 bg-[#07080a] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#3df5ff]/50 hover:shadow-[0_0_40px_rgba(61,245,255,0.12)]"
      >
        {/* Dynamic Specular Holographic Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glarePosition.x}% ${glarePosition.y}%, rgba(61, 245, 255, 0.2), transparent 70%)`,
            opacity: glarePosition.opacity,
          }}
        />

        {/* Terminal Corner Bar: [01] / TYPE / 2026 */}
        <div
          style={{ transform: 'translateZ(25px)' }}
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

        {/* 3D Layer 1: Image Frame with Chromatic / RGB Split Distortion Simulation */}
        <div
          style={{ transform: 'translateZ(35px)' }}
          className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#0d1017]"
        >
          {/* Base Image */}
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            width={900}
            height={620}
            className={`h-full w-full object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 ${
              isHovered ? 'filter-none' : ''
            }`}
          />

          {/* Simulated RGB Shift Overlay on Hover */}
          {isHovered && (
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${project.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'drop-shadow(2px 0 0 rgba(255,0,80,0.7)) drop-shadow(-2px 0 0 rgba(0,255,255,0.7))',
              }}
            />
          )}

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent" />

          {/* Floating Metrics Badge */}
          {project.metrics && (
            <div
              style={{ transform: 'translateZ(50px)' }}
              className="absolute bottom-3 left-3 flex items-center gap-1.5 border border-[#3df5ff]/40 bg-[#07080a]/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#3df5ff] backdrop-blur-md"
            >
              <Sparkles size={11} />
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Inspect Reticle Icon */}
          <div
            style={{ transform: 'translateZ(55px)' }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-white/20 bg-[#07080a]/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:border-[#3df5ff] hover:text-[#3df5ff]"
          >
            <Eye size={14} />
          </div>
        </div>

        {/* 3D Layer 2: Information */}
        <div style={{ transform: 'translateZ(30px)' }} className="mt-5 flex flex-1 flex-col">
          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#3df5ff]">
            {project.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-[#8e929b] md:text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Sliding Monospace Tech Tags */}
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.split(',').map((tech, idx) => (
                <span
                  key={idx}
                  className="border border-white/5 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-white/70 transition-transform duration-200 group-hover:border-[#3df5ff]/30 group-hover:text-[#3df5ff]"
                  style={{
                    transitionDelay: `${idx * 25}ms`,
                  }}
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* 3D Layer 3: Action Buttons */}
          <div
            style={{ transform: 'translateZ(40px)' }}
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
