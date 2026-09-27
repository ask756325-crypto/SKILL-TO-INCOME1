import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Building2, ExternalLink, HelpCircle, X, Info } from 'lucide-react';
import { TrustMetadata } from '../types';

interface TrustBadgeProps {
  trust: TrustMetadata;
  language?: 'en' | 'mr' | 'hi';
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ trust, language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getTierConfig = () => {
    switch (trust.level) {
      case 'OFFICIAL':
        return {
          icon: ShieldCheck,
          label: language === 'mr' ? 'शासकीय नोंद' : language === 'hi' ? 'सरकारी रिकॉर्ड' : 'Official Record',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
          dotColor: 'bg-emerald-600',
          desc: 'Verified directly from Maharashtra Government gazettes, DVET, or MSSDS databases.'
        };
      case 'PROVIDER_VERIFIED':
        return {
          icon: Building2,
          label: language === 'mr' ? 'प्रदाता प्रमाणित' : language === 'hi' ? 'प्रदाता सत्यापित' : 'Provider Verified',
          color: 'text-blue-700 bg-blue-50 border-blue-300',
          dotColor: 'bg-blue-600',
          desc: 'Submitted by accredited ITIs, NSDC partners, or corporate employers and validated by our inspection team.'
        };
      case 'EXTERNAL_DATA':
        return {
          icon: ExternalLink,
          label: language === 'mr' ? 'उद्योग डेटा' : language === 'hi' ? 'उद्योग डेटा' : 'Industry Data',
          color: 'text-amber-800 bg-amber-50 border-amber-300',
          dotColor: 'bg-amber-600',
          desc: 'Aggregated from Periodic Labour Force Surveys and Maharashtra industry chamber reports.'
        };
      case 'AI_GENERATED':
      default:
        return {
          icon: Sparkles,
          label: language === 'mr' ? 'एआय सल्ला' : language === 'hi' ? 'एआई परामर्श' : 'AI-Generated',
          color: 'text-indigo-800 bg-indigo-50 border-indigo-300',
          dotColor: 'bg-indigo-600',
          desc: 'Synthesized using AI grounded on Maharashtra NSQF standards and real-time regional labor demand.'
        };
    }
  };

  const config = getTierConfig();
  const Icon = config.icon;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border transition-colors hover:opacity-90 ${config.color}`}
        title="View source verification and model transparency"
        aria-label={`Verification: ${config.label}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} aria-hidden="true" />
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{config.label}</span>
        <Info className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {/* Modal / Transparency details */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-slate-700" />
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'mr' ? 'डेटा पारदर्शकता व स्रोत माहिती' : language === 'hi' ? 'डेटा पारदर्शिता एवं स्रोत विवरण' : 'Data Transparency & Source Verification'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-sm text-slate-700">
              <div className="p-3 bg-slate-100 rounded-lg">
                <span className="font-semibold text-slate-900 block mb-1">
                  {language === 'mr' ? 'माहितीचे वर्गीकरण:' : language === 'hi' ? 'डेटा श्रेणी:' : 'Data Classification:'} {config.label}
                </span>
                <p className="text-xs text-slate-600">{config.desc}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {language === 'mr' ? 'अधिकृत स्रोत' : language === 'hi' ? 'आधिकारिक स्रोत' : 'Official Source Reference'}
                </span>
                <p className="font-medium text-slate-900">{trust.source}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {language === 'mr' ? 'शेवटचे अद्यतन' : language === 'hi' ? 'अंतिम अद्यतन' : 'Last Updated'}
                  </span>
                  <p className="font-medium text-slate-800">{trust.lastUpdated}</p>
                </div>
                {trust.verifiedBy && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {language === 'mr' ? 'सत्यापित अधिकारी' : language === 'hi' ? 'सत्यापन अधिकारी' : 'Verified By'}
                    </span>
                    <p className="font-medium text-slate-800">{trust.verifiedBy}</p>
                  </div>
                )}
              </div>

              {trust.confidence && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    {language === 'mr' ? 'मॉडेल विश्वासार्हता दर' : language === 'hi' ? 'मॉडल विश्वसनीयता' : 'Model Confidence & Basis'}
                  </span>
                  <p className="font-medium text-indigo-700">{trust.confidence}</p>
                </div>
              )}

              {trust.limitations && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                  <span className="font-bold block mb-0.5">
                    {language === 'mr' ? 'महत्त्वाची टीप व मर्यादा:' : language === 'hi' ? 'महत्वपूर्ण टिप्पणी एवं सीमाएं:' : 'Important Limitations & Guidance:'}
                  </span>
                  {trust.limitations}
                </div>
              )}

              {/* Human assistance guarantee */}
              <div className="pt-2 border-t border-slate-200 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-[#002664] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600">
                  <p className="font-semibold text-slate-900">
                    {language === 'mr' ? 'मानवी समुपदेशकाशी बोला' : language === 'hi' ? 'मानव परामर्शदाता से बात करें' : 'Speak with a Certified Human Counselor'}
                  </p>
                  <p>
                    {language === 'mr'
                      ? 'कोणत्याही शंकेसाठी मोफत हेल्पलाइन १८००-१२०-८०४० वर कॉल करा किंवा जवळच्या ITI केंद्रास भेट द्या.'
                      : language === 'hi'
                      ? 'किसी भी संदेह के लिए निःशुल्क हेल्पलाइन 1800-120-8040 पर कॉल करें अथवा नजदीकी आईटीआई केंद्र जाएं।'
                      : 'Call toll-free 1800-120-8040 or book a walk-in appointment at your nearest District Skill Kendra.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#002664] rounded-lg hover:bg-[#00173D] transition-colors"
              >
                {language === 'mr' ? 'समजले' : language === 'hi' ? 'ठीक है' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
