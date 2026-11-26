export const site = {
  name: "Vamsi Revada",
  role: "Full-Stack Developer",
  email: "hello@vamsirevada.com",
  linkedinUrl: "https://www.linkedin.com/in/revadavamsi",
  githubUrl: "https://github.com/vamsirevada",
  githubUsername: "vamsirevada",
  resumeUrl: "/Vamsi_Revada_Resume.pdf",
  year: new Date().getFullYear(),
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const differentiators = [
  {
    title: "End-to-end ownership",
    desc: "From architecture to deployment, I own the whole stack.",
  },
  {
    title: "Real-time by default",
    desc: "Comfortable building live, collaborative, low-latency systems.",
  },
  {
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

export const waitless = {
  name: "Waitless",
  oneLiner: "Real-time restaurant reservations.",
  workflow: "Diners can see which tables are available, compare wait estimates, and reserve a table.",
  tech: ["Next.js", "PostgreSQL", "Socket.IO", "AI/ML"],
  img: "/screenshots/waitless.jpg",
  imageAlt: "Waitless landing page with a live table-availability preview",
  caseStudyHref: "/work/waitless",
};

export const featuredProjects = [
  waitless,
  {
    name: "HeatedDebates",
    oneLiner: "Live debate rooms organized by topic.",
    workflow: "The lobby separates live discussions from scheduled debates and gives each room a dedicated join action.",
    tech: ["React Native", "LiveKit", "Node.js", "Stripe"],
    img: "/screenshots/heateddebates.jpg",
    imageAlt: "HeatedDebates — product screenshot",
  },
  {
    name: "Thirtee",
    oneLiner: "Construction materials procurement over WhatsApp.",
    workflow: "A buyer can message a materials request and receive vendor quotes in the same conversation.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    img: "/screenshots/thirtee.jpg",
    imageAlt: "Thirtee — product screenshot",
  },
];

export const otherProjects = [
  {
    name: "coNexT",
    oneLiner:
      "Multi-tenant platform for gated communities — a resident social app, a security gate-ops app, and an admin console, all on one real-time backend.",
    tech: ["Flutter", "NestJS", "Prisma", "Supabase"],
    img: "/screenshots/conext.jpg",
    imageAlt: "coNexT — screenshot",
  },
  {
    name: "Superliora Logistics",
    oneLiner: "Fleet and logistics dashboard for real-time shipment tracking.",
    tech: ["React", "Node.js", "AWS"],
    img: "/screenshots/superliora.jpg",
    imageAlt: "Superliora Logistics logo",
  },
  {
    name: "Integration Solutions",
    oneLiner:
      "Middleware platform connecting SaaS tools through unified APIs.",
    tech: ["Node.js", "PostgreSQL", "Docker"],
    img: "/screenshots/integrationsolutions.jpg",
    imageAlt: "Integration Solutions — screenshot",
  },
  {
    name: "Instamovie",
    oneLiner:
      "AI-powered movie discovery that matches you to your next watch by mood, genre, language and streaming platform.",
    tech: ["Next.js", "OpenAI", "Tailwind CSS"],
    img: "/screenshots/instamovie.jpg",
    imageAlt: "Instamovie — screenshot",
  },
  {
    name: "Vanity",
    oneLiner:
      "Professional networking platform for India's media & entertainment industry — showcase portfolios, connect with industry professionals, and find collaboration opportunities.",
    tech: ["React", "Node.js", "MongoDB", "Firebase"],
    img: "/screenshots/vanity.jpg",
    imageAlt: "Vanity — screenshot",
  },
  {
    name: "Holy Bible India",
    oneLiner:
      "Notion-style, minimalist Bible app that generates scripture on demand via Gemini AI, with deep search across 5 languages.",
    tech: ["React", "Vite", "Gemini AI"],
    img: "/screenshots/holybibleindia.jpg",
    imageAlt: "Holy Bible India — screenshot",
  },
];

export const services = [
  {
    title: "Web Applications",
    desc: "Fast, accessible, production-grade web apps built with Next.js and React.",
  },
  {
    title: "Mobile Apps",
    desc: "Native-feel iOS and Android apps with React Native and Expo.",
  },
  {
    title: "Backend APIs",
    desc: "Reliable, well-documented APIs built for scale.",
  },
  {
    title: "AI Integrations",
    desc: "LLM-powered features, from chat to automation, shipped responsibly.",
  },
  {
    title: "Cloud Deployment",
    desc: "CI/CD, infrastructure and deployment on AWS and Google Cloud.",
  },
  {
    title: "Payment Integrations",
    desc: "Stripe-powered checkout, subscriptions and billing.",
  },
  {
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
