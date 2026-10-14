import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RecruiterMatcher } from './components/RecruiterMatcher';
import { ProjectsSection } from './components/ProjectsSection';
import { DsaVisualizer } from './components/DsaVisualizer';
import { SkillsSection } from './components/SkillsSection';
import { EducationCertifications } from './components/EducationCertifications';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved !== null ? saved === 'dark' : true;
  });

  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleSelectProjectById = (projectId: string) => {
    const p = PROJECTS.find(item => item.id === projectId || item.title.toLowerCase().includes(projectId.toLowerCase()));
    if (p) {
      setSelectedProject(p);
    } else {
      setSelectedProject(PROJECTS[0]);
    }
  };

  return (
    <div className={`min-h-screen selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
      isDark ? 'bg-neutral-950 text-neutral-100 dark' : 'bg-neutral-50 text-neutral-900'
    }`}>
      {/* Navigation */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)}
          isDark={isDark}
        />

        <RecruiterMatcher 
          onSelectProject={handleSelectProjectById}
          isDark={isDark}
        />

        <ProjectsSection 
          onSelectProject={(project) => setSelectedProject(project)}
          isDark={isDark}
        />

        <DsaVisualizer 
          isDark={isDark}
        />

        <SkillsSection 
          isDark={isDark}
        />

        <EducationCertifications 
          isDark={isDark}
        />

        <ContactSection 
          isDark={isDark}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenResume={() => setIsResumeOpen(true)}
        isDark={isDark}
      />

      {/* Interactive Project Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isDark={isDark}
      />

      {/* ATS Printable Resume Dialog */}
      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}
