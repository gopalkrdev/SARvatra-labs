import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell
} from 'recharts';
import { BarChart3, TrendingDown, PieChart, Activity } from 'lucide-react';
import { ProcessingResult } from '../types';

interface TemporalChartsProps {
  analysis: ProcessingResult | null;
}

export const TemporalCharts: React.FC<TemporalChartsProps> = ({ analysis }) => {
  if (!analysis) return null;

  const { histograms, statistics } = analysis;

  // Combine Pre and Post histograms for comparison curve
  const histCompareData = histograms.pre_hist.bins.map((binVal, idx) => ({
    backscatter_db: binVal,
    pre_samples: histograms.pre_hist.counts[idx] || 0,
    post_samples: histograms.post_hist.counts[idx] || 0
  }));

  // Delta Histogram Data
  const deltaHistData = histograms.delta_hist.bins.map((binVal, idx) => ({
    delta_db: binVal,
    pixel_count: histograms.delta_hist.counts[idx] || 0
  }));

  // Change Classes Breakdown Data
  const classBreakdownData = [
    {
      name: 'Potential Water',
      area_sq_km: statistics.classes.potential_water_related_change.area_sq_km,
      percentage: statistics.classes.potential_water_related_change.percentage_of_valid,
      color: '#00F0FF'
    },
    {
      name: 'Flooded Veg (Bounce)',
      area_sq_km: statistics.classes.flooded_vegetation_double_bounce.area_sq_km,
      percentage: statistics.classes.flooded_vegetation_double_bounce.percentage_of_valid,
      color: '#D946EF'
    },
    {
      name: 'Decreased Backscatter',
      area_sq_km: statistics.classes.decreased_backscatter.area_sq_km,
      percentage: statistics.classes.decreased_backscatter.percentage_of_valid,
      color: '#2563EB'
    },
    {
      name: 'Stable / Unchanged',
      area_sq_km: statistics.classes.stable_unchanged.area_sq_km,
      percentage: statistics.classes.stable_unchanged.percentage_of_valid,
      color: '#475569'
    }
  ];

  return (
    <section id="temporal-section" className="hud-panel p-5 my-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-6 border-b border-cyan-500/20 gap-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display font-bold text-lg text-white tracking-wide">
            TEMPORAL RADAR TELEMETRY & STATISTICAL DISTRIBUTIONS
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Evaluated Samples: {statistics.valid_samples_count.toLocaleString()} &bull; Bin Resolution: 0.8 dB
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Pre vs Post Backscatter Histogram Distribution */}
        <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="font-bold text-slate-200">RADAR BACKSCATTER DENSITY (σ° dB)</span>
            <span className="text-cyan-400">Pre vs Post Shift</span>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={histCompareData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="preGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="postGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="backscatter_db" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} unit="dB" />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#050b14', borderColor: '#00F0FF', fontSize: 11, fontFamily: 'monospace' }}
                  labelFormatter={(val) => `Backscatter: ${val} dB`}
                />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'monospace' }} />
                <Area type="monotone" dataKey="pre_samples" name="Pre-Flood (15 July)" stroke="#38bdf8" fillOpacity={1} fill="url(#preGrad)" />
                <Area type="monotone" dataKey="post_samples" name="Post-Flood (22 July)" stroke="#00F0FF" fillOpacity={1} fill="url(#postGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-2 text-center">
            Notice leftward shift in post-flood backscatter distribution indicating specular radar energy loss over water.
          </p>
        </div>

        {/* 2. Delta Backscatter (Difference) Histogram */}
        <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="font-bold text-slate-200">DELTA BACKSCATTER (Δσ° = POST - PRE)</span>
            <span className="text-cyan-400">Collapse vs Surge</span>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deltaHistData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="delta_db" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} unit="dB" />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#050b14', borderColor: '#00F0FF', fontSize: 11, fontFamily: 'monospace' }}
                  labelFormatter={(val) => `Delta: ${val} dB`}
                />
                <Bar dataKey="pixel_count" name="Pixel Frequency" fill="#0284c7">
                  {deltaHistData.map((entry, index) => {
                    let color = '#334155';
                    if (entry.delta_db < -3.5) color = '#00F0FF'; // Specular Water drop
                    else if (entry.delta_db > 3.0) color = '#D946EF'; // Double bounce surge
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 text-[10px] font-mono mt-2">
            <span className="text-cyan-400 font-bold">&larr; Specular Water Collapse (&lt; -3.5 dB)</span>
            <span className="text-fuchsia-400 font-bold">Double-Bounce Surge (&gt; +3.0 dB) &rarr;</span>
          </div>
        </div>

      </div>

      {/* 3. Surface Change Class Area Breakdown Bar */}
      <div className="mt-6 p-4 rounded-lg bg-slate-900/70 border border-slate-800">
        <div className="flex items-center justify-between mb-4 text-xs font-mono">
          <span className="font-bold text-slate-200 uppercase">Surface Change Classification Breakdown</span>
          <span className="text-slate-400">Total Valid: {statistics.valid_data_coverage_sq_km} km²</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {classBreakdownData.map((item, idx) => (
            <div key={idx} className="p-3 rounded bg-slate-950/80 border border-slate-800 space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">{item.name}</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
              <div className="text-lg font-bold text-white">
                {item.area_sq_km.toLocaleString()} <span className="text-xs font-normal text-slate-400">km²</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>Coverage:</span>
                <span className="text-cyan-300 font-bold">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
