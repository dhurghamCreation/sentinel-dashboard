<p align="center">
  <img src="https://img.shields.io/badge/SENTINEL-ARCHIVE-v3.1.0-2b8cbe?style=flat-square&labelColor=1a1d23&color=3498db" alt="Version" />
  <img src="https://img.shields.io/badge/UI-Single%2DFile%20Zero%2DConfig-27ae60?style=flat-square&labelColor=1a1d23&color=27ae60" alt="Zero config" />
  <img src="https://img.shields.io/badge/Integrity-SHA%2D256-7d3c98?style=flat-square&labelColor=1a1d23&color=7d3c98" alt="SHA-256" />
  <img src="https://img.shields.io/badge/Obfuscation-AES%2D256-d4a017?style=flat-square&labelColor=1a1d23&color=d4a017" alt="AES-256" />
  <img src="https://img.shields.io/badge/Polyglot-Python%20%7C%20Rust%20%7C%20C%23%20%7C%20Java%20%7C%20JS-c0392b?style=flat-square&labelColor=1a1d23&color=c0392b" alt="Polyglot" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&labelColor=1a1d23&color=111111" alt="Vercel" />
</p>

<h1 align="center"> SENTINEL ARCHIVE</h1>
<p align="center"><b>Universal Data-Vault Command Center</b><br>
 <i>Shard. Verify. Heal. Command.</i> — an enterprise-grade sharded storage monitoring platform with a unified command dashboard.</p>

<p align="center">
  <a href="#-overview"><b>Overview</b></a> •
  <a href="#-features"><b>Features</b></a> •
  <a href="#-system-architecture"><b>Architecture</b></a> •
  <a href="#-tech-stack"><b>Tech Stack</b></a> •
  <a href="#-quick-start"><b>Quick Start</b></a> •
  <a href="#-dashboard-guide"><b>Dashboard Guide</b></a> •
  <a href="#-security-model"><b>Security</b></a> •
  <a href="#-roadmap"><b>Roadmap</b></a>
</p>

---

##  Overview

**Sentinel Archive** is a self-contained, polyglot data-integrity platform that transforms a single file into a
cryptographically-bound *shard vault* — and then watches over it, forever.

At its heart is the **Universal Dashboard** (`index.html`, **v3.1.0**) — a single-file, zero-build, offline-capable
command center for monitoring, healing, and operating a sharded storage grid. Around that core sits a full
five-layer integrity stack:

| Layer | Language | Responsibility |
|---|---|---|
|  **Detection** | C# | Watches the OS drop-zone and triggers sharding |
|  **Math Core** | Python | Splits binary data into `N` shards + writes the SHA-256 Manifest |
|  **Integrity Sentinel** | Rust | Periodically re-hashes shards to detect drift |
|  **Recovery Engine** | Python | Uses the Manifest to identify & heal corruption |
|  **Universal UI** | React / Vanilla JS | Real-time command center for Desktop & Mobile |

Designed to be **portable, auditable, and beautiful** — the dashboard runs from a single HTML file with no server,
no install, and no network requirement.

---

##  The Vision

> *"Your data should never be a single point of failure."*

Sentinel Archive applies the philosophy of **defense-in-depth at the byte level**:

1. **Never store the whole file** — split it into shards so a compromise of one slice leaks nothing.
2. **Never trust a shard blindly** — every byte is fingerprinted in an immutable SHA-256 manifest.
3. **Never wait for disaster** — the integrity sentinel constantly cross-checks *live hash vs. manifest hash*.
4. **Always be ready to heal** — when drift is detected, the recovery engine restores the vault.
5. **Always be readable** — one human-friendly command grid to rule the entire grid, from any device.

This is a **universal command center** for data vault systems: live telemetry, a 96-shard integrity matrix,
incident management, backup controls, an embedded terminal, an API console, report export — all in a single file.

---

##  Features

