import React, { useState } from 'react';
import { 
  Building2, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileCheck, 
  TrendingUp, 
  Loader2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { TrustBadge } from './TrustBadge';

interface InstitutePortalProps {
  language: Language;
}

export const InstitutePortal: React.FC<InstitutePortalProps> = ({ language }) => {
  const t = translations[language];

  const [syllabusText, setSyllabusText] = useState(
    `Module 1: Principles of Electric Vehicle Propulsion and AC Induction Motors
Module 2: High-Voltage Safety, Lockout/Tagout (LOTO) protocols and PPE compliance
Module 3: Lithium-Ion Battery Chemistry, Cell balancing and Thermal Runaway Prevention
Module 4: CAN Bus communication, OBD-II scanner integration and ECU troubleshooting
Module 5: Regenerative braking circuits, inverter topology and DC-DC converter testing`
  );

  const [sector, setSector] = useState('Automotive & Clean Mobility');
  const [checking, setChecking] = useState(false);
  const [alignmentResult, setAlignmentResult] = useState<any | null>(null);

  const handleCheckAlignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusText.trim()) return;

    setChecking(true);
    try {
      const res = await fetch('/api/ai/curriculum-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syllabusText,
          targetSector: sector,
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAlignmentResult(data);
      }
    } catch (err) {
      console.error('Alignment check error:', err);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002664]">
            {t.roleInstitute}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.instituteTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.instituteSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-blue-50 text-[#002664] text-xs font-bold rounded-lg border border-blue-200">
            DVET Affiliation #DVET-MAH-2026-081
          </span>
        </div>
      </div>

      {/* 2. Cohort Readiness Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current Enrolled Trainees
          </span>
          <p className="text-2xl font-extrabold text-[#002664] mt-1 font-mono">
            340 Students
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">Across 8 Approved Trades</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Average Trade Attendance
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            88.4%
          </p>
          <span className="text-[11px] text-slate-500">Biometric punch record</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Industry Apprenticeship Linkage
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">
            91.2%
          </p>
          <span className="text-[11px] text-slate-500">Placed under MAPS / NAPS</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            NSQF Compliance Index
          </span>
          <p className="text-2xl font-extrabold text-[#002664] mt-1 font-mono">
            Level 5 Certified
          </p>
          <span className="text-[11px] text-indigo-700 font-semibold">MSBTE Audited</span>
        </div>
      </div>

      {/* 3. AI Curriculum Alignment Checker */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {t.curriculumAlignTitle}
              </h2>
              <p className="text-xs text-slate-600">
                Automated curriculum audit powered by Gemini 3.8 Flash against Maharashtra Industrial Policy 2026 and NSQF Level 4-7 standards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sector-audit-select" className="text-xs font-bold text-slate-700">Sector:</label>
            <select
              id="sector-audit-select"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden"
            >
              <option value="Automotive & Clean Mobility">Automotive &amp; Clean Mobility</option>
              <option value="Precision & Heavy Engineering">Precision &amp; Heavy Engineering</option>
              <option value="IT & Cloud Software">IT &amp; Cloud Software</option>
              <option value="Renewable Energy & Solar">Renewable Energy &amp; Solar</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleCheckAlignment} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="syllabus-textarea" className="text-xs font-bold text-slate-700">
              Course Syllabus Modules / Learning Objectives
            </label>
            <textarea
              id="syllabus-textarea"
              rows={5}
              value={syllabusText}
              onChange={(e) => setSyllabusText(e.target.value)}
              placeholder={t.syllabusInputPlaceholder}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-[#002664] focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={checking || !syllabusText.trim()}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-xl transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
            >
              {checking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Auditing Syllabus against NSQF...</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{t.checkAlignment}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Alignment Audit Output */}
        {alignmentResult && (
          <div className="bg-slate-50 rounded-xl border border-indigo-200 p-6 space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center font-extrabold text-xl text-[#002664] font-mono">
                  {alignmentResult.data.alignmentScore}%
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Audit Result
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {alignmentResult.data.industryRelevanceVerdict}
                  </h3>
                  <span className="text-xs font-semibold text-indigo-700">
                    Equivalence: {alignmentResult.data.nsqfEquivalence}
                  </span>
                </div>
              </div>

              <TrustBadge trust={alignmentResult.trust} language={language} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2 p-4 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Curriculum Strengths
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                  {alignmentResult.data.strengths?.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 p-4 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Identified Gaps (2026 Industry Needs)
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                  {alignmentResult.data.gapsIdentified?.map((g: string, i: number) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-xs text-indigo-950 space-y-1.5">
              <span className="font-bold block">Recommended Additions to Achieve 100% Industry Alignment:</span>
              <ul className="list-disc list-inside space-y-1">
                {alignmentResult.data.suggestedAdditions?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
