const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');

const PORT = 8768;
const DOCS_DIR = path.resolve('d:/SARvatra_-labs/docs');
const PUBLIC_DIR = path.resolve('d:/SARvatra_-labs/frontend/public');
const ROOT_DIR = path.resolve('d:/SARvatra_-labs');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'edge_pdf_profile_' + Date.now());

const FILES_TO_CONVERT = [
  { html: 'SARvatra_Pitch_Deck.html', pdf: 'SARvatra_Pitch_Deck.pdf', copyToRoot: true },
  { html: 'SARvatra_Technical_Dossier.html', pdf: 'SARvatra_Technical_Dossier.pdf', copyToRoot: false },
  { html: 'Sivasagar_Disaster_SitRep.html', pdf: 'Sivasagar_Disaster_SitRep.pdf', copyToRoot: false },
  { html: 'SARvatra_Operating_Manual.html', pdf: 'SARvatra_Operating_Manual.pdf', copyToRoot: false }
];

const server = http.createServer((req, res) => {
  const filePath = path.join(DOCS_DIR, decodeURI(req.url.replace(/^\//, '')));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.html' ? 'text/html' : ext === '.png' ? 'image/png' : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function runEdge(cmdArgs) {
  return new Promise((resolve) => {
    execFile(EDGE_PATH, cmdArgs, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        console.warn('Edge warning:', error.message);
      }
      resolve();
    });
  });
}

async function main() {
  if (!fs.existsSync(EDGE_PATH)) {
    console.error(`Edge executable not found at: ${EDGE_PATH}`);
    process.exit(1);
  }

  await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`Local doc server started at http://127.0.0.1:${PORT}`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Also ensure master presentation dossier is in public/
  const masterPdfRoot = path.join(ROOT_DIR, 'SARvatra_Lab_Master_Presentation_Dossier.pdf');
  const masterPdfPublic = path.join(PUBLIC_DIR, 'SARvatra_Lab_Master_Presentation_Dossier.pdf');
  if (fs.existsSync(masterPdfRoot) && !fs.existsSync(masterPdfPublic)) {
    fs.copyFileSync(masterPdfRoot, masterPdfPublic);
    console.log(`Copied existing master dossier to frontend/public/`);
  }

  for (const item of FILES_TO_CONVERT) {
    const htmlPath = path.join(DOCS_DIR, item.html);
    if (!fs.existsSync(htmlPath)) {
      console.log(`Skipping missing HTML: ${item.html}`);
      continue;
    }

    const targetPdfDocs = path.join(DOCS_DIR, item.pdf);
    const targetPdfRoot = path.join(ROOT_DIR, item.pdf);
    const targetPdfPublic = path.join(PUBLIC_DIR, item.pdf);

    const url = `http://127.0.0.1:${PORT}/${item.html}`;
    console.log(`Converting ${item.html} -> ${item.pdf}...`);

    await runEdge([
      '--headless',
      '--disable-gpu',
      `--user-data-dir=${TEMP_USER_DATA}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--no-pdf-header-footer',
      `--print-to-pdf=${targetPdfDocs}`,
      url
    ]);

    if (fs.existsSync(targetPdfDocs)) {
      const stats = fs.statSync(targetPdfDocs);
      console.log(`SUCCESS: Created ${item.pdf} (${(stats.size / 1024).toFixed(1)} KB)`);
      if (item.copyToRoot) {
        fs.copyFileSync(targetPdfDocs, targetPdfRoot);
        console.log(`  Copied to root`);
      }
      fs.copyFileSync(targetPdfDocs, targetPdfPublic);
      console.log(`  Copied to public/`);
    } else {
      console.error(`ERROR: Failed to generate ${item.pdf}`);
    }
  }

  server.close();
  try {
    fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true });
  } catch (e) {}

  console.log('Finished all conversions successfully.');
}

main().catch(err => {
  console.error(err);
  server.close();
  process.exit(1);
});
