'use client';

import { motion, type Variants } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  splitBy?: 'word' | 'char';
  once?: boolean;
  animate?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'div',
  splitBy = 'word',
  once = true,
  animate = false,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);
  const items = splitBy === 'char' ? text.split('') : text.split(' ');
  const variants = splitBy === 'char' ? charVariants : wordVariants;

  return (
    <MotionTag
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      custom={delay}
      {...(animate
        ? { initial: 'hidden', animate: 'visible' }
        : { initial: 'hidden', whileInView: 'visible', viewport: { once, margin: '-50px' } })}
      style={{ display: 'flex', flexWrap: 'wrap', perspective: '600px' }}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={variants}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
          }}
        >
          {item}
          {splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
}
