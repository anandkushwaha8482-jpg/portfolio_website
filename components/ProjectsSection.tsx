import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ArrowUpRight, Code, Play } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  isDark: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject, isDark }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Frontend', 'Algorithms', 'API & System'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Code className="w-3.5 h-3.5" />
              <span>Production Code & Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              01. Featured Engineering Projects
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              End-to-end full-stack systems, stateful interfaces, and algorithmic problem-solving tools built with clean architecture.
            </p>
          </div>

          {/* Category Filter Tabs (Segmented Control style) */}
          <div className={`p-1 rounded-xl border flex flex-wrap gap-1 ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === cat
                    ? isDark 
                      ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700' 
                      : 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
                    : isDark 
                      ? 'text-neutral-400 hover:text-neutral-200' 
                      : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all hover:border-neutral-700/80 group ${
                isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                {/* Quiet Header Kicker (NO PILLS) */}
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-500 uppercase tracking-wider">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Class of 2028 Build</span>
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repo for ${project.title}`}
                    className="p-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {project.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Unboxed Metadata / Stack line (ZERO-PILL DISCIPLINE) */}
                <div className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex flex-wrap gap-x-2.5 gap-y-1">
                  {project.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className="text-neutral-700 dark:text-neutral-300">{tag}</span>
                      {idx < project.tags.length - 1 && <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                {/* Metrics Bar */}
                <div className={`p-3 rounded-xl border grid grid-cols-3 gap-2 text-center ${
                  isDark ? 'bg-neutral-950/40 border-neutral-800/80' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  {project.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-tight">{m.label}</div>
                      <div className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-neutral-800/40 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Try Live Prototype & Architecture</span>
                </button>

                <button
                  onClick={() => onSelectProject(project)}
                  className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                  aria-label="Open project details"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
