import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  FileText, 
  MapPin, 
  GraduationCap, 
  Award,
  ArrowDown
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenResume: () => void;
  isDark: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, isDark }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.cleanPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleHireTrigger = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    window.open(PERSONAL_INFO.whatsappUrl, '_blank');
  };

  return (
    <section id="overview" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Subtle background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/10 via-emerald-600/5 to-transparent blur-3xl -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top availability & location line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mb-6">
          <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Seeking Software Engineering & Web Development Internships</span>
          </div>
          <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
            <span>{PERSONAL_INFO.cityRegion}</span>
          </div>
          <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
            <span>B.Tech CSE (2024–2028)</span>
          </div>
        </div>

        {/* Primary Headline & Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Hi, I’m <span className="text-blue-600 dark:text-blue-400">{PERSONAL_INFO.name}</span>.
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-700 dark:text-neutral-300">
                Full-Stack Developer & Computer Science Student.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Undergraduate at <strong>{PERSONAL_INFO.college}</strong> (Class of 2028). I build production-ready full-stack applications with <strong>React</strong>, <strong>Node.js</strong>, <strong>Tailwind CSS</strong>, and solid <strong>Java & C</strong> foundations. Certified by <strong>Microsoft Partner</strong> & <strong>HackerRank</strong>.
            </p>

            {/* Direct Contact CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleHireTrigger}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={onOpenResume}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-neutral-700 bg-neutral-900 text-neutral-100 hover:bg-neutral-800'
                    : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>View Complete Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300'
                }`}
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick 1-click Contact Strip for Busy Recruiters */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Quick Recruiter Reach-Out
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <a 
                    href={`tel:${PERSONAL_INFO.cleanPhone}`}
                    className="font-mono text-neutral-800 dark:text-neutral-200 hover:text-blue-500 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    title="Copy phone number"
                    className="p-1 hover:text-blue-500 transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                  </button>
                  {copiedPhone && <span className="text-xs text-emerald-500">Copied!</span>}
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono text-neutral-800 dark:text-neutral-200 hover:text-blue-500 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    className="p-1 hover:text-blue-500 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                  </button>
                  {copiedEmail && <span className="text-xs text-emerald-500">Copied!</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recruiter Highlights Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/40">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Candidate Snapshot
                </span>
                <span className="text-xs font-medium text-blue-500">
                  Fresher / Intern Ready
                </span>
              </div>

              <div className="divide-y divide-neutral-800/40 space-y-3 pt-3">
                <div className="pt-2">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Current Education</div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    B.Tech in CSE (2024–2028)
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Bansal Institute of Research & Technology, Bhopal
                  </div>
                </div>

                <div className="pt-3">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Core Tech Stack</div>
                  <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 mt-1 flex flex-wrap gap-x-2 gap-y-1">
                    <span>React.js</span>
                    <span className="text-neutral-500">·</span>
                    <span>Node.js</span>
                    <span className="text-neutral-500">·</span>
                    <span>Java</span>
                    <span className="text-neutral-500">·</span>
                    <span>C</span>
                    <span className="text-neutral-500">·</span>
                    <span>Tailwind CSS</span>
                    <span className="text-neutral-500">·</span>
                    <span>MongoDB / SQL</span>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Key Certifications</div>
                  <div className="space-y-1.5 mt-1.5">
                    <div className="flex items-start gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                      <Award className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>Microsoft Partner Certified Full Stack Web Dev</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-neutral-800 dark:text-neutral-200">
                      <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>HackerRank Software Engineer & Problem Solving</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Target Role</div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-neutral-200 mt-0.5">
                    Full-Stack Intern / Frontend Intern / Software Engineer Intern
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <a 
              href="#role-match" 
              className="flex items-center justify-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 py-1 transition-colors"
            >
              <span>Explore Role Alignment & Projects</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