###  The Universal Command Dashboard (v3.1.0)
- **Zero-config, offline, portable** — one `index.html`, works in any modern browser, no build step.
- **15 integrated workspaces**: Dashboard, Shard Explorer, Network, Logs & Audit, Notes, To-Do, Calculator,
  Alerts, Backup, Terminal, Files, Reports, API Console, Help & Settings.
- **Live telemetry** refreshing every **1.5 seconds** — capacity, cross-region latency, active clusters,
  encryption strength and threat scan rates.
- **96-shard integrity matrix** — point, click, inspect, and repair individual shard cells.
- **Global Integrity panel** with *Risk Score* and real-time trend charts.
- **One-click `Heal`** — simulates the recovery engine and returns the fleet to healthy in under two seconds.
- **Embedded Terminal** — `status`, `shards`, `heal`, `scan`, `nodes`, `drill`, `export` and more.
- **Report Studio** — export detailed fleet reports as **HTML / JSON / CSV** for audits & compliance.
- **API Console** — a request builder against REST-style endpoints (`/api/v1/*`) with headers & body editors.
- **Global search + keyboard command layer** — `Ctrl+K` search, `Ctrl+1…9` page switching, `Ctrl+H` heal, `Ctrl+E` export.
- **Local persistence** — themes, notes, to-dos, and calculator history survive reloads via `localStorage`.

###  The Shard Vault (Python Math Core)
- Deterministic binary sharding into `N` pieces with `SHA-256` per-shard fingerprints.
- Generates the **Manifest** (`manifest.json`) — the *bridge* between raw shards and verification.
- Fault-tolerant path resolution — vault is always placed under `vault_storage/`.

###  The Integrity Sentinel (Rust)
- High-speed, typed `SHA-256` hashing loop over the shard set.
- The check is designed to gate the recovery trigger: `live_hash != manifest_hash → CRITICAL CORRUPTION → heal`.

###  The Recovery Engine (Python)
- Scans every shard against the manifest.
- Reports **corruption**, **missing** shards, and closes the loop with a full scan report.
- Drop-in runnable from inside the vault.

###  The Auth Vault (Java)
- Secure, standard-library **AES-256** master-key generation for shard obfuscation at rest.

###  The Detection Layer (C#)
- `FileSystemWatcher` proxy for a `C:\Sentinel\DropZone` — the moment a file lands, sharding is triggered.

---

##  System Architecture

```
                         ┌─────────────────────────────────────────────┐
                         │              SENTINEL ARCHIVE                │
                         │               UNIVERSAL VAULT                │
                         └──────────────────┬──────────────────────────┘
                                            │
        ┌───────────────────────────────────▼───────────────────────────────────┐
        │                     1. DETECTION LAYER  (C#)                         │
        │   FileSystemWatcher · Drop-Zone monitor · fires on file-created      │
        └───────────────────────────────────┬───────────────────────────────────┘
                                            ▼
        ┌───────────────────────────────────▼───────────────────────────────────┐
        │                     2. MATH CORE  (Python)                           │
        │   Read binary → split into N shards → fingerprint each shard         │
        │   → emit manifest.json (SHA-256 oracle)                                │
        └───────────────────────────────────┬───────────────────────────────────┘
                                            ▼
                              ┌───────────────────────────┐
                              │        VAULT STORE        │
                              │  shard_0..N.dat          │
                              │  manifest.json           │
                              └───────┬───────────┬───────┘
                                      │           │
              ┌───────────────────────▼───┐   ┌───▼────────────────────────┐
              │    3. INTEGRITY SENTINEL  │   │   4. RECOVERY ENGINE       │
              │        (Rust)             │   │       (Python)             │
              │  re-hash every shard      │   │  live_hash vs manifest     │
              │  live_hash == manifest?   │──▶│  → flag CRITICAL/CORRUPTED │
              └───────────────────────────┘   │  → heal / rebuild          │
                                              └─────────────┬──────────────┘
                                                            ▼
                              ┌───────────────────────────────────────────────┐
                              │             5. UNIVERSAL UI                   │
                              │  Command grid · telemetry · incidents · heal  │
                              └───────────────────────────────────────────────┘
```

