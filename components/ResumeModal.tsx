import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EDUCATION, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Printer, Copy, Check, Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, isDark }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSimulation = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const handleCopyText = () => {
    const resumePlainText = `
=========================================
ANAND KUSHWAHA - RESUME
=========================================
Full-Stack Web Developer & B.Tech CSE Student (Class of 2028)
Bansal Institute of Research and Technology (BIRT), Bhopal, MP
Phone: ${PERSONAL_INFO.phone}
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.githubUrl}
LinkedIn: ${PERSONAL_INFO.linkedinUrl}

PROFESSIONAL SUMMARY:
${PERSONAL_INFO.bio}

EDUCATION:
- B.Tech in Computer Science & Engineering (2024 - 2028)
  Bansal Institute of Research and Technology, Bhopal, MP | CGPA: 6.9
- Higher Secondary (12th Science Stream)
  Govt Higher Secondary School, Lakhanguwan, MP

TECHNICAL SKILLS:
- Languages: Java, JavaScript (ES6+), C, SQL, HTML5, CSS3
- Frontend: React.js, Tailwind CSS, Component Architecture, Responsive Web
- Backend: Node.js, Express.js, RESTful APIs, MongoDB, MySQL
- Developer Tools: Git, GitHub, VS Code, Postman, Vite, NPM

FEATURED PROJECTS:
1. DevConnect Hub: Full-Stack MERN collaboration and developer showcase platform
2. SwiftCart: High-performance React e-commerce web application with live cart engine
3. TaskMatrix: Agile Kanban sprint board with state persistence
4. Algorithmiq DSA Lab: Interactive sorting and searching algorithms visualizer

CERTIFICATIONS & ACHIEVEMENTS:
- Microsoft Partner Certified Full Stack Web Development Professional
- HackerRank Certified Software Engineer & Problem Solving
- College Hackathon Finalist & Developer Award (BIRT TechFest)
=========================================
`;
    navigator.clipboard.writeText(resumePlainText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:fixed-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl my-auto rounded-2xl border shadow-2xl overflow-hidden transition-all max-h-[92vh] flex flex-col bg-white text-neutral-900 border-neutral-300 print:max-h-none print:shadow-none print:border-none print:m-0 print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden in Print) */}
        <div className="p-4 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-neutral-900">
              Curriculum Vitae / ATS Resume
            </span>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              · Ready for Print & PDF Export
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Plain Text' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-neutral-900 bg-white leading-normal text-xs sm:text-sm font-sans">
          {/* Header */}
          <div className="text-center pb-4 border-b border-neutral-300 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <div className="text-xs sm:text-sm font-semibold text-neutral-700">
              Full-Stack Web Developer & B.Tech CSE Undergraduate (Class of 2028)
            </div>

            {/* Contact Strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-600 font-mono pt-1">
              <a href={`tel:${PERSONAL_INFO.cleanPhone}`} className="hover:text-blue-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-blue-600 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>·</span>
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                <GithubIcon className="w-3 h-3" />
                <span>GitHub</span>
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-200 pb-0.5">
              Professional Summary
            </h2>
            <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
              Motivated Computer Science & Engineering undergraduate at Bansal Institute of Research and Technology (2024–2028) with practical expertise in React.js, Node.js, Express, Java, and C. Possesses strong foundations in Data Structures, Algorithms, and Object-Oriented Programming, validated by Microsoft Partner and HackerRank certifications. Actively seeking a Software Engineering / Full-Stack Web Development Internship to build impactful software products.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-200 pb-0.5">
              Technical Core Competencies
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-neutral-800">
              <div>
                <strong>Languages:</strong> Java (OOP, Collections, Algorithms), JavaScript (ES6+), C, SQL, HTML5, CSS3
              </div>
              <div>
                <strong>Frontend:</strong> React.js, Tailwind CSS, Responsive Design, State Management (Context / Reducer), DOM APIs
              </div>
              <div>
                <strong>Backend & Databases:</strong> Node.js, Express.js, RESTful API Design, MongoDB (NoSQL), MySQL (Relational)
              </div>
              <div>
                <strong>Developer Tools & Workflows:</strong> Git, GitHub, VS Code, Postman, Vite, NPM, Chrome DevTools
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-200 pb-0.5">
              Education
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-neutral-950">Bansal Institute of Research and Technology (BIRT)</strong>
                    <div className="text-xs text-neutral-700">Bachelor of Technology (B.Tech) — Computer Science & Engineering</div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-mono">2024 – 2028</span>
                    <div className="font-semibold text-neutral-800">CGPA: 6.9</div>
                  </div>
                </div>
                <div className="text-xs text-neutral-600 mt-0.5">
                  Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java), DBMS, Computer Networks, Operating Systems.
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-neutral-950">Govt Higher Secondary School</strong>
                    <div className="text-xs text-neutral-700">Higher Secondary Examination (Class 12th) — Science & Mathematics Stream</div>
                  </div>
                  <div className="text-right text-xs font-mono">
                    Lakhanguwan, MP
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-200 pb-0.5">
              Engineering Projects
            </h2>

            <div className="space-y-3">
              {PROJECTS.slice(0, 3).map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-neutral-950">{proj.title}</strong>
                    <span className="text-xs font-mono text-neutral-600">{proj.tags.slice(0, 4).join(' · ')}</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-neutral-700">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Achievements */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-200 pb-0.5">
              Certifications & Honors
            </h2>
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-700">
              <li>
                <strong>Full Stack Web Development Professional:</strong> Certified through Microsoft Partner Program curriculum (React, Node.js, REST APIs).
              </li>
              <li>
                <strong>Software Engineer & Problem Solving Certificate:</strong> HackerRank verified for algorithmic proficiency in Java and data structures.
              </li>
              <li>
                <strong>College Hackathon Finalist & Innovator:</strong> Recognized at Bansal Institute of Research & Technology for developing rapid prototype within team sprint.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
