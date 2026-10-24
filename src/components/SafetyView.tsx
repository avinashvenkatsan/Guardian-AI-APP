import React, { useState, useEffect } from 'react';
import { DisasterType, UserProfile, ShelterFacility } from '../types';
import { SAFETY_GUIDES, GO_BAG_CHECKLIST } from '../data/safetyGuides';
import { SHELTERS } from '../data/shelters';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Briefcase,
  Hospital,
  Home,
  Languages,
  Activity,
  Flame,
  Wind,
  Droplets,
  Waves,
  Mountain,
  TriangleAlert,
  Sun,
  ExternalLink,
  Phone
} from 'lucide-react';

interface Props {
  userProfile: UserProfile;
  initialDisasterType?: DisasterType;
  onLanguageChange: (lang: 'en' | 'ta' | 'es' | 'hi') => void;
  onOpenSOS: () => void;
}

export const SafetyView: React.FC<Props> = ({
  userProfile,
  initialDisasterType = 'earthquake',
  onLanguageChange,
  onOpenSOS
}) => {
  const [selectedDisasterId, setSelectedDisasterId] = useState<DisasterType>(initialDisasterType);
  const [activeTab, setActiveTab] = useState<'precautions' | 'checklist' | 'shelters'>('precautions');
  const [timePhase, setTimePhase] = useState<'before' | 'during' | 'after'>('during');

  // Go-Bag checklist state with localStorage persistence
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('guardian_go_bag');
      return saved ? JSON.parse(saved) : { water: true, torch: true, powerbank: true };
    } catch {
      return { water: true, torch: true, powerbank: true };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('guardian_go_bag', JSON.stringify(checkedItems));
    } catch {}
  }, [checkedItems]);

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedGuide =
    SAFETY_GUIDES.find((g) => g.id === selectedDisasterId) || SAFETY_GUIDES[0];

  const currentPhaseContent = selectedGuide[timePhase];

  const getTranslatedName = (guide: typeof selectedGuide) => {
    const lang = userProfile.language || 'en';
    return guide.nameTranslated[lang] || guide.name;
  };

  const getDisasterIcon = (id: DisasterType) => {
    switch (id) {
      case 'earthquake':
        return <Activity className="w-4 h-4" />;
      case 'wildfire':
        return <Flame className="w-4 h-4" />;
      case 'cyclone':
        return <Wind className="w-4 h-4" />;
      case 'flood':
        return <Droplets className="w-4 h-4" />;
      case 'tsunami':
        return <Waves className="w-4 h-4" />;
      case 'volcano':
        return <TriangleAlert className="w-4 h-4" />;
      case 'landslide':
        return <Mountain className="w-4 h-4" />;
      case 'drought':
        return <Sun className="w-4 h-4" />;
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / GO_BAG_CHECKLIST.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header & Multilingual Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span>Safety Guide & Preparedness</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Offline-cached disaster survival protocols, emergency checklists, and relief centers
          </p>
        </div>

        {/* Language Selector Dropdown (English, Tamil, Spanish, Hindi) */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl px-3 py-1.5 self-start">
          <Languages className="w-4 h-4 text-slate-400" />
          <select
            value={userProfile.language || 'en'}
            onChange={(e) => onLanguageChange(e.target.value as any)}
            className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-slate-900">English (EN)</option>
            <option value="ta" className="bg-slate-900">தமிழ் (Tamil)</option>
            <option value="es" className="bg-slate-900">Español (ES)</option>
            <option value="hi" className="bg-slate-900">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('precautions')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'precautions'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Disaster Guidance</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'checklist'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Go-Bag Checklist ({checkedCount}/{GO_BAG_CHECKLIST.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('shelters')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 ${
            activeTab === 'shelters'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Hospital className="w-3.5 h-3.5" />
          <span>Shelters & Hospitals</span>
        </button>
      </div>

      {/* TAB 1: DISASTER GUIDANCE */}
      {activeTab === 'precautions' && (
        <div className="space-y-6">
          {/* Horizontal Scroller of Disaster Types */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {SAFETY_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedDisasterId(guide.id)}
                className={`px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 border transition-all ${
                  selectedDisasterId === guide.id
                    ? 'bg-slate-800 text-white border-emerald-500 shadow-lg'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {getDisasterIcon(guide.id)}
                <span>{getTranslatedName(guide)}</span>
              </button>
            ))}
          </div>

          {/* Time Phase Switcher (Before / During / After) */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl text-center">
            <button
              type="button"
              onClick={() => setTimePhase('before')}
              className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                timePhase === 'before'
                  ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Before (Prep)
            </button>
            <button
              type="button"
              onClick={() => setTimePhase('during')}
              className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                timePhase === 'during'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. During (Immediate Action)
            </button>
            <button
              type="button"
              onClick={() => setTimePhase('after')}
              className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                timePhase === 'after'
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/30 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. After (Recovery)
            </button>
          </div>

          {/* Phase Card: Title & Description */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                <span>{getTranslatedName(selectedGuide)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-bold">{timePhase.toUpperCase()} PROTOCOL</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{currentPhaseContent.title}</h2>
              <p className="text-xs text-slate-300 mt-1">{currentPhaseContent.description}</p>
            </div>

            {/* Dos and Don'ts Split Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DO's Box */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>DO'S (Crucial Actions)</span>
                </div>
                <ul className="space-y-2">
                  {currentPhaseContent.dos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DONT's Box */}
              <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>DON'TS (Avoid at all costs)</span>
                </div>
                <ul className="space-y-2">
                  {currentPhaseContent.donts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                      <span className="text-red-400 font-bold">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GO-BAG EMERGENCY CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">72-Hour Survival Go-Bag Checklist</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Keep these packed in a waterproof backpack by your door for rapid evacuation.
              </p>
            </div>
            {/* Readiness Score */}
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-emerald-400">{progressPercent}%</span>
              <div className="text-[10px] uppercase font-bold text-slate-400">Survival Readiness</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {GO_BAG_CHECKLIST.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-colors ${
                    isChecked
                      ? 'bg-slate-950/80 border-emerald-500/40 text-slate-100'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-700 bg-slate-900'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span>{item.category}</span>
                      {item.essential && (
                        <>
                          <span>·</span>
                          <span className="text-red-400 uppercase font-bold">Essential</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: RELIEF SHELTERS & HOSPITALS */}
      {activeTab === 'shelters' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl">
            <h2 className="text-base font-bold text-white">Designated Evacuation Shelters & Trauma Centers</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Reinforced government shelters and Level-1 medical facilities equipped with generator power and emergency food reserves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SHELTERS.map((s) => (
              <div key={s.id} className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 ${
                        s.type === 'hospital' ? 'bg-emerald-600' : 'bg-blue-600'
                      }`}
                    >
                      {s.type === 'hospital' ? <Hospital className="w-5 h-5" /> : <Home className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{s.name}</h3>
                      <p className="text-xs text-slate-400">{s.address}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold uppercase shrink-0">
                    Open
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Capacity</span>
                    <span className="font-bold text-white font-mono">
                      {s.occupancy} / {s.capacity} occupied
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Emergency Phone</span>
                    <a href={`tel:${s.contactNumber}`} className="font-bold text-blue-400 font-mono hover:underline">
                      {s.contactNumber}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {s.services.map((svc, idx) => (
                    <span key={idx} className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