### Pipeline: from file-drop to assurance

```
  file dropped ─▶  C# watcher ─▶  Python sharder ─▶  vault_storage/
                                                              ├─ shard_0.dat … shard_9.dat
                                                              └─ manifest.json (SHA-256)
                                                                        │
  periodic ─▶  Rust sentinel ── live_hash == manifest_hash? ── YES ▶  healthy
                                                                      │
                                                                      NO
                                                                      ▼
                                                        Python recovery ─▶  healed
                                                                      │
                                                                      ▼
                                           Universal Dashboard: status · alerts · reports
```

---

##  Tech Stack

| Component | Language / Framework | Highlights |
|---|---|---|
| **Universal Dashboard** | HTML5 · CSS3 · Vanilla JS (`v3.1.0`) | Single-file, offline, responsive, `localStorage` persistence |
| **React Dashboard (alt.)** | React · Tailwind · Framer Motion · lucide-react (`v2.1.0`) | `Dashboard.jsx` — modern componentized variant of the command grid |
| **Sharding / Math Core** | Python 3 | Deterministic binary sharding + SHA-256 manifest emission |
| **Recovery Engine** | Python 3 | Manifest-driven integrity sweep & healing |
| **Integrity Sentinel** | Rust (`sha2`) | High-speed typed hashing core for verification |
| **Detection Layer** | C# (.NET) | `FileSystemWatcher` drop-zone automation |
| **Auth Vault** | Java (`javax.crypto`) | AES-256 master-key generation |
| **API/Edge** | Node.js · Express 5 · dotenv | Minimal bootstrap server (`index.js`) |
| **Deployment** | Vercel | Static single-file dashboard hosted as `sentinel-dashboard` |

---

##  Repository Structure

```
sentinel-archive/
├─ index.html                     #  Universal Dashboard (v3.1.0) — the single-file command center
├─ Dashboard.jsx                  # React/Tailwind/Framer alternative (v2.1.0)
├─ index.js                       # Node bootstrap (Express-ready entry point)
├─ package.json                   # Node manifest (express, dotenv)
├─ system_map.txt                 #  CANONICAL SYSTEM ARCHITECTURE — read this first
├─ vault-config.yaml              # Vault configuration stub
├─ my_secret.txt                  # Demo payload used by the sharder (git-ignored)
│
├─ core-engine-python/            #  MATH CORE +  RECOVERY
│  ├─ requirements.txt
│  └─ src/
│     ├─ shard_logic.py           #   Sharding engine → writes vault_storage/ + manifest.json
│     └─ recovery.py              #   Healing/verification engine (see vault_storage/recovery.py)
│
├─ auth-module-java/              #  AUTH VAULT
│  └─ KeyManager.java             #   AES-256 master key generation
│
├─ cli-tool-rust/                 #  INTEGRITY SENTINEL
│  ├─ Cargo.toml
│  └─ src/main.rs                 #   Multi-shard SHA-256 verification loop
│
├─ system-layer-csharp/           #  DETECTION LAYER
│  ├─ FileWatcher.cs              #   Drop-zone FileSystemWatcher → triggers sharding
│  └─ DiskWriter.cs               #   Disk-writer scaffold
│
├─ vault_storage/                 #  VAULT STORE
│  ├─ shard_0.dat … shard_9.dat   #   Sharded binary payload
│  ├─ manifest.json               #   SHA-256 fingerprint manifest (the Bridge)
│  ├─ recovery.py                 #   Drop-in integrity scanner (run from inside vault)
│  └─ sentinel-dashboard/         #    Archived dashboard generations
│     ├─ SentinelApp.html         #     V2.2.0 Universal Dashboard
│     ├─ AetherWing_X1.html       #     AetherWing generation
│     ├─ TitanGate_Overlord.html  #     TitanGate generation
│     └─ Zenith_Enterprise.html   #     Zenith Enterprise generation
│
├─ docs/                          #  Documentation index (growing)
└─ .vercel/                       # Vercel deployment identity (sentinel-dashboard)
```

