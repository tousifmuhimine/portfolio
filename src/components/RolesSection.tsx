'use client';

import { motion, type Variants } from 'motion/react';
import SectionReveal from './SectionReveal';

interface Track {
  label: string;
  title: string;
  href: string;
  tone: string;
  summary: string;
}

interface RolesSectionProps {
  tracks: Track[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function RolesSection({ tracks }: RolesSectionProps) {
  return (
    <section id="roles" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="section-container">
        <SectionReveal>
          <div className="mb-12 max-w-3xl">
            <div className="eyebrow">
              <span className="live-dot" />
              // 03. Focus Profiles
            </div>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              Same Engineer,{' '}
              <span className="text-[#3df5ff]">Different Role Focus</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-white/50">
              Four specialized lenses on the same systems foundation. Select the track matching your organizational requirements.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 min-w-0 max-w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {tracks.map((track, i) => (
            <motion.article
              key={track.title}
              className="group relative flex flex-col justify-between border border-white/10 bg-[#07080a] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#3df5ff]/50 hover:shadow-[0_0_30px_rgba(61,245,255,0.08)] min-w-0 max-w-full overflow-hidden"
              variants={cardVariants}
            >
              {/* Top Index Corner */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="font-bold text-[#3df5ff]">[{`0${i + 1}`}]</span>
                <span className="border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase text-white/70">
                  {track.label}
                </span>
              </div>

              <div className="my-6">
                <h3 className="text-xl font-bold text-white group-hover:text-[#3df5ff] transition-colors">
                  {track.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e929b]">
                  {track.summary}
                </p>
              </div>

              {/* Bottom Spec Footer */}
              <div className="border-t border-white/10 pt-4 font-mono text-[11px] text-white/40">
                <span className="block text-[#c8ff3d]">// CORE STACK:</span>
                <span className="mt-0.5 block leading-normal text-white/60">
                  {track.tone}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
