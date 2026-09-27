import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Download, 
  ChevronRight, 
  Building2, 
  MapPin, 
  Calendar, 
  Coins, 
  Loader2, 
  Sliders,
  ExternalLink
} from 'lucide-react';
import { Language, JobRole, Course, JobListing } from '../types';
import { translations } from '../translations';
import { TARGET_JOB_ROLES, ACCREDITED_COURSES, JOB_LISTINGS } from '../data/mockData';
import { TrustBadge } from './TrustBadge';

interface StudentPortalProps {
  language: Language;
  initialTab?: 'assessment' | 'courses' | 'jobs';
  onTabChange?: (tab: 'assessment' | 'courses' | 'jobs') => void;
  highlightedItemId?: string | null;
  onOpenLocator: () => void;
  onNavigateToSchemes: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  language,
  initialTab = 'assessment',
  onTabChange,
  highlightedItemId,
  onOpenLocator,
  onNavigateToSchemes
}) => {
  const t = translations[language];

  const [selectedRole, setSelectedRole] = useState<JobRole>(() => {
    if (highlightedItemId && highlightedItemId.startsWith('role_')) {
      const roleId = highlightedItemId.replace('role_', '');
      const matched = TARGET_JOB_ROLES.find((r) => r.id === roleId);
      if (matched) return matched;
    }
    return TARGET_JOB_ROLES[0];
  });

  const [userSkillScores, setUserSkillScores] = useState<Record<string, number>>({
    'High-Voltage Safety & Lockout/Tagout': 3,
    'Li-Ion Battery Health Diagnostic & Cell Balancing': 2,
    'CAN Bus & OBD-II Scanner Analysis': 2,
    'Motor Controller & Inverter Calibration': 1,
    'Regenerative Braking Systems': 2,
  });

  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [aiRoadmap, setAiRoadmap] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'assessment' | 'courses' | 'jobs'>(initialTab);
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  const handleTabSwitch = (newTab: 'assessment' | 'courses' | 'jobs') => {
    setActiveTab(newTab);
    onTabChange?.(newTab);
  };

  // Sync activeTab when initialTab changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Sync role if highlightedItemId is for a role
  React.useEffect(() => {
    if (highlightedItemId && highlightedItemId.startsWith('role_')) {
      const roleId = highlightedItemId.replace('role_', '');
      const matched = TARGET_JOB_ROLES.find((r) => r.id === roleId);
      if (matched) {
        setSelectedRole(matched);
        setActiveTab('assessment');
      }
    }
  }, [highlightedItemId]);

  // When changing target role, re-seed default self-assessment scores
  const handleRoleSelect = (role: JobRole) => {
    setSelectedRole(role);
    const newScores: Record<string, number> = {};
    role.requiredSkills.forEach((s) => {
      newScores[s.name] = Math.max(1, s.requiredLevel - 2);
    });
    setUserSkillScores(newScores);
    setAiRoadmap(null);
  };

  const handleScoreChange = (skillName: string, score: number) => {
    setUserSkillScores((prev) => ({
      ...prev,
      [skillName]: score,
    }));
  };

  // Generate dynamic AI Roadmap using /api/ai/gap-analysis
  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    try {
      const skillsArray = selectedRole.requiredSkills.map((s) => ({
        skill: s.name,
        currentScore: userSkillScores[s.name] || 1,
        targetScore: s.requiredLevel
      }));

      const res = await fetch('/api/ai/gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRoleTitle: selectedRole.title,
          userSkills: skillsArray,
          language
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiRoadmap(data);
      }
    } catch (err) {
      console.error('Roadmap error:', err);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  // Calculate overall readiness percentage
  const totalRequired = selectedRole.requiredSkills.reduce((sum, s) => sum + s.requiredLevel, 0);
  const totalUser = selectedRole.requiredSkills.reduce((sum, s) => sum + (userSkillScores[s.name] || 1), 0);
  const readinessPercent = Math.min(100, Math.round((totalUser / totalRequired) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002664]">
            {t.roleStudent}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.assessmentTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.assessmentSubtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToSchemes}
            className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            {t.taskSchemesTitle}
          </button>
          <button
            type="button"
            onClick={onOpenLocator}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
          >
            {t.findCenter}
          </button>
        </div>
      </div>

      {/* 2. Workspace Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => handleTabSwitch('assessment')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'assessment'
              ? 'bg-[#002664] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          1. Skill Assessment &amp; AI Roadmap
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch('courses')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-[#002664] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          2. Accredited ITI Courses ({ACCREDITED_COURSES.length})
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch('jobs')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'jobs'
              ? 'bg-[#002664] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          3. Verified Jobs &amp; MAPS Apprenticeships ({JOB_LISTINGS.length})
        </button>
      </div>

      {/* 3. Tab 1: Assessment & Gap Analysis */}
      {activeTab === 'assessment' && (
        <div className="space-y-8">
          {/* Target Role Selector */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="target-role-select" className="text-sm font-bold text-slate-900">
                {t.targetRoleLabel}
              </label>
              <span className="text-xs font-semibold text-slate-500">
                NSQF Aligned Job Roles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TARGET_JOB_ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedRole.id === role.id
                      ? 'border-[#002664] bg-blue-50/50 shadow-xs ring-2 ring-[#002664]/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {role.sector}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      NSQF L{role.nsqfLevel}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                    {language === 'mr' ? role.titleMr : language === 'hi' ? role.titleHi : role.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-600 mt-2">
                    <span>{role.avgSalary}</span>
                    <span className="font-semibold text-emerald-700">{role.growthRate}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Competency Evaluator & Visual Gap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Skill Sliders */}
            <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Self-Assess Required Competencies
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rate your current comfort from 1 (Novice) to 5 (Production-ready).
                  </p>
                </div>
                <span className="text-xs font-bold text-[#002664] bg-blue-50 px-2.5 py-1 rounded">
                  {selectedRole.requiredSkills.length} Standards
                </span>
              </div>

              <div className="space-y-5">
                {selectedRole.requiredSkills.map((skill) => {
                  const currentVal = userSkillScores[skill.name] || 1;
                  const gap = skill.requiredLevel - currentVal;
                  return (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                          {skill.name}
                          {skill.importance === 'Critical' && (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded">
                              Core
                            </span>
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">
                            You: <strong className="text-slate-900 font-mono">{currentVal}/5</strong>
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-indigo-700 font-semibold">
                            Req: <strong className="font-mono">{skill.requiredLevel}/5</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={currentVal}
                          onChange={(e) => handleScoreChange(skill.name, parseInt(e.target.value))}
                          className="w-full accent-[#002664] h-2 bg-slate-200 rounded-lg cursor-pointer"
                          aria-label={`Rate proficiency in ${skill.name}`}
                        />
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                          gap <= 0 
                            ? 'bg-emerald-50 text-emerald-800' 
                            : gap === 1 
                            ? 'bg-amber-50 text-amber-800' 
                            : 'bg-rose-50 text-rose-800'
                        }`}>
                          {gap <= 0 ? '✓ Ready' : `-${gap} Gap`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <span>Hiring Districts: </span>
                  <strong className="text-slate-800">{selectedRole.hiringDistricts.join(', ')}</strong>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateRoadmap}
                  disabled={generatingRoadmap}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-xl transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {generatingRoadmap ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.generatingRoadmap}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{t.generateAIRoadmap}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Readiness Scorecard & Next Steps */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Production Readiness Benchmark
                </span>

                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50/50">
                    <span className="text-2xl font-extrabold text-[#002664] font-mono">
                      {readinessPercent}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {readinessPercent >= 80 
                        ? 'High Interview Readiness' 
                        : readinessPercent >= 50 
                        ? 'Moderate Modular Gap' 
                        : 'Foundational Apprenticeship Needed'}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {readinessPercent >= 80
                        ? 'You are ready to apply for direct enterprise trade interviews and apprenticeships.'
                        : 'Completing recommended 60-hour hands-on ITI workshop modules will close your remaining gaps.'}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    {t.recommendedNextStep}
                  </span>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Enroll in Government ITI <strong>{selectedRole.title}</strong> module under PMKVY 4.0 for 100% free tuition and ₹1,500/mo stipend.
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Scheme Subsidy Callout */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span className="font-bold">Maharashtra Apprenticeship Promotion Scheme (MAPS)</span>
                </div>
                <p>
                  Trainees in this role are eligible for <strong>₹18,500/month stipend</strong> with ₹1,500/month government reimbursement to your employer.
                </p>
                <button
                  type="button"
                  onClick={onNavigateToSchemes}
                  className="font-bold text-[#002664] hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Check scheme eligibility</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 4. AI Transition Roadmap Display */}
          {aiRoadmap && (
            <div className="bg-white rounded-xl border border-indigo-200 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Customized Career Transition Pathway
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Path to {selectedRole.title}
                  </h3>
                </div>
                <TrustBadge trust={aiRoadmap.trust} language={language} />
              </div>

              {/* Diagnostic Summary */}
              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs sm:text-sm text-indigo-950 space-y-1">
                <span className="font-bold block">Vocational Diagnostic:</span>
                <p>{aiRoadmap.data.gapSummary}</p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>Estimated Duration: <strong>{aiRoadmap.data.estimatedWeeksToJobReady || 8} Weeks</strong></span>
                </div>
              </div>

              {/* Step-by-Step Milestones */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Progressive Action Stages
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiRoadmap.data.milestones?.map((m: any, idx: number) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                          <span>Stage {m.step || idx + 1}</span>
                          <span className="text-[10px] text-emerald-700 font-mono">Verified Module</span>
                        </div>
                        <h5 className="text-sm font-bold text-slate-900">
                          {m.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1">
                          {m.action}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 space-y-1 text-xs">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Practical Lab Project:</span>
                        <p className="text-slate-700 italic">"{m.practicalProject}"</p>
                        <span className="text-indigo-800 font-semibold block pt-1 text-[11px]">
                          Target: {m.credential}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('courses')}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Browse Matching ITI Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Roadmap downloaded as PDF.')}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.downloadRoadmap}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Tab 2: Accredited Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Accredited Government &amp; Industry Partner Courses
            </h3>
            <span className="text-xs text-slate-500">
              Showing official DVET certified programs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACCREDITED_COURSES.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      NSQF Level {course.nsqfLevel}
                    </span>
                    <TrustBadge trust={course.trust} language={language} />
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.provider}</span>
                    <span>·</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.district}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                      <span className="font-semibold text-slate-800">{course.duration}</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Financial Aid</span>
                      <span className="font-semibold text-emerald-700">{course.stipendAmount}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Key Competencies Taught:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.skillsTaught.map((skill) => (
                        <span key={skill} className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationSuccess(`Application submitted to ${course.provider}! Application token: MAH-ENR-2026-${Math.floor(1000 + Math.random() * 9000)}`);
                    }}
                    className="flex-1 py-2 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors text-center"
                  >
                    Apply for Free ITI Seat
                  </button>
                  <button
                    type="button"
                    onClick={onOpenLocator}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Visit Campus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {applicationSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center justify-between">
              <span className="font-semibold">{applicationSuccess}</span>
              <button 
                type="button" 
                onClick={() => setApplicationSuccess(null)}
                className="font-bold underline ml-4"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Tab 3: Verified Jobs & MAPS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Verified Industrial Apprenticeships &amp; Job Vacancies
            </h3>
            <span className="text-xs font-semibold text-emerald-700">
              Co-funded under Maharashtra MAPS
            </span>
          </div>

          <div className="space-y-4">
            {JOB_LISTINGS.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#002664] bg-blue-50 px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {job.openings} Openings
                    </span>
                    <TrustBadge trust={job.trust} language={language} />
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <strong className="text-slate-800">{job.company}</strong>
                    <span>·</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.district}</span>
                    <span>·</span>
                    <span className="text-slate-400">Posted {job.postedDate}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {job.skillsRequired.map((s) => (
                      <span key={s} className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>

                  {job.stipendGovtShare && (
                    <p className="text-[11px] text-emerald-800 font-medium pt-1">
                      ★ {job.stipendGovtShare}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="text-right sm:text-right">
                    <span className="text-xs text-slate-500 block">Prescribed Remuneration</span>
                    <span className="text-base font-bold text-slate-900 font-mono">{job.salary}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`Direct application submitted to ${job.company} via SkillBridge Verified Passbook! Employer notified.`);
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply with Skill Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
