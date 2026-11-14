# SARvatra Lab — System Architecture

## Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              FRONTEND                                   |
|   React 18 + TypeScript + Vite + Tailwind CSS + Leaflet + Recharts     |
|                                                                         |
|   - Interactive Map with Sivasagar Boundary & NISAR Swaths              |
|   - Live Radar Before-After Curtain Swipe Comparison                    |
|   - Real Backscatter Histograms & Change Classification Charts          |
|   - Explorer Mode (Citizens) & Analyst Mode (Scientists)                |
|   - Reproducible Export Hub (GeoTIFF, CSV, JSON, GeoJSON)               |
+------------------------------------+------------------------------------+
                                     |  HTTP REST / JSON / PNG Overlays
                                     v
+-------------------------------------------------------------------------+
|                              BACKEND                                    |
|                         FastAPI + Uvicorn                               |
|                                                                         |
|   [data_discovery.py]   -> Safe HDF5 scan without loading into RAM      |
|   [geospatial.py]       -> Overlap & Sivasagar boundary intersection    |
|   [nisar_processor.py]  -> Memory-aware window slicing & Lee filter     |
|   [speckle_filter.py]   -> 5x5 Adaptive Lee radar noise reduction       |
|   [export_service.py]   -> GeoTIFF and CSV metrics generation           |
+------------------------------------+------------------------------------+
                                     |  Chunked HDF5 Slicing
                                     v
+-------------------------------------------------------------------------+
|                           LOCAL FILESYSTEM                              |
|   Raw NISAR Data (11.8 GB each): D:\SARvatra_labs\data\                |
|   - Observation A: July 15, 2026 (Pre-Flood)                            |
|   - Observation B: July 22, 2026 (Post-Flood)                           |
+-------------------------------------------------------------------------+
```

## Memory Management Principles
1. **Never Load Full 11 GB Arrays:** The full raster is 33,840 × 34,848 float32 pixels (~4.7 GB uncompressed per band). Loading two scenes simultaneously would cause Out-Of-Memory (OOM) crashes on standard workstations.
2. **Chunked / Strided Window Slicing:** The engine determines the exact physical overlap bounding box in UTM Zone 46N coordinates, calculates row/column index offsets, and reads strided slices (`[::8, ::8]` or `[::4, ::4]`).
3. **Optimized Intermediate Caching:** Processed rasters are exported as Cloud-compatible GeoTIFFs and optimized RGBA PNG previews with transparent no-data pixels.
