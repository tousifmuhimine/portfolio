'use client';

import { useState, useEffect } from 'react';
import { Command, Activity, Wifi } from 'lucide-react';

export default function TelemetryHUD({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [time, setTime] = useState('');
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(14);

  // Live ticking clock for Dhaka / UTC+6
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in 24h with seconds: HH:mm:ss UTC+6
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(`${timeStr} (UTC+6)`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real FPS calculation
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
        // Jitter ping slightly between 12ms and 18ms
        setPing(12 + Math.floor(Math.random() * 6));
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* Bottom-Right Floating Telemetry & Command Palette Trigger */}
      <div className="fixed bottom-4 right-4 z-40 hidden items-center gap-3 md:flex">
        {/* Command Palette Button */}
        <button
          type="button"
          onClick={onOpenPalette}
          className="group flex items-center gap-2 rounded-lg border border-white/10 bg-[#07080a]/90 px-3 py-1.5 font-mono text-xs text-white/70 backdrop-blur-md transition-all hover:border-[#3df5ff]/50 hover:bg-[#07080a] hover:text-white hover:shadow-[0_0_20px_rgba(61,245,255,0.15)]"
          title="Open Command Palette (⌘K)"
        >
          <div className="flex items-center gap-1 text-[#3df5ff]">
            <Command size={12} />
            <span className="font-bold">K</span>
          </div>
          <span className="text-white/40 group-hover:text-white/80">Command Menu</span>
        </button>

        {/* Live System Spec Chip */}
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#07080a]/90 px-3 py-1.5 font-mono text-[11px] text-white/50 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold text-emerald-300">ONLINE</span>
          </div>

          <span className="text-white/20">|</span>

          <div className="flex items-center gap-1">
            <Activity size={12} className="text-[#3df5ff]" />
            <span>{fps} FPS</span>
          </div>

          <span className="text-white/20">|</span>

          <div className="flex items-center gap-1">
            <Wifi size={12} className="text-[#c8ff3d]" />
            <span>{ping}ms</span>
          </div>

          <span className="text-white/20">|</span>

          <span className="text-white/70">{time || '23:19:44'}</span>
        </div>
      </div>
    </>
  );
}
