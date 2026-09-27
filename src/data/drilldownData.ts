import { DistrictItiSkillDemand, StudentPlacementRecord } from '../types';

export const DISTRICT_ITI_DEMANDS: Record<string, DistrictItiSkillDemand[]> = {
  pune: [
    {
      id: 'iti_pune_aundh',
      districtId: 'pune',
      itiName: 'Government ITI Aundh & State Center of Excellence',
      itiType: 'State Center of Excellence',
      address: 'Parihar Chowk, Aundh, Pune 411007',
      totalIntake: 1480,
      enrolledStudents: 1420,
      capacityUtilization: 96.0,
      labUpgrades: 'CoE EV Battery Diagnostics Lab & 5-Axis CNC Milling Cell sanctioned under World Bank STRIVE',
      trades: [
        {
          tradeName: 'EV Powertrain Diagnostics & High-Voltage Systems',
          tradeNameMr: 'ईव्ही पॉवरट्रेन डायग्नोस्टिक्स व हाय-व्होल्टेज सिस्टीम्स',
          nsqfLevel: 5,
          annualIntake: 240,
          demandIndex: 98,
          industryOpenings: 1850,
          topHiringPartners: ['Tata Motors EV Division', 'Bajaj Auto Chetak Plant', 'KPIT Technologies']
        },
        {
          tradeName: 'Precision CNC Machining & Cobot Automation',
          tradeNameMr: 'प्रिसिजन सीएनसी मशीनिंग व रोबोटिक्स',
          nsqfLevel: 5,
          annualIntake: 320,
          demandIndex: 94,
          industryOpenings: 1420,
          topHiringPartners: ['Bharat Forge Limited', 'Kirloskar Oil Engines', 'Force Motors']
        },
        {
          tradeName: 'Industrial IoT & Sensor Instrumentation',
          tradeNameMr: 'औद्योगिक आयओटी व सेन्सर इन्स्ट्रुमेंटेशन',
          nsqfLevel: 5,
          annualIntake: 180,
          demandIndex: 91,
          industryOpenings: 980,
          topHiringPartners: ['Thermax Limited', 'Emerson Process Management', 'Honeywell Automation']
        }
      ]
    },
    {
      id: 'iti_pune_pimpri',
      districtId: 'pune',
      itiName: 'Government ITI Pimpri-Chinchwad (Auto Cluster)',
      itiType: 'Government ITI',
      address: 'MIDC Telco Road, Pimpri, Pune 411018',
      totalIntake: 1200,
      enrolledStudents: 1160,
      capacityUtilization: 96.6,
      labUpgrades: 'Automotive Mechatronics & In-Vehicle Networking Lab upgraded with MIDC partnership',
      trades: [
        {
          tradeName: 'Automotive Mechatronics & CAN Bus Tuning',
          tradeNameMr: 'ऑटोमोटिव्ह मेकॅट्रॉनिक्स व सीएएन बस ट्यूनिंग',
          nsqfLevel: 5,
          annualIntake: 280,
          demandIndex: 96,
          industryOpenings: 1640,
          topHiringPartners: ['Mahindra & Mahindra', 'Mercedes-Benz Chakan', 'Minda Corporation']
        },
        {
          tradeName: 'Robotic Welding & Inspection (TIG/MIG)',
          tradeNameMr: 'रोबोटिक वेल्डिंग व तपासणी तंत्रज्ञ',
          nsqfLevel: 4,
          annualIntake: 220,
          demandIndex: 89,
          industryOpenings: 890,
          topHiringPartners: ['Badve Engineering', 'Varroc Engineering', 'Pinnacle Industries']
        }
      ]
    },
    {
      id: 'iti_pune_women_koregaon',
      districtId: 'pune',
      itiName: 'Government Women Technical ITI Koregaon Bhima',
      itiType: 'Government ITI',
      address: 'Taluka Shirur, Koregaon Bhima, Pune 412216',
      totalIntake: 640,
      enrolledStudents: 620,
      capacityUtilization: 96.8,
      labUpgrades: 'Specialized Semiconductor Assembly & Surface Mount Technology (SMT) Clean Room',
      trades: [
        {
          tradeName: 'SMT Micro-soldering & Electronics Assembly',
          tradeNameMr: 'एसएमटी मायक्रो-सोल्डरिंग व इलेक्ट्रॉनिक्स असेंब्ली',
          nsqfLevel: 4,
          annualIntake: 260,
          demandIndex: 92,
          industryOpenings: 1100,
          topHiringPartners: ['Foxconn India', 'Jabil Circuit Pune', 'Dixon Technologies']
        }
      ]
    }
  ],
  mumbai_suburban: [
    {
      id: 'iti_mumbai_mulund',
      districtId: 'mumbai_suburban',
      itiName: 'Government ITI Mulund & Tech Center',
      itiType: 'Government ITI',
      address: 'LBS Marg, Mulund (West), Mumbai 400080',
      totalIntake: 1350,
      enrolledStudents: 1310,
      capacityUtilization: 97.0,
      labUpgrades: 'Cloud Systems, Data Center Operations & Cyber Security Defense Lab',
      trades: [
        {
          tradeName: 'Cloud Infrastructure & Linux Systems Administrator',
          tradeNameMr: 'क्लाउड इन्फ्रास्ट्रक्चर व लिनक्स सिस्टम्स',
          nsqfLevel: 6,
          annualIntake: 360,
          demandIndex: 97,
          industryOpenings: 2450,
          topHiringPartners: ['TCS Datacenter Services', 'CtrlS Datacenters', 'Yotta Infrastructure']
        },
        {
          tradeName: 'Fintech Application Operations & Support',
          tradeNameMr: 'फिनटेक ॲप्लिकेशन ऑपरेशन्स व सपोर्ट',
          nsqfLevel: 5,
          annualIntake: 300,
          demandIndex: 93,
          industryOpenings: 1980,
          topHiringPartners: ['HDFC Bank Operations', 'Axis Securities', 'Zerodha Support Hub']
        }
      ]
    },
    {
      id: 'iti_mumbai_andheri',
      districtId: 'mumbai_suburban',
      itiName: 'Government ITI Andheri East (SEEPZ SEZ)',
      itiType: 'Government ITI',
      address: 'Near MIDC Central Road, Andheri (E), Mumbai 400093',
      totalIntake: 980,
      enrolledStudents: 950,
      capacityUtilization: 96.9,
      labUpgrades: 'Biomedical Instrument Calibration and Precision Gemological Machining',
      trades: [
        {
          tradeName: 'Biomedical Diagnostic Equipment Maintenance',
          tradeNameMr: 'बायोमेडिकल उपकरणे देखभाल तंत्रज्ञ',
          nsqfLevel: 5,
          annualIntake: 180,
          demandIndex: 91,
          industryOpenings: 920,
          topHiringPartners: ['Siemens Healthineers', 'Kokilaben Dhirubhai Ambani Hospital', 'GE Healthcare']
        }
      ]
    }
  ],
  nagpur: [
    {
      id: 'iti_nagpur_south',
      districtId: 'nagpur',
      itiName: 'Government ITI Nagpur South & Clean Energy Hub',
      itiType: 'State Center of Excellence',
      address: 'Shraddhanand Peth, South Ambazari Road, Nagpur 440010',
      totalIntake: 1100,
      enrolledStudents: 920,
      capacityUtilization: 83.6,
      labUpgrades: 'Grid-Tied Solar Microgrid & Renewable Hydrogen Simulation Yard',
      trades: [
        {
          tradeName: 'Grid-Connected Solar PV & Energy Storage Specialist',
          tradeNameMr: 'सोलर पीव्ही व बॅटरी ऊर्जा साठवणूक तंत्रज्ञ',
          nsqfLevel: 4,
          annualIntake: 260,
          demandIndex: 94,
          industryOpenings: 1350,
          topHiringPartners: ['MSEDCL Solar Projects', 'Tata Power Solar', 'Adani Renewables']
        },
        {
          tradeName: 'Aviation Component Overhaul & Sheet Metal (MIHAN)',
          tradeNameMr: 'विमान सुटे भाग व शीट मेटल तंत्रज्ञ',
          nsqfLevel: 5,
          annualIntake: 200,
          demandIndex: 88,
          industryOpenings: 940,
          topHiringPartners: ['Air India MRO MIHAN', 'AAR Indamer Technics', 'Boeing MIHAN Supply']
        }
      ]
    },
    {
      id: 'iti_nagpur_butibori',
      districtId: 'nagpur',
      itiName: 'Government ITI Butibori MIDC',
      itiType: 'Government ITI',
      address: 'Butibori Industrial Area, Nagpur 441122',
      totalIntake: 850,
      enrolledStudents: 710,
      capacityUtilization: 83.5,
      labUpgrades: 'Mining Heavy Machinery Simulation and Hydraulics Bay',
      trades: [
        {
          tradeName: 'Heavy Earthmoving Machinery Hydraulics Technician',
          tradeNameMr: 'अवजड यंत्रसामग्री हायड्रोलिक्स तंत्रज्ञ',
          nsqfLevel: 4,
          annualIntake: 180,
          demandIndex: 86,
          industryOpenings: 790,
          topHiringPartners: ['Western Coalfields Limited (WCL)', 'L&T Construction Equipment', 'BEML']
        }
      ]
    }
  ],
  aurangabad: [
    {
      id: 'iti_aurangabad_chhatrapati',
      districtId: 'aurangabad',
      itiName: 'Government ITI Chhatrapati Sambhaji Nagar & AURIC Hub',
      itiType: 'State Center of Excellence',
      address: 'Railway Station Road, Chhatrapati Sambhaji Nagar 431005',
      totalIntake: 1050,
      enrolledStudents: 940,
      capacityUtilization: 89.5,
      labUpgrades: 'AURIC Shendra-Bidkin Industry 4.0 Center of Excellence with Robotic Cells',
      trades: [
        {
          tradeName: 'Robotic Arc Welding & Automated Fixture Design',
          tradeNameMr: 'रोबोटिक आर्क वेल्डिंग व फिक्सचर डिझाईन',
          nsqfLevel: 5,
          annualIntake: 240,
          demandIndex: 97,
          industryOpenings: 1580,
          topHiringPartners: ['Bajaj Auto Waluj', 'Endurance Technologies', 'Skoda Auto Volkswagen India']
        },
        {
          tradeName: 'Pharma Formulation & Clean Room Technician',
          tradeNameMr: 'फार्मा फॉर्म्युलेशन व क्लीन रूम तंत्रज्ञ',
          nsqfLevel: 5,
          annualIntake: 220,
          demandIndex: 90,
          industryOpenings: 1020,
          topHiringPartners: ['Lupin Pharmaceuticals', 'Wockhardt Limited', 'Ajanta Pharma']
        }
      ]
    }
  ],
  nashik: [
    {
      id: 'iti_nashik_road',
      districtId: 'nashik',
      itiName: 'Government ITI Nashik Road (Defense Ancillaries)',
      itiType: 'Government ITI',
      address: 'Jail Road, Nashik Road, Nashik 422101',
      totalIntake: 1120,
      enrolledStudents: 1020,
      capacityUtilization: 91.0,
      labUpgrades: 'Aerospace Precision Tooling Lab & Agri-Drone Pilot Testing Arena',
      trades: [
        {
          tradeName: 'Aerospace Jig & Fixture Tooling Maker',
          tradeNameMr: 'एरोस्पेस जिग व फिक्सचर टूल मेकर',
          nsqfLevel: 5,
          annualIntake: 220,
          demandIndex: 93,
          industryOpenings: 1180,
          topHiringPartners: ['Hindustan Aeronautics Limited (HAL Ozar)', 'Mahindra Defense', 'Gloster Cables']
        },
        {
          tradeName: 'Agricultural Drone Assembly & Sensor Calibration',
          tradeNameMr: 'कृषी ड्रोन असेंब्ली व सेन्सर कॅलिब्रेशन',
          nsqfLevel: 4,
          annualIntake: 190,
          demandIndex: 95,
          industryOpenings: 1250,
          topHiringPartners: ['Garuda Aerospace Nashik', 'Sula Vineyards Agri-Tech', 'Sahyadri Farms']
        }
      ]
    }
  ],
  kolhapur: [
    {
      id: 'iti_kolhapur_polytechnic',
      districtId: 'kolhapur',
      itiName: 'Government Polytechnic & KEA Foundry Center',
      itiType: 'Polytechnic Industry Lab',
      address: 'Shivaji Peth, Kolhapur 416012',
      totalIntake: 940,
      enrolledStudents: 825,
      capacityUtilization: 87.8,
      labUpgrades: 'Green Sand Metallurgy Testing & 5-Axis CNC Precision Die Bay',
      trades: [
        {
          tradeName: 'Foundry Automation & Induction Furnace Melter',
          tradeNameMr: 'फाउंड्री ऑटोमेशन व इंडक्शन फर्नेस मेल्टर',
          nsqfLevel: 4,
          annualIntake: 250,
          demandIndex: 91,
          industryOpenings: 1150,
          topHiringPartners: ['Menon & Menon Limited', 'Kirloskar Ferrous', 'Gateli Foundry Cluster']
        },
        {
          tradeName: 'Sugar Plant Automation & Turbine Maintenance',
          tradeNameMr: 'साखर कारखाना ऑटोमेशन व टर्बाइन देखभाल',
          nsqfLevel: 5,
          annualIntake: 180,
          demandIndex: 87,
          industryOpenings: 790,
          topHiringPartners: ['D.Y. Patil Sugar Mills', 'Renuka Sugars', 'Kisanveer Cooperative']
        }
      ]
    }
  ],
  thane: [
    {
      id: 'iti_thane_wagle',
      districtId: 'thane',
      itiName: 'Government ITI Wagle Estate & Data Cluster',
      itiType: 'Government ITI',
      address: 'Road No. 16, Wagle Estate, Thane 400604',
      totalIntake: 1250,
      enrolledStudents: 1170,
      capacityUtilization: 93.6,
      labUpgrades: 'Critical HVAC Power Infrastructure & Chemical Automation SCADA Lab',
      trades: [
        {
          tradeName: 'Critical HVAC & Data Center Cooling Technician',
          tradeNameMr: 'क्रिटिकल एचव्हॅक व डेटा सेंटर कुलिंग तंत्रज्ञ',
          nsqfLevel: 5,
          annualIntake: 280,
          demandIndex: 96,
          industryOpenings: 1980,
          topHiringPartners: ['STT GDC India', 'Equinix Data Centers', 'Blue Star Commercial']
        },
        {
          tradeName: 'Specialty Chemical Plant Process Controller',
          tradeNameMr: 'स्पेशालिटी केमिकल प्लांट प्रोसेस कंट्रोलर',
          nsqfLevel: 5,
          annualIntake: 240,
          demandIndex: 92,
          industryOpenings: 1420,
          topHiringPartners: ['Deepak Fertilisers', 'Aarti Industries MIDC', 'BASF India']
        }
      ]
    }
  ]
};

