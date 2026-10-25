'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_LOGS = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'LOADING WEIGHTS // GEMMA-3:4B & LANGGRAPH [OK]',
  'MOUNTING SUPABASE PGVECTOR RETRIEVAL PIPELINE [OK]',
  'COMPILING SHADER KERNELS & THREE.JS SCENE [OK]',
  'VERIFYING REASONING BENCHMARKS (GSM8K) [OK]',
  'CALIBRATING 60FPS ENGINE... ALL SYSTEMS NOMINAL.',
];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [percent, setPercent] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if previously loaded in this session
    const hasLoaded = sessionStorage.getItem('portfolio_preloader_complete');
    if (hasLoaded) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem('portfolio_preloader_complete', 'true');
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        // Random incremental jump
        const next = prev + Math.floor(Math.random() * 8) + 3;
        return Math.min(next, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const logIdx = Math.min(
      Math.floor((percent / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );
    setLogIndex(logIdx);
  }, [percent]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#07080a] p-6 font-mono text-[#ecebe6] sm:p-12"
        >
          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#3df5ff]" />
              <span className="text-[#3df5ff] font-semibold">// BOOTLOADER v2.6.4</span>
            </div>
            <div className="hidden sm:block">ARCH: X86_64 // NEURAL RUNTIME</div>
            <div>STATUS: BOOTING</div>
          </div>

          {/* Central Progress & Log Display */}
          <div className="mx-auto w-full max-w-xl py-12">
            <div className="text-right text-xs text-[#3df5ff]">
              [ {percent.toString().padStart(3, '0')}% ]
            </div>

            {/* Giant Monospace Counter */}
            <div className="font-mono text-6xl font-black tracking-tighter text-white sm:text-8xl">
              {percent}
              <span className="text-[#3df5ff]">%</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1 w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3df5ff] via-[#c8ff3d] to-[#3df5ff]"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Boot Log Stream */}
            <div className="mt-6 space-y-1.5 text-xs text-white/60">
              {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#3df5ff]">{'>'}</span>
                  <span className={idx === logIndex ? 'text-white' : 'text-white/40'}>
                    {log}
                  </span>
                  {idx === logIndex && (
                    <span className="inline-block h-3 w-1.5 animate-pulse bg-[#3df5ff]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Terminal Footnote */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-white/40">
            <span>ABDULLAH AL MUHAIMINE // TOUSIF</span>
            <span className="text-[#3df5ff]">AI & FULL-STACK SYSTEM</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
