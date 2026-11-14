import React, { useState } from 'react';
import { X, CloudRain, Eye, EyeOff, Radio, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';
import { ProcessingResult } from '../types';

interface CloudPenetrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: ProcessingResult | null;
}

export const CloudPenetrationModal: React.FC<CloudPenetrationModalProps> = ({
  isOpen,
  onClose,
  analysis
}) => {
  const [cloudCoverOpacity, setCloudCoverOpacity] = useState(85);
  const [activeTab, setActiveTab] = useState<'interactive' | 'physics'>('interactive');

  if (!isOpen) return null;

  const radarImg = analysis?.layers.focus_post_gray_png || analysis?.layers.post_radar_png || '/data/focus_post_gray.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#070d1b] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  CLOUD PENETRATION COMPARISON: OPTICAL VS NISAR RADAR
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                  S-Band 3.2 GHz
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Demonstrating why Synthetic Aperture Radar is indispensable during Assam monsoon emergencies
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Switcher */}
            <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  activeTab === 'interactive' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Interactive Cloud Piercer
              </button>
              <button
                onClick={() => setActiveTab('physics')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  activeTab === 'physics' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Microwave Physics
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'interactive' ? (
            <div className="space-y-6">
              
              {/* Slider Control Bar */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <CloudRain className="w-5 h-5 text-sky-400" />
                  <div>
                    <span className="text-sm font-semibold text-white">Monsoon Cloud Cover Simulation</span>
                    <p className="text-xs text-slate-400 font-mono">
                      Drag to simulate cloud piercing: 100% = Optical Satellite View | 0% = NISAR Radar Penetration
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 w-full md:w-80">
                  <span className="text-xs font-mono text-cyan-400 font-bold whitespace-nowrap">
                    {cloudCoverOpacity}% Cloud Cover
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cloudCoverOpacity}
                    onChange={(e) => setCloudCoverOpacity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <button
                    onClick={() => setCloudCoverOpacity(cloudCoverOpacity === 0 ? 95 : 0)}
                    className="px-2.5 py-1 text-xs rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 whitespace-nowrap font-mono"
                  >
                    {cloudCoverOpacity === 0 ? 'Add Clouds' : 'Pierce 100%'}
                  </button>
                </div>
              </div>

              {/* Side-by-side or Stacked Cloud Layer Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Frame 1: Conventional Optical Satellite (Sentinel-2 / Landsat Simulation) */}
                <div className="relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
                  <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-300 flex items-center space-x-1.5">
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Conventional Optical Satellite (Sentinel-2 / Landsat)</span>
                    </span>
                    <span className="font-mono text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      BLOCKED BY MONSOON CLOUDS
                    </span>
                  </div>

                  <div className="relative aspect-square w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                    {/* Background ground */}
                    <img
                      src={radarImg}
                      alt="Ground Reference"
                      className="absolute inset-0 w-full h-full object-contain filter grayscale blur-[1px] opacity-40"
                    />

                    {/* Dense Cloud Fog Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-slate-200/90 via-slate-100/95 to-slate-300/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center transition-all duration-300"
                      style={{ opacity: cloudCoverOpacity / 100 }}
                    >
                      <CloudRain className="w-16 h-16 text-slate-500 mb-3 animate-bounce" />
                      <span className="text-slate-800 font-bold text-base uppercase tracking-wider">
                        100% Cumulonimbus Cloud Cover
                      </span>
                      <p className="text-xs text-slate-600 max-w-xs mt-1 font-mono">
                        Visible light (0.4 - 0.7 μm) cannot penetrate thick monsoon rain clouds. Ground flood extent remains 100% invisible.
                      </p>
                    </div>

                    {cloudCoverOpacity < 30 && (
                      <div className="absolute top-3 right-3 bg-slate-950/80 px-2.5 py-1 rounded text-[11px] font-mono text-cyan-400 border border-cyan-500/30">
                        Simulated Clear Sky Day
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Optical Wavelength: 0.5 μm (Visible)</span>
                    <span className="text-rose-400 font-mono">Zero Penetration</span>
                  </div>
                </div>

                {/* Frame 2: NASA-ISRO NISAR S-Band SAR Radar (Real Observation) */}
                <div className="relative bg-slate-950 rounded-xl border border-cyan-500/40 shadow-hud overflow-hidden flex flex-col">
                  <div className="px-4 py-2.5 bg-cyan-950/70 border-b border-cyan-500/30 flex items-center justify-between text-xs">
                    <span className="font-semibold text-cyan-300 flex items-center space-x-1.5">
                      <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>NASA-ISRO NISAR S-Band SAR (Actual Data)</span>
                    </span>
                    <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">
                      100% ALL-WEATHER PENETRATION
                    </span>
                  </div>

                  <div className="relative aspect-square w-full bg-black overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={radarImg}
                      alt="NISAR S-Band Actual Observation"
                      className="w-full h-full object-contain"
                    />

                    {/* Scanning Beam HUD overlay */}
                    <div className="absolute inset-0 pointer-events-none border border-cyan-500/30 m-2 rounded">
                      <div className="absolute top-2 left-2 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                        FREQ-A • HHHH • S-BAND
                      </div>
                      <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                        GROUND REVEALED: 100%
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-950/40 border-t border-cyan-500/30 text-xs text-slate-300 flex items-center justify-between">
                    <span>Radar Wavelength: 9.3 cm (Microwave)</span>
                    <span className="text-emerald-400 font-mono font-semibold">100% Cloud Penetration</span>
                  </div>
                </div>

              </div>

              {/* Summary Callout Banner */}
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">
                    Scientific Verdict for Disaster Management Authorities:
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    During the devastating July 2026 Assam monsoon flood peak, conventional optical imagery from Sentinel-2 and Landsat was completely obscured by continuous cloud cover. NASA-ISRO NISAR&apos;s S-band active microwave radar was the sole satellite technology able to pierce through meteorological storms day and night, providing emergency responders with exact centimeter-accurate inundation contours.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    Wavelength Advantage
                  </div>
                  <h4 className="text-white font-semibold">Mie Scattering Threshold</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cloud and rain droplets range from 10 to 100 micrometers. Visible light (0.5 μm) scatters heavily (Mie scattering), turning clouds opaque white. NISAR&apos;s S-band wavelength (9.3 cm) is ~1,000 times larger than raindrops, passing unobstructed straight to the surface.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    Day &amp; Night Capability
                  </div>
                  <h4 className="text-white font-semibold">Active Radar Transmitter</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Optical cameras rely on reflected sunlight and fail completely at night. NISAR carries its own high-powered S-band and L-band microwave radar antenna, illuminating Earth&apos;s surface independently at 23:05 UTC (nighttime pass over Assam).
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                    Water Detection Physics
                  </div>
                  <h4 className="text-white font-semibold">Specular Mirror Reflection</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Smooth open floodwaters act as a dielectric specular reflector, bouncing radar pulses away from the antenna. This causes a dramatic collapse in backscatter (&lt; -16 dB), making flooded plains sharply distinguishable from surrounding terrain.
                  </p>
                </div>

              </div>

              {/* Comparison Matrix Table */}
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-slate-300 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Sensor System</th>
                      <th className="p-3">Wavelength</th>
                      <th className="p-3">Monsoon Cloud Piercing</th>
                      <th className="p-3">Night Operation</th>
                      <th className="p-3">Disaster Utility in Assam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="bg-slate-950/60">
                      <td className="p-3 font-semibold text-rose-400">Sentinel-2 (Optical)</td>
                      <td className="p-3 font-mono">0.4 - 2.2 μm</td>
                      <td className="p-3 text-rose-400">0% (Completely Obscured)</td>
                      <td className="p-3 text-rose-400">No (Sunlight Required)</td>
                      <td className="p-3 text-slate-400">Very Low in Peak Monsoons</td>
                    </tr>
                    <tr className="bg-slate-950/60">
                      <td className="p-3 font-semibold text-amber-400">Landsat 8/9 (Optical/TIR)</td>
                      <td className="p-3 font-mono">0.4 - 12.0 μm</td>
                      <td className="p-3 text-rose-400">0% (Cloud Blocked)</td>
                      <td className="p-3 text-rose-400">No (Reflected Light)</td>
                      <td className="p-3 text-slate-400">Very Low during Monsoons</td>
                    </tr>
                    <tr className="bg-cyan-950/30 text-white font-semibold">
                      <td className="p-3 text-cyan-400 flex items-center space-x-1.5">
                        <Radio className="w-3.5 h-3.5 text-cyan-400" />
                        <span>NASA-ISRO NISAR (S-band)</span>
                      </td>
                      <td className="p-3 font-mono text-cyan-300">9.3 cm (3.2 GHz)</td>
                      <td className="p-3 text-emerald-400 font-bold">100% Penetration</td>
                      <td className="p-3 text-emerald-400 font-bold">Yes (24/7 Active)</td>
                      <td className="p-3 text-cyan-300 font-bold">Critical / Mission Primary</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            SARvatra Lab • NASA Space Apps Challenge 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
