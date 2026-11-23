export interface SkillTool {
  name: string;
  level: 'Used in Projects' | 'Actively Learning';
  note: string;
  relatedProjectIds: string[];
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  summary: string;
  tools: SkillTool[];
}

export const ARSENAL_ATTITUDE_LINE =
  'I collect tools, not titles. Understanding is the actual upgrade.';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    index: '01',
    title: 'Programming',
    summary: 'Core languages used for modeling, statistical analysis, data querying, and application glue.',
    tools: [
      {
        name: 'Python',
        level: 'Used in Projects',
        note: 'Primary language for ML/DL experiments, FastAPI backends, async scraping agents, and NLP prototypes.',
        relatedProjectIds: [
          'parkinsons-ml-research',
          'ai-neuro-mri-cv',
          'daily-job-aggregator-agent',
          'vitalmind-iqoo-hackathon',
        ],
      },
      {
        name: 'R',
        level: 'Used in Projects',
        note: 'Statistical modeling, caret cross-validation, recommendation engines, and ggplot2 diagnostics.',
        relatedProjectIds: ['r-statistical-ml-suite'],
      },
      {
        name: 'SQL',
        level: 'Used in Projects',
        note: 'Relational querying, analytical aggregations, and structured dataset preparation.',
        relatedProjectIds: ['vitalmind-iqoo-hackathon', 'forecastiq'],
      },
    ],
  },
  {
    id: 'data',
    index: '02',
    title: 'Data',
    summary: 'Libraries for cleaning messy real-world datasets, inspecting distributions, and exposing bias.',
    tools: [
      {
        name: 'NumPy',
        level: 'Used in Projects',
        note: 'Vectorized numerical computation and image tensor preprocessing.',
        relatedProjectIds: ['parkinsons-ml-research', 'ai-neuro-mri-cv'],
      },
      {
        name: 'Pandas',
        level: 'Used in Projects',
        note: 'Tabular cleaning, time-series resampling, feature engineering, and evaluation tables.',
        relatedProjectIds: ['forecastiq', 'parkinsons-ml-research'],
      },
      {
        name: 'Matplotlib',
        level: 'Used in Projects',
        note: 'Loss curves, confusion matrices, and diagnostic distribution plots.',
        relatedProjectIds: ['parkinsons-ml-research', 'ai-neuro-mri-cv'],
      },
      {
        name: 'Seaborn',
        level: 'Used in Projects',
        note: 'Correlation heatmaps, feature comparisons, and quick exploratory visual checks.',
        relatedProjectIds: ['parkinsons-ml-research', 'forecastiq'],
      },
    ],
  },
  {
    id: 'ml',
    index: '03',
    title: 'Machine Learning',
    summary: 'Classical modeling fundamentals with an emphasis on honest validation over inflated scores.',
    tools: [
      {
        name: 'scikit-learn',
        level: 'Used in Projects',
        note: 'Pipelines, preprocessing, supervised classifiers, clustering, and cross-validation.',
        relatedProjectIds: ['parkinsons-ml-research', 'forecastiq'],
      },
      {
        name: 'Classification & Regression',
        level: 'Used in Projects',
        note: 'Logistic regression, Random Forest, SVM, Naive Bayes, k-NN, and linear/polynomial models.',
        relatedProjectIds: ['r-statistical-ml-suite', 'parkinsons-ml-research'],
      },
      {
        name: 'Clustering',
        level: 'Used in Projects',
        note: 'Unsupervised segmentation with K-Means and PCA exploratory workflows.',
        relatedProjectIds: ['r-statistical-ml-suite'],
      },
      {
        name: 'Model Evaluation',
        level: 'Used in Projects',
        note: 'ROC-AUC, precision/recall trade-offs, confusion matrices, and leakage checks.',
        relatedProjectIds: ['r-statistical-ml-suite', 'parkinsons-ml-research'],
      },
    ],
  },
  {
    id: 'ai',
    index: '04',
    title: 'Artificial Intelligence',
    summary: 'Neural networks, language systems, computer vision, and tool-calling agentic workflows.',
    tools: [
      {
        name: 'TensorFlow & Keras',
        level: 'Used in Projects',
        note: 'Building, training, and exporting CNN classifiers for MRI slices and plant leaves.',
        relatedProjectIds: ['ai-neuro-mri-cv', 'parkinsons-ml-research'],
      },
      {
        name: 'Computer Vision',
        level: 'Used in Projects',
        note: 'Image preprocessing, convolutional architectures, and practical CV notebooks.',
        relatedProjectIds: ['ai-neuro-mri-cv'],
      },
      {
        name: 'NLP',
        level: 'Used in Projects',
        note: 'Intent parsing, entity extraction, and text classification experiments.',
        relatedProjectIds: ['lectavoice-irctc-ivr'],
      },
      {
        name: 'Generative AI & Agents',
        level: 'Actively Learning',
        note: 'Google Gemini API orchestration, RAG architectures, MCP, and multi-step tool calling.',
        relatedProjectIds: ['ecoaction-ai', 'daily-job-aggregator-agent'],
      },
    ],
  },
  {
    id: 'development',
    index: '05',
    title: 'Development',
    summary: 'Moving models out of notebooks into versioned repositories, APIs, and usable interfaces.',
    tools: [
      {
        name: 'Git & GitHub',
        level: 'Used in Projects',
        note: 'Version control, structured repositories, documentation, and static deployment workflows.',
        relatedProjectIds: ['ecoaction-ai', 'daily-job-aggregator-agent', 'r-statistical-ml-suite'],
      },
      {
        name: 'APIs (FastAPI / Express)',
        level: 'Used in Projects',
        note: 'REST endpoints connecting ML/GenAI backends cleanly to web frontends.',
        relatedProjectIds: ['ecoaction-ai', 'vitalmind-iqoo-hackathon'],
      },
      {
        name: 'Automation',
        level: 'Used in Projects',
        note: 'Async Python scrapers, ServiceNow Flow Designer concepts, and scheduled digest pipelines.',
        relatedProjectIds: ['daily-job-aggregator-agent'],
      },
      {
        name: 'React & TypeScript',
        level: 'Actively Learning',
        note: 'Building clean, accessible web interfaces around AI workflows and research outputs.',
        relatedProjectIds: ['ecoaction-ai', 'forecastiq'],
      },
    ],
  },
  {
    id: 'databases',
    index: '06',
    title: 'Databases',
    summary: 'Structured and document storage systems for application state and analytical queries.',
    tools: [
      {
        name: 'MySQL',
        level: 'Used in Projects',
        note: 'Relational schema design, joins, and structured analytical querying.',
        relatedProjectIds: ['forecastiq'],
      },
      {
        name: 'MongoDB',
        level: 'Actively Learning',
        note: 'Document-oriented storage patterns for flexible JSON payloads and AI app state.',
        relatedProjectIds: ['ecoaction-ai'],
      },
    ],
  },
];
