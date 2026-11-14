import os
import csv
import json
from io import StringIO
from typing import Dict, Any, Optional
from backend.app.config import REPORTS_DIR, PROCESSED_DIR

def generate_csv_metrics(analysis_data: Dict[str, Any]) -> str:
    output = StringIO()
    writer = csv.writer(output)
    
    writer.writerow(["SARvatra Lab — NASA Space Apps Challenge (Dancing with SAR)"])
    writer.writerow(["Analysis ID", analysis_data.get("analysis_id", "N/A")])
    writer.writerow(["Created At", analysis_data.get("created_at", "N/A")])
    writer.writerow([])
    
    writer.writerow(["--- SATELLITE OBSERVATION METADATA ---"])
    meta = analysis_data.get("metadata", {})
    for k, v in meta.items():
        writer.writerow([k, str(v)])
    writer.writerow([])
    
    writer.writerow(["--- PROCESSING PARAMETERS ---"])
    params = analysis_data.get("parameters", {})
    for k, v in params.items():
        writer.writerow([k, str(v)])
    writer.writerow([])
    
    writer.writerow(["--- CLASSIFICATION & AREA STATISTICS ---"])
    stats = analysis_data.get("statistics", {})
    writer.writerow(["Total Pixels Analyzed", stats.get("total_pixels_analyzed")])
    writer.writerow(["Valid Samples Count", stats.get("valid_samples_count")])
    writer.writerow(["Valid Data Coverage (sq km)", stats.get("valid_data_coverage_sq_km")])
    writer.writerow(["Valid Data Percentage", f"{stats.get('valid_data_percentage')}%"])
    writer.writerow(["Mean Pre-event Backscatter (dB)", stats.get("mean_pre_backscatter_db")])
    writer.writerow(["Mean Post-event Backscatter (dB)", stats.get("mean_post_backscatter_db")])
    writer.writerow(["Mean Delta Backscatter (dB)", stats.get("mean_delta_backscatter_db")])
    writer.writerow([])
    
    writer.writerow(["Class Name", "Pixel Count", "Area (sq km)", "Area (ha)", "Percentage", "Scientific Description"])
    classes = stats.get("classes", {})
    for cname, cdata in classes.items():
        writer.writerow([
            cname,
            cdata.get("pixel_count", 0),
            cdata.get("area_sq_km", 0.0),
            cdata.get("area_hectares", 0.0),
            f"{cdata.get('percentage_of_valid', 0.0)}%",
            cdata.get("scientific_label", "")
        ])
    writer.writerow([])
    
    writer.writerow(["--- LOCAL IMPACT TELEMETRY ---"])
    impact = analysis_data.get("impact_telemetry", {})
    writer.writerow(["Potential Inundated Area (sq km)", impact.get("potential_inundated_sq_km")])
    writer.writerow(["Potential Inundated Area (ha)", impact.get("potential_inundated_hectares")])
    writer.writerow(["Estimated Paddy Exposure (ha)", impact.get("estimated_paddy_exposure_hectares")])
    writer.writerow(["Agricultural Note", impact.get("agricultural_methodology_note")])
    writer.writerow([])
    
    writer.writerow(["--- SCIENTIFIC DISCLAIMER ---"])
    writer.writerow([analysis_data.get("scientific_disclaimer", "")])
    
    return output.getvalue()

def load_analysis_report(analysis_id: str) -> Optional[Dict[str, Any]]:
    report_file = REPORTS_DIR / f"{analysis_id}_report.json"
    if os.path.exists(report_file):
        with open(report_file, 'r') as f:
            return json.load(f)
    return None
