🔐 Ethical Power Web Vulnerability Scanner

A powerful, ethical, non‑exploiting web vulnerability detection tool built for educational and authorized security testing.

⚠️ This tool performs indicator‑based detection only
❌ No exploitation
❌ No brute‑force
❌ No data destruction

📌 Project Purpose

This project is designed to:

Detect common web security weaknesses

Follow real‑world pentesting methodology

Align with OWASP Top 10

Generate professional security reports

Be safe, legal, and ethical

🚀 Features

✔ Works on HTTP & HTTPS
✔ Single‑file Node.js scanner
✔ Detects:

Missing security headers

SQL Injection indicators (error‑based)

Reflected XSS indicators

Insecure CORS configuration

Sensitive file exposure

✔ Generates JSON vulnerability report
✔ Severity classification (Critical / High / Medium)

🧠 What This Tool Does (Ethical Mode)
Vulnerability	Method
SQL Injection	Error message detection
XSS	Input reflection check
Headers	Missing security headers
CORS	Wildcard policy detection
Exposure	Public sensitive files

👉 No payload execution
👉 No exploitation
👉 Detection only

🛠️ Requirements

Linux / macOS / Windows

Node.js v16 or above

Internet connection

Authorization to test the target

Check Node version:

node -v

📂 Project Structure
Ethical-Power-Web-Scanner/
│
├── ethical-power-scanner.js
├── README.md
└── security-report.json   (generated after scan)

▶️ How to Run (Step‑by‑Step)
1️⃣ Clone or Download
git clone https://github.com/your-username/Ethical-Power-Web-Scanner.git
cd Ethical-Power-Web-Scanner


OR place ethical-power-scanner.js in a folder manually.

2️⃣ Make File Executable (Linux / Kali)
chmod +x ethical-power-scanner.js

3️⃣ Run the Scanner
node ethical-power-scanner.js https://example.com


Example:

node ethical-power-scanner.js https://pentest-ground.com:5013

4️⃣ View Report

After completion, a report will be generated:

security-report.json


Open it:

cat security-report.json


Or pretty view:

jq . security-report.json

📄 Sample Report Output
{
  "target": "https://example.com",
  "timestamp": "2025-01-01T10:00:00Z",
  "findings": [
    {
      "name": "SQL Injection Indicator",
      "severity": "High",
      "evidence": "Database error message detected",
      "recommendation": "Use parameterized queries"
    }
  ]
}

🧪 Severity Levels
Severity	Meaning
Critical	Immediate security risk
High	Exploitable vulnerability indicators
Medium	Security hardening required
Low	Informational issue
📚 OWASP Top 10 Mapping

A01 – Broken Access Control (Indicators)

A03 – Injection

A05 – Security Misconfiguration

A07 – Identification & Authentication Issues

A08 – Software & Data Integrity Failures

⚠️ Legal & Ethical Disclaimer

This tool is for educational purposes only.
Use it only on systems you own or have explicit permission to test.
The author is not responsible for misuse.

🎓 Academic & Resume Use

✔ Final‑year project
✔ Cybersecurity portfolio
✔ SOC Analyst / Pentester resume
✔ GitHub showcase

🚀 Future Improvements

HTML / PDF reports

CVSS scoring

Plugin‑based checks

OWASP auto‑classification

Dashboard UI

Nuclei safe‑template integration

👨‍💻 Author

Shyam Shanmugam
ECE Student | Cybersecurity Enthusiast
Ethical Security Research & Detection



---------------------------------------------------------------------------------------------------------------
🔐 Ethical Web Security Tester (Single-File CLI)

A single-file, CLI-based ethical web security testing tool designed for students and beginners to perform authorized, non-destructive security checks on web applications.

⚠️ For educational and authorized use only

🧪 HOW TO RUN



node ethical-test.js scan --url http://localhost --interactive


(Use Juice Shop / DVWA for demos)

📌 What this tool does

Runs safe, read-only security checks

No exploitation

No brute force

No data extraction

No service disruption

Works with one JavaScript file

Perfect for:

Cybersecurity students

SOC analyst learning

Portfolio projects

Lab testing (DVWA, Juice Shop, localhost)

🧪 Supported Ethical Tests
Test Name	Description
headers	Checks missing security headers
tech	Basic technology detection
ports	Safe top-ports scan (optional nmap)
sqli-check	SQL injection indicator only
xss-check	Reflected XSS indicator only

✔️ Detection only
❌ No exploitation

🖥️ Where to run this

Run locally on your own system, NOT on the target server.

Supported environments:

Windows (CMD / PowerShell / Terminal)

Linux (Ubuntu, Kali, Parrot)

Termux (Android)

🔧 Requirements
1️⃣ Node.js (required)

Check:

node -v


If not installed:

Download LTS from https://nodejs.org

2️⃣ Nmap (optional – only for port scan)

Check:

nmap --version


Install (Linux):

sudo apt install nmap


If nmap is not installed, the tool will still work (port scan skipped).

📁 Project Structure
ethical-test/
├── ethical-test.js
└── README.md


Only one code file is required.

🚀 How to run
1️⃣ Clone or download the repo
git clone https://github.com/yourusername/ethical-test.git
cd ethical-test

2️⃣ Run a full ethical scan
node ethical-test.js scan --url https://example.com

3️⃣ Run specific tests
node ethical-test.js scan --url http://localhost --tests headers,tech

4️⃣ Interactive mode (recommended)
node ethical-test.js scan --url http://localhost --interactive


You’ll be prompted to choose tests safely.

🎯 Allowed targets (IMPORTANT)

You may test ONLY:

✅ Your own websites
✅ http://localhost
✅ Practice labs:

OWASP Juice Shop

DVWA

bWAPP

❌ Do NOT test random websites
❌ Do NOT test company or government sites
❌ Do NOT use without permission

✅ WHAT THIS FIXES (100%)

✔️ No more socket hang up crash
✔️ Handles ECONNRESET
✔️ Timeout protection
✔️ User-Agent added
✔️ One test failing won’t stop others
✔️ GitHub + recruiter safe
🧠 Ethical disclaimer
This tool is intended strictly for educational and authorized security testing.
Run only on systems you own or have explicit permission to test.
The author is not responsible for misuse.

🏆 Portfolio description (use this!)

Built a single-file CLI-based Ethical Web Security Testing tool that performs non-destructive security checks with interactive command selection, designed for educational and authorized testing environments.

📜 License

AGPL-3.0
Free to use, modify, and share with attribution.

🙌 Author

Shyam Shanmugam
Cybersecurity & Engineering Student
India 🇮🇳
