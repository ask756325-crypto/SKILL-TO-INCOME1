import { JobRole, Course, JobListing, GovernmentScheme, DistrictMetric, CandidateProfile, StudentCaseload, PhysicalCenter, CriticalAlert, CitizenFeedback } from '../types';

export const MAHARASHTRA_DISTRICTS: DistrictMetric[] = [
  {
    id: 'pune',
    name: 'Pune',
    nameMr: 'पुणे',
    nameHi: 'पुणे',
    division: 'Pune',
    topDemandedSkills: ['EV Powertrain Diagnostics', 'Precision CNC Machining', 'Full-Stack Web & Cloud', 'Industrial IoT', 'PLC Automation'],
    activeLearners: 42150,
    placementRate: 84.6,
    topSectors: ['Automotive & EV', 'IT & Cloud Services', 'Precision Engineering', 'Biopharma'],
    itiCount: 38,
    apprenticeshipOpenings: 5420,
    trainingParticipationRate: 88.4,
    capacityUtilizationRate: 96.2,
    femaleParticipationRate: 39.8,
    budgetAllocationCrores: 48.5,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 33400, demand: 4100 },
      { quarter: 'Q2 25', participation: 35800, demand: 4450 },
      { quarter: 'Q3 25', participation: 37900, demand: 4720 },
      { quarter: 'Q4 25', participation: 39200, demand: 5050 },
      { quarter: 'Q1 26', participation: 40800, demand: 5210 },
      { quarter: 'Q2 26', participation: 42150, demand: 5420 }
    ],
    actionableInsight: 'Demand for EV technicians exceeds ITI seats by 38%. Sanction 4 new CoE battery labs in Pimpri-Chinchwad cluster and mandate MAPS employer MoUs.',
    actionableInsightMr: 'ईव्ही तंत्रज्ञांची मागणी आयटीआय जागांपेक्षा ३८% जास्त आहे. पिंपरी-चिंचवड क्लस्टरमध्ये ४ नवीन सीओई लॅब मंजूर करा आणि मॅप्स करार सक्तीचे करा.',
    actionableInsightHi: 'ईवी तकनीशियनों की मांग आईटीआई सीटों से 38% अधिक है। पिंपरी-चिंचवड़ क्लस्टर में 4 नई सीओई लैब स्वीकृत करें और एमएपीएस समझौते अनिवार्य करें।',
    trust: {
      level: 'OFFICIAL',
      source: 'MSSDS District Skills Development Plan (DSDP) 2026',
      lastUpdated: '15 August 2026',
      verifiedBy: 'District Skill Committee, Collectorate Pune'
    }
  },
  {
    id: 'mumbai_suburban',
    name: 'Mumbai Suburban',
    nameMr: 'मुंबई उपनगर',
    nameHi: 'मुंबई उपनगर',
    division: 'Konkan',
    topDemandedSkills: ['Financial Data Analytics', 'Healthcare Informatics', 'Cybersecurity Ops', 'Cold Chain & Logistics', 'Digital Marketing'],
    activeLearners: 51200,
    placementRate: 88.2,
    topSectors: ['BFSI & Fintech', 'Healthcare & Diagnostics', 'Media & Entertainment', 'Logistics'],
    itiCount: 29,
    apprenticeshipOpenings: 7150,
    trainingParticipationRate: 91.5,
    capacityUtilizationRate: 98.4,
    femaleParticipationRate: 46.2,
    budgetAllocationCrores: 62.0,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 42100, demand: 5800 },
      { quarter: 'Q2 25', participation: 44500, demand: 6100 },
      { quarter: 'Q3 25', participation: 46800, demand: 6420 },
      { quarter: 'Q4 25', participation: 48500, demand: 6780 },
      { quarter: 'Q1 26', participation: 49900, demand: 6990 },
      { quarter: 'Q2 26', participation: 51200, demand: 7150 }
    ],
    actionableInsight: 'Fintech & Healthcare apprentice absorption at 92%. Expand evening polytechnic batches for working youth under Pramod Mahajan scheme.',
    actionableInsightMr: 'फिनटेक व आरोग्य क्षेत्रातील प्रशिक्षणार्थी सामावून घेण्याचा दर ९२% आहे. काम करणाऱ्या तरुणांसाठी संध्याकाळच्या बॅचेस वाढवा.',
    actionableInsightHi: 'फिनटेक और स्वास्थ्य क्षेत्र में प्रशिक्षुओं का समायोजन 92% है। कामकाजी युवाओं के लिए शाम के सत्रों का विस्तार करें।',
    trust: {
      level: 'OFFICIAL',
      source: 'Mahaswayam Portal & DVET Regional Directorate',
      lastUpdated: '01 September 2026',
      verifiedBy: 'DVET Mumbai Division'
    }
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    nameMr: 'नागपूर',
    nameHi: 'नागपुर',
    division: 'Nagpur',
    topDemandedSkills: ['Multimodal Cargo Management', 'Aviation Maintenance Tech', 'Solar Farm Installation', 'Heavy Earthmoving Equipment'],
    activeLearners: 28400,
    placementRate: 79.4,
    topSectors: ['Logistics & MIHAN SEZ', 'Defense & Aerospace', 'Renewable Energy', 'Mining Machinery'],
    itiCount: 31,
    apprenticeshipOpenings: 3890,
    trainingParticipationRate: 76.8,
    capacityUtilizationRate: 84.1,
    femaleParticipationRate: 31.5,
    budgetAllocationCrores: 34.8,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 22100, demand: 2900 },
      { quarter: 'Q2 25', participation: 23600, demand: 3150 },
      { quarter: 'Q3 25', participation: 25100, demand: 3390 },
      { quarter: 'Q4 25', participation: 26400, demand: 3620 },
      { quarter: 'Q1 26', participation: 27500, demand: 3780 },
      { quarter: 'Q2 26', participation: 28400, demand: 3890 }
    ],
    actionableInsight: 'Participation gap identified in rural tehsils (Kuhi, Umred). Deploy 6 mobile skill vans and align MIHAN aerospace defense offset apprenticeships.',
    actionableInsightMr: 'ग्रामीण तालुक्यांमध्ये सहभागाचा अभाव. ६ फिरती कौशल्य वाहने तैनात करा आणि मिहान एरोस्पेस अप्रेंटिसशिपशी संलग्न करा.',
    actionableInsightHi: 'ग्रामीण तहसीलों में भागीदारी की कमी। 6 मोबाइल कौशल वाहन तैनात करें और मिहान एयरोस्पेस से युवाओं को जोड़ें।',
    trust: {
      level: 'OFFICIAL',
      source: 'Vidarbha Skill Mission & MSSDS Quarterly Report',
      lastUpdated: '20 August 2026',
      verifiedBy: 'District Collector Office Nagpur'
    }
  },
  {
    id: 'chhatrapati_sambhaji_nagar',
    name: 'Chhatrapati Sambhaji Nagar',
    nameMr: 'छत्रपती संभाजीनगर',
    nameHi: 'छत्रपति संभाजीनगर',
    division: 'Chhatrapati Sambhaji Nagar',
    topDemandedSkills: ['Automotive Welding & Robotics', 'Pharmaceutical Formulation', 'Brewing & Food Processing Tech', 'Industrial Electrical'],
    activeLearners: 22600,
    placementRate: 81.1,
    topSectors: ['Auto Components (Shendra-Bidkin AURIC)', 'Pharmaceuticals', 'Agro-processing'],
    itiCount: 24,
    apprenticeshipOpenings: 2980,
    trainingParticipationRate: 81.2,
    capacityUtilizationRate: 89.5,
    femaleParticipationRate: 34.0,
    budgetAllocationCrores: 29.5,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 17800, demand: 2150 },
      { quarter: 'Q2 25', participation: 19000, demand: 2380 },
      { quarter: 'Q3 25', participation: 20200, demand: 2590 },
      { quarter: 'Q4 25', participation: 21100, demand: 2780 },
      { quarter: 'Q1 26', participation: 21900, demand: 2890 },
      { quarter: 'Q2 26', participation: 22600, demand: 2980 }
    ],
    actionableInsight: 'AURIC Shendra-Bidkin mega projects require 1,800 robotics welding technicians. Establish joint apprenticeship council with AURIC DIC.',
    actionableInsightMr: 'ऑरिक शेंद्रा-बिडकीन प्रकल्पांसाठी १,८०० रोबोटिक्स तंत्रज्ञांची गरज. ऑरिक डीआयसीसोबत संयुक्त परिषद स्थापन करा.',
    actionableInsightHi: 'ऑरिक शेंद्रा-बिडकीन परियोजनाओं के लिए 1,800 रोबोटिक्स वेल्डिंग तकनीशियनों की आवश्यकता है। संयुक्त परिषद गठित करें।',
    trust: {
      level: 'OFFICIAL',
      source: 'AURIC Industrial Board & MSSDS Regional Cell',
      lastUpdated: '10 July 2026',
      verifiedBy: 'General Manager, DIC Sambhaji Nagar'
    }
  },
  {
    id: 'nashik',
    name: 'Nashik',
    nameMr: 'नाशिक',
    nameHi: 'नासिक',
    division: 'Nashik',
    topDemandedSkills: ['Aerospace Component Tooling', 'Precision Fabrication', 'Agri-drones & Sensor Tech', 'Greenhouse Maintenance'],
    activeLearners: 24700,
    placementRate: 82.5,
    topSectors: ['Defense & HAL Ancillaries', 'Agro-Tech & Wine Tech', 'Electrical Equipment'],
    itiCount: 26,
    apprenticeshipOpenings: 3120,
    trainingParticipationRate: 83.6,
    capacityUtilizationRate: 91.0,
    femaleParticipationRate: 37.2,
    budgetAllocationCrores: 31.0,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 19200, demand: 2300 },
      { quarter: 'Q2 25', participation: 20500, demand: 2520 },
      { quarter: 'Q3 25', participation: 21900, demand: 2750 },
      { quarter: 'Q4 25', participation: 22900, demand: 2920 },
      { quarter: 'Q1 26', participation: 23800, demand: 3040 },
      { quarter: 'Q2 26', participation: 24700, demand: 3120 }
    ],
    actionableInsight: 'Agri-drone technician demand grew +54% following drone subsidy scheme. Standardize 3-month DGCA-certified training across 4 Nashik ITIs.',
    actionableInsightMr: 'कृषी ड्रोन तंत्रज्ञांची मागणी ५४% वाढली. नाशिकच्या ४ आयटीआयमध्ये डीजीसीए-प्रमाणित ३ महिन्यांचे प्रशिक्षण सुरू करा.',
    actionableInsightHi: 'कृषि ड्रोन तकनीशियनों की मांग 54% बढ़ी। नासिक के 4 आईटीआई में 3 महीने का डीजीसीए-प्रमाणित प्रशिक्षण अनिवार्य करें।',
    trust: {
      level: 'OFFICIAL',
      source: 'North Maharashtra Skill Forum & DVET',
      lastUpdated: '05 September 2026',
      verifiedBy: 'District Skill Development Officer Nashik'
    }
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    nameMr: 'कोल्हापूर',
    nameHi: 'कोल्हापुर',
    division: 'Pune',
    topDemandedSkills: ['Foundry Metallurgy & Pattern Making', 'Textile Powerloom Automation', 'Sugar Co-generation Tech', 'Hydraulics'],
    activeLearners: 18900,
    placementRate: 83.0,
    topSectors: ['Foundry & Engineering', 'Textiles', 'Agro-Sugar Tech'],
    itiCount: 21,
    apprenticeshipOpenings: 2410,
    trainingParticipationRate: 80.5,
    capacityUtilizationRate: 87.8,
    femaleParticipationRate: 33.1,
    budgetAllocationCrores: 24.2,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 15100, demand: 1800 },
      { quarter: 'Q2 25', participation: 16000, demand: 1980 },
      { quarter: 'Q3 25', participation: 16900, demand: 2120 },
      { quarter: 'Q4 25', participation: 17700, demand: 2260 },
      { quarter: 'Q1 26', participation: 18300, demand: 2340 },
      { quarter: 'Q2 26', participation: 18900, demand: 2410 }
    ],
    actionableInsight: 'Foundry cluster modernization requiring green sand & automation tech. KEA industry lab partnership needs ₹2.8 Cr equipment upgrade sanction.',
    actionableInsightMr: 'फाउंड्री क्लस्टरच्या आधुनिकीकरणासाठी ऑटोमेशन तंत्रज्ञानाची गरज. केईए लॅबसाठी २.८ कोटी रुपयांचे अनुदान मंजूर करा.',
    actionableInsightHi: 'फाउंड्री क्लस्टर आधुनिकीकरण हेतु ऑटोमेशन तकनीक आवश्यक। केईए उद्योग लैब के लिए 2.8 करोड़ के उपकरण अनुदान को स्वीकृति दें।',
    trust: {
      level: 'OFFICIAL',
      source: 'Kolhapur Engineering Association & MSSDS',
      lastUpdated: '12 August 2026',
      verifiedBy: 'Collectorate Kolhapur'
    }
  },
  {
    id: 'thane',
    name: 'Thane',
    nameMr: 'ठाणे',
    nameHi: 'ठाणे',
    division: 'Konkan',
    topDemandedSkills: ['Specialty Chemical Plant Ops', 'Supply Chain ERP', 'HVAC & Facility Management', 'Data Center Infrastructure'],
    activeLearners: 34500,
    placementRate: 85.9,
    topSectors: ['Chemical & Petrochemical', 'IT & Data Centers', 'Warehousing'],
    itiCount: 27,
    apprenticeshipOpenings: 4670,
    trainingParticipationRate: 86.0,
    capacityUtilizationRate: 93.7,
    femaleParticipationRate: 38.6,
    budgetAllocationCrores: 41.5,
    quarterlyTrends: [
      { quarter: 'Q1 25', participation: 27500, demand: 3600 },
      { quarter: 'Q2 25', participation: 29200, demand: 3900 },
      { quarter: 'Q3 25', participation: 30800, demand: 4150 },
      { quarter: 'Q4 25', participation: 32100, demand: 4380 },
      { quarter: 'Q1 26', participation: 33400, demand: 4520 },
      { quarter: 'Q2 26', participation: 34500, demand: 4670 }
    ],
    actionableInsight: 'Rapid data center growth in Airoli-Mahape demands certified HVAC and critical power techs. Introduce dual certification with MIDC industrial park.',
    actionableInsightMr: 'ऐरोली-महापे भागात डेटा सेंटर्सच्या वाढीमुळे एचव्हॅक तंत्रज्ञांची तीव्र मागणी. एमआयडीसीसोबत दुहेरी प्रमाणपत्र अभ्यासक्रम सुरू करा.',
    actionableInsightHi: 'ऐरोली-महापे में डेटा सेंटरों की वृद्धि से एचवीएसी तकनीशियनों की भारी मांग। एमआईडीसी के साथ दोहरी प्रमाणन योजना शुरू करें।',
    trust: {
      level: 'OFFICIAL',
      source: 'MIDC Thane-Belapur Industrial Association & DVET',
      lastUpdated: '18 August 2026',
      verifiedBy: 'DVET Konkan Division'
    }
  }
];

