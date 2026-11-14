import React from 'react';
import { X, Satellite, Radio, Globe, Compass, ShieldCheck, Zap } from 'lucide-react';

interface OrbitalTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrbitalTelemetryModal: React.FC<OrbitalTelemetryModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#060c1c] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/95 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Satellite className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  3D SATELLITE ORBITAL TRAJECTORY &amp; SWEEPSAR TELEMETRY
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                  747 km Sun-Synchronous LEO
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                NASA JPL &bull; ISRO SAC &bull; Joint Dual-Frequency Synthetic Aperture Radar Mission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-mono">
          
          {/* Orbital Architecture Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase">Orbit Altitude</span>
              <div className="text-xl font-bold text-cyan-400 font-sans mt-0.5">
                747 km
              </div>
              <span className="text-[10px] text-slate-500">Sun-Synchronous (LEO)</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase">Orbital Inclination</span>
              <div className="text-xl font-bold text-white font-sans mt-0.5">
                98.4°
              </div>
              <span className="text-[10px] text-slate-500">Near-Polar Orbit</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase">Swath Width</span>
              <div className="text-xl font-bold text-emerald-400 font-sans mt-0.5">
                242 km
              </div>
              <span className="text-[10px] text-slate-500">SweepSAR Phased-Array</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400 text-[10px] uppercase">Reflector Size</span>
              <div className="text-xl font-bold text-amber-400 font-sans mt-0.5">
                12.0 meters
              </div>
              <span className="text-[10px] text-slate-500">Deployable Mesh Boom</span>
            </div>
          </div>

          {/* Pass 1 vs Pass 2 Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Observation A */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-cyan-400 font-bold">
                <span>PASS 1: PRE-FLOOD BASELINE</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-700">ORBIT 5055</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Acquisition Date:</span>
                  <span className="font-bold text-white">15-JUL-2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Zero-Doppler UTC:</span>
                  <span>22:57:41 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Track ID:</span>
                  <span className="text-cyan-300">Track 112 (Ascending)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Incidence Angle:</span>
                  <span>37.2° across Sivasagar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Product Level:</span>
                  <span className="text-emerald-400">Level-2 GCOV (Covariance)</span>
                </div>
              </div>
            </div>

            {/* Observation B */}
            <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/40 shadow-hud space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-rose-400 font-bold">
                <span>PASS 2: PEAK MONSOON INUNDATION</span>
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-rose-500/30">ORBIT 5158</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Acquisition Date:</span>
                  <span className="font-bold text-white">22-JUL-2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Zero-Doppler UTC:</span>
                  <span>23:05:27 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Track ID:</span>
                  <span className="text-cyan-300">Track 040 (Ascending)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Incidence Angle:</span>
                  <span>37.6° across Sivasagar</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Product Level:</span>
                  <span className="text-emerald-400">Level-2 GCOV (Covariance)</span>
                </div>
              </div>
            </div>

          </div>

          {/* SweepSAR Technology Breakdown */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-white flex items-center space-x-1.5">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>SweepSAR Digital Beamforming (DBBF) Architecture</span>
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Traditional SAR sensors face a fundamental trade-off between spatial resolution and swath width. NISAR resolves this using SweepSAR technology: a wide beam illuminates a massive 242 km swath on transmit, while a multi-channel phased-array feed dynamically tracks the returning pulse across the 12-meter mesh reflector on receive. This achieves a fine 10-meter spatial resolution across the entire Brahmaputra Basin in a single overpass.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            SARvatra Lab &bull; NASA-ISRO Synthetic Aperture Radar (NISAR) Telemetry
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors"
          >
            Close Orbital Telemetry
          </button>
        </div>

      </div>
    </div>
  );
};
