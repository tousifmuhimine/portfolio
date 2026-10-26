'use client';

import { useRef, useState, useEffect, useCallback, MouseEvent, TouchEvent } from 'react';
import ProjectCard3D from './ProjectCard3D';
import { Project } from './ProjectCard';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface HorizontalProjectsScrollProps {
  projects: Project[];
  onInspect: (project: Project) => void;
}

export default function HorizontalProjectsScroll({
  projects,
  onInspect,
}: HorizontalProjectsScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Smooth lerp scrolling state
  const targetScrollX = useRef(0);
  const currentScrollX = useRef(0);
  const maxScrollX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollX = useRef(0);

  // Recalculate max scroll width
  const updateMetrics = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const trackWidth = trackRef.current.scrollWidth;
    maxScrollX.current = Math.max(0, trackWidth - containerWidth);

    // Keep within bounds
    targetScrollX.current = Math.max(0, Math.min(targetScrollX.current, maxScrollX.current));
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics, projects]);

  // Silky 60fps momentum animation loop
  useEffect(() => {
    let animId: number;

    const animate = () => {
      const diff = targetScrollX.current - currentScrollX.current;
      currentScrollX.current += diff * 0.12;

      // When difference is tiny, snap to target
      if (Math.abs(diff) < 0.2) {
        currentScrollX.current = targetScrollX.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${currentScrollX.current}px, 0, 0)`;
      }

      const max = maxScrollX.current;
      const progress = max > 0 ? Math.min(1, Math.max(0, currentScrollX.current / max)) : 0;
      setScrollProgress(progress);
      setCanScrollLeft(currentScrollX.current > 10);
      setCanScrollRight(currentScrollX.current < max - 10);

      // Estimate active index based on card index
      if (projects.length > 0) {
        const estimatedIdx = Math.min(
          projects.length - 1,
          Math.max(0, Math.round(progress * (projects.length - 1)))
        );
        setActiveIndex(estimatedIdx);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [projects.length]);

  // Lock mouse wheel scroll horizontally only (prevent page from scrolling down/up)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: globalThis.WheelEvent) => {
      // Horizontal lock: intercept vertical and horizontal delta
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 1) {
        e.preventDefault();
        e.stopPropagation();

        updateMetrics();
        const multiplier = e.deltaMode === 1 ? 32 : 1.25;
        targetScrollX.current = Math.max(
          0,
          Math.min(targetScrollX.current + delta * multiplier, maxScrollX.current)
        );
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [updateMetrics]);

  // Arrow navigation
  const scrollStep = (direction: 'left' | 'right') => {
    updateMetrics();
    const cardStep = 520;
    if (direction === 'left') {
      targetScrollX.current = Math.max(0, targetScrollX.current - cardStep);
    } else {
      targetScrollX.current = Math.min(maxScrollX.current, targetScrollX.current + cardStep);
    }
  };

  // Mouse Drag to slide track
  const handleMouseDown = (e: MouseEvent) => {
    // Only drag with primary mouse button
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScrollX.current = targetScrollX.current;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    targetScrollX.current = Math.max(
      0,
      Math.min(dragStartScrollX.current - delta * 1.4, maxScrollX.current)
    );
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = '';
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartScrollX.current = targetScrollX.current;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    targetScrollX.current = Math.max(
      0,
      Math.min(dragStartScrollX.current - delta * 1.3, maxScrollX.current)
    );
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative mt-8 w-full select-none overflow-hidden"
    >
      {/* Top Showcase HUD bar with Status and Navigation controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs text-white/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#3df5ff]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#3df5ff] shadow-[0_0_8px_#3df5ff]" />
            <span className="font-bold">LOCKED HORIZONTAL TRACK</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="hidden sm:inline">SCROLL WHEEL OR DRAG TO SLIDE</span>
        </div>

        {/* Progress & Quick Nav Controls */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-white/70">
            [ {`0${activeIndex + 1}`.slice(-2)} / {`0${projects.length}`.slice(-2)} ]
          </span>

          {/* Interactive Progress Bar */}
          <div className="hidden h-1.5 w-28 overflow-hidden bg-white/10 sm:block">
            <div
              className="h-full bg-gradient-to-r from-[#3df5ff] to-[#c8ff3d] transition-all duration-100"
              style={{ width: `${Math.max(6, scrollProgress * 100)}%` }}
            />
          </div>

          {/* Manual Arrow Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollStep('left')}
              disabled={!canScrollLeft}
              className={`flex h-7 w-7 items-center justify-center border border-white/10 bg-[#07080a] text-white transition-all ${
                canScrollLeft
                  ? 'hover:border-[#3df5ff] hover:text-[#3df5ff]'
                  : 'cursor-not-allowed opacity-30'
              }`}
              title="Previous project"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => scrollStep('right')}
              disabled={!canScrollRight}
              className={`flex h-7 w-7 items-center justify-center border border-white/10 bg-[#07080a] text-white transition-all ${
                canScrollRight
                  ? 'hover:border-[#3df5ff] hover:text-[#3df5ff]'
                  : 'cursor-not-allowed opacity-30'
              }`}
              title="Next project"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Smoothly Lerped Horizontal Showcase Track */}
      <div className="relative py-2">
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="w-[82vw] max-w-[430px] sm:w-[460px] md:w-[500px] flex-shrink-0"
            >
              <ProjectCard3D project={project} index={idx} onInspect={onInspect} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
