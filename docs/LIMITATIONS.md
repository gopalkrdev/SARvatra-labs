# SARvatra Lab — Scientific & Operational Limitations

In accordance with scientific integrity guidelines for the NASA Space Apps Challenge, this document discloses known limitations and considerations:

## 1. Ground Verification Requirement
Satellite radar measures physical surface roughness and dielectric permittivity. A decrease in backscatter indicates smooth surface scattering (specular reflection), which is strongly correlated with open water. However:
- Smooth airport tarmacs, bare dry mudflats, and calm reservoirs also produce low backscatter.
- Wind-induced surface waves on open water can increase backscatter, causing potential false negatives.
- Therefore, all outputs are designated as **"Potential flood-related change — requires ground verification."**

## 2. Geographic Overlap Coverage
- **Total Sivasagar District Area:** 1,574.26 km²
- **Scene 1 (Pre-Flood, July 15) Coverage:** 85.95 km² (Northern riparian corridor along Brahmaputra River)
- **Scene 2 (Post-Flood, July 22) Coverage:** 1,574.26 km² (100% of Sivasagar District)
- **Mutual Overlap:** Dual-date change detection is strictly valid across the **85.95 km² northern riparian zone** of Sivasagar and 23,801 km² of the regional Upper Brahmaputra river valley. The southern portion of Sivasagar cannot be compared against July 15 because Scene 1 did not acquire data south of 27.20°N. SARvatra Lab honestly shows this partial footprint rather than inventing southern data.

## 3. Socio-Economic & Population Statistics
- In the absence of an authorized localized cadastral population census and validated road network vector file, SARvatra Lab does not estimate affected people or destroyed structures.
- Claims such as "16 villages submerged" or "NH-715 severed" are marked as requiring field-validated ground truth to avoid unscientific fabrication.

## 4. Agricultural Exposure Estimates
- Paddy exposure estimates are computed using regional agrarian parcel proportions (~65% density). Field-level crop damage assessments require localized high-resolution cadastral boundaries.
