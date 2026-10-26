'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  label: string;
  category: 'ai' | 'backend' | 'frontend' | 'ml';
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Edge {
  source: string;
  target: string;
}

const INITIAL_NODES: Node[] = [
  { id: 'llm', label: 'LLMs & GenAI', category: 'ai', x: 120, y: 70, vx: 0.1, vy: 0.05 },
  { id: 'langgraph', label: 'LangGraph Agents', category: 'ai', x: 280, y: 50, vx: -0.05, vy: 0.1 },
  { id: 'gemma', label: 'Gemma 3:4B', category: 'ai', x: 200, y: 130, vx: 0.08, vy: -0.05 },
  { id: 'pgvector', label: 'Supabase PGVector', category: 'backend', x: 380, y: 120, vx: -0.1, vy: -0.08 },
  { id: 'fastapi', label: 'FastAPI / Python', category: 'backend', x: 290, y: 200, vx: 0.05, vy: 0.07 },
  { id: 'nextjs', label: 'Next.js & React', category: 'frontend', x: 140, y: 220, vx: -0.06, vy: -0.04 },
  { id: 'pytorch', label: 'PyTorch / CNNs', category: 'ml', x: 420, y: 220, vx: 0.04, vy: -0.06 },
  { id: 'gsm8k', label: 'GSM8K Reasoning', category: 'ai', x: 90, y: 150, vx: -0.07, vy: 0.05 },
];

const EDGES: Edge[] = [
  { source: 'llm', target: 'langgraph' },
  { source: 'langgraph', target: 'pgvector' },
  { source: 'llm', target: 'gemma' },
  { source: 'gemma', target: 'gsm8k' },
  { source: 'gemma', target: 'fastapi' },
  { source: 'pgvector', target: 'fastapi' },
  { source: 'fastapi', target: 'nextjs' },
  { source: 'fastapi', target: 'pytorch' },
  { source: 'llm', target: 'gsm8k' },
];

export default function SkillNodeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = width < 500 ? 220 : 280);

    const nodes = INITIAL_NODES.map((n) => ({
      ...n,
      x: (n.x / 550) * width,
      y: (n.y / 280) * height,
    }));

    let animId: number;
    let pulseProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pulseProgress = (pulseProgress + 0.015) % 1;
      const isSmall = width < 500;

      // Draw Edges
      EDGES.forEach((edge) => {
        const src = nodes.find((n) => n.id === edge.source);
        const tgt = nodes.find((n) => n.id === edge.target);
        if (!src || !tgt) return;

        const isHighlighted = hoveredNode === src.id || hoveredNode === tgt.id;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = isHighlighted ? 'rgba(61, 245, 255, 0.7)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = isHighlighted ? 1.5 : 1;
        ctx.stroke();

        // Traveling neural signal pulse
        const pulseX = src.x + (tgt.x - src.x) * pulseProgress;
        const pulseY = src.y + (tgt.y - src.y) * pulseProgress;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(61, 245, 255, 0.8)';
        ctx.fill();
      });

      // Draw Nodes
      nodes.forEach((node) => {
        // Slow float
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 35 || node.x > width - 35) node.vx *= -1;
        if (node.y < 25 || node.y > height - 25) node.vy *= -1;

        const isHovered = hoveredNode === node.id;

        // Outer glow on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(61, 245, 255, 0.15)';
          ctx.fill();
        }

        // Inner circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle =
          node.category === 'ai'
            ? '#3df5ff'
            : node.category === 'backend'
            ? '#c8ff3d'
            : node.category === 'frontend'
            ? '#a78bfa'
            : '#fbbf24';
        ctx.fill();

        // Adaptive Label (shortened on small screens to prevent overlap)
        ctx.font = isSmall ? '8px monospace' : '10px monospace';
        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.65)';
        ctx.textAlign = 'center';

        const labelText = isSmall
          ? node.id === 'langgraph'
            ? 'LangGraph'
            : node.id === 'pgvector'
            ? 'PGVector'
            : node.id === 'fastapi'
            ? 'FastAPI'
            : node.id === 'nextjs'
            ? 'Next.js'
            : node.id === 'pytorch'
            ? 'PyTorch'
            : node.id === 'gsm8k'
            ? 'GSM8K'
            : node.id === 'llm'
            ? 'LLMs'
            : 'Gemma'
          : node.label;

        ctx.fillText(labelText, node.x, node.y - (isSmall ? 7 : 10));
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = width < 500 ? 220 : 280;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [hoveredNode]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#07080a]/80 p-3 sm:p-4 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] sm:text-[11px] text-white/50">
        <span className="flex items-center gap-1.5 text-[#3df5ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3df5ff]" />
          INTERACTIVE NEURAL GRAPH
        </span>
        <span className="hidden sm:inline">LATENT EMBEDDINGS LINKED</span>
      </div>
      <canvas ref={canvasRef} className="mt-2 w-full touch-none" />
    </div>
  );
}
