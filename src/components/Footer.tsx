'use client';

import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#07080a] px-6 py-10 font-mono text-xs text-white/50">
      <div className="section-container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#3df5ff]" />
          <span>SYS_ID: AM_TOUSIF // LATITUDE 23.81° N</span>
        </div>

        <p className="text-center text-white/40">
          © {new Date().getFullYear()} Abdullah Al Muhaimine (Tousif). Built for AI, ML, and full-stack roles.
        </p>

        <div className="text-right text-[#3df5ff]">
          ENGINEERED_ELEGANCE // 60FPS
        </div>
      </div>
    </footer>
  );
}
