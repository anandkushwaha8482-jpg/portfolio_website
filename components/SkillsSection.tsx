import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Wrench, CheckCircle, Terminal } from 'lucide-react';

interface SkillsSectionProps {
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark }) => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);

  const activeCategory = SKILL_CATEGORIES[activeCategoryIdx];

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            02. Core Technical Competencies
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Proficiencies honed through hands-on project engineering, institute coursework at Bansal Institute of Research & Technology, and verified certifications.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className={`p-1 rounded-xl border flex flex-wrap gap-1 mb-6 ${
          isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategoryIdx(idx)}
              className={`flex-1 min-w-[160px] py-2 px-3 rounded-lg text-xs font-medium transition-colors text-center ${
                activeCategoryIdx === idx
                  ? isDark
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
                  : isDark
                    ? 'text-neutral-400 hover:text-neutral-200'
                    : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className={`p-6 sm:p-8 rounded-2xl border ${
          isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800/40 gap-2 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                {activeCategory.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {activeCategory.description}
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500">
              {activeCategory.skills.length} Key Competencies
            </div>
          </div>

          {/* Tabular Skill List */}
          <div className="divide-y divide-neutral-800/40 space-y-4">
            {activeCategory.skills.map((skill, i) => (
              <div key={skill.name} className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="md:w-1/4">
                  <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="font-mono text-blue-500 text-xs">0{i + 1}.</span>
                    <span>{skill.name}</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-500 mt-0.5">
                    {skill.level} Proficiency
                  </div>
                </div>

                <div className="md:w-2/5 text-neutral-600 dark:text-neutral-300">
                  <span className="text-neutral-400 text-xs block md:hidden mb-0.5">Topics & Concepts:</span>
                  <span>{skill.experience}</span>
                </div>

                <div className="md:w-1/3 text-neutral-500 dark:text-neutral-400 text-xs">
                  <span className="text-neutral-400 text-[11px] block md:hidden mb-0.5">Project Application:</span>
                  <span className="font-mono">{skill.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
