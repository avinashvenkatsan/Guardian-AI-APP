import React from 'react';
import { Map, Bell, ShieldAlert, BookOpen, User, Cpu } from 'lucide-react';

interface Props {
  currentTab: 'map' | 'alerts' | 'safety' | 'admin';
  onSelectTab: (tab: 'map' | 'alerts' | 'safety' | 'admin') => void;
  onOpenSOS: () => void;
  activeAlertCount: number;
}

export const BottomNav: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  onOpenSOS,
  activeAlertCount
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-1">
      <div className="grid grid-cols-5 items-center h-14">
        {/* Tab 1: Live Map */}
        <button
          type="button"
          onClick={() => onSelectTab('map')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            currentTab === 'map' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Map</span>
        </button>

        {/* Tab 2: Early Warning Alerts */}
        <button
          type="button"
          onClick={() => onSelectTab('alerts')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            currentTab === 'alerts' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bell className="w-5 h-5" />
          {activeAlertCount > 0 && (
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          )}
          <span className="text-[10px] font-medium tracking-tight mt-1">Alerts</span>
        </button>

        {/* Tab 3 (Center Anchor): Big Emergency SOS Trigger */}
        <button
          type="button"
          onClick={onOpenSOS}
          className="flex flex-col items-center justify-center -mt-4 min-h-[48px] min-w-[48px] group"
        >
          <div className="w-13 h-13 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-900/60 ring-4 ring-slate-950 transition-transform active:scale-90">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-black text-red-400 tracking-wider mt-0.5">SOS</span>
        </button>

        {/* Tab 4: Safety Guide */}
        <button
          type="button"
          onClick={() => onSelectTab('safety')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            currentTab === 'safety' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Safety</span>
        </button>

        {/* Tab 5: Admin Command Center */}
        <button
          type="button"
          onClick={() => onSelectTab('admin')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            currentTab === 'admin' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1">Admin</span>
        </button>
      </div>
    </nav>
  );
};
