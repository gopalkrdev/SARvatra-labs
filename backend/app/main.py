from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from backend.app.config import WORKSPACE_DIR, PROCESSED_DIR, PREVIEWS_DIR
from backend.app.api.routes import router as api_router

app = FastAPI(
    title="SARvatra Lab — Earth Observation Engine",
    description="Scientific radar data processing pipeline and flood-related surface change analysis for the NASA Space Apps Challenge (Dancing with SAR).",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for local frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount workspace directories for map preview rasters and downloads
app.mount("/workspace/previews", StaticFiles(directory=str(PREVIEWS_DIR)), name="previews")
app.mount("/workspace/processed", StaticFiles(directory=str(PROCESSED_DIR)), name="processed")

# Include API Router
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "lab": "SARvatra Lab",
        "tagline": "See What Water Changes. Understand What Earth Reveals.",
        "project": "NISAR-Based Flood-Related Surface Change Detection",
        "challenge": "NASA Space Apps Challenge — Dancing with SAR",
        "study_area": "Sivasagar District & Brahmaputra Basin, Assam, India",
        "api_docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
