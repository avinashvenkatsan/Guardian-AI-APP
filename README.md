
# 🛡️ Guardian — Natural Disaster Alert & Emergency SOS Network

<p align="center">
  <strong>Building Awareness. Supporting Preparedness.</strong>
</p>

<p align="center">
  A disaster-awareness and emergency-preparedness web application designed to help people access hazard information, safety guidance, and emergency assistance features.
</p>

<p align="center">
  <a href="https://guardian-ai-app.ai.studio/">Live Application</a> •
  <a href="https://github.com/avinashvenkatsan/Guardian-AI-APP">GitHub Repository</a>
</p>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Objectives](#-objectives)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [System Architecture](#-system-architecture)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Potential Data Sources](#-potential-data-sources)
- [Security and Privacy](#-security-and-privacy)
- [Testing](#-testing)
- [Limitations](#️-limitations)
- [Future Enhancements](#-future-enhancements)
- [Project Roadmap](#️-project-roadmap)
- [Contributing](#-contributing)
- [Project Information](#-project-information)
- [Disclaimer](#️-disclaimer)

---

## 🌍 About the Project

Guardian is a web application focused on natural disaster awareness, emergency preparedness, and access to safety resources.

The project aims to provide a centralized interface where users can explore disaster-related information, view hazard information on a map, review safety guidance, and access available emergency assistance features.

Guardian emphasizes usability, responsible information presentation, and the importance of being prepared for emergencies.

## 🎯 Objectives

- Improve access to disaster-awareness information.
- Encourage emergency preparedness and safety planning.
- Present hazard information through an organized interface.
- Explore location-aware disaster information and alerts.
- Provide access to safety guides and emergency assistance features.
- Develop an extensible platform for future cloud and API integrations.

---

## 📸 Screenshots

### 🗺️ Live Disaster Map

Explore the map interface and available hazard information.

![Guardian Live Disaster Map](screenshots/live-map.png)

### 🚨 Early Warning Alerts

View the alert interface, severity indicators, affected areas, and suggested safety actions.

![Guardian Early Warning Alerts](screenshots/early-warning-alerts.png)

### 🧭 Disaster Safety Guide

Access disaster-related safety guidance and preparedness information.

![Guardian Safety Guide](screenshots/safety-guide.png)

> **Note:** Screenshots illustrate the application interface. Confirm that displayed alerts are connected to verified data sources before presenting them as real-time warnings.

---

## 🚀 Features

### 🗺️ Disaster Map

- Map-based hazard information interface.
- Hazard markers and filtering controls.
- Selected-event information where available.
- Location-related controls where implemented.

### 🚨 Early Warning Alerts

- Disaster alert presentation interface.
- Severity indicators and affected-area information.
- Suggested safety actions.
- Support for future integration with trusted disaster data providers.

### 🧭 Safety Guide

- Disaster preparedness information.
- Practical safety recommendations.
- Guidance for different emergency situations.
- Potential for multilingual safety resources.

### 🆘 Emergency SOS

- Emergency assistance interface.
- Access to available emergency-contact options.
- Location-related assistance where supported and permitted.
- Opportunities to improve delivery-status reporting.

### 📱 User Interface

- Organized navigation.
- Responsive interface for supported devices.
- Clear presentation of hazard information.
- Structure that can be extended with additional features.

*Feature availability depends on the current implementation. A displayed button or interface does not necessarily mean that its underlying service is operational.*

---

## 🛠️ Technology Stack

The following categories describe the technologies used or considered for Guardian. Update them to match the actual repository.

| Component | Technology |
|---|---|
| Frontend | Confirm the framework and libraries in the source code |
| Backend | Add the server-side framework, if applicable |
| Mapping | Specify the mapping library or provider used |
| Disaster Data | Specify integrated APIs or feeds |
| Database | Specify the database, if implemented |
| Development Tools | Tools actually used during development |
| Version Control | Git and GitHub |
| Deployment | Current hosting platform |

---

## 🏗️ System Architecture

Guardian can be organized into the following logical components.

```text
              ┌─────────────────────┐
              │       User          │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   Guardian Web UI   │
              │ Map / Alerts / Guide│
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Application Backend │
              │  If implemented     │
              └──────────┬──────────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
        ┌─────────┐ ┌──────────┐ ┌──────────┐
        │ Disaster│ │ Mapping  │ │Database /│
        │  APIs   │ │ Service  │ │ Storage  │
        └─────────┘ └──────────┘ └──────────┘
```

This is a conceptual architecture. The actual backend, database, and integrations depend on the implementation in the repository.

---

## 🔄 How It Works

The intended application workflow is:

1. The user opens the Guardian application.
2. The user explores the available disaster map, alerts, and safety guides.
3. The application displays information supported by its current implementation.
4. The user accesses available emergency assistance features when needed.
5. During an actual emergency, the user follows official safety instructions and contacts appropriate emergency services.

Data freshness, location functionality, alert delivery, and SOS behavior depend on the implemented features and external services.

---

## 💻 Getting Started

### Prerequisites

Depending on the project configuration, you may need:

- A modern web browser.
- Git.
- Visual Studio Code or another code editor.
- Node.js and npm, if the project uses Node.js.

### 1. Clone the Repository

```bash
git clone https://github.com/avinashvenkatsan/Guardian-AI-APP.git
cd Guardian-AI-APP
```

### 2. Install Dependencies

If the repository contains a `package.json` file, run:

```bash
npm install
```

### 3. Configure Environment Variables

If the application requires API keys or environment variables:

- Follow the project's configuration instructions.
- Store secrets in environment variables.
- Do not commit private credentials or API keys to GitHub.
- Use server-side configuration for secrets that must not be exposed to browsers.

### 4. Run the Application

If the project's `package.json` defines a `dev` script, run:

```bash
npm run dev
```

Open the local URL printed in the terminal.

> These commands are general instructions for compatible Node.js projects. Check the repository's actual scripts and configuration if they differ.

---

## 📡 Potential Data Sources

The following public resources may be considered for future integrations. They are not confirmation of existing integrations.

| Source | Potential Purpose |
|---|---|
| [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/) | Earthquake information |
| [GDACS](https://www.gdacs.org/) | Global disaster alerts |
| [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/) | Satellite-based fire information |
| [OpenStreetMap](https://www.openstreetmap.org/) | Geographic and mapping data |

Before integration, review provider documentation, licensing, attribution requirements, rate limits, and data freshness.

---

## 🔐 Security and Privacy

Guardian should follow appropriate security and privacy practices, particularly if location or emergency-contact information is handled.

- **Data Minimization:** Collect only information required for a feature.
- **Permission Management:** Request location access only when needed.
- **Credential Protection:** Never expose private API keys, passwords, or cloud credentials in public source code.
- **Secure Communication:** Use HTTPS for supported production services.
- **Input Validation:** Validate user inputs and external data.
- **Error Handling:** Avoid exposing sensitive information in error messages.
- **Logging:** Avoid recording unnecessary personal information or precise location details.
- **Access Control:** Protect sensitive resources with appropriate authentication and authorization when required.
- **Data Retention:** Establish suitable retention and deletion practices for stored personal information.

Security protections should be described as implemented only after they have been verified.

---

## 🧪 Testing

Recommended testing areas include:

- **Navigation Testing:** Verify links, menus, tabs, and buttons.
- **Responsive Testing:** Check desktop, tablet, and mobile layouts.
- **Data Validation:** Verify data formats, sources, and timestamps.
- **API Testing:** Test successful responses, invalid data, and unavailable services.
- **Location Testing:** Check behavior when permission is granted or denied.
- **Alert Testing:** Verify displayed details, severity labels, and filters.
- **SOS Testing:** Test workflows without accidentally contacting emergency services.
- **Notification Testing:** Verify supported notification behavior.
- **Security Testing:** Check for exposed secrets and improper permissions.
- **Performance Testing:** Evaluate loading times and responsiveness.
- **Accessibility Testing:** Check keyboard navigation, contrast, and readable labels.
- **Regression Testing:** Retest existing functionality after code changes.

---

## ⚠️ Limitations

- **Internet Dependency:** Live information and remote services may require an internet connection.
- **Data Accuracy:** External sources may provide delayed, incomplete, or revised information.
- **Alert Delays:** Network problems and third-party outages can delay updates.
- **Location Permissions:** Location-based features depend on user permissions and device capabilities.
- **Geographic Coverage:** Reliable hazard information may not be available for every region.
- **Third-Party Dependencies:** External APIs and mapping services may experience outages or usage limits.
- **SOS Delivery:** Starting an SOS action does not guarantee successful delivery of a call, message, or alert.
- **Notification Restrictions:** Device and browser settings may affect notification delivery.
- **Infrastructure Failures:** Power outages or communication network failures can affect availability.
- **Prototype Limitations:** Features that have not been fully implemented and tested should not be relied upon in emergencies.
- **Not an Official Warning System:** Guardian does not replace official government warnings or emergency services.

---

## 🔮 Future Enhancements

The following improvements are planned possibilities for future development.

### 🌐 Real-Time Disaster Data
- Integrate trusted disaster monitoring APIs.
- Display updated earthquake, flood, cyclone, and wildfire information where supported by data providers.
- Show source attribution and update timestamps.

### 🤖 AI-Assisted Risk Analysis
- Explore analysis of verified disaster information.
- Summarize hazard reports to help users understand potential risks.
- Clearly distinguish generated summaries from official warnings.

### 📍 Location-Based Alerts
- Support location-aware hazard filtering.
- Notify users about relevant nearby hazards where technically supported.
- Provide controls for location permissions and notification preferences.

### 🆘 Emergency Assistance
- Improve emergency-contact workflows.
- Provide clearer SOS status information.
- Explore delivery confirmation where supported by the communication service.

### ☁️ Cloud Integration
- Explore cloud hosting and managed infrastructure.
- Automate data collection and processing using scheduled jobs.
- Add service monitoring and error reporting.
- Improve deployment and recovery procedures.

### 📡 Notifications
- Introduce push notifications where supported.
- Reduce duplicate notifications.
- Provide clear information about alert sources and timestamps.

### 📴 Offline Preparedness
- Make essential safety instructions available offline.
- Add downloadable emergency checklists.
- Improve access to critical preparedness information during connectivity failures.

### 🌍 Accessibility and Languages
- Expand Tamil, English, and other language support.
- Improve keyboard navigation and screen-reader compatibility.
- Improve readability and accessible hazard indicators.

### 🧪 Reliability
- Add automated tests for critical workflows.
- Improve handling of unavailable APIs.
- Monitor application health and processing failures.
- Conduct security and performance reviews.

---

## 🗺️ Project Roadmap

### Phase 1 — Core Application
- [ ] Review the existing interface and navigation.
- [ ] Test the map, alerts, and safety guide.
- [ ] Verify emergency assistance controls.
- [ ] Improve responsive behavior.

### Phase 2 — Data Integration
- [ ] Select appropriate trusted disaster data sources.
- [ ] Integrate and validate supported data feeds.
- [ ] Display source attribution and timestamps.
- [ ] Improve error handling for unavailable data.

### Phase 3 — Cloud and Automation
- [ ] Evaluate suitable cloud hosting.
- [ ] Add automated data-processing workflows where needed.
- [ ] Configure monitoring and structured logging.
- [ ] Document deployment and recovery procedures.

### Phase 4 — Reliability and Accessibility
- [ ] Add automated tests.
- [ ] Improve multilingual support.
- [ ] Review privacy and security controls.
- [ ] Test failure scenarios and accessibility.

*Roadmap items are planned tasks, not claims of completed functionality.*

---

## 🤝 Contributing

Contributions that improve Guardian's usability, reliability, accessibility, and disaster preparedness capabilities are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit changes with clear messages.
5. Open a pull request describing your contribution.

Please do not submit private credentials, sensitive personal information, or unverified emergency reports in code and test fixtures.

---

## 🎓 Project Information

- **Project Name:** Guardian — Natural Disaster Alert & Emergency SOS Network
- **Project Type:** Web Application
- **Domain:** Disaster Awareness and Emergency Preparedness
- **Development Approach:** Iterative Development
- **Developer:** Avinash V

---

## 🔗 Project Links

- **Live Application:** https://guardian-ai-app.ai.studio/
- **GitHub Repository:** https://github.com/avinashvenkatsan/Guardian-AI-APP

---

## ⚖️ Disclaimer

Guardian is intended to support disaster awareness and emergency preparedness. It does not guarantee the accuracy or timeliness of disaster information, notification delivery, or successful contact with emergency services.

Guardian is not a substitute for official warnings or instructions from emergency authorities.

During an actual emergency, follow official guidance and contact the appropriate local emergency services.

---

<p align="center">
  <strong>Guardian — Building Awareness. Supporting Preparedness.</strong>
</p>