export const TARGET_JOB_ROLES: JobRole[] = [
  {
    id: 'ev_technician',
    title: 'Electric Vehicle (EV) Service & Battery Specialist',
    titleMr: 'इलेक्ट्रिक वाहन (EV) सेवा आणि बॅटरी तंत्रज्ञ',
    titleHi: 'इलेक्ट्रिक वाहन (EV) सेवा एवं बैटरी विशेषज्ञ',
    sector: 'Automotive & Clean Mobility',
    nsqfLevel: 5,
    avgSalary: '₹28,000 - ₹42,000 / month',
    growthRate: '+34% YoY in Maharashtra',
    description: 'Specialist trained in high-voltage safety, Li-ion battery pack inspection, BMS diagnostics, and motor control electronics for 2W, 3W, and 4W electric mobility.',
    requiredSkills: [
      { name: 'High-Voltage Safety & Lockout/Tagout', requiredLevel: 5, importance: 'Critical' },
      { name: 'Li-Ion Battery Health Diagnostic & Cell Balancing', requiredLevel: 4, importance: 'Critical' },
      { name: 'CAN Bus & OBD-II Scanner Analysis', requiredLevel: 4, importance: 'Critical' },
      { name: 'Motor Controller & Inverter Calibration', requiredLevel: 3, importance: 'Recommended' },
      { name: 'Regenerative Braking Systems', requiredLevel: 3, importance: 'Recommended' }
    ],
    hiringDistricts: ['Pune', 'Nashik', 'Chhatrapati Sambhaji Nagar', 'Thane']
  },
  {
    id: 'cnc_robotics_operator',
    title: 'Precision CNC Machining & Cobot Programmer',
    titleMr: 'प्रिसिजन सीएनसी मशीनिंग आणि रोबोटिक्स ऑपरेटर',
    titleHi: 'प्रिसिजन सीएनसी मशीनिंग एवं कोबोट ऑपरेटर',
    sector: 'Heavy & Precision Engineering',
    nsqfLevel: 5,
    avgSalary: '₹25,000 - ₹38,000 / month',
    growthRate: '+22% YoY in Maharashtra',
    description: 'Expert in setting up 3-axis & 5-axis CNC vertical milling centers, generating G-code via CAM software, and programming collaborative industrial robot arms for part handling.',
    requiredSkills: [
      { name: 'G-Code & M-Code Programming', requiredLevel: 5, importance: 'Critical' },
      { name: 'Geometric Dimensioning & Tolerancing (GD&T)', requiredLevel: 4, importance: 'Critical' },
      { name: 'CAM Toolpath Generation (Mastercam / Fusion)', requiredLevel: 4, importance: 'Critical' },
      { name: 'Industrial Robotic Arm Teach Pendant Ops', requiredLevel: 3, importance: 'Recommended' },
      { name: 'Metrology & CMM Inspection', requiredLevel: 4, importance: 'Recommended' }
    ],
    hiringDistricts: ['Pune', 'Kolhapur', 'Chhatrapati Sambhaji Nagar', 'Nagpur']
  },
  {
    id: 'fullstack_cloud_dev',
    title: 'Full-Stack Web & Cloud Application Developer',
    titleMr: 'फुल-स्टॅक वेब आणि क्लाउड अ‍ॅप्लिकेशन डेव्हलपर',
    titleHi: 'फुल-स्टैक वेब एवं क्लाउड एप्लीकेशन डेवलपर',
    sector: 'Information Technology & Cloud Services',
    nsqfLevel: 6,
    avgSalary: '₹35,000 - ₹65,000 / month',
    growthRate: '+28% YoY in Maharashtra',
    description: 'Software engineer building production-grade web applications with modern frontend frameworks, REST/GraphQL APIs, SQL databases, and containerized deployment.',
    requiredSkills: [
      { name: 'TypeScript & React Architecture', requiredLevel: 5, importance: 'Critical' },
      { name: 'Node.js & Express API Engineering', requiredLevel: 4, importance: 'Critical' },
      { name: 'PostgreSQL / Relational Data Modeling', requiredLevel: 4, importance: 'Critical' },
      { name: 'Docker & Basic Cloud Deployment', requiredLevel: 3, importance: 'Recommended' },
      { name: 'Git Team Collaboration & CI/CD', requiredLevel: 4, importance: 'Critical' }
    ],
    hiringDistricts: ['Pune', 'Mumbai Suburban', 'Thane', 'Nagpur']
  },
  {
    id: 'solar_pv_installer',
    title: 'Solar PV Grid & Micro-grid Installation Lead',
    titleMr: 'सौर पीव्ही ग्रिड आणि मायक्रोग्रिड इन्स्टॉलेशन प्रमुख',
    titleHi: 'सोलर पीवी ग्रिड एवं माइक्रोग्रिड इंस्टॉलेशन लीड',
    sector: 'Renewable Energy & Power',
    nsqfLevel: 4,
    avgSalary: '₹22,000 - ₹34,000 / month',
    growthRate: '+41% YoY in Maharashtra',
    description: 'Technician specialized in rooftop and commercial solar photovoltaic arrays, grid-tied inverters, net-metering compliance under MSEDCL regulations, and earthing/surge safety.',
    requiredSkills: [
      { name: 'PV Module Stringing & Inverter Sizing', requiredLevel: 4, importance: 'Critical' },
      { name: 'MSEDCL Grid Synchronization Standards', requiredLevel: 4, importance: 'Critical' },
      { name: 'DC Surge Protection & Earthing Testing', requiredLevel: 4, importance: 'Critical' },
      { name: 'Solar Energy Yield Simulation (PVsyst)', requiredLevel: 3, importance: 'Recommended' },
      { name: 'Industrial Rooftop Working Safety', requiredLevel: 5, importance: 'Critical' }
    ],
    hiringDistricts: ['Nagpur', 'Nashik', 'Pune', 'Kolhapur', 'Chhatrapati Sambhaji Nagar']
  },
  {
    id: 'clinical_data_specialist',
    title: 'Healthcare Clinical Informatics & Diagnostic Associate',
    titleMr: 'आरोग्य क्लिनिकल डेटा आणि डायग्नोस्टिक तंत्रज्ञ',
    titleHi: 'स्वास्थ्य क्लिनिकल डेटा एवं डायग्नोस्टिक सहयोगी',
    sector: 'Healthcare & Life Sciences',
    nsqfLevel: 5,
    avgSalary: '₹24,000 - ₹36,000 / month',
    growthRate: '+25% YoY in Maharashtra',
    description: 'Healthcare support professional trained in Electronic Medical Records (ABHA / ABDM architecture), diagnostic imaging data management, and hospital workflow automation.',
    requiredSkills: [
      { name: 'Ayushman Bharat Digital Mission (ABDM) Standards', requiredLevel: 4, importance: 'Critical' },
      { name: 'Medical Terminology & ICD-11 Coding', requiredLevel: 4, importance: 'Critical' },
      { name: 'DICOM Imaging Data Archiving', requiredLevel: 3, importance: 'Recommended' },
      { name: 'Patient Data Privacy (DISHA & DPDP Act)', requiredLevel: 5, importance: 'Critical' },
      { name: 'Hospital Management Information Systems (HMIS)', requiredLevel: 4, importance: 'Critical' }
    ],
    hiringDistricts: ['Mumbai Suburban', 'Pune', 'Thane', 'Nagpur']
  }
];

