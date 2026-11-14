import React from 'react';
import { Radar, ShieldCheck, Heart, Download, FileText, BookOpen, Terminal, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-cyan-500/20 bg-[#03060d] text-slate-400 text-xs font-mono py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Identity & Challenge Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Radar className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-base">SARvatra Lab</span>
              <p className="text-[11px] text-slate-400">NISAR S-Band Earth Observation &amp; Disaster Navigability</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <span className="text-cyan-300 font-semibold">NASA Space Apps Challenge 2026 &bull; Dancing with SAR</span>
            <p className="text-[11px] text-slate-400">Study Area: Sivasagar District &amp; Brahmaputra Basin, Assam, India</p>
          </div>
        </div>

        {/* Quick Official Downloads Bar (Strictly Compliant with NASA Submission Guidelines) */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-cyan-300 font-bold">
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Official NASA Space Apps Deliverables:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/SARvatra_Lab_Official_7_Slide_Demo.pdf"
              download="SARvatra_Lab_Official_7_Slide_Demo.pdf"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              title="Official 7-Slide Winner Presentation Deck required for Global Judging"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official 7-Slide Winner Deck (PDF)</span>
            </a>

            <a
              href="/SARvatra_Lab_Winner_Presentation.pdf"
              download="SARvatra_Lab_Winner_Presentation.pdf"
              className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
              title="Global Award Winner Structured Presentation (PDF)"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Winner Deck Mirror (PDF)</span>
            </a>

            <a
              href="/Sivasagar_Disaster_SitRep_Official.pdf"
              download="Sivasagar_Disaster_SitRep_Official.pdf"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/40 font-bold flex items-center space-x-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-rose-400" />
              <span>ASDMA SitRep (PDF)</span>
            </a>

            <a
              href="/SARvatra_Portal_Standard_Operating_Procedure.pdf"
              download="SARvatra_Portal_Standard_Operating_Procedure.pdf"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold flex items-center space-x-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOP Manual (PDF)</span>
            </a>

            <a
              href="/SARvatra_Lab_Complete_Project_Notebook.ipynb"
              download="SARvatra_Lab_Complete_Project_Notebook.ipynb"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>Jupyter Notebook (.ipynb)</span>
            </a>
          </div>
        </div>

        {/* Super Intelligence (SI) & Attribution Transparency Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Space Agency Data Attribution:</span>
            </div>
            <p>
              Grounded on official open data from the <strong>NASA-ISRO SAR (NISAR)</strong> mission (S-Band Level-2 GCOV), <strong>NASA Earthdata (ASF DAAC)</strong>, <strong>ISRO Space Applications Centre (SAC)</strong>, Copernicus 30m Global DEM (GLO-30), and Central Water Commission (CWC) river hydrograph telemetry. Basemap data &copy; OpenStreetMap contributors.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NASA SI / AI Disclosure Policy Compliance:</span>
            </div>
            <p>
              Super Intelligence (SI) and generative AI tools were utilized strictly for code structuring, TypeScript interface scaffolding, and documentation styling assistance. All core SAR processing logic, the 5x5 Adaptive Lee filter formulation, double-bounce polarimetric models, and disaster response workflows are original work by Team SARvatra Innovations.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-900 gap-2">
          <div>
            &copy; 2026 Team SARvatra Innovations. Published for NASA Space Apps Challenge 2026 under the MIT Open Source License.
          </div>
          <div className="text-cyan-400">
            &ldquo;See What Water Changes. Understand What Earth Reveals.&rdquo;
          </div>
        </div>

      </div>
    </footer>
  );
};
