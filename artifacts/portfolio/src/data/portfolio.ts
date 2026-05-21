export const portfolio = {
  hero: {
    name: "Kshitij Tripathi",
    callsign: "KTP-01",
    role: "Full-Stack Engineer & AI Developer",
    tagline: "Building immersive digital systems at the intersection of AI and engineering",
    missionStatus: "ACTIVE",
    clearanceLevel: "ALPHA",
  },

  contact: {
    phone: "+91 9821485402",
    email: "54kshitij.tripathi@gmail.com",
    linkedin: "linkedin.com/in/kshitij-tripathi-163415275",
    linkedinUrl: "https://linkedin.com/in/kshitij-tripathi-163415275",
    github: "github.com/KTPhantom",
    githubUrl: "https://github.com/KTPhantom",
    location: "Bhopal, India",
    resumeUrl: "https://drive.google.com/file/d/1vphX_N5spGKY7PhGRrBL6oNPCLhm63H2/view?usp=sharing",
  },

  education: {
    institution: "VIT Bhopal University",
    degree: "Bachelor of Engineering in Computer Science",
    period: "Aug 2023 – Jul 2027",
    cgpa: 8.53,
    maxCgpa: 10.0,
  },

  experience: [
    {
      id: "exp-1",
      company: "HaritBhoomi AgroCultivators LLP",
      role: "Application Development Intern",
      location: "Bhopal, India",
      period: "Jun 2024 – Dec 2024",
      cockpitLabel: "MISSION: AGRO-ERP",
      achievements: [
        "Built React + Node.js Farm ERP with IoT integration, reducing manual data-entry overhead by 65% for 3 farm supervisors",
        "Designed REST API backend ingesting real-time IoT telemetry from 12+ sensor nodes, enabling live yield and inventory dashboards",
        "Piloted at ICAR-certified Farm of the Year; achieved 40% improvement in worker efficiency across 6-week trial",
        "Delivered iterative feature releases using Agile 2-week sprints incorporating agronomist feedback into 4 production-ready versions",
      ],
      stats: { efficiency: 65, workers: 3, sensors: 12, improvement: 40 },
    },
    {
      id: "exp-2",
      company: "Google Developer Groups on Campus (GDGC) — VIT Bhopal",
      role: "Lead, Content & Design Team",
      location: "Bhopal, India",
      period: "Sep 2025 – Present",
      cockpitLabel: "COMMAND: GDGC LEAD",
      achievements: [
        "Directed a team of 8 to produce technical content and design assets, raising output consistency across 15+ published developer resources",
        "Organized and co-managed 12+ workshops and campus tech events attended by 300+ students covering Generative AI, cloud, and modern dev practices",
        "Mentored 8 team members on technical writing, Figma, and content strategy, resulting in 40% increase in event engagement QoQ",
      ],
      stats: { teamSize: 8, events: 12, attendees: 300, engagement: 40 },
    },
    {
      id: "exp-3",
      company: "Cisco Community — VIT Bhopal",
      role: "Research Team Member",
      location: "Bhopal, India",
      period: "May 2024 – Present",
      cockpitLabel: "OPS: CISCO RESEARCH",
      achievements: [
        "Contributed to 6+ technical research documents on networking protocols, cybersecurity fundamentals, and emerging cloud technologies",
        "Presented findings in 4 peer knowledge-sharing sessions, supporting continuous skill development for a community of 50+ students",
      ],
      stats: { documents: 6, sessions: 4, community: 50 },
    },
  ],

  projects: [
    {
      id: "proj-1",
      name: "FashionAI Assistant",
      cockpitLabel: "MISSION: FASHION-AI",
      tech: ["FastAPI", "TensorFlow", "OpenCV", "YOLOv8", "React"],
      period: "Dec 2025",
      description:
        "End-to-end AI fashion recommendation system with computer vision pipeline for real-time color harmony detection and garment segmentation",
      highlights: [
        "Trained TensorFlow CNN on 6,000+ labeled outfit images achieving 87% style-classification accuracy",
        "Engineered computer vision pipeline using OpenCV and YOLOv8 for garment segmentation across 12 style categories",
        "Deployed FastAPI REST API serving occasion-specific outfit recommendations with sub-300ms average response time",
      ],
      stats: { accuracy: 87, images: 6000, latency: 300, categories: 12 },
      status: "DEPLOYED",
      githubUrl: "https://github.com/KTPhantom",
      liveUrl: "",
    },
    {
      id: "proj-2",
      name: "F1 Driver Fingerprinting & Telemetry Analytics",
      cockpitLabel: "MISSION: F1-TELEMETRY",
      tech: ["Python", "Streamlit", "FastF1", "Scikit-learn", "UMAP", "HDBSCAN"],
      period: "Oct 2025",
      description:
        "Formula 1 telemetry analytics platform identifying and classifying unique driver behavior patterns using high-frequency racing telemetry data",
      highlights: [
        "Engineered ML pipelines for telemetry preprocessing, feature engineering, and unsupervised clustering using UMAP and HDBSCAN",
        "Generated driver fingerprints from braking intensity, throttle modulation, steering dynamics, and cornering consistency",
        "Implemented cross-track driver re-identification on unseen circuits enabling robust driver recognition independent of track conditions",
        "Built interactive Streamlit dashboards for telemetry visualization and comparative driver analysis",
      ],
      stats: { drivers: 20, features: 50, accuracy: 94 },
      status: "COMPLETE",
      githubUrl: "https://github.com/KTPhantom",
      liveUrl: "",
    },
    {
      id: "proj-3",
      name: "SKILLINK — Student Collaboration Platform",
      cockpitLabel: "MISSION: SKILLINK",
      tech: ["JavaScript", "Random Forest", "SBERT"],
      period: "Oct 2024",
      description:
        "ML-powered student-researcher matching platform using Random Forest regression and SBERT sentence embeddings",
      highlights: [
        "Developed ML recommendation engine achieving 91% match-relevance score in user testing across 150+ student-researcher pairs",
        "Designed and shipped full frontend UI/UX as part of 5-member Agile team, cutting mean time-to-match by 55% versus manual search",
      ],
      stats: { matchRelevance: 91, pairs: 150, timeReduction: 55 },
      status: "COMPLETE",
    },
    {
      id: "proj-4",
      name: "Krishi Pradhan — Farm Management System",
      cockpitLabel: "MISSION: KRISHI",
      tech: ["React", "Node.js", "MongoDB", "REST API"],
      period: "Nov 2024",
      description:
        "Full-stack farm management platform delivering real-time analytics on produce yield, inventory, and sustainable practice compliance",
      highlights: [
        "Architected full-stack platform delivering real-time analytics for 30+ farm units",
        "Integrated data-driven decision-making modules improving yield forecasting accuracy by 23% and reducing input waste by 18%",
        "Built 5 analytics dashboards visualizing 8+ crop and inventory KPIs",
      ],
      stats: { farms: 30, forecasting: 23, wasteReduction: 18, dashboards: 5 },
      status: "DEPLOYED",
    },
    {
      id: "proj-5",
      name: "Stock Price Prediction Model",
      cockpitLabel: "MISSION: STOCK-AI",
      tech: ["Python", "Scikit-learn", "Pandas"],
      period: "Aug 2024",
      description:
        "Predictive ML model for NSE-listed equities using 5+ years of OHLCV data with feature engineering and hyperparameter tuning",
      highlights: [
        "Built predictive ML model for 15 NSE-listed equities achieving 79% directional accuracy",
        "Reduced model inference latency by 40% through vectorized Pandas operations and caching",
      ],
      stats: { equities: 15, accuracy: 79, latencyReduction: 40 },
      status: "COMPLETE",
    },
  ],

  skills: {
    systems: {
      label: "AIRCRAFT SYSTEMS",
      categories: [
        {
          name: "Languages",
          icon: "code",
          items: ["Python", "C++", "Java", "JavaScript", "Dart"],
        },
        {
          name: "Frameworks",
          icon: "layers",
          items: [
            "React",
            "Node.js",
            "Express.js",
            "FastAPI",
            "Flutter",
            "TensorFlow",
            "Keras",
            "OpenCV",
            "YOLOv8",
          ],
        },
        {
          name: "Databases",
          icon: "database",
          items: ["MongoDB", "MySQL", "Neo4j"],
        },
        {
          name: "Tools & DevOps",
          icon: "settings",
          items: ["Git", "GitHub", "Docker", "CI/CD", "N8N Workflow Automation", "Vite", "Tailwind CSS"],
        },
        {
          name: "Cloud",
          icon: "cloud",
          items: ["AWS (EC2, S3, Lambda)", "Oracle OCI"],
        },
        {
          name: "Concepts",
          icon: "brain",
          items: [
            "REST API Design",
            "Agile / Scrum",
            "Machine Learning",
            "Computer Vision",
            "Generative AI",
          ],
        },
      ],
    },
  },

  certifications: [
    {
      id: "cert-1",
      name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      year: 2025,
      level: "PROFESSIONAL",
    },
    {
      id: "cert-2",
      name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      year: 2025,
      level: "ASSOCIATE",
    },
    {
      id: "cert-3",
      name: "Introduction to Machine Learning",
      issuer: "IBM",
      year: 2024,
      level: "FOUNDATION",
    },
  ],

  missionStats: {
    projectsDeployed: 5,
    linesOfCode: "50K+",
    mlAccuracy: "91%",
    studentsImpacted: 300,
    iotSensors: 12,
    cgpa: 8.53,
  },

  cockpitMap: {
    "ENGINE START": "hero",
    RADAR: "skills",
    "NAVIGATION MAP": "projects",
    "WEAPONS SYSTEM": "achievements",
    "FLIGHT LOGS": "experience",
    "COMM PANEL": "contact",
  },
} as const;

export type Section = "hero" | "skills" | "projects" | "experience" | "certifications" | "contact";
