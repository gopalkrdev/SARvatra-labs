import React, { useState, useRef, useEffect } from 'react';
import { Columns, Split, Calendar, Layers, ShieldCheck, Eye, Play, Pause, Zap, Flame } from 'lucide-react';
import { ProcessingResult } from '../types';

interface SwipeComparisonProps {
  analysis: ProcessingResult | null;
}

export const SwipeComparison: React.FC<SwipeComparisonProps> = ({ analysis }) => {
  const [viewMode, setViewMode] = useState<'curtain' | 'sideBySide' | 'blink'>('curtain');
  const [sliderPosition, setSliderPosition] = useState(50);
  
  // Blink Comparator State (2 Hz Astronomical Standard)
  const [blinkFrame, setBlinkFrame] = useState<'pre' | 'post'>('pre');
  const [isBlinking, setIsBlinking] = useState(true);
  const [blinkSpeedMs, setBlinkSpeedMs] = useState<number>(500); // 500ms = 2 Hz

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Blink Interval Effect
  useEffect(() => {
    if (viewMode !== 'blink' || !isBlinking) return;

    const interval = setInterval(() => {
      setBlinkFrame((prev) => (prev === 'pre' ? 'post' : 'pre'));
    }, blinkSpeedMs);

    return () => clearInterval(interval);
  }, [viewMode, isBlinking, blinkSpeedMs]);

  if (!analysis) {
    return null;
  }

  const { metadata, layers } = analysis;

  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section id="swipe-section" className="hud-panel p-5 my-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Split className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display font-bold text-lg text-white tracking-wide">
              MULTI-TEMPORAL RADAR SWIPE &amp; BLINK COMPARATOR
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold">
              EPSG:32646 10m Pixel Synchronized
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Compare pre-event surface scattering against peak inundation over the exact same 10-meter geospatial grid
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <button
            onClick={() => setViewMode('curtain')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded transition-all ${
              viewMode === 'curtain'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-hud'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-500'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Interactive Curtain</span>
          </button>

          <button
            onClick={() => setViewMode('sideBySide')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded transition-all ${
              viewMode === 'sideBySide'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-hud'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-500'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>

          {/* Astronomical Blink Comparator */}
          <button
            onClick={() => setViewMode('blink')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded transition-all ${
              viewMode === 'blink'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
            }`}
            title="Rapid alternating strobe between dates — instantly spots newly inundated flood pools"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Blink Comparator (2 Hz)</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </button>
        </div>
      </div>

      {/* Date Tags Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs font-mono">
        <div className="p-2 rounded bg-slate-900/80 border border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span className="font-bold text-sky-300">PRE-FLOOD REFERENCE:</span>
            <span className="text-white font-semibold">{metadata.pre_observation_date}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-normal">S-Band HHHH (Pre-Monsoon Normal)</span>
        </div>

        <div className="p-2 rounded bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-cyan-300">POST-FLOOD ONSET:</span>
            <span className="text-white font-semibold">{metadata.post_observation_date}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-normal">S-Band HHHH (Peak River Crest Stage)</span>
        </div>
      </div>

      {/* MODE 1: Interactive Curtain */}
      {viewMode === 'curtain' && (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          className="relative w-full h-[520px] rounded-lg overflow-hidden border border-cyan-500/20 bg-slate-950 cursor-ew-resize select-none touch-none"
        >
          {/* Post Image (Full Background) */}
          <img
            src={layers.post_radar_png}
            alt="Post-Flood NISAR Radar"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* Pre Image (Clipped Left Side) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={layers.pre_radar_png}
              alt="Pre-Flood NISAR Radar"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none'
              }}
            />
          </div>

          {/* Vertical Dividing Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cyan-400 pointer-events-none shadow-[0_0_15px_#00F0FF,0_0_30px_#00F0FF]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-hud flex items-center justify-center text-cyan-400 font-mono text-[10px] font-bold">
              &harr;
            </div>
          </div>

          {/* Corner Floating Badges */}
          <div className="absolute top-4 left-4 pointer-events-none px-3 py-1 rounded bg-slate-950/85 backdrop-blur-md border border-sky-500/40 text-xs font-mono text-sky-300 font-bold shadow-md">
            &larr; PRE: 15 July 2026
          </div>
          <div className="absolute top-4 right-4 pointer-events-none px-3 py-1 rounded bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold shadow-md">
            POST: 22 July 2026 &rarr;
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
            Drag divider horizontally to inspect localized backscatter collapse
          </div>
        </div>
      )}

      {/* MODE 2: Side-by-Side Mode */}
      {viewMode === 'sideBySide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-950 h-[480px]">
            <img
              src={layers.pre_radar_png}
              alt="Pre-Flood NISAR"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/85 border border-sky-400/40 text-xs font-mono text-sky-300 font-bold">
              PRE: 15 July 2026
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-950 h-[480px]">
            <img
              src={layers.post_radar_png}
              alt="Post-Flood NISAR"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/85 border border-cyan-400/40 text-xs font-mono text-cyan-300 font-bold">
              POST: 22 July 2026
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: Astronomical Blink Comparator Mode */}
      {viewMode === 'blink' && (
        <div className="flex flex-col space-y-3">
          
          {/* Blink Controls Bar */}
          <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsBlinking(!isBlinking)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-bold transition-all ${
                  isBlinking
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isBlinking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isBlinking ? 'Pause Strobe' : 'Resume Strobe'}</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Frequency:</span>
                {[
                  { label: '1 Hz (Slow)', ms: 1000 },
                  { label: '2 Hz (Optimal)', ms: 500 },
                  { label: '4 Hz (Rapid)', ms: 250 }
                ].map((s) => (
                  <button
                    key={s.ms}
                    onClick={() => setBlinkSpeedMs(s.ms)}
                    className={`px-2 py-1 rounded text-[11px] transition-all ${
                      blinkSpeedMs === s.ms
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Active Strobe Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-[11px]">Active Image:</span>
              <div
                className={`px-3 py-1 rounded border font-bold text-xs transition-colors duration-150 ${
                  blinkFrame === 'pre'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                }`}
              >
                {blinkFrame === 'pre' ? '● PRE-FLOOD (15 JULY 2026)' : '● POST-FLOOD (22 JULY 2026)'}
              </div>
            </div>

          </div>

          {/* Strobe Canvas */}
          <div className="relative w-full h-[520px] rounded-lg overflow-hidden border-2 border-amber-500/40 bg-slate-950 flex items-center justify-center">
            
            <img
              src={blinkFrame === 'pre' ? layers.pre_radar_png : layers.post_radar_png}
              alt={blinkFrame === 'pre' ? 'Pre-Flood Observation' : 'Post-Flood Observation'}
              className="w-full h-full object-contain"
            />

            {/* Top-Right Optical Illusion / Flash Notification */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-amber-500/50 text-xs font-mono text-amber-300 flex items-center space-x-2 shadow-xl">
              <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>
                {blinkFrame === 'pre' ? 'FRAME A: BASELINE TOPOGRAPHY' : 'FRAME B: FLOOD SURGE PULSE'}
              </span>
            </div>

            {/* Water Pulse Callout */}
            <div className="absolute bottom-4 left-4 max-w-md p-3 rounded-lg bg-black/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-slate-300">
              <div className="text-amber-400 font-bold mb-1 flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>HOW TO SPOT FLOODS WITH BLINK COMPARATOR:</span>
              </div>
              <p>
                Fixed terrain, dry roads, and elevated towns remain completely stationary. Any area that visibly <strong>flickers or darkens</strong> is standing water reflecting the radar pulse away!
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Physics Explanation Pill */}
      <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-mono flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Physical Principle: Standing open water creates a smooth specular surface reflecting microwave pulses away, causing an intense backscatter drop (&gt; 3.5 dB).
          </span>
        </div>
        <span className="text-cyan-400 font-bold">Level-2 Calibrated GCOV</span>
      </div>

    </section>
  );
};
