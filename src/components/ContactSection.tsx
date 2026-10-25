'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Copy, Check, ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText('abdullahtsn13@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="relative z-10 scroll-mt-24 py-24 md:py-36">
      <div className="section-container max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.div
          className="eyebrow mx-auto w-fit"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="live-dot" />
          // 08. Let&apos;s Build
        </motion.div>

        {/* Giant Hero Heading */}
        <motion.h2
          className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ lineHeight: 1.05, textWrap: 'balance' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Have an AI product, model, or backend that needs to become{' '}
          <span className="text-[#3df5ff]">real?</span>
        </motion.h2>

        <p className="mt-4 font-mono text-xs text-white/50 max-w-xl mx-auto">
          Currently taking selective engineering roles, AI product consulting, and full-stack system contracts.
        </p>

        {/* Unified Luxury Interactive Email Card (Replaces the messy terminal box) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 mx-auto max-w-xl rounded-full border border-white/15 bg-[#07080a]/90 p-2 sm:p-2.5 pl-5 sm:pl-6 shadow-2xl backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          {/* Email Address with Icon */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3df5ff]/30 bg-[#3df5ff]/10 text-[#3df5ff]">
              <Mail size={16} />
            </div>
            <a
              href="mailto:abdullahtsn13@gmail.com"
              className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-white hover:text-[#3df5ff] transition-colors"
            >
              abdullahtsn13@gmail.com
            </a>
          </div>

          {/* Action Buttons: Copy & Send */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Copy Button with Animated Feedback */}
            <button
              type="button"
              onClick={copyEmail}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 ${
                copied
                  ? 'border border-[#c8ff3d]/60 bg-[#c8ff3d]/15 text-[#c8ff3d] shadow-[0_0_15px_rgba(200,255,61,0.25)]'
                  : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white'
              }`}
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#c8ff3d]" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>COPY</span>
                </>
              )}
            </button>

            {/* Direct Send Email Button */}
            <a
              href="mailto:abdullahtsn13@gmail.com"
              className="flex items-center gap-1.5 rounded-full bg-[#3df5ff] px-4 py-2 font-mono text-xs font-bold text-black transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(61,245,255,0.4)]"
            >
              <span>SEND</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Channels Row: GitHub, LinkedIn & Location */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticButton
            as="a"
            href="https://github.com/tousifmuhimine"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
          >
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-[#07080a] px-5 py-2.5 text-white/80 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Github size={15} />
              GitHub
              <ArrowUpRight size={12} className="text-white/40" />
            </span>
          </MagneticButton>

          <MagneticButton
            as="a"
            href="https://linkedin.com/in/tousifmuhimine"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.25}
          >
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-[#07080a] px-5 py-2.5 text-white/80 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white">
              <Linkedin size={15} />
              LinkedIn
              <ArrowUpRight size={12} className="text-white/40" />
            </span>
          </MagneticButton>

          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-[#07080a] px-4 py-2.5 text-white/50">
            <MapPin size={15} />
            Dhaka, Bangladesh
          </span>
        </motion.div>
      </div>
    </section>
  );
}
