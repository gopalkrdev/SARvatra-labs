import React, { useState } from 'react';
import { BookOpen, Radio, CloudRain, Sun, ShieldCheck, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

export const ScienceExplainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sar_basics' | 'scattering' | 'nisar_sensor' | 'ground_truth'>('sar_basics');

  return (
    <section id="science-section" className="hud-panel p-6 my-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-6 border-b border-cyan-500/20 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display font-bold text-lg text-white tracking-wide">
              FROM RADAR SIGNALS TO REAL-WORLD MEANING
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Understanding the remote sensing physics behind NISAR microwave Earth observation
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('sar_basics')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'sar_basics'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Why SAR?
          </button>
          <button
            onClick={() => setActiveTab('scattering')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'scattering'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Radar Scattering Physics
          </button>
          <button
            onClick={() => setActiveTab('nisar_sensor')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'nisar_sensor'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. NISAR Dual-Pass
          </button>
          <button
            onClick={() => setActiveTab('ground_truth')}
            className={`px-3 py-1.5 rounded transition-all ${
              activeTab === 'ground_truth'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Scientific Verification
          </button>
        </div>
      </div>

      {/* Tab 1: Why SAR? */}
      {activeTab === 'sar_basics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-display font-bold text-sm">
              <CloudRain className="w-4 h-4" />
              <span>All-Weather Cloud Penetration</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Optical satellites (like Landsat or Sentinel-2) are blinded by dense monsoon cloud cover during peak flooding events.
              NISAR microwave radar operates at centimeter wavelengths (S-band ~9.3 cm, L-band ~24 cm) that pass cleanly through rain, clouds, and smoke without attenuation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-display font-bold text-sm">
              <Sun className="w-4 h-4" />
              <span>Day and Night Active Illumination</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              SAR is an active remote sensing instrument. The satellite emits its own microwave pulses and records the exact time delay and power returned.
              It does not rely on sunlight and acquires high-fidelity observations regardless of solar illumination.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-display font-bold text-sm">
              <Radio className="w-4 h-4" />
              <span>Dielectric & Roughness Sensitivity</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Radar backscatter responds directly to surface physical properties: surface roughness, geometric orientation, and dielectric constant (ε_r).
              When dry soil (ε_r ≈ 4-8) becomes flooded (water ε_r ≈ 80), radar reflection changes dramatically.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Scattering Physics */}
      {activeTab === 'scattering' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Specular Reflection */}
            <div className="p-5 rounded-lg bg-cyan-950/20 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between text-cyan-400">
                <span className="font-display font-bold text-sm uppercase">Specular Reflection (Water)</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[10px] font-mono">Dark Pixels</span>
              </div>

              {/* Diagram */}
              <div className="h-28 bg-slate-950 rounded border border-cyan-500/20 flex items-center justify-center p-2 relative overflow-hidden">
                <div className="absolute top-2 left-6 text-[10px] font-mono text-cyan-300">Satellite Pulse &searr;</div>
                <div className="absolute top-2 right-6 text-[10px] font-mono text-cyan-400">&nearr; Reflected Away</div>
                <div className="absolute bottom-2 inset-x-4 h-2 bg-cyan-500/40 rounded-full" />
                <div className="absolute bottom-6 text-[9px] font-mono text-slate-400 text-center">Flat Standing Water Surface</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Smooth open water acts as a mirror. Microwave pulses bounce away from the radar antenna, causing an acute drop in received power (backscatter &lt; -16 dB).
              </p>
            </div>

            {/* Double Bounce */}
            <div className="p-5 rounded-lg bg-fuchsia-950/20 border border-fuchsia-500/40 space-y-3">
              <div className="flex items-center justify-between text-fuchsia-400">
                <span className="font-display font-bold text-sm uppercase">Double-Bounce (Flooded Veg)</span>
                <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-[10px] font-mono">Bright Pixels</span>
              </div>

              {/* Diagram */}
              <div className="h-28 bg-slate-950 rounded border border-fuchsia-500/20 flex items-center justify-center p-2 relative overflow-hidden">
                <div className="absolute top-2 left-4 text-[10px] font-mono text-fuchsia-300">Incoming Pulse &searr;</div>
                <div className="absolute top-2 right-4 text-[10px] font-mono text-fuchsia-300">&nwarr; Strong Return</div>
                <div className="absolute bottom-2 left-8 w-2 h-14 bg-emerald-600 rounded" />
                <div className="absolute bottom-2 inset-x-4 h-2 bg-cyan-500/40 rounded-full" />
                <div className="absolute bottom-4 text-[9px] font-mono text-slate-300 text-center">Right-angle Corner Reflector</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                When water floods standing vegetation or tree trunks, a 90° corner reflector is formed between the water surface and plant stalks, sending energy back to the antenna (&gt; +3.0 dB surge).
              </p>
            </div>

            {/* Rough Surface Scattering */}
            <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-display font-bold text-sm uppercase">Diffuse Scattering (Dry Land)</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono">Medium Pixels</span>
              </div>

              {/* Diagram */}
              <div className="h-28 bg-slate-950 rounded border border-slate-800 flex items-center justify-center p-2 relative overflow-hidden">
                <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-300">Incoming &searr;</div>
                <div className="absolute inset-x-6 bottom-2 h-4 border-t-2 border-dashed border-amber-500/60" />
                <div className="text-[9px] font-mono text-slate-400 text-center mt-6">Random Diffuse Scattering</div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Rough agricultural fields and dry land scatter microwave energy randomly in all directions. A moderate portion returns to the satellite (-12 to -8 dB).
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: NISAR Sensor */}
      {activeTab === 'nisar_sensor' && (
        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
            <h4 className="text-cyan-400 font-bold text-sm mb-2 font-display">
              NASA-ISRO SAR Mission (NISAR) Level-2 Geocoded Covariance (GCOV)
            </h4>
            <p className="mb-2">
              The observations utilized in SARvatra Lab are official Level-2 GCOV products processed by ISRO and NASA.
              Unlike raw amplitude images, GCOV products provide radiometrically terrain-corrected covariance matrices in linear gamma-zero power:
            </p>
            <div className="p-2.5 rounded bg-slate-950 font-mono text-cyan-300 border border-slate-800 my-2">
              &sigma;&deg; (dB) = 10 &times; log10(Linear_Power_Gamma0)
            </div>
            <p>
              Both scenes are projected onto <strong>WGS 84 / UTM Zone 46N (EPSG:32646)</strong> with a native pixel spacing of 10.0 meters.
              Our pipeline discovered that the two scenes align with <strong>zero sub-pixel offset</strong> on this common geospatial grid.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Scientific Verification */}
      {activeTab === 'ground_truth' && (
        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200">
            <h4 className="text-amber-400 font-bold text-sm mb-2 font-display flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              Scientific Responsibility & Ground Truth Imperative
            </h4>
            <p className="mb-2">
              A single radar backscatter threshold alone does not constitute certified inundation.
              Decreases in backscatter can also occur on flat airport runways, smooth dry asphalt, or wind-roughened waters.
              Conversely, flooded reeds might look bright instead of dark.
            </p>
            <p className="font-semibold text-white">
              SARvatra Lab labels detected zones as: <em>"Potential flood-related change — requires ground verification."</em>
            </p>
            <p className="mt-2 text-slate-400">
              We provide transparent sliders and clear methodology so researchers and disaster managers can test hypotheses without false certainty.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
