import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  DisasterEvent,
  EarlyWarningAlert,
  SOSDispatch,
  CountryEmergencyInfo,
  DisasterType
} from './types';
import { COUNTRIES, detectUserCountry } from './data/countries';
import { INITIAL_DISASTERS, fetchLiveUSGSEarthquakes, calculateDistanceKm } from './data/disasters';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { DisasterMap } from './components/DisasterMap';
import { AlertsView } from './components/AlertsView';
import { SafetyView } from './components/SafetyView';
import { AdminDashboard } from './components/AdminDashboard';
import { RegistrationModal } from './components/RegistrationModal';
import { SOSModal } from './components/SOSModal';
import { ProfileModal } from './components/ProfileModal';
import { Smartphone, Monitor, Shield, User, Globe } from 'lucide-react';

export default function App() {
  // Device Frame Viewport Toggle ('desktop' | 'mobile')
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  // Navigation state
  const [currentTab, setCurrentTab] = useState<'map' | 'alerts' | 'safety' | 'admin'>('map');

  // Country directory state (can be edited in Admin Dashboard)
  const [countriesList, setCountriesList] = useState<CountryEmergencyInfo[]>(COUNTRIES);

  // User Profile state with localStorage persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('guardian_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    const defaultCountry = detectUserCountry();
    return {
      id: 'usr-default',
      fullName: 'Avinash Venkatesan',
      phone: `${defaultCountry.dialCode} 9876543210`,
      countryCode: defaultCountry.code,
      countryName: defaultCountry.name,
      location: {
        latitude: defaultCountry.code === 'IN' ? 13.0827 : 37.7749,
        longitude: defaultCountry.code === 'IN' ? 80.2707 : -122.4194,
        city: defaultCountry.code === 'IN' ? 'Chennai' : 'San Francisco',
        country: defaultCountry.name,
        accuracy: 15
      },
      bloodType: 'O+',
      allergies: 'No known drug allergies',
      emergencyContacts: [
        {
          id: 'ice-1',
          name: 'Priya Venkatesan',
          relation: 'Sister / Family',
          phone: `${defaultCountry.dialCode} 9840123456`
        }
      ],
      language: defaultCountry.code === 'IN' ? 'ta' : 'en',
      isRegistered: true, // Default to registered so app is immediately usable, with button to test onboarding
      lowBandwidthMode: false
    };
  });

  // Modals state
  const [showRegistration, setShowRegistration] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedDisasterForSOS, setSelectedDisasterForSOS] = useState<DisasterEvent | null>(null);
  const [safetyInitialType, setSafetyInitialType] = useState<DisasterType>('earthquake');

  // Disasters feed state
  const [disasters, setDisasters] = useState<DisasterEvent[]>(INITIAL_DISASTERS);

  // Early warning alerts state
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>([
    {
      id: 'alert-remal',
      disasterId: 'cyclone-bengal-01',
      disasterType: 'cyclone',
      title: 'Red Cyclone Warning: Severe Storm "Remal"',
      severity: 'critical',
      issuedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      expectedImpactTime: 'Within 90 Minutes',
      affectedArea: 'Coastal Odisha / Bengal Delta',
      distanceKm: 420,
      evacuationRecommended: true,
      actionSteps: [
        'Move inland to multi-purpose cyclone shelters immediately.',
        'Board all glass windows and secure corrugated roofing.',
        'Disconnect domestic LPG and power supply before vacating.'
      ],
      isRead: false
    },
    {
      id: 'alert-turkey',
      disasterId: 'quake-turkey-72',
      disasterType: 'earthquake',
      title: 'Strong Seismic Aftershock Advisory (M 5.4+)',
      severity: 'high',
      issuedAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
      expectedImpactTime: 'Ongoing Next 24 Hours',
      affectedArea: 'Kahramanmaraş Region',
      distanceKm: 850,
      evacuationRecommended: false,
      actionSteps: [
        'Do not re-enter visibly cracked or tilted brick buildings.',
        'Keep emergency shoes and torches right next to sleeping area.',
        'Stay clear of high masonry chimneys and old balconies.'
      ],
      isRead: false
    },
    {
      id: 'alert-california',
      disasterId: 'wildfire-california-red',
      disasterType: 'wildfire',
      title: 'Mandatory Wildfire Evacuation: Red Ridge Zone',
      severity: 'critical',
      issuedAt: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
      expectedImpactTime: 'Immediate (Evacuate Now)',
      affectedArea: 'Sierra Foothills Corridor',
      distanceKm: 180,
      evacuationRecommended: true,
      actionSteps: [
        'Pack 72-hour Go-Bag and domestic pets into vehicle immediately.',
        'Drive along Highway 41 South with vehicle headlights on.',
        'Close all residential doors and windows to exclude flying embers.'
      ],
      isRead: false
    }
  ]);

  // SOS Dispatches queue (visible in Admin Dashboard)
  const [sosList, setSosList] = useState<SOSDispatch[]>([
    {
      id: 'sos-demo-1',
      userId: 'usr-902',
      userName: 'Karthik Ramanathan',
      phone: '+91 94441 88990',
      countryCode: 'IN',
      coordinates: [20.89, 87.18],
      locationAddress: 'Kendrapara Coastal Hamlet, Odisha',
      timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      disasterType: 'cyclone',
      nearestDisasterDistanceKm: 18,
      status: 'pending',
      notes: 'Tidal surge encroaching ground floor. 4 family members including elderly grandmother.'
    },
    {
      id: 'sos-demo-2',
      userId: 'usr-311',
      userName: 'Michael Anderson',
      phone: '+1 (559) 302-8812',
      countryCode: 'US',
      coordinates: [37.28, -119.28],
      locationAddress: 'Pine Ridge Access Road, CA',
      timestamp: new Date(Date.now() - 44 * 60 * 1000).toISOString(),
      disasterType: 'wildfire',
      nearestDisasterDistanceKm: 5,
      status: 'dispatched',
      assignedTeam: 'CAL FIRE Engine Crew 42'
    }
  ]);

  // Save profile changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('guardian_user_profile', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  // Ingest live USGS earthquake data feed
  useEffect(() => {
    let mounted = true;
    fetchLiveUSGSEarthquakes().then((liveQuakes) => {
      if (!mounted || liveQuakes.length === 0) return;
      setDisasters((prev) => {
        const existingIds = new Set(prev.map((d) => d.id));
        const newUnique = liveQuakes.filter((q) => !existingIds.has(q.id));
        return [...newUnique, ...prev];
      });
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Handlers
  const handleOpenSOS = (disaster?: DisasterEvent | null) => {
    setSelectedDisasterForSOS(disaster || null);
    setShowSOSModal(true);
  };

  const handleSOSActivated = (dispatch: SOSDispatch) => {
    setSosList((prev) => [dispatch, ...prev]);
  };

  const handleUpdateSOSStatus = (id: string, status: SOSDispatch['status'], team?: string) => {
    setSosList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, assignedTeam: team || s.assignedTeam } : s))
    );
  };

  const handleBroadcastAlert = (newAlert: EarlyWarningAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleUpdateCountry = (updated: CountryEmergencyInfo) => {
    setCountriesList((prev) =>
      prev.map((c) => (c.code === updated.code ? updated : c))
    );
  };

  const handleOpenSafetyForType = (type: DisasterType) => {
    setSafetyInitialType(type);
    setCurrentTab('safety');
  };

  const handleAddSimulatedAlert = () => {
    const types: DisasterType[] = ['earthquake', 'flood', 'wildfire', 'cyclone', 'tsunami'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const newAlert: EarlyWarningAlert = {
      id: `alert-${Date.now()}`,
      disasterId: `disaster-${Date.now()}`,
      disasterType: randomType,
      title: `Emergency Early Warning: Sudden ${randomType.toUpperCase()} Detected`,
      severity: 'critical',
      issuedAt: new Date().toISOString(),
      expectedImpactTime: 'Imminent (Next 30 Minutes)',
      affectedArea: `${userProfile.location?.city || 'Your Metro'} Sector North`,
      distanceKm: Math.floor(Math.random() * 45) + 5,
      evacuationRecommended: true,
      actionSteps: [
        'Immediate life safety actions required.',
        'Avoid elevators and proceed to designated assembly ground.',
        'Keep mobile battery charged and monitor local disaster radio.'
      ],
      isRead: false
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const currentCountry =
    countriesList.find((c) => c.code === userProfile.countryCode) || countriesList[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Floating Viewport Control Bar (Desktop vs Mobile Preview Toggle) */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-300">Guardian Emergency Network</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <span>Routed to:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.name} ({currentCountry.emergencyNumber})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Re-open Onboarding Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowRegistration(true)}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Reset Onboarding
          </button>

          {/* Edit Profile */}
          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{userProfile.fullName.split(' ')[0]}</span>
          </button>

          {/* Viewport Frame Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold ${
                deviceMode === 'desktop' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Full Desktop Screen"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full View</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold ${
                deviceMode === 'mobile' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Device Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile Frame</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container Wrapper */}
      <div
        className={`flex-1 flex flex-col ${
          deviceMode === 'mobile'
            ? 'max-w-[420px] w-full mx-auto my-4 border border-slate-800 rounded-[38px] shadow-2xl overflow-hidden bg-slate-950 relative min-h-[780px] max-h-[90vh]'
            : 'w-full'
        }`}
      >
        {/* Mobile Phone Top Notch / Speaker Grill (Visible only in mobile mode) */}
        {deviceMode === 'mobile' && (
          <div className="bg-slate-950 pt-2 pb-1 px-6 flex items-center justify-between text-[11px] text-slate-400 font-mono border-b border-slate-900 select-none">
            <span>09:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Top Navigation Bar */}
        <TopBar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenSOS={() => handleOpenSOS(null)}
          activeAlertCount={alerts.length}
          countryFlag={currentCountry.flag}
        />

        {/* Tab Views Content */}
        <main
          className={`flex-1 flex flex-col ${
            currentTab === 'map'
              ? 'h-[calc(100vh-105px)] min-h-[560px] overflow-hidden'
              : 'overflow-y-auto pb-18 md:pb-6'
          }`}
        >
          {currentTab === 'map' && (
            <div className="flex-1 w-full h-full min-h-[560px] relative">
              <DisasterMap
                disasters={disasters}
                userProfile={userProfile}
                onSelectDisaster={(d) => {}}
                onOpenSOSWithDisaster={(d) => handleOpenSOS(d)}
                onOpenSafetyForType={handleOpenSafetyForType}
              />
            </div>
          )}

          {currentTab === 'alerts' && (
            <AlertsView
              alerts={alerts}
              userProfile={userProfile}
              onSelectAlert={(a) => {}}
              onOpenSOS={() => handleOpenSOS(null)}
              onAddSimulatedAlert={handleAddSimulatedAlert}
            />
          )}

          {currentTab === 'safety' && (
            <SafetyView
              userProfile={userProfile}
              initialDisasterType={safetyInitialType}
              onLanguageChange={(lang) => setUserProfile((p) => ({ ...p, language: lang }))}
              onOpenSOS={() => handleOpenSOS(null)}
            />
          )}

          {currentTab === 'admin' && (
            <AdminDashboard
              sosList={sosList}
              onUpdateSOSStatus={handleUpdateSOSStatus}
              onBroadcastAlert={handleBroadcastAlert}
              countries={countriesList}
              onUpdateCountry={handleUpdateCountry}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation Bar (Hidden on desktop) */}
        <BottomNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenSOS={() => handleOpenSOS(null)}
          activeAlertCount={alerts.length}
        />
      </div>

      {/* REGISTRATION & ONBOARDING MODAL */}
      <RegistrationModal
        isOpen={showRegistration}
        onComplete={(newProfile) => {
          setUserProfile(newProfile);
          setShowRegistration(false);
        }}
        initialProfile={userProfile}
      />

      {/* SOS EMERGENCY ROUTING MODAL */}
      <SOSModal
        isOpen={showSOSModal}
        onClose={() => setShowSOSModal(false)}
        userProfile={userProfile}
        activeDisaster={selectedDisasterForSOS}
        onSOSActivated={handleSOSActivated}
      />

      {/* PROFILE & EMERGENCY ICE MODAL */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        userProfile={userProfile}
        onSaveProfile={(updated) => setUserProfile(updated)}
      />
    </div>
  );
}
