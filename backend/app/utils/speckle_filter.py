import numpy as np
from scipy.ndimage import uniform_filter

def apply_adaptive_lee_filter(image: np.ndarray, size: int = 5) -> np.ndarray:
    """
    Adaptive Lee Speckle Filter for Synthetic Aperture Radar (SAR) imagery.
    Removes multiplicative granular speckle noise while preserving sharp boundaries
    between water bodies, river dykes, and vegetation.
    
    Formula:
        W = var / (var + overall_var)
        Filtered = mean + W * (pixel - mean)
    """
    # Create mask of valid finite numbers
    valid_mask = np.isfinite(image)
    if not np.any(valid_mask):
        return image
    
    # Fill invalid pixels temporarily with median to avoid filter edge explosion
    safe_img = np.copy(image)
    fill_val = np.nanmedian(safe_img) if np.isnan(fill_val := np.nanmean(safe_img)) is False else -20.0
    safe_img[~valid_mask] = fill_val

    mean = uniform_filter(safe_img, (size, size))
    mean_sqr = uniform_filter(safe_img ** 2, (size, size))
    variance = np.maximum(mean_sqr - mean ** 2, 0)
    
    overall_variance = np.var(safe_img[valid_mask]) if np.any(valid_mask) else 1.0
    weights = variance / (variance + overall_variance + 1e-10)
    
    filtered = mean + weights * (safe_img - mean)
    # Restore original invalid pixel mask
    filtered[~valid_mask] = np.nan
    return filtered.astype(np.float32)
