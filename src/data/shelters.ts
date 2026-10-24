import { ShelterFacility } from '../types';

export const SHELTERS: ShelterFacility[] = [
  {
    id: 'shelter-1',
    name: 'Red Cross Central Evacuation Shelter',
    type: 'shelter',
    address: 'Civic Arena Complex, Sector 4',
    coordinates: [37.59, 36.92],
    capacity: 1200,
    occupancy: 420,
    contactNumber: '+90 344 223 1000',
    services: ['Emergency Cots', 'Hot Meals', 'Clean Water', 'Childcare'],
    isOpen: true
  },
  {
    id: 'hospital-1',
    name: 'Apex Trauma & Emergency Regional Hospital',
    type: 'hospital',
    address: 'Hospital Avenue, Med-Zone North',
    coordinates: [37.575, 36.945],
    capacity: 450,
    occupancy: 390,
    contactNumber: '+90 344 228 5000',
    services: ['24/7 Trauma Surgery', 'Blood Bank', 'Burn Unit', 'ICU Support'],
    isOpen: true
  },
  {
    id: 'shelter-in-1',
    name: 'NDRF Cyclone Relief Camp - Kendrapara',
    type: 'shelter',
    address: 'Cyclone Multi-Purpose Center, Coastal Road',
    coordinates: [20.88, 87.15],
    capacity: 2500,
    occupancy: 950,
    contactNumber: '+91 6727 220033',
    services: ['Reinforced Concrete Bunkers', 'Generator Power', 'Satellite Phone', 'Medical Dispensary'],
    isOpen: true
  },
  {
    id: 'hospital-in-1',
    name: 'AIIMS Regional Trauma Center',
    type: 'hospital',
    address: 'Sijua, Patrapada, Bhubaneswar',
    coordinates: [20.24, 85.77],
    capacity: 750,
    occupancy: 510,
    contactNumber: '+91 674 247 6789',
    services: ['Mass Casualty Triage', 'Emergency Oxygen', 'Helipad Access', 'Ambulance Fleet'],
    isOpen: true
  },
  {
    id: 'shelter-us-1',
    name: 'FEMA Red Cross Wildfire Evacuation Hub',
    type: 'shelter',
    address: 'Fairgrounds Pavilion, Fresno County, CA',
    coordinates: [36.74, -119.78],
    capacity: 1800,
    occupancy: 640,
    contactNumber: '+1 559-455-1000',
    services: ['Pet Evacuation Area', 'Air-Scrubbed Breathing Zone', 'Mental Health Support', 'Free Wi-Fi'],
    isOpen: true
  },
  {
    id: 'hospital-us-1',
    name: 'Community Regional Medical Center Level 1 Trauma',
    type: 'hospital',
    address: '2823 Fresno St, Fresno, CA',
    coordinates: [36.743, -119.782],
    capacity: 685,
    occupancy: 590,
    contactNumber: '+1 559-459-6000',
    services: ['Burn ICU', 'Pediatric Emergency', 'Decontamination Showers'],
    isOpen: true
  },
  {
    id: 'shelter-jp-1',
    name: 'Wajima City Disaster Evacuation Gymnasium',
    type: 'shelter',
    address: 'Kawaimachi, Wajima, Ishikawa',
    coordinates: [37.39, 136.9],
    capacity: 900,
    occupancy: 310,
    contactNumber: '+81 768-22-2211',
    services: ['Tatami Mats', 'Emergency Rice Rations', 'Water Tankers', 'Satellite Wi-Fi'],
    isOpen: true
  }
];
