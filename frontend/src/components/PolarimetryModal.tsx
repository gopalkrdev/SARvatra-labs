import React, { useState } from 'react';
import { X, Layers, Radio, ShieldCheck, Sparkles, Info, Eye } from 'lucide-react';
import { ProcessingResult } from '../types';

interface PolarimetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ProcessingResult | null;
}

export const PolarimetryModal: React.FC<PolarimetryModalProps> = ({
  isOpen,
  onClose,
  analysis
}) => {
  const [activeChannel, setActiveChannel] = useState<'rgb' | 'red' | 'green' | 'blue'>('rgb');

  if (!isOpen) return null;

  const focusImg = analysis?.layers.focus_water_overlay_png || analysis?.layers.focus_post_color_png || '/data/focus_post_color.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#070e1e] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/95 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400">
              <Layers className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  POLARIMETRIC SCATTERING DECOMPOSITION EXPLORER
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 font-semibold">
                  Pauli / Freeman-Durden &bull; GCOV 3x3
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Decoding NISAR S-band covariance terms: HHHH, HVHV, and HHHV polarimetric scattering mechanisms
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
          
          {/* Top Channel Filter Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-slate-300">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">Select Polarimetric Basis:</span>
            </div>

            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs gap-1">
              <button
                onClick={() => setActiveChannel('rgb')}
                className={`px-3 py-1 rounded transition-all ${activeChannel === 'rgb' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Pauli RGB Composite
              </button>
              <button
                onClick={() => setActiveChannel('red')}
                className={`px-3 py-1 rounded transition-all ${activeChannel === 'red' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-rose-300'}`}
              >
                Double-Bounce (Red)
              </button>
              <button
                onClick={() => setActiveChannel('green')}
                className={`px-3 py-1 rounded transition-all ${activeChannel === 'green' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-emerald-300'}`}
              >
                Volume Canopy (Green)
              </button>
              <button
                onClick={() => setActiveChannel('blue')}
                className={`px-3 py-1 rounded transition-all ${activeChannel === 'blue' ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-blue-300'}`}
              >
                Surface / Specular (Blue)
              </button>
            </div>
          </div>

          {/* 3 Polarimetric Mechanism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Red Channel: Double-Bounce */}
            <div className={`p-4 rounded-xl border transition-all ${activeChannel === 'red' || activeChannel === 'rgb' ? 'bg-rose-950/30 border-rose-500/50 shadow-md' : 'bg-slate-950/40 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-rose-400 uppercase text-[11px] tracking-wider">
                  |Shh - Svv|² &bull; Double-Bounce
                </span>
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              </div>
              <h4 className="text-white font-bold text-sm font-sans mb-1">Flooded Vegetation Dihedral</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Radiation bounces first off standing water, then off vertical plant stems or tree trunks at a 90° dihedral angle. Returns high coherent backscatter (&gt; +3.0 dB surge).
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-rose-300 font-mono">
                Detects: Submerged paddy seedlings, marsh reeds, flooded forests.
              </div>
            </div>

            {/* Green Channel: Volume Scattering */}
            <div className={`p-4 rounded-xl border transition-all ${activeChannel === 'green' || activeChannel === 'rgb' ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md' : 'bg-slate-950/40 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
                  2|Shv|² &bull; Volume Scatter
                </span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <h4 className="text-white font-bold text-sm font-sans mb-1">Dense Foliage &amp; Canopies</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Multiple random reflections inside dense leafy crowns depolarize the incident horizontal microwave pulse into cross-polarized HVHV energy.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-emerald-300 font-mono">
                Detects: Non-flooded tea gardens, upland forests, bamboo groves.
              </div>
            </div>

            {/* Blue Channel: Surface Scattering */}
            <div className={`p-4 rounded-xl border transition-all ${activeChannel === 'blue' || activeChannel === 'rgb' ? 'bg-sky-950/30 border-sky-500/50 shadow-md' : 'bg-slate-950/40 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sky-400 uppercase text-[11px] tracking-wider">
                  |Shh + Svv|² &bull; Surface / Bragg
                </span>
                <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              </div>
              <h4 className="text-white font-bold text-sm font-sans mb-1">Specular Flat Mirror Water</h4>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Calm open floodwaters act as a dielectric specular reflector, reflecting radar pulses forward away from the antenna. Causes severe backscatter collapse (&lt; -16 dB).
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-sky-300 font-mono">
                Detects: Brahmaputra deep river channels, submerged oxbow lakes.
              </div>
            </div>

          </div>

          {/* Visual Simulation Display Frame */}
          <div className="relative aspect-video w-full max-h-[340px] bg-black rounded-xl border border-cyan-500/30 overflow-hidden flex items-center justify-center p-3">
            <img
              src={focusImg}
              alt="Polarimetric Composite"
              className={`w-full h-full object-contain transition-all duration-300 ${
                activeChannel === 'red' ? 'filter hue-rotate-[320deg] saturate-200' :
                activeChannel === 'green' ? 'filter hue-rotate-[90deg] saturate-200' :
                activeChannel === 'blue' ? 'filter hue-rotate-[190deg] saturate-150' : ''
              }`}
            />

            {/* Overlaid HUD Scientific Telemetry */}
            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md p-2 rounded border border-cyan-500/30 text-[10px] space-y-1">
              <span className="text-white font-bold block">NISAR S-BAND GCOV COVARIANCE TENSOR</span>
              <span className="text-slate-400 block font-mono">C11 (HHHH) &bull; C22 (HVHV) &bull; C12 (HHHV Cross-term)</span>
              <span className="text-cyan-400 font-bold block">Active Mode: {activeChannel.toUpperCase()} PROJECTION</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md p-2 rounded border border-cyan-500/30 text-[10px] space-y-1 text-right">
              <span className="text-emerald-400 font-bold block">Wavelength: 9.3 cm (3.2 GHz)</span>
              <span className="text-slate-400 block">Incidence Angle: 37.4° &bull; Ascending Track 040</span>
            </div>
          </div>

          {/* Scientific Reference Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
            <Info className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-white">
                Theoretical Remote Sensing Basis:
              </p>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Under the Cloude-Pottier and Freeman-Durden polarimetric decomposition frameworks, the 3x3 covariance matrix from NISAR Level-2 GCOV resolves the ambiguity between open standing water and emergent vegetation. Single-polarization intensity cannot differentiate flooded crops from smooth mudflats; full polarimetric covariance mathematically isolates dihedral scattering from volume and Bragg surface scattering.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            SARvatra Lab &bull; Polarimetric Remote Sensing Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors"
          >
            Close Polarimetry
          </button>
        </div>

      </div>
    </div>
  );
};
