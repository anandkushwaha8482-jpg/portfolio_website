import { Project, SkillCategory, Certification, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Anand Kushwaha',
  title: 'Full-Stack Web Developer & B.Tech CSE Student',
  roleStatus: 'Looking for Internship / Entry-Level Software Engineering',
  tagline: 'Building scalable, responsive web applications with React, Node.js, and solid Computer Science fundamentals.',
  phone: '+91 6269125842',
  cleanPhone: '6269125842',
  email: 'anandkushwaha8482@gmail.com',
  location: 'Madhya Pradesh, India',
  cityRegion: 'Bhopal, Madhya Pradesh',
  college: 'Bansal Institute of Research and Technology',
  collegeShort: 'BIRT Bhopal',
  gradYear: '2028',
  githubUrl: 'https://github.com/anandkushwaha8482-jpg',
  linkedinUrl: 'https://www.linkedin.com/in/anand-kushwaha-b34571332',
  whatsappUrl: 'https://wa.me/916269125842?text=Hi%20Anand%2C%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20internship%20opportunity!',
  bio: `I am a Computer Science & Engineering undergraduate at Bansal Institute of Research and Technology (Class of 2028) with a relentless passion for building full-stack web applications and solving computational problems. Skilled in React, Node.js, JavaScript, Java, and C, I combine clean frontend design with robust RESTful backend architectures. I am actively seeking an internship where I can contribute to production-grade software and grow alongside experienced engineers.`
};

