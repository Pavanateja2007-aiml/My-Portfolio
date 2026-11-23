export interface TerminalStatusRow {
  key: string;
  value: string;
  detail: string;
}

export interface CurrentlyItem {
  id: string;
  topic: string;
  status: 'LEARNING' | 'EXPLORING' | 'EXPERIMENTING' | 'BUILDING' | 'IMPROVING';
  note: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  context: string;
  detail: string;
  linkLabel?: string;
  href?: string;
  internalAnchor?: string;
}

export const PROFILE = {
  name: 'Pavanateja',
  fullName: 'V V S M Pavanateja',
  brandWordmark: 'PAVANATEJA',
  brandSubtitle: 'Personal AI Lab',
  location: 'India',
  email: 'pavanatejavemuri2007@gmail.com',
  githubUrl: 'https://github.com/Pavanateja2007-aiml',
  linkedinUrl: 'https://www.linkedin.com/in/vvsmpt-aiml',
  portraitSrc: '/images/pavanateja-portrait.png',
  portraitAlt: 'High-contrast black-and-white studio portrait of Pavanateja',
  heroHeadlineLine1: 'I build things that think.',
  heroHeadlineLine2: 'And things that make me think.',
  heroDescription:
    'Curiosity has no off switch. I explore ideas, experiment with technology, and build things that make me think.',
  heroKicker: 'B.Sc. Artificial Intelligence · India',
  aboutHeading: 'A curious mind with a terminal open.',
  aboutParagraphs: [
    "I've never been particularly good at leaving a question unanswered. Why does a model make that prediction? What's happening underneath the abstraction? Can this idea actually work outside a notebook?",
    "That curiosity pulled me into Artificial Intelligence, programming, data, and building things. I learn by exploring. I think by experimenting. I build because I can't leave ideas alone. Still figuring things out. Intentionally.",
  ],
  aboutAttitudeLine: "The syllabus ends. Curiosity doesn't.",
  profileFacts: [
    { label: 'Name', value: 'Pavanateja' },
    { label: 'Location', value: 'Rajahmundry, India' },
    { label: 'Program', value: 'B.Sc. (Hons) Artificial Intelligence' },
    { label: 'Institution', value: 'Government College (Autonomous), Rajahmundry' },
    { label: 'Academic Record', value: 'CGPA 9.35 / 10' },
    { label: 'Current Mode', value: 'Learning / Building' },
    { label: 'Focus Areas', value: 'AI, ML, Data Systems, Automation' },
    { label: 'Fuel', value: 'Curiosity (and stubborn debugging)' },
  ],
  footerQuote: 'Still in development. And that’s the point.',
  footerLoop: ['Learn', 'Question', 'Experiment', 'Build', 'Repeat'],
} as const;

export const TERMINAL_STATUS_ROWS: TerminalStatusRow[] = [
  {
    key: 'status',
    value: 'running',
    detail: 'Active across ML experiments, GenAI prototypes, and full-stack tooling.',
  },
  {
    key: 'assumptions',
    value: 'questioned',
    detail: 'If it works, I want to know why — not just trust the abstraction.',
  },
  {
    key: 'experiments',
    value: 'active',
    detail: 'Neuroimaging classification, agentic workflows, and automated pipelines.',
  },
  {
    key: 'errors',
    value: 'collected',
    detail: 'Errors are evidence. Debugging is investigation.',
  },
  {
    key: 'knowledge',
    value: 'expanding',
    detail: 'Deepening fundamentals in deep learning, RAG systems, and tool-calling agents.',
  },
  {
    key: 'next obsession',
    value: 'unknown',
    detail: 'Usually starts as a late-night question that turns into a repository.',
  },
];

// Single easy-to-update list for the CURRENTLY.EXE panel
export const CURRENTLY_ITEMS: CurrentlyItem[] = [
  {
    id: 'deep-learning',
    topic: 'Deep Learning & Neural Networks',
    status: 'LEARNING',
    note: 'CNN architectures, neuroimaging classification, and representation fundamentals.',
  },
  {
    id: 'genai-llms',
    topic: 'Generative AI & LLMs',
    status: 'EXPLORING',
    note: 'Prompt engineering, grounded retrieval pipelines, and structured generation.',
  },
  {
    id: 'ai-agents',
    topic: 'AI Agents & Tool Calling',
    status: 'EXPERIMENTING',
    note: 'Multi-step reasoning loops, MCP servers, and automated workflow agents.',
  },
  {
    id: 'ai-apps',
    topic: 'AI Application Development',
    status: 'BUILDING',
    note: 'Turning notebooks and model APIs into usable, responsive web software.',
  },
  {
    id: 'python-dsa',
    topic: 'Python & Problem Solving',
    status: 'IMPROVING',
    note: 'Cleaner pipelines, async scripting, and diagnostic evaluation discipline.',
  },
];

export const VERIFIED_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'cgpa',
    title: 'CGPA 9.35 / 10 Academic Standing',
    context: 'Government College (Autonomous), Rajahmundry',
    detail:
      'Consistent academic performance across computational mathematics, machine learning, neural networks, and data science coursework.',
  },
  {
    id: 'hack-the-matrix',
    title: 'Hack The Matrix — Vibe Coding Hackathon',
    context: '1st Place / Finalist · 2026',
    detail:
      'Recognized for rapid end-to-end prototyping and applied AI system building under hackathon constraints.',
  },
  {
    id: 'multi-org-credentials',
    title: 'Verified Industry Specializations',
    context: 'Google · Microsoft · IBM · NVIDIA · Oxford · Vanderbilt',
    detail:
      'Completed multi-course professional certificates spanning AI/ML engineering, RAG & Agentic AI, Data Science, AI Infrastructure, and Prompt Engineering.',
    linkLabel: 'Inspect Certificate Vault',
    internalAnchor: '#certificates',
  },
];
