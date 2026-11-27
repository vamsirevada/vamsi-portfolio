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

export const portfolioHeadline = "Booking and operations software for founders";
export const portfolioDescription =
  "Full-stack development for founders building booking tools, live availability, and operational workflows.";

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
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

export const heatedDebates = {
  name: "HeatedDebates",
  oneLiner: "Live debate rooms organized by topic.",
  workflow: "The lobby separates live discussions from scheduled debates and gives each room a dedicated join action.",
  tech: ["React Native", "LiveKit", "Node.js", "Stripe"],
  img: "/screenshots/heateddebates.jpg",
  imageAlt: "HeatedDebates lobby showing a featured debate, live room cards, and navigation for topics and scheduled debates",
  caseStudyHref: "/work/heateddebates",
};

export const featuredProjects = [
  heatedDebates,
  waitless,
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
    title: "Web and mobile apps",
    desc: "Customer portals, booking interfaces, and iOS and Android apps.",
  },
  {
    title: "APIs and payments",
    desc: "Connect your app to existing systems and add checkout, subscriptions, or billing.",
  },
  {
    title: "AI integrations",
    desc: "Add features like document search, chat, and workflow automation.",
  },
  {
    title: "Performance improvements",
    desc: "Find what slows down your existing app and improve load times and responsiveness.",
  },
];

export const timelineItems = [
  { year: "2026 — Present", title: "Independent Freelance Developer" },
  { year: "2023 — 2026", title: "Full-Stack Engineer, Early-Stage Startups" },
  { year: "2021 — 2023", title: "Mobile & Backend Developer" },
  { year: "2020 — 2021", title: "Started Freelancing" },
];

export const processSteps = [
  { title: "Scope the project", desc: "Agree on who it’s for, what it needs to do, and what ships first." },
  { title: "Design and build", desc: "Review the workflow in working demos and adjust it as we go." },
  { title: "Launch and hand off", desc: "Deploy the app and document what your team needs to run it." },
];
