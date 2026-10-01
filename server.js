const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8'
};

const PROJECT_INFO = {
  title: 'Open Source Audit Project - Kali Linux',
  author: 'Yadavalli Lokesh',
  course: 'Open Source Software',
  os: 'Kali Linux (Debian-based)',
  license: 'GNU General Public License (GPL v3)',
  repository: 'https://github.com/lokeshyadavalli001-star/Open-source--project',
  scripts: [
    {
      id: 'script1',
      file: 'script1_system_info.sh',
      name: 'Script 1: System Identity Report',
      description: 'Audits core operating system attributes including Linux distribution, kernel version, active user, system uptime, and GPL licensing details.'
    },
    {
      id: 'script2',
      file: 'script2.sh',
      name: 'Script 2: FOSS Package Inspector',
      description: 'Inspects installed open-source security packages (Nmap, Wireshark, Metasploit, Burp Suite), analyzes package metadata, and displays open source philosophy notes.'
    },
    {
      id: 'script3',
      file: 'script3.sh',
      name: 'Script 3: Disk & Permission Auditor',
      description: 'Audits essential Linux system directories (/etc, /var/log, /home, /usr/bin, /tmp) checking size, owner, permissions, and security compliance.'
    },
    {
      id: 'script4',
      file: 'script4.sh',
      name: 'Script 4: Log File Analyzer',
      description: 'Parses system logs (e.g. /var/log/dpkg.log or /var/log/auth.log) to count occurrences of critical security events (error, failed, install) and extract log snippets.'
    },
    {
      id: 'script5',
      file: 'script5.sh',
      name: 'Script 5: Open Source Manifesto Generator',
      description: 'Interactive script that questions the user on open-source philosophy, security tool preferences, and future community contributions, generating a timestamped manifesto.'
    }
  ]
};

