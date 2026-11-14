import React, { useState } from 'react';
import { Sliders, Play, RefreshCw, Layers, ShieldAlert, Check } from 'lucide-react';

interface AnalysisControlsProps {
  onRunAnalysis: (params: {
    polarization: string;
    water_threshold_db: number;
    post_water_max_db: number;
    veg_double_bounce_threshold_db: number;
    stride: number;
    aoi_type: string;
  }) => void;
  isRunning: boolean;
  preDate?: string;
  postDate?: string;
}

export const AnalysisControls: React.FC<AnalysisControlsProps> = ({
  onRunAnalysis,
  isRunning,
  preDate = "2026-07-15",
  postDate = "2026-07-22"
}) => {
  const [polarization, setPolarization] = useState('HHHH');
  const [waterThreshold, setWaterThreshold] = useState(-3.5);
  const [postWaterMax, setPostWaterMax] = useState(-16.0);
  const [vegBounceThreshold, setVegBounceThreshold] = useState(3.0);
  const [stride, setStride] = useState(8);
  const [aoiType, setAoiType] = useState('overlap');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunAnalysis({
      polarization,
      water_threshold_db: Number(waterThreshold),
      post_water_max_db: Number(postWaterMax),
      veg_double_bounce_threshold_db: Number(vegBounceThreshold),
      stride: Number(stride),
      aoi_type: aoiType
    });
  };

  return (
    <div className="hud-panel p-5 my-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 gap-2">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h3 className="font-display font-bold text-base text-white tracking-wide">
            RADAR ANALYSIS & CHANGE DETECTION PARAMETERS
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
          <span>Observation Pair:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
            {preDate} vs {postDate}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
          
          {/* Polarization */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">
              Radar Polarization:
            </label>
            <select
              value={polarization}
              onChange={(e) => setPolarization(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="HHHH">HHHH (Co-pol HH &bull; Default)</option>
              <option value="HVHV">HVHV (Cross-pol HV &bull; Volume)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Direct surface scattering
            </span>
          </div>

          {/* Water Specular Drop Threshold */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold">Water Drop (dB):</label>
              <span className="text-cyan-400 font-bold">{waterThreshold} dB</span>
            </div>
            <input
              type="range"
              min="-6.0"
              max="-1.5"
              step="0.5"
              value={waterThreshold}
              onChange={(e) => setWaterThreshold(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Specular reflection floor
            </span>
          </div>

          {/* Max Post Water Backscatter */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold">Post Max (dB):</label>
              <span className="text-cyan-400 font-bold">{postWaterMax} dB</span>
            </div>
            <input
              type="range"
              min="-22.0"
              max="-12.0"
              step="0.5"
              value={postWaterMax}
              onChange={(e) => setPostWaterMax(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Open water ceiling
            </span>
          </div>

          {/* Flooded Veg Double Bounce */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-300 font-semibold">Canopy Surge:</label>
              <span className="text-fuchsia-400 font-bold">+{vegBounceThreshold} dB</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5.0"
              step="0.5"
              value={vegBounceThreshold}
              onChange={(e) => setVegBounceThreshold(parseFloat(e.target.value))}
              className="w-full accent-fuchsia-400"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Double-bounce threshold
            </span>
          </div>

          {/* Sampling Stride */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">
              Spatial Sampling:
            </label>
            <select
              value={stride}
              onChange={(e) => setStride(parseInt(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="8">8x Stride (80m Grid &bull; Fast)</option>
              <option value="4">4x Stride (40m Grid &bull; Detailed)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Memory-safe raster window
            </span>
          </div>

          {/* AOI Focus */}
          <div>
            <label className="block text-slate-300 mb-1.5 font-semibold">
              Analysis Region:
            </label>
            <select
              value={aoiType}
              onChange={(e) => setAoiType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="overlap">Full Scene Overlap (23,800 km²)</option>
              <option value="sivasagar_riparian">Sivasagar Northern Riparian</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Brahmaputra / Sivasagar focus
            </span>
          </div>

        </div>

        {/* Submit Execution Bar */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-800 gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Speckle Reduction: 5x5 Adaptive Lee Filter &bull; Quality Mask: Level-2 GCOV Fully-Focused Pixels
            </span>
          </div>

          <button
            type="submit"
            disabled={isRunning}
            className="flex items-center space-x-2 px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono transition-all shadow-hud"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing NISAR HDF5 Windows...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Re-run Analysis Pipeline</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
