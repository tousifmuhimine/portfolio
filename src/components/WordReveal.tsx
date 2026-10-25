'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
}

export default function WordReveal({ text, className = '' }: WordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 45%'],
  });

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: any;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['#44474f', '#ecebe6']);

  return (
    <motion.span style={{ opacity, color }} className="inline-block transition-colors duration-150">
      {children}
    </motion.span>
  );
}
