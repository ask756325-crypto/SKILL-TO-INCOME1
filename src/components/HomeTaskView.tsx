import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Award, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  TrendingUp, 
  PhoneCall, 
  Compass, 
  FileText, 
  ChevronRight,
  Send,
  Loader2
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';
import { TrustBadge } from './TrustBadge';

interface HomeTaskViewProps {
  language: Language;
  onNavigate: (view: string) => void;
  onSelectRole: (role: UserRole) => void;
  onOpenLocator: () => void;
}

export const HomeTaskView: React.FC<HomeTaskViewProps> = ({
  language,
  onNavigate,
  onSelectRole,
  onOpenLocator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [advisorQuery, setAdvisorQuery] = useState('');
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorResponse, setAdvisorResponse] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'students' | 'employers' | 'schemes'>('all');

  const t = translations[language];

  // Service NSW 7 Core Task Pathways
  const taskCards = [
    {
      id: 'task_assess',
      title: t.taskAssessTitle,
      desc: t.taskAssessDesc,
      icon: BookOpen,
      action: () => onNavigate('assess'),
      badge: 'Popular',
      color: 'border-l-4 border-blue-600',
      category: 'students'
    },
    {
      id: 'task_path',
      title: t.taskSkillPathTitle,
      desc: t.taskSkillPathDesc,
      icon: Compass,
      action: () => onNavigate('assess'),
      category: 'students'
    },
    {
      id: 'task_training',
      title: t.taskTrainingTitle,
      desc: t.taskTrainingDesc,
      icon: Award,
      action: () => onNavigate('courses'),
      badge: '850+ ITIs',
      category: 'students'
    },
    {
      id: 'task_jobs',
      title: t.taskJobTitle,
      desc: t.taskJobDesc,
      icon: Briefcase,
      action: () => onNavigate('jobs'),
      badge: 'MAPS / NAPS',
      category: 'students'
    },
    {
      id: 'task_hire',
      title: t.taskHireTitle,
      desc: t.taskHireDesc,
      icon: Users,
      action: () => {
        onSelectRole('employer');
        onNavigate('employer');
      },
      category: 'employers'
    },
    {
      id: 'task_schemes',
      title: t.taskSchemesTitle,
      desc: t.taskSchemesDesc,
      icon: ShieldCheck,
      action: () => onNavigate('schemes'),
      badge: 'myScheme',
      category: 'schemes'
    },
    {
      id: 'task_support',
      title: t.taskSupportTitle,
      desc: t.taskSupportDesc,
      icon: PhoneCall,
      action: onOpenLocator,
      category: 'students'
    }
  ];

  const filteredTasks = taskCards.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || task.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorQuery.trim()) return;

    setAdvisorLoading(true);
    setAdvisorResponse(null);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: advisorQuery,
          language,
          currentDistrict: 'Pune'
        })
      });
      const data = await res.json();
      setAdvisorResponse(data);
    } catch (err) {
      console.error('Advisor fetch error:', err);
    } finally {
      setAdvisorLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Hero: Service NSW Task-First Benchmark ("How can we help you today?") */}
      <section className="bg-gradient-to-b from-[#002664] to-[#00173D] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 rounded-b-2xl shadow-md">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.betaTag}</span>
            <span>·</span>
            <span>Government of Maharashtra</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroHeading}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubheading}
          </p>

          {/* Service Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-28 py-3.5 bg-white text-slate-900 rounded-xl shadow-lg text-sm sm:text-base focus:ring-4 focus:ring-amber-400 focus:outline-hidden"
                aria-label="Search skills, courses or government services"
              />
              <button
                type="button"
                onClick={() => {}}
                className="absolute right-2 px-4 py-2 bg-[#002664] text-white text-xs font-bold rounded-lg hover:bg-[#00173D] transition-colors"
              >
                {t.searchButton}
              </button>
            </div>

            {/* Quick suggested search terms */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-300">
              <span className="font-semibold text-slate-400">Popular:</span>
              <button 
                type="button" 
                onClick={() => setSearchQuery('Electric Vehicle')} 
                className="underline hover:text-white transition-colors"
              >
                EV Technician
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setSearchQuery('CNC')} 
                className="underline hover:text-white transition-colors"
              >
                CNC Machining
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setSearchQuery('PMKVY')} 
                className="underline hover:text-white transition-colors"
              >
                PMKVY 4.0 Voucher
              </button>
              <span>·</span>
              <button 
                type="button" 
                onClick={() => setSearchQuery('Apprenticeship')} 
                className="underline hover:text-white transition-colors"
              >
                MAPS Stipend
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. State Performance Metrics (Rigor & Trust) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-500">
              {language === 'mr' ? 'मान्यताप्राप्त ITI व केंद्रे' : language === 'hi' ? 'सत्यापित आईटीआई एवं केंद्र' : 'Accredited Centers'}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#002664] mt-1 font-mono">
              850+
            </p>
            <span className="text-[11px] text-slate-500">Across 36 Districts</span>
          </div>

          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-500">
              {language === 'mr' ? 'सक्रिय प्रशिक्षणार्थी' : language === 'hi' ? 'सक्रिय प्रशिक्षु' : 'Active Trainees'}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#002664] mt-1 font-mono">
              2,18,000+
            </p>
            <span className="text-[11px] text-slate-500">Enrolled in FY 2026</span>
          </div>

          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-500">
              {language === 'mr' ? 'रोजगार व प्रशिक्षणार्थी दर' : language === 'hi' ? 'रोजगार एवं अप्रेंटिस दर' : 'Placement & MAPS Rate'}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1 font-mono">
              83.4%
            </p>
            <span className="text-[11px] text-slate-500">Industry Transition</span>
          </div>

          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-500">
              {language === 'mr' ? 'वितरित विद्यावेतन (वार्षिक)' : language === 'hi' ? 'संवितरित वजीफा' : 'Stipends Disbursed'}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#002664] mt-1 font-mono">
              ₹124 Cr
            </p>
            <span className="text-[11px] text-slate-500">Direct DBT to Students</span>
          </div>
        </div>
      </section>

      {/* 3. Task-First Action Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'लोकप्रिय सेवा आणि मार्ग' : language === 'hi' ? 'प्रमुख सेवाएं एवं मार्ग' : 'Core Services & Pathways'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'mr' ? 'तुमच्या गरजेनुसार थेट सेवेवर क्लिक करा.' : language === 'hi' ? 'अपनी आवश्यकता के अनुसार सीधे सेवा चुनें।' : 'Select your primary objective to access tailored guidance.'}
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeCategory === 'all' ? 'bg-white text-[#002664] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('students')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeCategory === 'students' ? 'bg-white text-[#002664] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Job Seekers
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('employers')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeCategory === 'employers' ? 'bg-white text-[#002664] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Employers
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('schemes')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeCategory === 'schemes' ? 'bg-white text-[#002664] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Schemes
            </button>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => {
            const Icon = task.icon;
            return (
              <button
                key={task.id}
                type="button"
                onClick={task.action}
                className={`text-left p-6 bg-white rounded-xl border border-slate-200 hover:border-[#002664] hover:shadow-md transition-all group flex flex-col justify-between ${
                  task.color || ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#002664] flex items-center justify-center group-hover:bg-[#002664] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    {task.badge && (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {task.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#002664] transition-colors leading-snug">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {task.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002664]">
                  <span>{language === 'mr' ? 'सुरू करा' : language === 'hi' ? 'आरंभ करें' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. AI Career Advisor Prompt Bar (Powered by Gemini) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white rounded-2xl border border-blue-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002664] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'mr' ? 'महाराष्ट्र कौशल्य एआय सल्लागार' : language === 'hi' ? 'महाराष्ट्र कौशल एआई सलाहकार' : 'Maharashtra SkillBridge AI Career Advisor'}
                </h3>
                <p className="text-xs text-slate-600">
                  {language === 'mr' ? 'कोणताही प्रश्न विचारा (अभ्यासक्रम, नोकरी, पात्रता अथवा शासकीय लाभ).' : language === 'hi' ? 'कौशल, पाठ्यक्रम अथवा सरकारी योजनाओं पर प्रश्न पूछें।' : 'Ask questions about career paths, ITI courses, stipend schemes, or regional hiring.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">
                Powered by Gemini 3.8 Flash · DVET Knowledge Base
              </span>
            </div>
          </div>

          <form onSubmit={handleAskAdvisor} className="flex gap-2">
            <input
              type="text"
              value={advisorQuery}
              onChange={(e) => setAdvisorQuery(e.target.value)}
              placeholder={
                language === 'mr' 
                  ? 'उदा. मला पुण्यात ईव्ही तंत्रज्ञ व्हायचे आहे, कोणती योजना उपलब्ध आहे?' 
                  : language === 'hi' 
                  ? 'उदा. मुझे सोलर इंस्टॉलेशन में सरकारी प्रशिक्षण कैसे मिल सकता है?' 
                  : 'e.g. How can I transition to EV battery technician with government stipend support in Pune?'
              }
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={advisorLoading || !advisorQuery.trim()}
              className="px-5 py-3 bg-[#002664] hover:bg-[#00173D] text-white font-bold text-xs rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {advisorLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Ask Advisor</span>
                </>
              )}
            </button>
          </form>

          {/* AI Response Card */}
          {advisorResponse && (
            <div className="bg-white rounded-xl border border-indigo-200 p-5 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Official Vocational Advisory
                </span>
                <TrustBadge trust={advisorResponse.trust} language={language} />
              </div>

              <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {advisorResponse.answer}
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <span>{advisorResponse.trust.source}</span>
                <button
                  type="button"
                  onClick={onOpenLocator}
                  className="font-bold text-[#002664] hover:underline inline-flex items-center gap-1"
                >
                  <span>Book in-person counseling at District ITI</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Physical ITI / Kendra Walk-in Strip (Multi-channel service) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Physical Service Centers
            </span>
            <h3 className="text-xl font-bold text-white">
              {language === 'mr' ? 'प्रत्यक्ष शासकीय ITI आणि कौशल्य केंद्रास भेट द्या' : language === 'hi' ? 'नजदीकी सरकारी आईटीआई एवं कौशल केंद्र पर जाएं' : 'Visit an Official Government ITI & Skill Kendra in Person'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Get hands-on laboratory tours, speak directly with trade instructors, verify certificates in person, and register for walk-in campus placement drives across all 36 Maharashtra districts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenLocator}
              className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{t.findCenter}</span>
            </button>
            <a
              href="tel:18001208040"
              className="px-5 py-2.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>1800-120-8040</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
