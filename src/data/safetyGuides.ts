import { PrecautionGuide } from '../types';

export const SAFETY_GUIDES: PrecautionGuide[] = [
  {
    id: 'earthquake',
    name: 'Earthquake',
    nameTranslated: {
      en: 'Earthquake',
      ta: 'பூகம்பம் (Earthquake)',
      es: 'Terremoto',
      hi: 'भूकंप (Earthquake)',
    },
    icon: 'Activity',
    before: {
      title: 'Preparation & Hardening',
      description: 'Anchor heavy fixtures and identify safe spots in every room.',
      dos: [
        'Fasten heavy shelves, water heaters, and large mirrors firmly to wall studs.',
        'Store breakable items and heavy objects on lower shelves.',
        'Locate safe spots in each room: under sturdy desks or interior load-bearing walls.',
        'Keep an emergency Go-Bag with 3 days of essentials near your exit door.'
      ],
      donts: [
        'Do not hang heavy framed glass paintings directly above your bed or sofa.',
        'Do not store flammable liquids or gas cylinders near electrical switches.',
        'Do not rely on elevators as primary emergency exits.'
      ]
    },
    during: {
      title: 'Immediate Action: Drop, Cover & Hold On',
      description: 'Protect your head and neck from falling debris.',
      dos: [
        'DROP down onto your hands and knees.',
        'COVER your head and neck under a sturdy table or desk.',
        'HOLD ON until shaking completely stops.',
        'If outdoors, move immediately into open fields away from power lines and glass skyscrapers.',
        'If in a vehicle, pull over to side safely away from overpasses and stay inside.'
      ],
      donts: [
        'DO NOT run outside during active shaking — falling masonry causes 80% of injuries.',
        'DO NOT stand in doorways; modern doorways are not stronger than rest of house.',
        'DO NOT light matches, candles, or lighters due to potential fractured gas pipes.'
      ]
    },
    after: {
      title: 'Aftermath & Secondary Hazards',
      description: 'Check for injuries and anticipate aftershocks.',
      dos: [
        'Expect secondary aftershocks within minutes or days; be ready to drop again.',
        'Smell for gas: if detected, open windows and immediately evacuate uphill.',
        'Wear thick-soled shoes to protect against shattered glass and nails.',
        'Listen to official battery-powered emergency broadcasts.'
      ],
      donts: [
        'Do not turn on electrical light switches if you suspect a gas leak.',
        'Do not enter visibly cracked or tilted structural masonry buildings.',
        'Do not tie up cellular emergency telephone lines with non-urgent chatter; use SMS.'
      ]
    }
  },
  {
    id: 'cyclone',
    name: 'Cyclone / Hurricane',
    nameTranslated: {
      en: 'Cyclone / Hurricane',
      ta: 'புயல் / சூறாவளி (Cyclone)',
      es: 'Ciclón / Huracán',
      hi: 'चक्रवात / तूफ़ान (Cyclone)',
    },
    icon: 'Wind',
    before: {
      title: 'Pre-Storm Preparedness',
      description: 'Fortify roofs, board glass panes, and check evacuation routes.',
      dos: [
        'Board up glass windows or tape strong cross-diagonal wooden shutters.',
        'Trim dead branches from trees close to your residence.',
        'Fully charge all mobile phones, power banks, and battery lamps.',
        'Store drinking water in sealed containers (minimum 3 liters per person per day).'
      ],
      donts: [
        'Do not anchor small fishing boats in open harbor; haul them well inland.',
        'Do not ignore official red storm-surge evacuation warnings.',
        'Do not leave loose objects on terraces, balconies, or courtyards.'
      ]
    },
    during: {
      title: 'During the Storm',
      description: 'Remain in the strongest interior room away from windows.',
      dos: [
        'Stay indoors in the central core room or bathroom on the lowest floor.',
        'Disconnect all major electrical home appliances from wall sockets.',
        'Keep emergency radio tuned to national weather services for eye-of-storm updates.'
      ],
      donts: [
        'DO NOT venture outside when the calm "Eye of the Cyclone" passes — extreme reverse winds follow abruptly.',
        'DO NOT touch fallen electrical cables or dangling power lines.',
        'DO NOT touch wet electrical junction boxes.'
      ]
    },
    after: {
      title: 'Post-Cyclone Recovery',
      description: 'Watch for fallen live wires, contaminated water, and weakened trees.',
      dos: [
        'Boil drinking water or use water purification chlorination tablets.',
        'Report broken power lines to emergency authorities immediately.',
        'Wear boots and gloves when clearing storm debris.'
      ],
      donts: [
        'Do not enter flooded basement areas where live power may still be energized.',
        'Do not consume food that has been exposed to flood or surge water.'
      ]
    }
  },
  {
    id: 'flood',
    name: 'Flood',
    nameTranslated: {
      en: 'Flood & Flash Floods',
      ta: 'வெள்ளப்பெருக்கு (Flood)',
      es: 'Inundación',
      hi: 'बाढ़ (Flood)',
    },
    icon: 'Droplets',
    before: {
      title: 'Mitigation & Evacuation Prep',
      description: 'Know your local flood plain risk and elevate crucial belongings.',
      dos: [
        'Move valuable documents, medicines, and electronics to high shelves or upper floors.',
        'Stack sandbags against external door sills in flood-prone thresholds.',
        'Identify high ground evacuation centers and routes that do not cross dip bridges.'
      ],
      donts: [
        'Do not store chemical fertilizers or toxic solvents in ground-level basements.'
      ]
    },
    during: {
      title: 'Survival During Inundation',
      description: 'Never drive or wade through moving floodwaters.',
      dos: [
        'Move to upper floors or rooftops if waters rise rapidly; carry flashlights and whistles.',
        'Turn off main electricity breakers and gas valves before evacuating.',
        'Follow instructions of rescue boats and emergency personnel.'
      ],
      donts: [
        'TURN AROUND, DON’T DROWN: Never walk, swim, or drive through flooded roads (just 15 cm of moving water can knock an adult down; 30 cm floats a car).',
        'DO NOT hide in closed attics without rooftop roof access — rising water can trap you.'
      ]
    },
    after: {
      title: 'Safe Clean-Up & Sanitation',
      description: 'Prevent water-borne diseases like cholera and leptospirosis.',
      dos: [
        'Disinfect all walls, floors, and kitchen surfaces with household chlorine bleach.',
        'Throw away medicines and food that touched floodwater.',
        'Watch out for snakes, scorpions, and rodents driven out of their burrows by water.'
      ],
      donts: [
        'Do not drink tap water until municipal health authorities declare it potable.'
      ]
    }
  },
  {
    id: 'tsunami',
    name: 'Tsunami',
    nameTranslated: {
      en: 'Tsunami',
      ta: 'ஆழிப்பேரலை / சுனாமி (Tsunami)',
      es: 'Tsunami',
      hi: 'सुनामी (Tsunami)',
    },
    icon: 'Waves',
    before: {
      title: 'Tsunami Awareness',
      description: 'Recognize nature’s warning signs: ground shake and sea pullback.',
      dos: [
        'Learn the natural warning signs: strong earthquake or ocean rapidly receding like a super-low tide.',
        'Map out pedestrian evacuation routes to ground at least 30 meters above sea level.'
      ],
      donts: [
        'Never build or sleep in lightweight beach shacks without an evacuation plan.'
      ]
    },
    during: {
      title: 'Instant Uphill Evacuation',
      description: 'Seconds count. Run inland and upward immediately.',
      dos: [
        'If you feel a coastal earthquake or see sea floor exposed, RUN inland to high ground immediately on foot.',
        'If caught offshore in a boat, navigate out into deep open ocean (waves are small in deep water).',
        'If trapped inland, climb to upper floors (3rd floor or higher) of reinforced concrete buildings.'
      ],
      donts: [
        'NEVER go to the beach to watch the waves arrive or take photos.',
        'Do not return to coastal areas after the first wave — tsunamis are a series of waves over several hours, and subsequent waves are often much larger.'
      ]
    },
    after: {
      title: 'Post-Wave Safety',
      description: 'Remain on high ground until the official "All Clear" sounds.',
      dos: [
        'Wait for official civil defence clearance; do not assume the threat has ended.',
        'Help injured neighbors if you can do so safely.'
      ],
      donts: [
        'Do not consume seawater or flood-contaminated river water.'
      ]
    }
  },
  {
    id: 'wildfire',
    name: 'Wildfire',
    nameTranslated: {
      en: 'Wildfire / Bushfire',
      ta: 'காட்டுத்தீ (Wildfire)',
      es: 'Incendio Forestal',
      hi: 'दावानल / जंगल की आग (Wildfire)',
    },
    icon: 'Flame',
    before: {
      title: 'Defensible Space',
      description: 'Clear vegetation within 30 meters of structures.',
      dos: [
        'Create a 30-foot defensible perimeter around home: clear dry brush, dead leaves, and pine needles.',
        'Clean roofs and rain gutters of dry pine needles.',
        'Prepare an emergency N95 respirator mask and pet carriers.'
      ],
      donts: [
        'Do not stack firewood cords against wooden exterior siding.'
      ]
    },
    during: {
      title: 'Rapid Evacuation',
      description: 'Evacuate early before embers and dense smoke block escape roads.',
      dos: [
        'Leave immediately when voluntary or mandatory evacuation is announced.',
        'Shut all windows, doors, and fireplace dampers before departing to prevent flying embers.',
        'Turn on exterior and interior lights so your house is visible to firefighters through smoke.',
        'Wear 100% natural fibers (cotton, wool) and long pants; synthetic fabrics melt.'
      ],
      donts: [
        'Do not wait until flames are licking your fence to start loading your vehicle.',
        'Do not leave sprinklers running indefinitely as it depletes municipal water pressure for fire engines.'
      ]
    },
    after: {
      title: 'Safe Return',
      description: 'Inspect property for hidden smoldering embers.',
      dos: [
        'Check attics and crawlspaces for concealed smoke or hot spots for 24-48 hours.',
        'Wet down dry ash piles before shoveling to avoid breathing toxic airborne particulate.'
      ],
      donts: [
        'Do not touch charred utility poles or downed electrical transmission lines.'
      ]
    }
  },
  {
    id: 'landslide',
    name: 'Landslide',
    nameTranslated: {
      en: 'Landslide / Mudflow',
      ta: 'நிலச்சரிவு (Landslide)',
      es: 'Deslizamiento de Tierra',
      hi: 'भूस्खलन (Landslide)',
    },
    icon: 'Mountain',
    before: {
      title: 'Terrain Monitoring',
      description: 'Watch for new hillside springs and tilted retaining walls.',
      dos: [
        'Inspect slopes for leaning telephone poles, trees, or newly appearing cracks.',
        'Divert storm runoff water away from steep soil slopes.'
      ],
      donts: [
        'Do not construct septic tanks or swimming pools near cliff edges.'
      ]
    },
    during: {
      title: 'Immediate Escape',
      description: 'Flee perpendicular to the path of moving debris.',
      dos: [
        'Listen for rumbling sounds like an oncoming freight train.',
        'Quickly move out of the path of the landslide or mudflow perpendicular to flow direction.',
        'If escape is impossible, curl into a tight ball and protect your head with your arms.'
      ],
      donts: [
        'Do not cross low-lying bridges over swollen mountain streams carrying mud boulders.'
      ]
    },
    after: {
      title: 'Post-Slide Precautions',
      description: 'Stay away from slide zone as secondary failures are common.',
      dos: [
        'Stay away from the slide area; additional slope collapses often follow initial landslides.',
        'Check for injured or trapped people around the slide periphery without entering direct hazard zone.'
      ],
      donts: [
        'Do not walk on freshly deposited mud banks; they can act as deadly quicksand.'
      ]
    }
  },
  {
    id: 'volcano',
    name: 'Volcanic Eruption',
    nameTranslated: {
      en: 'Volcanic Eruption',
      ta: 'எரிமலை வெடிப்பு (Volcano)',
      es: 'Erupción Volcánica',
      hi: 'ज्वालामुखी विस्फोट (Volcano)',
    },
    icon: 'TriangleAlert',
    before: {
      title: 'Ash & Gas Protection',
      description: 'Prepare goggles, masks, and seal doors against corrosive ash.',
      dos: [
        'Stock certified particulate masks (N95 or better) and airtight safety goggles for family.',
        'Seal doors and windows with damp towels and plastic sheeting.'
      ],
      donts: [
        'Do not plan escape routes down river valleys that carry lahars (hot volcanic mudflows).'
      ]
    },
    during: {
      title: 'Shelter or Evacuate',
      description: 'Shield against caustic pyroclastic flows and acid gases.',
      dos: [
        'Follow official exclusion zone orders immediately.',
        'If outdoors, seek indoor shelter, cover all exposed skin, and wear protective goggles.',
        'Protect eyes from sharp abrasive volcanic glass dust.'
      ],
      donts: [
        'DO NOT drive in heavy ashfall — ash clogs automobile air filters and engines stall within minutes.',
        'DO NOT wear contact lenses during ashfall; glass particles cause permanent corneal abrasions.'
      ]
    },
    after: {
      title: 'Ash Clean-Up',
      description: 'Sweep heavy ash from rooftops to prevent structural collapse.',
      dos: [
        'Carefully clear heavy ash deposits from roofs (dry ash weighs 400-700 kg/m³; wet ash up to 2,000 kg/m³).',
        'Keep vehicle engines covered until fine silica dust settles.'
      ],
      donts: [
        'Do not wash fine ash down municipal rainwater drains — it hardens like concrete and blocks pipes.'
      ]
    }
  },
  {
    id: 'drought',
    name: 'Drought & Heatwave',
    nameTranslated: {
      en: 'Drought & Extreme Heat',
      ta: 'வறட்சி மற்றும் வெப்ப அலை (Drought)',
      es: 'Sequía y Ola de Calor',
      hi: 'सूखा और लू (Drought)',
    },
    icon: 'Sun',
    before: {
      title: 'Water Conservation',
      description: 'Install rainwater harvesting and low-flow plumbing.',
      dos: [
        'Repair leaking plumbing and install low-flow aerators on taps.',
        'Harvest seasonal rainwater in covered cisterns to replenish groundwater.',
        'Plant drought-resistant indigenous crops and shade trees.'
      ],
      donts: [
        'Do not leave municipal hoses running unattended.'
      ]
    },
    during: {
      title: 'Heat Stress Prevention',
      description: 'Hydrate constantly and avoid peak heat exposure.',
      dos: [
        'Drink clean water frequently even if not thirsty; add electrolyte minerals or ORS.',
        'Stay indoors during peak solar intensity (11:00 AM – 4:00 PM).',
        'Wear loose, light-colored cotton clothing and wide-brimmed sun hats.'
      ],
      donts: [
        'NEVER leave children or domestic pets inside parked cars, even with cracked windows.',
        'Do not drink sugary sodas or alcohol which exacerbate physiological dehydration.'
      ]
    },
    after: {
      title: 'Soil Regeneration',
      description: 'Restore topsoil mulch and practice water recycling.',
      dos: [
        'Apply organic compost mulch to conserve residual soil moisture.',
        'Recycle greywater (from non-detergent washing) for irrigation.'
      ],
      donts: [
        'Do not burn dry grass pastures, which triggers rapid runaway wildland brushfires.'
      ]
    }
  }
];

