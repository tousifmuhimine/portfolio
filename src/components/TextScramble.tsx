'use client';

import { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  delay?: number;
  speed?: number;
  chars?: string;
  trigger?: boolean;
  onComplete?: () => void;
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';

export default function TextScramble({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  speed = 30,
  chars = DEFAULT_CHARS,
  trigger = true,
  onComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    let timer: NodeJS.Timeout;

    timer = setTimeout(() => {
      const totalFrames = text.length * 2.5;

      const animate = () => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 2.5) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration < totalFrames) {
          iteration += 1;
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          if (onComplete) onComplete();
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, chars, trigger, onComplete]);

  return <Component className={className}>{displayText || text}</Component>;
}
