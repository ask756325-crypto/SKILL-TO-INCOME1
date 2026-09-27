import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MessageSquarePlus, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Send, 
  Clock, 
  Building2, 
  AlertCircle,
  ThumbsUp,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { Language, CitizenFeedback } from '../types';
import { translations } from '../translations';
import { INITIAL_FEEDBACKS } from '../data/mockData';

interface CitizenFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  prefilledSubject?: string;
}

export const CitizenFeedbackModal: React.FC<CitizenFeedbackModalProps> = ({
  isOpen,
  onClose,
  language,
  prefilledSubject = ''
}) => {
  const [feedbacks, setFeedbacks] = useState<CitizenFeedback[]>(() => {
    try {
      const stored = localStorage.getItem('skillbridge_citizen_feedbacks');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return INITIAL_FEEDBACKS;
  });

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<CitizenFeedback['category']>('scheme_eligibility');
  const [subject, setSubject] = useState(prefilledSubject);
  const [message, setMessage] = useState('');
  const [district, setDistrict] = useState('Pune');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  const t = translations[language];
  const modalRef = useRef<HTMLDivElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  // Update subject when prefilledSubject changes
  useEffect(() => {
    if (prefilledSubject) {
      setSubject(`Inquiry regarding: ${prefilledSubject}`);
    }
  }, [prefilledSubject]);

  // Focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      subjectInputRef.current?.focus();
    }, 100);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim()) return;

    setIsSubmitting(true);

    const ticketId = `MH-CITIZEN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newFeedback: CitizenFeedback = {
      id: ticketId,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      rating,
      category,
      subject,
      message,
      userDistrict: district,
      contactEmailOrPhone: contactInfo || undefined,
      status: 'received'
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    try {
      localStorage.setItem('skillbridge_citizen_feedbacks', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(ticketId);
      setMessage('');
      setSubject('');
      setContactInfo('');
    }, 600);
  };

  const getRatingLabel = (score: number) => {
    switch (score) {
      case 5: return 'Excellent - Transparent & Helpful';
      case 4: return 'Good - Meets requirements';
      case 3: return 'Average - Adequate information';
      case 2: return 'Needs Improvement - Encountered difficulties';
      case 1: return 'Poor - Significant issues faced';
      default: return '';
    }
  };

  const getStatusBadge = (status: CitizenFeedback['status']) => {
    switch (status) {
      case 'action_taken':
        return (
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {t.feedbackStatusActionTaken}
          </span>
        );
      case 'in_review':
        return (
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t.feedbackStatusInReview}
          </span>
        );
      case 'received':
      default:
        return (
          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
            <FileCheck2 className="w-3 h-3" />
            {t.feedbackStatusReceived}
          </span>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#002664] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
            <div>
              <h2 id="feedback-dialog-title" className="text-base font-bold text-white">
                {t.feedbackTitle}
              </h2>
              <p className="text-[11px] text-slate-300">
                {t.feedbackSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close feedback dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Submit Form / Past History) */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('form');
                setSubmittedTicket(null);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'form' 
                  ? 'bg-white text-[#002664] shadow-xs border border-slate-200 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Submit Feedback / Grievance
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'history' 
                  ? 'bg-white text-[#002664] shadow-xs border border-slate-200 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Citizen Feedbacks &amp; Actions ({feedbacks.length})
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Direct Public Redressal
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'form' ? (
            submittedTicket ? (
              <div className="p-8 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'mr' ? 'अभिप्राय यशस्वीरीत्या नोंदवला गेला आहे!' : language === 'hi' ? 'प्रतिक्रिया सफलतापूर्वक दर्ज कर ली गई है!' : 'Feedback Successfully Registered!'}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.feedbackSuccess} <strong className="font-mono text-sm text-[#002664] block mt-1">{submittedTicket}</strong>
                </p>
                <p className="text-xs text-slate-500">
                  A receipt notification has been registered in the Maharashtra State Skill Development Directorate dashboard.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('history')}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    View in Citizen History
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Star Rating */}
                <div className="space-y-1.5">
                  <label id="rating-label" className="text-xs font-bold text-slate-700 block">
                    {t.feedbackRating} <span className="text-rose-600">*</span>
                  </label>
                  <div className="flex items-center gap-1.5" role="radiogroup" aria-labelledby="rating-label">
                    {[1, 2, 3, 4, 5].map((score) => {
                      const isFilled = (hoverRating || rating) >= score;
                      return (
                        <button
                          key={score}
                          type="button"
                          role="radio"
                          aria-checked={rating === score}
                          aria-label={`${score} star: ${getRatingLabel(score)}`}
                          onClick={() => setRating(score)}
                          onMouseEnter={() => setHoverRating(score)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 rounded text-amber-400 hover:scale-110 transition-transform focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#002664]"
                        >
                          <Star className={`w-6 h-6 ${isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      );
                    })}
                    <span className="text-xs text-slate-600 font-semibold ml-2">
                      {getRatingLabel(hoverRating || rating)}
                    </span>
                  </div>
                </div>

                {/* 2. Category & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="feedback-category-select" className="text-xs font-bold text-slate-700 block">
                      {t.feedbackCategory} <span className="text-rose-600">*</span>
                    </label>
                    <select
                      id="feedback-category-select"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CitizenFeedback['category'])}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
                    >
                      <option value="scheme_eligibility">Government Schemes &amp; Subsidies (PMKVY/MAPS)</option>
                      <option value="course_iti_info">Course &amp; ITI Information</option>
                      <option value="jobs_apprenticeships">Jobs &amp; Apprenticeship Matches</option>
                      <option value="accessibility">Accessibility &amp; Screen Reader Support</option>
                      <option value="portal_performance">Portal Performance &amp; Technical Issues</option>
                      <option value="general_suggestion">General Suggestion / Citizen Charter</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="feedback-district-select" className="text-xs font-bold text-slate-700 block">
                      {t.feedbackDistrict}
                    </label>
                    <select
                      id="feedback-district-select"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
                    >
                      <option value="Pune">Pune</option>
                      <option value="Mumbai Suburban">Mumbai Suburban</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Kolhapur">Kolhapur</option>
                      <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar</option>
                      <option value="Thane">Thane</option>
                      <option value="Other">Other Maharashtra District</option>
                    </select>
                  </div>
                </div>

                {/* 3. Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="feedback-subject-input" className="text-xs font-bold text-slate-700 block">
                    {t.feedbackSubject} <span className="text-rose-600">*</span>
                  </label>
                  <input
                    ref={subjectInputRef}
                    id="feedback-subject-input"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Free tuition voucher seat confirmation in Kolhapur ITI"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
                  />
                </div>

                {/* 4. Message Content */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="feedback-message-textarea" className="font-bold text-slate-700">
                      {t.feedbackMessage} <span className="text-rose-600">*</span>
                    </label>
                    <span className="text-slate-400 font-mono text-[11px]">{message.length}/600</span>
                  </div>
                  <textarea
                    id="feedback-message-textarea"
                    required
                    rows={4}
                    maxLength={600}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your feedback, query, or grievance clearly. Mention relevant course names, dates, or application tokens if applicable..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden leading-relaxed"
                  />
                </div>

                {/* 5. Optional Contact */}
                <div className="space-y-1.5">
                  <label htmlFor="feedback-contact-input" className="text-xs font-bold text-slate-700 block">
                    {t.feedbackContact}
                  </label>
                  <input
                    id="feedback-contact-input"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="e.g. citizen.help@gmail.com or 98220XXXXX"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-500">
                    Your submission is officially protected under the Maharashtra Public Services Guarantee Act.
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !message.trim() || !subject.trim()}
                      className="px-6 py-2 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors shadow-xs disabled:opacity-50 inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Registering...' : t.feedbackSubmit}</span>
                    </button>
                  </div>
                </div>
              </form>
            )
          ) : (
            /* History & Action Taken View */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {t.feedbackRecentTitle}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  Directorate Redressal Log
                </span>
              </div>

              <div className="space-y-3">
                {feedbacks.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#002664]">{item.id}</span>
                        <span>·</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                        <span className="text-slate-400 text-[11px]">{item.timestamp}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-900">
                      {item.subject}
                    </h4>

                    <p className="text-slate-600 leading-relaxed">
                      {item.message}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>District: <strong>{item.userDistrict || 'Maharashtra'}</strong></span>
                      <span className="text-emerald-700 font-medium">Recorded under Citizen Charter</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