export const ACCREDITED_COURSES: Course[] = [
  {
    id: 'crs_ev_pune',
    title: 'Advanced Certificate in Electric Vehicle Systems & Battery Diagnostics',
    provider: 'Government ITI Aundh - Center of Excellence',
    providerType: 'Government ITI',
    district: 'Pune',
    duration: '6 Months (720 Hours)',
    mode: 'Hybrid',
    nsqfLevel: 5,
    subsidyAvailable: true,
    stipendAmount: '₹3,000/mo (MSSDS Support)',
    rating: 4.8,
    skillsTaught: ['High-Voltage Safety', 'Li-Ion Battery Health', 'CAN Bus Scanner', 'Regenerative Braking'],
    trust: {
      level: 'OFFICIAL',
      source: 'Directorate of Vocational Education & Training (DVET) Maharashtra',
      lastUpdated: '01 September 2026',
      verifiedBy: 'DVET Pune Division'
    }
  },
  {
    id: 'crs_cnc_kolhapur',
    title: 'Master Technician in 5-Axis CNC Machining & Automation',
    provider: 'Government Polytechnic Kolhapur & KEA Industry Lab',
    providerType: 'Polytechnic',
    district: 'Kolhapur',
    duration: '4 Months (480 Hours)',
    mode: 'In-person',
    nsqfLevel: 5,
    subsidyAvailable: true,
    stipendAmount: '₹2,500/mo',
    rating: 4.9,
    skillsTaught: ['G-Code Programming', 'GD&T', 'CAM Toolpath', 'Cobot Arm Teach'],
    trust: {
      level: 'OFFICIAL',
      source: 'Maharashtra State Board of Technical Education (MSBTE)',
      lastUpdated: '14 August 2026',
      verifiedBy: 'MSBTE Regional Office'
    }
  },
  {
    id: 'crs_cloud_mumbai',
    title: 'Full-Stack Web Development & Cloud Readiness Immersion',
    provider: 'Maharashtra Information Technology Corporation (MahaIT) & CDAC',
    providerType: 'Industry Partner',
    district: 'Mumbai Suburban',
    duration: '5 Months (600 Hours)',
    mode: 'Hybrid',
    nsqfLevel: 6,
    subsidyAvailable: true,
    stipendAmount: 'Tuition 100% Waived for Eligible Students',
    rating: 4.7,
    skillsTaught: ['TypeScript & React', 'Node.js Express', 'PostgreSQL', 'Docker & Cloud', 'Git Collaboration'],
    trust: {
      level: 'OFFICIAL',
      source: 'DigiSaksham / MahaIT Industry Skills Program',
      lastUpdated: '28 August 2026',
      verifiedBy: 'MahaIT Quality Cell'
    }
  },
  {
    id: 'crs_solar_nagpur',
    title: 'Grid-Connected Solar PV Technical Installation & Safety Specialist',
    provider: 'Government ITI Nagpur (South)',
    providerType: 'Government ITI',
    district: 'Nagpur',
    duration: '3 Months (360 Hours)',
    mode: 'In-person',
    nsqfLevel: 4,
    subsidyAvailable: true,
    stipendAmount: '₹2,000/mo (Surya Mitra Scheme)',
    rating: 4.8,
    skillsTaught: ['PV Stringing', 'MSEDCL Compliance', 'DC Surge Protection', 'Working at Height'],
    trust: {
      level: 'PROVIDER_VERIFIED',
      source: 'National Institute of Solar Energy (NISE) & MSSDS',
      lastUpdated: '10 August 2026',
      verifiedBy: 'Surya Mitra State Nodal Agency'
    }
  }
];

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'job_ev_tata_pune',
    title: 'EV Powertrain Diagnostic Apprentice / Technician',
    company: 'Tata Motors Passenger Mobility (Sanand-Pune EV Unit)',
    district: 'Pune',
    type: 'Apprenticeship (NAPS/MAPS)',
    salary: '₹18,500/month',
    stipendGovtShare: '₹1,500/mo reimbursed by Govt to employer',
    openings: 35,
    skillsRequired: ['High-Voltage Safety', 'Li-Ion Battery Health', 'CAN Bus Scanner'],
    postedDate: '24 Sep 2026',
    trust: {
      level: 'PROVIDER_VERIFIED',
      source: 'NAPS Portal Verified Corporate Employer #MAH-EMP-2091',
      lastUpdated: '24 September 2026'
    }
  },
  {
    id: 'job_cnc_bharat_forge',
    title: 'Junior Precision CNC Machine Setter',
    company: 'Bharat Forge Ltd (Mundhwa Facility)',
    district: 'Pune',
    type: 'Full-time',
    salary: '₹26,000 - ₹32,000/month',
    openings: 18,
    skillsRequired: ['G-Code Programming', 'GD&T', 'Metrology'],
    postedDate: '22 Sep 2026',
    trust: {
      level: 'PROVIDER_VERIFIED',
      source: 'Maharashtra Chamber of Commerce, Industry & Agriculture (MCCIA)',
      lastUpdated: '22 September 2026'
    }
  },
  {
    id: 'job_fullstack_quickheal',
    title: 'Associate Cloud Software Engineer',
    company: 'Quick Heal Technologies',
    district: 'Pune',
    type: 'Full-time',
    salary: '₹38,000 - ₹45,000/month',
    openings: 12,
    skillsRequired: ['TypeScript & React', 'Node.js Express', 'PostgreSQL'],
    postedDate: '26 Sep 2026',
    trust: {
      level: 'PROVIDER_VERIFIED',
      source: 'NASSCOM FutureSkills Maharashtra Network',
      lastUpdated: '26 September 2026'
    }
  },
  {
    id: 'job_solar_mahaurja',
    title: 'Commercial Solar Micro-grid Apprentice',
    company: 'Mahindra Susten / Maharashtra Solar Projects',
    district: 'Nagpur',
    type: 'Apprenticeship (NAPS/MAPS)',
    salary: '₹16,000/month',
    stipendGovtShare: '₹1,500/mo under MAPS',
    openings: 24,
    skillsRequired: ['PV Module Stringing', 'MSEDCL Compliance', 'DC Surge Protection'],
    postedDate: '25 Sep 2026',
    trust: {
      level: 'PROVIDER_VERIFIED',
      source: 'Mahaswayam Registered Contractor',
      lastUpdated: '25 September 2026'
    }
  }
];

