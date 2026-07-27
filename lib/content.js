export const site = {
  name: "Vamsi Revada",
  role: "Full-Stack Developer",
  email: "hello@vamsirevada.dev",
  calendlyUrl: "https://calendly.com/vamsirevada/intro",
  linkedinUrl: "https://linkedin.com/in/vamsirevada",
  githubUrl: "https://github.com/vamsirevada",
  githubUsername: "vamsirevada",
  resumeUrl: "/Vamsi_Revada_Resume.pdf",
  year: new Date().getFullYear(),
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const dockLinks = [
  { href: "#top", icon: "home" },
  { href: "#work", icon: "work" },
  { href: "#services", icon: "services" },
  { href: "#contact", icon: "contact" },
];

export const differentiators = [
  {
    n: "01",
    title: "End-to-end ownership",
    desc: "From architecture to deployment, I own the whole stack.",
  },
  {
    n: "02",
    title: "Real-time by default",
    desc: "Comfortable building live, collaborative, low-latency systems.",
  },
  {
    n: "03",
    title: "Design-literate engineering",
    desc: "I ship interfaces that look as good as they perform.",
  },
];

export const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "React Native",
  "Expo",
  "PostgreSQL",
  "Prisma",
  "Socket.IO",
  "LiveKit",
  "Google Cloud",
  "AWS",
  "Docker",
];

export const featuredProjects = [
  {
    tag: "Product · Reservations",
    name: "Waitless",
    oneLiner:
      "Real-time restaurant reservations — skip the wait, dine better.",
    problem:
      "Diners waste time guessing which restaurants have room, while restaurants lose walk-ins to inaccurate wait estimates and manual seating.",
    solution:
      "A live table-availability engine with sub-30-second bookings, seating preferences, and a staff dashboard for real-time floor management across multiple devices.",
    outcome:
      "50+ restaurant partners live in Hyderabad, with instant table visibility replacing phone-call guesswork.",
    tech: ["Next.js", "PostgreSQL", "Socket.IO", "AI/ML"],
    demo: "https://wait-less.in",
    github: "#",
    caseStudy: "#work",
    imgId: "project-waitless",
    img: "/screenshots/waitless.jpg",
    imgPlaceholder: "Waitless — product screenshot",
  },
  {
    tag: "Product · Live Video",
    name: "HeatedDebates",
    oneLiner:
      "Live debate rooms across dozens of topics — join, express yourself, no boring small talk.",
    problem:
      "Public debate online is unmoderated, low-quality, and hard to monetize.",
    solution:
      "Live debate rooms built on LiveKit spanning politics, religion, tech and more, with a gamified leaderboard, points, and a wallet/shop for monetization.",
    outcome:
      "Live on Google Play with real debaters and an active leaderboard; iOS in progress.",
    tech: ["React Native", "LiveKit", "Node.js", "Stripe"],
    demo: "https://heateddebatesapp.com",
    github: "#",
    caseStudy: "#work",
    imgId: "project-heateddebates",
    img: "/screenshots/heateddebates.jpg",
    imgPlaceholder: "HeatedDebates — product screenshot",
  },
  {
    tag: "Product · B2B Marketplace",
    name: "Thirtee",
    oneLiner: "The easiest way to procure construction materials — over WhatsApp.",
    problem:
      "Builders waste days calling vendors for quotes, with no way to compare prices or get credit without paperwork.",
    solution:
      "A WhatsApp-based ordering system that pulls multi-vendor quotes within minutes and offers buy-now-pay-later credit with zero paperwork.",
    outcome:
      "500+ contractors and 150+ vendors onboarded, with zero setup fees and no app download required.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    demo: "https://thirtee.in",
    github: "#",
    caseStudy: "#work",
    imgId: "project-thirtee",
    img: "/screenshots/thirtee.jpg",
    imgPlaceholder: "Thirtee — product screenshot",
  },
];

