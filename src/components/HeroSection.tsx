'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Download,
  Terminal,
  Cpu,
  Sparkles,
  Layers,
  ShieldCheck,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import MagneticButton from './MagneticButton';
import TextScramble from './TextScramble';

interface HeroProps {
  stats: [string, string][];
}

const rotatingRoles = [
  'Fine-tuning Gemma 3:4B & open-source LLMs for mathematical reasoning',
  'Building autonomous multi-agent pipelines with LangGraph & MCP Server',
  'Architecting production Next.js, Node.js & FastAPI full-stack platforms',
  'Engineering semantic vector retrieval with Supabase & PGVector',
  'Training deep learning CNNs & time-series predictive systems (90% accuracy)',
];

export default function HeroSection({ stats }: HeroProps) {
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Rotating dynamic typewriter capabilities
  useEffect(() => {
    const currentRole = rotatingRoles[rotatingIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && subText.length < currentRole.length) {
      timer = setTimeout(() => {
        setSubText(currentRole.slice(0, subText.length + 1));
      }, 30);
    } else if (!isDeleting && subText.length === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && subText.length > 0) {
      timer = setTimeout(() => {
        setSubText(currentRole.slice(0, subText.length - 1));
      }, 16);
    } else if (isDeleting && subText.length === 0) {
      setIsDeleting(false);
      setRotatingIndex((prev) => (prev + 1) % rotatingRoles.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, rotatingIndex]);

  return (
    <section
      id="about"
      className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden pt-28 pb-0 md:pt-36"
    >
      <div className="section-container relative flex-1">
        {/* Exact Eyebrow from Screenshot: > STATUS: ONLINE · BASED IN DHAKA */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs font-semibold tracking-wider text-white/50"
        >
          <span className="text-[#3df5ff]">{'> '}</span>
          <span>STATUS: ONLINE</span>
          <span className="mx-2 text-white/20">·</span>
          <span>BASED IN DHAKA</span>
        </motion.div>

        {/* Giant Main Heading Exactly Matching Reference Image */}
        <div className="mt-8 select-none">
          {/* Row 1: ABDULLAH AL MUHAIMINE (TOUSIF) */}
          <div className="flex flex-wrap items-baseline gap-x-4">
            <h1 className="text-[11vw] font-black leading-[0.88] tracking-tighter text-[#ecebe6] uppercase sm:text-[10vw] lg:text-[8.5vw]">
              <TextScramble
                text="Abdullah Al Muhaimine"
                delay={150}
                speed={22}
              />
            </h1>
            <span className="font-mono text-2xl font-bold tracking-tight text-[#3df5ff]/70 sm:text-4xl lg:text-5xl">
              (TOUSIF)
            </span>
          </div>

          {/* Row 2: AI ENGINEER. with Neon Cyan Glow Box & Backdrop */}
          <div className="relative mt-3 inline-block">
            <div className="relative inline-block border border-[#3df5ff]/80 bg-[#3df5ff]/10 px-4 py-1 backdrop-blur-sm shadow-[0_0_50px_rgba(61,245,255,0.35)]">
              {/* Backlight Cyan Glow Aura */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[#3df5ff] blur-2xl opacity-25" />

              <span className="text-[11vw] font-black leading-[0.88] tracking-tighter text-[#3df5ff] uppercase sm:text-[10vw] lg:text-[8.5vw]">
                AI ENGINEER.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Split Narrative Row Matching Reference Image */}
        <div className="mt-12 grid items-end gap-8 pb-16 md:grid-cols-[1.2fr_0.8fr]">
          {/* Left Subtext: Role & Dynamic Terminal Typing */}
          <div>
            <div className="font-mono text-base font-bold text-white md:text-xl">
              <span className="text-[#3df5ff] mr-2">›</span>
              <span>AI Engineer & Full-Stack Developer</span>
            </div>

            {/* Rotating typewriter capability */}
            <div className="mt-3 min-h-[46px] border-l-2 border-[#3df5ff] bg-white/[0.02] p-3 font-mono text-xs text-white/80 md:text-sm">
              <span className="text-[#c8ff3d] mr-2 font-bold">»</span>
              <span>{subText}</span>
              <span className="typing-cursor" />
            </div>

            {/* Core Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton as="a" href="#projects" className="btn btn-primary" strength={0.25}>
                <span>EXPLORE WORK</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton as="a" href="#resumes" className="btn btn-secondary" strength={0.25}>
                <span>RESUMES</span>
                <Download size={16} />
              </MagneticButton>
              <MagneticButton as="a" href="#contact" className="btn btn-secondary border-[#3df5ff]/40 text-[#3df5ff]" strength={0.25}>
                <span>CONTACT</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Subtext Matching Screenshot: "Designing models, systems and interfaces that think. Scroll to explore ↓" */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <p className="max-w-md font-mono text-xs leading-relaxed text-white/50 sm:text-sm">
              Designing models, systems and interfaces that think. Scroll to explore ↓
            </p>

            {/* Metrics Counter Pill */}
            <div className="mt-6 flex flex-wrap gap-4 border border-white/10 bg-[#07080a]/80 p-3 font-mono text-xs backdrop-blur-md">
              {stats.map(([val, label]) => (
                <div key={label} className="text-left">
                  <span className="font-bold text-[#3df5ff]">{val}</span>{' '}
                  <span className="text-white/40">{label.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tilted Neon Cyan Ribbon Banner Across Bottom - Exact match to user screenshot! */}
      <div className="relative w-full overflow-hidden border-y border-[#3df5ff] bg-[#3df5ff] py-3.5 select-none shadow-[0_0_35px_rgba(61,245,255,0.4)] rotate-[-1deg] translate-y-3 z-20">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 items-center gap-8 font-black font-sans text-black text-xl sm:text-2xl tracking-tighter uppercase">
            <span>TS</span>
            <span className="text-black text-sm">✦</span>
            <span>NODE</span>
            <span className="text-black text-sm">✦</span>
            <span>POSTGRES</span>
            <span className="text-black text-sm">✦</span>
            <span>DOCKER</span>
            <span className="text-black text-sm">✦</span>
            <span>GEMMA 3:4B</span>
            <span className="text-black text-sm">✦</span>
            <span>LANGGRAPH</span>
            <span className="text-black text-sm">✦</span>
            <span>FASTAPI</span>
            <span className="text-black text-sm">✦</span>
            <span>SUPABASE</span>
            <span className="text-black text-sm">✦</span>
            <span>PGVECTOR</span>
            <span className="text-black text-sm">✦</span>
            <span>NEXT.JS</span>
            <span className="text-black text-sm">✦</span>
            <span>PYTORCH</span>
            <span className="text-black text-sm">✦</span>
            <span>PYTHON</span>
            <span className="text-black text-sm">✦</span>
            <span>GSM8K</span>
            <span className="text-black text-sm">✦</span>
          </div>
          <div className="animate-marquee flex shrink-0 items-center gap-8 font-black font-sans text-black text-xl sm:text-2xl tracking-tighter uppercase" aria-hidden="true">
            <span>TS</span>
            <span className="text-black text-sm">✦</span>
            <span>NODE</span>
            <span className="text-black text-sm">✦</span>
            <span>POSTGRES</span>
            <span className="text-black text-sm">✦</span>
            <span>DOCKER</span>
            <span className="text-black text-sm">✦</span>
            <span>GEMMA 3:4B</span>
            <span className="text-black text-sm">✦</span>
            <span>LANGGRAPH</span>
            <span className="text-black text-sm">✦</span>
            <span>FASTAPI</span>
            <span className="text-black text-sm">✦</span>
            <span>SUPABASE</span>
            <span className="text-black text-sm">✦</span>
            <span>PGVECTOR</span>
            <span className="text-black text-sm">✦</span>
            <span>NEXT.JS</span>
            <span className="text-black text-sm">✦</span>
            <span>PYTORCH</span>
            <span className="text-black text-sm">✦</span>
            <span>PYTHON</span>
            <span className="text-black text-sm">✦</span>
            <span>GSM8K</span>
            <span className="text-black text-sm">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