export const GOV_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pmkvy_4_mahaswayam',
    title: 'Pramod Mahajan Kaushalya Vikas Yojana (PMKVY 4.0 MSSDS)',
    titleMr: 'प्रमोद महाजन कौशल्य विकास योजना (PMKVY 4.0)',
    titleHi: 'प्रमोद महाजन कौशल विकास योजना (PMKVY 4.0)',
    department: 'Maharashtra State Skill Development Society (MSSDS)',
    benefit: '100% Free Tuition + ₹1,500/month stipend for rural/women/reserved category trainees + Industry certification.',
    eligibilitySummary: 'Age 18-35 years, resident of Maharashtra, minimum 8th/10th pass, family income under ₹3.0 Lakhs/annum.',
    minAge: 18,
    maxAge: 35,
    educationLevel: ['10th Pass', '12th Pass', 'ITI Pass', 'Diploma', 'Graduate'],
    incomeLimit: 'Up to ₹3,00,000 / year',
    applicationUrl: 'https://mahaswayam.gov.in',
    trust: {
      level: 'OFFICIAL',
      source: 'Government Resolution (GR) No. KAU-2023/CR-89/KAUSHAL-1',
      lastUpdated: '01 August 2026',
      verifiedBy: 'MSSDS Secretariat, Mantralaya Mumbai'
    }
  },
  {
    id: 'maps_stipend_scheme',
    title: 'Maharashtra Apprenticeship Promotion Scheme (MAPS)',
    titleMr: 'महाराष्ट्र प्रशिक्षणार्थी प्रोत्साहन योजना (MAPS)',
    titleHi: 'महाराष्ट्र अप्रेंटिसशिप प्रोत्साहन योजना (MAPS)',
    department: 'Directorate of Vocational Education & Training (DVET)',
    benefit: '75% of prescribed stipend (up to ₹5,000/month) directly deposited into student account; 25% paid by employer.',
    eligibilitySummary: 'Age 16-30 years, ITI or Polytechnic graduate from Maharashtra accredited institute.',
    minAge: 16,
    maxAge: 30,
    educationLevel: ['ITI Pass', 'Diploma', 'Graduate'],
    incomeLimit: 'No income ceiling',
    applicationUrl: 'https://apprenticeshipindia.gov.in',
    trust: {
      level: 'OFFICIAL',
      source: 'DVET Notification No. APP/2024/78/EST-3',
      lastUpdated: '15 July 2026',
      verifiedBy: 'State Apprenticeship Advisor, Maharashtra'
    }
  },
  {
    id: 'cmegp_entrepreneur',
    title: 'Chief Minister Employment Generation Programme (CMEGP)',
    titleMr: 'मुख्यमंत्री रोजगार निर्मिती कार्यक्रम (CMEGP)',
    titleHi: 'मुख्यमंत्री रोजगार सृजन कार्यक्रम (CMEGP)',
    department: 'Directorate of Industries, Maharashtra',
    benefit: 'Financial subsidy of 25% to 35% on project cost up to ₹50 Lakhs for setting up skilled micro-enterprises or workshops.',
    eligibilitySummary: 'Age 18-45 years, minimum 7th pass (10th pass for projects above ₹10 Lakhs).',
    minAge: 18,
    maxAge: 45,
    educationLevel: ['10th Pass', '12th Pass', 'ITI Pass', 'Diploma', 'Graduate'],
    incomeLimit: 'No family income limit',
    applicationUrl: 'https://maha-cmegp.gov.in',
    trust: {
      level: 'OFFICIAL',
      source: 'Industry Department GR No. CMEGP-2022/CR-14/IND-7',
      lastUpdated: '10 June 2026',
      verifiedBy: 'Directorate of Industries'
    }
  }
];

