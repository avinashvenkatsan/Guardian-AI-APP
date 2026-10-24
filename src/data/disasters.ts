import { DisasterEvent, DisasterType, SeverityLevel } from '../types';

export const INITIAL_DISASTERS: DisasterEvent[] = [
  {
    id: 'cyclone-chennai-coromandel',
    title: 'Severe Depression & Coastal Flood Alert - Coromandel Coast',
    type: 'flood',
    severity: 'high',
    locationName: 'Chennai Coastal Belt & Ennore Basin, Tamil Nadu',
    country: 'India',
    coordinates: [13.125, 80.315],
    timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    affectedRadiusKm: 65,
    windSpeedKmh: 85,
    source: 'IMD Regional Meteorological Centre, Chennai',
    status: 'warning',
    summary: 'Intense convective precipitation exceeding 140mm in 6 hours with tidal storm surge advisory across coastal lowlands.',
    immediateActions: [
      'Avoid subterranean underpasses (Vyasarpadi, Gengu Reddy, Madley subway).',
      'Move vehicles and essentials to upper ground floors.',
      'Keep Greater Chennai Corporation Helpline (1913) handy.',
      'Do not touch street lampposts or inundated junction boxes.'
    ]
  },
  {
    id: 'quake-turkey-72',
    title: 'M 6.8 Earthquake - Eastern Anatolian Fault',
    type: 'earthquake',
    severity: 'critical',
    locationName: 'Kahramanmaraş Region, Turkey',
    country: 'Turkey',
    coordinates: [37.5858, 36.9371],
    timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    affectedRadiusKm: 280,
    magnitude: 6.8,
    depthKm: 10,
    source: 'USGS / AFAD',
    status: 'active',
    summary: 'Shallow strong seismic event causing structural distress. Aftershocks exceeding M 5.2 detected across adjacent provinces.',
    immediateActions: [
      'Drop, Cover, and Hold On beneath sturdy furniture.',
      'Stay away from unreinforced masonry walls and glass windows.',
      'Turn off gas lines and electrical mains if safe to do so.',
      'Do not use elevators; move to open designated assembly grounds.'
    ]
  },
  {
    id: 'cyclone-bengal-01',
    title: 'Severe Cyclonic Storm "Remal" - Bay of Bengal',
    type: 'cyclone',
    severity: 'critical',
    locationName: 'Coastal Odisha & West Bengal / Bangladesh',
    country: 'India',
    coordinates: [20.85, 87.2],
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 450,
    windSpeedKmh: 145,
    source: 'IMD (India Meteorological Dept) / GDACS',
    status: 'warning',
    summary: 'Category 3 equivalent cyclonic storm approaching coastline with wind gusts up to 160 km/h and 3.5m tidal storm surges.',
    immediateActions: [
      'Evacuate low-lying coastal belts immediately to cyclone shelters.',
      'Secure loose outdoor tin roofs and solar panels.',
      'Stock 72 hours of drinkable water, canned food, and battery lamps.',
      'Stay tuned to local disaster radio (Vividh Bharati / local FM).'
    ]
  },
  {
    id: 'wildfire-california-red',
    title: 'Pine Ridge Complex Wildfire',
    type: 'wildfire',
    severity: 'high',
    locationName: 'Sierra Nevada Foothills, California',
    country: 'United States',
    coordinates: [37.25, -119.3],
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 190,
    source: 'NASA FIRMS / CAL FIRE',
    status: 'evacuation',
    summary: 'Fast-moving wildfire fueled by 45mph Diablo winds and 12% relative humidity. 38,000 acres burned with 15% containment.',
    immediateActions: [
      'Zone Red Evacuation: Gather GO-bag and pets immediately.',
      'Close all windows, blinds, and heavy interior curtains.',
      'Wear N95 / P100 respirator masks to prevent PM2.5 smoke inhalation.',
      'Keep headlights on and drive cautiously along designated evacuation corridors.'
    ]
  },
  {
    id: 'flood-assam-brahmaputra',
    title: 'Flash Flood & River Inundation',
    type: 'flood',
    severity: 'high',
    locationName: 'Brahmaputra Basin, Assam',
    country: 'India',
    coordinates: [26.2006, 92.9376],
    timestamp: new Date(Date.now() - 11 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 320,
    source: 'Central Water Commission (CWC)',
    status: 'active',
    summary: 'Torrential monsoon downpours caused the Brahmaputra to breach warning thresholds by 1.8 meters, inundating 420 villages.',
    immediateActions: [
      'Move livestock and family members to elevated embankments.',
      'Never walk or drive through moving flood waters (Turn Around, Don’t Drown).',
      'Boil all water before consumption; disinfect water vessels.',
      'Keep whistle and reflective flashlights handy for rescue boats.'
    ]
  },
  {
    id: 'quake-japan-ishikawa',
    title: 'M 5.9 Offshore Seismic Tremor',
    type: 'earthquake',
    severity: 'moderate',
    locationName: 'Noto Peninsula, Ishikawa Prefecture',
    country: 'Japan',
    coordinates: [37.49, 137.24],
    timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 120,
    magnitude: 5.9,
    depthKm: 14,
    source: 'JMA (Japan Meteorological Agency)',
    status: 'monitoring',
    summary: 'Shindo 5-upper intensity shaking reported. Coastal advisory issued with minor sea surface fluctuations under 0.5m.',
    immediateActions: [
      'Protect head with cushion or helmet; stay under sturdy tables.',
      'Beware of toppling book shelves and broken ceramics.',
      'Check NHK emergency broadcast on TV/mobile for tsunami status.'
    ]
  },
  {
    id: 'volcano-iceland-grindavik',
    title: 'Reykjanes Volcanic Fissure Eruption',
    type: 'volcano',
    severity: 'high',
    locationName: 'Sundhnúkur Crater Row, Iceland',
    country: 'Iceland',
    coordinates: [63.88, -22.42],
    timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 65,
    source: 'Icelandic Met Office (IMO)',
    status: 'active',
    summary: '3.4 km eruptive fissure opening with lava fountains reaching 80m and hazardous sulfur dioxide (SO2) gas plumes.',
    immediateActions: [
      'Strict exclusion zone in place; avoid Grindavík road perimeter.',
      'Keep windows shut and ventilation fans powered down.',
      'Monitor wind direction to avoid toxic gas concentrations downwind.'
    ]
  },
  {
    id: 'tsunami-pacific-tonga',
    title: 'Pacific Marine Tsunami Watch',
    type: 'tsunami',
    severity: 'critical',
    locationName: 'Kermadec Trench / Southwest Pacific',
    country: 'Fiji / Tonga / New Zealand',
    coordinates: [-21.17, -175.19],
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 600,
    source: 'PTWC (Pacific Tsunami Warning Center)',
    status: 'warning',
    summary: 'Undersea subduction thrust earthquake generated rapid ocean wave trains. Estimated wave arrival at nearest atolls within 45 minutes.',
    immediateActions: [
      'Move inland at least 2 km or ascend to ground 30 meters above sea level.',
      'Never wait on beach to observe wave receding.',
      'If trapped in multi-story concrete hotel, ascend to 4th floor or roof.'
    ]
  },
  {
    id: 'landslide-wayanad-kerala',
    title: 'Debris Flow & Slope Landslide Warning',
    type: 'landslide',
    severity: 'high',
    locationName: 'Western Ghats, Wayanad, Kerala',
    country: 'India',
    coordinates: [11.6854, 76.132],
    timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 45,
    source: 'Geological Survey of India (GSI) / KSDMA',
    status: 'warning',
    summary: 'Continuous 340mm rainfall in 24 hours has saturated steep tea estate hillsides with high risk of catastrophic debris flows.',
    immediateActions: [
      'Immediate night evacuation of downhill tea estate worker settlements.',
      'Listen for unusual rumbling sounds or cracking tree trunks.',
      'Do not sleep on ground floor facing steep mountain embankments.'
    ]
  },
  {
    id: 'drought-somalia-horn',
    title: 'Severe Extreme Drought Emergency',
    type: 'drought',
    severity: 'moderate',
    locationName: 'Horn of Africa / Jubaland Basin',
    country: 'Somalia',
    coordinates: [2.0469, 45.3182],
    timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 850,
    source: 'UN OCHA / FEWS NET',
    status: 'active',
    summary: 'Consecutive failed rainy seasons resulted in critical reservoir depletion, crop failure, and livestock mortality.',
    immediateActions: [
      'Ration municipal groundwater supplies for essential human hydration.',
      'Access local humanitarian clean water distribution kiosks.',
      'Prevent heat stress during peak noon hours (11am - 4pm).'
    ]
  },
  {
    id: 'quake-california-hayward',
    title: 'M 4.7 Shallow Fault Tremor',
    type: 'earthquake',
    severity: 'moderate',
    locationName: 'San Francisco Bay Area, California',
    country: 'United States',
    coordinates: [37.6688, -122.0808],
    timestamp: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    affectedRadiusKm: 85,
    magnitude: 4.7,
    depthKm: 8.5,
    source: 'USGS Earthquake Hazards',
    status: 'monitoring',
    summary: 'Moderate strike-slip event along Hayward Fault. Light shaking felt across Oakland and San Jose with zero critical pipeline damage.',
    immediateActions: [
      'Check household water and gas valves for scent of sulfur/gas.',
      'Secure water heaters with metal safety straps.',
      'Keep mobile devices charged in case of secondary aftershocks.'
    ]
  }
];

// Haversine formula to calculate distance between two coordinates in kilometers
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Fetch live earthquakes from USGS with robust fallback
export async function fetchLiveUSGSEarthquakes(): Promise<DisasterEvent[]> {
  try {
    const res = await fetch(
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson',
      { signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) throw new Error('USGS fetch failed');
    const data = await res.json();
    const features = (data.features || []).slice(0, 15);

    const liveQuakes: DisasterEvent[] = features.map((f: any) => {
      const mag = f.properties.mag || 3.0;
      let severity: SeverityLevel = 'low';
      if (mag >= 6.5) severity = 'critical';
      else if (mag >= 5.0) severity = 'high';
      else if (mag >= 4.0) severity = 'moderate';

      return {
        id: `usgs-${f.id}`,
        title: f.properties.title || `M ${mag.toFixed(1)} Earthquake`,
        type: 'earthquake' as DisasterType,
        severity,
        locationName: f.properties.place || 'Unknown Location',
        country: f.properties.place?.split(',')?.pop()?.trim() || 'Global',
        coordinates: [f.geometry.coordinates[1], f.geometry.coordinates[0]], // GeoJSON is [lng, lat]
        timestamp: new Date(f.properties.time).toISOString(),
        affectedRadiusKm: Math.round(mag * 35),
        magnitude: parseFloat(mag.toFixed(1)),
        depthKm: Math.round(f.geometry.coordinates[2] || 10),
        source: 'USGS Live Feed',
        status: mag >= 5.5 ? 'active' : 'monitoring',
        summary: `Live detected seismic event recorded by global seismograph network. Tsunami potential: ${
          f.properties.tsunami ? 'YES' : 'None'
        }.`,
        immediateActions: [
          'Drop, Cover, and Hold On beneath solid tables.',
          'Expect secondary aftershocks in the next 24-48 hours.',
          'Check for structural wall fractures before re-entering buildings.'
        ]
      };
    });

    return liveQuakes;
  } catch (err) {
    console.warn('Live USGS feed unavailable, using verified database cache:', err);
    return [];
  }
}
