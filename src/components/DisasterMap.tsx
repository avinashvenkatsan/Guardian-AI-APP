import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { DisasterEvent, DisasterType, SeverityLevel, UserProfile, ShelterFacility } from '../types';
import { calculateDistanceKm } from '../data/disasters';
import { SHELTERS } from '../data/shelters';
import {
  Activity,
  Flame,
  Wind,
  Droplets,
  Waves,
  Mountain,
  TriangleAlert,
  Sun,
  Navigation,
  Filter,
  Layers,
  Hospital,
  Clock,
  ShieldAlert,
  ArrowRight,
  Globe,
  RotateCcw
} from 'lucide-react';

// Fix Leaflet's default icon paths in bundler environments
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  disasters: DisasterEvent[];
  userProfile: UserProfile;
  onSelectDisaster: (disaster: DisasterEvent) => void;
  onOpenSOSWithDisaster: (disaster: DisasterEvent) => void;
  onOpenSafetyForType: (type: DisasterType) => void;
}

type TileProvider = 'dark' | 'osm' | 'satellite';

export const DisasterMap: React.FC<Props> = ({
  disasters,
  userProfile,
  onSelectDisaster,
  onOpenSOSWithDisaster,
  onOpenSafetyForType
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const circlesLayerRef = useRef<L.LayerGroup | null>(null);
  const sheltersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);

  // Filters state - Default to 'all' so all global hazards appear immediately
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [distanceFilter, setDistanceFilter] = useState<'all' | '100' | '500' | '1500'>('all');
  const [showShelters, setShowShelters] = useState(false);
  const [activeDisaster, setActiveDisaster] = useState<DisasterEvent | null>(disasters[0] || null);
  const [tileMode, setTileMode] = useState<TileProvider>('dark');
  const [mapLoaded, setMapLoaded] = useState(false);

  const rawLat = userProfile.location?.latitude;
  const rawLng = userProfile.location?.longitude;
  const userLat = typeof rawLat === 'number' && !isNaN(rawLat) ? rawLat : 13.0827;
  const userLng = typeof rawLng === 'number' && !isNaN(rawLng) ? rawLng : 80.2707;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous instance if re-mounting
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [userLat, userLng],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
      minZoom: 2,
      maxZoom: 18,
    });

    // Create Tile Layer Group according to tileMode
    const tileGroup = createTileLayerGroup(tileMode);
    tileGroup.addTo(map);
    tileLayerRef.current = tileGroup;

    // Zoom control at bottom right to stay clear of filter bar
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer groups for markers
    markersLayerRef.current = L.layerGroup().addTo(map);
    circlesLayerRef.current = L.layerGroup().addTo(map);
    sheltersLayerRef.current = L.layerGroup().addTo(map);
    userMarkerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    setMapLoaded(true);

    // CRITICAL: Force invalidateSize multiple times so container dimensions settle
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);
    const t3 = setTimeout(() => map.invalidateSize(), 1200);

    // ResizeObserver to handle window and frame changes automatically
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resizeObserver) resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Function to create tile layers WITHOUT ANY API KEY REQUIREMENT
  function createTileLayerGroup(mode: TileProvider): L.LayerGroup {
    const group = L.layerGroup();

    if (mode === 'osm') {
      // Standard Free OpenStreetMap
      const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      });
      group.addLayer(osmLayer);
      return group;
    }

    if (mode === 'satellite') {
      // Esri Free World Imagery (No API key required)
      const satLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Tiles © Esri'
        }
      );
      group.addLayer(satLayer);
      return group;
    }

    // Default: Esri World Dark Gray Base + Labels (100% Free, Zero API Keys, No Watermarks!)
    const darkBase = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        attribution: 'Esri, HERE, Garmin, © OpenStreetMap'
      }
    );
    const darkLabels = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        attribution: ''
      }
    );

    group.addLayer(darkBase);
    group.addLayer(darkLabels);
    return group;
  }

  // Handle Tile Provider Switch
  const switchTileProvider = (mode: TileProvider) => {
    setTileMode(mode);
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }
    const newGroup = createTileLayerGroup(mode);
    newGroup.addTo(mapInstanceRef.current);
    tileLayerRef.current = newGroup;
  };

  // Update User Location Beacon
  useEffect(() => {
    if (!mapInstanceRef.current || !userMarkerRef.current) return;
    userMarkerRef.current.clearLayers();

    // Accuracy outer ring
    const radiusRing = L.circle([userLat, userLng], {
      radius: 12000,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.15,
      weight: 1.5,
      dashArray: '4, 4'
    });

    // Pulse core icon
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: `
        <div style="position: relative; width: 22px; height: 22px;">
          <div style="position: absolute; inset: -4px; border-radius: 50%; background: rgba(59, 130, 246, 0.4); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 22px; height: 22px; border-radius: 50%; background: #3b82f6; border: 2.5px solid #ffffff; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);"></div>
        </div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });

    const marker = L.marker([userLat, userLng], { icon: userIcon });
    marker.bindTooltip('Your Live Position', {
      permanent: false,
      direction: 'top',
      className: 'bg-slate-900 text-white text-xs px-2 py-1 rounded shadow'
    });

    userMarkerRef.current.addLayer(radiusRing);
    userMarkerRef.current.addLayer(marker);
  }, [userLat, userLng, mapLoaded]);

  // Filter Disasters
  const filteredDisasters = disasters.filter((d) => {
    if (selectedType !== 'all' && d.type !== selectedType) return false;
    if (selectedSeverity !== 'all' && d.severity !== selectedSeverity) return false;
    if (distanceFilter !== 'all') {
      const dist = calculateDistanceKm(userLat, userLng, d.coordinates[0], d.coordinates[1]);
      if (dist > parseInt(distanceFilter, 10)) return false;
    }
    return true;
  });

  // Render Disaster Markers and Circles
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !circlesLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    circlesLayerRef.current.clearLayers();

    filteredDisasters.forEach((d) => {
      const isSelected = activeDisaster?.id === d.id;

      // Color by severity
      let markerColor = '#06b6d4'; // low
      if (d.severity === 'critical') markerColor = '#ef4444';
      else if (d.severity === 'high') markerColor = '#f97316';
      else if (d.severity === 'moderate') markerColor = '#eab308';

      // Type icon symbol
      let iconSymbol = '⚠️';
      if (d.type === 'earthquake') iconSymbol = '⚡';
      else if (d.type === 'wildfire') iconSymbol = '🔥';
      else if (d.type === 'cyclone') iconSymbol = '🌀';
      else if (d.type === 'flood') iconSymbol = '🌊';
      else if (d.type === 'tsunami') iconSymbol = '🌊';
      else if (d.type === 'volcano') iconSymbol = '🌋';
      else if (d.type === 'landslide') iconSymbol = '⛰️';
      else if (d.type === 'drought') iconSymbol = '☀️';

      const customIcon = L.divIcon({
        className: 'disaster-custom-marker',
        html: `
          <div style="
            position: relative;
            width: ${isSelected ? '38px' : '30px'};
            height: ${isSelected ? '38px' : '30px'};
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: ${markerColor};
            color: #ffffff;
            font-size: ${isSelected ? '16px' : '13px'};
            font-weight: bold;
            box-shadow: 0 0 ${isSelected ? '18px' : '8px'} ${markerColor};
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            ${iconSymbol}
            ${d.severity === 'critical' ? `<span style="position: absolute; inset: -5px; border-radius: 50%; border: 2px solid ${markerColor}; opacity: 0.8; animation: pulse 1.8s infinite;"></span>` : ''}
          </div>
        `,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 19 : 15],
      });

      const marker = L.marker([d.coordinates[0], d.coordinates[1]], { icon: customIcon });

      marker.on('click', () => {
        setActiveDisaster(d);
        onSelectDisaster(d);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([d.coordinates[0], d.coordinates[1]], 6, { duration: 0.8 });
        }
      });

      markersLayerRef.current?.addLayer(marker);

      // Add affected radius circle if selected or high/critical
      if (isSelected || d.severity === 'critical') {
        const radiusMeters = d.affectedRadiusKm * 1000;
        const circle = L.circle([d.coordinates[0], d.coordinates[1]], {
          radius: radiusMeters,
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: isSelected ? 0.16 : 0.08,
          weight: isSelected ? 2 : 1,
          dashArray: isSelected ? undefined : '5, 5',
        });
        circlesLayerRef.current?.addLayer(circle);
      }
    });
  }, [filteredDisasters, activeDisaster, mapLoaded]);

  // Render Shelters & Hospitals
  useEffect(() => {
    if (!mapInstanceRef.current || !sheltersLayerRef.current) return;
    sheltersLayerRef.current.clearLayers();

    if (!showShelters) return;

    SHELTERS.forEach((s) => {
      const isHospital = s.type === 'hospital';
      const icon = L.divIcon({
        className: 'shelter-marker',
        html: `
          <div style="
            width: 26px;
            height: 26px;
            border-radius: 6px;
            background: ${isHospital ? '#059669' : '#2563eb'};
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: bold;
            border: 1.5px solid #ffffff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          ">
            ${isHospital ? 'H' : '⛺'}
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([s.coordinates[0], s.coordinates[1]], { icon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; color: #1e293b; padding: 2px;">
          <strong style="display: block; font-size: 13px; margin-bottom: 3px;">${s.name}</strong>
          <div>Address: ${s.address}</div>
          <div>Occupancy: ${s.occupancy} / ${s.capacity}</div>
          <div>Contact: <a href="tel:${s.contactNumber}" style="color: #2563eb; font-weight: bold;">${s.contactNumber}</a></div>
        </div>
      `);
      sheltersLayerRef.current?.addLayer(marker);
    });
  }, [showShelters, mapLoaded]);

  // Center on User
  const handleCenterOnUser = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([userLat, userLng], 7, { duration: 1 });
    }
  };

  const getDistanceToActive = () => {
    if (!activeDisaster) return 0;
    return calculateDistanceKm(userLat, userLng, activeDisaster.coordinates[0], activeDisaster.coordinates[1]);
  };

  return (
    <div
      className="relative w-full h-full min-h-[560px] flex flex-col overflow-hidden bg-slate-950"
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: '560px' }}
    >
      {/* Top Filter Bar */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl pointer-events-auto overflow-x-auto max-w-full">
          {/* Disaster Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-950 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">All Hazards ({disasters.length})</option>
            <option value="earthquake">Earthquakes</option>
            <option value="cyclone">Cyclones / Storms</option>
            <option value="flood">Floods</option>
            <option value="wildfire">Wildfires</option>
            <option value="tsunami">Tsunamis</option>
            <option value="volcano">Volcanoes</option>
            <option value="landslide">Landslides</option>
            <option value="drought">Droughts</option>
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-950 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="high">High + Critical</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>

          {/* Distance Filter */}
          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value as any)}
            className="bg-slate-950 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="all">Global Reach ({disasters.length})</option>
            <option value="100">Within 100 km</option>
            <option value="500">Within 500 km</option>
            <option value="1500">Within 1500 km</option>
          </select>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Tile Layer Switcher (Esri Dark, OpenStreetMap, Satellite) */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-0.5 shadow-lg">
            <button
              type="button"
              onClick={() => switchTileProvider('dark')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                tileMode === 'dark' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Tactical Dark Map (Esri Dark Gray)"
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => switchTileProvider('osm')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                tileMode === 'osm' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Standard OpenStreetMap"
            >
              OSM
            </button>
            <button
              type="button"
              onClick={() => switchTileProvider('satellite')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                tileMode === 'satellite' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Satellite Imagery"
            >
              Sat
            </button>
          </div>

          {/* Shelters Toggle */}
          <button
            type="button"
            onClick={() => setShowShelters(!showShelters)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-lg ${
              showShelters
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Hospital className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Relief Shelters</span>
          </button>

          {/* Near Me Center Button */}
          <button
            type="button"
            onClick={handleCenterOnUser}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30 transition-all flex items-center gap-1.5 shadow-lg shadow-blue-900/40"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Near Me</span>
          </button>
        </div>
      </div>

      {/* Zero Results Distance Filter Banner Helper */}
      {filteredDisasters.length === 0 && (
        <div className="absolute top-16 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-sm z-[450] bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3.5 shadow-xl flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-300">
            <span className="font-bold text-white block">No hazards in selected perimeter</span>
            <span className="text-[11px] text-slate-400">Current location is safe.</span>
          </div>
          <button
            type="button"
            onClick={() => setDistanceFilter('all')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shrink-0 flex items-center gap-1 shadow"
          >
            <RotateCcw className="w-3 h-3" />
            <span>View All</span>
          </button>
        </div>
      )}

      {/* Leaflet Map Canvas Container with Explicit Dimensions */}
      <div
        ref={mapContainerRef}
        className="w-full flex-1 z-0"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '560px',
          backgroundColor: '#020617',
          position: 'relative'
        }}
      />

      {/* Active Disaster Bottom Drawer Sheet */}
      {activeDisaster && (
        <div className="absolute bottom-20 left-3 right-3 sm:left-6 sm:max-w-md z-[450] bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-4 shadow-2xl transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold text-sm ${
                  activeDisaster.severity === 'critical'
                    ? 'bg-red-600 shadow-md shadow-red-900/50'
                    : activeDisaster.severity === 'high'
                    ? 'bg-orange-600'
                    : 'bg-amber-600'
                }`}
              >
                {activeDisaster.type === 'earthquake' && <Activity className="w-4 h-4" />}
                {activeDisaster.type === 'wildfire' && <Flame className="w-4 h-4" />}
                {activeDisaster.type === 'cyclone' && <Wind className="w-4 h-4" />}
                {activeDisaster.type === 'flood' && <Droplets className="w-4 h-4" />}
                {activeDisaster.type === 'tsunami' && <Waves className="w-4 h-4" />}
                {activeDisaster.type === 'volcano' && <TriangleAlert className="w-4 h-4" />}
                {activeDisaster.type === 'landslide' && <Mountain className="w-4 h-4" />}
                {activeDisaster.type === 'drought' && <Sun className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{activeDisaster.title}</h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="font-semibold uppercase tracking-wider text-red-400">
                    {activeDisaster.severity}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeDisaster.locationName}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveDisaster(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-slate-950/70 rounded-2xl border border-slate-800/80 text-center">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Distance</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">
                {getDistanceToActive()} km
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Hazard Zone</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">
                {activeDisaster.affectedRadiusKm} km
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Source</div>
              <div className="text-xs font-bold text-slate-300 truncate mt-0.5">
                {activeDisaster.source}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">
            {activeDisaster.summary}
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => onOpenSafetyForType(activeDisaster.type)}
              className="flex-1 py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Safety Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onOpenSOSWithDisaster(activeDisaster)}
              className="py-2 px-4 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-900/40"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS in this Zone</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
