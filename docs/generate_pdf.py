import subprocess
import os
import sys
import time
import shutil
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8765
DOCS_DIR = r"d:\SARvatra_-labs\docs"
PUBLIC_DIR = r"d:\SARvatra_-labs\frontend\public"
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

FILES_TO_CONVERT = [
    ("SARvatra_Lab_Master_Presentation_Dossier.html", "SARvatra_Lab_Master_Presentation_Dossier.pdf"),
    ("Sivasagar_Disaster_SitRep_Official.html", "Sivasagar_Disaster_SitRep_Official.pdf"),
    ("SARvatra_Portal_Standard_Operating_Procedure.html", "SARvatra_Portal_Standard_Operating_Procedure.pdf")
]

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DOCS_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def run_server(httpd):
    httpd.serve_forever()

def main():
    if not os.path.exists(EDGE_PATH):
        print(f"Error: Edge not found at {EDGE_PATH}")
        return 1

    httpd = HTTPServer(("127.0.0.1", PORT), QuietHandler)
    server_thread = threading.Thread(target=run_server, args=(httpd,), daemon=True)
    server_thread.start()
    print(f"Local server started on http://127.0.0.1:{PORT}")
    time.sleep(1)

    os.makedirs(PUBLIC_DIR, exist_ok=True)

    try:
        for html_name, pdf_name in FILES_TO_CONVERT:
            html_file = os.path.join(DOCS_DIR, html_name)
            if not os.path.exists(html_file):
                print(f"Warning: {html_file} does not exist, skipping.")
                continue

            target_pdf_docs = os.path.join(DOCS_DIR, pdf_name)
            target_pdf_root = os.path.join(r"d:\SARvatra_-labs", pdf_name)
            target_pdf_public = os.path.join(PUBLIC_DIR, pdf_name)

            url = f"http://127.0.0.1:{PORT}/{html_name}"
            cmd = [
                EDGE_PATH,
                "--headless",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={target_pdf_docs}",
                url
            ]

            print(f"Rendering {html_name} -> {pdf_name}...")
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            if os.path.exists(target_pdf_docs):
                size_kb = os.path.getsize(target_pdf_docs) / 1024
                print(f"  Generated {target_pdf_docs} ({size_kb:.1f} KB)")
                # Copy to root and public
                shutil.copy2(target_pdf_docs, target_pdf_root)
                shutil.copy2(target_pdf_docs, target_pdf_public)
                print(f"  Copied to public and root: {pdf_name}")
            else:
                print(f"  Failed to generate {pdf_name}")
    finally:
        httpd.shutdown()

    print("\nAll PDF generations and sync to frontend/public complete!")
    return 0

if __name__ == "__main__":
    sys.exit(main())
