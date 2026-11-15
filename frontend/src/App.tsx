import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MetricCards } from './components/MetricCards';
import { DualObservationGallery } from './components/DualObservationGallery';
import { AnalysisControls } from './components/AnalysisControls';
import { InteractiveMap } from './components/InteractiveMap';
import { SwipeComparison } from './components/SwipeComparison';
import { TemporalCharts } from './components/TemporalCharts';
import { LocalImpact } from './components/LocalImpact';
import { ScienceExplainer } from './components/ScienceExplainer';
import { DataCatalogModal } from './components/DataCatalogModal';
import { ExportPanel } from './components/ExportPanel';
import { FutureRoadmap } from './components/FutureRoadmap';
import { Footer } from './components/Footer';

// World-Class Disaster Intelligence & Scientific Modals
import { CloudPenetrationModal } from './components/CloudPenetrationModal';
import { DisasterSitRepModal } from './components/DisasterSitRepModal';
import { TerrainProfileModal } from './components/TerrainProfileModal';
import { SarvatraAiModal } from './components/SarvatraAiModal';
import { PolarimetryModal } from './components/PolarimetryModal';
import { AccuracyValidationModal } from './components/AccuracyValidationModal';
import { OrbitalTelemetryModal } from './components/OrbitalTelemetryModal';
import { EmergencyAlertBanner } from './components/EmergencyAlertBanner';
import { JudgeTourModal } from './components/JudgeTourModal';
import { Hdf5TreeInspectorModal } from './components/Hdf5TreeInspectorModal';
import { PortalManualModal } from './components/PortalManualModal';
import { NasaSubmissionDossierModal } from './components/NasaSubmissionDossierModal';
import { NisarOverpassModal } from './components/NisarOverpassModal';
import { InSarCoherenceModal } from './components/InSarCoherenceModal';
import { OfflineBoatModeBanner } from './components/OfflineBoatModeBanner';
import { initializeOfflineCache, getOfflineCache, OfflineEmergencyPack, DEFAULT_OFFLINE_PACK } from './services/offlineCache';
import { Language, playEmergencyVoiceAlert } from './services/i18n';

import {
  fetchCatalog,
  fetchLatestAnalysis,
  validatePair,
  runAnalysis,
  fetchSivasagarBoundary,
  updateDataDirectory
} from './services/api';

