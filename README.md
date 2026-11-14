# SARvatra Lab

> **"See What Water Changes. Understand What Earth Reveals."**  
> *From Satellite Radar to Ground Reality.*

**NASA Space Apps Challenge 2026** &bull; **Challenge:** Dancing with SAR  
**Primary Research Topic:** NISAR-Based Flood-Related Surface Change Detection and Visualization  
**Study Area:** Sivasagar District & Brahmaputra Basin, Assam, India  

---

## 🛰️ Project Overview

**SARvatra Lab** is an interactive Earth observation platform that ingests real **NASA-ISRO NISAR** Level-2 Geocoded Covariance (GCOV) synthetic aperture radar data to detect, map, and communicate flood-related surface changes.

Our case study evaluates dual-date observations across **Sivasagar, Assam** during the July 2026 monsoon surge:
- **Pre-Flood Reference:** July 15, 2026 (SSAR S-band Level-2 GCOV)
- **Peak Flood Stage:** July 22, 2026 (SSAR S-band Level-2 GCOV)

SARvatra Lab bridges the gap between complex radar scattering physics and actionable public understanding—empowering citizens, disaster response authorities, and remote sensing scientists with transparent, reproducible evidence.

> **Independent Project Notice:** This is an independent educational research and visualization project created for the global NASA Space Apps Challenge. It is not an official application of NASA or ISRO and does not imply official endorsement.

---

## ✨ Key Capabilities

1. **Direct Ingestion of 11 GB+ HDF5 Data:** Safely reads raw NISAR GCOV HDF5 files on local disk without loading entire rasters into RAM.
2. **Date Telemetry Verification:** Extracts verified acquisition dates from HDF5 metadata (July 15 & July 22, 2026), resolving casual preliminary note discrepancies.
3. **Sub-Pixel Geospatial Alignment:** Verifies projection (`EPSG:32646`) and coordinate lattices down to 0 sub-pixel error.
4. **Adaptive Lee Speckle Filtering:** $5 \times 5$ window speckle filter that suppresses radar noise while preserving sharp river dykes and land-water edges.
5. **Transparent Change Classification:**
   - **Potential Water-Related Change:** Specular collapse ($\Delta\sigma^\circ < -3.5\text{ dB}$, $\sigma^\circ_{\text{post}} < -16\text{ dB}$)
   - **Flooded Vegetation:** Double-bounce surge ($\Delta\sigma^\circ > +3.0\text{ dB}$)
   - **Decreased Backscatter:** Elevated soil moisture ($-3.5\text{ dB} \le \Delta\sigma^\circ < -1.5\text{ dB}$)
   - **Stable / Unchanged:** Seasonal baseline
6. **Multi-Temporal Swipe Curtain:** Interactive draggable slider comparing pre-flood vs peak-flood radar imagery over identical ground coordinates.
7. **Local Agro-Ecological Context:** Real surface water quantification with estimated paddy cropland exposure.
8. **Reproducible Research Hub:** One-click downloads for processed GeoTIFFs, CSV metrics, JSON reports, and Sivasagar administrative polygons.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Leaflet, Recharts, Lucide Icons
- **Backend:** Python 3.14, FastAPI, Uvicorn, h5py, NumPy, SciPy, Rasterio, Shapely, PyProj
- **Geospatial Standards:** GeoTIFF, Cloud-Optimized GeoTIFF, WGS 84 / UTM Zone 46N (`EPSG:32646`), GeoJSON

---

## 🚀 Quick Start (Windows)

### Option A: One-Click Startup Script
Simply double-click:
```bat
run_windows.bat
```
This automatically verifies Python dependencies, launches the FastAPI backend on `http://127.0.0.1:8000`, and starts the Vite frontend on `http://localhost:5173`.

---

### Option B: Manual Setup

#### 1. Backend Setup
```bash
# Verify or install Python packages
pip install -r backend/requirements.txt

# Start the FastAPI engine
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Health Check: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)
- Interactive API Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Web Application: [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
d:\SARvatra_-labs\
├── frontend/                     # React + Vite + TypeScript application
│   ├── src/
│   │   ├── components/           # Header, Hero, Map, Swipe, Charts, Impact, Explainer
│   │   ├── services/             # REST API client
│   │   ├── types/                # TypeScript interfaces
│   │   └── styles/               # HUD theme & Tailwind styles
│   └── package.json
├── backend/                      # Python FastAPI remote sensing backend
│   ├── app/
│   │   ├── api/routes.py         # REST endpoints
│   │   ├── services/             # HDF5 scanner, geospatial validator, radar processor
│   │   ├── schemas/              # Pydantic models
│   │   ├── utils/                # 5x5 Adaptive Lee filter
│   │   └── config.py             # Active directory configuration
│   ├── tests/                    # Unit tests for discovery & geospatial alignment
│   └── requirements.txt
├── workspace/                    # Generated products (GeoTIFFs, PNG overlays, reports)
│   ├── processed/                # 2-Band GeoTIFFs
│   ├── previews/                 # Map raster overlays
│   └── reports/                  # JSON analysis manifests
├── docs/                         # Scientific & architectural documentation
│   ├── SCIENTIFIC_METHOD.md
│   ├── DATA_SOURCES.md
│   ├── ARCHITECTURE.md
│   └── LIMITATIONS.md
├── run_windows.bat               # Windows one-click launcher
└── README.md
```

---

## 🧪 Testing & Verification

Run the automated backend test suite:
```bash
python -m unittest backend.tests.test_pipeline
```
**Results:**
- `test_catalog_discovery`: Discovers 2 real NISAR HDF5 files (~11.8 GB each) and extracts verified acquisition dates (2026-07-15 & 2026-07-22).
- `test_geospatial_validation`: Confirms 23,801.7 km² mutual overlap, 85.95 km² northern Sivasagar riparian intersection, and zero sub-pixel lattice offset.

---

## ⚖️ Scientific Integrity & Disclaimers

1. **Classification Designation:** All surface water detections are explicitly designated as *"Potential flood-related change — requires ground verification"*.
2. **Honest Spatial Boundaries:** Pre-event Scene 1 covers Northern Sivasagar; Post-event Scene 2 covers 100% of Sivasagar. SARvatra Lab accurately displays this partial dual-date overlap rather than inventing southern reference data.
3. **No Hallucinated Demographics:** In the absence of an authorized localized census layer, population impacts are marked as *"Pending localized field survey"* rather than manufacturing unverified statistics.
