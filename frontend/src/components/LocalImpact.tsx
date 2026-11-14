import React from 'react';
import { Wheat, Droplets, Users, ShieldAlert, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { ProcessingResult } from '../types';

interface LocalImpactProps {
  analysis: ProcessingResult | null;
}

export const LocalImpact: React.FC<LocalImpactProps> = ({ analysis }) => {
  if (!analysis) return null;

  const { impact_telemetry, statistics } = analysis;
  const waterStats = statistics.classes.potential_water_related_change;

  return (
    <section id="impact-section" className="hud-panel p-5 my-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-6 border-b border-cyan-500/20 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Wheat className="w-5 h-5 text-amber-400" />
            <h2 className="font-display font-bold text-lg text-white tracking-wide">
              LOCAL IMPACT & AGRO-ECOLOGICAL CONTEXT
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Connecting microwave satellite backscatter changes to ground reality in Sivasagar and the Brahmaputra Basin
          </p>
        </div>
        <div className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center space-x-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Scientific Ground Verification Required</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Agricultural Exposure */}
        <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-amber-400">
              <span className="font-display font-bold text-sm tracking-wide uppercase">Agricultural Exposure</span>
              <Wheat className="w-5 h-5" />
            </div>
            
            <div className="pt-2">
              <span className="text-2xl font-mono font-bold text-amber-300">
                {impact_telemetry.estimated_paddy_exposure_hectares.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-slate-400 ml-1.5">hectares exposed</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              In Upper Assam and the Sivasagar riparian corridor, seasonal monsoon paddy (Sali rice) forms the agricultural backbone.
              Standing water across low-lying paddy parcels suppresses radar backscatter through mirror-like reflection.
            </p>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center text-amber-300 font-semibold">
              <FileText className="w-3 h-3 mr-1" />
              <span>Methodology & Caveat:</span>
            </div>
            <p className="leading-normal">
              {impact_telemetry.agricultural_methodology_note}
            </p>
          </div>
        </div>

        {/* 2. Water Resources & Hydrology */}
        <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-cyan-400">
              <span className="font-display font-bold text-sm tracking-wide uppercase">Water Resources & Hydrology</span>
              <Droplets className="w-5 h-5" />
            </div>
            
            <div className="pt-2">
              <span className="text-2xl font-mono font-bold text-cyan-300">
                {waterStats.area_sq_km.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-slate-400 ml-1.5">km² newly inundated</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              The Brahmaputra and Dikhow River confluence near Desangmukh regularly experiences high river stages during mid-July monsoons.
              The NISAR dual-observation pair captures water expansion along riverbanks and riparian oxbow wetlands.
            </p>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex items-center text-cyan-300 font-semibold">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              <span>Hydrological Signature:</span>
            </div>
            <p className="leading-normal">
              Smooth standing water causes specular reflection away from sensor (backscatter &lt; -16 dB).
              Submerged riverbank reedbeds show double-bounce backscatter surges.
            </p>
          </div>
        </div>

        {/* 3. Community & Infrastructure */}
        <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-rose-400">
              <span className="font-display font-bold text-sm tracking-wide uppercase">Community & Infrastructure</span>
              <Users className="w-5 h-5" />
            </div>
            
            <div className="pt-2">
              <span className="text-sm font-mono font-bold text-rose-300">
                Pending Localized Field Census
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Satellite radar reveals physical changes in microwave backscatter.
              Translating radar changes into affected families or damaged houses requires authorized municipal census polygons and ground truth validation.
            </p>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-rose-950 text-[11px] font-mono text-rose-300/90 space-y-1">
            <div className="flex items-center font-semibold text-rose-300">
              <ShieldAlert className="w-3 h-3 mr-1" />
              <span>Scientific Honesty Standard:</span>
            </div>
            <p className="leading-normal">
              {impact_telemetry.community_infrastructure_status.scientific_honesty_statement}
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
