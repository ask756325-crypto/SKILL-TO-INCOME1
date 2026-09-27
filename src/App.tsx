/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, UserRole } from './types';
import { translations } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeTaskView } from './components/HomeTaskView';
import { StudentPortal } from './components/StudentPortal';
import { EmployerPortal } from './components/EmployerPortal';
import { InstitutePortal } from './components/InstitutePortal';
import { AdminPortal } from './components/AdminPortal';
import { CounselorPortal } from './components/CounselorPortal';
import { EligibilityWizard } from './components/EligibilityWizard';
import { DistrictLocator } from './components/DistrictLocator';
import { CriticalAlertBanner } from './components/CriticalAlertBanner';
import { CitizenFeedbackModal } from './components/CitizenFeedbackModal';
import { Breadcrumbs } from './components/Breadcrumbs';
import { MessageSquarePlus } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activePortalTab, setActivePortalTab] = useState<'assessment' | 'courses' | 'jobs'>('assessment');
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);
  const [locatorOpen, setLocatorOpen] = useState<boolean>(false);
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);
  const [feedbackPrefill, setFeedbackPrefill] = useState<string>('');

  const t = translations[language];

  // Sync high contrast mode with document root
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
  };

  const handleNavigate = (view: string, itemId?: string) => {
    // Synchronize user role automatically when navigating to specific role views
    if (view === 'employer') {
      setCurrentRole('employer');
    } else if (view === 'institute') {
      setCurrentRole('institute');
    } else if (view === 'admin' || view === 'districts') {
      setCurrentRole('admin');
    } else if (view === 'counselor') {
      setCurrentRole('counselor');
    } else if (view === 'assess' || view === 'courses' || view === 'jobs') {
      setCurrentRole('student');
    }

    if (view === 'courses') {
      setActivePortalTab('courses');
    } else if (view === 'jobs') {
      setActivePortalTab('jobs');
    } else if (view === 'assess') {
      setActivePortalTab('assessment');
    }

    setHighlightedItemId(itemId || null);
    setCurrentView(view);

    // Multi-target scrolling to ensure page scrolls up reliably across all viewports
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const mainEl = document.getElementById('main-content');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8F9FA] text-[#1A202C] ${isLargeFont ? 'text-lg' : 'text-base'}`}>
      {/* 1. Header (Service NSW & GOV.UK style) */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        language={language}
        onLanguageChange={setLanguage}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        isLargeFont={isLargeFont}
        onToggleFontSize={() => setIsLargeFont(!isLargeFont)}
        onOpenLocator={() => setLocatorOpen(true)}
      />

      {/* 2. High-Priority Critical Alert & Emergency Banner (Placed prominently below Header) */}
      <CriticalAlertBanner
        language={language}
        onNavigate={handleNavigate}
        onOpenFeedback={(prefill) => {
          setFeedbackPrefill(prefill || '');
          setFeedbackOpen(true);
        }}
      />

      {/* 3. Task-First Breadcrumb Navigation (Service NSW & GOV.UK style) */}
      <Breadcrumbs
        currentView={currentView}
        onNavigate={handleNavigate}
        language={language}
        highlightedItemId={highlightedItemId}
        currentRole={currentRole}
      />

      {/* 3. Main Content Viewport */}
      <main id="main-content" className="flex-1 pb-16 outline-hidden">
        {currentView === 'home' && (
          <HomeTaskView
            language={language}
            onNavigate={handleNavigate}
            onSelectRole={handleRoleChange}
            onOpenLocator={() => setLocatorOpen(true)}
          />
        )}

        {(currentView === 'assess' || currentView === 'courses' || currentView === 'jobs') && (
          <div className="pt-8">
            <StudentPortal
              language={language}
              initialTab={activePortalTab}
              onTabChange={(tab) => {
                setActivePortalTab(tab);
                setCurrentView(tab === 'assessment' ? 'assess' : tab);
              }}
              highlightedItemId={highlightedItemId}
              onOpenLocator={() => setLocatorOpen(true)}
              onNavigateToSchemes={() => handleNavigate('schemes')}
            />
          </div>
        )}

        {(currentView === 'employer' || (currentRole === 'employer' && currentView === 'home_role')) && (
          <div className="pt-8">
            <EmployerPortal language={language} />
          </div>
        )}

        {(currentView === 'institute' || (currentRole === 'institute' && currentView === 'home_role')) && (
          <div className="pt-8">
            <InstitutePortal language={language} />
          </div>
        )}

        {(currentView === 'admin' || currentView === 'districts' || (currentRole === 'admin' && currentView === 'home_role')) && (
          <div className="pt-8">
            <AdminPortal language={language} />
          </div>
        )}

        {(currentView === 'counselor' || (currentRole === 'counselor' && currentView === 'home_role')) && (
          <div className="pt-8">
            <CounselorPortal language={language} />
          </div>
        )}

        {currentView === 'schemes' && (
          <div className="pt-8">
            <EligibilityWizard language={language} />
          </div>
        )}
      </main>

      {/* 4. Floating Citizen Feedback Button (Accessible GIGW 3.0 trigger) */}
      <aside aria-label="Citizen Feedback Trigger" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setFeedbackPrefill('');
            setFeedbackOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#002664] hover:bg-[#00173D] text-white text-xs font-bold rounded-full shadow-xl border-2 border-white/80 transition-all hover:scale-105 focus:outline-hidden focus-visible:ring-4 focus-visible:ring-amber-400 cursor-pointer"
          aria-label={t.feedbackButton}
          title={t.feedbackButton}
        >
          <MessageSquarePlus className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">{t.feedbackButton}</span>
        </button>
      </aside>

      {/* 5. Physical Center Walk-In Finder Modal */}
      <DistrictLocator
        isOpen={locatorOpen}
        onClose={() => setLocatorOpen(false)}
        language={language}
      />

      {/* 6. Citizen Feedback & Grievance Modal */}
      <CitizenFeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        language={language}
        prefilledSubject={feedbackPrefill}
      />

      {/* 7. Footer (Civic & Accessibility standards) */}
      <Footer
        language={language}
        currentView={currentView}
        currentRole={currentRole}
        onNavigate={handleNavigate}
        onSelectRole={handleRoleChange}
        onOpenLocator={() => setLocatorOpen(true)}
        onOpenFeedback={(prefill) => {
          setFeedbackPrefill(prefill || '');
          setFeedbackOpen(true);
        }}
      />
    </div>
  );
}