export const otherProjects = [
  {
    name: "coNexT",
    oneLiner:
      "Multi-tenant platform for gated communities — a resident social app, a security gate-ops app, and an admin console, all on one real-time backend.",
    tech: ["Flutter", "NestJS", "Prisma", "Supabase"],
    imgId: "project-conext",
    imgPlaceholder: "coNexT — screenshot",
  },
  {
    name: "Superliora Logistics",
    oneLiner:
      "Fleet and logistics dashboard for real-time shipment tracking — built for a 3PL running 10k+ deliveries a day at 99% on-time for Amazon, Flipkart and Meesho.",
    tech: ["React", "Node.js", "AWS"],
    imgId: "project-superior",
    img: "/screenshots/superliora.jpg",
    imgPlaceholder: "Superliora Logistics — screenshot",
  },
  {
    name: "Integration Solutions",
    oneLiner:
      "Middleware platform connecting SaaS tools through unified APIs.",
    tech: ["Node.js", "PostgreSQL", "Docker"],
    imgId: "project-integration",
    imgPlaceholder: "Integration Solutions — screenshot",
  },
  {
    name: "Instamovie",
    oneLiner:
      "AI-powered movie discovery that matches you to your next watch by mood, genre, language and streaming platform.",
    tech: ["Next.js", "OpenAI", "Tailwind CSS"],
    imgId: "project-instamovie",
    img: "/screenshots/instamovie.jpg",
    imgPlaceholder: "Instamovie — screenshot",
  },
  {
    name: "Holy Bible India",
    oneLiner:
      "Notion-style, minimalist Bible app that generates scripture on demand via Gemini AI, with deep search across 5 languages.",
    tech: ["React", "Vite", "Gemini AI"],
    imgId: "project-bible",
    imgPlaceholder: "Holy Bible India — screenshot",
  },
];

export const services = [
  {
    n: "01",
    title: "Web Applications",
    desc: "Fast, accessible, production-grade web apps built with Next.js and React.",
  },
  {
    n: "02",
    title: "Mobile Apps",
    desc: "Native-feel iOS and Android apps with React Native and Expo.",
  },
  {
    n: "03",
    title: "Backend APIs",
    desc: "Reliable, well-documented APIs built for scale.",
  },
  {
    n: "04",
    title: "AI Integrations",
    desc: "LLM-powered features, from chat to automation, shipped responsibly.",
  },
  {
    n: "05",
    title: "Cloud Deployment",
    desc: "CI/CD, infrastructure and deployment on AWS and Google Cloud.",
  },
  {
    n: "06",
    title: "Payment Integrations",
    desc: "Stripe-powered checkout, subscriptions and billing.",
  },
  {
    n: "07",
    title: "Performance Optimisation",
    desc: "Faster load times, smoother interactions, better Core Web Vitals.",
  },
];

export const timelineItems = [
  {
    year: "2026 — Present",
    title: "Independent Freelance Developer",
    desc: "Partnering directly with founders to design, build and ship full-stack products.",
  },
  {
    year: "2023 — 2026",
    title: "Full-Stack Engineer, Early-Stage Startups",
    desc: "Built and scaled real-time and AI-powered products from zero to launch.",
  },
  {
    year: "2021 — 2023",
    title: "Mobile & Backend Developer",
    desc: "Shipped cross-platform mobile apps and the APIs behind them.",
  },
  {
    year: "2020 — 2021",
    title: "Started Freelancing",
    desc: "Took on first paid projects while sharpening the full stack.",
  },
];

export const processSteps = [
  { n: "01", title: "Discovery", desc: "Understand the goal, users and constraints." },
  { n: "02", title: "Planning", desc: "Scope, architecture and timeline." },
  { n: "03", title: "Design", desc: "Wireframes and interface design." },
  { n: "04", title: "Development", desc: "Iterative builds with regular check-ins." },
  { n: "05", title: "Deployment", desc: "Ship to production with CI/CD." },
  { n: "06", title: "Support", desc: "Monitoring, fixes and future iterations." },
];

export const skillCategories = [
  { cat: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Anime.js"] },
  { cat: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "Socket.IO"] },
  { cat: "Mobile", items: ["React Native", "Expo"] },
  { cat: "Cloud & DevOps", items: ["AWS", "Google Cloud", "Docker"] },
  { cat: "AI & Realtime", items: ["LLM Integrations", "LiveKit"] },
];

export const stats = [
  { value: 7, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];
