import React, { useState } from 'react';
import { UserProfile, CountryEmergencyInfo } from '../types';
import { COUNTRIES } from '../data/countries';
import { User, Phone, MapPin, Heart, Shield, X, Check, WifiOff } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export const ProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile
}) => {
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [phone, setPhone] = useState(userProfile.phone);
  const [bloodType, setBloodType] = useState(userProfile.bloodType || 'O+');
  const [allergies, setAllergies] = useState(userProfile.allergies || '');
  const [contactName, setContactName] = useState(userProfile.emergencyContacts[0]?.name || '');
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContacts[0]?.phone || '');
  const [lowBandwidth, setLowBandwidth] = useState(userProfile.lowBandwidthMode);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      fullName,
      phone,
      bloodType,
      allergies,
      lowBandwidthMode: lowBandwidth,
      emergencyContacts: [
        {
          id: userProfile.emergencyContacts[0]?.id || 'ice-1',
          name: contactName,
          relation: 'Next of Kin',
          phone: contactPhone
        }
      ]
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Emergency Profile & ICE</h2>
              <p className="text-[11px] text-slate-400">Locally encrypted for SOS dispatch</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Registered Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white"
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
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Medical Notes</label>
              <input
                type="text"
                placeholder="e.g. Diabetic, Asthma"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Primary ICE (In Case of Emergency) Contact
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="tel"
                placeholder="Contact Phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          {/* Low Bandwidth Mode Toggle */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <WifiOff className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">Low-Bandwidth Mode</div>
                <div className="text-[10px] text-slate-400">Disables animations & saves cellular data</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={lowBandwidth}
              onChange={(e) => setLowBandwidth(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg"
          >
            Save Emergency Profile
          </button>
        </form>
      </div>
    </div>
  );
};
