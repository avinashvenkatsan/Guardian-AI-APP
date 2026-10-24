import { CountryEmergencyInfo } from '../types';

export const COUNTRIES: CountryEmergencyInfo[] = [
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    emergencyNumber: '112',
    police: '100',
    ambulance: '108',
    fire: '101',
    disasterHelpline: '1078', // National Disaster Response Force (NDRF) / NDMA
    agencyName: 'National Disaster Management Authority (NDMA / NDRF)',
    agencyWebsite: 'https://ndma.gov.in',
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    emergencyNumber: '911',
    police: '911',
    ambulance: '911',
    fire: '911',
    disasterHelpline: '1-800-621-3362', // FEMA
    agencyName: 'Federal Emergency Management Agency (FEMA)',
    agencyWebsite: 'https://www.fema.gov',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
    emergencyNumber: '999',
    police: '999',
    ambulance: '999',
    fire: '999',
    disasterHelpline: '0345-988-1188', // Floodline
    agencyName: 'Disaster Emergency Committee & Environment Agency',
    agencyWebsite: 'https://www.gov.uk/government/organisations/environment-agency',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    emergencyNumber: '911',
    police: '911',
    ambulance: '911',
    fire: '911',
    disasterHelpline: '1-800-830-3118',
    agencyName: 'Public Safety Canada',
    agencyWebsite: 'https://www.publicsafety.gc.ca',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    dialCode: '+61',
    emergencyNumber: '000',
    police: '000',
    ambulance: '000',
    fire: '000',
    disasterHelpline: '132-500', // SES
    agencyName: 'National Emergency Management Agency (NEMA) & SES',
    agencyWebsite: 'https://nema.gov.au',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    dialCode: '+81',
    emergencyNumber: '119',
    police: '110',
    ambulance: '119',
    fire: '119',
    disasterHelpline: '171', // Disaster Emergency Message Dial
    agencyName: 'Japan Meteorological Agency (JMA) & Disaster Management',
    agencyWebsite: 'https://www.bousai.go.jp',
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
    emergencyNumber: '112',
    police: '110',
    ambulance: '112',
    fire: '112',
    disasterHelpline: '0228-99550-0',
    agencyName: 'BBK - Federal Office of Civil Protection and Disaster Assistance',
    agencyWebsite: 'https://www.bbk.bund.de',
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    dialCode: '+33',
    emergencyNumber: '112',
    police: '17',
    ambulance: '15',
    fire: '18',
    disasterHelpline: '0800-40-60-05',
    agencyName: 'Sécurité Civile',
    agencyWebsite: 'https://www.interieur.gouv.fr',
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    dialCode: '+39',
    emergencyNumber: '112',
    police: '113',
    ambulance: '118',
    fire: '115',
    disasterHelpline: '800-840-840',
    agencyName: 'Protezione Civile',
    agencyWebsite: 'https://www.protezionecivile.gov.it',
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
    emergencyNumber: '112',
    police: '091',
    ambulance: '061',
    fire: '080',
    disasterHelpline: '900-102-112',
    agencyName: 'Dirección General de Protección Civil y Emergencias',
    agencyWebsite: 'https://www.proteccioncivil.es',
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    dialCode: '+63',
    emergencyNumber: '911',
    police: '117',
    ambulance: '911',
    fire: '911',
    disasterHelpline: '911-5061', // NDRRMC
    agencyName: 'NDRRMC (National Disaster Risk Reduction and Management Council)',
    agencyWebsite: 'https://ndrrmc.gov.ph',
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    dialCode: '+62',
    emergencyNumber: '112',
    police: '110',
    ambulance: '118',
    fire: '113',
    disasterHelpline: '117', // BNPB
    agencyName: 'BNPB (Badan Nasional Penanggulangan Bencana)',
    agencyWebsite: 'https://www.bnpb.go.id',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    dialCode: '+64',
    emergencyNumber: '111',
    police: '111',
    ambulance: '111',
    fire: '111',
    disasterHelpline: '0800-779-997',
    agencyName: 'National Emergency Management Agency (Civil Defence)',
    agencyWebsite: 'https://www.civildefence.govt.nz',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    dialCode: '+65',
    emergencyNumber: '995',
    police: '999',
    ambulance: '995',
    fire: '995',
    disasterHelpline: '1800-286-5555',
    agencyName: 'Singapore Civil Defence Force (SCDF)',
    agencyWebsite: 'https://www.scdf.gov.sg',
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    dialCode: '+55',
    emergencyNumber: '190',
    police: '190',
    ambulance: '192',
    fire: '193',
    disasterHelpline: '199', // Defesa Civil
    agencyName: 'Defesa Civil Nacional',
    agencyWebsite: 'https://www.defesacivil.mg.gov.br',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    dialCode: '+27',
    emergencyNumber: '112',
    police: '10111',
    ambulance: '10177',
    fire: '10177',
    disasterHelpline: '0800-029-999',
    agencyName: 'National Disaster Management Centre (NDMC)',
    agencyWebsite: 'https://www.ndmc.gov.za',
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    dialCode: '+52',
    emergencyNumber: '911',
    police: '911',
    ambulance: '911',
    fire: '911',
    disasterHelpline: '01-800-00-413-00', // CENAPRED
    agencyName: 'Protección Civil & CENAPRED',
    agencyWebsite: 'https://www.gob.mx/cenapred',
  },
  {
    code: 'TR',
    name: 'Turkey',
    flag: '🇹🇷',
    dialCode: '+90',
    emergencyNumber: '112',
    police: '155',
    ambulance: '112',
    fire: '110',
    disasterHelpline: '122', // AFAD
    agencyName: 'AFAD (Disaster and Emergency Management Authority)',
    agencyWebsite: 'https://en.afad.gov.tr',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    dialCode: '+971',
    emergencyNumber: '999',
    police: '999',
    ambulance: '998',
    fire: '997',
    disasterHelpline: '800-622',
    agencyName: 'NCEMA (National Emergency Crisis and Disaster Management)',
    agencyWebsite: 'https://www.ncema.gov.ae',
  },
];

export function getCountryByCode(code: string): CountryEmergencyInfo {
  return COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase()) || COUNTRIES[0];
}

export function detectUserCountry(): CountryEmergencyInfo {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Colombo')) {
      return getCountryByCode('IN');
    }
    if (tz.includes('New_York') || tz.includes('Los_Angeles') || tz.includes('Chicago') || tz.includes('Denver')) {
      return getCountryByCode('US');
    }
    if (tz.includes('London')) {
      return getCountryByCode('GB');
    }
    if (tz.includes('Tokyo')) {
      return getCountryByCode('JP');
    }
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane')) {
      return getCountryByCode('AU');
    }
    if (tz.includes('Berlin') || tz.includes('Europe/Berlin')) {
      return getCountryByCode('DE');
    }
    if (tz.includes('Paris')) {
      return getCountryByCode('FR');
    }
  } catch {
    // ignore
  }
  return getCountryByCode('IN'); // default to India or US
}
