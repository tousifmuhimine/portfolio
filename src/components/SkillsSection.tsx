'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  BrainCircuit,
  Code2,
  Database,
  Network,
  Sparkles,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react';
import SectionReveal from './SectionReveal';
import SkillNodeGraph from './SkillNodeGraph';

export interface Skill {
  title: string;
  icon: LucideIcon;
  items: string[];
}

interface SkillsSectionProps {
  skills: Skill[];
}

// Bento card with mouse spotlight border glow
function SpotlightCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const Icon = skill.icon;
  const formattedIndex = `0${index + 1}`.slice(-2);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col justify-between overflow-hidden border border-white/10 bg-[#07080a] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 min-w-0 max-w-full"
      data-cursor="code"
    >
      {/* Spotlight Cursor Glow on Card Border */}
      <div
        className="pointer-events-none absolute inset-0 -m-[1px] rounded-[inherit] transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(61, 245, 255, 0.4), transparent 70%)`,
          opacity: mousePos.opacity,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#3df5ff]">
            <Icon size={16} />
            <span className="font-bold">[{formattedIndex}]</span>
          </div>
          <span className="text-white/40">// CAPABILITY</span>
        </div>

        <h3 className="mt-4 text-xl font-bold text-white">{skill.title}</h3>

        {/* Skills Chip List */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.items.map((item) => (
            <span
              key={item}
              className="border border-white/10 bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-white/70 transition-colors hover:border-[#3df5ff]/40 hover:bg-[#3df5ff]/10 hover:text-[#3df5ff]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footnote */}
      <div className="mt-6 border-t border-white/10 pt-3 font-mono text-[10px] text-white/30">
        VERIFIED IN PRODUCTION REPOSITORIES
      </div>
    </article>
  );
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <SectionReveal>
          <div className="mb-12 max-w-3xl">
            <div className="eyebrow">
              <span className="live-dot" />
              // 05. Resume-Backed Toolkit
            </div>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              Skills Across AI, ML,{' '}
              <span className="text-[#3df5ff]">Backend, & Interfaces</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-white/50">
              Interactive bento matrix with spotlight cursor borders and real-time neural node graph connections.
            </p>
          </div>
        </SectionReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <SpotlightCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>

        {/* Interactive Neural Node Graph Linking Related Skills */}
        <div className="mt-10">
          <SkillNodeGraph />
        </div>
      </div>
    </section>
  );
}
