export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full-Stack' | 'Frontend' | 'Algorithms' | 'API & System';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  highlights: string[];
  architecture: string[];
  interactiveType?: 'ecommerce' | 'taskmatrix' | 'devconnect' | 'pastebin';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Proficient", "Core", "Hands-on"
    context: string; // where used
    experience: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skillsCovered: string[];
  summary: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  coursework: string[];
  achievements?: string[];
}
