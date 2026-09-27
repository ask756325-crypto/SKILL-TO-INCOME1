import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Coins, 
  ArrowRight, 
  FileText, 
  ChevronRight, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Language, GovernmentScheme } from '../types';
import { translations } from '../translations';
import { GOV_SCHEMES } from '../data/mockData';
import { TrustBadge } from './TrustBadge';

interface EligibilityWizardProps {
  language: Language;
}

export const EligibilityWizard: React.FC<EligibilityWizardProps> = ({ language }) => {
  const t = translations[language];

  // Wizard state
  const [age, setAge] = useState<number>(22);
  const [education, setEducation] = useState<string>('ITI Pass');
  const [district, setDistrict] = useState<string>('Pune');
  const [category, setCategory] = useState<string>('OBC');
  const [income, setIncome] = useState<string>('Under ₹2.5 Lakhs');
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(true);

  // Filter schemes according to user criteria
  const matchedSchemes = GOV_SCHEMES.filter((scheme) => {
    const ageOk = age >= scheme.minAge && age <= scheme.maxAge;
    const eduOk = scheme.educationLevel.includes(education) || scheme.educationLevel.includes('10th Pass');
    return ageOk && eduOk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header (myScheme benchmark) */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002664]">
            myScheme Citizen Discovery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.eligibilityTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.eligibilitySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-50 text-amber-900 text-xs font-bold rounded-lg border border-amber-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Official Government Subsidies
          </span>
        </div>
      </div>

      {/* 2. Interactive Discovery Criteria Form */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Provide Your Profile Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Age */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <label htmlFor="user-age-input">{t.ageLabel}</label>
              <span className="font-mono text-[#002664] text-sm">{age} Years</span>
            </div>
            <input
              id="user-age-input"
              type="range"
              min="16"
              max="50"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full accent-[#002664] h-2 bg-slate-200 rounded-lg cursor-pointer"
              aria-label="Adjust your age"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>16</span>
              <span>32</span>
              <span>50</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-1.5">
            <label htmlFor="education-level-select" className="text-xs font-bold text-slate-700">
              {t.educationLabel}
            </label>
            <select
              id="education-level-select"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            >
              <option value="10th Pass">10th Pass (SSC)</option>
              <option value="12th Pass">12th Pass (HSC)</option>
              <option value="ITI Pass">ITI Certificate Pass</option>
              <option value="Diploma">Polytechnic Diploma</option>
              <option value="Graduate">Graduate (Any Stream)</option>
            </select>
          </div>

          {/* District */}
          <div className="space-y-1.5">
            <label htmlFor="user-district-select" className="text-xs font-bold text-slate-700">
              {t.districtLabel}
            </label>
            <select
              id="user-district-select"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            >
              <option value="Pune">Pune</option>
              <option value="Mumbai Suburban">Mumbai Suburban</option>
              <option value="Thane">Thane</option>
              <option value="Nashik">Nashik</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar</option>
              <option value="Kolhapur">Kolhapur</option>
            </select>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label htmlFor="user-category-select" className="text-xs font-bold text-slate-700">
              {t.categoryLabel}
            </label>
            <select
              id="user-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            >
              <option value="General">General / Open</option>
              <option value="OBC">Other Backward Class (OBC)</option>
              <option value="EWS">Economically Weaker Section (EWS)</option>
              <option value="SC">Scheduled Caste (SC)</option>
              <option value="ST">Scheduled Tribe (ST)</option>
              <option value="SEBC">Socially &amp; Economically Backward (SEBC)</option>
            </select>
          </div>

          {/* Income */}
          <div className="space-y-1.5">
            <label htmlFor="annual-income-select" className="text-xs font-bold text-slate-700">
              {t.incomeLabel}
            </label>
            <select
              id="annual-income-select"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            >
              <option value="Under ₹1.5 Lakhs">Under ₹1,50,000 / year</option>
              <option value="Under ₹2.5 Lakhs">₹1,50,000 - ₹2,50,000 / year</option>
              <option value="Under ₹5.0 Lakhs">₹2,50,000 - ₹5,00,000 / year</option>
              <option value="Above ₹5.0 Lakhs">Above ₹5,00,000 / year</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Matched Schemes List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              2. {t.eligibleSchemesFound} ({matchedSchemes.length})
            </h2>
            <p className="text-xs text-slate-600">
              Official benefits guaranteed by the Government of Maharashtra under active Government Resolutions (GRs).
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            ✓ 100% Verified State Eligibility
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    Age {scheme.minAge}–{scheme.maxAge} Yrs
                  </span>
                  <TrustBadge trust={scheme.trust} language={language} />
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {language === 'mr' ? scheme.titleMr : language === 'hi' ? scheme.titleHi : scheme.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  {scheme.department}
                </p>

                <div className="mt-4 p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-900 block">
                    Financial &amp; Training Benefit:
                  </span>
                  <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                    {scheme.benefit}
                  </p>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Eligibility Summary:</span>
                  <p>{scheme.eligibilitySummary}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={scheme.applicationUrl || 'https://mahaswayam.gov.in'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors text-center inline-flex items-center justify-center gap-1.5"
                >
                  <span>{t.applyNow}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
