export const PERSONAL_INFO = {
  monogram: 'JM',
  brandName: 'JERIN MATHEW',
  firstName: 'Jerin',
  lastName: 'Mathew',
  fullName: 'Jerin Thomas Mathew',
  tagline: 'MCA STUDENT | AI & ML | CLOUD COMPUTING',
  defaultEmail: 'jerinthomas562@gmail.com',
  phoneDisplay: '+91 9446286144',
  phoneHref: 'tel:9446286144',
  location: 'Thiruvalla, Kerala, India',
  linkedinUrl: 'https://www.linkedin.com/in/jerin-thomas-mathew-93268b242/',
  githubUrl: 'https://github.com/jerin562',
  githubUsername: 'jerin562',
  portraitPath: '/assets/jerin-cutout.png',
  originalPhotoPath: '/assets/aistudio/Picsart_25-03-14_16-57-21-608_e0ccdfa7.jpg',
  resumeDocxPath: '/assets/Jerin_Thomas_Mathew_Resume.docx',
  resumeDocxFilename: 'Jerin_Thomas_Mathew_Resume.docx',
  resumePdfPath: '/assets/aistudio/RESUME_MAIN_0daa6b2d.pdf',
  resumePdfFilename: 'Jerin_Thomas_Mathew_Resume.pdf',
};

export const HERO_ROTATING_TITLES: [string, string][] = [
  ['AI & ML', 'Enthusiast'],
  ['Technology', 'Explorer'],
  ['Creative', 'Problem Solver'],
];

export const ABOUT_COPY = {
  paragraphs: [
    "I'm Jerin Thomas Mathew, an MCA student with a background in Business Administration. I'm interested in exploring how technology, artificial intelligence and business thinking can come together to solve real-world problems.",
    "My journey combines management experience, technology exploration, and structured problem solving as I continue learning and building modern software solutions.",
  ],
  resumeSummary:
    'MCA student specialising in Artificial Intelligence and Machine Learning and Cloud Computing, with a Bachelor of Business Administration and professional experience in reporting, data management, recruitment coordination and employee administration.',
};

export interface ProjectItem {
  id: 'zovty' | 'hrms' | 'aurel-commerce';
  number: string;
  title: string;
  category: string;
  status?: 'WORK IN PROGRESS';
  description: string;
  githubUrl?: string;
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'zovty',
    number: '01',
    title: 'ZOVTY',
    category: 'FinTech / Application Development',
    status: 'WORK IN PROGRESS',
    description:
      'A project currently under development, exploring innovative approaches to personal financial management.',
  },
  {
    id: 'hrms',
    number: '02',
    title: 'HRMS',
    category: 'HR Technology',
    status: 'WORK IN PROGRESS',
    description:
      'An ongoing project focused on exploring digital solutions for organizational and employee management.',
  },
  {
    id: 'aurel-commerce',
    number: '03',
    title: 'AUREL COMMERCE',
    category: 'E-commerce / Web Development',
    description:
      'An e-commerce website project focused on creating a modern online shopping experience.',
    githubUrl: 'https://github.com/jerin562/aurel-commerce',
  },
];

export const EXPERIENCE_DATA = [
  {
    role: 'HR Assistant',
    organization: 'PowerVision TV Studio, Vennikulam',
    period: 'May 2025 – June 2026',
    responsibilities: [
      'Employee attendance records',
      'Employee information management',
      'Daily and monthly report verification',
      'Candidate screening and shortlisting',
      'Interview coordination',
      'Payroll preparation assistance',
      'Leave processing',
      'Travel allowance documentation',
      'Confidential HR records',
    ],
  },
];

export const EDUCATION_DATA = [
  {
    id: 'mca',
    degree: 'MCA — Master of Computer Applications',
    defaultInstitution: 'Lead College Autonomous',
    period: '2026 – Present',
    focus: 'Specialisation: Artificial Intelligence and Machine Learning, Cloud Computing',
    status: 'Currently pursuing',
    editableInstitution: true,
  },
  {
    id: 'bba',
    degree: 'BBA — Bachelor of Business Administration',
    defaultInstitution: 'Mahatma Gandhi University',
    period: '2022 – 2025',
    focus: 'Business Administration',
    status: 'Completed',
    editableInstitution: false,
  },
];

export interface SkillCategory {
  number: string;
  title: string;
  items: string[];
}

export const TECHNICAL_SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: '01',
    title: 'Programming',
    items: ['Python', 'Java (academic practice)'],
  },
  {
    number: '02',
    title: 'Technical Knowledge',
    items: ['AI and ML concepts', 'Cloud Computing coursework'],
  },
  {
    number: '03',
    title: 'Application Development',
    items: ['Flutter (learning/practice)'],
  },
  {
    number: '04',
    title: 'Tools',
    items: ['Visual Studio Code', 'Android Studio', 'Google Sheets'],
  },
];

export const SOFT_SKILLS = [
  'Communication',
  'Teamwork',
  'Leadership',
  'Adaptability',
  'Analytical thinking',
  'Strategic problem-solving',
  'Time management',
  'Multitasking',
  'Coordination',
];

export const LANGUAGES = ['English', 'Malayalam', 'Hindi', 'Tamil'];

export const CERTIFICATIONS = [
  {
    title: 'Offenso Certified Security Analyst (OCSA)',
    issuer: 'Offenso Hackers Academy',
  },
  {
    title: 'HR Management Assessment',
    issuer: 'LearnTube',
  },
  {
    title: 'Warehouse Management',
    issuer: 'Alison',
  },
  {
    title: 'Digital Marketing Fundamentals',
    issuer: 'IIDE',
  },
];
