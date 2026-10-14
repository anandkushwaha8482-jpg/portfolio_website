import React, { useState } from 'react';
import { RECRUITER_MATCH_ROLES, PERSONAL_INFO } from '../data/portfolioData';
import { CheckCircle2, ArrowRight, MessageSquare, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RecruiterMatcherProps {
  onSelectProject: (projectId: string) => void;
  isDark: boolean;
}

export const RecruiterMatcher: React.FC<RecruiterMatcherProps> = ({ onSelectProject, isDark }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('full-stack');

  const activeRole = RECRUITER_MATCH_ROLES.find(r => r.id === selectedRoleId) || RECRUITER_MATCH_ROLES[0];

  const handleRoleClick = (id: string) => {
    setSelectedRoleId(id);
  };

  const handleConnect = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    const message = encodeURIComponent(
      `Hi Anand, I am reviewing your profile for a ${activeRole.title} role. Let's discuss an internship opportunity!`
    );
    window.open(`https://wa.me/916269125842?text=${message}`, '_blank');
  };

  return (
    <section id="role-match" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Interactive Recruiter Match</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Evaluate Fit for Your Open Internship
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Select the position you are hiring for to review verified competencies, matching projects, and direct qualifications.
          </p>
        </div>

        {/* Role Selector Tabs (Segmented Control style from design constitution) */}
        <div className={`p-1.5 rounded-xl border flex flex-wrap gap-1.5 mb-6 ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {RECRUITER_MATCH_ROLES.map((role) => {
            const isActive = role.id === selectedRoleId;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleClick(role.id)}
                className={`flex-1 min-w-[200px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between ${
                  isActive
                    ? isDark
                      ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/80'
                      : 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
                    : isDark
                      ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                }`}
              >
                <span>{role.title}</span>
                <span className={`text-xs font-mono font-semibold ${
                  isActive ? 'text-blue-500' : 'text-neutral-500'
                }`}>
                  {role.matchScore} Match
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Role Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Key Matches */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    {activeRole.title}
                  </h3>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {activeRole.matchScore} Qualification Fit
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {activeRole.tagline}
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Verified Engineering Match:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeRole.keyMatches.map((match, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{match}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Recommended Showcase:</span>
                <span>{activeRole.recommendedProject}</span>
              </div>
            </div>

            {/* Right 4 cols: Instant Action */}
            <div className={`lg:col-span-4 p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
              isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Direct Next Step
                </div>
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-1">
                  Ready for technical interview & project walkthrough
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Available for immediate internship joining. Remote or Onsite across India.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{activeRole.actionPrompt}</span>
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Internship%20Discussion%20-%20${encodeURIComponent(activeRole.title)}`}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-medium border transition-colors ${
                    isDark 
                      ? 'border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800' 
                      : 'border-neutral-300 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>Send Direct Email</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
