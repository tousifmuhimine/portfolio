'use client';

import { useState, useRef } from 'react';
import { GraduationCap, Briefcase, ChevronDown, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionReveal from './SectionReveal';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  time: string;
  place: string;
  bullets: string[];
}

interface EducationItem {
  school: string;
  detail: string;
  meta: string;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  education: EducationItem[];
}

export default function ExperienceSection({ experience, education }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  // Accordion state: keep active open index or allow toggle
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // GSAP: animate the vertical timeline line as a drawing effect
  useGSAP(() => {
    if (!lineProgressRef.current || !timelineRef.current) return;

    gsap.fromTo(
      lineProgressRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 scroll-mt-24 py-24 md:py-32"
    >
      <div className="section-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Sticky Left-hand Label & Meta */}
        <SectionReveal className="self-start lg:sticky lg:top-32">
          <div>
            <div className="eyebrow">
              <span className="live-dot" />
              // 06. Career & Foundations
            </div>
            <h2 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
              Experience &{' '}
              <span className="text-[#3df5ff]">Education</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-white/50 leading-relaxed">
              Verified software and AI engineering history, internships, international product rollouts, and university track.
            </p>

            {/* Quick Summary Pill */}
            <div className="mt-8 border border-white/10 bg-[#07080a] p-4 font-mono text-xs">
              <div className="flex items-center justify-between text-white/40 pb-2 border-b border-white/10">
                <span>TOTAL TRACK RECORD</span>
                <span className="text-[#c8ff3d]">VERIFIED</span>
              </div>
              <div className="mt-3 space-y-1.5 text-white/70">
                <div>• Cognisor AI — AI Engineer Intern</div>
                <div>• Fleek BD — Software Developer</div>
                <div>• FabricoMartBD — Full-Stack Developer</div>
                <div>• North South University — B.Sc. in CSE</div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Right Side: Timeline with Accordion Rows */}
        <div ref={timelineRef} className="relative pl-6 md:pl-10">
          {/* Background Track Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />

          {/* Glowing Animated Drawing Progress Line */}
          <div
            ref={lineProgressRef}
            className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-[#3df5ff] via-[#c8ff3d] to-[#3df5ff] shadow-[0_0_12px_rgba(61,245,255,0.7)]"
            style={{ height: '0%' }}
          />

          {/* Experience Accordion List */}
          <div className="space-y-6">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#3df5ff] mb-2">
              // COMMERCIAL & RESEARCH ROLES
            </div>

            {experience.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={item.company}
                  className="relative border border-white/10 bg-[#07080a] backdrop-blur-xl transition-all duration-300 hover:border-white/20"
                >
                  {/* Timeline Dot Indicator */}
                  <div
                    className={`absolute -left-[31px] md:-left-[47px] top-5 flex h-3.5 w-3.5 items-center justify-center border transition-all ${
                      isOpen
                        ? 'border-[#3df5ff] bg-[#3df5ff] shadow-[0_0_10px_rgba(61,245,255,0.8)]'
                        : 'border-white/30 bg-[#07080a]'
                    }`}
                  />

                  {/* Accordion Header Bar */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white/50">
                        <span className="flex items-center gap-1 text-[#3df5ff]">
                          <Calendar size={12} />
                          {item.time}
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.place}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-white md:text-xl">
                        {item.role} —{' '}
                        <span className="text-[#3df5ff]">{item.company}</span>
                      </h3>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 bg-white/5 text-white/60 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 border-[#3df5ff] text-[#3df5ff]' : ''
                      }`}
                    >
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-white/10 px-5 pb-5 pt-3"
                      >
                        <ul className="space-y-2 text-sm text-[#8e929b]">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2.5">
                              <span className="text-[#3df5ff] font-mono mt-0.5">›</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Education Section Header */}
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#c8ff3d] pt-6 mb-2">
              // ACADEMIC INSTITUTION
            </div>

            {education.map((item, idx) => (
              <div
                key={item.school}
                className="relative border border-white/10 bg-[#07080a] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20"
              >
                {/* Education Timeline Dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-5 flex h-4 w-4 items-center justify-center bg-[#c8ff3d] text-[#07080a]">
                  <GraduationCap size={10} />
                </div>

                <div className="font-mono text-xs text-[#c8ff3d]">{item.meta}</div>
                <h3 className="mt-1 text-lg font-bold text-white md:text-xl">{item.school}</h3>
                <p className="mt-1 text-sm text-[#8e929b]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
