import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  Briefcase, 
  Award, 
  BarChart3, 
  Users, 
  Menu, 
  X, 
  PhoneCall, 
  MapPin, 
  Eye, 
  Type, 
  Globe2, 
  ChevronDown,
  Search
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';
import { HeaderSearch } from './HeaderSearch';
import { VoiceBeam, useMicrophone } from 'voice-glow';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, itemId?: string) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  isLargeFont: boolean;
  onToggleFontSize: () => void;
  onOpenLocator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  highContrast,
  onToggleHighContrast,
  isLargeFont,
  onToggleFontSize,
  onOpenLocator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const mic = useMicrophone();
  const [isSearching, setIsSearching] = useState(false);
  const t = translations[language];

  const roleLabels: Record<UserRole, string> = {
    student: t.roleStudent,
    employer: t.roleEmployer,
    institute: t.roleInstitute,
    admin: t.roleAdmin,
    counselor: t.roleCounselor,
  };

  const navLinks = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'assess', label: t.navAssess, icon: BookOpen },
    { id: 'courses', label: t.navTraining, icon: Award },
    { id: 'jobs', label: t.navJobs, icon: Briefcase },
    { id: 'schemes', label: t.navSchemes, icon: Award },
    { id: 'districts', label: t.navDistricts, icon: BarChart3 },
  ];

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>

      {/* 1. Official Government Strip (GOV.UK & Service NSW style) */}
      <div className="bg-[#00173D] text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {/* Subtle State Emblem graphic */}
          <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.08-2.67 7.88-6 8.91-3.33-1.03-6-4.83-6-8.91V6.43l6-2.25z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span className="font-semibold tracking-wide">
            {t.govtSubtitle}
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
            MSSDS · DVET
          </span>
        </div>

        {/* Accessibility & Language Controls */}
        <div className="flex items-center gap-3">
          {/* Helpline quick link */}
          <a 
            href="tel:18001208040" 
            className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>1800-120-8040</span>
          </a>

          <span className="hidden md:inline text-slate-600">|</span>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={onToggleHighContrast}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              highContrast ? 'bg-amber-400 text-black font-bold' : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={highContrast}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{highContrast ? t.normalContrast : t.highContrast}</span>
          </button>

          {/* Font Size Toggle */}
          <button
            type="button"
            onClick={onToggleFontSize}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              isLargeFont ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white'
            }`}
            aria-label="Toggle larger text size"
          >
            <Type className="w-3 h-3" />
            <span className="hidden sm:inline">{isLargeFont ? 'Standard (A)' : 'Large (A+)'}</span>
          </button>

          <span className="text-slate-600">|</span>

          {/* Language Selector (English, Marathi, Hindi) */}
          <div className="flex items-center gap-1 text-[11px]">
            <Globe2 className="w-3 h-3 text-slate-400" />
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 rounded ${
                language === 'en' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('mr')}
              className={`px-1.5 py-0.5 rounded ${
                language === 'mr' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-0.5 rounded ${
                language === 'hi' ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Top Bar (Strict 3-zone contract enhanced with prominent Task-First Search) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 lg:gap-4">
        {/* Zone 1: Single text element wordmark (compacted per user request) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-7 h-7 rounded-md bg-[#002664] text-white flex items-center justify-center font-black text-xs shadow-xs group-hover:bg-[#00173D] transition-colors">
              SB
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold tracking-tight text-[#002664] flex items-center gap-1 leading-tight">
                SkillBridge AI
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block leading-none mt-0.5">
                Maharashtra Public Skills &amp; Employment Portal
              </p>
            </div>
          </button>
        </div>

        {/* PROMINENT EXPANDED TASK-FIRST SEARCH COMPONENT (Desktop & Tablet) */}
        <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-2 lg:mx-4">
          <VoiceBeam
            stream={mic.stream}
            processing={isSearching}
            colorVariant="colorful"
            theme="light"
            strength={0.85}
            className="w-full"
          >
            <HeaderSearch 
              language={language} 
              onNavigate={onNavigate} 
              onOpenLocator={onOpenLocator}
              mic={mic}
              isSearching={isSearching}
              onSearchStateChange={setIsSearching}
            />
          </VoiceBeam>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-medium text-slate-700 shrink-0">
          {navLinks.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap text-xs font-semibold ${
                  isActive 
                    ? 'text-[#002664] bg-slate-100 font-bold border-b-2 border-[#002664]' 
                    : 'hover:text-[#002664] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions (Search on mobile, ITI locator, Workspace Selector, Mobile Menu) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle mobile search bar"
            aria-expanded={mobileSearchVisible}
          >
            <Search className="w-5 h-5 text-[#002664]" />
          </button>

          {/* Physical Center Finder Button */}
          <button
            type="button"
            onClick={onOpenLocator}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300"
          >
            <MapPin className="w-3.5 h-3.5 text-[#002664]" />
            <span>{t.findCenter}</span>
          </button>

          {/* Role / Workspace Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors shadow-xs"
              aria-expanded={roleDropdownOpen}
              aria-haspopup="true"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="max-w-[130px] truncate">{roleLabels[currentRole]}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
              >
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  {t.switchRole}
                </div>
                {(['student', 'employer', 'institute', 'admin', 'counselor'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onRoleChange(r);
                      setRoleDropdownOpen(false);
                      if (r === 'student') onNavigate('assess');
                      if (r === 'employer') onNavigate('employer');
                      if (r === 'institute') onNavigate('institute');
                      if (r === 'admin') onNavigate('admin');
                      if (r === 'counselor') onNavigate('counselor');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      currentRole === r 
                        ? 'bg-blue-50 text-[#002664] font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{roleLabels[r]}</span>
                    {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#002664]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {mobileSearchVisible && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-200/80 bg-slate-50/95 animate-in fade-in slide-in-from-top-1 duration-150">
          <VoiceBeam
            stream={mic.stream}
            processing={isSearching}
            colorVariant="colorful"
            theme="light"
            strength={0.85}
            className="w-full"
          >
            <HeaderSearch 
              language={language} 
              onNavigate={(view, id) => {
                onNavigate(view, id);
                setMobileSearchVisible(false);
              }} 
              onOpenLocator={() => {
                onOpenLocator();
                setMobileSearchVisible(false);
              }}
              mic={mic}
              isSearching={isSearching}
              onSearchStateChange={setIsSearching}
            />
          </VoiceBeam>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          {/* Quick search inside mobile drawer */}
          <div className="pb-2">
            <VoiceBeam
              stream={mic.stream}
              processing={isSearching}
              colorVariant="colorful"
              theme="light"
              strength={0.85}
              className="w-full"
            >
              <HeaderSearch 
                language={language} 
                onNavigate={(view, id) => {
                  onNavigate(view, id);
                  setMobileMenuOpen(false);
                }} 
                onOpenLocator={() => {
                  onOpenLocator();
                  setMobileMenuOpen(false);
                }}
                mic={mic}
                isSearching={isSearching}
                onSearchStateChange={setIsSearching}
              />
            </VoiceBeam>
          </div>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider py-1 border-t border-slate-100 pt-2">
            Navigation
          </div>
          {navLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2.5 ${
                currentView === item.id ? 'bg-slate-100 text-[#002664] font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4 text-slate-500" />
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                onOpenLocator();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              <MapPin className="w-4 h-4 text-[#002664]" />
              <span>{t.findCenter}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
