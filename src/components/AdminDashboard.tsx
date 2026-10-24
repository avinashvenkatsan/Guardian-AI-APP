import React, { useState } from 'react';
import { SOSDispatch, EarlyWarningAlert, DisasterType, SeverityLevel, CountryEmergencyInfo } from '../types';
import { COUNTRIES } from '../data/countries';
import {
  ShieldAlert,
  Send,
  Radio,
  Users,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  AlertTriangle,
  Settings,
  Plus
} from 'lucide-react';

interface Props {
  sosList: SOSDispatch[];
  onUpdateSOSStatus: (id: string, status: SOSDispatch['status'], team?: string) => void;
  onBroadcastAlert: (alert: EarlyWarningAlert) => void;
  countries: CountryEmergencyInfo[];
  onUpdateCountry: (updated: CountryEmergencyInfo) => void;
}

export const AdminDashboard: React.FC<Props> = ({
  sosList,
  onUpdateSOSStatus,
  onBroadcastAlert,
  countries,
  onUpdateCountry
}) => {
  const [activeTab, setActiveTab] = useState<'sos_queue' | 'broadcast' | 'country_helplines'>('sos_queue');

  // Broadcast Alert Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastType, setBroadcastType] = useState<DisasterType>('cyclone');
  const [broadcastSeverity, setBroadcastSeverity] = useState<SeverityLevel>('critical');
  const [broadcastArea, setBroadcastArea] = useState('');
  const [broadcastTime, setBroadcastTime] = useState('Within 2 Hours');
  const [broadcastEvacuation, setBroadcastEvacuation] = useState(true);
  const [broadcastSentMessage, setBroadcastSentMessage] = useState(false);

  // Country manager state
  const [selectedCountryCode, setSelectedCountryCode] = useState('IN');
  const [editingEmergencyNum, setEditingEmergencyNum] = useState('');
  const [editingHelpline, setEditingHelpline] = useState('');

  const currentCountry = countries.find((c) => c.code === selectedCountryCode) || countries[0];

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastArea.trim()) return;

    const newAlert: EarlyWarningAlert = {
      id: `alert-admin-${Date.now()}`,
      disasterId: `disaster-${Date.now()}`,
      disasterType: broadcastType,
      title: broadcastTitle,
      severity: broadcastSeverity,
      issuedAt: new Date().toISOString(),
      expectedImpactTime: broadcastTime,
      affectedArea: broadcastArea,
      evacuationRecommended: broadcastEvacuation,
      actionSteps: [
        'Move immediately to designated concrete cyclone / disaster shelter.',
        'Follow instructions issued by local Civil Defence and Police personnel.',
        'Conserve mobile battery for emergency broadcasts only.'
      ],
      isRead: false
    };

    onBroadcastAlert(newAlert);
    setBroadcastSentMessage(true);
    setBroadcastTitle('');
    setBroadcastArea('');
    setTimeout(() => setBroadcastSentMessage(false), 3000);
  };

  const handleSaveCountryHelplines = () => {
    if (!currentCountry) return;
    onUpdateCountry({
      ...currentCountry,
      emergencyNumber: editingEmergencyNum || currentCountry.emergencyNumber,
      disasterHelpline: editingHelpline || currentCountry.disasterHelpline
    });
    alert(`Updated helplines for ${currentCountry.name} successfully!`);
  };

  const pendingCount = sosList.filter((s) => s.status === 'pending').length;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Live Operations Control
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Guardian Admin Command Center
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('sos_queue')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'sos_queue'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS Queue ({pendingCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('broadcast')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'broadcast'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast Early Warning</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('country_helplines')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === 'country_helplines'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Country Helplines</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Active SOS Beacons</div>
          <div className="text-2xl font-black font-mono text-red-500 mt-1">{pendingCount}</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Handled SOS</div>
          <div className="text-2xl font-black font-mono text-white mt-1">{sosList.length}</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Monitored Countries</div>
          <div className="text-2xl font-black font-mono text-cyan-400 mt-1">{countries.length}</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">System Gateway</div>
          <div className="text-sm font-bold text-emerald-400 font-mono mt-2">OPERATIONAL 100%</div>
        </div>
      </div>

      {/* TAB 1: SOS QUEUE */}
      {activeTab === 'sos_queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Live Citizen Distress Signals</h2>
            <span className="text-xs text-slate-400">Updates automatically via socket queue</span>
          </div>

          {sosList.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white">No Pending Distress Beacons</h3>
              <p className="text-xs text-slate-400 mt-1">All incoming SOS signals have been acknowledged and resolved.</p>
            </div>
          ) : (
            sosList.map((sos) => (
              <div
                key={sos.id}
                className={`p-5 rounded-3xl border transition-all ${
                  sos.status === 'pending'
                    ? 'bg-slate-900 border-red-800/80 shadow-lg shadow-red-950/20'
                    : sos.status === 'dispatched'
                    ? 'bg-slate-900/80 border-amber-800/60'
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold uppercase ${
                          sos.status === 'pending'
                            ? 'bg-red-600 text-white animate-pulse'
                            : sos.status === 'dispatched'
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {sos.status}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 font-mono">
                        {new Date(sos.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300 font-bold">{sos.countryCode}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-1.5">{sos.userName}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
                      <a href={`tel:${sos.phone}`} className="flex items-center gap-1 text-blue-400 hover:underline font-mono">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{sos.phone}</span>
                      </a>
                      <div className="flex items-center gap-1 font-mono text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>{sos.coordinates[0].toFixed(4)}, {sos.coordinates[1].toFixed(4)} ({sos.locationAddress})</span>
                      </div>
                    </div>

                    {sos.notes && (
                      <p className="text-xs text-slate-400 mt-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        {sos.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions for this SOS */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    {sos.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => onUpdateSOSStatus(sos.id, 'dispatched', 'NDRF Unit 7 / Local EMS')}
                        className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors shadow"
                      >
                        Dispatch Rescue Team
                      </button>
                    )}
                    {sos.status === 'dispatched' && (
                      <button
                        type="button"
                        onClick={() => onUpdateSOSStatus(sos.id, 'resolved')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow"
                      >
                        Mark Citizen Safe
                      </button>
                    )}
                    <a
                      href={`https://maps.google.com/?q=${sos.coordinates[0]},${sos.coordinates[1]}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl text-center border border-slate-700"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: BROADCAST EARLY WARNING */}
      {activeTab === 'broadcast' && (
        <form onSubmit={handleSendBroadcast} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-5">
          <div>
            <h2 className="text-lg font-bold text-white">Broadcast Emergency Early Warning</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instantly sends push notifications and high-decibel audible sirens to all users within the affected danger perimeter.
            </p>
          </div>

          {broadcastSentMessage && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Broadcast alert dispatched successfully across emergency push networks!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Alert Directive Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Flash Flood Evacuation Notice - Sector 4"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Hazard Type & Threat Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={broadcastType}
                  onChange={(e) => setBroadcastType(e.target.value as DisasterType)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="cyclone">Cyclone / Storm</option>
                  <option value="flood">Flood</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="wildfire">Wildfire</option>
                  <option value="tsunami">Tsunami</option>
                  <option value="volcano">Volcano</option>
                </select>

                <select
                  value={broadcastSeverity}
                  onChange={(e) => setBroadcastSeverity(e.target.value as SeverityLevel)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="critical">Critical (Red Siren)</option>
                  <option value="high">High (Orange Alert)</option>
                  <option value="moderate">Moderate Watch</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Affected Geographical Zone
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Coastal Odisha & Sunderbans Delta"
                value={broadcastArea}
                onChange={(e) => setBroadcastArea(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Expected Time of Impact
              </label>
              <input
                type="text"
                required
                placeholder="e.g. In 45 Minutes / 18:00 Local"
                value={broadcastTime}
                onChange={(e) => setBroadcastTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="evacCheck"
              checked={broadcastEvacuation}
              onChange={(e) => setBroadcastEvacuation(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 bg-slate-950 border-slate-800"
            />
            <label htmlFor="evacCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
              Trigger Mandatory Evacuation Order with Loud Warning Siren
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Transmit Mass Emergency Broadcast</span>
          </button>
        </form>
      )}

      {/* TAB 3: COUNTRY HELPLINES CONFIGURATION */}
      {activeTab === 'country_helplines' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Country Emergency Directory & Routing Config</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize local SOS numbers and national disaster authority agencies mapped to user country codes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-400">Select Country:</label>
            <select
              value={selectedCountryCode}
              onChange={(e) => {
                setSelectedCountryCode(e.target.value);
                const c = countries.find((item) => item.code === e.target.value);
                if (c) {
                  setEditingEmergencyNum(c.emergencyNumber);
                  setEditingHelpline(c.disasterHelpline);
                }
              }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.dialCode})
                </option>
              ))}
            </select>
          </div>

          {currentCountry && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Primary National Emergency Number
                  </label>
                  <input
                    type="text"
                    defaultValue={currentCountry.emergencyNumber}
                    onChange={(e) => setEditingEmergencyNum(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500">e.g. 112 in India/Europe, 911 in USA</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Disaster Management Agency Helpline
                  </label>
                  <input
                    type="text"
                    defaultValue={currentCountry.disasterHelpline}
                    onChange={(e) => setEditingHelpline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500">e.g. NDRF 1078 in India, FEMA in USA</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Designated Emergency Authority
                </label>
                <div className="text-xs text-white font-semibold">{currentCountry.agencyName}</div>
                <a
                  href={currentCountry.agencyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:underline"
                >
                  {currentCountry.agencyWebsite}
                </a>
              </div>

              <button
                type="button"
                onClick={handleSaveCountryHelplines}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Save Country Helpline Settings
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
