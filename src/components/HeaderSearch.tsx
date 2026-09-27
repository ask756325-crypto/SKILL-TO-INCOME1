import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  Briefcase, 
  Award, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Building2, 
  ChevronRight, 
  Sparkles, 
  Command, 
  History, 
  CornerDownLeft, 
  Check, 
  TrendingUp,
  Tag,
  Clock,
  Mic,
  MicOff,
  Radio,
  Volume2
} from 'lucide-react';
import { VoiceBeam, useMicrophone } from 'voice-glow';
import { ThinkingOrb } from 'thinking-orbs';
import { Language, JobListing, Course, GovernmentScheme, JobRole, TrustMetadata, SessionSearchItem } from '../types';
import { translations } from '../translations';
import { JOB_LISTINGS, ACCREDITED_COURSES, GOV_SCHEMES, TARGET_JOB_ROLES, PHYSICAL_CENTERS } from '../data/mockData';

export type SearchCategory = 'all' | 'jobs' | 'courses' | 'schemes';

export interface SearchResultItem {
  id: string;
  category: 'jobs' | 'courses' | 'schemes' | 'roles' | 'centers';
  title: string;
  subtitle: string;
  district?: string;
  metaBadge?: string;
  benefitOrSalary?: string;
  skills?: string[];
  trust?: TrustMetadata;
  actionView: string;
  actionLabel: string;
}

export interface AutocompleteSuggestion {
  id: string;
  text: string;
  category: 'jobs' | 'courses' | 'schemes' | 'skills';
  categoryLabel: string;
  targetView: string;
  targetId?: string;
  matchScore: number;
}

interface HeaderSearchProps {
  language: Language;
  onNavigate: (view: string, itemId?: string) => void;
  onOpenLocator: () => void;
  mic?: ReturnType<typeof useMicrophone>;
  isSearching?: boolean;
  onSearchStateChange?: (searching: boolean) => void;
  parentWrapped?: boolean;
}

// Accessible text highlighter for matched query substring
const HighlightMatch: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <span>{text}</span>;

  const q = query.trim().toLowerCase();
  const index = text.toLowerCase().indexOf(q);

  if (index === -1) return <span>{text}</span>;

  const before = text.substring(0, index);
  const match = text.substring(index, index + q.length);
  const after = text.substring(index + q.length);

  return (
    <span>
      {before}
      <mark className="bg-amber-200/70 text-slate-900 font-extrabold px-0.5 rounded-xs underline decoration-[#002664]/50">
        {match}
      </mark>
      {after}
    </span>
  );
};

