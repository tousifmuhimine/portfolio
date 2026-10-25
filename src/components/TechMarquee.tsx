'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS_ROW_1 = [
  'GEMMA 3:4B',
  'LANGGRAPH',
  'FASTAPI',
  'SUPABASE',
  'PGVECTOR',
  'NEXT.JS',
  'PYTORCH',
  'OLLAMA',
  'TYPESCRIPT',
  'GSM8K BENCHMARKING',
  'TENSORFLOW',
  'REST APIS & JWT',
];

const TECH_ITEMS_ROW_2 = [
  'RAG PIPELINES',
  'MULTI-AGENT SYSTEMS',
  'TIME-SERIES ML',
  'CNNs & COMPUTER VISION',
  'NODE.JS',
  'STREAMLIT',
  'DOCKER',
  'SCIKIT-LEARN',
  'SUPERVISED TUNING',
  'POSTGRESQL',
];

export default function TechMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let velocity = 0;
    let animId: number;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      velocity = Math.abs(currentScroll - lastScroll);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let skew = 0;
    const updateMarquee = () => {
      // Decay velocity
      velocity *= 0.92;
      const targetSkew = Math.min(Math.max((velocity - 5) * 0.25, -6), 6);
      skew += (targetSkew - skew) * 0.1;

      if (marqueeRef.current) {
        marqueeRef.current.style.transform = `skewY(${skew}deg)`;
      }

      animId = requestAnimationFrame(updateMarquee);
    };

    animId = requestAnimationFrame(updateMarquee);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="relative z-10 overflow-hidden border-y border-white/10 bg-[#07080a] py-6 transition-transform duration-300"
    >
      {/* Blueprint grid accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3df5ff]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#3df5ff]/30 to-transparent" />

      {/* Row 1 - Leftward drift */}
      <div className="flex select-none overflow-hidden whitespace-nowrap">
        <div ref={track1Ref} className="animate-marquee flex shrink-0 items-center gap-8 py-1.5">
          {TECH_ITEMS_ROW_1.concat(TECH_ITEMS_ROW_1).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="font-mono text-xs font-bold tracking-widest text-white/70 hover:text-[#3df5ff] transition-colors">
                {item}
              </span>
              <span className="text-[#3df5ff] text-[10px]">✦</span>
            </div>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-8 py-1.5" aria-hidden="true">
          {TECH_ITEMS_ROW_1.concat(TECH_ITEMS_ROW_1).map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-8">
              <span className="font-mono text-xs font-bold tracking-widest text-white/70 hover:text-[#3df5ff] transition-colors">
                {item}
              </span>
              <span className="text-[#3df5ff] text-[10px]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Rightward drift */}
      <div className="mt-2 flex select-none overflow-hidden whitespace-nowrap opacity-60">
        <div ref={track2Ref} className="animate-marquee-reverse flex shrink-0 items-center gap-8 py-1.5">
          {TECH_ITEMS_ROW_2.concat(TECH_ITEMS_ROW_2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="font-mono text-xs font-semibold tracking-wider text-white/50 hover:text-[#c8ff3d] transition-colors">
                // {item}
              </span>
              <span className="text-[#c8ff3d] text-[10px]">■</span>
            </div>
          ))}
        </div>
        <div className="animate-marquee-reverse flex shrink-0 items-center gap-8 py-1.5" aria-hidden="true">
          {TECH_ITEMS_ROW_2.concat(TECH_ITEMS_ROW_2).map((item, idx) => (
            <div key={`dup2-${idx}`} className="flex items-center gap-8">
              <span className="font-mono text-xs font-semibold tracking-wider text-white/50 hover:text-[#c8ff3d] transition-colors">
                // {item}
              </span>
              <span className="text-[#c8ff3d] text-[10px]">■</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
