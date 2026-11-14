import React from 'react';
import { WifiOff, ShieldCheck, Download, AlertTriangle, Truck, Compass, Building, CheckCircle2 } from 'lucide-react';
import { downloadOfflineRescuePack, OfflineEmergencyPack } from '../services/offlineCache';

interface OfflineBoatModeBannerProps {
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  cacheData: OfflineEmergencyPack;
}

export const OfflineBoatModeBanner: React.FC<OfflineBoatModeBannerProps> = ({
  isOfflineMode,
  onToggleOfflineMode,
  cacheData
}) => {
  if (!isOfflineMode) return null;

  return (
    <div className="sticky top-[108px] z-40 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border-b-2 border-amber-400 text-amber-100 px-4 py-2.5 shadow-2xl animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        
        {/* Left Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500 text-slate-950 font-extrabold shadow-md">
            <WifiOff className="w-4 h-4 animate-pulse" />
            <span>DISASTER OFFLINE BOAT-MODE ACTIVE</span>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-amber-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Zero Internet Required &bull; 100% Embedded Local Cache &bull; Sivasagar Riparian Grid</span>
          </div>
        </div>

        {/* Center Critical Stats for Boat Rescuers */}
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="hidden sm:inline-block">
            Flooded: <strong className="text-white">{cacheData.inundatedAreaSqKm.toFixed(1)} km²</strong>
          </span>
          <span className="hidden sm:inline-block">
            Paddy Impact: <strong className="text-amber-300">{cacheData.exposedPaddyHectares.toLocaleString()} ha</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400 text-rose-300 font-bold">
            CWC Gauge: {cacheData.cwcRiverStageMsl}m MSL (+1.05m Crest)
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={downloadOfflineRescuePack}
            className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-900/90 hover:bg-slate-800 border border-amber-400/80 text-amber-300 font-bold shadow-sm transition-all"
            title="Export complete offline GeoJSON, evacuation routes, and telemetry JSON to local storage"
          >
            <Download className="w-3.5 h-3.5" />
            <span>📥 Rescue Pack</span>
          </button>

          <button
            onClick={onToggleOfflineMode}
            className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 border border-amber-400/40 text-[10px] transition-all"
            title="Return to standard online mode"
          >
            Exit Boat Mode
          </button>
        </div>

      </div>
    </div>
  );
};
