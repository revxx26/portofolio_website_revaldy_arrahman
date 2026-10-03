export const profile = {
  name: "Revaldy Arrahman",
  email: "revaldyarrhmn@gmail.com",
  linkedin: "https://www.linkedin.com/in/revaldy-arrahman-369a56316",
  github: "https://github.com/revxx26",
  // Set these only after inspecting the supplied files. Paths are relative to public/.
  photo: "/images/profile/revaldy-arrahman-760.webp",
  cv: "/documents/cv/CV_ATS_REVALDY_ARRAHMAN.pdf",
};

export const navigation = ["Home", "About", "Projects", "Experience", "Volunteer", "Certifications", "Skills", "Contact"];

// Volunteer details supplied by the owner. Dates are known to month precision only.
export const volunteering = [
  {
    id: "power-bi-teaching", title: "Power BI learning session", organization: "SMK Negeri 22 Jakarta",
    role: "Volunteer instructor · Student team", context: "University community engagement program",
    date: "2025-05", dateLabel: "May 2025",
    description: "Delivered a Power BI learning session for vocational high school students as part of a university community engagement program. Introduced students to the fundamentals of Power BI, data visualization, and basic dashboard creation. Collaborated with a student team to prepare and deliver the learning session.",
    image: "/images/volunteer/power-bi-smkn-22.webp", original: "/images/volunteer/power-bi-smkn-22-original.png",
    imageAlt: "Photo collage of the Power BI learning session at SMK Negeri 22 Jakarta, showing classroom teaching and student practice with the university student team",
    width: 2256, height: 1072,
  },
  {
    id: "excel-teaching", title: "Microsoft Excel for PAUD teachers", organization: "HIMPAUDI Cempaka Putih",
    role: "Volunteer instructor", context: "Basic Microsoft Excel training",
    date: "2024-11", dateLabel: "November 2024",
    description: "Taught basic Microsoft Excel skills to Early Childhood Education (PAUD) teachers, helping them streamline daily administrative tasks and data management.",
    image: "/images/volunteer/excel-himpaudi-cempaka-putih.webp", original: "/images/volunteer/excel-himpaudi-cempaka-putih-original.png",
    imageAlt: "Microsoft Excel training for PAUD teachers at HIMPAUDI Cempaka Putih, with participants using laptops during the session",
    width: 2112, height: 1104,
  },
];

// Names, issuers, dates and duration transcribed from the two supplied certificates.
// BNSP is omitted because no certificate or confirmed result was supplied.
export const certifications = [
  {
    id: "database-sql", title: "Database Design & Database Programming with SQL",
    issuer: "Kominfo · Digital Talent Scholarship", program: "Talent Scouting Academy 2024",
    type: "Training certificate", date: "2024-07-16", dateLabel: "16 July 2024", dateType: "Issued",
    description: "Completed 180 hours of training organized by Pusbang Proserti, from 19 February to 14 July 2024.",
    image: "/images/certificates/database-sql-preview.webp", certificate: "/documents/certificates/database-sql-kominfo-2024.png",
    imageAlt: "Revaldy Arrahman's Kominfo training certificate for Database Design and Database Programming with SQL, issued 16 July 2024",
    width: 1280, height: 904,
  },
  {
    id: "ms-office", title: "Institutional Competency Certification — MS Office",
    issuer: "LPK LCC · Computer & English Center", program: "Competency Test of MS Office",
    type: "Institutional competency certificate", date: "2023-03-29", dateLabel: "29 March 2023", dateType: "Test date",
    description: "Successfully completed the competency test in Microsoft Word, Microsoft Excel, and PowerPoint.",
    image: "/images/certificates/ms-office-preview.webp", certificate: "/documents/certificates/ms-office-lcc-2023.png",
    imageAlt: "Revaldy Arrahman's LPK LCC institutional competency certificate for Microsoft Office, with test date 29 March 2023",
    width: 1856, height: 1312,
  },
];

// Month/year ranges from the supplied ATS CV; no exact day was provided.
export const experiencePeriods = {
  ministry: { start: "2025-12", startLabel: "December 2025", end: "2026-02", endLabel: "February 2026" },
  palapa: { start: "2022-04", startLabel: "April 2022", end: "2022-06", endLabel: "June 2022" },
};

