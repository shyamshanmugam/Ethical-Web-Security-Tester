#!/usr/bin/env node

/**
 * Ethical Web Security Tester (Single File)
 * ----------------------------------------
 * Author: Shyam Shanmugam (Student Project)
 *
 * PURPOSE:
 * - Educational & authorized security testing only
 * - No exploitation
 * - No brute-force
 * - No data extraction
 *
 * USE ONLY ON SYSTEMS YOU OWN OR HAVE PERMISSION TO TEST
 */

import readline from 'readline';
import { exec } from 'child_process';
import https from 'https';
import http from 'http';
import { URL } from 'url';

/* -------------------- Utilities -------------------- */

function fetchURL(target) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(target);
    const lib = urlObj.protocol === 'https:' ? https : http;

    const req = lib.get(urlObj, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve({ headers: res.headers, body: data }));
    });

    req.on('error', reject);
    req.end();
  });
}

function log(title) {
  console.log(`\n🔐 ${title}`);
}

/* -------------------- Tests -------------------- */

// 1️⃣ Security Headers Check
async function testHeaders(url) {
  log('Security Headers Check');
  const res = await fetchURL(url);

  const required = [
    'content-security-policy',
    'x-frame-options',
    'strict-transport-security',
    'x-content-type-options'
  ];

  required.forEach(h => {
    if (!res.headers[h]) {
      console.log(`⚠️ Missing: ${h}`);
    } else {
      console.log(`✅ ${h} present`);
    }
  });
}

// 2️⃣ Technology Detection (basic)
async function testTech(url) {
  log('Technology Detection');
  const res = await fetchURL(url);

  if (/wordpress/i.test(res.body)) console.log('ℹ️ WordPress detected');
  if (/react/i.test(res.body)) console.log('ℹ️ React detected');
  if (/php/i.test(res.body)) console.log('ℹ️ PHP detected');

  console.log('✅ Tech detection completed');
}

// 3️⃣ Safe Port Scan (top ports only)
function testPorts(url) {
  log('Safe Port Scan (Top Ports Only)');
  const host = new URL(url).hostname;

  exec(`nmap -Pn -F ${host}`, (err, stdout) => {
    if (err) {
      console.log('⚠️ Nmap not available');
    } else {
      console.log(stdout);
    }
  });
}

// 4️⃣ SQL Injection Indicator (NO exploitation)
async function testSQLi(url) {
  log('SQL Injection Indicator Check');
  const testUrl = `${url}?id=1'`;

  const res = await fetchURL(testUrl);
  if (/sql|syntax|mysql|postgres|oracle/i.test(res.body)) {
    console.log('⚠️ Possible SQL error-based indicator found');
  } else {
    console.log('✅ No obvious SQL error patterns');
  }
}

// 5️⃣ XSS Indicator (NO execution)
async function testXSS(url) {
  log('XSS Indicator Check');
  const testUrl = `${url}?q=<test>`;

  const res = await fetchURL(testUrl);
  if (res.body.includes('<test>')) {
    console.log('⚠️ Input reflected — possible XSS risk');
  } else {
    console.log('✅ No reflected input detected');
  }
}

/* -------------------- CLI Logic -------------------- */

const ALL_TESTS = {
  headers: testHeaders,
  tech: testTech,
  ports: testPorts,
  'sqli-check': testSQLi,
  'xss-check': testXSS
};

function showHelp() {
  console.log(`
📌 Ethical Web Security Tester

Usage:
  node ethical-test.js scan --url <target>
  node ethical-test.js scan --url <target> --tests headers,tech
  node ethical-test.js scan --url <target> --interactive

Available Tests:
  headers       Security headers check
  tech          Technology detection
  ports         Safe port scan
  sqli-check    SQLi indicators (no exploitation)
  xss-check     XSS indicators (no execution)

⚠️ Authorized use only
`);
}

async function interactiveSelect() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(
      'Choose tests (comma separated: headers,tech,ports,sqli-check,xss-check): ',
      answer => {
        rl.close();
        resolve(answer.split(',').map(v => v.trim()));
      }
    );
  });
}

/* -------------------- Main -------------------- */

(async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    showHelp();
    return;
  }

  if (args[0] !== 'scan') {
    console.log('❌ Unknown command');
    showHelp();
    return;
  }

  const urlIndex = args.indexOf('--url');
  if (urlIndex === -1) {
    console.log('❌ --url is required');
    return;
  }

  const url = args[urlIndex + 1];
  let selectedTests = [];

  if (args.includes('--interactive')) {
    selectedTests = await interactiveSelect();
  } else if (args.includes('--tests')) {
    const tIndex = args.indexOf('--tests');
    selectedTests = args[tIndex + 1].split(',');
  } else {
    selectedTests = Object.keys(ALL_TESTS);
  }

  console.log('\n🚀 Ethical Scan Started');
  console.log(`Target: ${url}`);

  for (const t of selectedTests) {
    if (ALL_TESTS[t]) {
      await ALL_TESTS[t](url);
    }
  }

  console.log('\n✅ Scan finished (no exploitation performed)');
})();
