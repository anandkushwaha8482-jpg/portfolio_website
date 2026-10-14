import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../data/portfolioData';
import { GraduationCap, Award, CheckCircle2, Calendar, MapPin } from 'lucide-react';

interface EducationCertificationsProps {
  isDark: boolean;
}

export const EducationCertifications: React.FC<EducationCertificationsProps> = ({ isDark }) => {
  return (
    <section id="education" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            03. Education & Certifications
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Formal engineering foundations at Bansal Institute of Research & Technology coupled with verified software engineering certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Education */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>Academic Background</span>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <div className="text-xs font-medium text-neutral-600 dark:text-neutral-300 mt-0.5">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      {edu.grade}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{edu.duration}</span>
                    </div>
                    <span aria-hidden="true">·</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {/* Coursework list */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/40">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Core Academic Coursework:
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                      {edu.coursework.map((course, cIdx) => (
                        <React.Fragment key={course}>
                          <span>{course}</span>
                          {cIdx < edu.coursework.length - 1 && <span className="text-neutral-500">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {edu.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="text-xs text-neutral-500 flex items-start gap-1.5">
                          <span className="text-blue-500">›</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Verified Certifications & Accolades</span>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neutral-500">
                      {cert.date}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                    {cert.summary}
                  </p>

                  <div className="mt-3 pt-3 border-t border-neutral-800/40">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Verified Curriculum & Skills:
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                      {cert.skillsCovered.map((skill, sIdx) => (
                        <React.Fragment key={skill}>
                          <span>{skill}</span>
                          {sIdx < cert.skillsCovered.length - 1 && <span className="text-neutral-500">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
