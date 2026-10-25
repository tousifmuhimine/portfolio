'use client';

import { Download, Layers3, ArrowUpRight } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import SectionReveal from './SectionReveal';

interface Track {
  label: string;
  title: string;
  href: string;
  tone: string;
  summary: string;
}

interface ResumesSectionProps {
  tracks: Track[];
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function ResumesSection({ tracks }: ResumesSectionProps) {
  return (
    <section id="resumes" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="section-container">
        <SectionReveal>
          <div className="resume-band border border-white/10 bg-[#07080a] backdrop-blur-xl">
            <div>
              <div className="eyebrow">
                <Layers3 size={14} />
                // 07. Resume Repository
              </div>
              <h2 className="mt-3 text-3xl font-extrabold uppercase text-white sm:text-4xl md:text-5xl">
                Download the version that{' '}
                <span className="text-[#3df5ff]">Matches the Role</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8e929b]">
                The portfolio presents you as one complete builder, while the downloads let
                recruiters choose the AI, full-stack, or ML/DL angle immediately.
              </p>
              <div className="mt-6 flex items-center gap-3 font-mono text-xs text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3df5ff]" />
                FORMAT: PDF // RECENT UPDATE 2026
              </div>
            </div>

            <motion.div
              className="grid gap-3"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {tracks.map((resume, i) => (
                <motion.a
                  key={resume.href}
                  href={resume.href}
                  download
                  className="group flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] p-4 transition-all duration-200 hover:border-[#3df5ff] hover:bg-[#3df5ff]/5"
                  variants={linkVariants}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#3df5ff]">
                      [{`0${i + 1}`}]
                    </span>
                    <div>
                      <strong className="block text-sm font-bold text-white transition-colors group-hover:text-[#3df5ff]">
                        {resume.title}
                      </strong>
                      <small className="block font-mono text-[11px] text-white/50">
                        {resume.label} // {resume.tone.split(',')[0]}
                      </small>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center border border-white/10 bg-white/5 text-white/50 group-hover:border-[#3df5ff] group-hover:text-[#3df5ff] transition-colors">
                    <Download size={14} />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
