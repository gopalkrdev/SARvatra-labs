import os
import unittest
from backend.app.services.data_discovery import scan_data_directory
from backend.app.services.geospatial import validate_observation_pair
from backend.app.config import ACTIVE_DATA_DIR

class TestSARvatraPipeline(unittest.TestCase):
    def test_catalog_discovery(self):
        catalog = scan_data_directory(ACTIVE_DATA_DIR)
        self.assertGreaterEqual(catalog.total_files, 2)
        dates = [f.observation_date for f in catalog.files if f.is_readable]
        self.assertIn("2026-07-15", dates)
        self.assertIn("2026-07-22", dates)
        print("Test Catalog Discovery Passed: Found", catalog.total_files, "files.")

    def test_geospatial_validation(self):
        catalog = scan_data_directory(ACTIVE_DATA_DIR)
        pre_file = [f.file_path for f in catalog.files if "20260715" in f.filename][0]
        post_file = [f.file_path for f in catalog.files if "20260722" in f.filename][0]
        
        val_res = validate_observation_pair(pre_file, post_file)
        self.assertTrue(val_res.is_valid)
        self.assertGreater(val_res.intersection_area_sq_km, 20000.0)
        self.assertGreater(val_res.sivasagar_coverage_sq_km, 80.0)
        self.assertEqual(val_res.dx_meters, 10.0)
        print("Test Geospatial Validation Passed: Overlap area =", val_res.intersection_area_sq_km, "sq km")

if __name__ == '__main__':
    unittest.main()
