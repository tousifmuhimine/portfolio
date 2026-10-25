'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'code' | 'link'>('default');
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch / mobile or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) return;
    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || 'default';
        if (type === 'view') {
          setCursorType('view');
          setCursorText('VIEW →');
        } else if (type === 'code') {
          setCursorType('code');
          setCursorText('');
        } else if (type === 'inspect') {
          setCursorType('view');
          setCursorText('INSPECT');
        } else {
          setCursorType('link');
          setCursorText('');
        }
      } else if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorType('link');
        setCursorText('');
      } else if (target.closest('pre, code, .font-mono')) {
        setCursorType('code');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Spring interpolation for trailing ring
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#3df5ff] transition-opacity duration-150 ${
          cursorType === 'view' ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Ring / View Pill / Reticle Crosshair */}
      <div
        ref={ringRef}
        style={{ willChange: 'transform' }}
        className={`fixed left-0 top-0 flex items-center justify-center transition-all duration-200 ease-out ${
          cursorType === 'view'
            ? '-ml-12 -mt-6 h-12 w-24 rounded-full border border-[#3df5ff] bg-[#3df5ff] text-[10px] font-mono font-bold tracking-widest text-[#07080a] shadow-[0_0_20px_rgba(61,245,255,0.4)]'
            : cursorType === 'code'
            ? '-ml-4 -mt-4 h-8 w-8 rounded-none border border-[#3df5ff]/80 bg-transparent before:absolute before:h-2 before:w-[1px] before:bg-[#3df5ff] after:absolute after:h-[1px] after:w-2 after:bg-[#3df5ff]'
            : cursorType === 'link'
            ? '-ml-6 -mt-6 h-12 w-12 rounded-full border border-[#3df5ff] bg-[#3df5ff]/10 backdrop-blur-[1px]'
            : '-ml-4 -mt-4 h-8 w-8 rounded-full border border-white/30 bg-transparent'
        }`}
      >
        {cursorType === 'view' && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