export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  language,
  onNavigate,
  onOpenLocator,
  mic: propMic,
  isSearching: propIsSearching,
  onSearchStateChange,
  parentWrapped = false
}) => {
  const localMic = useMicrophone();
  const mic = propMic || localMic;
  const [internalSearching, setInternalSearching] = useState(false);
  const isSearching = propIsSearching ?? internalSearching;

  const setIsSearching = (val: boolean) => {
    setInternalSearching(val);
    onSearchStateChange?.(val);
  };

  const [isListening, setIsListening] = useState(false);
  const [secureNotice, setSecureNotice] = useState<string | null>(null);
  const [voiceTranscriptFeedback, setVoiceTranscriptFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const voiceTimeoutRef = useRef<any>(null);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  // Session-persisted Recent Searches (stored in sessionStorage for current session)
  const [sessionSearches, setSessionSearches] = useState<SessionSearchItem[]>(() => {
    try {
      const stored = sessionStorage.getItem('skillbridge_session_recent_searches');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    const now = Date.now();
    return [
      {
        id: 'sess_init_1',
        query: 'Electric Vehicle Specialist',
        timestamp: now - 180000,
        formattedTime: '3m ago',
        category: 'jobs',
        targetView: 'jobs'
      },
      {
        id: 'sess_init_2',
        query: 'PMKVY 4.0 Free Voucher',
        timestamp: now - 720000,
        formattedTime: '12m ago',
        category: 'schemes',
        targetView: 'schemes'
      },
      {
        id: 'sess_init_3',
        query: 'CNC Cobot Machining',
        timestamp: now - 1800000,
        formattedTime: '30m ago',
        category: 'courses',
        targetView: 'courses'
      }
    ];
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Popular quick search queries
  const popularKeywords = [
    { label: 'EV Technician', query: 'Electric Vehicle', cat: 'jobs' },
    { label: 'CNC Cobot Machining', query: 'CNC', cat: 'courses' },
    { label: 'PMKVY 4.0 Free Voucher', query: 'PMKVY', cat: 'schemes' },
    { label: 'MAPS Apprenticeship', query: 'MAPS', cat: 'schemes' },
    { label: 'Full Stack Cloud Dev', query: 'Full-Stack', cat: 'jobs' },
    { label: 'Solar PV Installer', query: 'Solar', cat: 'courses' },
  ];

  // Build searchable index from all datasets
  const allIndexedItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Verified Jobs & Apprenticeships
    JOB_LISTINGS.forEach((job) => {
      items.push({
        id: job.id,
        category: 'jobs',
        title: job.title,
        subtitle: job.company,
        district: job.district,
        metaBadge: job.type,
        benefitOrSalary: job.salary,
        skills: job.skillsRequired,
        trust: job.trust,
        actionView: 'jobs',
        actionLabel: language === 'mr' ? 'अर्ज करा' : language === 'hi' ? 'आवेदन करें' : 'View & Apply',
      });
    });

    // 2. Target Job Roles (Careers)
    TARGET_JOB_ROLES.forEach((role) => {
      const localizedTitle = language === 'mr' ? role.titleMr : language === 'hi' ? role.titleHi : role.title;
      items.push({
        id: `role_${role.id}`,
        category: 'jobs',
        title: localizedTitle,
        subtitle: `${role.sector} · NSQF L${role.nsqfLevel}`,
        district: role.hiringDistricts.join(', '),
        metaBadge: `NSQF Level ${role.nsqfLevel}`,
        benefitOrSalary: role.avgSalary,
        skills: role.requiredSkills.map((s) => s.name),
        actionView: 'assess',
        actionLabel: language === 'mr' ? 'कौशल्य चाचणी' : language === 'hi' ? 'कौशल टेस्ट' : 'Assess for Role',
      });
    });

    // 3. Accredited ITI Courses
    ACCREDITED_COURSES.forEach((course) => {
      items.push({
        id: course.id,
        category: 'courses',
        title: course.title,
        subtitle: `${course.provider} (${course.providerType})`,
        district: course.district,
        metaBadge: `NSQF L${course.nsqfLevel} · ${course.duration}`,
        benefitOrSalary: course.stipendAmount || 'Subsidy Available',
        skills: course.skillsTaught,
        trust: course.trust,
        actionView: 'courses',
        actionLabel: language === 'mr' ? 'अभ्यासक्रम पहा' : language === 'hi' ? 'कोर्स देखें' : 'View ITI Course',
      });
    });

    // 4. Government Schemes
    GOV_SCHEMES.forEach((scheme) => {
      const localizedTitle = language === 'mr' ? scheme.titleMr : language === 'hi' ? scheme.titleHi : scheme.title;
      items.push({
        id: scheme.id,
        category: 'schemes',
        title: localizedTitle,
        subtitle: scheme.department,
        metaBadge: `Age ${scheme.minAge}-${scheme.maxAge} Yrs`,
        benefitOrSalary: scheme.benefit,
        trust: scheme.trust,
        actionView: 'schemes',
        actionLabel: language === 'mr' ? 'पात्रता तपासा' : language === 'hi' ? 'पात्रता जांचें' : 'Check Eligibility',
      });
    });

    return items;
  }, [language]);

  // Autocomplete Suggestions Pool (Instant phrase & keyword suggestions)
  const autocompleteSuggestions: AutocompleteSuggestion[] = useMemo(() => {
    const suggestions: AutocompleteSuggestion[] = [];
    const seen = new Set<string>();

    const addSuggestion = (
      text: string, 
      category: AutocompleteSuggestion['category'], 
      categoryLabel: string, 
      targetView: string, 
      targetId?: string
    ) => {
      const lower = text.toLowerCase().trim();
      if (!lower || seen.has(lower)) return;
      seen.add(lower);

      suggestions.push({
        id: `sug_${lower.replace(/\s+/g, '_')}`,
        text,
        category,
        categoryLabel,
        targetView,
        targetId,
        matchScore: 0
      });
    };

    // Add Job titles
    JOB_LISTINGS.forEach((j) => {
      addSuggestion(j.title, 'jobs', 'Job Opportunity', 'jobs', j.id);
    });

    // Add Job roles
    TARGET_JOB_ROLES.forEach((r) => {
      const title = language === 'mr' ? r.titleMr : language === 'hi' ? r.titleHi : r.title;
      addSuggestion(title, 'jobs', 'Career Profile', 'assess', `role_${r.id}`);
      // Add individual skills
      r.requiredSkills.forEach((s) => {
        addSuggestion(s.name, 'skills', 'Verified Competency', 'assess', `role_${r.id}`);
      });
    });

    // Add Courses
    ACCREDITED_COURSES.forEach((c) => {
      addSuggestion(c.title, 'courses', 'Accredited Course', 'courses', c.id);
      c.skillsTaught.forEach((s) => {
        addSuggestion(s, 'skills', 'Curriculum Trade', 'courses', c.id);
      });
    });

    // Add Schemes
    GOV_SCHEMES.forEach((s) => {
      const title = language === 'mr' ? s.titleMr : language === 'hi' ? s.titleHi : s.title;
      addSuggestion(title, 'schemes', 'Government Scheme', 'schemes', s.id);
    });

    return suggestions;
  }, [language]);

  // Real-time matched suggestions as user types
  const realTimeSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return autocompleteSuggestions
      .map((sug) => {
        const textLower = sug.text.toLowerCase();
        let score = 0;

        // Prefix match receives highest priority
        if (textLower.startsWith(q)) {
          score = 100 - (textLower.length - q.length);
        } else if (textLower.includes(` ${q}`)) {
          score = 75;
        } else if (textLower.includes(q)) {
          score = 50;
        }

        return { ...sug, matchScore: score };
      })
      .filter((sug) => sug.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }, [autocompleteSuggestions, query]);

  // Compute inline ghost completion text (e.g., user types "elec", ghost is "tric Vehicle...")
  const inlineGhostText = useMemo(() => {
    const q = query.trim();
    if (!q || q.length < 2) return '';

    const firstPrefixMatch = autocompleteSuggestions.find((sug) => 
      sug.text.toLowerCase().startsWith(q.toLowerCase())
    );

    if (firstPrefixMatch && firstPrefixMatch.text.toLowerCase() !== q.toLowerCase()) {
      // Return completion preserving the original case of the match remainder
      return firstPrefixMatch.text.slice(q.length);
    }
    return '';
  }, [autocompleteSuggestions, query]);

  // Global hotkey: Ctrl+K / Cmd+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener to dismiss desktop popup and recent searches dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsRecentDropdownOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items matching query, category, and district
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allIndexedItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // District filter
      if (selectedDistrict !== 'all') {
        if (!item.district || !item.district.toLowerCase().includes(selectedDistrict.toLowerCase())) {
          return false;
        }
      }

      // If query is empty, show top items
      if (!q) return true;

      // Text match across title, subtitle, district, benefit, skills
      const titleMatch = item.title.toLowerCase().includes(q);
      const subtitleMatch = item.subtitle.toLowerCase().includes(q);
      const districtMatch = item.district ? item.district.toLowerCase().includes(q) : false;
      const benefitMatch = item.benefitOrSalary ? item.benefitOrSalary.toLowerCase().includes(q) : false;
      const skillMatch = item.skills ? item.skills.some((s) => s.toLowerCase().includes(q)) : false;

      return titleMatch || subtitleMatch || districtMatch || benefitMatch || skillMatch;
    });
  }, [allIndexedItems, query, selectedCategory, selectedDistrict]);

  // Screen reader notification on results change
  useEffect(() => {
    if (query.trim() && isOpen) {
      setScreenReaderAnnouncement(
        `${realTimeSuggestions.length} autocomplete suggestions and ${filteredResults.length} records found for ${query}. Use Up and Down arrow keys to review.`
      );
    }
  }, [query, realTimeSuggestions.length, filteredResults.length, isOpen]);

  // Counts for each category
  const categoryCounts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const countMatches = (cat: SearchCategory) => {
      return allIndexedItems.filter((item) => {
        if (cat !== 'all' && item.category !== cat) return false;
        if (selectedDistrict !== 'all' && item.district && !item.district.toLowerCase().includes(selectedDistrict.toLowerCase())) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          (item.district && item.district.toLowerCase().includes(q)) ||
          (item.benefitOrSalary && item.benefitOrSalary.toLowerCase().includes(q)) ||
          (item.skills && item.skills.some((s) => s.toLowerCase().includes(q)))
        );
      }).length;
    };

    return {
      all: countMatches('all'),
      jobs: countMatches('jobs'),
      courses: countMatches('courses'),
      schemes: countMatches('schemes'),
    };
  }, [allIndexedItems, query, selectedDistrict]);

  // Helper to compute live relative time
  const getRelativeTime = (timestamp: number): string => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Save query to sessionStorage for current session
  const saveSessionSearch = (
    text: string, 
    category: SessionSearchItem['category'] = 'all', 
    targetView?: string, 
    targetId?: string
  ) => {
    const cleaned = text.trim();
    if (!cleaned) return;

    const now = Date.now();
    const newItem: SessionSearchItem = {
      id: `sess_${now}_${Math.random().toString(36).substring(2, 6)}`,
      query: cleaned,
      timestamp: now,
      formattedTime: 'Just now',
      category,
      targetView,
      targetId
    };

    setSessionSearches((prev) => {
      const filtered = prev.filter((item) => item.query.toLowerCase() !== cleaned.toLowerCase());
      const updated = [newItem, ...filtered].slice(0, 8);
      try {
        sessionStorage.setItem('skillbridge_session_recent_searches', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const removeSessionSearchItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSessionSearches((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        sessionStorage.setItem('skillbridge_session_recent_searches', JSON.stringify(updated));
      } catch (err) {
        // ignore
      }
      return updated;
    });
    setScreenReaderAnnouncement('Search query removed from session history');
  };

  const clearAllSessionSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionSearches([]);
    try {
      sessionStorage.removeItem('skillbridge_session_recent_searches');
    } catch (err) {
      // ignore
    }
    setScreenReaderAnnouncement('All session search history cleared');
  };

  const handleSelectResult = (item: SearchResultItem) => {
    saveSessionSearch(item.title, item.category as SessionSearchItem['category'], item.actionView, item.id);
    onNavigate(item.actionView, item.id);
    setIsOpen(false);
    setIsRecentDropdownOpen(false);
    setQuery('');
    setActiveIndex(-1);
  };

  const handleSelectSuggestion = (sug: AutocompleteSuggestion) => {
    saveSessionSearch(sug.text, sug.category, sug.targetView, sug.targetId);
    if (sug.targetId) {
      onNavigate(sug.targetView, sug.targetId);
      setIsOpen(false);
      setIsRecentDropdownOpen(false);
      setQuery('');
    } else {
      setQuery(sug.text);
      setIsRecentDropdownOpen(false);
      inputRef.current?.focus();
    }
    setActiveIndex(-1);
  };

  const handleSelectSessionSearch = (item: SessionSearchItem) => {
    setQuery(item.query);
    if (item.targetView && item.targetId) {
      onNavigate(item.targetView, item.targetId);
      setIsOpen(false);
      setIsRecentDropdownOpen(false);
    } else {
      setIsRecentDropdownOpen(false);
      setIsOpen(true);
      inputRef.current?.focus();
    }
    saveSessionSearch(item.query, item.category, item.targetView, item.targetId);
  };

  // Check if browser context is secure for getUserMedia / Web Audio
  const checkSecureContext = (): boolean => {
    if (typeof window === 'undefined') return false;
    return Boolean(
      window.isSecureContext ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.protocol === 'https:'
    );
  };

  const triggerSearchAnimation = (durationMs = 1200) => {
    setIsSearching(true);
    if (voiceTimeoutRef.current) clearTimeout(voiceTimeoutRef.current);
    voiceTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, durationMs);
  };

  const handleToggleVoiceSearch = async () => {
    // 1. If currently listening, stop immediately
    if (isListening || mic.state === 'live') {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      mic.stop();
      setIsListening(false);
      setVoiceTranscriptFeedback(null);
      if (query.trim()) {
        triggerSearchAnimation(1400);
      }
      return;
    }

    // 2. Verify secure context before attempting mic access
    const isSecure = checkSecureContext();
    if (!isSecure) {
      setSecureNotice(t.voiceSearchSecureNotice || 'Microphone requires a secure context (HTTPS / localhost).');
      return;
    }

    setSecureNotice(null);

    // 3. User gesture initiates microphone stream for VoiceBeam
    try {
      await mic.start();
      setIsListening(true);
      setIsOpen(true);
      setVoiceTranscriptFeedback(t.voiceSearchListening || 'Listening...');

      // 4. Initialize SpeechRecognition if supported
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          setVoiceTranscriptFeedback(t.voiceSearchListening || 'Listening...');
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((res: any) => res[0].transcript)
            .join('');
          if (transcript) {
            setQuery(transcript);
            setVoiceTranscriptFeedback(`"${transcript}"`);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error/event:', e?.error);
          setIsListening(false);
          mic.stop();
          if (e?.error === 'not-allowed') {
            setSecureNotice('Microphone access was denied in browser permissions.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          mic.stop();
          setVoiceTranscriptFeedback(null);
          triggerSearchAnimation(1500);
        };

        recognition.start();
      } else {
        setVoiceTranscriptFeedback('Microphone active! Speak now.');
      }
    } catch (err: any) {
      console.warn('Microphone start error:', err);
      setIsListening(false);
      setSecureNotice(err?.message || 'Could not access microphone in this context.');
    }
  };

  // Helper for quick simulated voice query (allows testing voice search animation in all environments)
  const handleSimulatedVoiceQuery = (sampleText: string) => {
    setQuery(sampleText);
    setIsOpen(true);
    setVoiceTranscriptFeedback(`"${sampleText}"`);
    triggerSearchAnimation(1500);
    setTimeout(() => {
      setVoiceTranscriptFeedback(null);
      setSecureNotice(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (voiceTimeoutRef.current) clearTimeout(voiceTimeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Keyboard navigation within list + Tab inline autocomplete acceptance
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab or Right Arrow accepts inline ghost text completion
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && inlineGhostText) {
      // If cursor is at the end of input
      if (inputRef.current?.selectionStart === query.length) {
        e.preventDefault();
        setQuery(query + inlineGhostText);
        return;
      }
    }

    const totalNavigableCount = realTimeSuggestions.length + filteredResults.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
      setActiveIndex((prev) => (prev < totalNavigableCount - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalNavigableCount - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < realTimeSuggestions.length) {
        triggerSearchAnimation();
        handleSelectSuggestion(realTimeSuggestions[activeIndex]);
      } else if (activeIndex >= realTimeSuggestions.length) {
        const resultIdx = activeIndex - realTimeSuggestions.length;
        if (resultIdx >= 0 && resultIdx < filteredResults.length) {
          triggerSearchAnimation();
          handleSelectResult(filteredResults[resultIdx]);
        }
      } else if (inlineGhostText) {
        const fullQuery = query + inlineGhostText;
        setQuery(fullQuery);
        saveSessionSearch(fullQuery);
        triggerSearchAnimation();
      } else if (filteredResults.length > 0) {
        triggerSearchAnimation();
        handleSelectResult(filteredResults[0]);
      } else if (query.trim()) {
        triggerSearchAnimation();
        saveSessionSearch(query);
      }
    }
  };

  // Auto-scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIndex]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'jobs':
        return <Briefcase className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />;
      case 'courses':
        return <Award className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />;
      case 'schemes':
        return <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />;
      case 'skills':
        return <Tag className="w-4 h-4 text-purple-600 shrink-0" aria-hidden="true" />;
      default:
        return <Compass className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'jobs':
        return t.searchJobs;
      case 'courses':
        return t.searchCourses;
      case 'schemes':
        return t.searchSchemes;
      default:
        return 'Service';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {screenReaderAnnouncement}
      </div>

      {/* Desktop Search Bar Container with Inline Ghost Text */}
      <div className="relative flex items-center">
        <label htmlFor="header-global-search" className="sr-only">
          {t.headerSearchPlaceholder}
        </label>
        
        <div className="absolute left-3.5 pointer-events-none text-slate-400 flex items-center gap-1 z-10">
          <Search className="w-4 h-4 text-slate-500" aria-hidden="true" />
        </div>

        {/* Underlying Ghost Overlay: displays typed query + inline ghost autocomplete */}
        {query && inlineGhostText && (
          <div 
            aria-hidden="true"
            className="absolute inset-0 flex items-center pl-10 pr-24 py-2.5 text-sm pointer-events-none font-sans overflow-hidden whitespace-pre text-transparent"
          >
            <span>{query}</span>
            <span className="text-slate-400 font-medium select-none opacity-80">
              {inlineGhostText}
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          id="header-global-search"
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="header-search-results"
          aria-autocomplete="both"
          aria-activedescendant={activeIndex >= 0 ? `search-item-${activeIndex}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={t.headerSearchPlaceholder}
          className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/90 focus:bg-white text-slate-900 border border-slate-300 rounded-lg shadow-xs focus:ring-2 focus:ring-[#002664] focus:border-transparent transition-all outline-hidden placeholder:text-slate-400 relative z-0"
        />

        {/* Right side controls: Tab hint, Clear button, Session Recent Searches dropdown trigger, Hotkey */}
        <div className="absolute right-2.5 flex items-center gap-1.5 z-10">
          {inlineGhostText && (
            <span 
              onClick={() => {
                setQuery(query + inlineGhostText);
                inputRef.current?.focus();
              }}
              className="cursor-pointer hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-indigo-800 bg-indigo-50 border border-indigo-200 rounded"
              title="Click or press Tab to complete"
            >
              <span>Tab ⇥</span>
            </span>
          )}

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-600 focus-visible:outline-hidden cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Dedicated Session Recent Searches dropdown toggle button */}
          <button
            type="button"
            onClick={() => {
              setIsRecentDropdownOpen((prev) => !prev);
              if (!isRecentDropdownOpen) {
                setIsOpen(false);
              }
            }}
            className={`p-1 rounded-md transition-colors cursor-pointer relative ${
              isRecentDropdownOpen 
                ? 'bg-blue-100 text-[#002664]' 
                : 'text-slate-400 hover:text-[#002664] hover:bg-slate-100'
            }`}
            aria-expanded={isRecentDropdownOpen}
            aria-label={t.recentSearchesViewTrigger}
            title={`${t.recentSearchesDropdownTitle} (${sessionSearches.length})`}
          >
            <History className="w-3.5 h-3.5" />
            {sessionSearches.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
            )}
          </button>

          {!query && (
            <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200/60 rounded border border-slate-300/80" title={t.searchShortcutHint}>
              <Command className="w-2.5 h-2.5" />
              <span>K</span>
            </kbd>
          )}
        </div>
      </div>

      {/* DEDICATED RECENT SEARCHES DROPDOWN (Session-Persisted) */}
      {isRecentDropdownOpen && (
        <div 
          role="region"
          aria-label={t.recentSearchesDropdownTitle}
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Header */}
          <div className="p-3 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#002664]" />
              <span className="text-xs font-bold text-slate-800">
                {t.recentSearchesDropdownTitle}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.recentSearchesSessionBadge}</span>
            </div>
          </div>

          {/* Session Search Items List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-1">
            {sessionSearches.length > 0 ? (
              sessionSearches.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSessionSearch(item)}
                  className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50/60 transition-colors cursor-pointer text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-slate-100 group-hover:bg-white flex items-center justify-center shrink-0 border border-slate-200">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 group-hover:text-[#002664] truncate">
                        {item.query}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{getRelativeTime(item.timestamp)}</span>
                        <span>·</span>
                        <span className="capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={(e) => removeSessionSearchItem(e, item.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                      aria-label={`Remove ${item.query} from session`}
                      title="Remove from session"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center space-y-2">
                <History className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">{t.recentSearchesEmptySession}</p>
                <p className="text-[11px] text-slate-400">{t.recentSearchesEmptyPrompt}</p>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            {sessionSearches.length > 0 ? (
              <button
                type="button"
                onClick={clearAllSessionSearches}
                className="text-[11px] text-slate-500 hover:text-red-700 font-medium cursor-pointer"
              >
                {t.recentSearchesClearAll}
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => {
                setIsRecentDropdownOpen(false);
                setIsOpen(true);
                inputRef.current?.focus();
              }}
              className="text-[11px] font-bold text-[#002664] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Search all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Real-Time Autocomplete & Search Panel */}
      {isOpen && (
        <div 
          id="header-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Top Category Filter Tabs */}
          <div className="p-2.5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#002664] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {t.searchAll} ({categoryCounts.all})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('jobs')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'jobs'
                    ? 'bg-[#002664] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {t.searchJobs} ({categoryCounts.jobs})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('courses')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'courses'
                    ? 'bg-[#002664] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {t.searchCourses} ({categoryCounts.courses})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('schemes')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === 'schemes'
                    ? 'bg-[#002664] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {t.searchSchemes} ({categoryCounts.schemes})
              </button>
            </div>

            {/* Quick District Filter */}
            <div className="flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
              <MapPin className="w-3 h-3 text-slate-400" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[11px] text-slate-700 focus:outline-hidden"
                aria-label="Filter search results by district"
              >
                <option value="all">All Districts</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nashik">Nashik</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Chhatrapati Sambhaji Nagar">Chh. Sambhaji Nagar</option>
              </select>
            </div>
          </div>

          {/* Autocomplete Content Body */}
          <div 
            ref={resultsContainerRef}
            className="max-h-[420px] overflow-y-auto divide-y divide-slate-100 p-1"
          >
            {/* 1. Real-Time Intelligent Autocomplete Suggestions (As User Types) */}
            {query.trim().length > 0 && realTimeSuggestions.length > 0 && (
              <div className="p-2 space-y-1 bg-blue-50/30 rounded-lg mb-1">
                <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#002664]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {t.searchSuggestions}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    Press Tab or Click to select
                  </span>
                </div>

                <div className="space-y-0.5">
                  {realTimeSuggestions.map((sug, sIdx) => {
                    const isSelected = activeIndex === sIdx;
                    return (
                      <div
                        key={sug.id}
                        id={`search-item-${sIdx}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectSuggestion(sug)}
                        onMouseEnter={() => setActiveIndex(sIdx)}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer transition-colors text-xs ${
                          isSelected ? 'bg-blue-100/80 text-[#002664] font-bold' : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {getCategoryIcon(sug.category)}
                          <span className="truncate">
                            <HighlightMatch text={sug.text} query={query} />
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          <span className="text-[10px] text-slate-500 bg-white/80 px-1.5 py-0.5 rounded border border-slate-200">
                            {sug.categoryLabel}
                          </span>
                          <CornerDownLeft className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. When query is empty: Show Recent Searches & Trending Topics */}
            {!query.trim() && (
              <div className="p-3 space-y-4">
                {sessionSearches.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <span className="flex items-center gap-1.5 text-[#002664]">
                        <History className="w-3.5 h-3.5 text-[#002664]" />
                        <span>{t.recentSearchesDropdownTitle}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Session Active" />
                      </span>
                      <button
                        type="button"
                        onClick={clearAllSessionSearches}
                        className="text-slate-400 hover:text-slate-700 font-normal lowercase cursor-pointer"
                      >
                        {t.recentSearchesClearAll}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {sessionSearches.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSessionSearch(item)}
                          className="group inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-[#002664] rounded-md cursor-pointer transition-colors"
                        >
                          <History className="w-3 h-3 text-slate-400 group-hover:text-[#002664]" />
                          <span>{item.query}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({getRelativeTime(item.timestamp)})</span>
                          <button
                            type="button"
                            onClick={(e) => removeSessionSearchItem(e, item.id)}
                            className="text-slate-400 hover:text-red-600 p-0.5 rounded cursor-pointer"
                            aria-label={`Remove ${item.query} from session`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Keywords */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    {t.searchPopular}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {popularKeywords.map((kw) => (
                      <button
                        key={kw.label}
                        type="button"
                        onClick={() => {
                          setQuery(kw.query);
                          setSelectedCategory(kw.cat as SearchCategory);
                          saveSessionSearch(kw.label, kw.cat as SessionSearchItem['category']);
                        }}
                        className="text-left p-2 rounded-lg border border-slate-200 hover:border-[#002664] hover:bg-blue-50/40 transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-800">{kw.label}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Filtered Matching Items List (Jobs, Courses, Schemes) */}
            {filteredResults.length > 0 ? (
              filteredResults.map((item, idx) => {
                const navIndex = realTimeSuggestions.length + idx;
                const isActive = activeIndex === navIndex;

                return (
                  <div
                    key={item.id}
                    id={`search-item-${navIndex}`}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setActiveIndex(navIndex)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors text-left flex items-start justify-between gap-3 ${
                      isActive ? 'bg-blue-50/70 border-l-4 border-[#002664]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {getCategoryLabel(item.category)}
                        </span>
                        {item.district && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              {item.district}
                            </span>
                          </>
                        )}
                        {item.metaBadge && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-[11px] text-indigo-700 font-semibold truncate">
                              {item.metaBadge}
                            </span>
                          </>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 leading-snug truncate">
                        <HighlightMatch text={item.title} query={query} />
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-1">
                        <HighlightMatch text={item.subtitle} query={query} />
                      </p>

                      {item.benefitOrSalary && (
                        <p className="text-xs font-semibold text-emerald-700 font-mono mt-0.5 line-clamp-1">
                          ★ {item.benefitOrSalary}
                        </p>
                      )}

                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                          <span>Skills:</span>
                          {item.skills.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-slate-700 font-medium">
                              <HighlightMatch text={s} query={query} />
                              {i < Math.min(item.skills!.length - 1, 2) ? ' ·' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex flex-col items-end justify-center self-center pl-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#002664] bg-blue-50 rounded-md border border-blue-200 hover:bg-[#002664] hover:text-white transition-colors">
                        <span>{item.actionLabel}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              query.trim() && (
                <div className="p-8 text-center space-y-3">
                  <Search className="w-8 h-8 text-slate-300 mx-auto" aria-hidden="true" />
                  <p className="text-xs text-slate-600 font-medium">
                    {t.searchNoResults}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    <span className="text-xs text-slate-400 block w-full mb-1">Suggested terms:</span>
                    {popularKeywords.map((kw) => (
                      <button
                        key={kw.label}
                        type="button"
                        onClick={() => {
                          setQuery(kw.query);
                          setSelectedCategory(kw.cat as SearchCategory);
                        }}
                        className="px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                      >
                        {kw.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Bottom Task-First Discovery Ribbon */}
          <div className="px-4 py-2.5 bg-slate-100/80 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Service NSW Task-First Real-Time Intelligence
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('assess');
                }}
                className="text-[#002664] font-bold hover:underline"
              >
                {t.taskAssessTitle} →
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenLocator();
                }}
                className="text-[#002664] font-bold hover:underline"
              >
                {t.findCenter} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
