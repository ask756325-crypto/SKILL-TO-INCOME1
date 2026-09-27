import React, { useState, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  TrendingUp,
  FileText,
  BadgeCheck,
  ChevronRight,
  Layers,
  ArrowUpRight,
  Mic,
  MicOff
} from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { ThinkingOrb } from 'thinking-orbs';
import { VoiceBeam, useMicrophone } from 'voice-glow';
import { Language, DistrictMetric, DistrictItiSkillDemand, StudentPlacementRecord } from '../types';
import { translations } from '../translations';
import { DISTRICT_ITI_DEMANDS, STUDENT_PLACEMENT_ROSTER } from '../data/drilldownData';

interface DistrictDrilldownModalProps {
  district: DistrictMetric;
  language: Language;
  onClose: () => void;
  onSelectOtherDistrict?: (districtId: string) => void;
}

export const DistrictDrilldownModal: React.FC<DistrictDrilldownModalProps> = ({
  district,
  language,
  onClose,
  onSelectOtherDistrict
}) => {
  const t = translations[language];

  // Active sub-tab inside the drilldown
  const [activeTab, setActiveTab] = useState<'itis' | 'placements' | 'pdf_preview'>('itis');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItiFilter, setSelectedItiFilter] = useState<string>('all');
  const [selectedPlacement, setSelectedPlacement] = useState<StudentPlacementRecord | null>(null);

  // Microphone for voice search in candidate roster
  const mic = useMicrophone();

  // ITI demand list for this district
  const itisForDistrict = useMemo(() => {
    return DISTRICT_ITI_DEMANDS[district.id] || DISTRICT_ITI_DEMANDS['pune'];
  }, [district.id]);

  // Placements roster for this district
  const placementsForDistrict = useMemo(() => {
    let list = STUDENT_PLACEMENT_ROSTER.filter((p) => p.districtId === district.id);
    if (list.length === 0) {
      // Fallback to pune if none for minor district
      list = STUDENT_PLACEMENT_ROSTER.filter((p) => p.districtId === 'pune');
    }

    if (selectedItiFilter !== 'all') {
      list = list.filter((p) => p.itiName.toLowerCase().includes(selectedItiFilter.toLowerCase()));
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.studentName.toLowerCase().includes(q) ||
          p.trade.toLowerCase().includes(q) ||
          p.placedCompany.toLowerCase().includes(q) ||
          p.studentCode.toLowerCase().includes(q)
      );
    }

    return list;
  }, [district.id, selectedItiFilter, searchTerm]);

  // Export / Print PDF Handler
  const handlePrintPdf = () => {
    window.print();
  };

  const districtNameDisplay = language === 'mr' ? district.nameMr : language === 'hi' ? district.nameHi : district.name;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drilldown-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* 1. Modal Top Bar (Government Header) */}
        <div className="bg-[#002664] text-white px-5 sm:px-7 py-4.5 flex items-center justify-between gap-4 border-b border-blue-950/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200 bg-white/10 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <ThinkingOrb state="connecting" size={20} />
                  <span>DVET &amp; MSSDS Regional Labor Roster</span>
                </span>
                <span className="text-xs text-amber-300 font-semibold hidden sm:inline">
                  Verified Data Return: August 2026
                </span>
              </div>
              <h2 id="drilldown-title" className="text-lg sm:text-xl font-black tracking-tight text-white mt-0.5">
                {districtNameDisplay} District — ITI Skill Demand &amp; Placements Drill-Down
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
              title="Export official district dossier as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF Dossier</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Key Metrics Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-7 py-3 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Division</span>
            <span className="font-extrabold text-slate-800 font-mono text-sm">{district.division}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Trainees</span>
            <span className="font-extrabold text-[#002664] font-mono text-sm">{district.activeLearners.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Placement Rate</span>
            <span className="font-extrabold text-emerald-700 font-mono text-sm">{district.placementRate}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Seat Utilization</span>
            <span className="font-extrabold text-amber-700 font-mono text-sm">{district.capacityUtilizationRate || 92}%</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">MAPS Openings</span>
            <span className="font-extrabold text-blue-700 font-mono text-sm">{district.apprenticeshipOpenings.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* 3. Sub-Tab Switcher */}
        <div className="px-5 sm:px-7 pt-3 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('itis')}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'itis'
                  ? 'border-[#002664] text-[#002664]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Accredited ITIs &amp; Trade Demand ({itisForDistrict.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('placements')}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'placements'
                  ? 'border-[#002664] text-[#002664]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Placement Roster ({placementsForDistrict.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pdf_preview')}
              className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pdf_preview'
                  ? 'border-[#002664] text-[#002664]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Dossier PDF Format</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 font-medium hidden md:block">
            Accredited by DVET Maharashtra &amp; NCVT
          </div>
        </div>

        {/* 4. Tab Contents (Scrollable body) */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ITI SKILL DEMAND BREAKDOWNS */}
          {activeTab === 'itis' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Accredited Vocational Training Centers in {district.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inspection of intake capacity, trade-level demand index, live industrial vacancies, and modern lab bays.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {itisForDistrict.length} Centers Audited for FY 2026
                </span>
              </div>

              <div className="space-y-5">
                {itisForDistrict.map((iti, idx) => {
                  const itiCard = (
                    <div 
                      key={iti.id}
                      className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                              iti.itiType === 'State Center of Excellence'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-blue-50 text-[#002664] border border-blue-200'
                            }`}>
                              {iti.itiType}
                            </span>
                            <span className="text-xs text-slate-400">·</span>
                            <span className="text-xs text-slate-500 font-medium">{iti.address}</span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 mt-1">
                            {iti.itiName}
                          </h4>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-sans">Total Intake</span>
                            <strong className="text-slate-800">{iti.totalIntake} Seats</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-sans">Enrolled</span>
                            <strong className="text-emerald-700">{iti.enrolledStudents} Trainees</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-sans">Seat Util.</span>
                            <strong className="text-[#002664]">{iti.capacityUtilization}%</strong>
                          </div>
                        </div>
                      </div>

                      {/* Sanctioned Lab Upgrades */}
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/80 text-xs text-slate-700 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#002664]">Infrastructure Modernization:</strong>{' '}
                          <span>{iti.labUpgrades}</span>
                        </div>
                      </div>

                      {/* Trades & Competencies Breakdown Table */}
                      <div className="overflow-x-auto border border-slate-200 rounded-lg">
                        <table className="w-full text-left text-xs divide-y divide-slate-200">
                          <thead className="bg-slate-50 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                            <tr>
                              <th scope="col" className="px-3.5 py-2.5">Trade / Skill Specialization</th>
                              <th scope="col" className="px-3 py-2.5 text-center">NSQF</th>
                              <th scope="col" className="px-3 py-2.5 text-right">Intake</th>
                              <th scope="col" className="px-3 py-2.5 text-center">Demand Index</th>
                              <th scope="col" className="px-3 py-2.5 text-right">MAPS Vacancies</th>
                              <th scope="col" className="px-3.5 py-2.5">Top Hiring Industry Partners</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {iti.trades.map((trade, tIdx) => (
                              <tr key={tIdx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-3.5 py-2.5 font-bold text-slate-900">
                                  <div>{trade.tradeName}</div>
                                  {trade.tradeNameMr && (
                                    <div className="text-[10px] font-normal text-slate-500">{trade.tradeNameMr}</div>
                                  )}
                                </td>
                                <td className="px-3 py-2.5 text-center font-mono">
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                                    L{trade.nsqfLevel}
                                  </span>
                                </td>
                                <td className="px-3 py-2.5 text-right font-mono text-slate-700">
                                  {trade.annualIntake}
                                </td>
                                <td className="px-3 py-2.5 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <div className="w-14 h-2 bg-slate-100 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-emerald-600 rounded-full" 
                                        style={{ width: `${trade.demandIndex}%` }}
                                      />
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-800">{trade.demandIndex}%</span>
                                  </div>
                                </td>
                                <td className="px-3 py-2.5 text-right font-mono font-bold text-blue-700">
                                  {trade.industryOpenings.toLocaleString('en-IN')}
                                </td>
                                <td className="px-3.5 py-2.5 text-slate-600 text-[11px]">
                                  {trade.topHiringPartners.join(', ')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                  return idx === 0 ? (
                    <BorderBeam key={iti.id} size="md" colorVariant="ocean" strength={0.7} theme="light">
                      {itiCard}
                    </BorderBeam>
                  ) : itiCard;
                })}
              </div>
            </div>
          )}

          {/* TAB 2: INDIVIDUAL STUDENT PLACEMENT DATA */}
          {activeTab === 'placements' && (
            <div className="space-y-5">
              {/* Filter and Search Bar with VoiceBeam */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="w-full sm:w-80">
                  <VoiceBeam stream={mic.stream} type="pill" colorVariant="candy" theme="light">
                    <div className="relative flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1">
                      <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Voice or text search candidate, trade..."
                        className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={mic.state === 'live' ? mic.stop : mic.start}
                        className={`p-1 rounded-md transition-colors cursor-pointer ${
                          mic.state === 'live' ? 'text-rose-600 bg-rose-50 animate-pulse' : 'text-slate-500 hover:text-slate-800'
                        }`}
                        title={mic.state === 'live' ? 'Stop listening' : 'Voice search candidate'}
                      >
                        {mic.state === 'live' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </VoiceBeam>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-slate-500 font-medium">Filter by ITI:</span>
                  <select
                    value={selectedItiFilter}
                    onChange={(e) => setSelectedItiFilter(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="all">All District ITIs</option>
                    {itisForDistrict.map((i) => (
                      <option key={i.id} value={i.itiName.split(' ')[1] || i.itiName}>
                        {i.itiName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Verified Placements Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs divide-y divide-slate-200">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th scope="col" className="px-4 py-3">Candidate / Registration</th>
                      <th scope="col" className="px-4 py-3">ITI Center</th>
                      <th scope="col" className="px-4 py-3">Trade / NSQF</th>
                      <th scope="col" className="px-4 py-3">Hiring Employer</th>
                      <th scope="col" className="px-4 py-3 text-right">Stipend / Salary</th>
                      <th scope="col" className="px-4 py-3">Contract Type</th>
                      <th scope="col" className="px-4 py-3 text-center">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 font-medium">
                    {placementsForDistrict.map((record) => (
                      <tr 
                        key={record.id}
                        onClick={() => setSelectedPlacement(record)}
                        className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{record.studentName}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{record.studentCode}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{record.itiName}</td>
                        <td className="px-4 py-3">
                          <div className="text-slate-900 font-semibold">{record.trade}</div>
                          <div className="text-[10px] text-slate-400 font-mono">NSQF Level {record.nsqfLevel}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-[#002664]">{record.placedCompany}</div>
                          <div className="text-[10px] text-slate-500">{record.roleTitle}</div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                          ₹{record.packageStipendMonthly.toLocaleString('en-IN')}/mo
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            record.placementType === 'Full-Time Technologist'
                              ? 'bg-blue-50 text-[#002664]'
                              : 'bg-amber-50 text-amber-900'
                          }`}>
                            {record.placementType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Placement Details Drawer if selected */}
              {selectedPlacement && (
                <BorderBeam size="sm" colorVariant="sunset" strength={0.7} theme="light">
                  <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{selectedPlacement.studentName}</span>
                        <span className="text-xs text-slate-500 font-mono">({selectedPlacement.studentCode})</span>
                      </div>
                      <p className="text-slate-600">
                        Successfully placed at <strong className="text-[#002664]">{selectedPlacement.placedCompany}</strong> as <strong>{selectedPlacement.roleTitle}</strong> on {selectedPlacement.placementDate}.
                      </p>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-0.5">
                        <span>Verification Audit Token: <strong className="font-mono text-slate-800">{selectedPlacement.verificationToken}</strong></span>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold">Subsidized under MAPS State Policy</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPlacement(null)}
                      className="px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-300 font-bold shrink-0 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </BorderBeam>
              )}
            </div>
          )}

          {/* TAB 3: OFFICIAL PRINTABLE PDF DOSSIER PREVIEW */}
          {activeTab === 'pdf_preview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    This dossier is ready to print or save as an official Government of Maharashtra PDF document.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePrintPdf}
                  className="px-4 py-2 bg-[#002664] hover:bg-[#00173D] text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>

              {/* Printable Document Sheet (Uses .print-area for clean export) */}
              <div className="print-area p-8 bg-white border border-slate-300 rounded-xl shadow-sm text-slate-900 space-y-6 font-serif">
                {/* Official Letterhead */}
                <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-700 font-sans">
                    Government of Maharashtra · कौशल्य, रोजगार, उद्योजकता व नाविन्यता विभाग
                  </div>
                  <h1 className="text-xl font-black uppercase tracking-tight text-slate-950 font-sans">
                    Directorate of Vocational Education &amp; Training (DVET)
                  </h1>
                  <p className="text-xs text-slate-600 font-sans">
                    District Labor Intelligence, ITI Capacity Utilization &amp; Placement Dossier — {districtNameDisplay} District
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono pt-1">
                    Document Ref: GOM-DVET-DSDP-2026-{district.id.toUpperCase()} · Classification: Official Public Record
                  </div>
                </div>

                {/* District Executive Summary Matrix */}
                <div className="grid grid-cols-4 gap-4 text-xs font-sans border border-slate-300 p-4 rounded-lg bg-slate-50">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">District &amp; Division</span>
                    <strong>{district.name} ({district.division} Div)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Total Active Trainees</span>
                    <strong>{district.activeLearners.toLocaleString('en-IN')} Enrolled</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">Overall Placement Rate</span>
                    <strong className="text-emerald-800">{district.placementRate}%</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block">MAPS Apprenticeship Demand</span>
                    <strong>{district.apprenticeshipOpenings.toLocaleString('en-IN')} Openings</strong>
                  </div>
                </div>

                {/* Section 1: ITI Capacity Breakdown */}
                <div className="space-y-2 font-sans">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    1. Accredited Industrial Training Institutes (ITI) &amp; Trade Demand
                  </h3>
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-slate-100 text-[10px] uppercase font-bold text-slate-800">
                      <tr>
                        <th className="p-2 border-b border-slate-300">Institute Name</th>
                        <th className="p-2 border-b border-slate-300">Intake / Enrolled</th>
                        <th className="p-2 border-b border-slate-300">Key Trade Specialization</th>
                        <th className="p-2 border-b border-slate-300">MAPS Vacancies</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px]">
                      {itisForDistrict.map((i) => (
                        <tr key={i.id}>
                          <td className="p-2 font-bold">{i.itiName}</td>
                          <td className="p-2 font-mono">{i.totalIntake} / {i.enrolledStudents} ({i.capacityUtilization}%)</td>
                          <td className="p-2">{i.trades.map((t) => t.tradeName).join(', ')}</td>
                          <td className="p-2 font-mono font-bold">{i.trades.reduce((sum, t) => sum + t.industryOpenings, 0)} Openings</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Section 2: Recent Verified Placements Extract */}
                <div className="space-y-2 font-sans">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                    2. Sample Verified Candidate Placement Records (MAPS &amp; Technologist Roster)
                  </h3>
                  <table className="w-full text-left text-xs border border-slate-300">
                    <thead className="bg-slate-100 text-[10px] uppercase font-bold text-slate-800">
                      <tr>
                        <th className="p-2 border-b border-slate-300">Candidate Name</th>
                        <th className="p-2 border-b border-slate-300">Trade</th>
                        <th className="p-2 border-b border-slate-300">Hiring Employer</th>
                        <th className="p-2 border-b border-slate-300 text-right">Stipend/Package</th>
                        <th className="p-2 border-b border-slate-300 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px]">
                      {placementsForDistrict.map((r) => (
                        <tr key={r.id}>
                          <td className="p-2 font-bold">{r.studentName}</td>
                          <td className="p-2">{r.trade} (L{r.nsqfLevel})</td>
                          <td className="p-2 font-bold text-[#002664]">{r.placedCompany}</td>
                          <td className="p-2 text-right font-mono">₹{r.packageStipendMonthly.toLocaleString('en-IN')}/mo</td>
                          <td className="p-2 text-center text-emerald-800 font-bold">DVET VERIFIED</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Section 3: Official Certification Sign-Off */}
                <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-end font-sans text-xs">
                  <div>
                    <div className="text-[10px] uppercase text-slate-500">Audit Verification Hash</div>
                    <div className="font-mono text-slate-700">SHA256: 9b8f2d8a4e12c5b9f...</div>
                    <div className="text-[10px] text-slate-400 mt-1">Generated via SkillBridge AI Portal</div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-slate-900">Dr. Nitin Kulkarni / Shri R. More</div>
                    <div className="text-[11px] text-slate-600">Joint Director, Directorate of Vocational Education &amp; Training</div>
                    <div className="text-[10px] text-slate-400">Government of Maharashtra, Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Footer action strip */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated with State Skills Registry (Mahaswayam &amp; DVET)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="px-4 py-1.5 bg-[#002664] hover:bg-[#00173D] text-white text-xs font-bold rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export PDF Dossier</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