import { DataCatalogResponse, GeospatialValidationResponse, ProcessingResult } from './types';
import { Bot, Sparkles, ShieldAlert, Mountain, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const [analystMode, setAnalystMode] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);

  // Internationalization & Audio State
  const [language, setLanguage] = useState<Language>('en');
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  // World-Class Killer Features Modals State
  const [cloudModalOpen, setCloudModalOpen] = useState(false);
  const [sitRepModalOpen, setSitRepModalOpen] = useState(false);
  const [terrainModalOpen, setTerrainModalOpen] = useState(false);
  const [aiCopilotOpen, setAiCopilotOpen] = useState(false);
  const [polarimetryModalOpen, setPolarimetryModalOpen] = useState(false);
  const [accuracyModalOpen, setAccuracyModalOpen] = useState(false);
  const [orbitalModalOpen, setOrbitalModalOpen] = useState(false);
  const [judgeTourOpen, setJudgeTourOpen] = useState(false);
  const [hdf5TreeOpen, setHdf5TreeOpen] = useState(false);
  const [portalManualOpen, setPortalManualOpen] = useState(false);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [overpassOpen, setOverpassOpen] = useState(false);
  const [coherenceOpen, setCoherenceOpen] = useState(false);

  // Disaster Offline Boat-Mode State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [cacheData, setCacheData] = useState<OfflineEmergencyPack>(DEFAULT_OFFLINE_PACK);

  // Data states
  const [catalog, setCatalog] = useState<DataCatalogResponse | null>(null);
  const [validation, setValidation] = useState<GeospatialValidationResponse | null>(null);
  const [analysis, setAnalysis] = useState<ProcessingResult | null>(null);
  const [sivasagarGeojson, setSivasagarGeojson] = useState<any>(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [catalogRefreshing, setCatalogRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initial Data Load
  useEffect(() => {
    async function initData() {
      setLoading(true);
      try {
        const cat = await fetchCatalog();
        setCatalog(cat);

        try {
          const boundary = await fetchSivasagarBoundary();
          setSivasagarGeojson(boundary);
        } catch (e) {
          console.warn("Could not load Sivasagar boundary GeoJSON:", e);
        }

        const latest = await fetchLatestAnalysis();
        if (latest) {
          setAnalysis(latest);
          const updatedCache = initializeOfflineCache(latest);
          setCacheData(updatedCache);
        } else {
          const cached = initializeOfflineCache();
          setCacheData(cached);
        }

        if (cat.detected_pairs && cat.detected_pairs.length > 0) {
          const pair = cat.detected_pairs[0];
          try {
            const val = await validatePair(pair.pre_file_id, pair.post_file_id);
            setValidation(val);
          } catch (e) {
            console.warn("Geospatial validation check:", e);
          }
        }
      } catch (err: any) {
        console.error("Initialization error:", err);
        // Fallback to offline cache if backend cannot be reached
        const fallback = getOfflineCache();
        setCacheData(fallback);
        setIsOfflineMode(true);
        setErrorMessage("Operating in Offline Disaster Mode. Showing cached telemetry and vector layers.");
      } finally {
        setLoading(false);
      }
    }

    initData();

    // Browser Online / Offline Network Listeners
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOfflineMode(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRunAnalysis = async (params: {
    polarization: string;
    water_threshold_db: number;
    post_water_max_db: number;
    veg_double_bounce_threshold_db: number;
    stride: number;
    aoi_type: string;
  }) => {
    if (!catalog || catalog.files.length < 2) {
      setErrorMessage("At least two NISAR HDF5 observation files are required to run change analysis.");
      return;
    }

    const preFile = catalog.files.find(f => f.filename.includes('20260715')) || catalog.files[0];
    const postFile = catalog.files.find(f => f.filename.includes('20260722')) || catalog.files[1];

    setAnalyzing(true);
    setErrorMessage(null);

    try {
      const result = await runAnalysis({
        pre_file_id: preFile.file_id,
        post_file_id: postFile.file_id,
        ...params
      });
      setAnalysis(result);
    } catch (err: any) {
      console.error("Analysis execution error:", err);
      setErrorMessage(err.message || "Radar analysis processing failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUpdateDirectory = async (newDir: string) => {
    setCatalogRefreshing(true);
    setErrorMessage(null);
    try {
      await updateDataDirectory(newDir);
      const cat = await fetchCatalog();
      setCatalog(cat);
      if (cat.detected_pairs.length > 0) {
        const val = await validatePair(cat.detected_pairs[0].pre_file_id, cat.detected_pairs[0].post_file_id);
        setValidation(val);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to scan updated directory.");
    } finally {
      setCatalogRefreshing(false);
    }
  };

  // Play / Stop Emergency Voice Broadcast
  const handlePlayVoiceAlert = () => {
    if (isVoicePlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsVoicePlaying(false);
      return;
    }

    setIsVoicePlaying(true);
    playEmergencyVoiceAlert(
      language,
      () => setIsVoicePlaying(true),
      () => setIsVoicePlaying(false)
    );
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header */}
      <Header
        analystMode={analystMode}
        setAnalystMode={setAnalystMode}
        onOpenCatalog={() => setCatalogModalOpen(true)}
        activeDataCount={catalog?.total_files || 0}
        language={language}
        setLanguage={setLanguage}
        onPlayVoiceAlert={handlePlayVoiceAlert}
        isVoicePlaying={isVoicePlaying}
        onOpenSitRep={() => setSitRepModalOpen(true)}
        onOpenCloudPenetration={() => setCloudModalOpen(true)}
        onOpenAiCopilot={() => setAiCopilotOpen(true)}
        onOpenPolarimetry={() => setPolarimetryModalOpen(true)}
        onOpenAccuracy={() => setAccuracyModalOpen(true)}
        onOpenOrbital={() => setOrbitalModalOpen(true)}
        onOpenTerrainProfile={() => setTerrainModalOpen(true)}
        onOpenJudgeTour={() => setJudgeTourOpen(true)}
        onOpenPortalManual={() => setPortalManualOpen(true)}
        onOpenHdf5Tree={() => setHdf5TreeOpen(true)}
        onOpenDossier={() => setDossierOpen(true)}
        onOpenOverpass={() => setOverpassOpen(true)}
        onOpenCoherence={() => setCoherenceOpen(true)}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
      />

      {/* Emergency Alert System (EAS) Live HUD Banner */}
      <EmergencyAlertBanner
        isPlaying={isVoicePlaying}
        onStop={handlePlayVoiceAlert}
        language={language}
      />

      {/* 100% OFFLINE DISASTER BOAT-MODE HUD BANNER */}
      <OfflineBoatModeBanner
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
        cacheData={cacheData}
      />

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="bg-rose-950/80 border-b border-rose-500/40 px-4 py-2 text-rose-300 text-xs font-mono text-center flex items-center justify-center space-x-2">
          <span>&bull;</span>
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="underline ml-2 text-white">Dismiss</button>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onExploreMission={() => {
            document.getElementById('science-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDashboard={() => {
            document.getElementById('dual-gallery-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          hasRealData={Boolean(catalog && catalog.total_files >= 2)}
          preDate={analysis?.metadata.pre_observation_date || "2026-07-15"}
          postDate={analysis?.metadata.post_observation_date || "2026-07-22"}
          language={language}
          onOpenSitRep={() => setSitRepModalOpen(true)}
          onOpenTerrainProfile={() => setTerrainModalOpen(true)}
          onOpenCloudPenetration={() => setCloudModalOpen(true)}
          onOpenAiCopilot={() => setAiCopilotOpen(true)}
          onOpenPolarimetry={() => setPolarimetryModalOpen(true)}
          onOpenAccuracy={() => setAccuracyModalOpen(true)}
          onOpenOrbital={() => setOrbitalModalOpen(true)}
          onOpenJudgeTour={() => setJudgeTourOpen(true)}
          onOpenPortalManual={() => setPortalManualOpen(true)}
          onOpenDossier={() => setDossierOpen(true)}
        />

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Key Metric Cards */}
          <MetricCards analysis={analysis} loading={loading} />

          {/* DUAL OBSERVATION SATELLITE GALLERY */}
          <DualObservationGallery analysis={analysis} />

          {/* Analyst Mode Parameters Controls */}
          {analystMode && (
            <AnalysisControls
              onRunAnalysis={handleRunAnalysis}
              isRunning={analyzing}
              preDate={analysis?.metadata.pre_observation_date || "2026-07-15"}
              postDate={analysis?.metadata.post_observation_date || "2026-07-22"}
            />
          )}

          {/* Interactive Geospatial Map with Pixel Probe & All Launchers */}
          <InteractiveMap
            analysis={analysis}
            validation={validation}
            sivasagarGeojson={sivasagarGeojson}
            onOpenSitRep={() => setSitRepModalOpen(true)}
            onOpenTerrainProfile={() => setTerrainModalOpen(true)}
            onOpenCloudPenetration={() => setCloudModalOpen(true)}
            onOpenPolarimetry={() => setPolarimetryModalOpen(true)}
            onOpenAccuracy={() => setAccuracyModalOpen(true)}
            onOpenOrbital={() => setOrbitalModalOpen(true)}
            isOfflineMode={isOfflineMode}
          />

          {/* Before-After Swipe Curtain Comparison */}
          <SwipeComparison analysis={analysis} />

          {/* Temporal Charts & Histograms */}
          <TemporalCharts analysis={analysis} />

          {/* Local Impact & Agro-Ecological Context */}
          <LocalImpact analysis={analysis} />

          {/* Scientific Storytelling & Methodology Explainer */}
          <ScienceExplainer />

          {/* Reproducible Research & Geospatial Export Hub (with Google Earth KML & QGIS) */}
          <ExportPanel analysis={analysis} />

          {/* Global Vision & Future Roadmap (Scalability & Multi-Hazard Horizon) */}
          <FutureRoadmap />

        </div>

      </main>

      {/* Floating Persistent AI Copilot Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiCopilotOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-cyan-200"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
          </span>
          <Bot className="w-5 h-5 text-slate-950" />
          <span className="tracking-wide">Ask SARvatra AI</span>
          <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
        </button>
      </div>

      {/* MODAL 1: Cloud Penetration Optical vs Radar Comparison */}
      <CloudPenetrationModal
        isOpen={cloudModalOpen}
        onClose={() => setCloudModalOpen(false)}
        analysis={analysis}
      />

      {/* MODAL 2: 1-Click ASDMA / NDRF Disaster Situation Report */}
      <DisasterSitRepModal
        isOpen={sitRepModalOpen}
        onClose={() => setSitRepModalOpen(false)}
        analysis={analysis}
      />

      {/* MODAL 3: 3D Terrain Elevation & Flood Depth Model */}
      <TerrainProfileModal
        isOpen={terrainModalOpen}
        onClose={() => setTerrainModalOpen(false)}
      />

      {/* MODAL 4: SARvatra AI Copilot */}
      <SarvatraAiModal
        isOpen={aiCopilotOpen}
        onClose={() => setAiCopilotOpen(false)}
        analysis={analysis}
      />

      {/* MODAL 5: Polarimetric Covariance Decomposition */}
      <PolarimetryModal
        isOpen={polarimetryModalOpen}
        onClose={() => setPolarimetryModalOpen(false)}
        analysis={analysis}
      />

      {/* MODAL 6: CWC River Gauge Telemetry & Accuracy Matrix */}
      <AccuracyValidationModal
        isOpen={accuracyModalOpen}
        onClose={() => setAccuracyModalOpen(false)}
      />

      {/* MODAL 7: 3D Satellite Orbital Trajectory & SweepSAR Geometry */}
      <OrbitalTelemetryModal
        isOpen={orbitalModalOpen}
        onClose={() => setOrbitalModalOpen(false)}
      />

      {/* MODAL 8: 60-Second Real-Time NISAR Orbital Recon Briefing */}
      <JudgeTourModal
        isOpen={judgeTourOpen}
        onClose={() => setJudgeTourOpen(false)}
        analysis={analysis}
        onOpenCloudPenetration={() => setCloudModalOpen(true)}
        onOpenSitRep={() => setSitRepModalOpen(true)}
        onOpenAccuracy={() => setAccuracyModalOpen(true)}
        onOpenTerrainProfile={() => setTerrainModalOpen(true)}
      />

      {/* MODAL 9: Raw NISAR HDF5 Hierarchy & Chunk Inspector */}
      <Hdf5TreeInspectorModal
        isOpen={hdf5TreeOpen}
        onClose={() => setHdf5TreeOpen(false)}
        catalog={catalog}
      />

      {/* MODAL 10: Interactive User Manual & Radar Decoder */}
      <PortalManualModal
        isOpen={portalManualOpen}
        onClose={() => setPortalManualOpen(false)}
        onOpenJudgeTour={() => {
          setPortalManualOpen(false);
          setJudgeTourOpen(true);
        }}
        onOpenCloudPenetration={() => {
          setPortalManualOpen(false);
          setCloudModalOpen(true);
        }}
        onOpenSitRep={() => {
          setPortalManualOpen(false);
          setSitRepModalOpen(true);
        }}
      />

      {/* MODAL 11: Official NASA Space Apps Submission Dossier */}
      <NasaSubmissionDossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
        analysis={analysis}
      />

      {/* MODAL 12: NISAR 12-Day Orbit Overpass Countdown & Mission Planner */}
      <NisarOverpassModal
        isOpen={overpassOpen}
        onClose={() => setOverpassOpen(false)}
      />

      {/* MODAL 13: InSAR Coherence Loss & Temporal Phase Decorrelation Simulator */}
      <InSarCoherenceModal
        isOpen={coherenceOpen}
        onClose={() => setCoherenceOpen(false)}
      />

      {/* Local HDF5 Data Catalog Modal */}
      <DataCatalogModal
        isOpen={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
        catalog={catalog}
        onUpdateDirectory={handleUpdateDirectory}
        refreshing={catalogRefreshing}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
};
