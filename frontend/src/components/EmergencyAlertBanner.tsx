import React from 'react';
import { ShieldAlert, Volume2, Square, Radio, Waves } from 'lucide-react';
import { Language, translations } from '../services/i18n';

interface EmergencyAlertBannerProps {
  isPlaying: boolean;
  onStop: () => void;
  language: Language;
}

export const EmergencyAlertBanner: React.FC<EmergencyAlertBannerProps> = ({
  isPlaying,
  onStop,
  language
}) => {
  if (!isPlaying) return null;

  const t = translations[language];

  return (
    <div className="sticky top-[61px] z-40 bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-b-2 border-red-500 shadow-2xl px-4 py-3 text-white animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Siren & Badge */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white animate-ping">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600 text-white shadow-lg -ml-12 z-10">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold text-xs uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-red-400 text-red-200">
                EAS PRIORITY 1 &bull; LIVE BROADCAST
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-red-100 tracking-wide mt-0.5">
              NASA-ISRO NISAR Satellite Disaster Telemetry &bull; Sivasagar Floods
            </p>
          </div>
        </div>

        {/* Center Live EQ Spectrum Visualizer & Scrolling Text */}
        <div className="flex-1 max-w-2xl px-2 hidden sm:flex items-center space-x-4">
          
          {/* Animated EQ Audio Bars */}
          <div className="flex items-end space-x-1 h-6 flex-shrink-0">
            <span className="w-1 bg-red-400 rounded-t animate-[bounce_0.6s_infinite_100ms] h-3"></span>
            <span className="w-1 bg-amber-400 rounded-t animate-[bounce_0.5s_infinite_200ms] h-6"></span>
            <span className="w-1 bg-red-300 rounded-t animate-[bounce_0.7s_infinite_150ms] h-4"></span>
            <span className="w-1 bg-yellow-400 rounded-t animate-[bounce_0.4s_infinite_50ms] h-5"></span>
            <span className="w-1 bg-red-400 rounded-t animate-[bounce_0.6s_infinite_300ms] h-6"></span>
            <span className="w-1 bg-amber-300 rounded-t animate-[bounce_0.5s_infinite_250ms] h-3"></span>
          </div>

          {/* Marquee Transcript Text */}
          <div className="overflow-hidden whitespace-nowrap bg-black/40 px-3 py-1.5 rounded-lg border border-red-500/30 flex-1">
            <div className="inline-block animate-marquee font-mono text-[11px] text-amber-200">
              🚨 {t.broadcastAudioText}
            </div>
          </div>
        </div>

        {/* Right Stop Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onStop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-red-300 hover:text-white border border-red-500/50 text-xs font-mono font-bold transition-all shadow-md"
          >
            <Square className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>STOP BROADCAST</span>
          </button>
        </div>

      </div>
    </div>
  );
};
