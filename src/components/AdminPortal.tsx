import React, { useState, useRef } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Users, 
  TrendingUp, 
  Award, 
  FileText, 
  CheckCircle2, 
  Download, 
  Sparkles,
  ShieldCheck,
  Printer,
  Building2,
  GraduationCap,
  Layers,
  Mic,
  MicOff,
  Volume2,
  Search,
  ArrowRight,
  Radio
} from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { ThinkingOrb } from 'thinking-orbs';
import { VoiceBeam, useMicrophone } from 'voice-glow';
import { Language, DistrictMetric } from '../types';
import { translations } from '../translations';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';
import { TrustBadge } from './TrustBadge';
import { AnalyticsSummaryDashboard } from './AnalyticsSummaryDashboard';
import { DistrictDrilldownModal } from './DistrictDrilldownModal';
import { ResumeAnalyzerModal } from './ResumeAnalyzerModal';

interface AdminPortalProps {
  language: Language;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ language }) => {
  const t = translations[language];
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('pune');
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [policyBrief, setPolicyBrief] = useState<string | null>(null);
  const [drilldownDistrict, setDrilldownDistrict] = useState<DistrictMetric | null>(null);
  const [resumeAnalyzerOpen, setResumeAnalyzerOpen] = useState(false);

  // Voice intelligence state
  const mic = useMicrophone();
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceProcessing, setVoiceProcessing] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const [orbState, setOrbState] = useState<'working' | 'searching' | 'solving' | 'listening' | 'connecting' | 'weaving' | 'composing' | 'breathing' | 'shaping'>('breathing');

  const selectedDistrict = MAHARASHTRA_DISTRICTS.find((d) => d.id === selectedDistrictId) || MAHARASHTRA_DISTRICTS[0];

  const handleGenerateBrief = () => {
    setGeneratingBrief(true);
    setTimeout(() => {
      setGeneratingBrief(false);
      setPolicyBrief(
        `EXECUTIVE INTERVENTION DIRECTIVE: ${selectedDistrict.name.toUpperCase()} DISTRICT
Date of Synthesis: 27 September 2026 | Authority: Directorate of Vocational Education & Training (DVET)

1. INDUSTRIAL SKILL DEFICIT:
Demand for '${selectedDistrict.topDemandedSkills[0]}' and '${selectedDistrict.topDemandedSkills[1]}' exceeds accredited supply by 38% in the local MIDC cluster.

2. ALLOCATION RECOMMENDATION:
- Sanction ₹4.2 Crore modernization grant for ITI Centers in ${selectedDistrict.name} to establish Center of Excellence lab bays.
- Direct MSBTE to fast-track approval for 60-seat dual-apprenticeship batches under MAPS with 75% state stipend reimbursement.
- Expand affirmative action mobilization targeting 40% women enrollment in precision tech trades.`
      );
    }, 1400);
  };

  // Voice query processing handler
  const handleExecuteVoiceQuery = (queryText: string) => {
    if (!queryText.trim()) return;
    setVoiceProcessing(true);
    setOrbState('searching');

    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let matchedDistrict = MAHARASHTRA_DISTRICTS.find(
        (d) =>
          lower.includes(d.name.toLowerCase()) ||
          lower.includes(d.id) ||
          (d.nameMr && lower.includes(d.nameMr)) ||
          (d.nameHi && lower.includes(d.nameHi))
      );

      if (!matchedDistrict) {
        if (lower.includes('automobile') || lower.includes('ev') || lower.includes('tech')) {
          matchedDistrict = MAHARASHTRA_DISTRICTS.find((d) => d.id === 'pune');
        } else if (lower.includes('cnc') || lower.includes('pharma')) {
          matchedDistrict = MAHARASHTRA_DISTRICTS.find((d) => d.id === 'nashik');
        } else if (lower.includes('metal') || lower.includes('power')) {
          matchedDistrict = MAHARASHTRA_DISTRICTS.find((d) => d.id === 'nagpur');
        } else {
          matchedDistrict = selectedDistrict;
        }
      }

      if (matchedDistrict) {
        setSelectedDistrictId(matchedDistrict.id);
        setVoiceFeedback(
          `Voice Query Matched: Displaying ITI demands and placement analytics for ${matchedDistrict.name} District (${matchedDistrict.itiCount} accredited ITI centers, ${matchedDistrict.apprenticeshipOpenings.toLocaleString('en-IN')} MAPS vacancies).`
        );
        setOrbState('solving');
      } else {
        setVoiceFeedback(`Analyzed query: "${queryText}". Showing active state analytics.`);
        setOrbState('composing');
      }

      setVoiceProcessing(false);
    }, 900);
  };

  // State totals
  const totalLearners = MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + d.activeLearners, 0);
  const totalOpenings = MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + d.apprenticeshipOpenings, 0);
  const avgPlacement = (
    MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + d.placementRate, 0) / MAHARASHTRA_DISTRICTS.length
  ).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 1. Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#002664]">
            {t.roleAdmin}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {t.adminTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.adminSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setResumeAnalyzerOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            title="Launch AI Candidate Resume & ATS Matcher"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>AI Resume &amp; Skill Analyzer</span>
          </button>

          <button
            type="button"
            onClick={() => setDrilldownDistrict(selectedDistrict)}
            className="px-4 py-2 bg-[#002664] hover:bg-[#00173D] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            title="Open district ITI demands and student placement roster"
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>District ITI &amp; Placement Drill-Down</span>
          </button>

          <button
            type="button"
            onClick={() => setDrilldownDistrict(selectedDistrict)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Export state and district reports as official PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Official PDF Dossier</span>
          </button>

          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            Live MSSDS State Intelligence
          </span>
        </div>
      </div>

      {/* 2. Government Voice Intelligence Assistant & Natural Language Query (Powered by voice-glow & thinking-orbs) */}
      <BorderBeam size="md" colorVariant="ocean" strength={0.7} theme="light">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002664] flex items-center justify-center font-bold">
                <ThinkingOrb state={orbState} size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                    State Vocational Voice Intelligence &amp; Regional Query
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#002664] border border-blue-200">
                    VoiceBeam + ThinkingOrbs
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Speak or type to query 36 districts, trade demands, MAPS vacancies, or auto-launch district ITI drill-downs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                mic.state === 'live' 
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                <Radio className="w-3.5 h-3.5" />
                <span>{mic.state === 'live' ? 'Microphone Active' : 'Microphone Ready'}</span>
              </span>
            </div>
          </div>

          {/* Sound-reactive VoiceBeam Bar */}
          <div className="space-y-3">
            <VoiceBeam 
              stream={mic.stream} 
              processing={voiceProcessing} 
              colorVariant="colorful"
              theme="light"
            >
              <div className="relative flex items-center bg-slate-50 border border-slate-300 rounded-xl p-1.5 shadow-2xs">
                <Search className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={voiceQuery}
                  onChange={(e) => setVoiceQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleExecuteVoiceQuery(voiceQuery);
                  }}
                  placeholder="Ask in Marathi, Hindi, or English (e.g., 'Show Pune ITIs & placements', 'Nashik CNC demand', 'Nagpur apprenticeships')..."
                  className="w-full px-3 py-2 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
                />
                
                <div className="flex items-center gap-2 shrink-0 pr-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (mic.state === 'live') {
                        mic.stop();
                        setOrbState('breathing');
                      } else {
                        mic.start().then(() => {
                          setOrbState('listening');
                        }).catch(() => {
                          setOrbState('breathing');
                        });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      mic.state === 'live'
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-[#002664] hover:bg-[#00173D] text-white'
                    }`}
                    title={mic.state === 'live' ? 'Stop Microphone' : 'Listen via Microphone'}
                  >
                    {mic.state === 'live' ? (
                      <>
                        <MicOff className="w-3.5 h-3.5 text-rose-200" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-amber-400" />
                        <span>Listen</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExecuteVoiceQuery(voiceQuery)}
                    disabled={voiceProcessing || !voiceQuery.trim()}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Query
                  </button>
                </div>
              </div>
            </VoiceBeam>

            {/* Quick Query Voice Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-medium">Quick Prompts:</span>
              {[
                { label: 'Pune ITI Demands & Placements', districtId: 'pune' },
                { label: 'Nashik Precision Tooling', districtId: 'nashik' },
                { label: 'Nagpur Heavy Fabrication', districtId: 'nagpur' },
                { label: 'Chhatrapati Sambhajinagar Auto Cluster', districtId: 'sambhaji_nagar' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setVoiceQuery(chip.label);
                    handleExecuteVoiceQuery(chip.label);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#002664] rounded-md font-semibold border border-slate-200 transition-colors cursor-pointer"
                >
                  🎙️ {chip.label}
                </button>
              ))}
            </div>

            {/* Voice feedback response banner */}
            {voiceFeedback && (
              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#002664] animate-in fade-in duration-150">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{voiceFeedback}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDrilldownDistrict(selectedDistrict)}
                  className="px-3 py-1 bg-[#002664] text-white hover:bg-[#00173D] text-[11px] font-bold rounded-lg shadow-2xs shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open {selectedDistrict.name} Drill-Down</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </BorderBeam>

      {/* 3. State-Wide Performance Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Active Enrolled Trainees
          </span>
          <p className="text-2xl font-extrabold text-[#002664] mt-1 font-mono">
            {totalLearners.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">+18% YoY vs 2025</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Average State Placement Rate
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1 font-mono">
            {avgPlacement}%
          </p>
          <span className="text-[11px] text-slate-500">Across 36 Districts</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Apprenticeship Openings
          </span>
          <p className="text-2xl font-extrabold text-[#002664] mt-1 font-mono">
            {totalOpenings.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-indigo-700 font-semibold">Under MAPS &amp; NAPS</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Women Representation Ratio
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">
            36.8%
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">Exceeding 33% target</span>
        </div>
      </div>

      {/* 3. Analytics Summary & Labor Intelligence Dashboard (D3.js Powered) */}
      <AnalyticsSummaryDashboard
        language={language}
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={setSelectedDistrictId}
        onDrilldown={(d) => setDrilldownDistrict(d)}
      />

      {/* 4. District Selector & Deep Dive */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002664] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                District-Level Labor &amp; Skill Demand Matrix
              </h2>
              <p className="text-xs text-slate-600">
                Select any district to inspect industrial skill demand, ITI capacity, and local employment linkages.
              </p>
            </div>
          </div>

          {/* District selector buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDistrictId(d.id);
                  setPolicyBrief(null);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDistrictId === d.id
                    ? 'bg-[#002664] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected District Detail Card */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {selectedDistrict.division} Division
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'mr' ? selectedDistrict.nameMr : language === 'hi' ? selectedDistrict.nameHi : selectedDistrict.name} District Profile
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setDrilldownDistrict(selectedDistrict)}
                className="px-3.5 py-1.5 bg-[#002664] hover:bg-[#00173D] text-white text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Inspect accredited ITI trades and individual verified placement roster"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Inspect ITIs &amp; Placements</span>
              </button>

              <button
                type="button"
                onClick={() => setDrilldownDistrict(selectedDistrict)}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export official printable government district dossier"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Export District Dossier (PDF)</span>
              </button>

              <TrustBadge trust={selectedDistrict.trust} language={language} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Trainees</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
                {selectedDistrict.activeLearners.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Placement Rate</span>
              <span className="text-xl font-bold text-emerald-700 font-mono mt-1 block">
                {selectedDistrict.placementRate}%
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Accredited ITIs</span>
              <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
                {selectedDistrict.itiCount} Centers
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">MAPS Vacancies</span>
              <span className="text-xl font-bold text-[#002664] font-mono mt-1 block">
                {selectedDistrict.apprenticeshipOpenings.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Top Demanded Skills & Growth Sectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
              <span className="font-bold text-slate-900 uppercase tracking-wider block">
                Top Demanded Skills (Industry Survey 2026):
              </span>
              <div className="space-y-2">
                {selectedDistrict.topDemandedSkills.map((skill, idx) => (
                  <div key={skill} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-800">{idx + 1}. {skill}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      High Growth
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
              <span className="font-bold text-slate-900 uppercase tracking-wider block">
                Leading Industrial Sectors:
              </span>
              <div className="space-y-2">
                {selectedDistrict.topSectors.map((sector) => (
                  <div key={sector} className="p-2 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between">
                    <span className="font-semibold text-[#002664]">{sector}</span>
                    <span className="text-[10px] text-slate-500 font-mono">MIDC Cluster</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Policy Brief Generator */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Generate administrative policy briefs for District Skill Committee review.
            </span>

            <button
              type="button"
              onClick={handleGenerateBrief}
              disabled={generatingBrief}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-xl transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{generatingBrief ? 'Generating Policy Brief...' : 'Synthesize District Policy Directive'}</span>
            </button>
          </div>

          {generatingBrief && (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4 animate-in fade-in duration-150">
              <ThinkingOrb state="weaving" size={64} />
              <div>
                <h4 className="text-sm font-bold text-[#002664]">Synthesizing District Policy Directive...</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Cross-referencing MIDC industrial skill deficit for {selectedDistrict.name} with DVET accredited ITI capacity and MAPS state stipend allocations.
                </p>
              </div>
            </div>
          )}

          {policyBrief && (
            <BorderBeam size="md" colorVariant="sunset" strength={0.8} theme="dark">
              <div className="p-6 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs space-y-4 border border-slate-800 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-bold text-amber-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    CONFIDENTIAL / STATE PLANNING DIRECTIVE
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print Directive (PDF)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Directive exported to official dispatch docket.')}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-[11px] font-bold text-white cursor-pointer"
                    >
                      Export Docket
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-line leading-relaxed text-slate-300">
                  {policyBrief}
                </p>
              </div>
            </BorderBeam>
          )}
        </div>
      </div>

      {/* 5. District Drilldown Modal (ITI Skill Demand Breakdown, Student Placements Roster, and Printable PDF Dossier) */}
      {drilldownDistrict && (
        <DistrictDrilldownModal
          district={drilldownDistrict}
          language={language}
          onClose={() => setDrilldownDistrict(null)}
          onSelectOtherDistrict={(newDistrictId) => {
            const nextDistrict = MAHARASHTRA_DISTRICTS.find((d) => d.id === newDistrictId);
            if (nextDistrict) {
              setDrilldownDistrict(nextDistrict);
              setSelectedDistrictId(nextDistrict.id);
            }
          }}
        />
      )}

      {/* 6. AI Resume & Candidate Skill Analyzer Modal (Gemini 3.8 Flash ATS Evaluator, Skill Extraction & Course Recommendations) */}
      {resumeAnalyzerOpen && (
        <ResumeAnalyzerModal
          language={language}
          onClose={() => setResumeAnalyzerOpen(false)}
        />
      )}
    </div>
  );
};
