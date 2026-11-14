import os
import glob
from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import JSONResponse, PlainTextResponse, FileResponse

from backend.app.config import (
    ACTIVE_DATA_DIR,
    PROCESSED_DIR,
    PREVIEWS_DIR,
    REPORTS_DIR,
    SIVASAGAR_GEOJSON,
    CANDIDATE_DATA_DIRS
)
from backend.app.schemas.models import (
    DataCatalogResponse,
    GeospatialValidationRequest,
    GeospatialValidationResponse,
    ProcessingRequest,
    ProcessingResult,
    UpdateDirectoryRequest
)
from backend.app.services.data_discovery import scan_data_directory, inspect_hdf5_metadata
from backend.app.services.geospatial import (
    validate_observation_pair,
    get_sivasagar_district_geojson
)
from backend.app.services.nisar_processor import run_nisar_pair_processing
from backend.app.services.export_service import generate_csv_metrics, load_analysis_report

router = APIRouter()

current_data_dir = ACTIVE_DATA_DIR

# Cache for latest processed result so frontend loads immediately
LATEST_ANALYSIS: Optional[ProcessingResult] = None

@router.get("/health")
def get_health():
    return {
        "status": "healthy",
        "service": "SARvatra Lab Earth Observation Engine",
        "version": "1.0.0",
        "mission": "NASA-ISRO NISAR",
        "active_data_dir": current_data_dir,
        "data_dir_exists": os.path.exists(current_data_dir)
    }

@router.get("/system/config")
def get_system_config():
    return {
        "active_data_dir": current_data_dir,
        "candidate_directories": CANDIDATE_DATA_DIRS,
        "data_dir_exists": os.path.exists(current_data_dir),
        "target_study_area": "Sivasagar District & Brahmaputra Basin, Assam, India",
        "nisar_instrument": "SSAR (S-band Synthetic Aperture Radar)",
        "mission_challenge": "NASA Space Apps Challenge 2026 — Dancing with SAR"
    }

@router.post("/system/config")
def update_system_config(req: UpdateDirectoryRequest):
    global current_data_dir
    if not os.path.exists(req.new_directory):
        raise HTTPException(status_code=400, detail=f"Directory '{req.new_directory}' does not exist on this machine.")
    current_data_dir = req.new_directory
    return {
        "status": "updated",
        "active_data_dir": current_data_dir
    }

@router.get("/data/catalog", response_model=DataCatalogResponse)
def get_catalog():
    return scan_data_directory(current_data_dir)

@router.get("/data/metadata/{file_id}")
def get_file_metadata(file_id: str):
    catalog = scan_data_directory(current_data_dir)
    for item in catalog.files:
        if item.file_id == file_id:
            return item
    raise HTTPException(status_code=404, detail=f"HDF5 file with id '{file_id}' not found in catalog.")

@router.get("/aoi/sivasagar")
def get_sivasagar_aoi():
    geom = get_sivasagar_district_geojson()
    if not geom:
        raise HTTPException(status_code=404, detail="Sivasagar boundary geojson not found.")
    return geom

@router.post("/analysis/validate-pair", response_model=GeospatialValidationResponse)
def validate_pair(req: GeospatialValidationRequest):
    catalog = scan_data_directory(current_data_dir)
    file_map = {item.file_id: item.file_path for item in catalog.files}
    
    if req.pre_file_id not in file_map:
        raise HTTPException(status_code=404, detail=f"Pre-flood file '{req.pre_file_id}' not found.")
    if req.post_file_id not in file_map:
        raise HTTPException(status_code=404, detail=f"Post-flood file '{req.post_file_id}' not found.")
        
    try:
        return validate_observation_pair(file_map[req.pre_file_id], file_map[req.post_file_id])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Geospatial validation error: {str(e)}")

