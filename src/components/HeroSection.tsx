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
        <div className="mt-6 sm:mt-8 select-none">
          {/* Row 1: ABDULLAH AL MUHAIMINE (TOUSIF) */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8.5vw] font-black leading-[0.95] tracking-tighter text-[#ecebe6] uppercase">
              <TextScramble
                text="Abdullah Al Muhaimine"
                delay={150}
                speed={22}
              />
            </h1>
            <span className="font-mono text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#3df5ff]/70">
              (TOUSIF)
            </span>
          </div>

          {/* Row 2: AI ENGINEER. with Neon Cyan Glow Box & Backdrop */}
          <div className="relative mt-2 sm:mt-3 inline-block max-w-full">
            <div className="relative inline-block border border-[#3df5ff]/80 bg-[#3df5ff]/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm shadow-[0_0_40px_rgba(61,245,255,0.3)] max-w-full">
              {/* Backlight Cyan Glow Aura */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[#3df5ff] blur-xl opacity-20" />

              <span className="text-3xl sm:text-5xl md:text-7xl lg:text-[8.5vw] font-black leading-[0.95] tracking-tighter text-[#3df5ff] uppercase block">
                AI ENGINEER.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Split Narrative Row Matching Reference Image */}
        <div className="mt-8 sm:mt-12 grid items-end gap-6 sm:gap-8 pb-12 sm:pb-16 md:grid-cols-[1.2fr_0.8fr]">
          {/* Left Subtext: Role & Dynamic Terminal Typing */}
          <div>
            <div className="font-mono text-sm sm:text-base md:text-xl font-bold text-white">
              <span className="text-[#3df5ff] mr-2">›</span>
              <span>AI Engineer & Full-Stack Developer</span>
            </div>

            {/* Rotating typewriter capability */}
            <div className="mt-3 min-h-[46px] border-l-2 border-[#3df5ff] bg-white/[0.02] p-2.5 sm:p-3 font-mono text-xs text-white/80 md:text-sm">
              <span className="text-[#c8ff3d] mr-2 font-bold">»</span>
              <span>{subText}</span>
              <span className="typing-cursor" />
            </div>

            {/* Core Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <MagneticButton as="a" href="#projects" className="btn btn-primary text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5" strength={0.25}>
                <span>EXPLORE WORK</span>
                <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton as="a" href="#resumes" className="btn btn-secondary text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5" strength={0.25}>
                <span>RESUMES</span>
                <Download size={15} />
              </MagneticButton>
              <MagneticButton as="a" href="#contact" className="btn btn-secondary border-[#3df5ff]/40 text-[#3df5ff] text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-5" strength={0.25}>
                <span>CONTACT</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Subtext Matching Screenshot */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <p className="max-w-md font-mono text-xs leading-relaxed text-white/50 sm:text-sm">
              Designing models, systems and interfaces that think. Scroll to explore ↓
            </p>

            {/* Metrics Counter Pill */}
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4 border border-white/10 bg-[#07080a]/80 p-3 font-mono text-xs backdrop-blur-md w-full sm:w-auto">
              {stats.map(([val, label]) => (
                <div key={label} className="text-left p-1">
                  <span className="font-bold text-[#3df5ff] text-sm sm:text-xs">{val}</span>{' '}
                  <span className="text-white/40 text-[11px]">{label.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tilted Neon Cyan Ribbon Banner Across Bottom - Safe for mobile */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="w-[104%] -ml-[2%] overflow-hidden border-y border-[#3df5ff] bg-[#3df5ff] py-2.5 sm:py-3.5 select-none shadow-[0_0_35px_rgba(61,245,255,0.4)] rotate-[-1deg]">
          <div className="flex overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex shrink-0 items-center gap-6 sm:gap-8 font-black font-sans text-black text-lg sm:text-2xl tracking-tighter uppercase">
              <span>TS</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>NODE</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>POSTGRES</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>DOCKER</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>GEMMA 3:4B</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>LANGGRAPH</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>FASTAPI</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>SUPABASE</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>PGVECTOR</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>NEXT.JS</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>PYTORCH</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>PYTHON</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>GSM8K</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
            </div>
            <div className="animate-marquee flex shrink-0 items-center gap-6 sm:gap-8 font-black font-sans text-black text-lg sm:text-2xl tracking-tighter uppercase" aria-hidden="true">
              <span>TS</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>NODE</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>POSTGRES</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>DOCKER</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>GEMMA 3:4B</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>LANGGRAPH</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>FASTAPI</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>SUPABASE</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>PGVECTOR</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>NEXT.JS</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>PYTORCH</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>PYTHON</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
              <span>GSM8K</span>
              <span className="text-black text-xs sm:text-sm">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
