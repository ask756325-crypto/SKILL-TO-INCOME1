export type Language = 'en' | 'mr' | 'hi';

export type UserRole = 'student' | 'employer' | 'institute' | 'admin' | 'counselor';

export type TrustLevel = 'OFFICIAL' | 'PROVIDER_VERIFIED' | 'EXTERNAL_DATA' | 'AI_GENERATED';

export interface TrustMetadata {
  level: TrustLevel;
  source: string;
  lastUpdated: string;
  confidence?: string;
  limitations?: string;
  verifiedBy?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'domain';
  level: 1 | 2 | 3 | 4 | 5; // 1: Beginner, 5: Master
  demandLevel: 'High' | 'Very High' | 'Moderate';
}

export interface JobRole {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  sector: string;
  nsqfLevel: number;
  avgSalary: string;
  growthRate: string;
  description: string;
  requiredSkills: { name: string; requiredLevel: number; importance: 'Critical' | 'Recommended' }[];
  hiringDistricts: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  providerType: 'Government ITI' | 'Polytechnic' | 'NSDC Accredited' | 'Industry Partner';
  district: string;
  duration: string;
  mode: 'Hybrid' | 'In-person' | 'Online';
  nsqfLevel: number;
  subsidyAvailable: boolean;
  stipendAmount?: string;
  rating: number;
  skillsTaught: string[];
  trust: TrustMetadata;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  district: string;
  type: 'Full-time' | 'Apprenticeship (NAPS/MAPS)' | 'Internship';
  salary: string;
  stipendGovtShare?: string;
  openings: number;
  skillsRequired: string[];
  postedDate: string;
  trust: TrustMetadata;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  department: string;
  benefit: string;
  eligibilitySummary: string;
  minAge: number;
  maxAge: number;
  educationLevel: string[];
  incomeLimit: string;
  applicationUrl?: string;
  trust: TrustMetadata;
}

export interface DistrictMetric {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  division: 'Konkan' | 'Pune' | 'Nashik' | 'Chhatrapati Sambhaji Nagar' | 'Amravati' | 'Nagpur';
  topDemandedSkills: string[];
  activeLearners: number;
  placementRate: number; // percentage
  topSectors: string[];
  itiCount: number;
  apprenticeshipOpenings: number;
  trust: TrustMetadata;
  trainingParticipationRate?: number; // % eligible enrolled
  capacityUtilizationRate?: number; // % ITI seat capacity utilized
  femaleParticipationRate?: number; // % female representation
  budgetAllocationCrores?: number; // In ₹ Crores
  quarterlyTrends?: { quarter: string; participation: number; demand: number }[];
  actionableInsight?: string;
  actionableInsightMr?: string;
  actionableInsightHi?: string;
}

export interface CandidateProfile {
  id: string;
  candidateCode: string; // Anonymized e.g. "MAH-PUN-9821"
  district: string;
  education: string;
  experienceYears: number;
  skills: { name: string; score: number; verified: boolean }[];
  targetRole: string;
  readinessScore: number;
  status: 'Ready for Interview' | 'Under Training' | 'Open for Apprenticeship';
  languages: string[];
  trust: TrustMetadata;
}

export interface StudentCaseload {
  id: string;
  studentName: string;
  rollNumber: string;
  institute: string;
  course: string;
  attendancePercent: number;
  currentModule: string;
  riskStatus: 'Good Progress' | 'Needs Attention' | 'High Risk';
  lastCounselingDate: string;
  aiSuggestedIntervention: string;
  trust: TrustMetadata;
}

export interface PhysicalCenter {
  id: string;
  name: string;
  type: 'Government ITI' | 'District Skill Kendra' | 'Center of Excellence';
  district: string;
  address: string;
  phone: string;
  officerInCharge: string;
  timings: string;
  facilities: string[];
}

export type AlertSeverity = 'urgent' | 'warning' | 'info';

export interface CriticalAlert {
  id: string;
  severity: AlertSeverity;
  category: 'deadline' | 'maintenance' | 'scheme' | 'advisory';
  title: string;
  titleMr: string;
  titleHi: string;
  message: string;
  messageMr: string;
  messageHi: string;
  effectiveDate: string;
  expiryDate?: string;
  actionLabel?: string;
  actionLabelMr?: string;
  actionLabelHi?: string;
  actionView?: string;
  externalLink?: string;
  officialGazetteRef?: string;
}

export interface CitizenFeedback {
  id: string;
  timestamp: string;
  rating: number; // 1 to 5
  category: 'scheme_eligibility' | 'course_iti_info' | 'jobs_apprenticeships' | 'accessibility' | 'portal_performance' | 'general_suggestion';
  subject: string;
  message: string;
  userDistrict?: string;
  contactEmailOrPhone?: string;
  status: 'received' | 'in_review' | 'action_taken';
}

export interface SessionSearchItem {
  id: string;
  query: string;
  timestamp: number; // epoch ms
  formattedTime: string;
  category: 'all' | 'jobs' | 'courses' | 'schemes' | 'skills' | 'roles';
  resultCount?: number;
  targetView?: string;
  targetId?: string;
}

export interface BreadcrumbItem {
  label: string;
  view?: string;
  itemId?: string;
  isCurrent?: boolean;
}

export interface DistrictItiSkillDemand {
  id: string;
  districtId: string;
  itiName: string;
  itiType: 'State Center of Excellence' | 'Government ITI' | 'Polytechnic Industry Lab' | 'Private Aided ITI';
  address: string;
  totalIntake: number;
  enrolledStudents: number;
  capacityUtilization: number;
  trades: {
    tradeName: string;
    tradeNameMr?: string;
    nsqfLevel: number;
    annualIntake: number;
    demandIndex: number; // 0 to 100
    industryOpenings: number;
    topHiringPartners: string[];
  }[];
  labUpgrades: string;
}

export interface StudentPlacementRecord {
  id: string;
  studentName: string;
  studentCode: string;
  districtId: string;
  districtName: string;
  itiName: string;
  trade: string;
  nsqfLevel: number;
  placedCompany: string;
  sector: string;
  roleTitle: string;
  packageStipendMonthly: number; // in ₹
  placementType: 'Full-Time Technologist' | 'MAPS Apprenticeship' | 'Dual Training Scheme';
  placementDate: string;
  verificationStatus: 'DVET_VERIFIED' | 'NAPS_PORTAL_ACTIVE' | 'OFFICIAL_AUDITED';
  verificationToken: string;
}

export interface ResumeAnalysisResult {
  candidateName?: string;
  contactEmail?: string;
  targetRole?: string;
  atsCompatibilityScore: number; // 0 to 100
  employabilityVerdict: string;
  experienceLevel: string;
  extractedSkills: string[];
  missingCompetencies: string[];
  recommendedItiCourses: {
    title: string;
    institute: string;
    duration: string;
    nsqfLevel: number;
  }[];
  matchedApprenticeships: {
    title: string;
    company: string;
    stipend: string;
    location: string;
  }[];
  formattingTips: string[];
  governmentSchemeEligibility: string[];
}
