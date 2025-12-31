#!/usr/bin/env node

/**
 * Ethical Web Security Scanner
 * ---------------------------------
 * Detection-based | Single-file | Ethical
 * Author: Shyam Shanmugam
 */

import http from "http";
import https from "https";
import { URL } from "url";
import fs from "fs";

/* ---------------- CORE REQUEST ---------------- */

function request(target) {
  return new Promise((resolve, reject) => {
    const url = new URL(target);
    const lib = url.protocol === "https:" ? https : http;

    const req = lib.request(url, res => {
      let body = "";
      res.on("data", d => (body += d));
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body
        })
      );
    });

    req.on("error", reject);
    req.end();
  });
}

/* ---------------- REPORT STRUCTURE ---------------- */

const report = {
  target: "",
  scan_time: new Date().toISOString(),
  summary: {
    Critical: 0,
    High: 0,
    Medium: 0
  },
  findings: []
};

function addFinding(name, severity, evidence, recommendation) {
  report.summary[severity]++;
  report.findings.push({
    name,
    severity,
    evidence,
    recommendation
  });
}

/* ---------------- CHECKS ---------------- */

// 1️⃣ Missing Security Headers
async function checkHeaders(url) {
  const res = await request(url);
  const required = [
    "content-security-policy",
    "x-frame-options",
    "strict-transport-security",
    "x-content-type-options"
  ];

  required.forEach(h => {
    if (!res.headers[h]) {
      addFinding(
        `Missing Security Header: ${h}`,
        "Medium",
        `${h} header not present`,
        "Configure proper security headers"
      );
    }
  });
}

// 2️⃣ SQL Injection Indicator (Error-based)
async function checkSQLi(url) {
  const res = await request(url + "?id=test'");
  if (/sql|mysql|syntax|postgres|oracle/i.test(res.body)) {
    addFinding(
      "SQL Injection Indicator",
      "High",
      "Database error message detected in response",
      "Use prepared statements and input validation"
    );
  }
}

// 3️⃣ Reflected XSS Indicator
async function checkXSS(url) {
  const payload = "<xsstest>";
  const res = await request(url + "?q=" + encodeURIComponent(payload));

  if (res.body.includes(payload)) {
    addFinding(
      "Reflected XSS Indicator",
      "High",
      "User input reflected without encoding",
      "Apply output encoding and sanitize inputs"
    );
  }
}

// 4️⃣ Insecure CORS
async function checkCORS(url) {
  const res = await request(url);
  if (res.headers["access-control-allow-origin"] === "*") {
    addFinding(
      "Insecure CORS Configuration",
      "High",
      "Access-Control-Allow-Origin set to *",
      "Restrict CORS to trusted domains"
    );
  }
}

// 5️⃣ Sensitive File Exposure
async function checkSensitiveFiles(url) {
  const files = ["/.env", "/.git/config", "/config.json"];

  for (const f of files) {
    try {
      const res = await request(url + f);
      if (res.status === 200 && res.body.length > 20) {
        addFinding(
          "Sensitive File Exposure",
          "Critical",
          `${f} is publicly accessible`,
          "Restrict access to sensitive files"
        );
      }
    } catch {}
  }
}

/* ---------------- RUNNER ---------------- */

(async function () {
  const target = process.argv[2];
  if (!target) {
    console.log("Usage: node ethical-web-security-scanner.js <url>");
    process.exit(1);
  }

  report.target = target;

  console.log("🚀 Ethical Web Security Scan Started");
  console.log("🎯 Target:", target);

  await checkHeaders(target);
  await checkSQLi(target);
  await checkXSS(target);
  await checkCORS(target);
  await checkSensitiveFiles(target);

  fs.writeFileSync(
    "security-report.json",
    JSON.stringify(report, null, 2)
  );

  console.log("✅ Scan Completed");
  console.log("📄 Report generated: security-report.json");
})();
