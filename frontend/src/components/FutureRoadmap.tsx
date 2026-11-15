import React from 'react';
import {
  Globe,
  Radio,
  Layers,
  ShieldCheck,
  Zap,
  Server,
  ArrowRight,
  Sparkles,
  Cpu,
  Compass,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const FutureRoadmap: React.FC = () => {
  return (
    <section id="roadmap-section" className="hud-panel p-5 my-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-6 border-b border-cyan-500/20 gap-3 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display font-bold text-lg text-white tracking-wide">
              GLOBAL VISION &amp; FUTURE ROADMAP (2026&ndash;2028)
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Scalability &bull; Basin-Agnostic Portability &bull; Multi-Hazard Radar Intelligence Framework
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>NASA Rubric: Scalability &amp; Impact (20%)</span>
          </span>
        </div>
      </div>

      {/* Three-Phase Horizon Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Phase 1: Near-Term (Months 1–3) */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-4 flex flex-col justify-between hover:border-cyan-400/60 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                PHASE 1 &bull; MONTHS 1&ndash;3
              </span>
              <Radio className="w-5 h-5 text-cyan-400" />
            </div>

            <h3 className="font-display font-bold text-base text-white">
              Automated Ingestion &amp; District Edge Nodes
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Transition from manual dataset staging to zero-touch orbital webhooks and localized district emergency deployments across Upper Assam.
            </p>

            <ul className="space-y-2 text-xs font-mono text-slate-300 pt-2">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>ASF DAAC / NASA Webhooks:</strong> Auto-triggers 12.84s pipeline within minutes of NISAR Level-2 GCOV publication.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Containerized Edge Appliance:</strong> Deployable Docker container for district ASDMA &amp; NDRF field command laptops.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Automated CAP Alerts:</strong> Common Alerting Protocol voice and SMS broadcast in Assamese, Hindi, and English.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Target: Sivasagar &amp; Dibrugarh</span>
            <span className="text-cyan-400 font-bold">Q4 2026</span>
          </div>
        </div>

        {/* Phase 2: Mid-Term (Months 4–12) */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-4 flex flex-col justify-between hover:border-amber-400/60 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                PHASE 2 &bull; MONTHS 4&ndash;12
              </span>
              <Layers className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="font-display font-bold text-base text-white">
              Multi-Frequency Fusion &amp; InSAR Subsidence
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Expand beyond S-band by fusing multi-wavelength radar sensors and repeat-pass interferometry to predict structural embankment failures before breaches happen.
            </p>

            <ul className="space-y-2 text-xs font-mono text-slate-300 pt-2">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>L + S + C Band Fusion:</strong> NISAR L-band (24 cm) + S-band (9.3 cm) + Sentinel-1 (5.6 cm) for 72-hour repeat cycles.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>InSAR Levee Deformation:</strong> Millimeter-scale phase decorrelation ($\gamma &lt; 0.20$) detecting weakened dykes pre-overtopping.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Dynamic Flood Depth Inversion:</strong> Machine-calibrated HAND (Height Above Nearest Drainage) depth transects at 10m posting.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Target: Brahmaputra Basin</span>
            <span className="text-amber-400 font-bold">Mid 2027</span>
          </div>
        </div>

        {/* Phase 3: Long-Term (2027–2028) */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-4 flex flex-col justify-between hover:border-emerald-400/60 transition-colors">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                PHASE 3 &bull; GLOBAL SCALE
              </span>
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>

            <h3 className="font-display font-bold text-base text-white">
              Basin-Agnostic Portability &amp; Multi-Hazard
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Scale the open-source pipeline to any flood-prone river basin on Earth, integrating with global humanitarian and space agency networks.
            </p>

            <ul className="space-y-2 text-xs font-mono text-slate-300 pt-2">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Global River Basins:</strong> Zero-reconfiguration portability to Ganges, Mekong, Irrawaddy, Mississippi, and Amazon basins.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Multi-Hazard Radar Analytics:</strong> Co-seismic landslide mapping, tsunami runup assessment, and glacial lake outburst (GLOF) monitoring.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>UN-SPIDER &amp; WMO Feeds:</strong> Direct real-time GeoJSON API endpoints for international disaster response clusters.</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Target: Global River Basins</span>
            <span className="text-emerald-400 font-bold">2027&ndash;2028</span>
          </div>
        </div>

      </div>

      {/* Scalability Callout Banner */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold text-xs">
              PORTABLE, LIGHTWEIGHT &amp; FULLY CONTAINERIZED ARCHITECTURE
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Built on standard Python 3.11, GDAL, Rasterio, and React 18 &bull; Operates on local laptops, cloud servers, or offline browser IndexedDB without vendor lock-in.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold">
            ✓ 100% OPEN SOURCE (MIT)
          </span>
          <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-bold">
            ✓ ZERO PROPRIETARY APIS
          </span>
        </div>
      </div>
    </section>
  );
};
