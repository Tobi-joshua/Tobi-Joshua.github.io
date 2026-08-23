export const DETAIL_SECTIONS = {
  "11": [
    { title: "Platform systems", items: ["Student and tutor onboarding workflows", "Question/request lifecycle and tutor matching", "Tutor notifications (email/SMS)", "Dashboards and operational administration"] },
    { title: "Commerce & support", items: ["Payment workflows and withdrawals", "User accounts and RBAC", "Support tooling and operational workflows"] },
    { title: "Stack", items: ["Django REST API with PostgreSQL", "React web client", "React Native mobile app with Firebase", "Paystack payment integration"] }
  ],
  "12": [
    { title: "Integration", items: ["Branded virtual classroom on BigBlueButton", "Meeting creation and scheduling", "Access control tied to tutoring platform", "Student/tutor session workflows"] },
    { title: "Session capabilities", items: ["Live video/audio and virtual classrooms", "Screen sharing and whiteboard", "Lesson sessions and moderation", "Platform integration (not upstream BBB core)"] }
  ],
  "13": [
    { title: "Product", items: ["Expert Hive OS — intelligent school operating system by Expert Hive Technologies", "Repository codename: EduFlow", "Currently in private beta evaluation (not publicly available)"] },
    { title: "Roles", items: ["Owner — billing, subscriptions, analytics", "Principal — staff, academics, payroll, teacher approval", "Teacher — classes, attendance, assessments", "Parent — attendance, report cards, announcements"] },
    { title: "Stack", items: ["Backend: Django 3.12+, DRF, SimpleJWT, PostgreSQL", "Frontend: React, Vite, TypeScript, Axios", "Integrations: Paystack, Groq AI, Cloudflare R2"] },
    { title: "Engineering", items: ["12 documented API modules with OpenAPI schema", "School-scoped RBAC with JWT rotation", "RC2 production hardening pass", "Function-based views, comprehensive docs/"] }
  ],
  "14": [
    { title: "Research approach", items: ["Paired with-skill vs without-skill evaluation", "Safety constraints and negative-result recording", "Progressive disclosure skill format (PSKILL.md)", "BenchFlow 0.6.3 runtime audit"] },
    { title: "Repository", items: ["Static skill library in skills/", "Validation, hashing, and packaging scripts", "Smoke and scored EXP ablation runs", "Kaggle Agent Skill Lift competition entry"] }
  ],
  "10": [
    { title: "Product", items: ["Expert Hive OS — intelligent school operating system by Expert Hive Technologies", "Repository codename: EduFlow", "Currently in private beta evaluation (not publicly available)"] },
    { title: "Roles", items: ["Owner — billing, subscriptions, analytics", "Principal — staff, academics, payroll, teacher approval", "Teacher — classes, attendance, assessments", "Parent — attendance, report cards, announcements"] },
    { title: "Stack", items: ["Backend: Django 3.12+, DRF, SimpleJWT, PostgreSQL", "Frontend: React, Vite, TypeScript, Axios", "Integrations: Paystack, Groq AI, Cloudflare R2"] },
    { title: "Engineering", items: ["12 documented API modules with OpenAPI schema", "School-scoped RBAC with JWT rotation", "RC2 production hardening pass", "Function-based views, comprehensive docs/"] }
  ],
  "9": [
    { title: "Pipeline", items: ["Detection via local maxima + centroid refinement", "Hungarian linking with motion/intensity costs", "Mitosis inference with symmetry scoring", "Gap closing and orphan pruning"] },
    { title: "Outputs", items: ["Streamlit UI with volume, detection, lineage views", "GIF time-lapse and publication figures", "CSV/JSON lineage graph export", "IEEE-style paper in repo"] }
  ],
  "8": [
    { title: "ML", items: ["TF-IDF (unigram + bigram) features", "Logistic regression classifier", "96.6% accuracy, 99.1% precision", "Token-level explainability"] },
    { title: "App", items: ["Real-time and batch CSV inference", "Adjustable spam threshold", "Prediction history and downloads"] }
  ],
  "7": [
    { title: "Platform", items: ["Draft → pending review → published lifecycle", "Multi-image AdImage model with CDN delivery", "Stripe, mobile money, and crypto payments", "Location and price indexed search"] }
  ],
  "6": [
    { title: "Pipeline", items: ["AI.GENERATE summarization in BigQuery", "Vertex AI embeddings for semantic search", "t-SNE cluster visualization with Plotly", "Cost-optimized idempotent dataset creation"] }
  ],
  "5": [
    { title: "Package", items: ["Published on npm as react-typeflare", "Typewriter + confetti animations", "Reverse loop and pause-on-hover", "Customizable cursor and speeds"] }
  ],
  "4": [
    { title: "Detection", items: ["Random Forest on CICIDS 2018 + SCVIC-APT", "Autoencoder anomaly detection", "Live packet capture via Npcap", "Flask web dashboard"] }
  ],
  "3": [
    { title: "Features", items: ["Q&A, video courses, live classes, materials store", "React Native + Expo frontend", "Django REST + Firebase backend", "Wallet, push notifications, real-time chat"] }
  ],
  "2": [
    { title: "API", items: ["Question CRUD with tutor notifications", "Email + SMS alerts", "Swagger/OpenAPI documentation", "Production deployment"] }
  ],
  "1": [
    { title: "Frontend", items: ["Responsive React client", "Django API integration", "Tutoring marketplace UI", "Private repository — email for access"] }
  ]
};

