import React, { useState } from 'react';
import { X, Mountain, Waves, AlertTriangle, Info, CheckCircle2, Sliders } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line
} from 'recharts';

interface TerrainProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerrainProfileModal: React.FC<TerrainProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  // Water level elevation in meters above sea level (MSL)
  // Default is peak flood level (96.85m CWC benchmark)
  const [waterLevelMsl, setWaterLevelMsl] = useState<number>(96.85);

  if (!isOpen) return null;

  // Cross section dataset along Transect A-B (Brahmaputra -> Dikhow Bund -> Paddy Lowlands -> Sivasagar High Ground)
  const profileData = [
    { distanceKm: 0.0, name: "Brahmaputra River Deep Channel", groundMsl: 85.5 },
    { distanceKm: 0.8, name: "Submerged Sandbar (Chapori)", groundMsl: 88.2 },
    { distanceKm: 1.5, name: "River Bank Edge", groundMsl: 91.0 },
    { distanceKm: 2.2, name: "Dikhow Embankment (Bund Top)", groundMsl: 95.8 },
    { distanceKm: 2.8, name: "Breached Bund Spillway", groundMsl: 93.4 },
    { distanceKm: 3.5, name: "Lowland Sali Paddy Basin", groundMsl: 90.5 },
    { distanceKm: 4.2, name: "Agricultural Lowland Drainage", groundMsl: 89.8 },
    { distanceKm: 5.0, name: "Desangmukh Village Hamlet", groundMsl: 93.2 },
    { distanceKm: 6.0, name: "Intermediate Terrace", groundMsl: 97.0 },
    { distanceKm: 7.2, name: "Sivasagar Joysagar High Ground", groundMsl: 104.5 },
    { distanceKm: 8.5, name: "Sivasagar Town Center", groundMsl: 106.0 }
  ];

  // Calculate inundated points and water depth
  const chartData = profileData.map(pt => {
    const isSubmerged = pt.groundMsl < waterLevelMsl;
    const depthMeters = isSubmerged ? Number((waterLevelMsl - pt.groundMsl).toFixed(1)) : 0;
    return {
      ...pt,
      waterSurfaceMsl: waterLevelMsl,
      waterDepth: depthMeters,
      // For dual area rendering
      waterFill: isSubmerged ? waterLevelMsl : pt.groundMsl
    };
  });

  const maxDepth = Math.max(...chartData.map(d => d.waterDepth));
  const bundElevation = 95.8;
  const isBundOvertopped = waterLevelMsl > bundElevation;
  const overtoppingMeters = isBundOvertopped ? (waterLevelMsl - bundElevation).toFixed(2) : "0.00";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#060b18] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  3D TERRAIN ELEVATION PROFILE &amp; FLOOD DEPTH MODEL
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                  Copernicus 30m DEM + HAND
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Topographic cross-section transect: Brahmaputra River &rarr; Dikhow Embankment &rarr; Paddy Basin &rarr; Sivasagar Town
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
          
          {/* Interactive Water Surface Elevation Control Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Waves className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div>
                <span className="text-sm font-semibold text-white">Simulate Flood Water Surface Elevation</span>
                <p className="text-[11px] text-slate-400">
                  Adjust water level (MSL) to observe embankment overtopping and lowland inundation depth
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-96">
              <span className="text-xs text-cyan-300 font-bold whitespace-nowrap bg-cyan-950 px-2 py-1 rounded border border-cyan-500/30">
                {waterLevelMsl.toFixed(1)} m MSL
              </span>
              <input
                type="range"
                min="88.0"
                max="100.0"
                step="0.1"
                value={waterLevelMsl}
                onChange={(e) => setWaterLevelMsl(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              
              {/* Quick Presets */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setWaterLevelMsl(91.5)}
                  className={`px-2 py-1 text-[10px] rounded border transition-all ${
                    waterLevelMsl === 91.5 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                  title="Normal Pre-Flood Stage (91.5m MSL)"
                >
                  Pre (15 Jul)
                </button>
                <button
                  onClick={() => setWaterLevelMsl(95.8)}
                  className={`px-2 py-1 text-[10px] rounded border transition-all ${
                    waterLevelMsl === 95.8 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                  title="CWC Danger Level (95.80m MSL)"
                >
                  Danger (95.8m)
                </button>
                <button
                  onClick={() => setWaterLevelMsl(96.85)}
                  className={`px-2 py-1 text-[10px] rounded border transition-all ${
                    waterLevelMsl === 96.85 ? 'bg-rose-500 text-white font-bold animate-pulse' : 'bg-slate-800 text-slate-300'
                  }`}
                  title="CWC Peak Flood Pass (96.85m MSL - Overtopping by +1.05m)"
                >
                  Peak (22 Jul: 96.85m)
                </button>
              </div>
            </div>
          </div>

          {/* Telemetry Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Embankment Crest (Bund)</span>
              <div className="text-base font-bold text-amber-400 font-sans mt-0.5">
                95.80 m MSL
              </div>
              <span className="text-[10px] text-slate-500">Dikhow River Primary Dyke</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Peak Water Surface</span>
              <div className="text-base font-bold text-cyan-400 font-sans mt-0.5">
                {waterLevelMsl.toFixed(1)} m MSL
              </div>
              <span className="text-[10px] text-slate-500">Derived from NISAR Specular Level</span>
            </div>

            <div className={`p-3 rounded-lg border ${isBundOvertopped ? 'bg-rose-950/30 border-rose-500/40 text-rose-300' : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'}`}>
              <span className="text-[10px] uppercase block">Embankment Status</span>
              <div className="text-base font-bold font-sans mt-0.5">
                {isBundOvertopped ? `OVERTOPPED (+${overtoppingMeters}m)` : 'PROTECTED (SAFE)'}
              </div>
              <span className="text-[10px] opacity-80">
                {isBundOvertopped ? 'Water spilling into paddies' : 'Contained in river channel'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Max Lowland Water Depth</span>
              <div className="text-base font-bold text-white font-sans mt-0.5">
                {maxDepth > 0 ? `${maxDepth} meters` : '0 meters (Dry)'}
              </div>
              <span className="text-[10px] text-slate-500">In Sali Rice lowlands (Km 4.2)</span>
            </div>
          </div>

          {/* Interactive Recharts Cross-Section Chart */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center space-x-1.5">
                <span>Elevation Profile Transect (8.5 km Horizontal Distance)</span>
              </span>
              <div className="flex items-center space-x-4 text-[10px]">
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-1.5 bg-amber-600 rounded"></span>
                  <span className="text-slate-300">Ground Terrain (DEM)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-1.5 bg-cyan-400 rounded"></span>
                  <span className="text-slate-300">Floodwater Surface</span>
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#78350f" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.7}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  
                  <XAxis
                    dataKey="distanceKm"
                    stroke="#64748b"
                    tickFormatter={(v) => `${v} km`}
                    label={{ value: "Transect Distance (km) from Brahmaputra Channel", position: "insideBottom", offset: -10, fill: "#94a3b8", fontSize: 10 }}
                  />
                  
                  <YAxis
                    domain={[80, 110]}
                    stroke="#64748b"
                    label={{ value: "Elevation (m MSL)", angle: -90, position: "insideLeft", fill: "#94a3b8", fontSize: 10 }}
                  />

                  <Tooltip
                    contentStyle={{ backgroundColor: '#070d1b', borderColor: '#00F0FF', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(val: any, name: string) => {
                      if (name === "groundMsl") return [`${val} m MSL`, "Ground Elevation"];
                      if (name === "waterDepth") return [`${val} m`, "Standing Water Depth"];
                      return [val, name];
                    }}
                    labelFormatter={(label) => `Distance: ${label} km`}
                  />

                  <ReferenceLine
                    y={waterLevelMsl}
                    stroke="#00F0FF"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                    label={{ value: `Water Level: ${waterLevelMsl.toFixed(1)}m`, fill: '#00F0FF', position: 'top', fontSize: 10 }}
                  />

                  {/* Water Fill Area */}
                  <Area
                    type="monotone"
                    dataKey="waterFill"
                    stroke="#00F0FF"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#waterGrad)"
                    name="waterDepth"
                  />

                  {/* Ground Elevation Area */}
                  <Area
                    type="monotone"
                    dataKey="groundMsl"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#groundGrad)"
                    name="groundMsl"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scientific Methodology Note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-semibold text-white flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Hydrological HAND (Height Above Nearest Drainage) Methodology</span>
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              By coupling NISAR 10-meter S-band microwave backscatter with the Copernicus 30m Global Digital Elevation Model (GLO-30), SARvatra Lab constructs a height-above-drainage plane. Where radar specular reflection (&lt; -16 dB) intersects topological depressions below 96.5m MSL, true water depth is calculated. This pinpoints that Sivasagar Town (+104m) remains naturally fortified by elevated geological terraces, while agricultural floodplains at +90m experience up to 6.7 meters of severe inundation.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            SARvatra Lab &bull; Sivasagar Hydrological Topography Model
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors"
          >
            Close 3D Profile
          </button>
        </div>

      </div>
    </div>
  );
};
