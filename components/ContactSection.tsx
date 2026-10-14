import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    roleType: 'Full-Stack Developer Intern',
    message: ''
  });

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    // Also offer direct WhatsApp bridge
    const summaryMsg = encodeURIComponent(
      `Hello Anand, I am ${formData.name} from ${formData.company || 'our company'}. We're considering you for a ${formData.roleType} position. Message: ${formData.message}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/916269125842?text=${summaryMsg}`, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 border-t border-neutral-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Immediate Response Guaranteed</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            04. Let’s Connect & Build Together
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
            I am actively interviewing for software engineering and full-stack internships. Reach out via WhatsApp, phone, or email to schedule an interview or technical discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Card */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/40">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Fastest Response (Under 1 Hour)
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="pt-4 space-y-3">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <span>WhatsApp Direct Chat</span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Click to open a pre-filled direct conversation with Anand on WhatsApp.
                </p>

                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 transition-all hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp (+91 6269125842)</span>
                </a>
              </div>
            </div>

            {/* Direct Phone & Email Cards */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 pb-2 border-b border-neutral-800/40">
                Direct Contact Information
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400">Direct Calling</div>
                    <a href={`tel:${PERSONAL_INFO.cleanPhone}`} className="text-xs sm:text-sm font-mono font-semibold text-neutral-900 dark:text-white hover:text-blue-500">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-neutral-400">Email Address</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-mono font-semibold text-neutral-900 dark:text-white hover:text-blue-500">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-lg bg-neutral-800/60 text-neutral-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400">Current Base</div>
                  <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    {PERSONAL_INFO.location} · Open to Remote & Relocation
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={`p-4 rounded-xl border flex items-center justify-around gap-4 text-xs ${
              isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <a 
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
              <span className="text-neutral-600">·</span>
              <a 
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-neutral-400 hover:text-blue-400 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Hiring Inquiry Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
            }`}>
              <div className="pb-4 border-b border-neutral-800/40 mb-6">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Send Direct Hiring Inquiry
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Fill in your details below to send a formal message and launch instant WhatsApp confirmation.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                    Thank you! Connecting you with Anand...
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    Your inquiry for <strong>{formData.roleType}</strong> has been prepared. WhatsApp is opening with your formatted message.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        Your Name / Recruiter Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-100' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TechCorp, Startup Labs"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-100' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        Your Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="recruiter@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-100' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        Open Position / Role Type
                      </label>
                      <select
                        value={formData.roleType}
                        onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-100' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                      >
                        <option value="Full-Stack Developer Intern">Full-Stack Developer Intern</option>
                        <option value="Frontend React Developer Intern">Frontend React Developer Intern</option>
                        <option value="Backend Node.js Developer Intern">Backend Node.js Developer Intern</option>
                        <option value="Software Engineer Intern (Java/C)">Software Engineer Intern (Java/C)</option>
                        <option value="Freelance / Contract Project">Freelance / Contract Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                      Message / Project Scope / Interview Timings
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Hi Anand, we checked your portfolio and would like to invite you for an interview..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-100' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/20 transition-all hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry & Open WhatsApp Chat</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
