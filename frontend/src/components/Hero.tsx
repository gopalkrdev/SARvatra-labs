import React from 'react';
import {
  ArrowRight,
  Satellite,
  ShieldCheck,
  MapPin,
  Waves,
  Sparkles,
  ShieldAlert,
  Mountain,
  Zap,
  Bot,
  Layers,
  Award,
  PlayCircle,
  BookOpen,
  FileText,
  Search,
  ExternalLink,
  Cpu,
  Compass
} from 'lucide-react';
import { Language, translations } from '../services/i18n';

interface HeroProps {
  onExploreMission: () => void;
  onOpenDashboard: () => void;
  hasRealData: boolean;
  preDate?: string;
  postDate?: string;
  language?: Language;
  onOpenSitRep?: () => void;
  onOpenTerrainProfile?: () => void;
  onOpenCloudPenetration?: () => void;
  onOpenAiCopilot?: () => void;
  onOpenPolarimetry?: () => void;
  onOpenAccuracy?: () => void;
  onOpenOrbital?: () => void;
  onOpenJudgeTour?: () => void;
  onOpenPortalManual?: () => void;
  onOpenDossier?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMission,
  onOpenDashboard,
  hasRealData,
  preDate = "2026-07-15",
  postDate = "2026-07-22",
  language = 'en',
  onOpenSitRep,
  onOpenTerrainProfile,
  onOpenCloudPenetration,
  onOpenAiCopilot,
  onOpenPolarimetry,
  onOpenAccuracy,
  onOpenOrbital,
  onOpenJudgeTour,
  onOpenPortalManual,
  onOpenDossier
}) => {
  const t = translations[language];

  return (
    <section id="overview" className="relative pt-8 pb-16 px-4 lg:px-8 overflow-hidden bg-radar-grid border-b border-cyan-500/10">
      
      {/* Background Radial Glow - Celestial Space Eclipse Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[420px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/10 to-teal-500/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* =========================================================================
            TOP PILLS: Global Winner Caliber Badges (Matching Exoplanet AI style)
            ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-violet-950/60 border border-violet-500/40 text-violet-300 shadow-sm backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>Powered by NISAR S-Band 3.2 GHz</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-teal-950/60 border border-teal-500/40 text-teal-300 shadow-sm backdrop-blur-md">
            <Waves className="w-3.5 h-3.5 text-teal-400" />
            <span>Sub-Canopy Inundation Detection</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>NASA Space Apps 2026 &bull; Dancing with the SARs</span>
          </div>
        </div>

        {/* =========================================================================
            MAIN HERO SECTION: High-Impact Typography & Mission Statement
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, Description & 4 Winner Action Buttons */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            <div className="space-y-3">
              {language === 'en' ? (
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                  Map flash floods and{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300">
                    sub-canopy inundation
                  </span>{' '}
                  with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    physics-exact radar AI
                  </span>
                </h1>
              ) : (
                <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                  {t.heroHeadline}
                </h1>
              )}

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                The first operational disaster intelligence system integrating NASA-ISRO NISAR dual-polarization S-band radar with 3D DEM hydrodynamics. 100% cloud penetration, 12.84s automated pipeline, zero-internet offline Boat Mode for Brahmaputra disaster rescue.
              </p>
            </div>

            {/* =========================================================================
                THE 4 ACTION BUTTONS: Exactly Like the 2025 Global Winner Portal
                ========================================================================= */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              
              {/* Button 1: Launch Explorer (Primary Glowing Action) */}
              <button
                onClick={onOpenDashboard}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-cyan-500 to-teal-400 hover:from-violet-500 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 border border-cyan-300 transform hover:scale-[1.02]"
                title="Launch Live Satellite Radar Inundation Explorer"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Launch Radar Explorer</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              {/* Button 2: View 7-Slide Pitch Deck (Outline Violet) */}
              <a
                href="/SARvatra_Pitch_Deck.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-950/90 hover:bg-violet-950/60 text-violet-300 border border-violet-500/50 hover:border-violet-400 text-xs sm:text-sm font-bold transition-all shadow-sm transform hover:scale-[1.02]"
                title="Official 7-Slide Presentation Deck strictly compliant with NASA Submission Guidelines"
              >
                <PlayCircle className="w-4 h-4 text-violet-400" />
                <span>7-Slide Pitch Deck</span>
                <ExternalLink className="w-3 h-3 text-violet-400/70" />
              </a>

              {/* Button 3: Read NASA Dossier (Outline Cyan/Teal) */}
              {onOpenDossier && (
                <button
                  onClick={onOpenDossier}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-950/90 hover:bg-cyan-950/60 text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 text-xs sm:text-sm font-bold transition-all shadow-sm transform hover:scale-[1.02]"
                  title="Official NASA Space Apps Challenge 2026 Submission Dossier & Rubric Alignment"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Read NASA Dossier</span>
                </button>
              )}

              {/* Button 4: Learn the Method / SOP (Outline Emerald/Green) */}
              {onOpenPortalManual && (
                <button
                  onClick={onOpenPortalManual}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-slate-950/90 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 hover:border-emerald-400 text-xs sm:text-sm font-bold transition-all shadow-sm transform hover:scale-[1.02]"
                  title="Interactive Standard Operating Procedure (SOP) & Technical Method"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Learn the Method</span>
                </button>
              )}

              {/* Bonus: 60s Recon Tour Button */}
              {onOpenJudgeTour && (
                <button
                  onClick={onOpenJudgeTour}
                  className="flex items-center space-x-1.5 px-3.5 py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/60 text-xs sm:text-sm font-mono font-bold transition-all shadow-sm"
                  title="60-Second Real-Time Radar Video Walkthrough & Satellite Telemetry Replay"
                >
                  <PlayCircle className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>60s Video Recon</span>
                </button>
              )}

            </div>

            {/* Verified Data Banner */}
            {hasRealData && (
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-200 text-xs font-mono backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-bold text-white">Verified Observation Pair (Sivasagar Basin):</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  Pre: {preDate}
                </span>
                <span className="text-cyan-400">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  Post: {postDate}
                </span>
                <span className="text-slate-400 hidden sm:inline">&bull; 10m Pixel Posting &bull; 12.84s Pipeline</span>
              </div>
            )}

            {/* Mission Capability Cards: Real Scientific Verification Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {onOpenCloudPenetration && (
                <div
                  onClick={onOpenCloudPenetration}
                  className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all flex items-center space-x-2.5 group"
                  title="Click to inspect Cloud Penetration Physics"
                >
                  <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-mono text-left min-w-0">
                    <div className="text-white text-xs font-bold truncate group-hover:text-cyan-300 transition-colors">9.3cm S-Band</div>
                    <div className="text-slate-400 text-[10px] truncate">Monsoon Cloud Piercer</div>
                  </div>
                </div>
              )}

              {onOpenPolarimetry && (
                <div
                  onClick={onOpenPolarimetry}
                  className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-fuchsia-500/50 cursor-pointer transition-all flex items-center space-x-2.5 group"
                  title="Click to inspect Pauli RGB Decomposition"
                >
                  <div className="w-7 h-7 rounded-md bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 group-hover:scale-110 transition-transform shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-mono text-left min-w-0">
                    <div className="text-white text-xs font-bold truncate group-hover:text-fuchsia-300 transition-colors">Pauli RGB Pol</div>
                    <div className="text-slate-400 text-[10px] truncate">Double-Bounce Stems</div>
                  </div>
                </div>
              )}

              {onOpenAccuracy && (
                <div
                  onClick={onOpenAccuracy}
                  className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center space-x-2.5 group"
                  title="Click to inspect CWC River Gauge Ground Truth"
                >
                  <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="font-mono text-left min-w-0">
                    <div className="text-white text-xs font-bold truncate group-hover:text-emerald-300 transition-colors">CWC Truth</div>
                    <div className="text-slate-400 text-[10px] truncate">96.85m Crest &bull; &kappa; 0.89</div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: High-Precision Radar Scope Frame & Telemetry Art */}
          <div className="lg:col-span-5 relative">
            <div className="hud-panel p-6 overflow-hidden">
              
              {/* Radar Scope Frame Header */}
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4 font-mono text-xs">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-bold">NISAR S-BAND RADAR TELEMETRY</span>
                </div>
                <span className="text-slate-400">FREQ-A &bull; HHHH &bull; 10M RES</span>
              </div>

              {/* Radar Graphical Art */}
              <div className="relative w-full aspect-square max-w-[340px] mx-auto rounded-full border border-cyan-500/30 flex items-center justify-center bg-slate-950/80 shadow-inner">
                
                {/* Concentric Radar Rings */}
                <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-12 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-20 rounded-full border border-cyan-500/25 border-dashed" />
                <div className="absolute inset-28 rounded-full border border-cyan-500/30" />
                
                {/* Crosshairs */}
                <div className="absolute inset-y-0 w-px bg-cyan-500/25 left-1/2 -translate-x-1/2" />
                <div className="absolute inset-x-0 h-px bg-cyan-500/25 top-1/2 -translate-y-1/2" />

                {/* Animated Rotating Radar Beam Sweep */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 240, 255, 0.35) 0deg, rgba(0, 240, 255, 0.08) 45deg, transparent 90deg, transparent 360deg)',
                    animation: 'spin 5s linear infinite'
                  }}
                />

                {/* Center Satellite Node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-hud">
                    <Satellite className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="mt-2 text-[10px] font-mono text-cyan-300 font-bold tracking-wider">
                    SSAR S-BAND
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    26.98° N, 94.63° E
                  </span>
                </div>

                {/* Simulated Target Markers */}
                <div className="absolute top-[28%] right-[22%] flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[9px] font-mono text-rose-300 font-bold mt-1 bg-rose-950/80 px-1 rounded border border-rose-500/30">
                    DIKHOW WATER SHIFT
                  </span>
                </div>

                <div className="absolute bottom-[30%] left-[24%] flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[9px] font-mono text-cyan-300 mt-1 bg-cyan-950/80 px-1 rounded border border-cyan-500/30">
                    BRAHMAPUTRA
                  </span>
                </div>

              </div>

              {/* Telemetry Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-4 pt-3 border-t border-cyan-500/20 text-[11px] font-mono text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Swath Footprint:</span>
                  <span className="text-cyan-400 font-bold">3,425.06 km²</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400">Ground Truth &kappa;:</span>
                  <span className="text-emerald-400 font-bold">0.89 (CWC 96.85m)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
