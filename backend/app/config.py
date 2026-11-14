import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent.parent
WORKSPACE_DIR = BASE_DIR / "workspace"
PROCESSED_DIR = WORKSPACE_DIR / "processed"
PREVIEWS_DIR = WORKSPACE_DIR / "previews"
REPORTS_DIR = WORKSPACE_DIR / "reports"
TEMP_DIR = WORKSPACE_DIR / "temporary"

for d in [PROCESSED_DIR, PREVIEWS_DIR, REPORTS_DIR, TEMP_DIR]:
    d.mkdir(parents=True, exist_ok=True)

SIVASAGAR_GEOJSON = BASE_DIR / "backend" / "app" / "data" / "sivasagar_district.geojson"

# Default potential data directory locations:
CANDIDATE_DATA_DIRS = [
    r"D:\SARvatra_labs\data",
    r"D:\SARvatra\Data\Raw",
    str(BASE_DIR / "data"),
    r"./data"
]

def get_active_data_dir() -> str:
    # 1. Environment variable
    env_dir = os.environ.get("SARVATRA_DATA_DIR")
    if env_dir and os.path.exists(env_dir):
        return env_dir
    # 2. Check candidate directories
    for cdir in CANDIDATE_DATA_DIRS:
        if os.path.exists(cdir):
            return cdir
    return r"D:\SARvatra_labs\data"

ACTIVE_DATA_DIR = get_active_data_dir()