export const PROJECTS: Project[] = [
  {
    id: 'devconnect-hub',
    title: 'DevConnect Hub',
    subtitle: 'Community Platform for Student Engineers & Project Collaborators',
    category: 'Full-Stack',
    featured: true,
    description:
      'A full-stack collaborative platform designed for student developers to showcase technical projects, find hackathon teammates, share verified code snippets, and receive peer reviews.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/anandkushwaha8482-jpg',
    interactiveType: 'devconnect',
    metrics: [
      { label: 'API Response Time', value: '< 95ms' },
      { label: 'Component Reusability', value: '88%' },
      { label: 'Security & Auth', value: 'JWT + Bcrypt' }
    ],
    highlights: [
      'Engineered RESTful endpoints in Node.js/Express for user authentication, project publication, and structured peer comments.',
      'Designed responsive UI using React and Tailwind CSS with instant category filtering and real-time upvote updates.',
      'Implemented MongoDB schemas with indexing on tags and authors for optimized query retrieval.'
    ],
    architecture: [
      'Client: React 19 SPA with modular component hierarchy, custom hooks for API state, and Tailwind CSS.',
      'Server: Express.js server providing REST API endpoints with middleware validation and error handling.',
      'Data Layer: MongoDB document store with Mongoose schema modeling and relationship referencing.'
    ]
  },
  {
    id: 'swiftcart-ecommerce',
    title: 'SwiftCart Storefront & Checkout',
    subtitle: 'High-Performance E-Commerce Experience with Real-Time Cart Engine',
    category: 'Full-Stack',
    featured: true,
    description:
      'A full-featured e-commerce web application featuring live product filtering, client-side cart synchronization with LocalStorage, simulated checkout flow with discount coupon validation, and order management.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'REST API'],
    githubUrl: 'https://github.com/anandkushwaha8482-jpg',
    interactiveType: 'ecommerce',
    metrics: [
      { label: 'Lighthouse Performance', value: '98/100' },
      { label: 'Cart State Latency', value: '0ms (Instant)' },
      { label: 'Responsive Coverage', value: 'Mobile to 4K' }
    ],
    highlights: [
      'Architected centralized cart state with optimistic UI updates and persistent storage synchronization.',
      'Implemented dynamic filtering across categories, price range sliders, and multi-criteria search.',
      'Integrated checkout step simulation including delivery address verification and simulated transaction confirmation.'
    ],
    architecture: [
      'State: React Context + Reducer pattern for cart persistence and total calculations.',
      'UI: Tailwind utility classes with zero external UI bloat for rapid sub-second render times.',
      'Backend: Node.js API mock service handling product catalog queries and inventory state.'
    ]
  },
  {
    id: 'taskmatrix-kanban',
    title: 'TaskMatrix Sprint Board',
    subtitle: 'Agile Workflow & Task Management Engine for Dev Sprints',
    category: 'Frontend',
    featured: true,
    description:
      'A streamlined Kanban and sprint tracker built for fast-moving engineering teams. Supports drag-and-drop task progression, priority tagging, sprint estimation, and offline persistence.',
    tags: ['React', 'Tailwind CSS', 'LocalStorage API', 'State Management'],
    githubUrl: 'https://github.com/anandkushwaha8482-jpg',
    interactiveType: 'taskmatrix',
    metrics: [
      { label: 'State Sync', value: 'Instant Local' },
      { label: 'Bundle Footprint', value: '< 45 KB' },
      { label: 'Keyboard Shortcuts', value: 'Supported' }
    ],
    highlights: [
      'Built multi-column workflow board (Backlog, In Progress, Review, Completed) with drag & move mechanics.',
      'Added priority indicators (High, Medium, Normal) and estimation tags to evaluate sprint velocity.',
      'Built-in data export and restore feature for easy backup across browser sessions.'
    ],
    architecture: [
      'Columnar state architecture managing task transitions between lifecycle states.',
      'Debounced LocalStorage persistence preventing loss of data on page refreshes.',
      'Accessible keyboard triggers for task creation and column status movement.'
    ]
  },
  {
    id: 'algorithmiq-lab',
    title: 'Algorithmiq DSA Lab',
    subtitle: 'Interactive Algorithm Visualizer & Complexity Comparator',
    category: 'Algorithms',
    featured: true,
    description:
      'An interactive visual testing laboratory for core Computer Science sorting and search algorithms. Demonstrates deep understanding of algorithmic complexities, array partitioning, and recursive mechanics.',
    tags: ['Java Logic', 'JavaScript', 'React', 'Data Structures', 'Algorithms'],
    githubUrl: 'https://github.com/anandkushwaha8482-jpg',
    metrics: [
      { label: 'Visualized Algos', value: 'Bubble, Selection, Quick' },
      { label: 'Step Resolution', value: 'Real-time Canvas' },
      { label: 'Theoretical Match', value: 'O(N²) & O(N log N)' }
    ],
    highlights: [
      'Developed visual playback controller with variable speed (10ms to 500ms) and step-by-step frame inspection.',
      'Color-coded comparison states highlighting current pivot, swap targets, and sorted indices.',
      'Detailed complexity comparison panel showing best, average, and worst-case bounds alongside space complexity.'
    ],
    architecture: [
      'Algorithm generation engine producing sequential action frames (compare, swap, lock).',
      'Asynchronous scheduler executing visual transitions with cancellation on reset.',
      'Mathematical model mirroring textbook Java implementations of standard sorting routines.'
    ]
  },
  {
    id: 'quickshare-pastebin',
    title: 'CodeVault Snippet Sharing',
    subtitle: 'Lightweight Code Sharing & Developer Notes Utility',
    category: 'API & System',
    featured: false,
    description:
      'A developer-centric snippet sharing service allowing quick formatting, syntax identification, 1-click clipboard copy, and formatted Markdown rendering.',
    tags: ['Node.js', 'Express', 'React', 'REST API', 'CSS3'],
    githubUrl: 'https://github.com/anandkushwaha8482-jpg',
    interactiveType: 'pastebin',
    metrics: [
      { label: 'Supported Syntaxes', value: 'JS, Java, C, HTML, CSS' },
      { label: 'Load Latency', value: '< 80ms' },
      { label: 'Theme Support', value: 'Dark / Light' }
    ],
    highlights: [
      'Constructed syntax-friendly text viewer with line numbering and monospace alignment.',
      'Integrated quick share link generator and 1-click clipboard integration.',
      'Clean editorial layout designed for sharing code snippets on Discord, WhatsApp, and Slack.'
    ],
    architecture: [
      'Client text processor with line splitting and token formatting.',
      'Lightweight storage schema for snippet payload and expiration flags.'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core languages utilized for software development, data structures, and algorithmic problem solving.',
    skills: [
      { name: 'Java', level: 'Core', experience: 'OOP, Collections, DSA, HackerRank Verified', context: 'Data Structures, Algorithmic Problem Solving' },
      { name: 'JavaScript (ES6+)', level: 'Proficient', experience: 'Async/Await, Closures, DOM, Modules', context: 'Frontend SPAs & Node.js Backend' },
      { name: 'C Language', level: 'Academic Core', experience: 'Pointers, Memory, Data Structures', context: 'Systems Foundations & Academic CS' },
      { name: 'HTML5 & Semantic Web', level: 'Proficient', experience: 'Accessibility, Semantic Structure, SEO', context: 'All Web Projects' },
      { name: 'CSS3 & Modern Layouts', level: 'Proficient', experience: 'Flexbox, CSS Grid, Responsive Design', context: 'Custom Component Styling' }
    ]
  },
  {
    title: 'Frontend & UI Engineering',
    description: 'Modern libraries and methodologies for crafting interactive, accessible user experiences.',
    skills: [
      { name: 'React.js', level: 'Proficient', experience: 'Hooks, Component Lifecycle, State Management', context: 'DevConnect, SwiftCart, TaskMatrix' },
      { name: 'Tailwind CSS', level: 'Proficient', experience: 'Utility-first architecture, Responsive UI', context: 'Production Web Applications' },
      { name: 'Responsive Web Design', level: 'Proficient', experience: 'Mobile-first layouts, Breakpoints, Fluid UI', context: 'Cross-device compatibility' },
      { name: 'State Management', level: 'Hands-on', experience: 'Context API, Reducer Pattern, LocalStorage', context: 'E-commerce cart, Kanban state' },
      { name: 'DOM Manipulation & APIs', level: 'Proficient', experience: 'Event handling, Web Storage, Canvas', context: 'DSA Visualizer, Form Handlers' }
    ]
  },
  {
    title: 'Backend & Database Systems',
    description: 'Server architectures, RESTful API design, and data persistence models.',
    skills: [
      { name: 'Node.js', level: 'Hands-on', experience: 'Event loop, HTTP modules, NPM ecosystem', context: 'Backend REST API services' },
      { name: 'Express.js', level: 'Hands-on', experience: 'Routing, Middleware, Request validation', context: 'DevConnect & SwiftCart APIs' },
      { name: 'RESTful API Architecture', level: 'Hands-on', experience: 'CRUD endpoints, HTTP status codes, JSON', context: 'Client-server data interchange' },
      { name: 'MongoDB / NoSQL', level: 'Familiar', experience: 'Collections, Document modeling, CRUD', context: 'DevConnect User & Post models' },
      { name: 'MySQL / Relational SQL', level: 'Familiar', experience: 'Schema design, Queries, Foreign keys', context: 'Database Management Coursework' }
    ]
  },
  {
    title: 'Developer Tools & Workflows',
    description: 'Industry-standard tooling for source control, collaboration, and debugging.',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient', experience: 'Branching, Commits, Pull Requests, Merges', context: 'Version control for all repositories' },
      { name: 'VS Code', level: 'Proficient', experience: 'Extensions, Debugger, Linting, Snippets', context: 'Primary development IDE' },
      { name: 'Postman', level: 'Hands-on', experience: 'API endpoint testing, JSON payload testing', context: 'Backend endpoint verification' },
      { name: 'Vite & NPM', level: 'Proficient', experience: 'Modern bundler configuration, scripts', context: 'Fast development server builds' },
      { name: 'Chrome DevTools', level: 'Proficient', experience: 'Console, Network tab, Elements inspection', context: 'Frontend debugging and profiling' }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Technology (B.Tech) — Computer Science & Engineering',
    institution: 'Bansal Institute of Research and Technology (BIRT)',
    location: 'Bhopal, Madhya Pradesh',
    duration: '2024 – 2028 (Expected)',
    grade: 'Current CGPA: 6.9',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java)',
      'Database Management Systems (DBMS)',
      'Web Technologies & Internet Programming',
      'Computer Organization & Architecture',
      'Operating Systems Fundamentals'
    ],
    achievements: [
      'Active participant in institute coding hackathons and technical symposiums.',
      'Consistently developing full-stack applications alongside academic curriculum.',
      'Building public open-source project portfolio on GitHub.'
    ]
  },
  {
    degree: 'Higher Secondary Certificate (Class 12th) — Science Stream',
    institution: 'Govt Higher Secondary School',
    location: 'Lakhanguwan, Madhya Pradesh',
    duration: 'Completed',
    grade: 'First Division with Distinction',
    coursework: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Fundamentals'],
    achievements: ['Solid foundation in analytical problem solving and quantitative reasoning.']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-ms-fullstack',
    title: 'Full Stack Web Development Professional',
    issuer: 'Microsoft Partner Program / Certified Course',
    date: 'Certified 2025',
    skillsCovered: ['HTML5', 'CSS3', 'Modern JavaScript', 'React', 'Node.js', 'REST APIs', 'Cloud Essentials'],
    summary:
      'Rigorous curriculum covering end-to-end web application development, responsive UI engineering, component architecture, server-side programming, and cloud deployment principles.'
  },
  {
    id: 'cert-hackerrank-swe',
    title: 'Software Engineer & Problem Solving Certificate',
    issuer: 'HackerRank',
    date: 'Certified 2025',
    skillsCovered: ['Problem Solving', 'Data Structures', 'Java Algorithms', 'Time Complexity Analysis'],
    summary:
      'Verified competency in data structure manipulation, array sorting, string algorithms, and optimal problem-solving techniques under timed execution constraints.'
  },
  {
    id: 'cert-college-hackathon',
    title: 'College Hackathon Finalist & Innovator Award',
    issuer: 'Bansal Institute of Research and Technology (BIRT)',
    date: 'Annual TechFest',
    skillsCovered: ['Rapid Prototyping', 'Team Collaboration', 'Full-Stack Integration', 'Pitch Presentation'],
    summary:
      'Recognized for developing and pitching a functional prototype within a fast-paced hackathon sprint, collaborating with peer developers under strict deadline pressure.'
  }
];

