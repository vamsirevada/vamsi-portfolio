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
      "Restaurant reservation platform with live table availability and AI wait-time prediction.",
    problem:
      "Restaurants lose walk-ins to inaccurate wait estimates and manual seating.",
    solution:
      "A real-time availability engine with AI-predicted wait times and a staff dashboard for live floor management.",
    outcome:
      "Cut guest wait-time inaccuracy and gave staff a live view of the floor.",
    tech: ["Next.js", "PostgreSQL", "Socket.IO", "AI/ML"],
    demo: "#",
    github: "#",
    caseStudy: "#work",
    imgId: "project-waitless",
    imgPlaceholder: "Waitless — product screenshot",
  },
  {
    tag: "Product · Live Video",
    name: "HeatedDebates",
    oneLiner:
      "Real-time debate platform with live video rooms, streaming, moderation and payments.",
    problem:
      "Public debate online is unmoderated, low-quality, and hard to monetize.",
    solution:
      "Live video debate rooms built on LiveKit with real-time moderation tools and integrated payments for premium rooms.",
    outcome:
      "Enabled live, moderated debates at scale with built-in monetization.",
    tech: ["React Native", "LiveKit", "Node.js", "Stripe"],
    demo: "#",
    github: "#",
    caseStudy: "#work",
    imgId: "project-heateddebates",
    imgPlaceholder: "HeatedDebates — product screenshot",
  },
];

export const otherProjects = [
  {
    name: "Conext",
    oneLiner:
      "Contract management platform with e-signatures and audit trails for legal teams.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    imgId: "project-conext",
    imgPlaceholder: "Conext — screenshot",
  },
  {
    name: "Superior Logistics",
    oneLiner:
      "Fleet and logistics dashboard for real-time shipment tracking.",
    tech: ["React", "Node.js", "AWS"],
    imgId: "project-superior",
    imgPlaceholder: "Superior Logistics — screenshot",
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
    name: "InstaMovie",
    oneLiner: "Movie discovery and ticket-booking app with instant checkout.",
    tech: ["React Native", "Expo", "Stripe"],
    imgId: "project-instamovie",
    imgPlaceholder: "InstaMovie — screenshot",
  },
  {
    name: "Bible",
    oneLiner: "Daily scripture reading and study app with offline access.",
    tech: ["React Native", "Expo"],
    imgId: "project-bible",
    imgPlaceholder: "Bible app — screenshot",
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