@router.post("/analysis/run", response_model=ProcessingResult)
def run_analysis(req: ProcessingRequest):
    global LATEST_ANALYSIS
    catalog = scan_data_directory(current_data_dir)
    file_map = {item.file_id: item.file_path for item in catalog.files}
    
    if req.pre_file_id not in file_map:
        raise HTTPException(status_code=404, detail=f"Pre-flood file '{req.pre_file_id}' not found.")
    if req.post_file_id not in file_map:
        raise HTTPException(status_code=404, detail=f"Post-flood file '{req.post_file_id}' not found.")
        
    try:
        result = run_nisar_pair_processing(req, file_map[req.pre_file_id], file_map[req.post_file_id])
        LATEST_ANALYSIS = result
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Radar processing pipeline error: {str(e)}")

@router.get("/analysis/latest")
def get_latest_analysis():
    global LATEST_ANALYSIS
    if LATEST_ANALYSIS:
        return LATEST_ANALYSIS
    # Try loading most recent report from disk
    reports = sorted(glob.glob(str(REPORTS_DIR / "*_report.json")), reverse=True)
    if reports:
        import json
        with open(reports[0], 'r') as f:
            data = json.load(f)
            return data
    return {"status": "NO_ANALYSIS_PERFORMED", "message": "No analysis performed yet."}

@router.get("/analysis/{analysis_id}")
def get_analysis_by_id(analysis_id: str):
    data = load_analysis_report(analysis_id)
    if not data:
        raise HTTPException(status_code=404, detail=f"Analysis '{analysis_id}' not found.")
    return data

@router.get("/analysis/{analysis_id}/summary")
def get_analysis_summary(analysis_id: str):
    data = load_analysis_report(analysis_id)
    if not data:
        raise HTTPException(status_code=404, detail=f"Analysis '{analysis_id}' not found.")
    return {
        "analysis_id": data.get("analysis_id"),
        "status": data.get("status"),
        "created_at": data.get("created_at"),
        "metadata": data.get("metadata"),
        "statistics": data.get("statistics"),
        "impact_telemetry": data.get("impact_telemetry"),
        "quality_confidence": data.get("quality_confidence")
    }

@router.get("/analysis/{analysis_id}/layers")
def get_analysis_layers(analysis_id: str):
    data = load_analysis_report(analysis_id)
    if not data:
        raise HTTPException(status_code=404, detail=f"Analysis '{analysis_id}' not found.")
    return data.get("layers", {})

@router.get("/analysis/{analysis_id}/report")
def get_analysis_report(analysis_id: str):
    data = load_analysis_report(analysis_id)
    if not data:
        raise HTTPException(status_code=404, detail=f"Analysis '{analysis_id}' not found.")
    return data

@router.get("/analysis/{analysis_id}/export/{format_type}")
def export_analysis(analysis_id: str, format_type: str):
    data = load_analysis_report(analysis_id)
    if not data:
        raise HTTPException(status_code=404, detail=f"Analysis '{analysis_id}' not found.")
    
    if format_type.lower() == "csv":
        csv_content = generate_csv_metrics(data)
        return Response(
            content=csv_content,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=SARvatra_{analysis_id}_metrics.csv"}
        )
    elif format_type.lower() == "json":
        import json
        return Response(
            content=json.dumps(data, indent=2),
            media_type="application/json",
            headers={"Content-Disposition": f"attachment; filename=SARvatra_{analysis_id}_report.json"}
        )
    elif format_type.lower() == "geotiff":
        tif_path = PROCESSED_DIR / f"{analysis_id}_delta_backscatter.tif"
        if os.path.exists(tif_path):
            return FileResponse(
                path=str(tif_path),
                media_type="image/tiff",
                filename=f"SARvatra_{analysis_id}_delta_backscatter.tif"
            )
        raise HTTPException(status_code=404, detail="GeoTIFF file not found.")
    else:
        raise HTTPException(status_code=400, detail="Unsupported format. Choose 'csv', 'json', or 'geotiff'.")
