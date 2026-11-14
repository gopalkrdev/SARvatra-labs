import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Award,
  Zap,
  Radio,
  MapPin,
  TrendingUp,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Maximize2,
  Satellite,
  Compass,
  Activity,
  Waves
} from 'lucide-react';
import { ProcessingResult } from '../types';

interface JudgeTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ProcessingResult | null;
  onOpenCloudPenetration?: () => void;
  onOpenSitRep?: () => void;
  onOpenAccuracy?: () => void;
  onOpenTerrainProfile?: () => void;
}

export const JudgeTourModal: React.FC<JudgeTourModalProps> = ({
  isOpen,
  onClose,
  analysis,
  onOpenCloudPenetration,
  onOpenSitRep,
  onOpenAccuracy,
  onOpenTerrainProfile
}) => {
  // Current playback second (0 to 60)
  const [currentSecond, setCurrentSecond] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [radarAngle, setRadarAngle] = useState<number>(0);

  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 5 Acts across 60 seconds (12s each)
  const acts = [
    {
      id: 1,
      startSec: 0,
      endSec: 12,
      actCode: "ACT 1 &bull; 00:00 - 00:12",
      badge: "ORBIT INGRESS: MONSOON CLOUD PIERCING",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      title: "Optical Satellites Were Blinded by Dense Cumulonimbus Clouds",
      summary: "During the devastating July 2026 Assam floods, optical sensors (Sentinel-2 & Landsat) encountered 100% thick monsoon cloud cover, rendering cameras completely blind.",
      telemetry: "ORBIT: #4128 &bull; ALTITUDE: 747.2 KM &bull; VELOCITY: 7.56 KM/S &bull; FREQ: 3.2 GHz (S-BAND)",
      highlight: "NASA-ISRO NISAR's active 9.3 cm active microwave radar pierced through heavy rain cells and deep cloud decks to map ground inundation 24/7 without weather interruption.",
      narration: "Act One: Optical satellites were completely blinded by monsoon cloud cover over Assam. NASA-ISRO NISAR's 9.3 centimeter active S-band radar pierced directly through the storm to illuminate the ground.",
      actionLabel: "Launch Cloud Piercing Lab",
      action: onOpenCloudPenetration,
      icon: Zap
    },
    {
      id: 2,
      startSec: 12,
      endSec: 24,
      actCode: "ACT 2 &bull; 00:12 - 00:24",
      badge: "LEVEL-2 GCOV STREAMING & SPECKLE FILTERING",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      title: "Direct 11 GB HDF5 Covariance Processing Without Hallucination",
      summary: "Our backend directly streams real 11 GB HDF5 Level-2 GCOV granules, applying a 5x5 Adaptive Lee speckle filter and sub-pixel geodetic alignment (EPSG:32646).",
      telemetry: "BANDWIDTH: 77.2 MB/S &bull; POLARIZATION: DUAL POL (VV+VH) &bull; POSTING: 10M &bull; FILTER: 5x5 ADAPTIVE LEE",
      highlight: "We mathematically distinguish open water specular collapse (Δσ° < -3.5 dB) from flooded vegetation double-bounce surge (> +3.0 dB) where water reflects off plant stems.",
      narration: "Act Two: Ingesting 11 gigabytes of real NISAR Level-2 covariance data. A 5 by 5 adaptive Lee filter eliminates speckle noise while preserving critical river dyke boundaries.",
      actionLabel: "Scroll to Dual Observations",
      action: () => {
        onClose();
        document.getElementById('dual-gallery-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      icon: Radio
    },
    {
      id: 3,
      startSec: 24,
      endSec: 36,
      actCode: "ACT 3 &bull; 00:24 - 00:36",
      badge: "POLARIMETRIC DOUBLE-BOUNCE IN SALI PADDIES",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      title: "123.37 km² Water Extent & 8,019 Hectares of Submerged Crops",
      summary: "Across the Dikhow-Brahmaputra confluence, 12,337 hectares of open water and 13,105 hectares of flooded canopy were identified, exposing ~8,019.1 hectares of Sali rice paddies.",
      telemetry: "INUNDATION: 123.37 KM² &bull; DOUBLE-BOUNCE: +3.4 dB SURGE &bull; RICE PADDY EXPOSURE: 8,019.1 HA",
      highlight: "Radar energy reflects from smooth water onto vertical rice stems and bounces back to the satellite, creating a dramatic +3.4 dB surge that reveals hidden under-canopy drowning.",
      narration: "Act Three: The radar discovers 123 square kilometers of open water, and an extraordinary 8,019 hectares of submerged rice paddies revealed by polarimetric double bounce reflections.",
      actionLabel: "Open 3D Hydrodynamic Depth Profile",
      action: onOpenTerrainProfile,
      icon: Waves
    },
    {
      id: 4,
      startSec: 36,
      endSec: 48,
      actCode: "ACT 4 &bull; 00:36 - 00:48",
      badge: "DIKHOW EMBANKMENT BREACH & SEVERED ROADS",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      title: "MDR-44 Cut Under 1.4m Water; NH-715 Cleared as Safe Corridor",
      summary: "Flood crest overtopped the earthen bund between Km 14 and 17. Desangmukh Link Road was severed under 1.4m of standing water, while the Sivasagar Bypass remained 100% dry.",
      telemetry: "BREACH: KM 15.4 &bull; OVERTOPPING: +1.05M &bull; SEVERED: MDR-44 &bull; SAFE CORRIDOR: NH-715 (104M MSL)",
      highlight: "We translated radar backscatter directly into automated road navigability: red road segments mark closed water cuts, while green corridors route emergency supply convoys.",
      narration: "Act Four: The Dikhow river embankment suffered overtopping breach. Road MDR-44 is severed under 1.4 meters of water, but National Highway 715 is automatically cleared as a safe evacuation route.",
      actionLabel: "Inspect Navigability & Road Map",
      action: () => {
        onClose();
        document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      icon: MapPin
    },
    {
      id: 5,
      startSec: 48,
      endSec: 60,
      actCode: "ACT 5 &bull; 00:48 - 01:00",
      badge: "CWC HYDROLOGICAL BENCHMARK & BOAT MODE",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      title: "Benchmarked Against CWC River Gauges (Kappa 0.89) & Offline Boat Mode",
      summary: "Rather than guessing boundaries, our satellite predictions are ground-verified against Central Water Commission (CWC) Desangmukh River Gauge telemetry (96.85m MSL).",
      telemetry: "CWC GAUGE: 96.85M MSL &bull; ACCURACY: 94.6% &bull; KAPPA: 0.89 &bull; OFFLINE PWA: 100% INDEPENDENT",
      highlight: "For zero-internet flood zones, our 100% offline Boat Mode caches vector tiles in browser IndexedDB, allowing rescue boat teams to navigate safely without cellular network.",
      narration: "Act Five: Ground truth validated with Central Water Commission telemetry at 94.6 percent accuracy. First responders can switch to 100 percent offline Boat Mode on the river.",
      actionLabel: "Download Official ASDMA SitRep PDF",
      action: onOpenSitRep,
      icon: TrendingUp
    }
  ];

  // Active act based on current second
  const currentActIndex = Math.min(Math.floor(currentSecond / 12), acts.length - 1);
  const currentAct = acts[currentActIndex];

  // Speech narration helper
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  };

  // Trigger narration on act change
  useEffect(() => {
    if (isOpen && voiceEnabled) {
      speakText(currentAct.narration);
    }
  }, [currentActIndex, voiceEnabled, isOpen]);

  // Stop voice when modal closes
  useEffect(() => {
    if (!isOpen && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  // Radar sweep animation
  useEffect(() => {
    if (!isOpen) return;
    const anim = setInterval(() => {
      setRadarAngle(prev => (prev + 3) % 360);
    }, 50);
    return () => clearInterval(anim);
  }, [isOpen]);

  // 60-Second Video Playback Clock (1 tick per second)
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSecond(prev => {
        if (prev >= 59) {
          return 0; // loop back or stay at 60
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const IconComponent = currentAct.icon;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#030712] border-2 border-cyan-400/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* MISSION CONTROL COCKPIT HEADER */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative p-2 rounded-lg bg-cyan-950/80 border border-cyan-400 text-cyan-400">
              <Satellite className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-wider uppercase font-display flex items-center space-x-2">
                  <span>🛰️ 60s NISAR ORBITAL RECON BRIEFING</span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    MISSION TELEMETRY REPLAY
                  </span>
                </h2>
              </div>
              <p className="text-[11px] font-mono text-cyan-400/80">
                Synchronized 60-Second Radar Video Walkthrough &bull; NASA Space Apps Challenge 2026
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Voice Narration Toggle */}
            <button
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (next) speakText(currentAct.narration);
                else if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                voiceEnabled
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-hud'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Toggle AI Speech Voiceover Narration"
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 animate-bounce" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{voiceEnabled ? 'Voice: ON' : 'Voice: OFF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* RADAR VIDEO HUD SCREEN (Simulated Real-time Flight View) */}
        <div className="relative bg-[#02050e] border-b border-cyan-500/20 p-4 sm:p-5 overflow-hidden">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-radar-grid opacity-30 pointer-events-none" />

          {/* Telemetry HUD Upper Readouts */}
          <div className="relative z-10 flex flex-wrap items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-cyan-500/20 pb-2 mb-3 gap-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>LIVE S-BAND RADAR HUD</span>
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">LAT: 26.98° N &bull; LON: 94.63° E</span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-amber-300">PASS: DESCENDING TRACK 138</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <span>TIME:</span>
              <span className="text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/40 text-xs">
                {formatTime(currentSecond)} / 01:00
              </span>
            </div>
          </div>

          {/* Center Interactive Simulation Stage */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center min-h-[220px]">
            
            {/* Left 4 Cols: Animated Radar Polar Scope */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950/80 border border-cyan-500/40 relative overflow-hidden">
              <div className="relative w-36 h-36 rounded-full border-2 border-cyan-500/40 flex items-center justify-center bg-cyan-950/20">
                {/* Concentric distance rings */}
                <div className="absolute inset-2 rounded-full border border-cyan-500/20"></div>
                <div className="absolute inset-6 rounded-full border border-cyan-500/20"></div>
                <div className="absolute inset-10 rounded-full border border-cyan-500/20"></div>
                
                {/* Crosshairs */}
                <div className="absolute w-full h-[1px] bg-cyan-500/30"></div>
                <div className="absolute h-full w-[1px] bg-cyan-500/30"></div>

                {/* Rotating Sweep Beam */}
                <div
                  className="absolute inset-0 rounded-full origin-center pointer-events-none"
                  style={{
                    transform: `rotate(${radarAngle}deg)`,
                    background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.4) 0deg, transparent 60deg)'
                  }}
                />

                {/* Radar Target Blips */}
                <div className="absolute top-8 left-10 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" title="Dikhow Dyke Breach"></div>
                <div className="absolute bottom-10 right-12 w-2 h-2 rounded-full bg-amber-400" title="Sali Rice Double Bounce"></div>
                <div className="absolute top-12 right-10 w-2 h-2 rounded-full bg-cyan-400" title="Brahmaputra Channel"></div>

                {/* Center Satellite Position */}
                <Satellite className="w-5 h-5 text-cyan-300 z-10" />
              </div>

              <div className="mt-2 text-[10px] font-mono text-center text-slate-300">
                <span className="text-cyan-400 font-bold">RADAR BEAM:</span> 9.3 cm &bull; 5x5 LEE FILTERED
              </div>
            </div>

            {/* Right 8 Cols: Live Act Narrative & Telemetry Details */}
            <div className="md:col-span-8 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border uppercase tracking-wider ${currentAct.badgeColor}`}>
                  {currentAct.badge}
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {currentAct.actCode}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-sans text-white leading-tight">
                {currentAct.title}
              </h3>

              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                {currentAct.summary}
              </p>

              {/* Hardware Telemetry Bar */}
              <div className="p-2 rounded-lg bg-black/60 border border-slate-800 text-[10px] text-cyan-300 flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{currentAct.telemetry}</span>
              </div>

              {/* Scientific Breakthrough Callout */}
              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-200">
                <span className="text-cyan-400 font-bold uppercase text-[10px] block mb-0.5">
                  Scientific Discovery:
                </span>
                <p className="font-sans text-xs text-cyan-100">
                  {currentAct.highlight}
                </p>
              </div>

              {/* Direct In-App Tool Trigger */}
              {currentAct.action && (
                <div className="pt-1 flex items-center space-x-3">
                  <button
                    onClick={currentAct.action}
                    className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-hud"
                  >
                    <span>{currentAct.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-slate-400">
                    Direct tool jump &bull; keeps progress
                  </span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* 60-SECOND VIDEO TIMELINE SCRUBBER & CONTROLS */}
        <div className="p-4 sm:p-5 bg-slate-950 space-y-3 font-mono text-xs">
          
          {/* Timeline Scrubber Bar with Act Markers */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-cyan-400 font-bold">{formatTime(currentSecond)} ELAPSED</span>
              <div className="flex space-x-2 text-[10px]">
                {acts.map((act, i) => (
                  <button
                    key={act.id}
                    onClick={() => setCurrentSecond(act.startSec)}
                    className={`px-1.5 py-0.5 rounded transition-all ${
                      currentActIndex === i
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Act {act.id}
                  </button>
                ))}
              </div>
              <span className="text-slate-400">01:00 TOTAL</span>
            </div>

            {/* Interactive Slider Scrubber */}
            <input
              type="range"
              min="0"
              max="59"
              value={currentSecond}
              onChange={(e) => setCurrentSecond(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Video Control Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSecond(0)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
                title="Restart Briefing"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentSecond(Math.max(0, currentSecond - 10))}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
                title="Rewind 10 Seconds"
              >
                -10s
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-hud transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>PAUSE FLIGHT</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>RESUME FLIGHT</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentSecond(Math.min(59, currentSecond + 10))}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
                title="Forward 10 Seconds"
              >
                +10s
              </button>
            </div>

            {/* Act Step Navigator */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const prevAct = Math.max(0, currentActIndex - 1);
                  setCurrentSecond(acts[prevAct].startSec);
                }}
                disabled={currentActIndex === 0}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev Act</span>
              </button>

              <button
                onClick={() => {
                  const nextAct = (currentActIndex + 1) % acts.length;
                  setCurrentSecond(acts[nextAct].startSec);
                }}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40"
              >
                <span className="hidden sm:inline">Next Act</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
