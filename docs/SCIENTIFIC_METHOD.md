# SARvatra Lab — Scientific Methodology

## 1. Remote Sensing Physics & The Synthetic Aperture Radar (SAR) Advantage

Synthetic Aperture Radar (SAR) is an active coherent microwave imaging sensor. Unlike optical sensors (e.g. Landsat, Sentinel-2), SAR provides two vital advantages for flood monitoring in subtropical monsoon environments like Assam:
1. **Day-and-Night Observation:** Emits its own microwave pulse rather than relying on reflected sunlight.
2. **Cloud, Rain, and Smoke Penetration:** Wavelengths in the S-band (~9.3 cm) and L-band (~24 cm) pass unimpeded through dense precipitation, clouds, and haze.

### Radar Backscatter Mechanics
Radar backscatter ($\sigma^\circ$) measures the normalized radar cross-section per unit ground area. It depends on:
- **Surface Roughness:** When roughness is smaller than the radar wavelength (Rayleigh criterion), specular reflection dominates.
- **Dielectric Constant ($\epsilon_r$):** Dry soil has $\epsilon_r \approx 4 - 8$, whereas liquid water has $\epsilon_r \approx 80$.
- **Geometric Structure:** 90° dihedral structures (e.g., perpendicular plant stems standing in water) cause double-bounce retroreflections.

---

## 2. NISAR Level-2 GCOV (Geocoded Covariance) Processing

SARvatra Lab ingests raw NASA-ISRO NISAR Level-2 GCOV products. These contain the polarimetric covariance matrix elements geocoded onto a map projection.

### Conversion from Linear Power to Decibels (dB)
NISAR GCOV raster arrays represent radiometric terrain-corrected linear gamma-zero power ($\gamma^\circ$). The pipeline converts linear power to decibels using:

$$\sigma^\circ_{\text{dB}} = 10 \times \log_{10}(\text{Linear Power})$$

Values are clipped to standard physical limits ($-35.0\text{ dB}$ to $+5.0\text{ dB}$) and quality masks are enforced (`mask == 1` indicating valid focused samples).

### Adaptive Lee Speckle Filtering
Coherent radar waves suffer from multiplicative granular speckle noise. SARvatra Lab applies a $5 \times 5$ Adaptive Lee Speckle Filter:

$$W = \frac{\text{Var}(I)}{\text{Var}(I) + \sigma^2_{\text{overall}}}$$
$$\hat{I} = \bar{I} + W \times (I - \bar{I})$$

This preserves sharp boundaries along riverbanks, embankments, and roads while smoothing homogeneous water bodies.

---

## 3. Geospatial Grid Alignment

Comparing multi-temporal satellite images requires that pixel $(r, c)$ in Observation A corresponds to the exact same physical coordinates as $(r', c')$ in Observation B.

Our inspection proved that both NISAR files share:
- **Coordinate Reference System:** WGS 84 / UTM Zone 46N (`EPSG:32646`)
- **Pixel Spacing:** $dx = 10.0\text{ m}$, $dy = -10.0\text{ m}$
- **Sub-pixel Residual:** $0.0\text{ m}$ offset modulo 10 m.

Windowed slices are calculated directly from physical bounding box intersections without lossy spatial resampling.

---

## 4. Multi-Temporal Log-Ratio & Change Detection

For pre-event backscatter $\sigma^\circ_{\text{pre}}$ and post-event backscatter $\sigma^\circ_{\text{post}}$, the logarithmic difference is:

$$\Delta\sigma^\circ = \sigma^\circ_{\text{post}} - \sigma^\circ_{\text{pre}}$$

### Transparent Classification Categories:
1. **Potential Water-Related Change (Specular Drop):**
   - Condition: $\Delta\sigma^\circ < -3.5\text{ dB}$ AND $\sigma^\circ_{\text{post}} < -16.0\text{ dB}$
   - Scientific Label: *Potential flood-related change — requires ground verification.*
2. **Flooded Vegetation (Double-Bounce Surge):**
   - Condition: $\Delta\sigma^\circ > +3.0\text{ dB}$
   - Scientific Label: *Increased Backscatter (Potential Submerged Canopy Double-Bounce).*
3. **Decreased Backscatter (Elevated Soil Moisture):**
   - Condition: $-3.5\text{ dB} \le \Delta\sigma^\circ < -1.5\text{ dB}$
4. **Ambiguous Surface Variation:**
   - Condition: $-1.5\text{ dB} \le \Delta\sigma^\circ < +1.0\text{ dB}$
5. **Stable / Unchanged:**
   - Condition: $+1.0\text{ dB} \le \Delta\sigma^\circ \le +3.0\text{ dB}$