export const DETAIL_IMAGES = {
  "11": [
    { src: "https://ik.imagekit.io/experthivetutors/475547188-b3e3900e-1dcb-4b7a-9107-cda8e82c6112.png?updatedAt=1754575285959", title: "Expert Hive Tutors" },
    { src: "https://ik.imagekit.io/experthivetutors/Screenshot%202025-08-07%20081829.png?updatedAt=1754580024741", title: "Platform" }
  ],
  "12": [
    { src: "https://ik.imagekit.io/experthivetutors/Screenshot%202025-08-07%20081829.png?updatedAt=1754580024741", title: "Virtual classroom" }
  ],
  "14": [
    { src: "https://raw.githubusercontent.com/Tobi-joshua/benchflow-agent-skill-lift/main/docs/assets/kaggle-card-560x280.png", fallback: "assets/images/eduflow-preview.svg", title: "BenchFlow Skill Lift" }
  ],
  "10": [
    { src: "assets/images/eduflow.png", fallback: "assets/images/eduflow-preview.svg", title: "Expert Hive OS" }
  ],
  "9": [
    { src: "https://raw.githubusercontent.com/Tobi-joshua/Biohub---Cell-Tracking-During-Development/main/figures/pipeline_overview.png", title: "Pipeline" },
    { src: "https://raw.githubusercontent.com/Tobi-joshua/Biohub---Cell-Tracking-During-Development/main/figures/detection_overlay.png", title: "Detection" },
    { src: "https://raw.githubusercontent.com/Tobi-joshua/Biohub---Cell-Tracking-During-Development/main/figures/lineage_graph.png", title: "Lineage" }
  ],
  "8": [
    { src: "https://ik.imagekit.io/ooiob6xdv/image.png", title: "App" },
    { src: "https://ik.imagekit.io/ooiob6xdv/image-1.png", title: "Results" }
  ],
  "7": [
    { src: "https://ik.imagekit.io/ooiob6xdv/home.png?updatedAt=1755605807062", title: "Home" },
    { src: "https://ik.imagekit.io/ooiob6xdv/d1.png?updatedAt=1755605086287", title: "Dashboard" }
  ],
  "6": [{ src: "https://ik.imagekit.io/ooiob6xdv/AI-Powered%20Developer%20Helpdesk1755041295.jpg?updatedAt=1755169343431", title: "Pipeline" }],
  "5": [{ src: "https://raw.githubusercontent.com/Tobi-joshua/react-typeflare/main/assets/basic_usage_with_confetti-ezgif.com-optimize.gif", title: "Demo" }],
  "4": [{ src: "https://ik.imagekit.io/experthivetutors/ds.png?updatedAt=1754607867802", title: "Dashboard" }],
  "3": [{ src: "https://ik.imagekit.io/experthivetutors/Screenshot_2025-08-07-12-38-35-009_com.experthivetutors.EHFS.jpg?updatedAt=1754574988667", title: "Mobile" }],
  "2": [
    { src: "https://ik.imagekit.io/experthivetutors/Screenshot%202025-08-07%20081829.png?updatedAt=1754580024741", title: "API" },
    { src: "https://ik.imagekit.io/experthivetutors/registration.png?updatedAt=1754596061218", title: "Registration" }
  ],
  "1": [{ src: "https://ik.imagekit.io/experthivetutors/475547188-b3e3900e-1dcb-4b7a-9107-cda8e82c6112.png?updatedAt=1754575285959", title: "Web UI" }]
};
