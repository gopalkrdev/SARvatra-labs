export interface DataCatalogItem {
  file_id: string;
  filename: string;
  file_path: string;
  file_size_gb: number;
  granule_id?: string;
  observation_date?: string;
  zero_doppler_start?: string;
  zero_doppler_end?: string;
  satellite_mission: string;
  instrument: string;
  product_level: string;
  product_type: string;
  polarizations: string[];
  covariance_terms: string[];
  grid_shape: number[];
  epsg_code: number;
  date_validation_status: string;
  date_discrepancy_note?: string;
  is_readable: boolean;
  error_message?: string;
}

export interface DataCatalogResponse {
  active_directory: string;
  total_files: number;
  files: DataCatalogItem[];
  detected_pairs: Array<{
    pre_file_id: string;
    pre_filename: string;
    pre_date: string;
    post_file_id: string;
    post_filename: string;
    post_date: string;
    pair_label: string;
  }>;
}

export interface GeospatialValidationResponse {
  is_valid: boolean;
  spatial_reference: string;
  pre_observation_date: string;
  post_observation_date: string;
  pre_shape: number[];
  post_shape: number[];
  is_same_grid: boolean;
  grid_alignment_status: string;
  dx_meters: number;
  dy_meters: number;
  intersection_area_sq_km: number;
  scene1_overlap_pct: number;
  scene2_overlap_pct: number;
  sivasagar_total_area_sq_km: number;
  sivasagar_coverage_sq_km: number;
  sivasagar_coverage_pct: number;
  geographic_overlap_geojson: any;
  sivasagar_district_geojson?: any;
  scene1_footprint_geojson: any;
  scene2_footprint_geojson: any;
  warnings: string[];
  scientific_notes: string[];
}

export interface ClassStatistics {
  pixel_count: number;
  area_sq_km: number;
  area_hectares?: number;
  percentage_of_valid: number;
  scientific_label: string;
}

export interface ProcessingResult {
  analysis_id: string;
  created_at: string;
  status: string;
  parameters: {
    polarization: string;
    stride: number;
    effective_pixel_res_meters: number;
    water_threshold_db: number;
    post_water_max_db: number;
    veg_double_bounce_threshold_db: number;
    speckle_filter: string;
    aoi_type: string;
    crs: string;
  };
  metadata: {
    pre_observation_file: string;
    post_observation_file: string;
    pre_observation_date: string;
    post_observation_date: string;
    satellite_mission: string;
    instrument: string;
    product_level: string;
    execution_time_seconds: number;
    raster_dimensions: number[];
    wgs84_bounds: [[number, number], [number, number]];
    utm_bounds: [number, number, number, number];
  };
  statistics: {
    total_pixels_analyzed: number;
    valid_samples_count: number;
    valid_data_coverage_sq_km: number;
    valid_data_percentage: number;
    mean_pre_backscatter_db: number;
    mean_post_backscatter_db: number;
    mean_delta_backscatter_db: number;
    classes: {
      potential_water_related_change: ClassStatistics;
      flooded_vegetation_double_bounce: ClassStatistics;
      decreased_backscatter: ClassStatistics;
      ambiguous_change: ClassStatistics;
      stable_unchanged: ClassStatistics;
    };
  };
  impact_telemetry: {
    potential_inundated_sq_km: number;
    potential_inundated_hectares: number;
    estimated_paddy_exposure_hectares: number;
    agricultural_methodology_note: string;
    hydrology_context: {
      river_basin: string;
      riparian_zone: string;
      water_signature: string;
    };
    community_infrastructure_status: {
      settlements_affected: string;
      road_network_exposure: string;
      scientific_honesty_statement: string;
    };
  };
  layers: {
    pre_radar_png: string;
    post_radar_png: string;
    pre_radar_gray_png?: string;
    post_radar_gray_png?: string;
    focus_pre_gray_png?: string;
    focus_post_gray_png?: string;
    focus_pre_color_png?: string;
    focus_post_color_png?: string;
    focus_water_overlay_png?: string;
    delta_png: string;
    change_map_png: string;
    geotiff_download: string;
  };
  histograms: {
    pre_hist: { bins: number[]; counts: number[]; min: number; max: number; mean: number; std: number };
    post_hist: { bins: number[]; counts: number[]; min: number; max: number; mean: number; std: number };
    delta_hist: { bins: number[]; counts: number[]; min: number; max: number; mean: number; std: number };
  };
  quality_confidence: {
    confidence_score: string;
    observation_overlap_pct: number;
    valid_pixel_pct: number;
    speckle_reduction: string;
    grid_alignment: string;
    radiometric_normalization: string;
    validation_note: string;
  };
  scientific_disclaimer: string;
}
