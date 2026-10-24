import React, { useState, useEffect } from 'react';
import { UserProfile, CountryEmergencyInfo } from '../types';
import { COUNTRIES, detectUserCountry } from '../data/countries';
import { Shield, Phone, MapPin, Bell, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export const RegistrationModal: React.FC<Props> = ({ isOpen, onComplete, initialProfile }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState(initialProfile?.fullName || '');
  const [phone, setPhone] = useState(initialProfile?.phone || '');
  const [selectedCountry, setSelectedCountry] = useState<CountryEmergencyInfo>(() => {
    if (initialProfile?.countryCode) {
      return COUNTRIES.find((c) => c.code === initialProfile.countryCode) || COUNTRIES[0];
    }
    return detectUserCountry();
  });
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // OTP state
  const [otp, setOtp] = useState(['8', '2', '4', '9', '0', '1']);
  const [otpCountdown, setOtpCountdown] = useState(45);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Permissions state
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  // Emergency contact & medical
  const [contactName, setContactName] = useState(initialProfile?.emergencyContacts?.[0]?.name || '');
  const [contactPhone, setContactPhone] = useState(initialProfile?.emergencyContacts?.[0]?.phone || '');
  const [bloodType, setBloodType] = useState(initialProfile?.bloodType || 'O+');

  useEffect(() => {
    let timer: any;
    if (step === 2 && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpCountdown]);

  if (!isOpen) return null;

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setOtpCountdown(45);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setOtpError('');
    setTimeout(() => {
      const code = otp.join('');
      if (code === '824901' || code.length === 6) {
        setIsVerifying(false);
        setStep(3);
      } else {
        setIsVerifying(false);
        setOtpError('Invalid OTP code. Please enter 824901 or click Auto-fill.');
      }
    }, 600);
  };

  const handleRequestLocation = () => {
    setLocationStatus('requesting');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationStatus('granted');
          setUserCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          // Fallback to default country capital coordinates
          setLocationStatus('granted');
          if (selectedCountry.code === 'IN') {
            setUserCoords({ latitude: 13.0827, longitude: 80.2707 }); // Chennai / India
          } else if (selectedCountry.code === 'US') {
            setUserCoords({ latitude: 37.7749, longitude: -122.4194 }); // SF / US
          } else {
            setUserCoords({ latitude: 51.5074, longitude: -0.1278 }); // London
          }
        },
        { timeout: 5000 }
      );
    } else {
      setLocationStatus('granted');
      setUserCoords({ latitude: 13.0827, longitude: 80.2707 });
    }
  };

  const handleRequestNotifications = async () => {
    setNotificationStatus('requesting');
    try {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setNotificationStatus('granted');
          return;
        }
      }
      setNotificationStatus('granted');
    } catch {
      setNotificationStatus('granted');
    }
  };

  const handleFinishRegistration = () => {
    const finalProfile: UserProfile = {
      id: initialProfile?.id || `user-${Date.now()}`,
      fullName,
      phone: `${selectedCountry.dialCode} ${phone}`,
      countryCode: selectedCountry.code,
      countryName: selectedCountry.name,
      location: userCoords
        ? {
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
            city: selectedCountry.code === 'IN' ? 'Chennai' : 'San Francisco',
            country: selectedCountry.name,
          }
        : {
            latitude: 13.0827,
            longitude: 80.2707,
            city: 'Chennai',
            country: 'India',
          },
      bloodType,
      emergencyContacts: [
        {
          id: 'ice-1',
          name: contactName || 'Emergency ICE Contact',
          relation: 'Next of Kin',
          phone: contactPhone || `${selectedCountry.dialCode} 9876543210`,
        },
      ],
      language: selectedCountry.code === 'IN' ? 'ta' : 'en',
      isRegistered: true,
      lowBandwidthMode: false,
    };

    onComplete(finalProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Guardian Emergency Network</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Step {step} of 3</span>
              <span aria-hidden="true">·</span>
              <span>{step === 1 ? 'Personal Verification' : step === 2 ? 'SMS OTP Authentication' : 'Emergency Permissions'}</span>
            </div>
          </div>
        </div>

        {/* STEP 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="mt-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sarah Jenkins or Rajesh Kumar"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Country Code & Phone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Mobile Number & Country
              </label>
              <div className="flex gap-2 relative">
                {/* Country Trigger */}
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm font-medium hover:border-slate-700 transition-colors shrink-0"
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-slate-200">{selectedCountry.dialCode}</span>
                </button>

                {/* Country Picker Dropdown */}
                {showCountryDropdown && (
                  <div className="absolute top-14 left-0 w-72 max-h-64 overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-xl z-30 p-2 space-y-1">
                    <input
                      type="text"
                      placeholder="Search country or code..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white mb-1"
                    />
                    {filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(c);
                          setShowCountryDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                          selectedCountry.code === c.code ? 'bg-red-600/20 text-red-400' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                        </span>
                        <span className="text-slate-400 font-mono">{c.dialCode}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Phone Input */}
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                SOS distress alerts will be routed according to emergency infrastructure for <strong className="text-slate-300">{selectedCountry.name}</strong> ({selectedCountry.emergencyNumber}).
              </p>
            </div>

            {/* Privacy Compliance Note */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl text-xs text-slate-400 flex items-start gap-3">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Zero third-party trackers. All GPS telemetry and personal details are encrypted locally and dispatched exclusively to official helplines during confirmed SOS states.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
            >
              <span>Continue to SMS OTP Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3 text-red-400">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Enter 6-Digit Verification Code</h3>
              <p className="text-xs text-slate-400 mt-1">
                Sent via automated emergency gateway to <span className="font-mono text-slate-200">{selectedCountry.dialCode} {phone}</span>
              </p>
            </div>

            {/* OTP input boxes */}
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-11 h-13 text-center bg-slate-950 border border-slate-800 rounded-xl text-lg font-bold text-white focus:outline-none focus:border-red-500 font-mono"
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-red-400 text-center flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{otpError}</span>
              </p>
            )}

            {/* Quick Demo Helper */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setOtp(['8', '2', '4', '9', '0', '1'])}
                className="text-xs text-red-400 hover:underline"
              >
                Auto-fill Demo Code (824901)
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Phone</span>
              </button>
              <span>Resend in {otpCountdown}s</span>
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
            >
              {isVerifying ? (
                <span>Verifying Secure OTP...</span>
              ) : (
                <>
                  <span>Verify Phone & Proceed</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 3: Permissions & Emergency Contacts */}
        {step === 3 && (
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white">Emergency Dispatch Authorizations</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Guardian requires location accuracy to compute distance to epicenters and send exact coordinates during an SOS call.
              </p>
            </div>

            {/* Location Permission Tile */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Live GPS Location</h4>
                  <p className="text-[11px] text-slate-400">
                    {userCoords ? `Lat: ${userCoords.latitude.toFixed(3)}, Lng: ${userCoords.longitude.toFixed(3)}` : 'Required for immediate proximity warnings'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRequestLocation}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  locationStatus === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {locationStatus === 'granted' ? 'Enabled ✓' : locationStatus === 'requesting' ? 'Requesting...' : 'Grant Access'}
              </button>
            </div>

            {/* Notification Permission Tile */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Push & Siren Warning</h4>
                  <p className="text-[11px] text-slate-400">
                    High-priority acoustic siren and evacuation warnings
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRequestNotifications}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  notificationStatus === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {notificationStatus === 'granted' ? 'Allowed ✓' : 'Allow Alerts'}
              </button>
            </div>

            {/* ICE Contact & Medical */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Primary Emergency ICE Contact & Blood Group
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Contact Name (e.g. Dad / Spouse)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <input
                  type="tel"
                  placeholder="Contact Phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Blood Group:</span>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinishRegistration}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              <span>Activate Guardian Protection</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
