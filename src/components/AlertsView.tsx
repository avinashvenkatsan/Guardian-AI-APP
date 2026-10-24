import React, { useState } from 'react';
import { EarlyWarningAlert, UserProfile, DisasterType } from '../types';
import { playEmergencyAlarm, stopEmergencyAlarm, playNotificationChime } from '../utils/audioAlert';
import {
  Bell,
  Volume2,
  VolumeX,
  AlertTriangle,
  Flame,
  Wind,
  Droplets,
  Activity,
  Waves,
  Clock,
  ShieldCheck,
  Send,
  Navigation
} from 'lucide-react';

interface Props {
  alerts: EarlyWarningAlert[];
  userProfile: UserProfile;
  onSelectAlert: (alert: EarlyWarningAlert) => void;
  onOpenSOS: () => void;
  onAddSimulatedAlert: () => void;
}

export const AlertsView: React.FC<Props> = ({
  alerts,
  userProfile,
  onSelectAlert,
  onOpenSOS,
  onAddSimulatedAlert
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'evacuation'>('all');
  const [isAlarmTesting, setIsAlarmTesting] = useState(false);

  const handleToggleAlarmTest = () => {
    if (isAlarmTesting) {
      stopEmergencyAlarm();
      setIsAlarmTesting(false);
    } else {
      playEmergencyAlarm();
      setIsAlarmTesting(true);
    }
  };

  const handleSimulateAlert = () => {
    playNotificationChime();
    onAddSimulatedAlert();
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'critical') return a.severity === 'critical';
    if (filter === 'evacuation') return a.evacuationRecommended;
    return true;
  });

  const getDisasterIcon = (type: DisasterType) => {
    switch (type) {
      case 'earthquake':
        return <Activity className="w-4 h-4 text-amber-400" />;
      case 'wildfire':
        return <Flame className="w-4 h-4 text-red-400" />;
      case 'cyclone':
        return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'flood':
        return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'tsunami':
        return <Waves className="w-4 h-4 text-teal-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header & Siren Test Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-red-500" />
            <span>Early Warning Alerts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time disaster predictions and evacuation directives calculated for your coordinates
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Test Emergency Siren Sound Button */}
          <button
            type="button"
            onClick={handleToggleAlarmTest}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 ${
              isAlarmTesting
                ? 'bg-red-600 text-white border-red-500 animate-pulse'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            {isAlarmTesting ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isAlarmTesting ? 'Stop Siren' : 'Test Loud Siren'}</span>
          </button>

          {/* Simulate New Early Warning Broadcast */}
          <button
            type="button"
            onClick={handleSimulateAlert}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-blue-400" />
            <span>Simulate Incoming Alert</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          All Warnings ({alerts.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('critical')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filter === 'critical' ? 'bg-red-600/20 text-red-400 border border-red-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          Critical ({alerts.filter((a) => a.severity === 'critical').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('evacuation')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
            filter === 'evacuation' ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          Evacuation Orders
        </button>
      </div>

      {/* Alerts Feed List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-3xl">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No Active Alerts in this Category</h3>
            <p className="text-xs text-slate-400 mt-1">Your registered perimeter is currently safe.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-3xl border transition-all ${
                alert.severity === 'critical'
                  ? 'bg-slate-900/95 border-red-900/60 shadow-lg shadow-red-950/20'
                  : alert.severity === 'high'
                  ? 'bg-slate-900/80 border-orange-900/50'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                      alert.severity === 'critical'
                        ? 'bg-red-600/20 border border-red-500/30'
                        : alert.severity === 'high'
                        ? 'bg-orange-600/20 border border-orange-500/30'
                        : 'bg-slate-800'
                    }`}
                  >
                    {getDisasterIcon(alert.disasterType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`font-bold uppercase tracking-wider ${
                          alert.severity === 'critical'
                            ? 'text-red-400'
                            : alert.severity === 'high'
                            ? 'text-orange-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {alert.severity} WARNING
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Expected Impact: {alert.expectedImpactTime}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{alert.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Affected Sector: <strong className="text-slate-200">{alert.affectedArea}</strong>
                      {alert.distanceKm && (
                        <span> · <span className="font-mono text-cyan-400">{alert.distanceKm} km</span> from you</span>
                      )}
                    </p>
                  </div>
                </div>

                {alert.evacuationRecommended && (
                  <span className="self-start px-2.5 py-1 rounded-xl text-[11px] font-bold bg-red-600 text-white shrink-0 shadow-sm animate-pulse">
                    MANDATORY EVACUATION
                  </span>
                )}
              </div>

              {/* Action Steps Checklist */}
              <div className="mt-4 p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800/80">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Immediate Action Steps Required:
                </h4>
                <ul className="space-y-1.5">
                  {alert.actionSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-red-400 font-bold shrink-0">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  Issued: {new Date(alert.issuedAt).toLocaleTimeString()} · Verified by Early Warning Satellite Feed
                </div>
                <button
                  type="button"
                  onClick={onOpenSOS}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  SOS from this Sector
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