export const STUDENT_PLACEMENT_ROSTER: StudentPlacementRecord[] = [
  // Pune District Placements
  {
    id: 'plc_pun_001',
    studentName: 'Anand Santosh Kadam',
    studentCode: 'MAH-PUN-2026-8812',
    districtId: 'pune',
    districtName: 'Pune',
    itiName: 'Government ITI Aundh (CoE)',
    trade: 'EV Powertrain Diagnostics',
    nsqfLevel: 5,
    placedCompany: 'Tata Motors EV Division',
    sector: 'Automotive & Clean Mobility',
    roleTitle: 'Junior EV Battery Diagnostics Specialist',
    packageStipendMonthly: 28500,
    placementType: 'Full-Time Technologist',
    placementDate: '12 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-PUN-AUT-9921'
  },
  {
    id: 'plc_pun_002',
    studentName: 'Priyanka Ramesh Jadhav',
    studentCode: 'MAH-PUN-2026-8945',
    districtId: 'pune',
    districtName: 'Pune',
    itiName: 'Government ITI Pimpri-Chinchwad',
    trade: 'Automotive Mechatronics & CAN Bus',
    nsqfLevel: 5,
    placedCompany: 'Bajaj Auto Limited (Chetak Plant)',
    sector: 'Automotive & Clean Mobility',
    roleTitle: 'ECU Calibration Apprentice',
    packageStipendMonthly: 22000,
    placementType: 'MAPS Apprenticeship',
    placementDate: '08 Sep 2026',
    verificationStatus: 'NAPS_PORTAL_ACTIVE',
    verificationToken: 'MAPS-BAJ-2026-4410'
  },
  {
    id: 'plc_pun_003',
    studentName: 'Sagar Dnyaneshwar Shinde',
    studentCode: 'MAH-PUN-2026-9011',
    districtId: 'pune',
    districtName: 'Pune',
    itiName: 'Government ITI Aundh (CoE)',
    trade: 'Precision CNC Machining',
    nsqfLevel: 5,
    placedCompany: 'Bharat Forge Limited',
    sector: 'Precision Engineering',
    roleTitle: '5-Axis CNC Setup Specialist',
    packageStipendMonthly: 26000,
    placementType: 'Full-Time Technologist',
    placementDate: '28 Aug 2026',
    verificationStatus: 'OFFICIAL_AUDITED',
    verificationToken: 'DVET-BFL-KLY-3819'
  },
  {
    id: 'plc_pun_004',
    studentName: 'Snehal Vikas Deshmukh',
    studentCode: 'MAH-PUN-2026-9188',
    districtId: 'pune',
    districtName: 'Pune',
    itiName: 'Government Women Technical ITI Koregaon',
    trade: 'SMT Micro-soldering & Assembly',
    nsqfLevel: 4,
    placedCompany: 'Foxconn India Mega Plant',
    sector: 'Electronics & Semiconductors',
    roleTitle: 'Surface Mount Line Lead',
    packageStipendMonthly: 21500,
    placementType: 'Dual Training Scheme',
    placementDate: '15 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-FOX-SMT-7182'
  },

  // Mumbai Suburban District Placements
  {
    id: 'plc_mum_001',
    studentName: 'Kunal Rajesh Mehta',
    studentCode: 'MAH-MUM-2026-7241',
    districtId: 'mumbai_suburban',
    districtName: 'Mumbai Suburban',
    itiName: 'Government ITI Mulund',
    trade: 'Cloud Infrastructure & Linux Systems',
    nsqfLevel: 6,
    placedCompany: 'CtrlS Datacenters Limited',
    sector: 'IT & Cloud Services',
    roleTitle: 'Cloud Systems Associate',
    packageStipendMonthly: 32000,
    placementType: 'Full-Time Technologist',
    placementDate: '10 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-MUM-CLD-1190'
  },
  {
    id: 'plc_mum_002',
    studentName: 'Tanvi Dilip Parab',
    studentCode: 'MAH-MUM-2026-7319',
    districtId: 'mumbai_suburban',
    districtName: 'Mumbai Suburban',
    itiName: 'Government ITI Mulund',
    trade: 'Fintech Application Operations',
    nsqfLevel: 5,
    placedCompany: 'HDFC Securities Digital Cell',
    sector: 'BFSI & Fintech',
    roleTitle: 'Fintech Operations Associate',
    packageStipendMonthly: 24500,
    placementType: 'MAPS Apprenticeship',
    placementDate: '02 Sep 2026',
    verificationStatus: 'NAPS_PORTAL_ACTIVE',
    verificationToken: 'MAPS-HDF-2026-5521'
  },

  // Nagpur District Placements
  {
    id: 'plc_nag_001',
    studentName: 'Manoj Babanrao Raut',
    studentCode: 'MAH-NAG-2026-5120',
    districtId: 'nagpur',
    districtName: 'Nagpur',
    itiName: 'Government ITI Nagpur South',
    trade: 'Grid-Connected Solar PV Systems',
    nsqfLevel: 4,
    placedCompany: 'Tata Power Solar Projects',
    sector: 'Renewable Energy & Solar',
    roleTitle: 'Solar Grid Commissioning Engineer',
    packageStipendMonthly: 23500,
    placementType: 'Full-Time Technologist',
    placementDate: '14 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-NAG-SOL-4401'
  },
  {
    id: 'plc_nag_002',
    studentName: 'Pratibha Devidas Meshram',
    studentCode: 'MAH-NAG-2026-5233',
    districtId: 'nagpur',
    districtName: 'Nagpur',
    itiName: 'Government ITI Nagpur South',
    trade: 'Aviation Component Overhaul (MIHAN)',
    nsqfLevel: 5,
    placedCompany: 'Air India MRO MIHAN Facility',
    sector: 'Defense & Aerospace MRO',
    roleTitle: 'Aircraft Sheet Metal Apprentice',
    packageStipendMonthly: 20500,
    placementType: 'MAPS Apprenticeship',
    placementDate: '05 Sep 2026',
    verificationStatus: 'NAPS_PORTAL_ACTIVE',
    verificationToken: 'MAPS-AIM-MIH-8820'
  },

  // Aurangabad / Chhatrapati Sambhaji Nagar Placements
  {
    id: 'plc_aur_001',
    studentName: 'Rohit Chandrakant Patil',
    studentCode: 'MAH-AUR-2026-4019',
    districtId: 'aurangabad',
    districtName: 'Chhatrapati Sambhaji Nagar',
    itiName: 'Government ITI Sambhaji Nagar (AURIC)',
    trade: 'Robotic Arc Welding',
    nsqfLevel: 5,
    placedCompany: 'Bajaj Auto Waluj Plant',
    sector: 'Automotive Components',
    roleTitle: 'Automated Robotic Welder',
    packageStipendMonthly: 25000,
    placementType: 'Full-Time Technologist',
    placementDate: '11 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-AUR-BAJ-7714'
  },
  {
    id: 'plc_aur_002',
    studentName: 'Aishwarya Namdev Kale',
    studentCode: 'MAH-AUR-2026-4102',
    districtId: 'aurangabad',
    districtName: 'Chhatrapati Sambhaji Nagar',
    itiName: 'Government ITI Sambhaji Nagar (AURIC)',
    trade: 'Pharma Formulation & Clean Room',
    nsqfLevel: 5,
    placedCompany: 'Lupin Pharmaceuticals (Shendra)',
    sector: 'Pharmaceuticals',
    roleTitle: 'Clean Room Process Chemist',
    packageStipendMonthly: 23000,
    placementType: 'MAPS Apprenticeship',
    placementDate: '29 Aug 2026',
    verificationStatus: 'OFFICIAL_AUDITED',
    verificationToken: 'MAPS-LUP-AUR-3301'
  },

  // Nashik District Placements
  {
    id: 'plc_nas_001',
    studentName: 'Gaurav Nivrutti Tambe',
    studentCode: 'MAH-NAS-2026-6119',
    districtId: 'nashik',
    districtName: 'Nashik',
    itiName: 'Government ITI Nashik Road',
    trade: 'Aerospace Jig & Fixture Tooling',
    nsqfLevel: 5,
    placedCompany: 'Hindustan Aeronautics Limited (HAL Ozar)',
    sector: 'Defense & Aerospace',
    roleTitle: 'Aircraft Tooling Machinist',
    packageStipendMonthly: 27000,
    placementType: 'Full-Time Technologist',
    placementDate: '07 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-HAL-OZR-5591'
  },
  {
    id: 'plc_nas_002',
    studentName: 'Pooja Sanjay Sonawane',
    studentCode: 'MAH-NAS-2026-6284',
    districtId: 'nashik',
    districtName: 'Nashik',
    itiName: 'Government ITI Nashik Road',
    trade: 'Agricultural Drone Assembly & Sensor',
    nsqfLevel: 4,
    placedCompany: 'Sahyadri Farms Agri-Tech Division',
    sector: 'Agro-Tech & Automation',
    roleTitle: 'Drone Fleet Technician',
    packageStipendMonthly: 21000,
    placementType: 'MAPS Apprenticeship',
    placementDate: '18 Sep 2026',
    verificationStatus: 'NAPS_PORTAL_ACTIVE',
    verificationToken: 'MAPS-SAH-DRN-2026'
  },

  // Kolhapur District Placements
  {
    id: 'plc_kol_001',
    studentName: 'Vinayak Sambhaji Mane',
    studentCode: 'MAH-KOL-2026-3105',
    districtId: 'kolhapur',
    districtName: 'Kolhapur',
    itiName: 'Government Polytechnic & KEA Lab',
    trade: 'Foundry Automation & Induction Melting',
    nsqfLevel: 4,
    placedCompany: 'Menon & Menon Limited (Shiroli)',
    sector: 'Foundry & Metallurgy',
    roleTitle: 'Automated Furnace Operator',
    packageStipendMonthly: 24000,
    placementType: 'Full-Time Technologist',
    placementDate: '04 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-KOL-MNM-1920'
  },

  // Thane District Placements
  {
    id: 'plc_tha_001',
    studentName: 'Amit Jagdish Verma',
    studentCode: 'MAH-THA-2026-2091',
    districtId: 'thane',
    districtName: 'Thane',
    itiName: 'Government ITI Wagle Estate',
    trade: 'Critical HVAC & Data Center Cooling',
    nsqfLevel: 5,
    placedCompany: 'STT GDC India (Airoli Data Campus)',
    sector: 'IT & Data Centers',
    roleTitle: 'Critical Facility Cooling Engineer',
    packageStipendMonthly: 29500,
    placementType: 'Full-Time Technologist',
    placementDate: '13 Sep 2026',
    verificationStatus: 'DVET_VERIFIED',
    verificationToken: 'DVET-THA-STT-9902'
  }
];

