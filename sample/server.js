const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 4000;
const HOST = 'localhost';

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Resolve to file path, allowing access to parent directory for dist files
    let filePath;
    if (pathname.startsWith('/../')) {
        // Handle ../dist/ paths by resolving from parent directory
        filePath = path.join(__dirname, '..', pathname.substring(3));
    } else if (pathname.startsWith('/dist/')) {
        // Handle /dist/ paths by resolving from parent directory
        filePath = path.join(__dirname, '..', pathname.substring(1));
    } else {
        // Handle local files
        filePath = path.join(__dirname, pathname);
    }

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        // Get file extension and MIME type
        const ext = path.extname(filePath);
        const mimeType = MIME_TYPES[ext] || 'text/plain';

        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
                return;
            }

            res.writeHead(200, {
                'Content-Type': mimeType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(data);
        });
    });
});

server.listen(PORT, HOST, () => {
    console.log(`🚀 KLineChart Pro Sample Server running at http://${HOST}:${PORT}`);
    console.log(`📊 Open your browser and navigate to http://${HOST}:${PORT}`);
    console.log(`🔧 Press Ctrl+C to stop the server`);
});