import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  FileText, 
  MessageSquare, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  onOpenResume: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, isDark, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Role Match', href: '#role-match' },
    { label: 'Projects', href: '#projects' },
    { label: 'DSA Lab', href: '#dsa-lab' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education & Certs', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? isDark 
            ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 shadow-lg shadow-black/20' 
            : 'bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#overview" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            AK
          </div>
          <div>
            <div className={`text-sm font-semibold tracking-tight transition-colors ${
              isDark ? 'text-neutral-100 group-hover:text-blue-400' : 'text-neutral-900 group-hover:text-blue-600'
            }`}>
              {PERSONAL_INFO.name}
            </div>
            <div className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              B.Tech CSE · Class of {PERSONAL_INFO.gradYear}
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* GitHub */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-neutral-400 hover:text-yellow-400 hover:bg-neutral-800' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Modal Button */}
          <button
            onClick={onOpenResume}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isDark 
                ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:text-white' 
                : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Resume</span>
          </button>

          {/* WhatsApp Direct CTA */}
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-1">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`p-2 rounded-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`sm:hidden border-b px-4 pt-2 pb-6 space-y-3 ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${
                  isDark ? 'text-neutral-300 hover:bg-neutral-900' : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border border-neutral-700 text-neutral-200"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>View Resume</span>
            </button>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
