import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  MapPin, 
  FileSpreadsheet, 
  Filter, 
  Eye, 
  Table, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  ArrowUpRight, 
  AlertCircle,
  CheckCircle2,
  PieChart as PieIcon,
  ScatterChart as ScatterIcon,
  LineChart as LineIcon,
  Printer,
  Building2
} from 'lucide-react';
import { BorderBeam } from 'border-beam';
import { Language, DistrictMetric } from '../types';
import { translations } from '../translations';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';

interface AnalyticsSummaryDashboardProps {
  language: Language;
  selectedDistrictId: string;
  onSelectDistrict: (districtId: string) => void;
  onDrilldown?: (district: DistrictMetric) => void;
}

export const AnalyticsSummaryDashboard: React.FC<AnalyticsSummaryDashboardProps> = ({
  language,
  selectedDistrictId,
  onSelectDistrict,
  onDrilldown
}) => {
  const t = translations[language];

  // View state
  const [viewMode, setViewMode] = useState<'charts' | 'table'>('charts');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'learners' | 'participation' | 'placement' | 'demand'>('participation');
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    visible: boolean;
    title: string;
    subtitle: string;
    metrics: { label: string; value: string; color?: string }[];
  }>({
    x: 0,
    y: 0,
    visible: false,
    title: '',
    subtitle: '',
    metrics: []
  });

  // SVG Refs for D3 Renderings
  const barChartRef = useRef<SVGSVGElement | null>(null);
  const trajectoryChartRef = useRef<SVGSVGElement | null>(null);
  const donutChartRef = useRef<SVGSVGElement | null>(null);
  const scatterChartRef = useRef<SVGSVGElement | null>(null);

  // Filtered and sorted districts
  const filteredDistricts = useMemo(() => {
    return MAHARASHTRA_DISTRICTS.filter((d) => {
      if (selectedDivision !== 'all' && d.division !== selectedDivision) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'learners') return b.activeLearners - a.activeLearners;
      if (sortBy === 'participation') return (b.trainingParticipationRate || 0) - (a.trainingParticipationRate || 0);
      if (sortBy === 'placement') return b.placementRate - a.placementRate;
      if (sortBy === 'demand') return b.apprenticeshipOpenings - a.apprenticeshipOpenings;
      return 0;
    });
  }, [selectedDivision, sortBy]);

  // Aggregate statewide statistics
  const summaryStats = useMemo(() => {
    const totalLearners = MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + d.activeLearners, 0);
    const totalDemand = MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + d.apprenticeshipOpenings, 0);
    const avgParticipation = (
      MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + (d.trainingParticipationRate || 80), 0) / MAHARASHTRA_DISTRICTS.length
    ).toFixed(1);
    const avgPlacement = (
      MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + d.placementRate, 0) / MAHARASHTRA_DISTRICTS.length
    ).toFixed(1);
    const avgCapacity = (
      MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + (d.capacityUtilizationRate || 90), 0) / MAHARASHTRA_DISTRICTS.length
    ).toFixed(1);
    const totalBudget = MAHARASHTRA_DISTRICTS.reduce((sum, d) => sum + (d.budgetAllocationCrores || 30), 0).toFixed(1);

    return { totalLearners, totalDemand, avgParticipation, avgPlacement, avgCapacity, totalBudget };
  }, []);

  // Selected district record
  const currentDistrict = useMemo(() => {
    return MAHARASHTRA_DISTRICTS.find((d) => d.id === selectedDistrictId) || MAHARASHTRA_DISTRICTS[0];
  }, [selectedDistrictId]);

  // Sectoral aggregated breakdown data
  const sectoralData = useMemo(() => {
    return [
      { sector: 'Automotive & Clean Mobility', share: 28, openings: 8640, growth: '+34%' },
      { sector: 'IT & Cloud Systems', share: 24, openings: 7420, growth: '+28%' },
      { sector: 'Precision Tooling & CNC', share: 19, openings: 5890, growth: '+22%' },
      { sector: 'BFSI & Logistics SEZ', share: 16, openings: 4950, growth: '+19%' },
      { sector: 'Biopharma & Green Energy', share: 13, openings: 4020, growth: '+26%' }
    ];
  }, []);

  // ----------------------------------------------------
  // D3 Chart 1: District Skill Demand & Participation Matrix
  // ----------------------------------------------------
  useEffect(() => {
    if (!barChartRef.current || viewMode !== 'charts') return;

    const svg = d3.select(barChartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 30, right: 50, bottom: 65, left: 60 };
    const width = 640 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale: Districts
    const x0 = d3
      .scaleBand()
      .domain(filteredDistricts.map((d) => language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.name))
      .rangeRound([0, width])
      .paddingInner(0.25);

    // Inner Scale for Grouped Bars (Demand vs Participation)
    const x1 = d3
      .scaleBand()
      .domain(['participation', 'demand'])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.08);

    // Y Scale (Left): Volume
    const yMax = d3.max(filteredDistricts, (d) => Math.max(d.activeLearners, d.apprenticeshipOpenings * 6)) || 60000;
    const y = d3.scaleLinear().domain([0, yMax]).nice().rangeRound([height, 0]);

    // Y Scale (Right): Placement Rate (%)
    const yPercent = d3.scaleLinear().domain([60, 100]).rangeRound([height, 0]);

    // Gridlines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-dasharray', '3,3');

    // Axes
    const xAxis = d3.axisBottom(x0);
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-18)')
      .style('text-anchor', 'end')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#334155');

    const yAxisLeft = d3.axisLeft(y).ticks(5).tickFormat((d) => `${(Number(d) / 1000).toFixed(0)}k`);
    g.append('g').call(yAxisLeft).attr('font-size', '10px').attr('fill', '#64748B');

    const yAxisRight = d3.axisRight(yPercent).ticks(5).tickFormat((d) => `${d}%`);
    g.append('g')
      .attr('transform', `translate(${width},0)`)
      .call(yAxisRight)
      .attr('font-size', '10px')
      .attr('fill', '#10B981');

    // Render Bars
    const districtGroups = g
      .selectAll('.district-group')
      .data(filteredDistricts)
      .enter()
      .append('g')
      .attr('class', 'district-group')
      .attr('transform', (d) => `translate(${x0(language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.name)},0)`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        onSelectDistrict(d.id);
        onDrilldown?.(d);
      });

    // Participation Bar (Civic Navy / Blue)
    districtGroups
      .append('rect')
      .attr('x', () => x1('participation') || 0)
      .attr('y', (d) => y(d.activeLearners))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => height - y(d.activeLearners))
      .attr('rx', 3)
      .attr('fill', (d) => (d.id === selectedDistrictId ? '#002664' : '#2563EB'))
      .attr('opacity', (d) => (d.id === selectedDistrictId ? 1 : 0.85))
      .on('mouseenter', (event, d) => {
        setTooltipData({
          x: event.clientX,
          y: event.clientY,
          visible: true,
          title: `${d.name} (${d.division} Division)`,
          subtitle: `Accredited ITIs: ${d.itiCount} Centers`,
          metrics: [
            { label: 'Active Trainees', value: d.activeLearners.toLocaleString('en-IN'), color: '#2563EB' },
            { label: 'Participation Rate', value: `${d.trainingParticipationRate || 80}%`, color: '#002664' },
            { label: 'MAPS Openings', value: d.apprenticeshipOpenings.toLocaleString('en-IN'), color: '#F59E0B' },
            { label: 'Placement Rate', value: `${d.placementRate}%`, color: '#10B981' }
          ]
        });
      })
      .on('mouseleave', () => setTooltipData((prev) => ({ ...prev, visible: false })));

    // Demand Openings Bar (Amber)
    districtGroups
      .append('rect')
      .attr('x', () => x1('demand') || 0)
      .attr('y', (d) => y(d.apprenticeshipOpenings * 5.5))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => height - y(d.apprenticeshipOpenings * 5.5))
      .attr('rx', 3)
      .attr('fill', '#F59E0B')
      .attr('opacity', 0.9)
      .on('mouseenter', (event, d) => {
        setTooltipData({
          x: event.clientX,
          y: event.clientY,
          visible: true,
          title: `${d.name} Demand Scale`,
          subtitle: `Vacancies: ${d.apprenticeshipOpenings.toLocaleString('en-IN')}`,
          metrics: [
            { label: 'Industry Vacancies', value: d.apprenticeshipOpenings.toLocaleString('en-IN'), color: '#F59E0B' },
            { label: 'Top Demand Skill', value: d.topDemandedSkills[0], color: '#334155' }
          ]
        });
      })
      .on('mouseleave', () => setTooltipData((prev) => ({ ...prev, visible: false })));

    // Placement Line (Emerald Line over bars)
    const lineGen = d3
      .line<DistrictMetric>()
      .x((d) => (x0(language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.name) || 0) + x0.bandwidth() / 2)
      .y((d) => yPercent(d.placementRate))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(filteredDistricts)
      .attr('fill', 'none')
      .attr('stroke', '#10B981')
      .attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '4,2')
      .attr('d', lineGen);

    // Placement Points
    g.selectAll('.dot')
      .data(filteredDistricts)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => (x0(language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.name) || 0) + x0.bandwidth() / 2)
      .attr('cy', (d) => yPercent(d.placementRate))
      .attr('r', (d) => (d.id === selectedDistrictId ? 5.5 : 4))
      .attr('fill', '#10B981')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1.5);
  }, [filteredDistricts, selectedDistrictId, language, viewMode]);

  // ----------------------------------------------------
  // D3 Chart 2: Multi-Quarter Trend Trajectory
  // ----------------------------------------------------
  useEffect(() => {
    if (!trajectoryChartRef.current || viewMode !== 'charts') return;

    const svg = d3.select(trajectoryChartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 25, right: 35, bottom: 40, left: 55 };
    const width = 480 - margin.left - margin.right;
    const height = 230 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const trends = currentDistrict.quarterlyTrends || [
      { quarter: 'Q1 25', participation: 28000, demand: 3200 },
      { quarter: 'Q2 25', participation: 30000, demand: 3500 },
      { quarter: 'Q3 25', participation: 32500, demand: 3800 },
      { quarter: 'Q4 25', participation: 34000, demand: 4100 },
      { quarter: 'Q1 26', participation: 35800, demand: 4300 },
      { quarter: 'Q2 26', participation: 37500, demand: 4600 }
    ];

    const x = d3
      .scalePoint()
      .domain(trends.map((d) => d.quarter))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(trends, (d) => d.participation * 1.15) || 50000])
      .range([height, 0]);

    // Area generator for participation
    const areaGen = d3
      .area<{ quarter: string; participation: number }>()
      .x((d) => x(d.quarter) || 0)
      .y0(height)
      .y1((d) => y(d.participation))
      .curve(d3.curveMonotoneX);

    // Line generator for participation
    const lineGen = d3
      .line<{ quarter: string; participation: number }>()
      .x((d) => x(d.quarter) || 0)
      .y((d) => y(d.participation))
      .curve(d3.curveMonotoneX);

    // Gradient fill
    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#2563EB').attr('stop-opacity', 0.4);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#2563EB').attr('stop-opacity', 0.02);

    g.append('path')
      .datum(trends)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', areaGen);

    g.append('path')
      .datum(trends)
      .attr('fill', 'none')
      .attr('stroke', '#002664')
      .attr('stroke-width', 2.5)
      .attr('d', lineGen);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('font-size', '10px')
      .attr('fill', '#64748B');

    g.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat((d) => `${(Number(d) / 1000).toFixed(0)}k`))
      .attr('font-size', '10px')
      .attr('fill', '#64748B');

    // Dots
    g.selectAll('.trend-dot')
      .data(trends)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.quarter) || 0)
      .attr('cy', (d) => y(d.participation))
      .attr('r', 4)
      .attr('fill', '#002664')
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2);
  }, [currentDistrict, viewMode]);

  // ----------------------------------------------------
  // D3 Chart 3: Sectoral Vacancy Share Donut
  // ----------------------------------------------------
  useEffect(() => {
    if (!donutChartRef.current || viewMode !== 'charts') return;

    const svg = d3.select(donutChartRef.current);
    svg.selectAll('*').remove();

    const width = 260;
    const height = 230;
    const radius = Math.min(width, height) / 2 - 15;

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal<string>()
      .domain(sectoralData.map((d) => d.sector))
      .range(['#002664', '#2563EB', '#10B981', '#F59E0B', '#8B5CF6']);

    const pie = d3
      .pie<{ sector: string; share: number; openings: number }>()
      .value((d) => d.share)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<{ sector: string; share: number; openings: number }>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius);

    const arcs = g
      .selectAll('.arc')
      .data(pie(sectoralData))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        setActiveSector(d.data.sector === activeSector ? null : d.data.sector);
      });

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.sector))
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('opacity', (d) => (activeSector && activeSector !== d.data.sector ? 0.4 : 1))
      .on('mouseenter', (event, d) => {
        setTooltipData({
          x: event.clientX,
          y: event.clientY,
          visible: true,
          title: d.data.sector,
          subtitle: `Vacancy Share: ${d.data.share}%`,
          metrics: [
            { label: 'Active Openings', value: d.data.openings.toLocaleString('en-IN') }
          ]
        });
      })
      .on('mouseleave', () => setTooltipData((prev) => ({ ...prev, visible: false })));

    // Center Text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('font-size', '15px')
      .attr('font-weight', '800')
      .attr('fill', '#002664')
      .text('30,920');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('font-size', '10px')
      .attr('fill', '#64748B')
      .text('MAPS Openings');
  }, [sectoralData, activeSector, viewMode]);

  // ----------------------------------------------------
  // D3 Chart 4: Efficiency Quadrants (Scatter Plot)
  // ----------------------------------------------------
  useEffect(() => {
    if (!scatterChartRef.current || viewMode !== 'charts') return;

    const svg = d3.select(scatterChartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 25, right: 35, bottom: 45, left: 55 };
    const width = 480 - margin.left - margin.right;
    const height = 230 - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale: Participation Rate (%)
    const x = d3.scaleLinear().domain([74, 94]).range([0, width]);
    // Y Scale: Placement Rate (%)
    const y = d3.scaleLinear().domain([76, 92]).range([height, 0]);

    // Quadrant Midlines (Benchmarks: 84% participation, 83% placement)
    g.append('line')
      .attr('x1', x(84))
      .attr('x2', x(84))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#CBD5E1')
      .attr('stroke-dasharray', '4,4');

    g.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(83))
      .attr('y2', y(83))
      .attr('stroke', '#CBD5E1')
      .attr('stroke-dasharray', '4,4');

    // Quadrant Labels
    g.append('text')
      .attr('x', width - 8)
      .attr('y', 14)
      .attr('text-anchor', 'end')
      .attr('font-size', '9px')
      .attr('font-weight', '700')
      .attr('fill', '#059669')
      .text('★ High Part. & High Placement');

    g.append('text')
      .attr('x', 8)
      .attr('y', 14)
      .attr('font-size', '9px')
      .attr('font-weight', '700')
      .attr('fill', '#D97706')
      .text('▲ High Placement / Seat Cap.');

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((d) => `${d}%`))
      .attr('font-size', '10px')
      .attr('fill', '#64748B');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`))
      .attr('font-size', '10px')
      .attr('fill', '#64748B');

    // District Bubbles
    g.selectAll('.district-bubble')
      .data(filteredDistricts)
      .enter()
      .append('circle')
      .attr('class', 'district-bubble')
      .attr('cx', (d) => x(d.trainingParticipationRate || 80))
      .attr('cy', (d) => y(d.placementRate))
      .attr('r', (d) => Math.sqrt(d.itiCount) * 2.8)
      .attr('fill', (d) => (d.id === selectedDistrictId ? '#002664' : '#2563EB'))
      .attr('opacity', 0.8)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        onSelectDistrict(d.id);
        onDrilldown?.(d);
      })
      .on('mouseenter', (event, d) => {
        setTooltipData({
          x: event.clientX,
          y: event.clientY,
          visible: true,
          title: d.name,
          subtitle: `${d.itiCount} ITI Centers`,
          metrics: [
            { label: 'Participation Rate', value: `${d.trainingParticipationRate || 80}%` },
            { label: 'Placement Rate', value: `${d.placementRate}%` }
          ]
        });
      })
      .on('mouseleave', () => setTooltipData((prev) => ({ ...prev, visible: false })));

    // Bubble Text Labels
    g.selectAll('.bubble-label')
      .data(filteredDistricts)
      .enter()
      .append('text')
      .attr('x', (d) => x(d.trainingParticipationRate || 80))
      .attr('y', (d) => y(d.placementRate) - 8)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('font-weight', '600')
      .attr('fill', '#1E293B')
      .text((d) => d.name);
  }, [filteredDistricts, selectedDistrictId, viewMode]);

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = [
      'District ID',
      'District Name',
      'Division',
      'Active Learners',
      'Participation Rate (%)',
      'Placement Rate (%)',
      'Capacity Utilization (%)',
      'ITI Centers Count',
      'MAPS Openings',
      'Top Sector',
      'Recommended Action'
    ];

    const rows = MAHARASHTRA_DISTRICTS.map((d) => [
      d.id,
      `"${d.name}"`,
      d.division,
      d.activeLearners,
      d.trainingParticipationRate || 80,
      d.placementRate,
      d.capacityUtilizationRate || 90,
      d.itiCount,
      d.apprenticeshipOpenings,
      `"${d.topSectors[0]}"`,
      `"${d.actionableInsight || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Maharashtra_Skill_Analytics_Summary_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      aria-label="Government Administrative Analytics Dashboard"
      className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8"
    >
      {/* 1. Dashboard Top Bar & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-blue-50 text-[#002664] border border-blue-200">
              Cabinet Decision Support
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">
              DVET &amp; MSSDS Integrated Labor Metrics
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {t.analyticsSummaryTitle}
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            {t.analyticsSummarySubtitle}
          </p>
        </div>

        {/* View Mode & Export Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Toggle Visual / Table */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('charts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold transition-colors ${
                viewMode === 'charts'
                  ? 'bg-white text-[#002664] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#002664]" />
              <span>{t.analyticsViewCharts}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-[#002664] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-[#002664]" />
              <span>{t.analyticsViewTable}</span>
            </button>
          </div>

          {/* Export Report CSV */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002664] hover:bg-[#00173D] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            title="Download CSV for District Planning"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.analyticsExportReport}</span>
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            title="Print or Save Official Labor Intelligence Summary as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-xs">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Total Enrolled
          </span>
          <span className="text-xl font-extrabold text-[#002664] font-mono mt-0.5 block">
            {summaryStats.totalLearners.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">+18.4% YoY</span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Avg Participation
          </span>
          <span className="text-xl font-extrabold text-[#002664] font-mono mt-0.5 block">
            {summaryStats.avgParticipation}%
          </span>
          <span className="text-[10px] text-slate-500">Across 36 Districts</span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Placement Rate
          </span>
          <span className="text-xl font-extrabold text-emerald-700 font-mono mt-0.5 block">
            {summaryStats.avgPlacement}%
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">Exceeds 80% Target</span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            MAPS Vacancies
          </span>
          <span className="text-xl font-extrabold text-[#002664] font-mono mt-0.5 block">
            {summaryStats.totalDemand.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-indigo-700 font-semibold">Industry Openings</span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Capacity Pressure
          </span>
          <span className="text-xl font-extrabold text-amber-700 font-mono mt-0.5 block">
            {summaryStats.avgCapacity}%
          </span>
          <span className="text-[10px] text-amber-800 font-semibold">Seat Utilization</span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            State Allocation
          </span>
          <span className="text-xl font-extrabold text-[#002664] font-mono mt-0.5 block">
            ₹{summaryStats.totalBudget} Cr
          </span>
          <span className="text-[10px] text-slate-500 font-semibold">Modernization Grant</span>
        </div>
      </div>

      {/* 3. Filter Bar (Division & Metric Sorting) */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#002664]" />
            {t.analyticsDivisionFilter}
          </span>
          {(['all', 'Pune', 'Konkan', 'Nagpur', 'Nashik', 'Chhatrapati Sambhaji Nagar'] as const).map((div) => (
            <button
              key={div}
              type="button"
              onClick={() => setSelectedDivision(div)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                selectedDivision === div
                  ? 'bg-[#002664] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
              }`}
            >
              {div === 'all' ? 'All Divisions' : div}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">{t.analyticsSortBy}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-md px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="participation">Participation Rate</option>
            <option value="demand">Skill Demand (MAPS)</option>
            <option value="learners">Total Enrolled Trainees</option>
            <option value="placement">Placement Rate (%)</option>
          </select>
        </div>
      </div>

      {/* 4. MAIN VISUALIZATION CHARTS GRID */}
      {viewMode === 'charts' ? (
        <div className="space-y-8">
          {/* Main Visual: Grouped Dual-Axis Bar Matrix wrapped in BorderBeam */}
          <BorderBeam size="md" colorVariant="ocean" strength={0.65} theme="light">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#002664]" />
                    {t.analyticsDemandVsParticipation}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Dual-axis comparison of active vocational enrollment (Blue), apprenticeship demand (Amber), and placement rate (Green dashed line). <strong>Click any district bar to drill down into ITI demand and verified student placements.</strong>
                  </p>
                </div>

                {/* Legend & Drill Down Quick Trigger */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-3 h-3 rounded-xs bg-[#2563EB]" />
                      <span>Enrolled Trainees</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-3 h-3 rounded-xs bg-[#F59E0B]" />
                      <span>MAPS Openings</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-3 h-1 bg-[#10B981] rounded-xs" />
                      <span>Placement %</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDrilldown?.(currentDistrict)}
                    className="px-2.5 py-1 bg-[#002664] hover:bg-[#00173D] text-white rounded-lg text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    title={`Drill down into ${currentDistrict.name} ITI demand breakdowns and student placement data`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Drill-Down: {currentDistrict.name}</span>
                  </button>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <svg 
                  ref={barChartRef} 
                  viewBox="0 0 640 300" 
                  className="w-full h-auto min-w-[580px] max-h-[320px]"
                  aria-label="District Skill Demand and Training Participation Chart"
                />
              </div>
            </div>
          </BorderBeam>

          {/* Secondary 3-Column Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 2: Multi-Quarter Trend */}
            <div className="p-5 bg-slate-50/60 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <LineIcon className="w-3.5 h-3.5 text-[#002664]" />
                    {currentDistrict.name} Enrollment Trajectory
                  </h4>
                  <p className="text-[10px] text-slate-500">6-Quarter Historical Progression</p>
                </div>
                <button
                  type="button"
                  onClick={() => onDrilldown?.(currentDistrict)}
                  className="text-[10px] font-bold text-[#002664] hover:text-[#00173D] flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 cursor-pointer"
                  title="Drill down into region"
                >
                  <span>Drill-Down</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="w-full overflow-hidden">
                <svg 
                  ref={trajectoryChartRef} 
                  viewBox="0 0 480 230" 
                  className="w-full h-auto"
                  aria-label="Multi-quarter enrollment trajectory chart"
                />
              </div>
            </div>

            {/* Chart 3: Sectoral Vacancy Donut */}
            <div className="p-5 bg-slate-50/60 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <PieIcon className="w-3.5 h-3.5 text-[#002664]" />
                    {t.analyticsSectorDistribution}
                  </h4>
                  <p className="text-[10px] text-slate-500">By Apprenticeship Vacancy Share</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Live FY 2026</span>
              </div>

              <div className="w-full flex items-center justify-center">
                <svg 
                  ref={donutChartRef} 
                  viewBox="0 0 260 230" 
                  className="w-full max-w-[240px] h-auto"
                  aria-label="Sectoral vacancy share donut chart"
                />
              </div>

              {/* Compact Sector Legend */}
              <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-600 pt-1">
                {sectoralData.map((s, i) => (
                  <div key={s.sector} className="flex items-center gap-1 truncate">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: ['#002664', '#2563EB', '#10B981', '#F59E0B', '#8B5CF6'][i] }} 
                    />
                    <span className="truncate">{s.sector.split(' ')[0]} ({s.share}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 4: Quadrant Efficiency Scatter Plot */}
            <div className="p-5 bg-slate-50/60 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ScatterIcon className="w-3.5 h-3.5 text-[#002664]" />
                    {t.analyticsQuadrantTitle}
                  </h4>
                  <p className="text-[10px] text-slate-500">Participation vs Placement Rate</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Bubble = ITI Centers</span>
              </div>

              <div className="w-full overflow-hidden">
                <svg 
                  ref={scatterChartRef} 
                  viewBox="0 0 480 230" 
                  className="w-full h-auto"
                  aria-label="Participation vs Placement Quadrant Scatter Plot"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ACCESSIBLE DATA TABLE VIEW (GIGW 3.0 / WCAG AA compliant) */
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <caption className="sr-only">District Skill Demand and Training Participation Rate Data Table</caption>
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th scope="col" className="px-4 py-3">District</th>
                <th scope="col" className="px-4 py-3">Division</th>
                <th scope="col" className="px-4 py-3 text-right">Active Trainees</th>
                <th scope="col" className="px-4 py-3 text-right">Participation Rate</th>
                <th scope="col" className="px-4 py-3 text-right">MAPS Demand</th>
                <th scope="col" className="px-4 py-3 text-right">Placement Rate</th>
                <th scope="col" className="px-4 py-3 text-right">Capacity Utilization</th>
                <th scope="col" className="px-4 py-3">Primary Sector</th>
                <th scope="col" className="px-4 py-3">Administrative Recommendation</th>
                <th scope="col" className="px-4 py-3 text-center">Drill-Down</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 font-medium">
              {filteredDistricts.map((d) => (
                <tr 
                  key={d.id} 
                  onClick={() => {
                    onSelectDistrict(d.id);
                    onDrilldown?.(d);
                  }}
                  className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                    d.id === selectedDistrictId ? 'bg-blue-50/80 font-bold text-[#002664]' : 'text-slate-700'
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#002664]" />
                    <span>{language === 'mr' ? d.nameMr : language === 'hi' ? d.nameHi : d.name}</span>
                  </td>
                  <td className="px-4 py-3">{d.division}</td>
                  <td className="px-4 py-3 text-right font-mono">{d.activeLearners.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-right font-mono text-[#002664] font-bold">
                    {d.trainingParticipationRate || 80}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-amber-700 font-bold">
                    {d.apprenticeshipOpenings.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-700 font-bold">
                    {d.placementRate}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {d.capacityUtilizationRate || 90}%
                  </td>
                  <td className="px-4 py-3">{d.topSectors[0]}</td>
                  <td className="px-4 py-3 text-[11px] text-slate-600 max-w-xs truncate" title={d.actionableInsight}>
                    {language === 'mr' ? d.actionableInsightMr : language === 'hi' ? d.actionableInsightHi : d.actionableInsight}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDistrict(d.id);
                        onDrilldown?.(d);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-md transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Drill-Down</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. ACTIONABLE GOVERNMENT EXECUTIVE DIRECTIVES & INTERVENTIONS */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {t.analyticsExecutiveBriefs}
            </h3>
            <p className="text-xs text-slate-500">
              Automated data-driven policy recommendations generated for District Skill Committees (DSC).
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Cabinet Review Docket: MH-SKILL-2026-D1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {filteredDistricts.slice(0, 3).map((d) => (
            <div 
              key={d.id}
              onClick={() => {
                onSelectDistrict(d.id);
                onDrilldown?.(d);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                d.id === selectedDistrictId
                  ? 'bg-blue-50/70 border-[#002664] shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#002664]" />
                  <span>{d.name} District</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                  Priority Action
                </span>
              </div>

              <p className="text-slate-700 leading-relaxed">
                {language === 'mr' ? d.actionableInsightMr : language === 'hi' ? d.actionableInsightHi : d.actionableInsight}
              </p>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  Grant Need: <strong className="text-slate-800">₹{d.budgetAllocationCrores || 30} Cr</strong>
                </span>
                <span className="font-bold text-[#002664] flex items-center gap-1 hover:underline">
                  <span>Drill-down ITI &amp; Placements</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {tooltipData.visible && (
        <div
          className="fixed z-50 pointer-events-none bg-slate-900/95 text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 backdrop-blur-xs border border-slate-800"
          style={{
            left: `${Math.min(window.innerWidth - 220, tooltipData.x + 15)}px`,
            top: `${Math.max(10, tooltipData.y - 40)}px`
          }}
        >
          <div className="font-bold text-white border-b border-slate-800 pb-1">
            {tooltipData.title}
          </div>
          {tooltipData.subtitle && (
            <div className="text-[10px] text-slate-400">{tooltipData.subtitle}</div>
          )}
          <div className="space-y-0.5 pt-0.5">
            {tooltipData.metrics.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 text-[11px]">
                <span className="text-slate-300">{m.label}:</span>
                <span className="font-mono font-bold" style={{ color: m.color || '#FFFFFF' }}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