export const CANDIDATE_PROFILES: CandidateProfile[] = [
  {
    id: 'cand_1',
    candidateCode: 'MAH-PUN-8419',
    district: 'Pune',
    education: 'ITI Electrician (2025) + EV Module',
    experienceYears: 1,
    targetRole: 'Electric Vehicle Service & Battery Specialist',
    readinessScore: 88,
    status: 'Ready for Interview',
    languages: ['Marathi', 'Hindi', 'English (Basic)'],
    skills: [
      { name: 'High-Voltage Safety', score: 92, verified: true },
      { name: 'Li-Ion Battery Health', score: 85, verified: true },
      { name: 'CAN Bus Scanner', score: 80, verified: true },
      { name: 'Motor Controller Calibration', score: 72, verified: false }
    ],
    trust: {
      level: 'OFFICIAL',
      source: 'DVET Trade Test Passbook & SkillBridge Assessment',
      lastUpdated: '12 September 2026'
    }
  },
  {
    id: 'cand_2',
    candidateCode: 'MAH-KOL-7392',
    district: 'Kolhapur',
    education: 'Diploma in Mechanical Engineering (2025)',
    experienceYears: 0.5,
    targetRole: 'Precision CNC Machining & Cobot Programmer',
    readinessScore: 91,
    status: 'Open for Apprenticeship',
    languages: ['Marathi', 'Hindi', 'English'],
    skills: [
      { name: 'G-Code Programming', score: 95, verified: true },
      { name: 'GD&T', score: 88, verified: true },
      { name: 'CAM Toolpath', score: 90, verified: true },
      { name: 'Metrology', score: 84, verified: true }
    ],
    trust: {
      level: 'OFFICIAL',
      source: 'MSBTE Diploma Verification & ITI Lab Records',
      lastUpdated: '08 September 2026'
    }
  },
  {
    id: 'cand_3',
    candidateCode: 'MAH-MUM-6104',
    district: 'Mumbai Suburban',
    education: 'B.Sc Computer Science (2026)',
    experienceYears: 0,
    targetRole: 'Full-Stack Web & Cloud Developer',
    readinessScore: 86,
    status: 'Ready for Interview',
    languages: ['English', 'Marathi', 'Hindi'],
    skills: [
      { name: 'TypeScript & React', score: 90, verified: true },
      { name: 'Node.js Express', score: 85, verified: true },
      { name: 'PostgreSQL', score: 82, verified: true },
      { name: 'Docker', score: 70, verified: false }
    ],
    trust: {
      level: 'PROVIDER_VERIFIED',
      source: 'MahaIT DigiSaksham Assessment #DI-9921',
      lastUpdated: '20 September 2026'
    }
  }
];