---

##  Quick Start

### 0. Prerequisites
| Tool | Used for |
|---|---|
| Any modern browser | Universal Dashboard (no install required) |
| Python 3.8+ | Sharding engine + recovery engine |
| Rust toolchain (`cargo`) | Integrity sentinel |
| .NET (C# compiler / `dotnet`) | Detection layer |
| JDK 8+ | Auth vault (AES-256 key manager) |
| Node.js 18+ | Optional Express bootstrap server |

### 1. Launch the Universal Dashboard 
```bash
# The zero-config path — just open it
start index.html          # Windows
open index.html           # macOS
# …or deploy it (Vercel):
vercel
```

### 2. Build a shard vault 
```bash
cd core-engine-python
pip install -r requirements.txt      # (empty for now — stdlib only)
python src/shard_logic.py my_secret.txt
```
What happens:
- Reads the file; splits its bytes into `10` shards (`shard_0.dat` … `shard_9.dat`)
- Computes an independent **SHA-256 fingerprint per shard**
- Writes the **Manifest** (`vault_storage/manifest.json`) — the integrity bridge

### 3. Run the Integrity Sentinel 
```bash
cd cli-tool-rust
# add sha2 to Cargo.toml:
#   [dependencies]
#   sha2 = "0.10"
cargo run
```
Each shard is re-hashed and printed. Replace the placeholder check with the recovery trigger:
`live_hash != manifest_hash → start recovery engine`.

### 4. Heal the vault 
```bash
cd vault_storage
python recovery.py
```
Scans every shard against `manifest.json`, reports `CORRUPTED` / `MISSING`, and returns a scan summary.

### 5. Watch the drop-zone 
```csharp
// system-layer-csharp/FileWatcher.cs — create C:\Sentinel\DropZone,
// drop a file, and the watcher fires the sharding trigger.
csc FileWatcher.cs
FileWatcher.exe
```

### 6. Generate the vault master key 
```bash
cd auth-module-java
javac KeyManager.java
java KeyManager
# → "Vault Master Key Generated Securely."  (AES-256)
```

### 7. Spin up the Node bootstrap 
```bash
npm install
npm run dev        # → "Sentinel Archive System Online"
```

---

##  Dashboard Guide

### Workspaces

| Page | What it does |
|---|---|
| **Dashboard** | Live capacity, latency, clusters, integrity, threat-scan telemetry (refreshed every 1.5 s) |
| **Shard Explorer** | The 96-cell integrity matrix — click any shard to drill into status / rebuild |
| **Network** | Simulated cross-region node topology & latency map |
| **Logs & Audit** | Terminal-grade event stream for every action |
| **Notes / To-Do / Calculator** | Productivity tools — all persisted locally |
| **Alerts** | Real-time incident feed with severity badges |
| **Backup** | One-click snapshot controls for the vault |
| **Terminal** | Full command surface (see below) |
| **Files** | Lightweight file browser simulation |
| **Reports** | Generate & download fleet reports → HTML / JSON / CSV |
| **API Console** | Request builder + response viewer for `/api/v1/*` endpoints |
| **Help & About / Settings** | Onboard, inspect version, switch themes |

### ⌨ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + 1 … 9` | Jump to any page |
| `Ctrl + K` | Global search |
| `Ctrl + H` | Heal the system |
| `Ctrl + E` | Export report |

###  Terminal Commands

| Command | Effect |
|---|---|
| `help` | List every available command |
| `status` | Fleet health summary (`ok/total shards`) |
| `shards` | Shard tally (`OK/WARN/ERR/REBUILDING`) |
| `heal` | Trigger the healing sequence |
| `clear` | Clear the terminal output |
| `theme` | Cycle visual themes |
| `uptime` | System uptime |
| `version` | Sentinel Archive version |
| `nodes` | Node inventory & state |
| `scan` | One-shot threat sweep |
| `export` | Export current session report |
| `drill` | Open the drill-down explorer |

###  API Console Reference

The built-in console exercises a REST-style surface — perfect for testing integration flows:

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/integrity` | Global integrity report |
| `GET /api/v1/shards` | Shard inventory & health |
| `GET /api/v1/status` | System status |
| `GET /api/v1/nodes` | Node topology |
| `GET /api/v1/alerts` | Open incidents |
| `POST /api/v1/backup` | Trigger a vault snapshot |

---

##  Security Model

| Property | Implementation |
|---|---|
| **Shard fingerprinting** | `SHA-256` digest per shard, recorded in `manifest.json` |
| **Storage obfuscation** | `AES-256` master key generation (`KeyManager.java`) for at-rest protection |
| **Secret hygiene** | `my_secret.txt`, `.env`, `node_modules/`, and build artifacts are git-ignored |
| **Zero third-party surface** | Plumbing layers are standard-library only (Python, Java, .NET) |
| **Reproducible integrity** | Hash-then-manifest design means corruption is always *detectable*, never silent |

### Manifest — the integrity bridge
```json
{
    "file_name": "my_secret.txt",
    "total_shards": 10,
    "hashes": {
        "shard_0.dat": "b3d4b3d8ba72a6ca943f5a704b6c871f405140018889db7fc4b5115f72632d0e",
        "shard_1.dat": "78dff05d6dbd396f7614500b60974540fbdb8036c85c0a78e0bc79f993a27bd8"
    }
}
```
Every dereference of a shard is checked against this oracle. Numbers don't lie.

---

##  Verification Walkthrough

```powershell
# 1. Build the vault
python src/shard_logic.py my_secret.txt
# → SUCCESS · Vault created at: vault_storage

# 2. Corrupt a shard on purpose
Add-Content vault_storage/shard_0.dat "tamper"

# 3. Sweep for corruption
cd vault_storage; python recovery.py
# → [SENTINEL RECOVERY] … [ ! ] Corruption confirmed in shard_0.dat
# → SCAN COMPLETE: 1 issue(s) identified/handled

# 4. Watch it live
open ../index.html            # Shard Explorer now flags the drift; hit [Heal] to recover
```

This is the complete **detect → verify → heal** loop Sentinel Archive is built around.

---

##  Roadmap

- [x] Single-file Universal Dashboard (`v3.1.0`) — zero-config command center
- [x] Sharding engine + SHA-256 manifest pipeline
- [x] Integrity sentinel (Rust) & recovery engine (Python)
- [x] AES-256 auth vault (Java) & drop-zone watcher (C#)
- [x] Vercel static deployment
- [ ] **Real parity shards** — Reed–Solomon style recovery (reconstruct from `n-k` shards)
- [ ] **True healing** — rewrite corrupted shards from parity instead of flag-only
- [ ] **Actual `/api/v1/*` backend** — wire Express endpoints to the vault
- [ ] **Electron/Tauri shell** — desktop-native watcher + dashboard
- [ ] **Encrypted shard-at-rest** — enforce AES-256 before disk write

---

##  Contributing

Ideas, issues, and pull requests are welcome. The project is organized around its **five layers**
(`core-engine-python`, `cli-tool-rust`, `system-layer-csharp`, `auth-module-java`, UI). A good first PR:

1. Fork the repo and branch off `main`.
2. Respect the existing layer boundaries and the canonical `system_map.txt` architecture.
3. Keep plumbing layers **standard-library-first**.
4. Validate the full **file → shard → verify → heal** loop before submitting.

---

## 👨 Designer & Creator

> **Dhurgham Alsaadi**
>
> Concept, system architecture, and design of the Sentinel Archive platform —
> from the five-layer integrity pipeline to the Universal Command Dashboard.

Built with  and precision.

---

##  License

Distributed under the **ISC License**. See `LICENSE` for details (or contact the designer).

---

<p align="center">
  <b>SENTINEL ARCHIVE</b> · <i>Shard. Verify. Heal. Command.</i><br>
  <sub>© 2026 Dhurgham Alsaadi · Designed as a universal vault command center</sub>
</p>
