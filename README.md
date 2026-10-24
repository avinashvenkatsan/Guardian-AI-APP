# Guardian – Natural Disaster Alert & Emergency SOS Network

[![Version](https://img.shields.io/badge/version-1.0.0-red.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![Build](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com)

**Guardian** is a cross-platform, mission-critical mobile and web application engineered to protect communities during catastrophic natural disasters. It combines real-time multi-hazard tracking, automated early warning broadcasts, multilingual offline safety protocols, and a failure-proof one-tap SOS emergency routing engine that automatically connects victims to local authorities across 20+ countries.

---

## 📋 Table of Contents
1. [System Architecture & System Flow](#-system-architecture--system-flow)
2. [Core Feature Breakdown](#-core-feature-breakdown)
   - [User Registration & Authentication](#1-user-registration--phone-otp-authentication)
   - [Live World Disaster Map](#2-live-world-disaster-map)
   - [Early Warning Alert System & Loud Siren](#3-early-warning-alert-system--loud-siren)
   - [One-Tap SOS Emergency Dispatch Engine](#4-one-tap-sos-emergency-dispatch-engine)
   - [Safety Precautions & Go-Bag Checklist](#5-multilingual-safety-precautions--go-bag-checklist)
   - [Admin Operations Command Center](#6-admin-operations-command-center)
3. [Country-Specific Emergency Routing Matrix](#-country-specific-emergency-routing-matrix)
4. [Database Schemas (SQL & NoSQL)](#-database-schemas)
5. [Live External API Integrations](#-live-external-api-integrations)
6. [Local Installation & Setup Guide](#-local-installation--setup-guide)
7. [Testing & Quality Assurance Plan](#-testing--quality-assurance-plan)
8. [Privacy, Security & Legal Compliance](#-privacy-security--legal-compliance)

---

## 🏛️ System Architecture & System Flow

Guardian uses a client-authoritative, privacy-first architecture with instantaneous offline fallbacks. Even under catastrophic network failures where cellular mobile data and Wi-Fi towers are severed, the application guarantees that distress packets can be transmitted via native cellular voice circuits and offline SMS protocols.

```
                              [ CITIZEN MOBILE CLIENT ]
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            │                             │                             │
    [ 1. SENSORS & STATE ]      [ 2. MULTI-HAZARD INGESTION ]   [ 3. SOS DISPATCH ENGINE ]
    ├─ WGS84 High-Accuracy GPS  ├─ USGS Live GeoJSON (M 2.5+)   ├─ 2.4s Panic-Proof Hold
    ├─ Device Timezone / Locale ├─ NASA FIRMS Satellite Scans   ├─ Country Code Routing
    ├─ Encrypted Local Storage  ├─ GDACS Multi-Hazard Vectors   ├─ Direct Voice (tel:112)
    └─ Low-Bandwidth Mode       └─ National Weather Directives  ├─ Offline SMS (sms:112)
                                                                └─ Web Audio 950Hz Siren
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    │                                           │
         [ ONLINE PATHWAY ]                            [ OFFLINE CELLULAR PATHWAY ]
         ├─ WebSocket / REST Push                      ├─ GSM / 4G Cellular Call
         ├─ Guardian Admin Command Center              ├─ Native Pre-Filled SMS Body
         └─ Automated ICE Contact SMS Broadcast        └─ Local GPS Grid Coordinates
```

---

## 🚀 Core Feature Breakdown

### 1. User Registration & Phone OTP Authentication
- **Country Code Detection**: Automatically senses device timezone and locale to pre-select national flags and dial codes (`+91` India, `+1` USA, `+44` UK, `+81` Japan, etc.).
- **Interactive 6-Digit OTP**: Fast onboarding verification with automated SMS countdown timer, resend throttle, and one-click demo code auto-fill (`824901`).
- **Emergency ICE & Medical Profile**: Captures legal name, phone number, blood group (e.g., $O^+$, $AB^-$), critical medical notes (asthma, insulin dependency), and Next-of-Kin emergency contact.
- **Permission Gatekeeper**: Clean browser prompts for Geolocation (`navigator.geolocation`) and System Notifications (`Notification.requestPermission`).

### 2. Live World Disaster Map
- **Keyless High-Tactical Cartography**: Powered by Leaflet 1.9 with **Esri World Dark Gray Canvas** (`server.arcgisonline.com`) and **OpenStreetMap (OSM)**—zero watermarks and **no API keys required**.
- **Supported Hazard Vectors**:
  - ⚡ **Earthquakes**: Real-time integration with USGS live seismological feed (`summary/2.5_day.geojson`).
  - 🌀 **Cyclones / Hurricanes**: Active storm tracks, category classification, and sustained wind speed.
  - 🔥 **Wildfires**: Active satellite thermal anomalies and hotspot fire radiation power.
  - 🌊 **Floods & Flash Floods**: River basin inundation and tidal storm surge advisories.
  - 🌊 **Tsunamis**: Undersea thrust earthquake marine wave alerts.
  - 🌋 **Volcanic Eruptions**: Ash plumes, fissure lengths, and exclusion boundaries.
  - ⛰️ **Landslides**: Debris flow risk and slope saturation monitoring.
  - ☀️ **Droughts & Extreme Heat**: Heatwave indices and agricultural moisture deficits.
- **Dynamic Spatial Buffers**: Interactive colored danger radius perimeters (`L.circle`) scaled to each disaster's affected impact zone ($km$).
- **Multi-Level Filters**: Filter simultaneously by Disaster Category, Severity Level (Low, Moderate, High, Critical), and Proximity Distance (Within 100km, 500km, 1500km, or Global Reach).
- **"Near Me" Centering**: Instant radar sweep re-centering onto user coordinates with visual pulse beacon.
- **Relief Infrastructure Overlay**: Toggleable layer displaying reinforced emergency shelters, relief food distribution camps, and Level-1 trauma surgical centers.

### 3. Early Warning Alert System & Loud Siren
- **Prioritized Alert Cards**: Details expected time of impact, affected geographical sectors, proximity distance from the citizen's live GPS coordinates, and mandatory evacuation flags.
- **Web Audio API Emergency Siren**: Pure mathematical synthesis of an air-raid / disaster warning siren using frequency-swept oscillator nodes (`520Hz` to `950Hz`). Works **100% offline without loading external MP3 files**.
- **Real-Time Simulation Engine**: Allows emergency managers and testing teams to simulate sudden incoming evacuation directives on demand.

### 4. One-Tap SOS Emergency Dispatch Engine
- **Panic-Proof Activation**: 2.4-second circular hold-to-activate visual ring prevents accidental pocket taps, paired with an immediate single-tap bypass for extreme urgency.
- **Country-Based Intelligent Routing**: Automatically routes calls and messages to the correct local authorities according to the user's country code:
  - 🇮🇳 **India**: Universal 112 · NDRF Disaster Helpline 1078 · Ambulance 108
  - 🇺🇸 **USA**: Universal 911 · FEMA Operations 1-800-621-3362
  - 🇬🇧 **UK**: Universal 999 · Environment Agency Floodline 0345 988 1188
  - 🇯🇵 **Japan**: Fire/Ambulance 119 · Police 110 · JMA Disaster Line 171
  - 🇪🇺 **Europe**: Universal Emergency 112
- **Pre-Formatted Offline SMS Fallback**: Generates native URI scheme (`sms:112?body=...`) containing:
  ```text
  EMERGENCY SOS: I need urgent rescue! Name: Rajesh Kumar, Phone: +91 9876543210. 
  GPS Location: https://maps.google.com/?q=13.0827,80.2707 (13.0827, 80.2707). 
  Threat: Flash Flood Inundation. Blood Type: O+.
  ```
- **ICE Contact Notify**: One-tap broadcast transmitting GPS distress coordinates directly to saved family members.
- **Command Center Linkage**: Instantly dispatches a structured distress telemetry packet to the Admin Operations Center.

### 5. Multilingual Safety Precautions & Go-Bag Checklist
- **Multilingual Support**: Fully localized in **English**, **Tamil (தமிழ்)**, **Spanish (Español)**, and **Hindi (हिन्दी)**.
- **Three-Phase Survival Timeline**:
  - `Before`: Structural mitigation, utility shutoffs, and emergency asset staging.
  - `During`: Immediate life-safety reflexes (e.g., Drop, Cover, Hold On; Turn Around Don't Drown).
  - `After`: Structural inspection, water disinfection, and gas leak prevention.
- **Strict Do's & Don'ts**: Color-coded bullet points preventing high-fatality mistakes.
- **72-Hour Survival Go-Bag Checklist**: Tracks 14 survival items (3L water/person/day, non-perishable rations, first aid, waterproof document pouch, 20,000mAh power bank, dust masks, thermal blanket) with interactive checkboxes and progress percentage saved to `localStorage`.

### 6. Admin Operations Command Center
- **Live SOS Distress Queue**: Real-time incoming citizen distress beacons with name, phone, timestamp, precise GPS coordinates, and nearest hazard distance.
- **Triage Actions**: Emergency operators can dispatch rescue teams (e.g., *NDRF Battalion 4* or *CAL FIRE Engine 12*), initiate direct calls, inspect Google Maps pins, or mark citizens safe.
- **Mass Early Warning Broadcast**: Administrative modal allowing disaster officials to author title, hazard vector, severity rating, affected zone, and impact window to broadcast push sirens across citizen devices.
- **Country Helpline Database Manager**: Live configuration panel to update national emergency numbers, regional disaster helplines, and civil protection agency URLs.

---

## 🌐 Country-Specific Emergency Routing Matrix

| Country | National SOS | Disaster Authority | Specialized Helpline | Agency Official Website |
| :--- | :--- | :--- | :--- | :--- |
| 🇮🇳 **India** | `112` | National Disaster Response Force (NDRF / NDMA) | `1078` | [ndma.gov.in](https://ndma.gov.in) |
| 🇺🇸 **United States** | `911` | Federal Emergency Management Agency (FEMA) | `1-800-621-3362` | [fema.gov](https://www.fema.gov) |
| 🇬🇧 **United Kingdom** | `999` | Environment Agency & Civil Contingencies | `0345-988-1188` | [gov.uk/environment-agency](https://www.gov.uk) |
| 🇯🇵 **Japan** | `119` | Japan Meteorological Agency (JMA) & Bousai | `171` *(Voice)* | [bousai.go.jp](https://www.bousai.go.jp) |
| 🇦🇺 **Australia** | `000` | National Emergency Management Agency & SES | `132-500` | [nema.gov.au](https://nema.gov.au) |
| 🇨🇦 **Canada** | `911` | Public Safety Canada | `1-800-830-3118` | [publicsafety.gc.ca](https://www.publicsafety.gc.ca) |
| 🇩🇪 **Germany** | `112` | BBK - Federal Office of Civil Protection | `0228-99550-0` | [bbk.bund.de](https://www.bbk.bund.de) |
| 🇫🇷 **France** | `112` | Direction générale de la sécurité civile | `0800-40-60-05` | [interieur.gouv.fr](https://www.interieur.gouv.fr) |
| 🇵🇭 **Philippines** | `911` | NDRRMC Disaster Risk Reduction Council | `911-5061` | [ndrrmc.gov.ph](https://ndrrmc.gov.ph) |
| 🇮🇩 **Indonesia** | `112` | Badan Nasional Penanggulangan Bencana (BNPB) | `117` | [bnpb.go.id](https://www.bnpb.go.id) |

---

## 🗄️ Database Schemas

### 1. Relational SQL Schema (PostgreSQL)

```sql
-- 1. Users & Emergency Profiles Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(32) NOT NULL UNIQUE,
    country_code VARCHAR(8) NOT NULL,
    country_name VARCHAR(128) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    city VARCHAR(128),
    blood_type VARCHAR(8),
    medical_allergies TEXT,
    language VARCHAR(8) DEFAULT 'en',
    low_bandwidth_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ICE Emergency Contacts Table
CREATE TABLE emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    relation VARCHAR(64) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Live Natural Disaster Feeds Table
CREATE TABLE disasters (
    id VARCHAR(128) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(32) NOT NULL, -- earthquake, flood, cyclone, wildfire, tsunami, volcano, landslide, drought
    severity VARCHAR(16) NOT NULL, -- low, moderate, high, critical
    location_name VARCHAR(255) NOT NULL,
    country VARCHAR(128) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    affected_radius_km INTEGER NOT NULL,
    magnitude DOUBLE PRECISION,
    depth_km DOUBLE PRECISION,
    wind_speed_kmh DOUBLE PRECISION,
    source VARCHAR(64) NOT NULL,
    status VARCHAR(32) DEFAULT 'active',
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SOS Distress Dispatches Table
CREATE TABLE sos_dispatches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    user_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    country_code VARCHAR(8) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location_address VARCHAR(255),
    disaster_type VARCHAR(32),
    nearest_disaster_distance_km INTEGER,
    status VARCHAR(32) DEFAULT 'pending', -- pending, dispatched, contacted, resolved
    assigned_team VARCHAR(128),
    notes TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. NoSQL Schema (Google Cloud Firestore)

```text
/users/{userId}
  ├── fullName: string
  ├── phone: string
  ├── countryCode: string
  ├── location: { latitude: number, longitude: number, city: string }
  ├── bloodType: string
  ├── emergencyContacts: array<{ id: string, name: string, phone: string }>
  └── language: string

/disasters/{disasterId}
  ├── title: string
  ├── type: string ("earthquake" | "cyclone" | "wildfire" | "flood" | ...)
  ├── severity: string ("critical" | "high" | "moderate" | "low")
  ├── coordinates: GeoPoint(lat, lng)
  ├── affectedRadiusKm: number
  ├── magnitude: number (optional)
  ├── windSpeedKmh: number (optional)
  └── immediateActions: array<string>

/sos_dispatches/{dispatchId}
  ├── userId: string
  ├── userName: string
  ├── phone: string
  ├── countryCode: string
  ├── coordinates: GeoPoint(lat, lng)
  ├── locationAddress: string
  ├── status: string ("pending" | "dispatched" | "resolved")
  ├── assignedTeam: string
  └── timestamp: timestamp
```

---

## 📡 Live External API Integrations

| Provider | Endpoint | Format | Data Grounding |
| :--- | :--- | :--- | :--- |
| **USGS Seismology** | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson` | GeoJSON | Magnitude, focal depth, exact epicentral latitude/longitude, and tsunami advisories recorded in real-time. |
| **Esri ArcGIS Tiles** | `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}` | Slippy Map PNG | Tactical high-contrast dark vector map tiles requiring zero API keys. |
| **OpenStreetMap** | `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | Slippy Map PNG | High-density road, street, hospital, and civic topology maps. |
| **Esri Satellite** | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}` | Satellite JPG | High-resolution aerial terrain and coastal barrier imaging. |
| **GDACS Multi-Hazard** | `https://www.gdacs.org/xml/rss.xml` | XML/GeoRSS | Tropical cyclone wind radii, storm surge depths, and river flood crests. |

---

## 💻 Local Installation & Setup Guide

### System Prerequisites
- **Node.js**: Version `18.x` or higher (Recommended: `v20.x` LTS or `v22.x`)
- **Package Manager**: `npm` (v9+), `pnpm`, or `bun`

### Step 1: Clone or Extract the Project
```bash
# If using git:
git clone https://github.com/example/guardian-app.git
cd guardian-app

# If using the downloaded archive:
unzip guardian-disaster-app.zip -d guardian-app
cd guardian-app
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Step 4: Launch Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### Step 5: Build for Production Deployment
```bash
npm run build
npm run preview
```

---

## 🧪 Testing & Quality Assurance Plan

1. **Panic-Proof Hold Verification**:
   - Press and hold the SOS button for less than 2.4 seconds and release; verify that the countdown ring resets to 0% and does not trigger emergency signals.
   - Hold for 2.4 seconds continuously; verify that the acoustic siren sounds and the distress packet registers in Admin Ops.
2. **Offline Resilience & SMS Fallback**:
   - Disconnect Wi-Fi and mobile data.
   - Click "Offline SMS Dispatch"; verify that the mobile OS opens the native SMS composer with pre-filled GPS coordinates and medical details without throwing network errors.
3. **Web Audio Alarm Synthesis**:
   - In the Alerts tab, click "Test Loud Siren"; verify that the browser synthesizes the 950Hz frequency sweep through the device speaker without requesting external audio media.
4. **Distance Proximity Calculation**:
   - Toggle the distance filter between "Within 100 km", "Within 500 km", and "Global Reach"; verify that the Haversine calculation accurately computes linear spherical distances to epicenters.
5. **Multilingual Verification**:
   - In the Safety tab, toggle language between English, Tamil (தமிழ்), Spanish (Español), and Hindi (हिन्दी); verify that safety steps, Do's, and Don'ts update instantaneously.

---

## 🔒 Privacy, Security & Legal Compliance

- **Zero Third-Party Advertising / Telemetry**: Guardian contains zero marketing SDKs, third-party user fingerprinting, or tracking pixels.
- **Local Storage Encryption**: User registration data, ICE contacts, and Go-Bag progress remain encrypted on the user's device (`localStorage`).
- **Emergency-Only Transmission**: Exact GPS coordinates are dispatched across external networks exclusively when an active SOS distress state is triggered by the citizen.
- **GDPR & California Privacy Compliant**: Citizens maintain the ability to reset all stored emergency profiles, ICE contacts, and historical distress signals with one click via "Reset Onboarding".