export const STUDENT_CASELOAD: StudentCaseload[] = [
  {
    id: 'stu_101',
    studentName: 'Swapnil Deshmukh',
    rollNumber: 'ITI-AUN-EV-042',
    institute: 'Govt ITI Aundh (Pune)',
    course: 'Advanced Certificate in EV Systems',
    attendancePercent: 74,
    currentModule: 'Module 4: CAN Bus & Inverter Diagnostics',
    riskStatus: 'Needs Attention',
    lastCounselingDate: '10 Sep 2026',
    aiSuggestedIntervention: 'Student struggles with oscilloscope signal interpretation. Recommend 1-on-1 practical lab session with Instructor Shinde and supplemental visual Marathi video guide.',
    trust: {
      level: 'AI_GENERATED',
      source: 'Continuous Evaluation Log + DVET Attendance API',
      lastUpdated: '25 September 2026',
      confidence: '92% confidence based on quiz score drops (-18%)',
      limitations: 'Counselor must confirm with lab instructor before scheduling remedial.'
    }
  },
  {
    id: 'stu_102',
    studentName: 'Pooja Jadhav',
    rollNumber: 'ITI-AUN-EV-019',
    institute: 'Govt ITI Aundh (Pune)',
    course: 'Advanced Certificate in EV Systems',
    attendancePercent: 96,
    currentModule: 'Module 4: CAN Bus & Inverter Diagnostics',
    riskStatus: 'Good Progress',
    lastCounselingDate: '02 Sep 2026',
    aiSuggestedIntervention: 'Excelling in battery diagnostics. Fast-track profile for pre-placement interview with Tata Motors and Bajaj Auto EV units.',
    trust: {
      level: 'AI_GENERATED',
      source: 'Quarterly Trade Test Scores & Industry Preference Matrix',
      lastUpdated: '24 September 2026',
      confidence: '96% confidence based on 94% average test score'
    }
  },
  {
    id: 'stu_103',
    studentName: 'Rahul Gaikwad',
    rollNumber: 'GP-KOL-MECH-088',
    institute: 'Govt Polytechnic Kolhapur',
    course: 'CNC & Robotic Machining',
    attendancePercent: 62,
    currentModule: 'Module 3: CAM 5-Axis Milling Simulation',
    riskStatus: 'High Risk',
    lastCounselingDate: '18 Aug 2026',
    aiSuggestedIntervention: 'High absenteeism in last 3 weeks due to agricultural harvest in hometown. Issue Mahaswayam stipend warning and offer evening batch makeup lab to prevent exam debarment.',
    trust: {
      level: 'AI_GENERATED',
      source: 'Biometric Attendance & Academic Progress Rule #14',
      lastUpdated: '26 September 2026',
      confidence: '89% confidence'
    }
  }
];