export const RECRUITER_MATCH_ROLES = [
  {
    id: 'full-stack',
    title: 'Full-Stack Developer Intern',
    tagline: 'End-to-End MERN Development & REST Architecture',
    matchScore: '98%',
    keyMatches: [
      'Hands-on React 19 frontend development with Tailwind CSS',
      'Node.js & Express.js REST API creation and endpoint testing',
      'Database schema modeling with MongoDB and MySQL basics',
      'Microsoft Partner Certified Full Stack curriculum background'
    ],
    recommendedProject: 'DevConnect Hub & SwiftCart',
    actionPrompt: 'Discuss Full-Stack Internship'
  },
  {
    id: 'frontend',
    title: 'Frontend React Developer Intern',
    tagline: 'Modern UI/UX, Component Systems & Client State',
    matchScore: '96%',
    keyMatches: [
      'Strong proficiency in React hooks, context, and responsive design',
      'Clean, accessible CSS styling with Tailwind without external UI bloat',
      'Interactive state management and offline LocalStorage persistence',
      'High-speed UI optimization and Lighthouse 95+ performance awareness'
    ],
    recommendedProject: 'SwiftCart & TaskMatrix Sprint Board',
    actionPrompt: 'Discuss Frontend Internship'
  },
  {
    id: 'software-engineer',
    title: 'Junior Software Engineer / Java Intern',
    tagline: 'Core CS Foundations, OOP, Data Structures & Logic',
    matchScore: '94%',
    keyMatches: [
      'HackerRank Certified in Problem Solving & Software Engineering',
      'Solid Java OOP principles, encapsulation, inheritance, and collections',
      'C programming knowledge for low-level memory and algorithmic understanding',
      'B.Tech Computer Science student with fast adaptability'
    ],
    recommendedProject: 'Algorithmiq DSA Lab',
    actionPrompt: 'Discuss Software Engineering Role'
  }
];
