import React, { useState } from 'react';
import {
  X,
  BookOpen,
  HelpCircle,
  MousePointerClick,
  Layers,
  ShieldAlert,
  Zap,
  Radio,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Download,
  FileText
} from 'lucide-react';

interface PortalManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJudgeTour?: () => void;
  onOpenCloudPenetration?: () => void;
  onOpenSitRep?: () => void;
}

export const PortalManualModal: React.FC<PortalManualModalProps> = ({
  isOpen,
  onClose,
  onOpenJudgeTour,
  onOpenCloudPenetration,
  onOpenSitRep
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'colors' | 'tools' | 'quickstart'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#050b1a] border-2 border-cyan-400 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/95 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              <BookOpen className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  PORTAL USER MANUAL &bull; HOW TO USE SARVATRA LAB
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  Interactive Guide for All Users &amp; Judges
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                A simple, visual walkthrough: What this portal is, what the colors mean, and how to operate it
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/SARvatra_Operating_Manual.pdf"
              download="SARvatra_Operating_Manual.pdf"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md"
              title="Download Official User Guidelines & SOP PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download SOP PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center space-x-2 text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-hud'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            1. What is This Portal?
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'colors'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-hud'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            2. Radar Color Decoder
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tools'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-hud'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            3. Interactive Tools Guide
          </button>
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'quickstart'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-hud'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            4. 3-Step Quick Start
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs font-mono text-slate-300">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <h3 className="text-sm font-bold text-white font-sans flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>SARvatra Lab in 30 Seconds:</span>
                </h3>
                <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                  During monsoon floods in Assam, normal cameras on satellites (like Google Earth or Sentinel-2) only see <strong>dense white clouds</strong>. The ground flood remains 100% invisible.
                  <br /><br />
                  SARvatra Lab uses <strong>NASA-ISRO NISAR synthetic aperture radar (SAR)</strong>. Radar doesn&apos;t care about clouds or darkness — its microwave signals shoot right through storms and hit the ground, mapping floodwater, submerged rice fields, and severed highways with centimeter-level precision.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase text-[10px]">What Data is Used?</span>
                  <h4 className="text-white font-semibold font-sans">Two Real 11 GB Satellite Files</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Observation A (15 July 2026, Pre-Flood baseline) compared against Observation B (22 July 2026, Peak Monsoon flood) over Sivasagar, Assam.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">Who is This For?</span>
                  <h4 className="text-white font-semibold font-sans">Citizens, NDRF, &amp; Scientists</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Designed so an ordinary village head can hear audio alerts in Assamese, rescue teams can see safe evacuation roads, and NASA scientists can verify covariance mathematics.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COLOR DECODER */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-sans">
                What Do the Map Colors Mean? (Decibel Physics Made Simple)
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-md bg-[#00F0FF] flex-shrink-0 mt-0.5 shadow-[0_0_10px_#00F0FF]"></span>
                  <div>
                    <strong className="text-cyan-300 font-sans text-sm block">Cyan (Sky Blue) &bull; Open Standing Floodwater</strong>
                    <p className="text-slate-300 text-xs mt-0.5 font-sans">
                      Smooth water behaves like a flat mirror. When the radar pulse hits it, the beam reflects away into space instead of returning to the satellite. This causes a dramatic <strong>backscatter drop (&lt; -3.5 dB, reaching down to -19 dB)</strong>.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-fuchsia-500/40 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-md bg-[#D946EF] flex-shrink-0 mt-0.5 shadow-[0_0_10px_#D946EF]"></span>
                  <div>
                    <strong className="text-fuchsia-300 font-sans text-sm block">Magenta / Pink &bull; Flooded Vegetation (Double-Bounce)</strong>
                    <p className="text-slate-300 text-xs mt-0.5 font-sans">
                      When water enters rice fields or reedbeds, the radar pulse bounces off the water, then hits the vertical plant stem at a 90° angle, reflecting right back to the satellite antenna! This causes a <strong>surge of &gt; +3.0 dB</strong> (it appears bright pink).
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/40 flex items-start space-x-3">
                  <span className="w-5 h-1.5 bg-rose-500 flex-shrink-0 mt-2"></span>
                  <div>
                    <strong className="text-rose-400 font-sans text-sm block">Red Dashed Lines &bull; Severed Roads (Submerged)</strong>
                    <p className="text-slate-300 text-xs mt-0.5 font-sans">
                      Roads covered under 0.8m to 1.4m of floodwater (e.g. Desangmukh River Access Road). Vehicles cannot pass.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 flex items-start space-x-3">
                  <span className="w-5 h-2 bg-emerald-500 rounded flex-shrink-0 mt-1.5"></span>
                  <div>
                    <strong className="text-emerald-300 font-sans text-sm block">Green Lines &bull; Safe Evacuation Corridors</strong>
                    <p className="text-slate-300 text-xs mt-0.5 font-sans">
                      Elevated highways on high ground (104m MSL) that remain 100% dry and open for NDRF rescue trucks and ambulances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOOLS GUIDE */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-sans">
                Where to Click: Interactive Feature Guide
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold font-mono text-[11px] flex items-center space-x-1">
                    <MousePointerClick className="w-3.5 h-3.5" />
                    <span>Click-to-Probe Any Pixel:</span>
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    Click ANY point on the map. A floating HUD appears showing that 10-meter pixel&apos;s exact decibels, ground elevation, and water status!
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-rose-400 font-bold font-mono text-[11px] flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>ASDMA SitRep Button:</span>
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    Generates a formal, printable Government Flood Directive with revenue circle damage tables and boat orders.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold font-mono text-[11px] flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Cloud Piercer Button:</span>
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    Drag the slider to watch thick monsoon clouds vanish as NISAR microwaves pierce through to the ground.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-fuchsia-400 font-bold font-mono text-[11px] flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Polarimetry Button:</span>
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    Switch between Pauli RGB channels to see Double-Bounce (Red), Tree Canopies (Green), and Water (Blue).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: QUICK START */}
          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-sans">
                3-Step Quick Start for Judges &amp; First-Time Evaluators
              </h3>

              <div className="space-y-3 font-sans">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0 text-xs">1</span>
                  <div className="space-y-1">
                    <strong className="text-white text-xs block">Watch the 60-Second Guided Tour</strong>
                    <p className="text-slate-400 text-xs">
                      Click the golden <strong>[🎬 60s Judge Showcase]</strong> button in the top bar. It will automatically walk you through the key mission acts with voice highlights.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-300 font-bold flex items-center justify-center flex-shrink-0 text-xs">2</span>
                  <div className="space-y-1">
                    <strong className="text-white text-xs block">Tap on the Interactive Map to Probe Pixels</strong>
                    <p className="text-slate-400 text-xs">
                      Scroll to the Interactive Map and click anywhere near the river or town to see the real-time radar decibel spectrometer popup.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-300 font-bold flex items-center justify-center flex-shrink-0 text-xs">3</span>
                  <div className="space-y-1">
                    <strong className="text-white text-xs block">Test Multi-Lingual Broadcasts &amp; Export</strong>
                    <p className="text-slate-400 text-xs">
                      Switch language to <strong>অসমীয়া</strong> or <strong>हिन्दी</strong>, hit <strong>[EAS Voice Warning]</strong> to hear the siren, and download the <strong>Google Earth 3D KML</strong> file!
                    </p>
                  </div>
                </div>
              </div>

              {onOpenJudgeTour && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenJudgeTour();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Launch 60-Second Executive Judge Briefing Now</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <a
              href="/SARvatra_Operating_Manual.pdf"
              download="SARvatra_Operating_Manual.pdf"
              className="flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Operating Manual PDF</span>
            </a>
            <a
              href="/SARvatra_Technical_Dossier.pdf"
              download="SARvatra_Technical_Dossier.pdf"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>NASA Technical Dossier</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-hud"
          >
            Got It! Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
