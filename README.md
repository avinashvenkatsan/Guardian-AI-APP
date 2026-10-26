# 🛡️ Guardian — Natural Disaster Alert & Emergency SOS Network

A disaster-awareness and emergency-preparedness web application designed to help users explore disaster information, review safety guidance, and access emergency assistance features.

<p align="center">
  <strong>Building Awareness. Supporting Preparedness.</strong>
</p>

<p align="center">
  <a href="https://guardian-ai-app.ai.studio/">Live Application</a> •
  <a href="https://github.com/avinashvenkatsan/Guardian-AI-APP">GitHub Repository</a>
</p>

---

## 📸 Screenshots

### Live Disaster Map
Explore the map interface, hazard markers, hazard filters, and selected-event details.

![Guardian Live Map](screenshots/live-map.png)

### Early Warning Alerts
View alert cards with severity labels, affected areas, and suggested immediate actions.

![Guardian Early Warning Alerts](screenshots/early-warning-alerts.png)

### Safety Guide
Browse disaster-specific guidance and practical actions for before, during, and after an emergency.

![Guardian Safety Guide](screenshots/safety-guide.png)

---

## 🌍 About the Project

Guardian brings disaster-awareness information and preparedness resources into one interface. The project focuses on clear information presentation, accessible safety guidance, and an interface for emergency-assistance features.

> **Important:** Screenshots show the current interface. Do not treat displayed sample alerts as verified live warnings unless their source and freshness have been confirmed.

## 🎯 Objectives

- Improve access to disaster-awareness information.
- Encourage emergency preparedness and safety planning.
- Provide a straightforward interface for emergency-assistance features.
- Explore location-aware disaster information and alerts.
- Build an extensible application that can grow with additional integrations.

## 🚀 Features

### 🗺️ Live Map
- Map interface with hazard markers and filters.
- Selected-event details, including displayed severity and source information.
- Near-me and relief-shelter interface controls, where supported by the implementation.

### 🚨 Early Warning Alerts
- Alert cards with severity and affected-sector information.
- Suggested actions for displayed hazards.
- Alert simulation and loud-siren testing controls shown in the interface.

### 🧭 Safety Guide
- Disaster-specific guidance.
- Before, during, and after emergency guidance sections.
- Preparedness checklist and shelters/hospitals interface sections.
- Multilingual labels in parts of the interface.

### 🆘 Emergency SOS
- One-tap SOS interface.
- Sector-based SOS actions shown in the interface.

*Actual behavior depends on the current implementation and connected services. Test each feature before describing it as operational.*

## 🛠️ Technology Stack

Update this section to match the actual code in the repository:

- **Frontend:** Confirm the framework and libraries used.
- **Backend:** Add the server-side framework, if applicable.
- **Mapping:** Add the map library or service used.
- **Disaster data:** List providers only after integration is verified.
- **Development tools:** Include the tools actually used in development.

## 🔄 How It Works

1. The user opens Guardian.
2. The user explores the available map, alerts, or safety guidance.
3. The application presents information supported by the current implementation.
4. The user accesses available emergency-assistance features when needed.
5. During a real emergency, the user follows official instructions and contacts appropriate emergency services.

## 💻 Getting Started

### Prerequisites

Depending on the repository configuration, you may need:

- A modern web browser.
- Git.
- Visual Studio Code or another code editor.
- Node.js and npm, if the project uses Node.js.

### 1. Clone the repository

```bash
git clone https://github.com/avinashvenkatsan/Guardian-AI-APP.git
cd Guardian-AI-APP
```

### 2. Install dependencies

If the project contains a `package.json` file:

```bash
npm install
```

### 3. Configure environment variables

Follow the project's actual setup instructions. Never commit passwords, private credentials, or API keys to GitHub.

### 4. Run locally

If `package.json` defines a `dev` script:

```bash
npm run dev
```

Open the local URL printed in the terminal. Commands may differ depending on the project's framework and scripts.

## 📡 Potential Data Sources

These are possible sources for future integrations, not confirmation that they are currently connected:

- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/) — earthquake information.
- [GDACS](https://www.gdacs.org/) — global disaster alerts.
- [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/) — satellite-based fire information.
- [OpenStreetMap](https://www.openstreetmap.org/) — geographic and mapping data.

Check each provider's terms, licensing, attribution, and rate limits before integrating it.

## 🧪 Testing Checklist

- [ ] Verify that navigation and buttons work.
- [ ] Confirm the source and timestamp of disaster information.
- [ ] Test location access when permission is granted and denied.
- [ ] Test SOS flows without accidentally contacting emergency services.
- [ ] Check behavior during network failures.
- [ ] Test responsive layouts on desktop and mobile.
- [ ] Confirm that failures display clear messages.

## 🔒 Security, Privacy, and Reliability

- Request only the permissions needed for each feature.
- Explain how location and other personal data are used.
- Keep secrets out of source control and application logs.
- Validate user inputs and handle service failures safely.
- Do not claim that alerts, SOS messages, or emergency calls are delivered unless delivery is verified.

## ⚠️ Limitations and Disclaimer

- Disaster information can be delayed, incomplete, or unavailable.
- Some features may require internet access, device permissions, or external services.
- Opening a phone dialer or message composer does not guarantee that a call or message was delivered.
- A web application cannot guarantee communication during network or infrastructure failures.
- Guardian does not replace official warning systems or emergency services.

During an actual emergency, follow official instructions and contact the appropriate local emergency services.

## 🔮 Future Enhancements

- Integrate and validate trusted disaster-data sources.
- Improve location-aware alerts and notification delivery.
- Strengthen SOS workflows and delivery-status reporting.
- Add offline preparedness resources.
- Expand multilingual and accessibility support.
- Add automated tests, monitoring, and reliability checks.

## 🎓 Project Information

- **Project Name:** Guardian — Natural Disaster Alert & Emergency SOS Network
- **Project Type:** Web Application
- **Domain:** Disaster Awareness and Emergency Preparedness
- **Development Approach:** Iterative Development
- **Developer:** Avinash V

## 🔗 Links

- **Live Application:** https://guardian-ai-app.ai.studio/
- **GitHub Repository:** https://github.com/avinashvenkatsan/Guardian-AI-APP

---

<p align="center">
  <strong>Guardian — Building Awareness. Supporting Preparedness.</strong>
</p>