export const PHYSICAL_CENTERS: PhysicalCenter[] = [
  {
    id: 'iti_aundh_pune',
    name: 'Government ITI Aundh & State Center of Excellence',
    type: 'Center of Excellence',
    district: 'Pune',
    address: 'Parihar Chowk, Aundh, Pune, Maharashtra 411007',
    phone: '020-25881234',
    officerInCharge: 'Shri Ravindra More (Principal & Jt. Director DVET)',
    timings: 'Monday to Saturday, 08:30 AM - 05:30 PM',
    facilities: ['Advanced EV Laboratory', '5-Axis CNC Workshop', 'Robotics & Automation Bay', 'Career Guidance Cell', 'Women Tech Lounge']
  },
  {
    id: 'iti_mulund_mumbai',
    name: 'Government ITI Mulund',
    type: 'Government ITI',
    district: 'Mumbai Suburban',
    address: 'Near Mulund Railway Station, L.B.S. Marg, Mulund (West), Mumbai 400080',
    phone: '022-25605432',
    officerInCharge: 'Smt. Anjali Sawant (District Skill Officer)',
    timings: 'Monday to Friday, 09:00 AM - 06:00 PM',
    facilities: ['Cloud & Cyber Lab', 'Precision Tool & Die Workshop', 'NAPS Apprenticeship Helpdesk', 'Language & Soft Skills Lab']
  },
  {
    id: 'iti_nagpur_south',
    name: 'Government Industrial Training Institute Nagpur',
    type: 'Government ITI',
    district: 'Nagpur',
    address: 'Shraddhanand Peth, South Ambazari Road, Nagpur, Maharashtra 440010',
    phone: '0712-2248901',
    officerInCharge: 'Dr. Nitin Kulkarni (Principal)',
    timings: 'Monday to Saturday, 09:00 AM - 05:00 PM',
    facilities: ['Solar PV & Clean Energy Park', 'Heavy Machinery Driving Simulators', 'Agro-processing Center']
  },
  {
    id: 'iti_nashik_road',
    name: 'Government ITI Nashik Road',
    type: 'Government ITI',
    district: 'Nashik',
    address: 'Near Muktidham, Jail Road, Nashik Road, Maharashtra 422101',
    phone: '0253-2465890',
    officerInCharge: 'Shri Sanjay Patil (Vice Principal)',
    timings: 'Monday to Saturday, 08:30 AM - 05:00 PM',
    facilities: ['Aerospace Tooling Ancillary Lab', 'Electrical Machine Testing', 'MSSDS Enrollment Kiosk']
  }
];

