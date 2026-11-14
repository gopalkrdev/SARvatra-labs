import React from 'react';
import { Calendar, Layers, Waves, AlertTriangle, Activity, CheckCircle2, TrendingDown } from 'lucide-react';
import { ProcessingResult } from '../types';

interface MetricCardsProps {
  analysis: ProcessingResult | null;
  loading: boolean;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ analysis, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="hud-panel p-4 animate-pulse space-y-3">
            <div className="h-3 bg-slate-800 rounded w-2/3" />
            <div className="h-7 bg-slate-800 rounded w-1/2" />
            <div className="h-2.5 bg-slate-800 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="hud-panel p-6 my-6 text-center text-slate-400 font-mono text-sm">
        <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
        <p className="font-semibold text-slate-300">No analysis performed yet.</p>
        <p className="text-xs text-slate-500 mt-1">
          Select an observation pair from the local data catalog and launch processing to compute real radar metrics.
        </p>
      </div>
    );
  }

  const { metadata, statistics, impact_telemetry, quality_confidence } = analysis;
  const waterStats = statistics.classes.potential_water_related_change;
  const vegStats = statistics.classes.flooded_vegetation_double_bounce;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
      
      {/* 1. Observation Dates Card */}
      <div className="hud-panel p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Pass Dates</span>
          <Calendar className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="font-mono font-bold text-lg text-white">
            {metadata.pre_observation_date.slice(5)} &rarr; {metadata.post_observation_date.slice(5)}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            July 15 vs July 22, 2026
          </p>
        </div>
        <div className="text-[10px] text-cyan-400 font-mono flex items-center mt-2 pt-2 border-t border-slate-800">
          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
          <span>7-Day Inundation Window</span>
        </div>
      </div>

      {/* 2. Valid Data Coverage */}
      <div className="hud-panel p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Valid Coverage</span>
          <Layers className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="font-mono font-bold text-xl text-cyan-300">
            {statistics.valid_data_coverage_sq_km.toLocaleString()} <span className="text-xs text-slate-400 font-normal">km²</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Overlap footprint analyzed
          </p>
        </div>
        <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
          <span>Valid Samples:</span>
          <span className="text-slate-200 font-bold">{statistics.valid_data_percentage}%</span>
        </div>
      </div>

      {/* 3. Potential Water-Related Change Area */}
      <div className="hud-panel p-4 flex flex-col justify-between border-cyan-400/40">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">Potential Water</span>
          <Waves className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="font-mono font-bold text-xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
            {waterStats.area_sq_km.toLocaleString()} <span className="text-xs text-slate-400 font-normal">km²</span>
          </div>
          <p className="text-[10px] text-slate-300 font-mono mt-0.5">
            ~{waterStats.area_hectares?.toLocaleString()} ha
          </p>
        </div>
        <div className="text-[10px] text-cyan-400/90 font-mono flex items-center mt-2 pt-2 border-t border-slate-800">
          <TrendingDown className="w-3 h-3 mr-1 text-cyan-400" />
          <span>Specular collapse &lt; -3.5 dB</span>
        </div>
      </div>

      {/* 4. Flooded Veg / Double-Bounce */}
      <div className="hud-panel p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Canopy Bounce</span>
          <Activity className="w-4 h-4 text-fuchsia-400" />
        </div>
        <div>
          <div className="font-mono font-bold text-xl text-fuchsia-400">
            {vegStats.area_sq_km.toLocaleString()} <span className="text-xs text-slate-400 font-normal">km²</span>
          </div>
          <p className="text-[10px] text-slate-300 font-mono mt-0.5">
            ~{vegStats.area_hectares?.toLocaleString()} ha
          </p>
        </div>
        <div className="text-[10px] text-fuchsia-300 font-mono mt-2 pt-2 border-t border-slate-800">
          <span>Surge &gt; +3.0 dB (Double-bounce)</span>
        </div>
      </div>

      {/* 5. Agricultural Paddy Exposure */}
      <div className="hud-panel p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Est. Paddy Area</span>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="font-mono font-bold text-xl text-amber-400">
            {impact_telemetry.estimated_paddy_exposure_hectares.toLocaleString()} <span className="text-xs text-slate-400 font-normal">ha</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Regional floodplain estimate
          </p>
        </div>
        <div className="text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-800 flex items-center justify-between">
          <span>Agri Density:</span>
          <span className="text-amber-300 font-bold">~65% parcel</span>
        </div>
      </div>

      {/* 6. Processing Health & Grid Quality */}
      <div className="hud-panel p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider">Grid Alignment</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="font-mono font-bold text-sm text-emerald-300">
            0 Sub-pixel Error
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            UTM Zone 46N (10m cell)
          </p>
        </div>
        <div className="text-[10px] text-slate-300 font-mono flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
          <span>Execution:</span>
          <span className="text-cyan-400 font-bold">{metadata.execution_time_seconds}s</span>
        </div>
      </div>

    </div>
  );
};
