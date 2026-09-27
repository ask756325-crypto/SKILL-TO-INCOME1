import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  X, 
  ExternalLink, 
  FileText, 
  MessageSquarePlus, 
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, CriticalAlert } from '../types';
import { translations } from '../translations';
import { CRITICAL_ALERTS } from '../data/mockData';

interface CriticalAlertBannerProps {
  language: Language;
  onNavigate: (view: string) => void;
  onOpenFeedback: (prefilledSubject?: string) => void;
}

export const CriticalAlertBanner: React.FC<CriticalAlertBannerProps> = ({
  language,
  onNavigate,
  onOpenFeedback
}) => {
  const [alerts, setAlerts] = useState<CriticalAlert[]>(CRITICAL_ALERTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  const t = translations[language];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active alerts excluding dismissed
  const activeAlerts = alerts.filter((a) => !dismissedAlertIds.includes(a.id));

  // Current alert item
  const currentAlert = activeAlerts[currentIndex % Math.max(1, activeAlerts.length)];

  // Automatic cycle rotation (every 9 seconds when not paused)
  useEffect(() => {
    if (isPaused || activeAlerts.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAlerts.length);
    }, 9000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeAlerts.length]);

  // Keep screen reader updated when active alert changes
  useEffect(() => {
    if (currentAlert) {
      const title = language === 'mr' ? currentAlert.titleMr : language === 'hi' ? currentAlert.titleHi : currentAlert.title;
      setScreenReaderAnnouncement(`Official Announcement ${currentIndex + 1} of ${activeAlerts.length}: ${currentAlert.severity.toUpperCase()} - ${title}`);
    }
  }, [currentIndex, currentAlert, language, activeAlerts.length]);

  if (activeAlerts.length === 0) {
    return (
      <aside 
        aria-label="Official announcements status" 
        className="bg-slate-100 border-b border-slate-200 px-4 py-1.5 text-xs text-slate-600 flex items-center justify-between"
      >
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>All official systems operational. No active critical emergencies.</span>
        </span>
        <button
          type="button"
          onClick={() => {
            setDismissedAlertIds([]);
            setCurrentIndex(0);
          }}
          className="text-[#002664] hover:underline font-semibold inline-flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.alertRestore}</span>
        </button>
      </aside>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeAlerts.length);
    setExpandedDetails(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeAlerts.length) % activeAlerts.length);
    setExpandedDetails(false);
  };

  const handleDismiss = () => {
    if (!currentAlert) return;
    setDismissedAlertIds((prev) => [...prev, currentAlert.id]);
    setExpandedDetails(false);
    if (currentIndex >= activeAlerts.length - 1) {
      setCurrentIndex(0);
    }
  };

  const getLocalizedTitle = (alert: CriticalAlert) => {
    if (language === 'mr') return alert.titleMr;
    if (language === 'hi') return alert.titleHi;
    return alert.title;
  };

  const getLocalizedMessage = (alert: CriticalAlert) => {
    if (language === 'mr') return alert.messageMr;
    if (language === 'hi') return alert.messageHi;
    return alert.message;
  };

  const getLocalizedAction = (alert: CriticalAlert) => {
    if (language === 'mr') return alert.actionLabelMr || alert.actionLabel || 'अधिक माहिती';
    if (language === 'hi') return alert.actionLabelHi || alert.actionLabel || 'विवरण देखें';
    return alert.actionLabel || 'View Details';
  };

  const getSeverityTheme = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return {
          container: 'bg-[#FFFBEB] border-l-4 border-l-[#D97706] text-[#78350F] border-b border-amber-200',
          badge: 'bg-[#D97706] text-white',
          label: t.alertUrgent,
          icon: AlertTriangle,
          iconColor: 'text-[#D97706]'
        };
      case 'warning':
        return {
          container: 'bg-[#FEFCE8] border-l-4 border-l-[#CA8A04] text-[#854D0E] border-b border-yellow-200',
          badge: 'bg-[#CA8A04] text-white',
          label: t.alertWarning,
          icon: Clock,
          iconColor: 'text-[#CA8A04]'
        };
      case 'info':
      default:
        return {
          container: 'bg-[#EFF6FF] border-l-4 border-l-[#002664] text-[#1E3A8A] border-b border-blue-200',
          badge: 'bg-[#002664] text-white',
          label: t.alertInfo,
          icon: Info,
          iconColor: 'text-[#002664]'
        };
    }
  };

  const theme = getSeverityTheme(currentAlert.severity);
  const SeverityIcon = theme.icon;

  return (
    <section 
      role="region" 
      aria-label={t.alertBannerTitle}
      className={`relative w-full ${theme.container} shadow-xs transition-colors`}
    >
      {/* Live Region for Screen Readers */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {screenReaderAnnouncement}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left: Severity Tag & Announcement Body */}
          <div className="flex items-start gap-2.5 min-w-0 flex-1">
            <div className="shrink-0 mt-0.5" aria-hidden="true">
              <SeverityIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.iconColor}`} />
            </div>

            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-sm ${theme.badge}`}>
                  {theme.label}
                </span>

                <span className="text-xs font-bold tracking-tight text-slate-900 leading-snug">
                  {getLocalizedTitle(currentAlert)}
                </span>
                
                {currentAlert.officialGazetteRef && (
                  <span className="hidden lg:inline text-[11px] font-mono text-slate-500 bg-white/70 px-1.5 py-0.5 rounded border border-slate-300/60">
                    {currentAlert.officialGazetteRef}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed line-clamp-2 md:line-clamp-1">
                {getLocalizedMessage(currentAlert)}
              </p>
            </div>
          </div>

          {/* Right: Actions, Expand, Navigation, and Controls */}
          <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-200/50">
            {/* Primary Action Button */}
            {currentAlert.actionView && (
              <button
                type="button"
                onClick={() => onNavigate(currentAlert.actionView!)}
                className="px-3 py-1 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-md transition-colors shadow-2xs whitespace-nowrap"
              >
                {getLocalizedAction(currentAlert)}
              </button>
            )}

            {/* Direct Citizen Feedback Button */}
            <button
              type="button"
              onClick={() => onOpenFeedback(getLocalizedTitle(currentAlert))}
              className="px-2.5 py-1 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-white/80 hover:bg-white border border-slate-300/80 rounded-md transition-colors inline-flex items-center gap-1 shadow-2xs whitespace-nowrap"
              title="Submit feedback or report an issue regarding this notice"
              aria-label="Provide citizen feedback on this notice"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#002664]" />
              <span className="hidden sm:inline">{t.feedbackButton}</span>
            </button>

            {/* Toggle Full Details */}
            <button
              type="button"
              onClick={() => setExpandedDetails(!expandedDetails)}
              className="p-1 rounded text-slate-700 hover:text-slate-950 hover:bg-white/60 transition-colors"
              title={expandedDetails ? 'Hide details' : 'Show full circular details'}
              aria-expanded={expandedDetails}
              aria-label="Toggle official circular details"
            >
              {expandedDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {/* Multi-alert carousel controls if more than 1 item */}
            {activeAlerts.length > 1 && (
              <div className="flex items-center gap-0.5 border-l border-slate-300 pl-1.5 ml-1" role="group" aria-label="Announcement controls">
                <span className="text-[11px] font-mono text-slate-600 px-1 font-semibold" aria-hidden="true">
                  {currentIndex + 1}/{activeAlerts.length}
                </span>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  aria-label={t.alertPrev}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  aria-label={isPaused ? t.alertPlay : t.alertPause}
                  aria-pressed={isPaused}
                  title={isPaused ? t.alertPlay : t.alertPause}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  aria-label={t.alertNext}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-white/60 transition-colors border-l border-slate-300 pl-1.5 ml-1"
              aria-label={t.alertDismiss}
              title={t.alertDismiss}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable Official Circular / Document Drawer */}
        {expandedDetails && (
          <div className="mt-3 pt-3 border-t border-slate-300/70 bg-white/70 rounded-lg p-3 text-xs text-slate-800 space-y-2 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold flex items-center gap-1.5 text-slate-900">
                <FileText className="w-4 h-4 text-[#002664]" />
                {t.alertOfficialRef}: {currentAlert.officialGazetteRef || 'Government of Maharashtra DVET Gazette'}
              </span>
              <span className="text-[11px] text-slate-500">
                Effective: {currentAlert.effectiveDate} {currentAlert.expiryDate ? `· Expiry: ${currentAlert.expiryDate}` : ''}
              </span>
            </div>

            <p className="leading-relaxed text-slate-700">
              {getLocalizedMessage(currentAlert)}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-500">
                Issued by Directorate of Vocational Education &amp; Training (DVET), Maharashtra.
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenFeedback(getLocalizedTitle(currentAlert))}
                  className="font-bold text-[#002664] hover:underline"
                >
                  Send Grievance / Feedback →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
