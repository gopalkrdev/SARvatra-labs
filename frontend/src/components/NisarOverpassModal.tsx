import React, { useState, useEffect } from 'react';
import { X, Satellite, Clock, Calendar, CheckCircle2, Radio, Compass, ArrowRight, BellRing, Sparkles } from 'lucide-react';

interface NisarOverpassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NisarOverpassModal: React.FC<NisarOverpassModalProps> = ({ isOpen, onClose }) => {
  const [taskScheduled, setTaskScheduled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 11,
    minutes: 28,
    seconds: 45
  });

  // Ticking countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#030918] border-2 border-sky-400 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/95 border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-sky-500/20 border border-sky-400 text-sky-300">
              <Satellite className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  NISAR 12-DAY ORBIT OVERPASS COUNTDOWN &bull; SIVASAGAR TRACK 114
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/40">
                  Mission Ops Planner
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                NASA-ISRO Sun-Synchronous LEO (747 km) &bull; Repeat Cycle: 12 Days (6-Day Interleaved)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs text-slate-300 no-scrollbar">
          
          {/* Live Countdown Display */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-cyan-950/80 border border-sky-500/40 text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-bold block">
              NEXT SATELLITE PASS ACQUISITION WINDOW:
            </span>

            <div className="flex items-center justify-center space-x-4">
              <div className="bg-slate-950/80 border border-sky-500/40 px-4 py-2.5 rounded-lg min-w-[70px]">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Days</div>
              </div>

              <span className="text-2xl font-bold text-sky-400">:</span>

              <div className="bg-slate-950/80 border border-sky-500/40 px-4 py-2.5 rounded-lg min-w-[70px]">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Hours</div>
              </div>

              <span className="text-2xl font-bold text-sky-400">:</span>

              <div className="bg-slate-950/80 border border-sky-500/40 px-4 py-2.5 rounded-lg min-w-[70px]">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Minutes</div>
              </div>

              <span className="text-2xl font-bold text-sky-400">:</span>

              <div className="bg-slate-950/80 border border-sky-500/40 px-4 py-2.5 rounded-lg min-w-[70px]">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-display">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-slate-400 uppercase">Seconds</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 font-normal">
              <strong>Target Acquisition Time:</strong> 03 August 2026 at 06:14:22 UTC (11:44:22 AM IST) &bull; Descending Track 114
            </p>
          </div>

          {/* Orbital Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-xs flex items-center space-x-1.5 border-b border-slate-800 pb-1">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>ORBIT &amp; SWATH TELEMETRY</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Orbit Altitude:</span>
                  <span className="text-white font-bold">747.0 km (Sun-Synchronous)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Inclination Angle:</span>
                  <span className="text-white">98.4° LEO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Swath Width:</span>
                  <span className="text-cyan-300 font-bold">242 km SweepSAR DBBF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Incidence Angle:</span>
                  <span className="text-slate-300">37.2° (Right-Looking)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ground Coverage:</span>
                  <span className="text-amber-300">Sivasagar, Dibrugarh, Majuli</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-xs flex items-center space-x-1.5 border-b border-slate-800 pb-1">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>SENSOR &amp; RADAR CONFIGURATION</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequency Band:</span>
                  <span className="text-white font-bold">S-Band (3.2 GHz, λ = 9.3 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Polarization Mode:</span>
                  <span className="text-white font-bold">Dual-Pol (HHHH + HVHV)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Antenna Aperture:</span>
                  <span className="text-slate-300">12-meter Deployable Reflector</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Spatial Sampling:</span>
                  <span className="text-emerald-400 font-bold">10-meter Level-2 GCOV</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Latency:</span>
                  <span className="text-slate-300">&lt; 4 Hours Post-Downlink</span>
                </div>
              </div>
            </div>

          </div>

          {/* Mission Planner Tasking Action */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-bold text-white text-xs flex items-center space-x-1.5">
                <BellRing className="w-4 h-4 text-sky-400" />
                <span>AUTOMATED POST-OVERPASS INUNDATION PIPELINE</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 max-w-lg">
                Pre-registers Sivasagar coordinates with SARvatra Lab backend. The moment the August 3 Level-2 GCOV granule is downlinked, automated Lee filtering and change detection will execute immediately.
              </p>
            </div>

            <button
              onClick={() => setTaskScheduled(true)}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center space-x-1.5 ${
                taskScheduled
                  ? 'bg-emerald-500 text-slate-950 cursor-default'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
              }`}
            >
              {taskScheduled ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pipeline Tasked &bull; Standby</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Schedule Auto-Tasking</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
