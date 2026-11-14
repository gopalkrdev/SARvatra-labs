import React, { useState, useRef, useEffect } from 'react';
import {
  Radar,
  Database,
  Sliders,
  Layers,
  Volume2,
  VolumeX,
  ShieldAlert,
  Zap,
  Bot,
  Award,
  Satellite,
  Mountain,
  Sparkles,
  PlayCircle,
  BookOpen,
  FileCode,
  Wifi,
  WifiOff,
  FileText,
  Waves,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Language, translations } from '../services/i18n';

interface HeaderProps {
  analystMode: boolean;
  setAnalystMode: (val: boolean) => void;
  onOpenCatalog: () => void;
  activeDataCount: number;
  language: Language;
  setLanguage: (lang: Language) => void;
  onPlayVoiceAlert: () => void;
  isVoicePlaying: boolean;
  onOpenSitRep: () => void;
  onOpenCloudPenetration: () => void;
  onOpenAiCopilot: () => void;
  onOpenPolarimetry?: () => void;
  onOpenAccuracy?: () => void;
  onOpenOrbital?: () => void;
  onOpenTerrainProfile?: () => void;
  onOpenJudgeTour?: () => void;
  onOpenPortalManual?: () => void;
  onOpenHdf5Tree?: () => void;
  onOpenDossier?: () => void;
  onOpenOverpass?: () => void;
  onOpenCoherence?: () => void;
  isOfflineMode?: boolean;
  onToggleOfflineMode?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  analystMode,
  setAnalystMode,
  onOpenCatalog,
  activeDataCount,
  language,
  setLanguage,
  onPlayVoiceAlert,
  isVoicePlaying,
  onOpenSitRep,
  onOpenCloudPenetration,
  onOpenAiCopilot,
  onOpenPolarimetry,
  onOpenAccuracy,
  onOpenOrbital,
  onOpenTerrainProfile,
  onOpenJudgeTour,
  onOpenPortalManual,
  onOpenHdf5Tree,
  onOpenDossier,
  onOpenOverpass,
  onOpenCoherence,
  isOfflineMode = false,
  onToggleOfflineMode
}) => {
  const t = translations[language];

  // Professional Dropdown States
  const [scienceMenuOpen, setScienceMenuOpen] = useState(false);
  const [opsMenuOpen, setOpsMenuOpen] = useState(false);

  const scienceRef = useRef<HTMLDivElement>(null);
  const opsRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (scienceRef.current && !scienceRef.current.contains(e.target as Node)) {
        setScienceMenuOpen(false);
      }
      if (opsRef.current && !opsRef.current.contains(e.target as Node)) {
        setOpsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl transition-all">
      
      {/* TIER 1: Primary Brand, Navigation, System Status & Core Settings */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between border-b border-slate-800/80 gap-3">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-hud flex-shrink-0">
            <Radar className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white">SARVATRA</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 rounded">
                LAB
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                NISAR L2 GCOV
              </span>
            </div>
            <p className="hidden lg:block text-[10px] font-mono text-slate-400">
              NASA-ISRO SAR &bull; Sivasagar Flood Intelligence
            </p>
          </div>
        </div>

        {/* Center: Main Navigation Anchors */}
        <nav className="hidden xl:flex items-center space-x-4 text-xs font-mono text-slate-300">
          <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
          <a href="#dual-gallery-section" className="hover:text-cyan-400 transition-colors">Observations</a>
          <a href="#map-section" className="hover:text-cyan-400 transition-colors flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Live Map</span>
          </a>
          <a href="#swipe-section" className="hover:text-cyan-400 transition-colors">Swipe</a>
          <a href="#impact-section" className="hover:text-cyan-400 transition-colors">Impact</a>
          <a href="#science-section" className="hover:text-cyan-400 transition-colors">Methodology</a>
        </nav>

        {/* Right: Offline Boat-Mode, Language, Catalog, Mode Switcher (Ultra-Clean, NEVER Overflows) */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* OFFLINE BOAT-MODE PILL */}
          {onToggleOfflineMode && (
            <button
              onClick={onToggleOfflineMode}
              className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-all ${
                isOfflineMode
                  ? 'bg-amber-500 text-slate-950 border-amber-300 animate-pulse shadow-md shadow-amber-500/30'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-400'
              }`}
              title="Toggle 100% Offline Disaster Boat Mode (Zero Internet)"
            >
              {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden sm:inline">{isOfflineMode ? 'Boat Mode' : 'Online'}</span>
            </button>
          )}

          {/* Multi-Language Switcher (Compact) */}
          <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700/80 p-0.5 text-[11px] font-mono">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                language === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('as')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                language === 'as' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="অসমীয়া (Assamese)"
            >
              অসম
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                language === 'hi' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी
            </button>
          </div>

          {/* Local NISAR HDF5 Data Catalog Button */}
          <button
            onClick={onOpenCatalog}
            className="hidden sm:flex items-center space-x-1 px-2 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white transition-all shadow-sm"
            title="Inspect local NISAR HDF5 files"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">{activeDataCount} H5</span>
          </button>

          {/* Explorer vs Analyst Switcher */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-700 text-xs font-mono">
            <button
              onClick={() => setAnalystMode(false)}
              className={`px-2 py-1 rounded transition-all ${
                !analystMode
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Clean Explorer Interface"
            >
              Explorer
            </button>
            <button
              onClick={() => setAnalystMode(true)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-all ${
                analystMode
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Calibrate Radar Parameters & Thresholds"
            >
              <Sliders className="w-3 h-3" />
              <span>Analyst</span>
            </button>
          </div>

        </div>

      </div>

      {/* TIER 2: Professional Clean Mission Command Toolbar with Categorized Dropdowns (NEVER OVERFLOWS) */}
      <div className="bg-[#050a16]/95 px-3 sm:px-6 py-2 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap lg:flex-nowrap">
          
          {/* Left: Operations Badge + Primary 60s Judge Tour + Manual */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="hidden md:inline">MISSION COMMAND:</span>
            </div>

            {/* PRIMARY HERO BUTTON: 60s NISAR Orbital Recon Briefing */}
            {onOpenJudgeTour && (
              <button
                onClick={onOpenJudgeTour}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/25 border border-amber-200 transition-all transform hover:scale-[1.02]"
                title="60-Second Real-Time Radar Video Briefing & Satellite Telemetry Replay"
              >
                <PlayCircle className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
                <span>🛰️ 60s Radar Recon Briefing</span>
              </button>
            )}

            {/* USER GUIDE / MANUAL BUTTON */}
            {onOpenPortalManual && (
              <button
                onClick={onOpenPortalManual}
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-cyan-950/80 border border-cyan-400/70 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-hud"
                title="Interactive User Manual & Decoder"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Guide</span>
              </button>
            )}
          </div>

          {/* Center-Right: Organized Action Groups & Categorized Dropdowns */}
          <div className="flex items-center space-x-2 text-xs font-mono flex-wrap gap-y-1.5">
            
            {/* 1. EAS Voice Siren Alert */}
            <button
              onClick={onPlayVoiceAlert}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border font-bold transition-all shadow-sm ${
                isVoicePlaying
                  ? 'bg-rose-600 text-white border-rose-300 animate-pulse'
                  : 'bg-rose-950/60 text-rose-300 border-rose-500/50 hover:bg-rose-900/80'
              }`}
              title="Broadcast official EAS dual-tone siren & military voice warning"
            >
              {isVoicePlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-rose-400" />}
              <span>{isVoicePlaying ? 'Alerting...' : 'EAS Voice'}</span>
            </button>

            {/* 2. ASDMA Situation Report */}
            <button
              onClick={onOpenSitRep}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-200 hover:text-rose-300 transition-all shadow-sm"
              title="Official Government Disaster Situation Report (Print / PDF)"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>ASDMA SitRep</span>
            </button>

            {/* 3. NASA Official Submission Dossier */}
            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/80 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold transition-all shadow-sm"
                title="Official NASA Space Apps Challenge 2026 Submission Dossier & Rubric Compliance"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>NASA Dossier</span>
              </button>
            )}

            {/* 4. DROPDOWN 1: 🔬 Science & Radar Lab ▾ */}
            <div className="relative" ref={scienceRef}>
              <button
                onClick={() => {
                  setScienceMenuOpen(!scienceMenuOpen);
                  setOpsMenuOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-bold transition-all shadow-sm ${
                  scienceMenuOpen
                    ? 'bg-fuchsia-950 border-fuchsia-400 text-fuchsia-200 shadow-md'
                    : 'bg-slate-900 border-slate-700 hover:border-fuchsia-400 text-slate-200 hover:text-fuchsia-300'
                }`}
                title="Advanced Microwave Physics & Radar Decomposition Tools"
              >
                <Layers className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Radar Science</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${scienceMenuOpen ? 'rotate-180 text-fuchsia-400' : ''}`} />
              </button>

              {/* Science Dropdown Menu Popover */}
              {scienceMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#050b18] border-2 border-fuchsia-500/60 rounded-xl p-2 shadow-2xl z-50 space-y-1 font-mono text-xs animate-fadeIn">
                  <div className="px-2 py-1 text-[10px] text-fuchsia-400 uppercase font-bold tracking-wider border-b border-slate-800">
                    🔬 ADVANCED RADAR SCIENCE
                  </div>

                  {onOpenCoherence && (
                    <button
                      onClick={() => {
                        setScienceMenuOpen(false);
                        onOpenCoherence();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-fuchsia-950/70 text-slate-200 hover:text-fuchsia-200 transition-colors text-left"
                    >
                      <Waves className="w-4 h-4 text-fuchsia-400 shrink-0" />
                      <div>
                        <div className="font-bold">InSAR Coherence (γ)</div>
                        <div className="text-[10px] text-slate-400">Phase decorrelation over floodwater</div>
                      </div>
                    </button>
                  )}

                  {onOpenPolarimetry && (
                    <button
                      onClick={() => {
                        setScienceMenuOpen(false);
                        onOpenPolarimetry();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-fuchsia-950/70 text-slate-200 hover:text-fuchsia-200 transition-colors text-left"
                    >
                      <Layers className="w-4 h-4 text-fuchsia-400 shrink-0" />
                      <div>
                        <div className="font-bold">Pauli Polarimetry (RGB)</div>
                        <div className="text-[10px] text-slate-400">Surface, Double-Bounce &amp; Volume</div>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setScienceMenuOpen(false);
                      onOpenCloudPenetration();
                    }}
                    className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-cyan-950/70 text-slate-200 hover:text-cyan-200 transition-colors text-left"
                  >
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="font-bold">Cloud Piercer Comparison</div>
                      <div className="text-[10px] text-slate-400">Optical vs 9.3cm S-Band penetration</div>
                    </div>
                  </button>

                  {onOpenHdf5Tree && (
                    <button
                      onClick={() => {
                        setScienceMenuOpen(false);
                        onOpenHdf5Tree();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white transition-colors text-left"
                    >
                      <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="font-bold">Raw HDF5 Tree Inspector</div>
                        <div className="text-[10px] text-slate-400">Chunked float32 arrays &amp; CF-1.8</div>
                      </div>
                    </button>
                  )}

                  {onOpenOrbital && (
                    <button
                      onClick={() => {
                        setScienceMenuOpen(false);
                        onOpenOrbital();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-sky-950/70 text-slate-200 hover:text-sky-200 transition-colors text-left"
                    >
                      <Satellite className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <div className="font-bold">747km Satellite Orbit</div>
                        <div className="text-[10px] text-slate-400">Sun-synchronous LEO &amp; SweepSAR</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 5. DROPDOWN 2: 🏆 Mission Ops & Hydrology ▾ */}
            <div className="relative" ref={opsRef}>
              <button
                onClick={() => {
                  setOpsMenuOpen(!opsMenuOpen);
                  setScienceMenuOpen(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-bold transition-all shadow-sm ${
                  opsMenuOpen
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-md'
                    : 'bg-slate-900 border-slate-700 hover:border-emerald-400 text-slate-200 hover:text-emerald-300'
                }`}
                title="Ground Truth Validation, 3D Elevation, and Orbital Schedule"
              >
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mission Ops</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${opsMenuOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {/* Ops Dropdown Menu Popover */}
              {opsMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#050b18] border-2 border-emerald-500/60 rounded-xl p-2 shadow-2xl z-50 space-y-1 font-mono text-xs animate-fadeIn">
                  <div className="px-2 py-1 text-[10px] text-emerald-400 uppercase font-bold tracking-wider border-b border-slate-800">
                    🏆 GROUND TRUTH &amp; HYDROLOGY
                  </div>

                  {onOpenAccuracy && (
                    <button
                      onClick={() => {
                        setOpsMenuOpen(false);
                        onOpenAccuracy();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-emerald-950/70 text-slate-200 hover:text-emerald-200 transition-colors text-left"
                    >
                      <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold">CWC River Hydrograph</div>
                        <div className="text-[10px] text-slate-400">96.85m crest &amp; Kappa 0.89 benchmark</div>
                      </div>
                    </button>
                  )}

                  {onOpenOverpass && (
                    <button
                      onClick={() => {
                        setOpsMenuOpen(false);
                        onOpenOverpass();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-sky-950/70 text-slate-200 hover:text-sky-200 transition-colors text-left"
                    >
                      <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <div className="font-bold">Next Overpass Countdown</div>
                        <div className="text-[10px] text-slate-400">Track 114 orbital repeat window</div>
                      </div>
                    </button>
                  )}

                  {onOpenTerrainProfile && (
                    <button
                      onClick={() => {
                        setOpsMenuOpen(false);
                        onOpenTerrainProfile();
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg hover:bg-amber-950/70 text-slate-200 hover:text-amber-200 transition-colors text-left"
                    >
                      <Mountain className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="font-bold">3D Flood Depth &amp; DEM</div>
                        <div className="text-[10px] text-slate-400">Copernicus 30m HAND profile</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 6. SARvatra AI Copilot */}
            <button
              onClick={onOpenAiCopilot}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-bold transition-all shadow-hud"
              title="Interactive Natural Language SAR Assistant"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>

          </div>

        </div>
      </div>

    </header>
  );
};
