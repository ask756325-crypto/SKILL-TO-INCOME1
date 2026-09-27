import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Calculator, 
  Briefcase, 
  PlusCircle, 
  CheckCircle2, 
  Coins, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Send,
  Eye
} from 'lucide-react';
import { Language, CandidateProfile } from '../types';
import { translations } from '../translations';
import { CANDIDATE_PROFILES } from '../data/mockData';
import { TrustBadge } from './TrustBadge';

interface EmployerPortalProps {
  language: Language;
}

export const EmployerPortal: React.FC<EmployerPortalProps> = ({ language }) => {
  const t = translations[language];

  // Calculator State
  const [stipendAmount, setStipendAmount] = useState<number>(18000);
  const [apprenticeCount, setApprenticeCount] = useState<number>(5);

  // Job Posting State
  const [jobTitle, setJobTitle] = useState('');
  const [district, setDistrict] = useState('Pune');
  const [openings, setOpenings] = useState('10');
  const [postedSuccess, setPostedSuccess] = useState(false);

  // Candidate comparison modal / inspection
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [interviewInvited, setInterviewInvited] = useState<string | null>(null);

  // Subsidy calculations (Maharashtra Apprenticeship Promotion Scheme - MAPS)
  // Govt covers up to 75% of prescribed stipend up to max ₹5,000/mo per apprentice
  const govtSharePerApprentice = Math.min(5000, Math.round(stipendAmount * 0.75));
  const employerCostPerApprentice = stipendAmount - govtSharePerApprentice;
  const totalMonthlyGovtSubsidy = govtSharePerApprentice * apprenticeCount;
  const totalMonthlyEmployerCost = employerCostPerApprentice * apprenticeCount;
  const annualGovtReimbursement = totalMonthlyGovtSubsidy * 12;

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;
    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
      setJobTitle('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002664]">
            {t.roleEmployer}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.employerTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.employerSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            ★ MSSDS Industry Partner Node
          </span>
        </div>
      </div>

      {/* 2. Interactive MAPS Subsidy Calculator */}
      <div className="bg-gradient-to-r from-blue-900 to-[#00173D] text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {t.subsidyCalculatorTitle}
              </h2>
              <p className="text-xs text-slate-300">
                Government of Maharashtra covers up to ₹5,000/month per apprentice directly to encourage manufacturing and tech hiring.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-400 bg-white/10 px-3 py-1 rounded-full">
            Under MAPS / NAPS Scheme 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span>{t.monthlyStipend}</span>
                <span className="text-amber-400 font-mono text-sm">₹{stipendAmount.toLocaleString('en-IN')} / mo</span>
              </div>
              <input
                type="range"
                min="10000"
                max="30000"
                step="1000"
                value={stipendAmount}
                onChange={(e) => setStipendAmount(parseInt(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                aria-label="Adjust monthly stipend"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>₹10,000</span>
                <span>₹20,000</span>
                <span>₹30,000</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span>Number of Apprentices to Onboard</span>
                <span className="text-amber-400 font-mono text-sm">{apprenticeCount} Trainees</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={apprenticeCount}
                onChange={(e) => setApprenticeCount(parseInt(e.target.value))}
                className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                aria-label="Adjust number of apprentices"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/15 space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block">
              Financial Breakdown for Your Enterprise
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs text-slate-300 block">Monthly Govt Subsidy</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                  ₹{totalMonthlyGovtSubsidy.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Paid via Direct DBT</span>
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs text-slate-300 block">Net Monthly Employer Outlay</span>
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                  ₹{totalMonthlyEmployerCost.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">₹{employerCostPerApprentice.toLocaleString('en-IN')}/trainee</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-300 font-semibold block">
                  Annual State Subsidy Benefit:
                </span>
                <span className="text-lg font-bold text-white font-mono">
                  ₹{annualGovtReimbursement.toLocaleString('en-IN')} / year
                </span>
              </div>

              <a
                href="https://apprenticeshipindia.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
              >
                Register Establishment on MAPS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pre-Assessed Candidate Talent Pool */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {t.candidatePoolTitle}
            </h2>
            <p className="text-xs text-slate-600">
              Anonymized profiles pre-vetted through Government ITI trade examinations and SkillBridge diagnostic assessments.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {CANDIDATE_PROFILES.length} Verified Candidates Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CANDIDATE_PROFILES.map((candidate) => (
            <div key={candidate.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold font-mono text-[#002664] bg-blue-50 px-2 py-0.5 rounded">
                    {candidate.candidateCode}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {candidate.readinessScore}% Match
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {candidate.targetRole}
                </h3>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{candidate.district}</span>
                  <span>·</span>
                  <span>{candidate.education}</span>
                </p>

                {/* Verified Skills */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Assessed Competencies:
                  </span>
                  {candidate.skills.map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 flex items-center gap-1">
                        {s.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        {s.name}
                      </span>
                      <span className="font-mono font-bold text-slate-900">{s.score}%</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Languages: {candidate.languages.join(', ')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setInterviewInvited(candidate.candidateCode);
                  }}
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors text-center"
                >
                  Invite to Interview
                </button>
                <TrustBadge trust={candidate.trust} language={language} />
              </div>
            </div>
          ))}
        </div>

        {interviewInvited && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center justify-between">
            <span className="font-semibold">
              Interview invitation dispatched to candidate <strong>{interviewInvited}</strong> and their ITI placement officer!
            </span>
            <button
              type="button"
              onClick={() => setInterviewInvited(null)}
              className="font-bold underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* 4. Post New Vacancy / Apprenticeship Form */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002664] flex items-center justify-center font-bold">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.postJobTitle}
            </h2>
            <p className="text-xs text-slate-600">
              Post directly to the Mahaswayam state network and auto-calculate eligible government co-pay.
            </p>
          </div>
        </div>

        <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5 md:col-span-2">
            <label htmlFor="post-role-title" className="text-xs font-bold text-slate-700">
              Job / Apprenticeship Title
            </label>
            <input
              id="post-role-title"
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Electric Vehicle Powertrain Assembler (NSQF Level 5)"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="post-district" className="text-xs font-bold text-slate-700">
              Maharashtra District
            </label>
            <select
              id="post-district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            >
              <option value="Pune">Pune (Chakan / Bhosari MIDC)</option>
              <option value="Mumbai Suburban">Mumbai Suburban</option>
              <option value="Thane">Thane (Belapur / Rabale MIDC)</option>
              <option value="Nashik">Nashik (Ambad / Satpur MIDC)</option>
              <option value="Nagpur">Nagpur (Butibori MIDC / MIHAN)</option>
              <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar (AURIC)</option>
              <option value="Kolhapur">Kolhapur (Shiroli / Gokul Shirgaon)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="post-openings" className="text-xs font-bold text-slate-700">
              Number of Vacancies
            </label>
            <input
              id="post-openings"
              type="number"
              min="1"
              value={openings}
              onChange={(e) => setOpenings(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label htmlFor="post-requirements" className="text-xs font-bold text-slate-700">
              Key Competency Requirements
            </label>
            <input
              id="post-requirements"
              type="text"
              placeholder="e.g. High-Voltage Safety, Li-ion Battery Diagnostics, CAN Bus"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-xl transition-colors shadow-xs"
            >
              Publish Vacancy on Maharashtra Portal
            </button>
          </div>
        </form>

        {postedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center justify-between">
            <span className="font-semibold">
              ✓ Vacancy published successfully! Associated ITIs in {district} have been notified for campus batch selection.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
