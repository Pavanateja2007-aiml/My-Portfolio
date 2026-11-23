export interface VisualCertificateItem {
  id: string;
  title: string;
  issuer: string;
  group: 'Professional' | 'Internship';
  featured?: boolean;
  imageUrl: string;
  githubFileUrl: string;
  courseArchiveUrl?: string;
  filePath: string;
}

export interface PdfCertificateEntry {
  id: string;
  title: string;
  issuerFolder: string;
  filePath: string;
  githubUrl: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  collection: string;
  sublocation?: string;
  imageUrl: string;
  githubFileUrl: string;
  filePath: string;
}

const RAW_PROFILE_BASE =
  'https://raw.githubusercontent.com/Pavanateja2007-aiml/VemuriPavanateja2007/main';
const BLOB_PROFILE_BASE =
  'https://github.com/Pavanateja2007-aiml/VemuriPavanateja2007/blob/main';
const RAW_CERTS_BASE =
  'https://raw.githubusercontent.com/Pavanateja2007-aiml/Certifications/main';
const BLOB_CERTS_BASE =
  'https://github.com/Pavanateja2007-aiml/Certifications/blob/main';
const TREE_CERTS_BASE =
  'https://github.com/Pavanateja2007-aiml/Certifications/tree/main';

function encodePath(path: string): string {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

/**
 * Curated fallback manifest of Pavanateja's actual certificate image files from GitHub.
 * Used seamlessly if the live GitHub API is rate-limited or unreachable.
 */
export const CURATED_VISUAL_CERTIFICATES: VisualCertificateItem[] = [
  {
    id: 'microsoft-ai-ml',
    title: 'Microsoft AI & ML Engineering Professional Certificate',
    issuer: 'Microsoft',
    group: 'Professional',
    featured: true,
    filePath: 'Professional Certificate Images/02_microsoft_ai_ml_engineering.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/02_microsoft_ai_ml_engineering.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/02_microsoft_ai_ml_engineering.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/MICROSOFT AI&ML ENGINEER')}`,
  },
  {
    id: 'google-ai',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    group: 'Professional',
    filePath: 'Professional Certificate Images/05_google_ai.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/05_google_ai.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/05_google_ai.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/GOOGLE')}`,
  },
  {
    id: 'ibm-rag-agentic',
    title: 'IBM RAG and Agentic AI Professional Certificate',
    issuer: 'IBM',
    group: 'Professional',
    filePath: 'Professional Certificate Images/03_ibm_rag_agentic_ai.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/03_ibm_rag_agentic_ai.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/03_ibm_rag_agentic_ai.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/IBM RAG AND AGENTIC AI')}`,
  },
  {
    id: 'ibm-data-science',
    title: 'IBM Data Science Professional Certificate',
    issuer: 'IBM',
    group: 'Professional',
    filePath: 'Professional Certificate Images/04_ibm_data_science.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/04_ibm_data_science.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/04_ibm_data_science.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/IBM DATA SCIENCE')}`,
  },
  {
    id: 'nvidia-ai-infra',
    title: 'AI Infrastructure and Operations Fundamentals',
    issuer: 'NVIDIA',
    group: 'Professional',
    filePath: 'Professional Certificate Images/06_nvidia_ai_infrastructure.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/06_nvidia_ai_infrastructure.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/06_nvidia_ai_infrastructure.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/NVIDIA')}`,
  },
  {
    id: 'oxford-ai',
    title: 'AI Foundations for Business Professionals',
    issuer: 'Saïd Business School, University of Oxford',
    group: 'Professional',
    filePath: 'Professional Certificate Images/07_oxford_ai_foundations.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/07_oxford_ai_foundations.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/07_oxford_ai_foundations.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/OXFORD')}`,
  },
  {
    id: 'vanderbilt-prompt',
    title: 'Prompt Engineering Specialization',
    issuer: 'Vanderbilt University',
    group: 'Professional',
    filePath: 'Professional Certificate Images/01_prompt_engineering_vanderbilt.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Professional Certificate Images/01_prompt_engineering_vanderbilt.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Professional Certificate Images/01_prompt_engineering_vanderbilt.png')}`,
    courseArchiveUrl: `${TREE_CERTS_BASE}/${encodePath('Professional Certificates/Prompt Engineering Vanderbilt University')}`,
  },
  {
    id: 'intern-amaravathi',
    title: 'R Programming Language Virtual Internship',
    issuer: 'Amaravathi Software Innovations',
    group: 'Internship',
    filePath: 'Internship Certificates/13_amaravathi_r_language.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Internship Certificates/13_amaravathi_r_language.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Internship Certificates/13_amaravathi_r_language.png')}`,
  },
  {
    id: 'intern-1m1b',
    title: 'AI & Sustainability Virtual Internship',
    issuer: '1M1B · AICTE & IBM',
    group: 'Internship',
    filePath: 'Internship Certificates/12_1m1b_aicte_ibm_sustainability.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Internship Certificates/12_1m1b_aicte_ibm_sustainability.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Internship Certificates/12_1m1b_aicte_ibm_sustainability.png')}`,
  },
  {
    id: 'intern-edunet-ai',
    title: 'Artificial Intelligence Virtual Internship',
    issuer: 'Edunet Foundation · AICTE & IBM',
    group: 'Internship',
    filePath: 'Internship Certificates/11_edunet_aicte_ibm_ai.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Internship Certificates/11_edunet_aicte_ibm_ai.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Internship Certificates/11_edunet_aicte_ibm_ai.png')}`,
  },
  {
    id: 'intern-edunet-cyber',
    title: 'Cyber Security Virtual Internship',
    issuer: 'Edunet Foundation · Vodafone',
    group: 'Internship',
    filePath: 'Internship Certificates/10_edunet_vodafone_cybersecurity.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Internship Certificates/10_edunet_vodafone_cybersecurity.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Internship Certificates/10_edunet_vodafone_cybersecurity.png')}`,
  },
  {
    id: 'intern-servicenow',
    title: 'Artificial Intelligence Virtual Internship',
    issuer: 'ServiceNow · SmartBridge',
    group: 'Internship',
    filePath: 'Internship Certificates/09_servicenow_smartbridge.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Internship Certificates/09_servicenow_smartbridge.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Internship Certificates/09_servicenow_smartbridge.png')}`,
  },
  {
    id: 'intern-infosys',
    title: 'Artificial Intelligence Virtual Internship (IVR)',
    issuer: 'Infosys Springboard',
    group: 'Internship',
    filePath: 'Internship Certificates/08_infosys_springboard_ivr.png',
    imageUrl: `${RAW_PROFILE_BASE}/${encodePath('Internship Certificates/08_infosys_springboard_ivr.png')}`,
    githubFileUrl: `${BLOB_PROFILE_BASE}/${encodePath('Internship Certificates/08_infosys_springboard_ivr.png')}`,
  },
];

