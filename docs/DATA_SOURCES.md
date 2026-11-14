# SARvatra Lab — Data Sources and Provenance

## 1. Primary Satellite Radar Data: NASA-ISRO NISAR Level-2 GCOV

The platform is powered by two original NISAR HDF5 data granules stored locally on the workstation:

### Observation A (Pre-Flood Reference):
- **Filename:** `NISAR_S2_PR_GCOV_025_112_A_016_3700_DHNA_A_20260715T225741_20260715T225818_P00500_P_F_I_001.h5`
- **File Size:** 12,689,848,203 bytes (~11.82 GB)
- **Verified Acquisition Date:** July 15, 2026
- **Zero Doppler Start:** `2026-07-15T22:57:41.82567238`
- **Zero Doppler End:** `2026-07-15T22:58:18.60396194`
- **Instrument:** SSAR (ISRO S-band SAR)
- **Product Level & Version:** Level-2 GCOV v1.2.1
- **Projection:** EPSG:32646 (WGS 84 / UTM zone 46N)
- **Grid Dimensions:** 33,840 rows × 34,848 columns (10m spacing)
- **Available Polarizations:** HH, HV
- **Covariance Layers:** HHHH, HVHV, HHHV
- **Quality Masks:** `mask`, `inputDataExceptionMask`, `numberOfLooks`

### Observation B (Post-Flood Onset Comparison):
- **Filename:** `NISAR_S2_UR_GCOV_026_040_A_015_3700_DHNA_A_20260722T230527_20260722T230604_P00500_M_F_I_001.h5`
- **File Size:** 12,681,310,315 bytes (~11.81 GB)
- **Verified Acquisition Date:** July 22, 2026
- **Zero Doppler Start:** `2026-07-22T23:05:27.50298034`
- **Zero Doppler End:** `2026-07-22T23:06:04.28126990`
- **Instrument:** SSAR (ISRO S-band SAR)
- **Product Level & Version:** Level-2 GCOV v1.2.1
- **Projection:** EPSG:32646 (WGS 84 / UTM zone 46N)
- **Grid Dimensions:** 33,408 rows × 34,560 columns (10m spacing)

### Verification of Observation Dates:
In preliminary project descriptions, the user informally referenced June dates. SARvatra Lab's HDF5 metadata inspection engine extracted the true telemetric timestamps from the HDF5 identification groups, proving that the satellite passes occurred on **July 15, 2026** and **July 22, 2026**.

---

## 2. Geographic Study Area: Sivasagar, Assam, India

- **Location:** South bank of the Brahmaputra River, Upper Assam.
- **Administrative Boundary:** Official OpenStreetMap administrative district polygon (1,630 vertices, total district area: 1,574.26 km²).
- **Two-Scene Overlap:** 23,801.71 km² covering the Upper Brahmaputra river valley, including 85.95 km² of the northern Sivasagar riparian corridor (Desangmukh dykes and Dikhow River confluence).

---

## 3. Basemaps and Vector Attribution
- **CartoDB Dark Basemap:** © CARTO, © OpenStreetMap contributors (ODbL).
- **Esri World Imagery:** © Esri, Maxar, Earthstar Geographics.
- **District Boundary:** © OpenStreetMap contributors under ODbL license.