export const CRITICAL_ALERTS: CriticalAlert[] = [
  {
    id: 'alert_pmkvy_deadline',
    severity: 'urgent',
    category: 'deadline',
    title: 'PMKVY 4.0 MSSDS Round 2 Application Deadline: 15 October 2026',
    titleMr: 'प्रमोद महाजन कौशल्य विकास योजना (PMKVY 4.0) अर्ज करण्याची अंतिम मुदत: १५ ऑक्टोबर २०२६',
    titleHi: 'प्रमोद महाजन कौशल विकास योजना (PMKVY 4.0) आवेदन की अंतिम तिथि: 15 अक्टूबर 2026',
    message: '100% Free Tuition Voucher seats for eligible rural, women, and reserved category youth closing soon across all 36 Maharashtra districts. Monthly ₹1,500 stipend included.',
    messageMr: 'महाराष्ट्रातील ३६ जिल्ह्यांमध्ये पात्र ग्रामीण, महिला आणि राखीव प्रवर्गातील तरुणांसाठी १००% मोफत प्रशिक्षण व्हाउचर जागा लवकरच बंद होत आहेत. दरमहा ₹१,५०० विद्यावेतन समाविष्ट.',
    messageHi: 'महाराष्ट्र के 36 जिलों में पात्र ग्रामीण, महिला और आरक्षित वर्ग के युवाओं के लिए 100% मुफ्त प्रशिक्षण वाउचर सीटें जल्द बंद हो रही हैं। ₹1,500 मासिक वजीफा शामिल।',
    effectiveDate: '27 Sep 2026',
    expiryDate: '15 Oct 2026',
    actionLabel: 'Check Eligibility & Apply',
    actionLabelMr: 'पात्रता तपासा आणि अर्ज करा',
    actionLabelHi: 'पात्रता जांचें और आवेदन करें',
    actionView: 'schemes',
    officialGazetteRef: 'GR No. KAU-2023/CR-89/KAUSHAL-1'
  },
  {
    id: 'alert_dvet_maintenance',
    severity: 'warning',
    category: 'maintenance',
    title: 'Scheduled Portal & DVET Verification Maintenance: Sunday 04 Oct 2026 (02:00 AM – 06:00 AM IST)',
    titleMr: 'नियोजित पोर्टल व DVET पडताळणी देखभाल: रविवार ०४ ऑक्टोबर २०२६ (पहाटे ०२:०० ते ०६:००)',
    titleHi: 'निर्धारित पोर्टल एवं DVET सत्यापन रखरखाव: रविवार 04 अक्टूबर 2026 (रात 02:00 से सुबह 06:00)',
    message: 'Biometric trade passbook verification and Mahaswayam single-sign-on will undergo scheduled infrastructure upgrades. Offline ITI admissions remain unaffected.',
    messageMr: 'बायोमेट्रिक ट्रेड पासबुक पडताळणी आणि महास्वयं एसएसओ मध्ये नियोजित तांत्रिक सुधारणा केली जाईल. प्रत्यक्ष आयटीआय प्रवेश प्रक्रियेवर कोणताही परिणाम होणार नाही.',
    messageHi: 'बायोमेट्रिक ट्रेड पासबुक सत्यापन और महास्वयं सिंगल साइन-ऑन में निर्धारित तकनीकी अपग्रेड किया जाएगा। प्रत्यक्ष आईटीआई प्रवेश प्रक्रिया अप्रभावित रहेगी।',
    effectiveDate: '04 Oct 2026',
    expiryDate: '05 Oct 2026',
    actionLabel: 'View Maintenance Schedule',
    actionLabelMr: 'देखभाल वेळापत्रक पहा',
    actionLabelHi: 'रखरखाव शेड्यूल देखें',
    actionView: 'courses',
    officialGazetteRef: 'DVET Technical Advisory #SYS-2026-99'
  },
  {
    id: 'alert_maps_ev_special',
    severity: 'info',
    category: 'scheme',
    title: 'State EV & Green Hydrogen Mission: 12,000 New Apprenticeship Seats Notified under MAPS',
    titleMr: 'राज्य ईव्ही व हरित हायड्रोजन मिशन: MAPS अंतर्गत १२,००० नवीन प्रशिक्षणार्थी पदे अधिसूचित',
    titleHi: 'राज्य ईवी एवं ग्रीन हाइड्रोजन मिशन: MAPS के तहत 12,000 नई अप्रेंटिसशिप सीटें अधिसूचित',
    message: 'Co-funded by Government of Maharashtra with ₹18,500/mo stipend (75% govt share up to ₹5,000/mo) in Pune, Chhatrapati Sambhaji Nagar, and Nagpur industrial clusters.',
    messageMr: 'पुणे, छत्रपती संभाजीनगर व नागपूर औद्योगिक वसाहतींमध्ये दरमहा ₹१८,५०० विद्यावेतनासह (शासनाचा ७५% हिस्सा कमाल ₹५,०००) महाराष्ट्र शासनामार्फत सह-अनुदानित.',
    messageHi: 'पुणे, छत्रपति संभाजीनगर एवं नागपुर औद्योगिक क्लस्टर में ₹18,500/माह वजीफे (सरकार का 75% हिस्सा अधिकतम ₹5,000) के साथ महाराष्ट्र सरकार द्वारा सह-वित्तपोषित।',
    effectiveDate: '25 Sep 2026',
    actionLabel: 'Explore EV Apprenticeships',
    actionLabelMr: 'ईव्ही प्रशिक्षण पदे पहा',
    actionLabelHi: 'ईवी अप्रेंटिसशिप देखें',
    actionView: 'jobs',
    officialGazetteRef: 'Industry Notification No. MAPS/EV-2026/04'
  }
];

export const INITIAL_FEEDBACKS: CitizenFeedback[] = [
  {
    id: 'fb_101',
    timestamp: '26 Sep 2026, 04:30 PM',
    rating: 5,
    category: 'scheme_eligibility',
    subject: 'myScheme eligibility wizard made PMKVY registration effortless',
    message: 'The 3-step criteria checker accurately identified the 100% free tuition voucher for my district (Kolhapur). Extremely clear guidance.',
    userDistrict: 'Kolhapur',
    status: 'action_taken'
  },
  {
    id: 'fb_102',
    timestamp: '25 Sep 2026, 11:15 AM',
    rating: 4,
    category: 'accessibility',
    subject: 'Screen reader accessibility praise with request for Marathi audio prompts',
    message: 'NVDA screen reader works reliably across all table rows and contrast modes. Please consider adding audio speech synthesis for rural Marathi learners.',
    userDistrict: 'Nashik',
    status: 'in_review'
  },
  {
    id: 'fb_103',
    timestamp: '24 Sep 2026, 02:40 PM',
    rating: 5,
    category: 'jobs_apprenticeships',
    subject: 'MAPS subsidy calculator transparency for small MSMEs',
    message: 'As an auto-parts workshop owner in Bhosari MIDC, the transparent calculation of the 75% government stipend co-pay saved us hours of paperwork.',
    userDistrict: 'Pune',
    status: 'action_taken'
  }
];