const PDF_ARCHIVE_PATHS: string[] = [
  'Professional Certificates/GOOGLE/AI Fundamentals.pdf',
  'Professional Certificates/GOOGLE/AI for App Building.pdf',
  'Professional Certificates/GOOGLE/AI for App Deployment.pdf',
  'Professional Certificates/GOOGLE/AI for Brainstorming and Planning.pdf',
  'Professional Certificates/GOOGLE/AI for Content Creation.pdf',
  'Professional Certificates/GOOGLE/AI for Data Analysis.pdf',
  'Professional Certificates/GOOGLE/AI for Research and Insights.pdf',
  'Professional Certificates/GOOGLE/AI for Writing and Communicating.pdf',
  'Professional Certificates/GOOGLE/Google AI.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Applied Data Science Capstone.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Data Analysis with Python.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Data Science Methodology.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Data Scientist Career Guide and Interview.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Data Visualization with Python.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Databases and SQL for Data Science with Python.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Generative AI Elevate Your Data Science Career.pdf',
  'Professional Certificates/IBM DATA SCIENCE/IBM Data Science.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Machine Learning with Python.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Python Project for Data Science.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Python for Data Science, AI & Development.pdf',
  'Professional Certificates/IBM DATA SCIENCE/Tools for Data Science.pdf',
  'Professional Certificates/IBM DATA SCIENCE/What is Data Science.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Advanced RAG with Vector Databases and.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Agentic AI with LangChain and LangGraph.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Build AI Agents using MCP.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Build Multimodal Generative AI Applications.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Build RAG Applications  Get Started.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Develop Generative AI Applications Get Started.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Fundamentals of Building AI Agents.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/IBM RAG and Agentic AI.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/RAG and Agentic AI Capstone Project.pdf',
  'Professional Certificates/IBM RAG AND AGENTIC AI/Vector Databases for RAG An Introduction.pdf',
  'Professional Certificates/MICROSOFT AI&ML ENGINEER/AI and Machine Learning Algorithms and.pdf',
  'Professional Certificates/MICROSOFT AI&ML ENGINEER/Advanced AI and Machine Learning Techniques.pdf',
  'Professional Certificates/MICROSOFT AI&ML ENGINEER/Building Intelligent Troubleshooting Agents.pdf',
  'Professional Certificates/MICROSOFT AI&ML ENGINEER/Foundations of AI and Machine Learning.pdf',
  'Professional Certificates/MICROSOFT AI&ML ENGINEER/Microsoft AI & ML Engineering.pdf',
  'Professional Certificates/MICROSOFT AI&ML ENGINEER/Microsoft Azure for AI and Machine Learning.pdf',
  'Professional Certificates/NVIDIA/AI Infrastructure and Operations Fundamentals.pdf',
  'Professional Certificates/OXFORD/AI Essentials.pdf',
  'Professional Certificates/OXFORD/AI Foundations for Business Professionals.pdf',
  'Professional Certificates/OXFORD/AI Governance.pdf',
  'Professional Certificates/OXFORD/Generative and Agentic AI.pdf',
  'Professional Certificates/Prompt Engineering Vanderbilt University/ChatGPT Advanced Data Analysis.pdf',
  'Professional Certificates/Prompt Engineering Vanderbilt University/Prompt Engineering for ChatGPT.pdf',
  'Professional Certificates/Prompt Engineering Vanderbilt University/Prompt Engineering.pdf',
  'Professional Certificates/Prompt Engineering Vanderbilt University/Trustworthy Generative AI.pdf',
];

