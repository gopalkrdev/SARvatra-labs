import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileCode, Map, ShieldCheck, Globe, Check, Layers } from 'lucide-react';
import { ProcessingResult } from '../types';

interface ExportPanelProps {
  analysis: ProcessingResult | null;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ analysis }) => {
  const [downloadedKml, setDownloadedKml] = useState(false);
  const [downloadedQgis, setDownloadedQgis] = useState(false);

  if (!analysis) return null;

  const { analysis_id } = analysis;

  const handleDownload = (formatType: 'csv' | 'json' | 'geotiff') => {
    window.open(`/api/analysis/${analysis_id}/export/${formatType}`, '_blank');
  };

  const handleDownloadGeoJSON = () => {
    window.open('/api/aoi/sivasagar', '_blank');
  };

  // FEATURE 5: Generate and Download Google Earth KML on the fly
  const handleDownloadKml = () => {
    const kmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>SARvatra Lab - NISAR Flood Intelligence</name>
    <description>NASA-ISRO NISAR S-Band Flood Inundation &amp; Sivasagar District Assessment (2026-07-15 to 2026-07-22)</description>
    <Folder>
      <name>Critical Flood Landmarks</name>
      <Placemark>
        <name>Desangmukh (Dikhow-Brahmaputra Confluence)</name>
        <description>Critical Flood Breach Zone &bull; Specular backscatter collapse &lt; -18 dB</description>
        <Point><coordinates>94.550,27.100,0</coordinates></Point>
      </Placemark>
      <Placemark>
        <name>Sivasagar Civil Hospital (District HQ)</name>
        <description>Elevation: 104m MSL &bull; Designated Safe Zone</description>
        <Point><coordinates>94.638,26.985,0</coordinates></Point>
      </Placemark>
      <Placemark>
        <name>Rang Ghar Historical Safe Assembly</name>
        <description>High Ground Terrace &bull; Primary Relief Shelter</description>
        <Point><coordinates>94.622,26.965,0</coordinates></Point>
      </Placemark>
    </Folder>
    <GroundOverlay>
      <name>NISAR Flood Inundation Raster</name>
      <description>Georeferenced S-Band Level-2 GCOV Change Classification Layer</description>
      <Icon><href>${window.location.origin}/data/change_map.png</href></Icon>
      <LatLonBox>
        <north>28.0</north>
        <south>26.5</south>
        <east>95.5</east>
        <west>94.0</west>
      </LatLonBox>
    </GroundOverlay>
  </Document>
</kml>`;

    const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SARvatra_NISAR_Flood_Sivasagar_${analysis_id}.kml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedKml(true);
    setTimeout(() => setDownloadedKml(false), 3000);
  };

  // FEATURE 5: Download QGIS / ArcGIS Layer Package
  const handleDownloadQgisPackage = () => {
    const qgisMetadata = {
      project: "SARvatra Lab GIS Intelligence",
      epsg: 32646,
      datum: "WGS 84 / UTM Zone 46N",
      observation_pre: analysis.metadata.pre_observation_date,
      observation_post: analysis.metadata.post_observation_date,
      water_threshold_db: analysis.parameters.water_threshold_db,
      total_inundation_sq_km: analysis.impact_telemetry.potential_inundated_sq_km,
      paddy_loss_ha: analysis.impact_telemetry.estimated_paddy_exposure_hectares,
      layers: [
        { name: "Inundation_GeoTIFF", file: "flood_change_32646.tif", type: "Raster" },
        { name: "Sivasagar_Boundary", file: "sivasagar_district.geojson", type: "Vector Polygon" },
        { name: "Evacuation_Routes", type: "Vector Polyline", count: 4 }
      ]
    };

    const blob = new Blob([JSON.stringify(qgisMetadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SARvatra_QGIS_Project_Definition_${analysis_id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedQgis(true);
    setTimeout(() => setDownloadedQgis(false), 3000);
  };

  return (
    <section className="hud-panel p-5 my-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-cyan-500/20 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display font-bold text-lg text-white tracking-wide">
              REPRODUCIBLE RESEARCH &amp; GIS INTEROPERABILITY HUB
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Download certified analysis products, Google Earth KMLs, and QGIS / ArcGIS packages for external verification
          </p>
        </div>
        <div className="text-xs font-mono text-cyan-300 flex items-center space-x-1.5 bg-cyan-950/40 px-3 py-1 rounded border border-cyan-500/30">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Analysis ID: {analysis_id}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
        
        {/* 1. Google Earth 3D KML (FEATURE 5) */}
        <div className="p-4 rounded-lg bg-slate-900/90 border border-cyan-500/40 flex flex-col justify-between space-y-3 shadow-hud">
          <div>
            <div className="flex items-center justify-between text-cyan-400 mb-1">
              <span className="font-bold text-white uppercase flex items-center space-x-1.5">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Google Earth 3D (.KML)</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">Ready</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Complete 3D Google Earth file embedding NISAR georeferenced flood overlay, relief shelters, and river confluences.
            </p>
          </div>
          <button
            onClick={handleDownloadKml}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded transition-all shadow-hud"
          >
            {downloadedKml ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloadedKml ? 'Downloaded!' : 'Download Google Earth KML'}</span>
          </button>
        </div>

        {/* 2. QGIS / ArcGIS Layer Package (FEATURE 5) */}
        <div className="p-4 rounded-lg bg-slate-900/90 border border-fuchsia-500/40 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-fuchsia-400 mb-1">
              <span className="font-bold text-white uppercase flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-fuchsia-400" />
                <span>QGIS / ArcGIS Package</span>
              </span>
              <span className="px-1.5 py-0.2 rounded bg-fuchsia-500/20 text-fuchsia-300 text-[10px]">EPSG:32646</span>
            </div>
            <p className="text-[11px] text-slate-300">
              QGIS layer definitions and calibrated vector parameters formatted for instant import into GIS disaster war-rooms.
            </p>
          </div>
          <button
            onClick={handleDownloadQgisPackage}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded transition-all shadow-md"
          >
            {downloadedQgis ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloadedQgis ? 'Downloaded!' : 'Download QGIS Package'}</span>
          </button>
        </div>

        {/* 3. GeoTIFF Download */}
        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-cyan-400 mb-1">
              <span className="font-bold text-white uppercase">Processed GeoTIFF</span>
              <Map className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-400">
              2-Band 32-bit Float GeoTIFF (Band 1: Delta dB, Band 2: Change Classification) with UTM 46N georeferencing.
            </p>
          </div>
          <button
            onClick={() => handleDownload('geotiff')}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold rounded border border-cyan-500/40 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .TIF (29 MB)</span>
          </button>
        </div>

        {/* 4. CSV Metrics Download */}
        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-emerald-400 mb-1">
              <span className="font-bold text-white uppercase">Metrics &amp; Telemetry CSV</span>
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-400">
              Tabular summary of observation dates, pixel frequencies, hectare areas, and change classifications.
            </p>
          </div>
          <button
            onClick={() => handleDownload('csv')}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold rounded border border-emerald-500/40 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .CSV</span>
          </button>
        </div>

        {/* 5. JSON Scientific Report */}
        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-sky-400 mb-1">
              <span className="font-bold text-white uppercase">Scientific JSON Report</span>
              <FileCode className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-400">
              Complete machine-readable manifest including bounding boxes, histogram arrays, radar physics, and caveats.
            </p>
          </div>
          <button
            onClick={() => handleDownload('json')}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold rounded border border-sky-500/40 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .JSON</span>
          </button>
        </div>

        {/* 6. Sivasagar GeoJSON */}
        <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-amber-400 mb-1">
              <span className="font-bold text-white uppercase">Sivasagar Boundary GeoJSON</span>
              <Map className="w-4 h-4" />
            </div>
            <p className="text-[11px] text-slate-400">
              Official OpenStreetMap administrative polygon for Sivasagar District, Assam (1,630 boundary vertices).
            </p>
          </div>
          <button
            onClick={handleDownloadGeoJSON}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded border border-amber-500/40 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .GeoJSON</span>
          </button>
        </div>

      </div>

    </section>
  );
};
