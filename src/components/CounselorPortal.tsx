import React, { useState } from 'react';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  PhoneCall, 
  FileText, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Language, StudentCaseload } from '../types';
import { translations } from '../translations';
import { STUDENT_CASELOAD } from '../data/mockData';
import { TrustBadge } from './TrustBadge';

interface CounselorPortalProps {
  language: Language;
}

export const CounselorPortal: React.FC<CounselorPortalProps> = ({ language }) => {
  const t = translations[language];

  const [caseload, setCaseload] = useState<StudentCaseload[]>(STUDENT_CASELOAD);
  const [scheduledStudent, setScheduledStudent] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentCaseload | null>(null);
  const [counselorNote, setCounselorNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSchedule = (studentName: string) => {
    setScheduledStudent(studentName);
    setTimeout(() => setScheduledStudent(null), 4000);
  };

  const handleSaveNote = () => {
    if (!counselorNote.trim() || !selectedStudent) return;
    setNoteSaved(true);
    setTimeout(() => {
      setNoteSaved(false);
      setCounselorNote('');
      setSelectedStudent(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002664]">
            {t.roleCounselor}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.counselorTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.counselorSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 bg-blue-50 text-[#002664] text-xs font-bold rounded-lg border border-blue-200">
            Certified District Counselor #DC-PUN-042
          </span>
        </div>
      </div>

      {/* 2. Caseload Summary Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Assigned Trainees
          </span>
          <p className="text-2xl font-extrabold text-[#002664] mt-1 font-mono">
            {caseload.length} Students
          </p>
          <span className="text-[11px] text-slate-500">Government ITI Aundh Batch A</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Early Warning Flags
          </span>
          <p className="text-2xl font-extrabold text-amber-700 mt-1 font-mono">
            {caseload.filter((s) => s.riskStatus !== 'Good Progress').length} Students
          </p>
          <span className="text-[11px] text-amber-700 font-semibold">Proactive Intervention Required</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Completed Counseling Sessions
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">
            18 This Month
          </p>
          <span className="text-[11px] text-slate-500">Logged on Mahaswayam</span>
        </div>
      </div>

      {/* 3. Student Caseload Table */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.caseloadTitle}
            </h2>
            <p className="text-xs text-slate-600">
              Biometric attendance records and continuous trade test analytics automatically identify students needing timely guidance.
            </p>
          </div>
        </div>

        {scheduledStudent && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center justify-between">
            <span className="font-semibold">
              ✓ In-person guidance session scheduled for <strong>{scheduledStudent}</strong>. SMS &amp; WhatsApp reminder sent.
            </span>
          </div>
        )}

        <div className="space-y-4">
          {caseload.map((student) => {
            const isHighRisk = student.riskStatus === 'High Risk';
            const isWarning = student.riskStatus === 'Needs Attention';

            return (
              <div 
                key={student.id} 
                className={`p-6 rounded-xl border transition-all ${
                  isHighRisk 
                    ? 'border-rose-300 bg-rose-50/20' 
                    : isWarning 
                    ? 'border-amber-300 bg-amber-50/20' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold font-mono text-[#002664] bg-blue-50 px-2 py-0.5 rounded">
                        {student.rollNumber}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isHighRisk 
                          ? 'bg-rose-100 text-rose-800' 
                          : isWarning 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {student.riskStatus}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {student.studentName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {student.course} · <strong>{student.institute}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendance</span>
                      <span className={`font-mono font-bold text-sm ${
                        student.attendancePercent < 75 ? 'text-rose-700' : 'text-emerald-700'
                      }`}>
                        {student.attendancePercent}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Session</span>
                      <span className="font-semibold text-slate-800">{student.lastCounselingDate}</span>
                    </div>
                  </div>
                </div>

                {/* AI Intervention Suggestion */}
                <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {t.actionPlanTitle}
                    </span>
                    <TrustBadge trust={student.trust} language={language} />
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {student.aiSuggestedIntervention}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Current Module: {student.currentModule}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(student)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Log Counseling Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSchedule(student.studentName)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.scheduleCounseling}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note Logging Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Log Mentoring Session for {selectedStudent.studentName}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-xs text-slate-600">
                  <p>Roll: {selectedStudent.rollNumber} | Course: {selectedStudent.course}</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="guidance-summary-input" className="text-xs font-bold text-slate-700">
                    Counseling Notes &amp; Assigned Remedial Tasks
                  </label>
                  <textarea
                    id="guidance-summary-input"
                    rows={4}
                    value={counselorNote}
                    onChange={(e) => setCounselorNote(e.target.value)}
                    placeholder="Document student's concerns, remedial assignments, and agreed milestones..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
                  />
                </div>

                {noteSaved && (
                  <div className="p-3 bg-emerald-50 text-emerald-900 text-xs rounded-lg font-semibold">
                    ✓ Counseling log synchronized with Mahaswayam student passbook.
                  </div>
                )}
              </div>

              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-1.5 text-xs text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg"
                >
                  Save to Official Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