export function buildPdfArchiveEntry(filePath: string): PdfCertificateEntry {
  const parts = filePath.split('/');
  const issuerFolder = parts[1] ?? 'Archive';
  const fileName = parts[parts.length - 1] ?? filePath;
  const title = fileName.replace(/\.pdf$/i, '').replace(/\s+/g, ' ').trim();
  return {
    id: filePath.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    issuerFolder,
    filePath,
    githubUrl: `${BLOB_CERTS_BASE}/${encodePath(filePath)}`,
  };
}

export const CURATED_PDF_CERTIFICATES: PdfCertificateEntry[] =
  PDF_ARCHIVE_PATHS.map(buildPdfArchiveEntry);

const VERIFIED_PHOTO_PATHS: string[] = [
  'Interests/Photo Graphs/Nature/image 1.jpeg',
  'Interests/Photo Graphs/City/image 1.jpeg',
  'Interests/Photo Graphs/Temple/Arunachalam/image 1.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 1.jpeg',
  'Interests/Photo Graphs/Nature/image 2.jpeg',
  'Interests/Photo Graphs/City/image 2.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 2.jpeg',
  'Interests/Photo Graphs/Temple/Arunachalam/image 2.jpeg',
  'Interests/Photo Graphs/Nature/image 3.jpeg',
  'Interests/Photo Graphs/City/image 3.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 3.jpeg',
  'Interests/Photo Graphs/Nature/image 4.jpeg',
  'Interests/Photo Graphs/Temple/Arunachalam/image 3.jpeg',
  'Interests/Photo Graphs/City/image 4.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 4.jpeg',
  'Interests/Photo Graphs/Nature/image 5.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 5.jpeg',
  'Interests/Photo Graphs/City/image 5.jpeg',
  'Interests/Photo Graphs/Temple/Arunachalam/image 4.jpeg',
  'Interests/Photo Graphs/Nature/image 6.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 6.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 7.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 8.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 9.jpeg',
  'Interests/Photo Graphs/Temple/Tirupathi/image 10.jpeg',
];

export function buildPhotoItemFromPath(filePath: string): PhotoItem {
  // Expected shape: Interests/Photo Graphs/<Collection>/[Sublocation]/<filename>
  const relative = filePath.replace(/^Interests\/Photo Graphs\//, '');
  const parts = relative.split('/');
  const collection = parts[0] ?? 'Frames';
  const sublocation = parts.length > 2 ? parts[1] : undefined;
  const rawFile = parts[parts.length - 1] ?? relative;
  const frameNum = rawFile.replace(/\.[^.]+$/, '').replace(/^image\s*/i, 'Frame ');
  const labelPrefix = sublocation ? sublocation : collection;

  return {
    id: filePath.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: `${labelPrefix} · ${frameNum}`,
    collection,
    sublocation,
    filePath,
    imageUrl: `${RAW_CERTS_BASE}/${encodePath(filePath)}`,
    githubFileUrl: `${BLOB_CERTS_BASE}/${encodePath(filePath)}`,
  };
}

export const CURATED_PHOTOGRAPHY_MANIFEST: PhotoItem[] =
  VERIFIED_PHOTO_PATHS.map(buildPhotoItemFromPath);
