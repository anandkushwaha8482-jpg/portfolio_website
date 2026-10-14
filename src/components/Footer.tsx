import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MessageSquare, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, isDark }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 transition-colors ${
      isDark ? 'border-neutral-800/80 bg-neutral-950 text-neutral-400' : 'border-neutral-200 bg-neutral-50 text-neutral-600'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900 dark:text-white text-base">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs text-neutral-500">
                B.Tech CSE (2024–2028), BIRT Bhopal
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Building scalable web software with React, Node.js, Java, and modern web architectures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="text-xs hover:text-blue-500 transition-colors"
            >
              Resume
            </button>
            <span className="text-neutral-600">·</span>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-neutral-600">·</span>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Anand Kushwaha. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
