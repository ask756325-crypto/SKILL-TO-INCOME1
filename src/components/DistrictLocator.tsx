import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  UserCheck, 
  X, 
  CheckCircle2, 
  Building2, 
  Calendar,
  Search
} from 'lucide-react';
import { Language, PhysicalCenter } from '../types';
import { translations } from '../translations';
import { PHYSICAL_CENTERS } from '../data/mockData';

interface DistrictLocatorProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const DistrictLocator: React.FC<DistrictLocatorProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const t = translations[language];
  const [filterDistrict, setFilterDistrict] = useState<string>('All');
  const [bookingCenter, setBookingCenter] = useState<PhysicalCenter | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-01');

  if (!isOpen) return null;

  const filteredCenters = PHYSICAL_CENTERS.filter((c) => {
    if (filterDistrict === 'All') return true;
    return c.district === filterDistrict;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCenter) return;
    setBookingSuccess(
      `Appointment confirmed at ${bookingCenter.name} on ${preferredDate} for ${candidateName}. Officer-in-charge (${bookingCenter.officerInCharge}) has been notified.`
    );
    setTimeout(() => {
      setBookingSuccess(null);
      setBookingCenter(null);
      setCandidateName('');
      setCandidatePhone('');
    }, 4500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#002664] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                {language === 'mr' ? 'शासकीय ITI आणि जिल्हा कौशल्य केंद्रे' : language === 'hi' ? 'सरकारी आईटीआई एवं जिला कौशल केंद्र' : 'Physical Government ITIs & District Skill Kendras'}
              </h2>
              <p className="text-[11px] text-slate-300">
                Authorized walk-in counseling, laboratory trade tours, and in-person verification across Maharashtra.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Filter by District:</span>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#002664] focus:outline-hidden"
            >
              <option value="All">All Districts</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai Suburban">Mumbai Suburban</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Nashik">Nashik</option>
            </select>
          </div>

          <span className="text-slate-500 font-mono">
            {filteredCenters.length} Centers Found
          </span>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4">
          {bookingSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center justify-between">
              <span className="font-semibold">{bookingSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCenters.map((center) => (
              <div 
                key={center.id} 
                className="p-5 rounded-xl border border-slate-200 hover:border-[#002664] transition-all bg-white space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                      {center.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {center.district}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {center.name}
                  </h3>

                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{center.address}</span>
                  </p>

                  <div className="text-xs text-slate-500 space-y-1 pt-1">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{center.timings}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <UserCheck className="w-3 h-3 text-slate-400" />
                      <span>In-charge: <strong>{center.officerInCharge}</strong></span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Key Workshop Facilities:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {center.facilities.map((f) => (
                        <span key={f} className="text-[11px] text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${center.phone}`}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg inline-flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{center.phone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setBookingCenter(center)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg transition-colors"
                  >
                    Book Walk-In Counseling
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form Modal Overlay */}
        {bookingCenter && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Schedule In-Person Walk-in
                  </h3>
                  <p className="text-xs text-slate-500">{bookingCenter.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingCenter(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmBooking} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="booking-name" className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="booking-phone" className="text-xs font-bold text-slate-700">Mobile Number (for SMS token)</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    placeholder="e.g. 9822012345"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="booking-date" className="text-xs font-bold text-slate-700">Preferred Visit Date</label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingCenter(null)}
                    className="px-4 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-[#002664] hover:bg-[#00173D] rounded-lg"
                  >
                    Confirm Walk-In Pass
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-lg"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
