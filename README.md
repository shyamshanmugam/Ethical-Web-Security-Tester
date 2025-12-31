🔐 Ethical Web Security Tester (Single-File CLI)

A single-file, CLI-based ethical web security testing tool designed for students and beginners to perform authorized, non-destructive security checks on web applications.

⚠️ For educational and authorized use only

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
