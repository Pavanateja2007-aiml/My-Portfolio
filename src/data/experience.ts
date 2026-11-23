export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  dateRange: string;
  status: 'Completed' | 'Ongoing' | 'Project-Based';
  summary: string;
  tasks: string[];
  skills: string[];
  repoUrl?: string;
  certificateImageUrl?: string;
  certificateGithubUrl?: string;
  relatedProjectId?: string;
}

export const JOURNEY_ATTITUDE_LINE =
  "My experience isn't measured only in job titles. It's measured in problems I've attempted and things I've learned to build.";

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: 'amaravathi-r',
    organization: 'Amaravathi Software Innovations Pvt. Ltd.',
    role: 'R Programming Language Intern',
    dateRange: 'May 2026 – June 2026',
    status: 'Completed',
    summary:
      'Built five end-to-end machine learning pipelines in R spanning classification, regression, clustering, and recommendation systems.',
    tasks: [
      'Developed 5 complete ML projects in R: Email Spam Classification, House Price Analysis, Titanic Survival Prediction, Movie Recommendation, and Breast Cancer Classification.',
      'Implemented Naive Bayes, Random Forest, Linear Regression, K-Means Clustering, and matrix factorization with cross-validation and ROC-AUC evaluation.',
      'Produced 50+ ggplot2 diagnostic figures covering confusion matrices, ROC curves, dendrograms, and hyperparameter plots.',
    ],
    skills: ['R', 'caret', 'randomForest', 'e1071', 'recosystem', 'ggplot2', 'dplyr'],
    repoUrl: 'https://github.com/Pavanateja2007-aiml/Programming-With-R',
    certificateImageUrl:
      'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/Internship%20Certificates/13_amaravathi_r_language.png',
    certificateGithubUrl:
      'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/Internship%20Certificates/13_amaravathi_r_language.png',
    relatedProjectId: 'r-statistical-ml-suite',
  },
  {
    id: '1m1b-sustainability',
    organization: '1M1B (1 Million for 1 Billion) · AICTE & IBM',
    role: 'AI & Sustainability Intern (UN SDG 13)',
    dateRange: 'May 2026 – June 2026',
    status: 'Completed',
    summary:
      'Built EcoAction AI, a climate action planning web application translating daily habits into structured UN SDG 13 sustainability recommendations.',
    tasks: [
      'Designed and built EcoAction AI aligned with UN Sustainable Development Goal 13 (Climate Action).',
      'Integrated the Google Gemini API for tailored recommendations across transport, energy, nutrition, and waste.',
      'Implemented full-stack web workflows using React, TypeScript, Node.js, and Express.',
    ],
    skills: ['Google Gemini API', 'React', 'TypeScript', 'Node.js', 'Express'],
    repoUrl:
      'https://github.com/Pavanateja2007-aiml/Internship-Projects/tree/main/1%20MILLION%201%20BILLION%20%26%20IBM-Virtual%20Internship',
    certificateImageUrl:
      'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/Internship%20Certificates/12_1m1b_aicte_ibm_sustainability.png',
    certificateGithubUrl:
      'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/Internship%20Certificates/12_1m1b_aicte_ibm_sustainability.png',
    relatedProjectId: 'ecoaction-ai',
  },
  {
    id: 'edunet-ai',
    organization: 'Edunet Foundation · AICTE & IBM',
    role: 'Artificial Intelligence Virtual Intern',
    dateRange: 'May 2026 – June 2026',
    status: 'Completed',
    summary:
      'Completed structured hands-on AI training covering supervised/unsupervised learning workflows and practical data analysis exercises.',
    tasks: [
      'Worked through supervised and unsupervised machine learning tracks with Python-based technical exercises.',
      'Strengthened applied fundamentals in dataset exploration, preprocessing, and model evaluation.',
    ],
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    certificateImageUrl:
      'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/Internship%20Certificates/11_edunet_aicte_ibm_ai.png',
    certificateGithubUrl:
      'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/Internship%20Certificates/11_edunet_aicte_ibm_ai.png',
  },
  {
    id: 'edunet-cybersecurity',
    organization: 'Edunet Foundation · Vodafone',
    role: 'Cyber Security Virtual Intern',
    dateRange: 'March 2026',
    status: 'Completed',
    summary:
      'Completed project-based cybersecurity exploration examining port scanning, anomaly detection, and AI-assisted security analysis.',
    tasks: [
      'Built an AI-assisted port scanner GUI prototype (`ai_upgraded_port_scaner_gui.py`) exploring practical network reconnaissance diagnostics.',
      'Studied intelligent threat detection workflows and security fundamentals in an independent virtual track.',
    ],
    skills: ['Python', 'Cybersecurity', 'Network Analysis', 'Anomaly Detection'],
    repoUrl:
      'https://github.com/Pavanateja2007-aiml/Internship-Projects/tree/main/Aicte-Edunet-Foundation-Virtual-Internship',
    certificateImageUrl:
      'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/Internship%20Certificates/10_edunet_vodafone_cybersecurity.png',
    certificateGithubUrl:
      'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/Internship%20Certificates/10_edunet_vodafone_cybersecurity.png',
  },
  {
    id: 'servicenow-ai',
    organization: 'ServiceNow · SmartBridge',
    role: 'Artificial Intelligence Virtual Intern',
    dateRange: 'February 2026 – March 2026',
    status: 'Completed',
    summary:
      'Explored enterprise workflow automation, Flow Designer, Automated Test Framework concepts, and Agentic AI in ITSM environments.',
    tasks: [
      'Built automated enterprise workflow prototypes using ServiceNow Flow Designer.',
      'Studied Automated Test Framework (ATF) validation practices and AI-assisted ITSM dashboards.',
    ],
    skills: ['ServiceNow', 'Flow Designer', 'ATF', 'ITSM', 'Enterprise Automation'],
    certificateImageUrl:
      'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/Internship%20Certificates/09_servicenow_smartbridge.png',
    certificateGithubUrl:
      'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/Internship%20Certificates/09_servicenow_smartbridge.png',
  },
  {
    id: 'infosys-springboard',
    organization: 'Infosys Springboard',
    role: 'Artificial Intelligence Virtual Intern (Tracks 6.0 & 7.0)',
    dateRange: 'February 2026 – March 2026 (6.0) · 2026 (7.0 Project Track)',
    status: 'Completed',
    summary:
      'Developed a conversational voice-assistant prototype for railway passenger support (IRCTC use case) and progressed into the ForecastIQ sales forecasting track.',
    tasks: [
      'Designed and built a conversational AI & voice-driven inquiry workflow prototype for railway passenger support (IRCTC use case).',
      'Contributed across problem analysis, dialogue workflow design, implementation, testing, and iterative refinement.',
      'Completed structured forecasting milestones (`Milestone-1` through `Milestone-4`) for ForecastIQ.',
    ],
    skills: ['Python', 'Conversational AI', 'NLP', 'Voice UX', 'Forecasting'],
    repoUrl:
      'https://github.com/Pavanateja2007-aiml/Infosys-Springboard-Virtual-Internship-7.0',
    certificateImageUrl:
      'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main/Internship%20Certificates/08_infosys_springboard_ivr.png',
    certificateGithubUrl:
      'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main/Internship%20Certificates/08_infosys_springboard_ivr.png',
    relatedProjectId: 'lectavoice-irctc-ivr',
  },
];
