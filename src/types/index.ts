export type DisasterType =
  | 'earthquake'
  | 'flood'
  | 'cyclone'
  | 'tsunami'
  | 'wildfire'
  | 'landslide'
  | 'volcano'
  | 'drought';

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface DisasterEvent {
  id: string;
  title: string;
  type: DisasterType;
  severity: SeverityLevel;
  locationName: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  timestamp: string;
  affectedRadiusKm: number;
  depthKm?: number;
  magnitude?: number;
  windSpeedKmh?: number;
  source: string;
  status: 'active' | 'monitoring' | 'warning' | 'evacuation' | 'contained';
  summary: string;
  immediateActions: string[];
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  countryCode: string;
  countryName: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
    accuracy?: number;
  };
  bloodType?: string;
  allergies?: string;
  emergencyContacts: EmergencyContact[];
  language: 'en' | 'ta' | 'es' | 'hi';
  isRegistered: boolean;
  lowBandwidthMode: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface CountryEmergencyInfo {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  emergencyNumber: string; // e.g. 112, 911, 999
  police: string;
  ambulance: string;
  fire: string;
  disasterHelpline: string;
  agencyName: string;
  agencyWebsite: string;
}

export interface SOSDispatch {
  id: string;
  userId: string;
  userName: string;
  phone: string;
  countryCode: string;
  coordinates: [number, number];
  locationAddress: string;
  timestamp: string;
  disasterType?: DisasterType;
  nearestDisasterDistanceKm?: number;
  status: 'pending' | 'dispatched' | 'contacted' | 'resolved';
  assignedTeam?: string;
  notes?: string;
}

export interface SafetyStep {
  title: string;
  description: string;
  dos: string[];
  donts: string[];
}

export interface PrecautionGuide {
  id: DisasterType;
  name: string;
  nameTranslated: {
    en: string;
    ta: string; // Tamil
    es: string; // Spanish
    hi: string; // Hindi
  };
  icon: string;
  before: SafetyStep;
  during: SafetyStep;
  after: SafetyStep;
}

export interface ShelterFacility {
  id: string;
  name: string;
  type: 'shelter' | 'hospital' | 'food_distribution' | 'evacuation_point';
  address: string;
  coordinates: [number, number];
  capacity: number;
  occupancy: number;
  contactNumber: string;
  services: string[];
  isOpen: boolean;
}

export interface EarlyWarningAlert {
  id: string;
  disasterId: string;
  disasterType: DisasterType;
  title: string;
  severity: SeverityLevel;
  issuedAt: string;
  expectedImpactTime: string;
  affectedArea: string;
  distanceKm?: number;
  evacuationRecommended: boolean;
  actionSteps: string[];
  isRead: boolean;
}