export const SAMPLE_RESUMES = [
  {
    id: 'res_ev_technician',
    label: 'Electrician & EV Technician (ITI Graduate)',
    targetRole: 'Electric Vehicle (EV) Service & Battery Specialist',
    targetDistrict: 'Pune',
    content: `NAME: Santosh R. Gaikwad
ROLL NO: MAH-DVET-2024-4412
EMAIL: santosh.gaikwad@example.com | PHONE: +91 98231 45678
LOCATION: Pimpri-Chinchwad, Pune, Maharashtra

PROFESSIONAL SUMMARY:
Certified ITI Electrician graduate from Government ITI Aundh (2025 batch, 84% marks). Possesses 1 year of practical apprentice experience in workshop electrical wiring, basic battery pack testing, and three-phase industrial motor connections. Completed 120 hours of hands-on multimeter diagnostics and high-voltage safety precautions. Seeking an EV technician role in Pune's automotive cluster.

EDUCATION & CREDENTIALS:
- Government ITI Aundh: National Trade Certificate (NTC) in Electrician Trade (NSQF Level 4) - Distinction
- Secondary School Certificate (SSC): Maharashtra State Board - 78% (Science & Mathematics)
- Workshop Safety Certification: ISO 9001 Industrial Safety Passbook

TECHNICAL SKILLS & COMPETENCIES:
- AC/DC circuit analysis, electrical schematic blueprint interpretation
- Multi-meter, insulation resistance tester (Megger), clamp-meter handling
- High-voltage lockout-tagout (LOTO) basic procedures
- Motor winding inspection, relay wiring, PLC terminal connections
- Soldering, crimping, cable harnessing

WORK EXPERIENCE:
Apprentice Technician | Shinde Auto Electrical Works, Bhosari MIDC (Aug 2025 - Present)
- Assisted senior master technicians in troubleshooting commercial vehicle electrical harnesses and starter alternators.
- Conducted regular battery specific gravity and load test calibrations for 40+ vehicles weekly.
- Maintained clean workshop floor compliant with 5S standards.`
  },
  {
    id: 'res_cnc_machinist',
    label: 'Mechanical Diploma / CNC Operator',
    targetRole: '5-Axis CNC & Advanced Tooling Specialist',
    targetDistrict: 'Kolhapur',
    content: `NAME: Pravin V. Kulkarni
EMAIL: pravin.kulkarni@example.com | MOBILE: +91 94220 11234
RESIDENCE: Shiroli MIDC, Kolhapur, Maharashtra

OBJECTIVE:
Dynamic CNC Milling and Lathe Machine Operator with Diploma in Mechanical Engineering from Government Polytechnic Kolhapur. 18 months of precision manufacturing experience in foundry and machining cluster. Adept in G-code / M-code program optimization and GD&T quality inspection.

TECHNICAL COMPETENCIES:
- CNC Vertical Machining Center (VMC) 3-Axis operation (Fanuc / Siemens 840D controller)
- G-Code and M-Code manual programming and offset settings
- Blueprint reading with Geometric Dimensioning and Tolerancing (GD&T)
- Vernier calipers, micrometer, bore gauge, dial test indicator (0.001mm tolerance)
- Basic Mastercam 2D toolpath generation

PROFESSIONAL EXPERIENCE:
Junior CNC Operator | Kolhapur Precision Castings Pvt Ltd (Feb 2025 - Present)
- Operated 3-axis CNC vertical milling centers producing precision automobile cylinder heads.
- Reduced tool wear cycle rejection rate by 3.8% through optimum coolant feed adjustments.
- Performed first-piece inspection and maintained statistical process control (SPC) sheets.

EDUCATION:
- Diploma in Mechanical Engineering, Government Polytechnic Kolhapur (First Class, 76%)
- Certificate in CAD/CAM AutoCAD and SolidWorks Basics`
  },
  {
    id: 'res_software_cloud',
    label: 'BCA / Diploma Graduate seeking Cloud Technologist',
    targetRole: 'Full-Stack Web Development & Cloud Readiness',
    targetDistrict: 'Mumbai Suburban',
    content: `NAME: Akanksha S. Sawant
EMAIL: akanksha.sawant@example.com | PHONE: +91 98190 67890
LOCATION: Mulund (West), Mumbai Suburban, Maharashtra

SUMMARY:
Recent Computer Applications graduate with solid understanding of modern web architectures, relational databases, and JavaScript/TypeScript ecosystem. Completed CDAC modular workshop on web fundamentals. Passionate about transitioning to cloud-ready software engineering under Maharashtra State IT initiatives.

CORE SKILLS:
- Languages: JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3/Tailwind
- Frameworks & Libraries: React, Node.js, Express.js
- Databases: PostgreSQL, SQLite
- Developer Tools: Git, GitHub, VS Code, Postman API Testing
- Fundamental understanding of REST APIs and client-server architecture

ACADEMIC PROJECTS:
1. Citizen Grievance Tracker Portal (Academic Capstone)
   - Built a full-stack React and Express application allowing residents to register local ward issues.
   - Designed PostgreSQL schema for ticket statuses with JWT user authentication.
2. District ITI Search Helper
   - Client-side application using open government datasets to filter vocational courses by tehsil.

EDUCATION:
- Bachelor of Computer Applications (BCA), Mumbai University (2025) - 8.4 CGPA
- CDAC Web Technologies Foundation Certificate`
  }
];
