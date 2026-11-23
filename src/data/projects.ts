export type ProjectCategory =
  | 'All'
  | 'Generative AI'
  | 'ML & Research'
  | 'Deep Learning / CV'
  | 'Conversational AI'
  | 'Automation & Data';

export type ProjectStatusLabel =
  | 'Internship Build'
  | 'Research Experiment'
  | 'Prototype'
  | 'Live Deployed'
  | 'Hackathon Build';

export interface ProjectCaseStudy {
  problem: string;
  whyIBuiltIt: string;
  approach: string;
  architecture: string[];
  implementation: string;
  challengesAndBugs: string;
  whatILearned: string;
  futureImprovements: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  status: ProjectStatusLabel;
  summary: string;
  stack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  schematicLabel: string;
  schematicNodes: [string, string, string];
  realPreviewImage?: string;
  realPreviewCaption?: string;
  caseStudy: ProjectCaseStudy;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Generative AI',
  'ML & Research',
  'Deep Learning / CV',
  'Conversational AI',
  'Automation & Data',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ecoaction-ai',
    index: '01',
    title: 'EcoAction AI',
    subtitle: 'UN SDG 13 Climate Action Planner',
    category: 'Generative AI',
    status: 'Internship Build',
    summary:
      'AI-powered climate action planning web application aligned with UN SDG 13, translating everyday habits into structured carbon-reduction guidance.',
    stack: ['Google Gemini API', 'React', 'TypeScript', 'Node.js', 'Express'],
    githubUrl:
      'https://github.com/Pavanateja2007-aiml/Internship-Projects/tree/main/1%20MILLION%201%20BILLION%20%26%20IBM-Virtual%20Internship',
    schematicLabel: 'Conceptual Workflow Diagram · 1M1B Internship Build',
    schematicNodes: ['Lifestyle Inputs', 'Gemini Prompt Engine', 'SDG 13 Action Plan'],
    caseStudy: {
      problem:
        'Climate sustainability advice online is usually broad and repetitive, making it difficult for individuals to translate high-level UN SDG 13 goals into concrete daily changes across transport, energy, nutrition, and waste.',
      whyIBuiltIt:
        'Built during the 1M1B (1 Million for 1 Billion) AI & Sustainability Virtual Internship to test whether structured LLM prompting could turn lifestyle inputs into practical, personalized recommendations rather than generic slogans.',
      approach:
        'Combined a category-based carbon footprint input flow with structured Gemini API prompts so recommendations stay grounded in the specific domain (commute, electricity usage, food choices, and household waste) rather than unconstrained free-text chat.',
      architecture: [
        'React + TypeScript frontend collects structured activity inputs across four sustainability domains',
        'Node.js + Express backend orchestrates prompt context and keeps API credentials off the client',
        'Google Gemini API synthesizes tailored step-by-step decarbonization suggestions',
        'Category breakdown view presents actionable habits alongside SDG 13 alignment context',
      ],
      implementation:
        'Implemented a modular React/TypeScript interface wired to an Express server (`server.ts`) and Vite frontend. Built category-specific input views and structured response rendering so users can inspect practical reduction steps per lifestyle category.',
      challengesAndBugs:
        'Early prompt iterations produced overly verbose or inconsistent markdown formatting that broke UI card layouts. Tightening system instructions and normalizing response parsing stabilized the output structure.',
      whatILearned:
        'Good Generative AI applications depend as much on constraint design and input framing as on the underlying model. Moving an idea from a notebook prompt into a typed React + Express app exposes real edge cases around latency and error states.',
      futureImprovements:
        'Add region-specific emission factors for Indian household grids, longitudinal habit logging, and exportable monthly action summaries.',
    },
  },
  {
    id: 'parkinsons-ml-research',
    index: '02',
    title: "Parkinson's Disease ML Research",
    subtitle: 'Neuroimaging & Classification Experiments',
    category: 'ML & Research',
    status: 'Research Experiment',
    summary:
      'Exploratory machine learning and deep learning investigation into Parkinson’s disease detection using PPMI resting-state fMRI neuroimaging data.',
    stack: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/Pavanateja2007-aiml/Parkinsons_Disease_ML_DL_Research',
    schematicLabel: 'Conceptual Pipeline · Exploratory Research',
    schematicNodes: ['PPMI rs-fMRI Slices', 'Feature & CNN Trials', 'Evaluation & Metrics'],
    caseStudy: {
      problem:
        'Early-stage neurological screening relies heavily on clinical observation, motivating computational exploration of how imaging patterns in resting-state fMRI datasets separate healthy controls from Parkinson’s subjects.',
      whyIBuiltIt:
        'Wanted to go beyond toy tabular benchmarks and work directly with real medical imaging directory structures (PPMI rs-fMRI slices) to understand preprocessing discipline and validation pitfalls in biomedical ML.',
      approach:
        'Structured dataset ingestion around healthy control (`HC_new`) and disease cohorts, exploring reproducible preprocessing, class balance checks, and comparative classification experiments.',
      architecture: [
        'PPMI resting-state fMRI image cohort ingestion and directory validation',
        'Standardized image resizing, intensity normalization, and train/validation splitting',
        'Baseline ML and neural classification experiments with confusion-matrix inspection',
        'Iterative error analysis to flag data leakage risks across slices from the same subject',
      ],
      implementation:
        'Organized raw PPMI slice subsets inside the research repository and tested preprocessing + evaluation scripts in Python, emphasizing clean separation of training and evaluation sets.',
      challengesAndBugs:
        'Medical slice datasets carry a hidden trap: splitting randomly at the slice level instead of the patient/session level artificially inflates validation scores. Identifying subject-level grouping was critical to keeping results honest.',
      whatILearned:
        'In healthcare ML, data integrity and leakage prevention matter far more than chasing a higher headline accuracy number. Research code needs honest labeling as exploratory—not clinical tooling.',
      futureImprovements:
        'Integrate strict patient-level k-fold cross-validation, Grad-CAM visual attribution maps, and reproducible experiment tracking logs.',
    },
  },
  {
    id: 'ai-neuro-mri-cv',
    index: '03',
    title: 'AI Neuro MRI & Leaf Buddy (CV/DL)',
    subtitle: 'CNN Medical Imaging & Plant Leaf Classification',
    category: 'Deep Learning / CV',
    status: 'Research Experiment',
    summary:
      'Convolutional neural network experiments spanning brain tumor MRI exploration (`brain-tumor.ipynb`) and an interactive TensorFlow/Keras plant leaf classifier (`Leaf-Buddy`).',
    stack: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Computer Vision', 'Jupyter'],
    githubUrl: 'https://github.com/Pavanateja2007-aiml/Deep-Learning',
    schematicLabel: 'Conceptual Architecture · CNN Exploration',
    schematicNodes: ['Input Image Tensor', 'Conv2D + Pooling', 'Class Prediction UI'],
    caseStudy: {
      problem:
        'Raw image datasets vary widely in lighting, framing, and class distribution, requiring deliberate CNN preprocessing and inference pipelines to make predictions inspectable outside a static notebook.',
      whyIBuiltIt:
        'Built across my Deep Learning and Computer Vision repositories to test how convolutional architectures behave across two contrasting domains: medical brain-tumor MRI slices and real-world botanical leaf photography.',
      approach:
        'Trained and evaluated TensorFlow/Keras convolutional architectures in Jupyter notebooks (`Deep-Learning/CNN/brain-tumor.ipynb`) and packaged trained `.keras` weights (`plant_model.keras`) into a lightweight Python inference app (`Leaf-Buddy/app.py`).',
      architecture: [
        'Image preprocessing: resizing, tensor scaling, and class-index mapping (`class_names.json`)',
        'Convolutional feature extraction layers paired with regularization to curb overfitting',
        'Serialized `.keras` model artifact decoupled from training notebooks',
        'Python inference script (`app.py`) accepting sample leaf images for prediction inspection',
      ],
      implementation:
        'Separated notebook experimentation (`Deep-Learning` and `Computer-Vision` practicals) from runnable inference packaging (`Leaf-Buddy`), keeping class labels externalized in JSON for safer prediction decoding.',
      challengesAndBugs:
        'Mismatched input normalization between training notebooks and inference scripts initially skewed predicted class probabilities. Synchronizing preprocessing transforms resolved the discrepancy.',
      whatILearned:
        'Training a model in a notebook is only half the work—preserving exact preprocessing parity and class-label ordering during inference is where most real-world CV bugs hide.',
      futureImprovements:
        'Add confidence calibration, out-of-distribution rejection thresholds, and side-by-side Grad-CAM saliency overlays for visual explainability.',
    },
  },
  {
    id: 'lectavoice-irctc-ivr',
    index: '04',
    title: 'IRCTC Voice Assistant & LectaVoice',
    subtitle: 'Conversational AI & Speech Workflow Prototypes',
    category: 'Conversational AI',
    status: 'Prototype',
    summary:
      'Conversational voice prototypes exploring natural-language railway passenger support (Infosys Springboard 6.0) and speech-to-structured-notes transcription workflows.',
    stack: ['Python', 'NLP', 'Speech Recognition', 'Intent Parsing', 'Voice UX'],
    githubUrl:
      'https://github.com/Pavanateja2007-aiml/Internship-Projects/tree/main/Infosys-Springboard-6.0-Virtual-Internship',
    schematicLabel: 'Conceptual Dialogue Flow · Voice Prototype',
    schematicNodes: ['Spoken Query', 'Intent & Entity Parser', 'Structured Response'],
    caseStudy: {
      problem:
        'Legacy numeric-keypad IVR menus force passengers through slow, rigid trees for routine inquiries like train status or PNR checks, while long spoken lectures are hard to turn into structured revision material.',
      whyIBuiltIt:
        'Developed the railway conversational workflow prototype during the Infosys Springboard Virtual Internship, alongside LectaVoice speech-processing explorations to understand intent parsing and spoken-input ambiguity.',
      approach:
        'Designed multi-turn dialogue flows that extract key entities (such as 5-digit train numbers and station codes) from natural phrasing, and explored audio chunking + summarization pipelines for academic speech.',
      architecture: [
        'Speech-to-text capture and noise-tolerant text normalization',
        'NLP intent classification and slot/entity extraction for structured parameters',
        'Multi-turn dialogue state tracker to ask targeted follow-up prompts when details are missing',
        'Structured response formatting for spoken playback or study outlines',
      ],
      implementation:
        'Built modular Python prototype components covering input validation, security/guardrail checks (`Security.py`), and dialogue turn logic across the Infosys Springboard 6.0 track.',
      challengesAndBugs:
        'Spoken queries rarely follow clean grammar—partial train numbers, accents, and repeated phrases easily confuse rigid keyword matching. Introducing explicit fallback clarification prompts made conversations recoverable.',
      whatILearned:
        'Voice UX fails gracefully only when you design for misheard inputs first. Good conversational design is mostly about recovery paths, not happy-path scripts.',
      futureImprovements:
        'Connect to real-time railway status APIs with latency-aware streaming ASR and bilingual English/Telugu voice understanding.',
    },
  },
  {
    id: 'forecastiq',
    index: '05',
    title: 'ForecastIQ',
    subtitle: 'Intelligent Sales Forecasting Workspace',
    category: 'ML & Research',
    status: 'Internship Build',
    summary:
      'Time-series and sales forecasting application developed across the Infosys Springboard Virtual Internship 7.0 milestones.',
    stack: ['Python', 'Time-Series ML', 'Pandas', 'HTML/CSS', 'TypeScript'],
    githubUrl: 'https://github.com/Pavanateja2007-aiml/ForecastIQ',
    schematicLabel: 'Conceptual Pipeline · Springboard 7.0 Track',
    schematicNodes: ['Historical Sales CSV', 'Forecasting Models', 'Trend & Scenario View'],
    caseStudy: {
      problem:
        'Small retail and operations teams often sit on historical sales spreadsheets without a straightforward way to inspect seasonality, forecast near-term demand, or compare forecasting assumptions.',
      whyIBuiltIt:
        'Built across progressive milestones (Milestone 1 through Milestone 4) during the Infosys Springboard 7.0 track to practice end-to-end data ingestion, forecasting evaluation, and frontend presentation.',
      approach:
        'Structured the project into iterative milestones—from dataset cleaning and exploratory trend analysis to model fitting and an interactive web view for inspecting forecast trajectories.',
      architecture: [
        'Historical transaction ingestion, date-index normalization, and missing-period handling',
        'Exploratory trend and seasonality decomposition across product/time windows',
        'Baseline forecasting models evaluated on holdout time slices',
        'Web interface presenting historical actuals alongside projected demand bands',
      ],
      implementation:
        'Organized across the `ForecastIQ` and `Infosys-Springboard-Virtual-Internship-7.0` repositories with milestone artifacts, forecasting notebooks/scripts, and presentation documentation.',
      challengesAndBugs:
        'Evaluating time-series models with random shuffles leaks future trend information. Enforcing strict chronological train/test cutoffs gave realistic error diagnostics.',
      whatILearned:
        'Forecasting accuracy depends heavily on clean date alignment and honest chronological backtesting—visualizing error residuals is just as important as plotting the forecast curve.',
      futureImprovements:
        'Add multi-horizon confidence intervals, holiday/event regressors, and downloadable CSV forecast reports.',
    },
  },
  {
    id: 'daily-job-aggregator-agent',
    index: '06',
    title: 'Daily Job Aggregator Agent',
    subtitle: 'Automated AI/ML Job Scraping & Digest Pipeline',
    category: 'Automation & Data',
    status: 'Live Deployed',
    summary:
      'Automated async Python pipeline that collects fresh (<24h) AI/ML and Data Science postings, deduplicates cross-posted roles, and formats a clean daily HTML digest.',
    stack: ['Python', 'AsyncIO', 'YAML Config', 'HTML Digest', 'Docker', 'Render'],
    githubUrl: 'https://github.com/Pavanateja2007-aiml/daily_job_aggregator_agent',
    liveDemoUrl: 'https://daily-job-aggregator-version-1.onrender.com',
    schematicLabel: 'Automated Pipeline · Live Deployed Service',
    schematicNodes: ['Multi-Source Scrapers', 'Deduplication Core', 'Daily Digest UI'],
    caseStudy: {
      problem:
        'Searching multiple job boards daily for early-career AI/ML and Data Science openings wastes time on stale listings and identical roles reposted across platforms.',
      whyIBuiltIt:
        'Built to scratch my own itch: turn repetitive manual job-board checking into a configurable, automated Python agent that surfaces only fresh, deduplicated opportunities.',
      approach:
        'Engineered a config-driven (`config.yaml`) async Python architecture with modular scrapers, freshness filtering (<24h), cross-source deduplication, and an HTML digest preview server.',
      architecture: [
        'Declarative `config.yaml` defining target roles, keywords, and source parameters',
        'Modular async scrapers (`scrapers/`) with fault isolation so one source failure does not crash the run',
        'Core deduplication and freshness filter (`core/`) stripping stale and duplicate listings',
        'Flask/Python web server (`server.py`) & HTML digest preview deployed with Dockerfile / Render',
      ],
      implementation:
        'Packaged with unit tests (`tests/`), browser extension companion experiments (`extension/`), `Dockerfile`, `Procfile`, and `vercel.json`, with a live deployment hosted on Render.',
      challengesAndBugs:
        'External job boards frequently throttle requests or alter markup structures. Wrapping individual scrapers with graceful timeouts, fallback parsing, and test fixtures kept the pipeline resilient.',
      whatILearned:
        'Building real automation teaches defensive engineering: configuration separation, clean failure handling, and containerizing Python services for reliable free-tier deployment.',
      futureImprovements:
        'Add semantic skill-match scoring against a user profile YAML and scheduled webhook/email delivery preferences.',
    },
  },
  {
    id: 'r-statistical-ml-suite',
    index: '07',
    title: 'R Statistical ML Suite (5 Engines)',
    subtitle: 'End-to-End Statistical Modeling & Diagnostics in R',
    category: 'ML & Research',
    status: 'Internship Build',
    summary:
      'Five complete machine learning pipelines in R—Email Spam, House Price, Titanic Survival, Movie Recommendation, and Breast Cancer Classification—with 50+ ggplot2 diagnostics.',
    stack: ['R', 'caret', 'randomForest', 'e1071', 'recosystem', 'ggplot2', 'dplyr'],
    githubUrl: 'https://github.com/Pavanateja2007-aiml/Programming-With-R',
    schematicLabel: '5-Project Statistical Suite · Amaravathi Internship',
    schematicNodes: ['EDA & Cleaning (dplyr)', '5 ML Models (caret)', '50+ ggplot2 Diagnostics'],
    caseStudy: {
      problem:
        'Learning algorithms in isolation rarely teaches how different problem families—classification, regression, clustering, and collaborative filtering—require distinct preprocessing and diagnostic checks.',
      whyIBuiltIt:
        'Developed during the Amaravathi Software Innovations R Programming Internship to build statistical rigor outside the Python ecosystem and document every modeling step visually.',
      approach:
        'Implemented five standalone, reproducible R projects (`Project-1` through `Project-5`) covering Naive Bayes, Random Forest, SVD/matrix factorization, k-NN, and Linear Regression with cross-validation and ROC-AUC analysis.',
      architecture: [
        'Data ingestion, missing-value imputation, and tidy transformations via `dplyr` and `tidyr`',
        'Cross-validated model training and hyperparameter tuning with `caret`, `e1071`, and `randomForest`',
        'Matrix factorization recommender workflow powered by `recosystem`',
        'Diagnostic visualization suite generating 50+ ROC curves, confusion matrices, and residual plots in `ggplot2`',
      ],
      implementation:
        'Structured the repository into five self-contained project directories, each bundling datasets, runnable R scripts, visual outputs, and written analytical reports.',
      challengesAndBugs:
        'Handling factor level mismatches between training and test partitions in R’s `caret` workflows caused silent prediction failures until explicit factor alignment and preprocessing recipes were enforced.',
      whatILearned:
        'Working in R sharpens statistical intuition: residual diagnostics, ROC trade-offs, and publication-grade visual inspection reveal model flaws that a single accuracy float hides.',
      futureImprovements:
        'Publish an interactive Quarto/RMarkdown report site summarizing comparative benchmarks across all five datasets.',
    },
  },
  {
    id: 'vitalmind-iqoo-hackathon',
    index: '08',
    title: 'VitalMind AI',
    subtitle: 'Interactive Physiological & Wellness Prototype (iQOO Hackathon)',
    category: 'Automation & Data',
    status: 'Hackathon Build',
    summary:
      'Full-stack FastAPI and web prototype built for the iQOO Hackathon exploring physiological monitoring, readiness signals, and mental wellness tracking.',
    stack: ['Python', 'FastAPI', 'SQLite', 'JavaScript', 'Vercel'],
    githubUrl: 'https://github.com/Pavanateja2007-aiml/Iqoo-Hackathon',
    liveDemoUrl: 'https://iqoo-hackathon-vert.vercel.app',
    schematicLabel: 'Full-Stack Prototype · Live Vercel Deployment',
    schematicNodes: ['Wellness Client UI', 'FastAPI Endpoints', 'SQLite State Store'],
    caseStudy: {
      problem:
        'Personal wellness metrics are often fragmented across separate trackers without an accessible interface to inspect daily physiological readiness and habit correlations together.',
      whyIBuiltIt:
        'Built under hackathon time constraints (`Iqoo-Hackathon`) to ship a clean, testable FastAPI backend + frontend prototype deployable directly to Vercel serverless Python.',
      approach:
        'Kept the stack lean—FastAPI API routes, lightweight SQLite persistence (`vitalmind.db`), automated API smoke tests (`test_api.py`), and a zero-build frontend configured via `vercel.json`.',
      architecture: [
        'Vanilla web frontend (`frontend/`) communicating with structured REST endpoints',
        'FastAPI backend (`backend/` + `api/`) handling wellness state and metric calculations',
        'Local SQLite persistence (`vitalmind.db`) with verification script (`test_api.py`)',
        'Serverless deployment configuration (`vercel.json`) for instant public preview',
      ],
      implementation:
        'Structured clean separation between API handlers, backend logic, frontend assets, and deployment config so the prototype runs identically locally (`run.py`) and on Vercel.',
      challengesAndBugs:
        'Serverless Python deployments have read-only filesystem constraints for local SQLite writes. Structuring clean initialization paths and API test coverage prevented runtime crashes on deployment.',
      whatILearned:
        'Shipping cleanly under a tight hackathon clock rewards minimal, well-tested architectures over bloated frameworks.',
      futureImprovements:
        'Migrate persistence to a managed database for multi-device user history and add wearable CSV import support.',
    },
  },
];