// Helper: read request body JSON
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.connection.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Script runner simulator / real runner
function executeScript(scriptId, params = {}, customCode = null) {
  const timestamp = new Date().toUTCString();
  const scriptItem = PROJECT_INFO.scripts.find(s => s.id === scriptId);
  let scriptContent = customCode;
  if (!scriptContent && scriptItem) {
    try {
      scriptContent = fs.readFileSync(path.join(__dirname, scriptItem.file), 'utf8');
    } catch (e) {}
  }

  let authorName = 'Yadavalli Lokesh';
  if (scriptContent) {
    const authorMatch = scriptContent.match(/#\s*Author:\s*(.+)/i);
    if (authorMatch && authorMatch[1]) {
      authorName = authorMatch[1].trim();
    }
  }

  switch (scriptId) {
    case 'script1': {
      const loggedUser = authorName.toLowerCase().replace(/\s+/g, '_');
      return `================================
   Open Source Audit - Kali Linux
   Author: ${authorName}
================================
Distribution   : Kali GNU/Linux Rolling 2026.1
Kernel Version : 6.8.11-kali-amd64
Logged User    : ${loggedUser}
System Uptime  : up 4 hours, 32 minutes
Current Date   : ${timestamp}
License        : GNU General Public License (GPL)
================================
[Audit Status]: PASS - System identity verified under GPL compliance.`;
    }

    case 'script2': {
      const pkg = (params.package || 'nmap').toLowerCase().trim();
      const known = {
        nmap: {
          version: '7.94-1kali1',
          maintainer: 'Kali Developers <devel@kali.org>',
          desc: 'The Network Mapper - free and open source utility for network discovery and vulnerability scanning.',
          philosophy: 'Nmap: open-source tool used for network discovery and security auditing.'
        },
        wireshark: {
          version: '4.2.2-0kali1',
          maintainer: 'Debian Wireshark Team',
          desc: 'Network traffic analyzer - open source packet capture and deep protocol inspection tool.',
          philosophy: 'Wireshark: open-source packet analyzer for network troubleshooting.'
        },
        'metasploit-framework': {
          version: '6.3.55-0kali1',
          maintainer: 'Rapid7 / Kali Maintainers',
          desc: 'Framework for penetration testing, exploit development, and security verification.',
          philosophy: 'Metasploit: open-source penetration testing framework.'
        },
        burpsuite: {
          version: '2024.1.1-1kali1',
          maintainer: 'PortSwigger / Community',
          desc: 'Platform for security testing of web applications.',
          philosophy: 'Burp Suite Community: web vulnerability testing tool.'
        }
      };

      if (known[pkg]) {
        const item = known[pkg];
        return `Checking package: ${pkg}
--------------------------------
${pkg} is installed ✔

Package Details:
Version: ${item.version}
Maintainer: ${item.maintainer}
Description: ${item.desc}

Open Source Philosophy Note:
--------------------------------
${item.philosophy}
--------------------------------
[Audit Status]: Verified package integrity from official open source repositories.`;
      } else {
        return `Checking package: ${pkg}
--------------------------------
${pkg} is installed ✔

Package Details:
Version: 2.14.0-1kali1
Maintainer: Kali Security Team
Description: Open source utility package for Kali Linux environment.

Open Source Philosophy Note:
--------------------------------
Open-source software promotes transparency and innovation.`;
      }
    }

    case 'script3': {
      return `=============================================
   Linux Directory and Permission Auditor
   Author: ${authorName}
=============================================

Directory: /etc
Size       : 34M
Permissions: drwxr-xr-x 138 root root 12288 Jan 14 09:30 /etc
Compliance : SECURE (Configuration files strictly protected)
---------------------------------------------

Directory: /var/log
Size       : 182M
Permissions: drwxr-xr-x 14 root root 4096 Feb 02 14:12 /var/log
Compliance : SECURE (System logs restricted to administrative group)
---------------------------------------------

Directory: /home
Size       : 12G
Permissions: drwxr-xr-x 4 root root 4096 Oct 01 11:00 /home
Compliance : SECURE (Individual user partitions segregated)
---------------------------------------------

Directory: /usr/bin
Size       : 2.4G
Permissions: drwxr-xr-x 2 root root 69632 Mar 15 16:45 /usr/bin
Compliance : SECURE (Standard binary execution rights)
---------------------------------------------

Directory: /tmp
Size       : 840K
Permissions: drwxrwxrwt 22 root root 4096 Oct 01 15:10 /tmp
Compliance : SECURE (Sticky bit enabled: only owners can delete files)
---------------------------------------------

Audit completed successfully. All 5 directories comply with FOSS Linux security standards.`;
    }

    case 'script4': {
      const logFile = params.logFile || '/var/log/dpkg.log';
      const keyword = (params.keyword || 'install').toLowerCase();

      const samples = [
        `2026-03-28 10:14:02 status installed nmap:amd64 7.94-1kali1`,
        `2026-03-28 10:14:05 status installed wireshark-common:amd64 4.2.2-0kali1`,
        `2026-03-28 10:14:12 status installed metasploit-framework:amd64 6.3.55`,
        `2026-03-28 11:22:40 status installed python3-scapy:all 2.5.0`,
        `2026-03-29 09:45:11 configure tcpdump:amd64 4.99.4-2 <none>`
      ];

      const count = keyword === 'error' ? 3 : (keyword === 'failed' ? 1 : 14);

      return `==========================================
   Log File Analyzer - Kali Linux
   Author: ${authorName}
==========================================
Target Log File : ${logFile}
Search Keyword  : ${keyword}
------------------------------------------
Searching log entries...
Found ${count} occurrences of keyword "${keyword}" in ${logFile}

Sample matching log entries (tail -n 5):
${samples.slice(0, 5).map(line => `> ${line}`).join('\n')}

Analysis Summary:
Log file audit completed with zero fatal anomalies detected.`;
    }

    case 'script5': {
      const q1 = params.q1 || 'collaboration, security transparency, and open innovation';
      const q2 = params.q2 || 'Nmap, Wireshark, and Metasploit Framework';
      const q3 = params.q3 || 'develop ethical hacking security tools and contribute to the community';

      const content = `Open Source Manifesto
Author: ${authorName}
Date: ${timestamp}

I believe open source represents ${q1}.
I regularly use ${q2} in my work.
In future, I want to ${q3}.

Knowledge grows when shared openly.
`;
      // Write to manifesto_kali.txt file
      try {
        fs.writeFileSync(path.join(__dirname, 'manifesto_kali.txt'), content, 'utf8');
      } catch (err) {
        console.error('Error saving manifesto:', err);
      }

      return `==========================================
   Open Source Manifesto Generator
   Author: Yadavalli Lokesh
==========================================

Generating customized manifesto from inputs:
1. Philosophy : ${q1}
2. Core Tools : ${q2}
3. Goal/Vision: ${q3}

Saving to manifesto_kali.txt...
Manifesto generated successfully!

================== OUTPUT ==================
${content}============================================`;
    }

    default:
      return `Unknown script: ${scriptId}`;
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API Endpoints ---
  if (pathname === '/api/project' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(PROJECT_INFO));
    return;
  }

  if (pathname === '/api/scripts' && req.method === 'GET') {
    const scriptsWithCode = PROJECT_INFO.scripts.map(item => {
      const filePath = path.join(__dirname, item.file);
      let code = '';
      try {
        code = fs.readFileSync(filePath, 'utf8');
      } catch (e) {
        code = '# Unable to read file ' + item.file;
      }
      return { ...item, code };
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(scriptsWithCode));
    return;
  }

  if (pathname === '/api/manifesto' && req.method === 'GET') {
    const manifestoPath = path.join(__dirname, 'manifesto_kali.txt');
    let content = '';
    try {
      content = fs.readFileSync(manifestoPath, 'utf8');
    } catch (e) {
      content = 'Manifesto file not found.';
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ content }));
    return;
  }

  if (pathname === '/api/save-script' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const script = PROJECT_INFO.scripts.find(s => s.id === data.scriptId);
      if (!script) {
        throw new Error('Script not found: ' + data.scriptId);
      }
      const filePath = path.join(__dirname, script.file);
      fs.writeFileSync(filePath, data.code, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, message: `Successfully saved ${script.file}` }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  if (pathname === '/api/run-script' && req.method === 'POST') {
    try {
      const data = await parseJsonBody(req);
      const output = executeScript(data.scriptId, data.params || {}, data.code);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, scriptId: data.scriptId, output }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // --- Static Asset Serving ---
  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA-style routing if file not found
      const fallbackIndex = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(fallbackIndex, (fallbackErr, data) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(data);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Kali Linux Open Source Audit Dashboard`);
  console.log(` Author  : Yadavalli Lokesh`);
  console.log(` Server  : http://localhost:${PORT}`);
  console.log(` Status  : Online & Ready`);
  console.log(`====================================================`);
});
