from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class DataCatalogItem(BaseModel):
    file_id: str
    filename: str
    file_path: str
    file_size_gb: float
    granule_id: Optional[str] = None
    observation_date: Optional[str] = None
    zero_doppler_start: Optional[str] = None
    zero_doppler_end: Optional[str] = None
    satellite_mission: str = "NISAR"
    instrument: str = "SSAR"
    product_level: str = "L2"
    product_type: str = "GCOV"
    polarizations: List[str] = []
    covariance_terms: List[str] = []
    grid_shape: List[int] = []
    epsg_code: int = 32646
    date_validation_status: str = "Verified"
    date_discrepancy_note: Optional[str] = None
    is_readable: bool = True
    error_message: Optional[str] = None

class DataCatalogResponse(BaseModel):
    active_directory: str
    total_files: int
    files: List[DataCatalogItem]
    detected_pairs: List[Dict[str, str]]

class GeospatialValidationRequest(BaseModel):
    pre_file_id: str
    post_file_id: str
    target_aoi: Optional[str] = "sivasagar_floodplain"

class GeospatialValidationResponse(BaseModel):
    is_valid: bool
    spatial_reference: str
    pre_observation_date: str
    post_observation_date: str
    pre_shape: List[int]
    post_shape: List[int]
    is_same_grid: bool
    grid_alignment_status: str
    dx_meters: float
    dy_meters: float
    intersection_area_sq_km: float
    scene1_overlap_pct: float
    scene2_overlap_pct: float
    sivasagar_total_area_sq_km: float
    sivasagar_coverage_sq_km: float
    sivasagar_coverage_pct: float
    geographic_overlap_geojson: Dict[str, Any]
    sivasagar_district_geojson: Optional[Dict[str, Any]] = None
    scene1_footprint_geojson: Dict[str, Any]
    scene2_footprint_geojson: Dict[str, Any]
    warnings: List[str] = []
    scientific_notes: List[str] = []

class ProcessingRequest(BaseModel):
    pre_file_id: str
    post_file_id: str
    polarization: str = "HHHH"  # HHHH or HVHV
    water_threshold_db: float = Field(default=-3.5, description="Backscatter drop threshold for potential water")
    post_water_max_db: float = Field(default=-16.0, description="Max absolute post backscatter for open water")
    veg_double_bounce_threshold_db: float = Field(default=3.0, description="Backscatter increase threshold for flooded vegetation")
    speckle_filter: str = "adaptive_lee_5x5"
    stride: int = Field(default=8, description="Sampling stride (8 = 80m effective grid, 4 = 40m)")
    aoi_type: str = "overlap"  # 'overlap', 'sivasagar_riparian', or 'custom'
    custom_bbox: Optional[List[float]] = None  # [min_lon, min_lat, max_lon, max_lat]

class ProcessingResult(BaseModel):
    analysis_id: str
    created_at: str
    status: str
    parameters: Dict[str, Any]
    metadata: Dict[str, Any]
    statistics: Dict[str, Any]
    impact_telemetry: Dict[str, Any]
    layers: Dict[str, str]
    histograms: Dict[str, Any]
    quality_confidence: Dict[str, Any]
    scientific_disclaimer: str

class HistogramData(BaseModel):
    pre_hist: Dict[str, Any]
    post_hist: Dict[str, Any]
    delta_hist: Dict[str, Any]
    class_distribution: Dict[str, Any]

class UpdateDirectoryRequest(BaseModel):
    new_directory: str