export const projects = [
  {
    id: "customer-churn", number: "01", title: "Customer churn analysis", category: "Analytics & predictive modeling",
    github: "https://github.com/revxx26/telco-customer-churn-analysis",
    description: "Understanding why customers leave, and making churn risk easier to explore.",
    tools: ["SQL", "Python", "SQLite", "Tableau"], image: "/images/projects/customer-churn-dashboard.jpg",
    imageAlt: "Original Tableau customer churn dashboard showing contract, tenure, payment method, and customer risk analysis",
    objective: "Identify customer churn risk and understand the main drivers in a Telco customer dataset.",
    source: "Telco customer dataset. The project contains 7,032 clean records.",
    process: ["Clean the data with SQL and prepare it for analysis in SQLite.", "Explore customer patterns and train a balanced logistic regression model in Python.", "Present churn drivers and customer risk scores in a Tableau dashboard."],
    output: "A customer churn risk dashboard with contract, tenure, payment method, feature importance, and customer risk views.",
    insight: "Monthly contracts have a 42.7% churn rate, compared with 2.85% for two-year contracts. Overall churn is 26.58%.",
    limitation: "The model reports 77% recall and 50% precision. These measures describe different trade-offs in identifying customers at risk.",
    metric: "7,032", metricLabel: "clean customer records", figureLabel: "Tableau · Original project dashboard", additionalImages: [],
  },
  {
    id: "mbg-sentiment", number: "02", title: "MBG sentiment analysis", category: "Natural language processing",
    github: profile.github,
    description: "Exploring sentiment in Indonesian social media posts about the MBG program.",
    contribution: "Collaborated with the team to develop the Python code for data analysis.",
    tools: ["Python", "NLTK", "Sastrawi", "scikit-learn"], image: "/images/projects/mbg-confusion-matrix.png",
    imageAlt: "Original notebook confusion matrix: 274 positive posts classified correctly and 30 negative posts classified correctly, with 71 misclassified negative posts",
    objective: "Classify positive and negative sentiment in social media posts about the MBG program.",
    source: "1,875 positive and negative posts, with automatic sentiment labels. The notebook test set contains 375 posts.",
    process: ["Clean, tokenize, and stem Indonesian text using NLTK and Sastrawi.", "Create automatic sentiment labels and represent the text with TF-IDF.", "Train a Multinomial Naïve Bayes classifier and evaluate the test predictions."],
    output: "A text classification notebook, confusion matrix, and word clouds for positive and negative sentiment.",
    insight: "The notebook reports 81.07% test accuracy. The confusion matrix shows that negative-class recall needs improvement.",
    limitation: "The accompanying paper reports 90.11% accuracy, while the notebook output in the deck reports 81.07%. The labels are automatically generated, rather than human-verified ground truth.",
    metric: "1,875", metricLabel: "social media posts", figureLabel: "Python · Notebook confusion matrix",
    additionalImages: [{ src: "/images/projects/mbg-word-clouds.png", alt: "Original project word clouds for positive and negative Indonesian sentiment", caption: "Words in the positive and negative sentiment data" }],
  },
  {
    id: "east-java-poverty", number: "03", title: "East Java poverty classification", category: "Academic team project",
    github: profile.github,
    description: "Examining regional socioeconomic indicators through classification.",
    contribution: "Collaborated with the team to develop the Python code for data analysis.",
    tools: ["Python", "Orange", "Naïve Bayes"], image: "/images/projects/east-java-regional-analysis.png",
    imageAlt: "Original Orange scatter plot from the academic paper comparing socioeconomic indicators for East Java regions",
    objective: "Explore poverty categories across East Java's cities and regencies in an academic team project.",
    source: "Regional socioeconomic data. The deck does not name a specific originating dataset.",
    process: ["Compare class statistics across regional socioeconomic indicators.", "Calculate Bayes probabilities and evaluate classifications using Python and Orange.", "Review the paper's five-fold cross-validation results."],
    output: "Regional classification analysis and Orange evaluation figures in the academic paper.",
    insight: "The paper identifies Sampang, Bangkalan, and Sumenep in the poverty class. It reports 92.1% accuracy and an AUC of 0.276.",
    limitation: "The low reported AUC means the accuracy figure alone does not demonstrate reliable class discrimination.",
    metric: "5-fold", metricLabel: "cross-validation in paper", figureLabel: "Orange · Original paper figure",
    additionalImages: [{ src: "/images/projects/east-java-evaluation.png", alt: "Original Orange evaluation reporting Naïve Bayes AUC 0.276 and classification accuracy 0.921", caption: "Evaluation results as reported in the paper" }],
  },
];

export const skills = [
  { name: "SQL", icon: "database", logo: "" },
  { name: "PostgreSQL", icon: "", logo: "/images/skills/postgresql.svg" },
  { name: "MySQL", icon: "", logo: "/images/skills/mysql.svg" },
  { name: "Python", icon: "", logo: "/images/skills/python.svg" },
  { name: "Tableau", icon: "", logo: "/images/skills/tableau.svg" },
  { name: "Power BI", icon: "", logo: "/images/skills/powerbi.svg" },
  { name: "GitHub", icon: "", logo: "/images/skills/github.svg" },
  { name: "Microsoft Office", icon: "", logo: "/images/skills/microsoftoffice.svg" },
  { name: "Google Workspace", icon: "", logo: "/images/skills/google.svg" },
  { name: "AI Tools", icon: "bot", logo: "" },
];
