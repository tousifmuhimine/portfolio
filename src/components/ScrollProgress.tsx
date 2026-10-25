'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-gradient-to-r from-[#3df5ff] via-[#c8ff3d] to-[#3df5ff] shadow-[0_0_10px_rgba(61,245,255,0.7)]"
    />
  );
}