export const GO_BAG_CHECKLIST = [
  { id: 'water', label: 'Drinking Water (3 Liters / Person / Day for 72 hrs)', category: 'Survival', essential: true },
  { id: 'food', label: 'Non-perishable canned food & energy bars', category: 'Survival', essential: true },
  { id: 'firstaid', label: 'First Aid Kit (bandages, antiseptics, sterile gauze)', category: 'Medical', essential: true },
  { id: 'meds', label: '7-day personal prescription medications', category: 'Medical', essential: true },
  { id: 'torch', label: 'Waterproof LED Flashlight & spare alkaline batteries', category: 'Tools', essential: true },
  { id: 'powerbank', label: 'High-capacity 20,000mAh Power Bank & charging cables', category: 'Tech', essential: true },
  { id: 'whistle', label: 'High-decibel emergency rescue whistle', category: 'Rescue', essential: true },
  { id: 'docs', label: 'Waterproof bag with ID, passports, insurance & deeds', category: 'Docs', essential: true },
  { id: 'radio', label: 'Emergency solar / crank AM/FM disaster radio', category: 'Tech', essential: false },
  { id: 'multitool', label: 'Stainless steel multi-tool knife & duct tape', category: 'Tools', essential: false },
  { id: 'cash', label: 'Emergency cash in small denomination paper currency', category: 'Money', essential: true },
  { id: 'mask', label: 'N95 / FFP2 particulate respirator dust masks', category: 'Safety', essential: true },
  { id: 'blanket', label: 'Mylar thermal emergency space blankets', category: 'Warmth', essential: false },
  { id: 'sanitizer', label: 'Alcohol wet wipes & chlorination water tablets', category: 'Hygiene', essential: false }
];
