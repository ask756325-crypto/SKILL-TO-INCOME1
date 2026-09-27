import React, { useMemo } from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';
import { 
  TARGET_JOB_ROLES, 
  ACCREDITED_COURSES, 
  JOB_LISTINGS, 
  GOV_SCHEMES 
} from '../data/mockData';

interface BreadcrumbsProps {
  currentView: string;
  onNavigate: (view: string, itemId?: string) => void;
  language: Language;
  highlightedItemId?: string | null;
  currentRole?: UserRole;
}

interface Crumb {
  id: string;
  label: string;
  view?: string;
  itemId?: string;
  isCurrent?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  currentView,
  onNavigate,
  language,
  highlightedItemId,
  currentRole
}) => {
  const t = translations[language];

  // Derive dynamic breadcrumb items
  const breadcrumbs: Crumb[] = useMemo(() => {
    // If on homepage and no sub-item, minimal crumb or empty
    if (currentView === 'home' && !highlightedItemId) {
      return [
        { id: 'home', label: t.breadcrumbHome, view: 'home', isCurrent: true }
      ];
    }

    const items: Crumb[] = [
      { id: 'home', label: t.breadcrumbHome, view: 'home' }
    ];

    // Main section crumb
    switch (currentView) {
      case 'assess':
        items.push({
          id: 'assess',
          label: t.navAssess,
          view: 'assess',
          isCurrent: !highlightedItemId
        });
        if (highlightedItemId) {
          const cleanId = highlightedItemId.startsWith('role_') 
            ? highlightedItemId.replace('role_', '') 
            : highlightedItemId;
          const role = TARGET_JOB_ROLES.find((r) => r.id === cleanId);
          if (role) {
            const roleTitle = language === 'mr' ? role.titleMr : language === 'hi' ? role.titleHi : role.title;
            items.push({
              id: `role_${role.id}`,
              label: roleTitle,
              isCurrent: true
            });
          } else {
            items.push({
              id: 'assessment_item',
              label: 'Role Diagnostic Assessment',
              isCurrent: true
            });
          }
        }
        break;

      case 'courses':
        items.push({
          id: 'courses',
          label: t.navTraining,
          view: 'courses',
          isCurrent: !highlightedItemId
        });
        if (highlightedItemId) {
          const course = ACCREDITED_COURSES.find((c) => c.id === highlightedItemId);
          items.push({
            id: highlightedItemId,
            label: course ? course.title : 'Course Details',
            isCurrent: true
          });
        }
        break;

      case 'jobs':
        items.push({
          id: 'jobs',
          label: t.navJobs,
          view: 'jobs',
          isCurrent: !highlightedItemId
        });
        if (highlightedItemId) {
          const job = JOB_LISTINGS.find((j) => j.id === highlightedItemId);
          items.push({
            id: highlightedItemId,
            label: job ? `${job.title} · ${job.company}` : 'Job Opportunity',
            isCurrent: true
          });
        }
        break;

      case 'schemes':
        items.push({
          id: 'schemes',
          label: t.navSchemes,
          view: 'schemes',
          isCurrent: !highlightedItemId
        });
        if (highlightedItemId) {
          const scheme = GOV_SCHEMES.find((s) => s.id === highlightedItemId);
          const schemeTitle = scheme 
            ? (language === 'mr' ? scheme.titleMr : language === 'hi' ? scheme.titleHi : scheme.title)
            : 'Scheme Eligibility Discovery';
          items.push({
            id: highlightedItemId,
            label: schemeTitle,
            isCurrent: true
          });
        }
        break;

      case 'districts':
      case 'admin':
        items.push({
          id: 'districts',
          label: currentView === 'admin' ? t.roleAdmin : t.navDistricts,
          view: currentView,
          isCurrent: true
        });
        break;

      case 'employer':
        items.push({
          id: 'employer',
          label: t.roleEmployer,
          view: 'employer',
          isCurrent: true
        });
        break;

      case 'institute':
        items.push({
          id: 'institute',
          label: t.roleInstitute,
          view: 'institute',
          isCurrent: true
        });
        break;

      case 'counselor':
        items.push({
          id: 'counselor',
          label: t.roleCounselor,
          view: 'counselor',
          isCurrent: true
        });
        break;

      default:
        items.push({
          id: currentView,
          label: currentView.charAt(0).toUpperCase() + currentView.slice(1),
          view: currentView,
          isCurrent: true
        });
    }

    return items;
  }, [currentView, highlightedItemId, language, t]);

  // If only on Home with 1 element, we can show a subtle indicator or omit
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // Find parent breadcrumb for mobile "Back" link (GOV.UK design standard)
  const previousCrumb = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null;

  return (
    <nav 
      aria-label={t.breadcrumbYouAreHere}
      className="bg-[#F8F9FA] border-b border-slate-200/90 py-2 sm:py-2.5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-xs">
        {/* Full Breadcrumb Trail for Tablet & Desktop */}
        <ol 
          className="flex items-center flex-wrap gap-1.5 text-slate-500 overflow-hidden leading-normal"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li 
                key={crumb.id}
                className="flex items-center gap-1.5 max-w-full"
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight 
                    className="w-3.5 h-3.5 text-slate-400 shrink-0 select-none" 
                    aria-hidden="true" 
                  />
                )}

                {isLast ? (
                  <span 
                    aria-current="page"
                    className="font-bold text-[#002664] max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg truncate"
                    title={crumb.label}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (crumb.view) {
                        onNavigate(crumb.view, crumb.itemId);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-[#002664] hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#002664] rounded-xs font-medium transition-colors cursor-pointer truncate max-w-[140px] sm:max-w-[200px]"
                    itemProp="item"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />}
                    <span itemProp="name">{crumb.label}</span>
                  </button>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>

        {/* Mobile Quick "Back" link (GOV.UK & Service NSW pattern) */}
        {previousCrumb && (
          <div className="sm:hidden shrink-0">
            <button
              type="button"
              onClick={() => {
                if (previousCrumb.view) {
                  onNavigate(previousCrumb.view, previousCrumb.itemId);
                }
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#002664] hover:underline cursor-pointer"
              aria-label={`${t.breadcrumbBack} ${previousCrumb.label}`}
            >
              <ArrowLeft className="w-3 h-3 text-[#002664]" />
              <span>{t.breadcrumbBack} {previousCrumb.label}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
