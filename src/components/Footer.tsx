import React from 'react';
import { PhoneCall, Mail, MapPin, ExternalLink, ShieldCheck, HeartHandshake, ChevronRight } from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
  currentView?: string;
  currentRole?: UserRole;
  onNavigate: (view: string) => void;
  onSelectRole?: (role: UserRole) => void;
  onOpenLocator: () => void;
  onOpenFeedback?: (prefill?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  language, 
  currentView,
  currentRole,
  onNavigate, 
  onSelectRole,
  onOpenLocator, 
  onOpenFeedback 
}) => {
  const t = translations[language];

  return (
    <footer className="bg-[#00173D] text-slate-300 text-sm border-t border-slate-800 mt-16">
      {/* 1. Multi-Channel Assistance Ribbon */}
      <div className="bg-[#002664] py-6 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                {language === 'mr' ? 'मोफत शासकीय कौशल्य हेल्पलाइन' : language === 'hi' ? 'निःशुल्क सरकारी कौशल हेल्पलाइन' : 'Toll-Free State Skill Helpline'}
              </p>
              <p className="text-xl font-bold text-white tracking-tight">
                1800-120-8040 <span className="text-xs font-normal text-slate-300">({language === 'mr' ? 'सोम-शनि स. ८ ते रात्री ८' : language === 'hi' ? 'सोम-शनि सुबह 8 से रात 8' : 'Mon-Sat 8:00 AM - 8:00 PM'})</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenLocator}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{t.findCenter}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('schemes')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.taskSchemesTitle}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About & Governance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white text-[#002664] flex items-center justify-center font-bold text-sm">
                SB
              </div>
              <span className="text-base font-bold text-white">SkillBridge AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified digital public service portal under the Department of Skills, Employment, Entrepreneurship &amp; Innovation, Government of Maharashtra.
            </p>
            <p className="text-[11px] text-slate-500">
              In collaboration with Maharashtra State Skill Development Society (MSSDS) and Directorate of Vocational Education &amp; Training (DVET).
            </p>
          </div>

          {/* Col 2: Task-First Pathways */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'mr' ? 'नागरिक सेवा' : language === 'hi' ? 'नागरिक सेवाएं' : 'Citizen Services'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('student');
                    onNavigate('assess');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.taskAssessTitle}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('student');
                    onNavigate('courses');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.taskTrainingTitle}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('student');
                    onNavigate('jobs');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.taskJobTitle}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => onNavigate('schemes')} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.taskSchemesTitle}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('admin');
                    onNavigate('districts');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.navDistricts}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Workspaces */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'mr' ? 'कार्यक्षेत्रे' : language === 'hi' ? 'कार्यक्षेत्र' : 'Workspaces'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('student');
                    onNavigate('assess');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.roleStudent}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('employer');
                    onNavigate('employer');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.roleEmployer}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('institute');
                    onNavigate('institute');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.roleInstitute}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('admin');
                    onNavigate('admin');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.roleAdmin}</span>
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => {
                    onSelectRole?.('counselor');
                    onNavigate('counselor');
                  }} 
                  className="text-left w-full hover:text-white hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1.5 group focus:outline-hidden focus:ring-1 focus:ring-amber-400 rounded"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                  <span>{t.roleCounselor}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Help & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {language === 'mr' ? 'अधिकृत संपर्क' : language === 'hi' ? 'आधिकारिक संपर्क' : 'Official Secretariat'}
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>4th Floor, MTNL Telephone Exchange Building, GD Somani Marg, Cuffe Parade / BKC Complex, Mumbai 400051</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>helpdesk@skillbridge.maharashtra.gov.in</span>
            </div>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[11px] text-emerald-400 font-mono">
                WCAG 2.2 AA Accessible
              </span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Disclaimers */}
        <div className="border-t border-slate-800 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Government of Maharashtra. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://mahaswayam.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-300 inline-flex items-center gap-1">
              Mahaswayam Portal <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://dvet.gov.in" target="_blank" rel="noreferrer" className="hover:text-slate-300 inline-flex items-center gap-1">
              DVET Maharashtra <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            {onOpenFeedback && (
              <button
                type="button"
                onClick={() => onOpenFeedback()}
                className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t.feedbackButton}</span>
              </button>
            )}
            <span className="text-slate-700">|</span>
            <span>Right to Information (RTI)</span>
            <span>Citizen Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
