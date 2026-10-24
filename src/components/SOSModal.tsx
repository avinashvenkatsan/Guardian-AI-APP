import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, DisasterEvent, SOSDispatch } from '../types';
import { getCountryByCode } from '../data/countries';
import { playEmergencyAlarm, stopEmergencyAlarm } from '../utils/audioAlert';
import {
  ShieldAlert,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle,
  X,
  Volume2,
  VolumeX,
  Radio,
  ExternalLink,
  Users
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  activeDisaster?: DisasterEvent | null;
  onSOSActivated: (dispatch: SOSDispatch) => void;
}

export const SOSModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProfile,
  activeDisaster,
  onSOSActivated
}) => {
  // Activation mode: 'hold_confirm' -> 'countdown' -> 'activated'
  const [stage, setStage] = useState<'hold' | 'activated'>('hold');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef<any>(null);

  const [alarmActive, setAlarmActive] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);
  const [contactNotified, setContactNotified] = useState(false);

  const countryInfo = getCountryByCode(userProfile.countryCode || 'IN');
  const userLat = userProfile.location?.latitude ?? 13.0827;
  const userLng = userProfile.location?.longitude ?? 80.2707;

  useEffect(() => {
    if (!isOpen) {
      setStage('hold');
      setHoldProgress(0);
      setIsHolding(false);
      stopEmergencyAlarm();
      setAlarmActive(false);
    }
  }, [isOpen]);

  // Hold-to-activate logic (3000ms hold)
  const handleStartHold = () => {
    setIsHolding(true);
    const stepMs = 30;
    const totalMs = 2400; // 2.4 seconds for fast panic response
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        const next = prev + (stepMs / totalMs) * 100;
        if (next >= 100) {
          clearInterval(holdIntervalRef.current);
          triggerDistressActivation();
          return 100;
        }
        return next;
      });
    }, stepMs);
  };

  const handleEndHold = () => {
    if (stage === 'activated') return;
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setHoldProgress(0);
  };

  const triggerDistressActivation = () => {
    setStage('activated');
    setAlarmActive(true);
    playEmergencyAlarm();

    const dispatchRecord: SOSDispatch = {
      id: `sos-${Date.now()}`,
      userId: userProfile.id || 'usr-1',
      userName: userProfile.fullName || 'Citizen User',
      phone: userProfile.phone || countryInfo.emergencyNumber,
      countryCode: countryInfo.code,
      coordinates: [userLat, userLng],
      locationAddress: `${userProfile.location?.city || 'Local Metro'}, ${countryInfo.name}`,
      timestamp: new Date().toISOString(),
      disasterType: activeDisaster?.type || 'earthquake',
      nearestDisasterDistanceKm: activeDisaster ? 45 : undefined,
      status: 'pending',
      notes: 'Automated 1-Tap SOS distress signal transmitted by mobile client.'
    };

    onSOSActivated(dispatchRecord);
  };

  const toggleAlarmSiren = () => {
    if (alarmActive) {
      stopEmergencyAlarm();
      setAlarmActive(false);
    } else {
      playEmergencyAlarm();
      setAlarmActive(true);
    }
  };

  const handleCopyCoordinates = () => {
    const text = `SOS GPS: ${userLat.toFixed(5)}, ${userLng.toFixed(5)} (${countryInfo.name})`;
    navigator.clipboard.writeText(text);
    setCopiedLocation(true);
    setTimeout(() => setCopiedLocation(false), 2500);
  };

  // Pre-formatted emergency SMS
  const emergencySmsText = encodeURIComponent(
    `EMERGENCY SOS: I need urgent rescue! Name: ${userProfile.fullName || 'Citizen'}, Phone: ${userProfile.phone}. GPS Location: https://maps.google.com/?q=${userLat},${userLng} (${userLat.toFixed(4)}, ${userLng.toFixed(4)}). Threat: ${activeDisaster ? activeDisaster.title : 'Natural Disaster Hazard'}. Blood Type: ${userProfile.bloodType || 'Unknown'}.`
  );

  const handleNotifyContacts = () => {
    setContactNotified(true);
    // Open SMS app with pre-filled message
    window.location.href = `sms:?body=${emergencySmsText}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-red-900/50 rounded-3xl p-6 text-slate-100 shadow-2xl relative overflow-hidden">
        {/* Urgent red perimeter strobe for activated stage */}
        {stage === 'activated' && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600 animate-pulse" />
        )}

        {/* Modal Close / Cancel */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">{countryInfo.flag}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {countryInfo.name} Emergency Routing
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              stopEmergencyAlarm();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STAGE 1: Hold to Activate (Panic-proof guard) */}
        {stage === 'hold' && (
          <div className="mt-6 text-center space-y-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">Emergency SOS Trigger</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Press and hold the button for 2 seconds to activate high-priority rescue routing for{' '}
                <strong className="text-white">{countryInfo.name}</strong>.
              </p>
            </div>

            {/* Circular Hold Button */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              {/* Circular SVG Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-red-600 fill-none transition-all duration-75"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={2 * Math.PI * 88 * (1 - holdProgress / 100)}
                  strokeLinecap="round"
                />
              </svg>

              {/* Interactive Core Trigger */}
              <button
                type="button"
                onMouseDown={handleStartHold}
                onMouseUp={handleEndHold}
                onMouseLeave={handleEndHold}
                onTouchStart={handleStartHold}
                onTouchEnd={handleEndHold}
                className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-white transition-all select-none shadow-2xl ${
                  isHolding
                    ? 'scale-95 bg-red-700 shadow-red-900/80 ring-4 ring-red-500/50'
                    : 'bg-red-600 hover:bg-red-500 shadow-red-950/60'
                }`}
              >
                <ShieldAlert className="w-10 h-10 mb-1" />
                <span className="text-xl font-black tracking-widest">SOS</span>
                <span className="text-[10px] uppercase font-bold text-red-200 mt-0.5">
                  {isHolding ? 'HOLDING...' : 'HOLD 2s'}
                </span>
              </button>
            </div>

            {/* Instant Quick Trigger for severe distress */}
            <div className="pt-2">
              <button
                type="button"
                onClick={triggerDistressActivation}
                className="text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
              >
                Immediate Single-Tap Trigger (Bypass Hold)
              </button>
            </div>

            {/* Safety Pre-Check info */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-left text-xs space-y-1">
              <div className="text-slate-400">Target Emergency Number: <strong className="text-white font-mono">{countryInfo.emergencyNumber}</strong></div>
              <div className="text-slate-400">Disaster Authority: <strong className="text-slate-200">{countryInfo.agencyName}</strong></div>
              <div className="text-slate-400">GPS Fix: <span className="font-mono text-emerald-400">{userLat.toFixed(4)}, {userLng.toFixed(4)}</span></div>
            </div>
          </div>
        )}

        {/* STAGE 2: ACTIVATED RESCUE MODE */}
        {stage === 'activated' && (
          <div className="mt-4 space-y-4">
            {/* Distress Banner */}
            <div className="p-4 bg-red-950/80 border border-red-600/60 rounded-2xl flex items-center justify-between gap-3 shadow-lg shadow-red-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 animate-bounce">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    DISTRESS SIGNAL BROADCASTING
                  </h3>
                  <p className="text-[11px] text-red-300">
                    Dispatched to Guardian Admin Ops & Emergency Queue
                  </p>
                </div>
              </div>

              {/* Siren Audio Toggle */}
              <button
                type="button"
                onClick={toggleAlarmSiren}
                className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                  alarmActive
                    ? 'bg-red-600 text-white border-red-500 animate-pulse'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Toggle Emergency Siren Alarm"
              >
                {alarmActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{alarmActive ? 'Mute' : 'Siren'}</span>
              </button>
            </div>

            {/* DIRECT EMERGENCY DIALERS (Country-Based Routing) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Emergency Helplines ({countryInfo.name})
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {/* Primary National Emergency (112, 911, 999) */}
                <a
                  href={`tel:${countryInfo.emergencyNumber}`}
                  className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-red-950/40 transition-colors"
                >
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-base font-black font-mono">CALL {countryInfo.emergencyNumber}</span>
                  <span className="text-[10px] text-red-100 font-medium">National Emergency</span>
                </a>

                {/* Specialized Disaster Helpline (NDRF 1078, FEMA, SES) */}
                <a
                  href={`tel:${countryInfo.disasterHelpline}`}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl flex flex-col items-center justify-center text-center border border-slate-700 transition-colors"
                >
                  <ShieldAlert className="w-5 h-5 mb-1 text-amber-400" />
                  <span className="text-base font-black font-mono">{countryInfo.disasterHelpline}</span>
                  <span className="text-[10px] text-slate-300 font-medium">Disaster Helpline</span>
                </a>
              </div>
            </div>

            {/* OFFLINE FALLBACK & CONTACTS */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Offline SMS & Contact Dispatch
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {/* Pre-composed SMS with GPS */}
                <a
                  href={`sms:${countryInfo.emergencyNumber}?body=${emergencySmsText}`}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-2.5 text-xs text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <div className="font-bold">Offline SMS Dispatch</div>
                    <div className="text-[10px] text-slate-400">No internet required</div>
                  </div>
                </a>

                {/* Notify Saved ICE Contacts */}
                <button
                  type="button"
                  onClick={handleNotifyContacts}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-2.5 text-xs text-white transition-colors text-left"
                >
                  <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold">Notify ICE Contacts</div>
                    <div className="text-[10px] text-slate-400">
                      {contactNotified ? 'Dispatched ✓' : 'Send GPS & Status'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* GPS Telemetry Box with Copy */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-mono text-slate-200">
                  {userLat.toFixed(5)}, {userLng.toFixed(5)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCoordinates}
                className="text-[11px] font-semibold text-slate-400 hover:text-white"
              >
                {copiedLocation ? 'Copied ✓' : 'Copy GPS'}
              </button>
            </div>

            {/* Mark Safe / Deactivate Button */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Danger passed or false alarm?
              </span>
              <button
                type="button"
                onClick={() => {
                  stopEmergencyAlarm();
                  setStage('hold');
                  onClose();
                }}
                className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>I Am Safe / Stand Down</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
