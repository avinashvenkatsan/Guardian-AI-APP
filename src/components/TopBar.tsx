import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';

interface Props {
  currentTab: 'map' | 'alerts' | 'safety' | 'admin';
  onSelectTab: (tab: 'map' | 'alerts' | 'safety' | 'admin') => void;
  onOpenSOS: () => void;
  activeAlertCount: number;
  countryFlag: string;
}

export const TopBar: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  onOpenSOS,
  activeAlertCount,
  countryFlag
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-4 md:px-8 py-3.5 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-950/60">
          <Shield className="w-4 h-4" />
        </div>
        <button
          type="button"
          onClick={() => onSelectTab('map')}
          className="text-lg font-bold tracking-tight text-white hover:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <span>Guardian</span>
          <span className="text-xs font-normal text-slate-400 font-mono">SOS</span>
        </button>
      </div>

      {/* Zone 2: Clean single-line emergency navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
        <button
          type="button"
          onClick={() => onSelectTab('map')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'map' ? 'text-white underline underline-offset-8 decoration-red-500' : ''
          }`}
        >
          Live Map
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('alerts')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            currentTab === 'alerts' ? 'text-white underline underline-offset-8 decoration-red-500' : ''
          }`}
        >
          <span>Alerts</span>
          {activeAlertCount > 0 && (
            <span className="text-[10px] font-mono text-red-400 bg-red-950/80 border border-red-800/80 px-1.5 py-0.2 rounded-md">
              {activeAlertCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('safety')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'safety' ? 'text-white underline underline-offset-8 decoration-emerald-500' : ''
          }`}
        >
          Safety Guide
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('admin')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            currentTab === 'admin' ? 'text-white underline underline-offset-8 decoration-blue-500' : ''
          }`}
        >
          Admin Ops
        </button>
      </nav>

      {/* Zone 3: Emergency Primary Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="hidden sm:inline-block text-base" title="Detected Emergency Country">
          {countryFlag}
        </span>

        {/* One-Tap SOS */}
        <button
          type="button"
          onClick={onOpenSOS}
          className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-md shadow-red-950/80 flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 animate-pulse"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>One-Tap SOS</span>
        </button>
      </div>
    </header>
  );
};
