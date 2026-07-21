export const PROJECT_CATEGORIES = ["all", "Web App", "Dashboard", "Full Stack", "AI/ML"];

export const PROJECTS = [
  {
    id: "stock-analyzer",
    title: "Stock Analyzer",
    description:
      "An AI-powered market analysis app that tracks 100+ stocks daily, pulling live prices from multiple data APIs to surface AI-driven insights and movement predictions.",
    longDescription:
      "Built a real-time stock analysis platform combining a Next.js frontend with a FastAPI backend and PostgreSQL for persistence. Integrated multiple market data APIs to fetch live prices for 100+ stocks daily, then layered AI-driven analysis on top to help users read trends and predict movement instead of just staring at raw numbers.",
    tech: ["Next.js", "FastAPI", "PostgreSQL"],
    category: "AI/ML",
    featured: true,
    github: null,
    demo: "https://stock-tracker-one-smoky.vercel.app/login",
    image: "/projects/stock-analyzer.png",
    gradient: "from-emerald-600/40 to-green-900/60",
  },
  {
    id: "kraftell",
    title: "Kraftell",
    description:
      "A B2B marketplace connecting European manufacturers with buyers — separate manufacturer and buyer onboarding flows, plus an admin console to oversee the platform.",
    longDescription:
      "Built Kraftell, a marketplace platform positioned as 'a smarter approach to European manufacturing,' connecting manufacturers with buyers. Implemented distinct registration and login flows for manufacturers, buyers, and admins, alongside a marketing front end explaining the value proposition and how the platform works.",
    tech: ["Next.js", "Tailwind CSS"],
    category: "Full Stack",
    featured: false,
    github: null,
    demo: "https://kraf-tell.vercel.app/",
    image: "/projects/kraftell.png",
    gradient: "from-slate-600/40 to-blue-900/60",
  },
  {
    id: "pakjoblive",
    title: "PakJobLive",
    description:
      "A job aggregator that pulls 100+ listings a day from LinkedIn, Indeed, and JSearch across Pakistan, with smart filtering and matching to cut through the noise.",
    longDescription:
      "Developed a full-stack job aggregation platform on Next.js and FastAPI, backed by Neon Postgres. Built real-time ingestion pipelines that fetch 100+ job postings daily from LinkedIn, Indeed, and JSearch, then applied smart filtering and matching so users see relevant roles first instead of scrolling through duplicates.",
    tech: ["Next.js", "FastAPI", "Neon"],
    category: "Full Stack",
    featured: true,
    github: null,
    demo: "https://pak-live-job-5i67.vercel.app/",
    image: "/projects/pakjoblive.png",
    gradient: "from-orange-600/40 to-red-900/60",
  },
  {
    id: "ai-chatbot-langchain",
    title: "AI Chatbot with LangChain",
    description:
      "A multi-step conversation engine built on LangChain, combining OpenAI and Claude for context-aware reasoning and memory across a conversation.",
    longDescription:
      "Built an advanced chatbot using LangChain to orchestrate multi-step reasoning and memory management across a conversation, rather than treating each message as isolated. Integrated OpenAI and Claude models so the bot can hold context, follow up correctly, and reason through multi-turn requests.",
    tech: ["LangChain", "OpenAI", "Claude", "Python"],
    category: "AI/ML",
    featured: false,
    github: null,
    demo: null,
    image: null,
    gradient: "from-sky-600/40 to-indigo-900/60",
  },
  {
    id: "ericsson-5g-quest-map",
    title: "Ericsson 5G Quest Map",
    description:
      "An interactive, game-styled microsite for Ericsson that lets users explore 5G use cases across manufacturing, warehousing, transport, retail, and financial services through a quest-map interface.",
    longDescription:
      "Built a gamified, pixel-art styled microsite for Ericsson that reframes enterprise 5G use cases as an explorable quest map. Users navigate a private-to-public 5G spectrum across five industries — manufacturing, warehousing, transportation & logistics, retail, and financial services — clicking into each 'quest' to learn about solutions like intelligent inspection, autonomous mobile robots, connected vehicles, secure payments, and fraud prevention.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Web App",
    featured: false,
    github: null,
    demo: null,
    image: "/projects/ericsson-5g-quest-map.png",
    gradient: "from-indigo-600/40 to-slate-900/60",
  },
  {
    id: "leadnite",
    title: "LeadNite",
    description:
      "A modern, responsive startup consultancy website with a bold hero, service breakdown, and a live analytics dashboard preview to build instant credibility.",
    longDescription:
      "Designed and developed the marketing site for LeadNite (LeNi), a startup consultancy, end to end. Built a bold hero section, services and about pages, and an embedded dashboard preview (revenue and device-usage charts) to make the offering feel tangible. Focused on clean visual hierarchy, fast load times, and reusable components so the client could update content without touching code structure.",
    tech: ["React", "Next.js"],
    category: "Web App",
    featured: false,
    github: null,
    demo: "https://leads-nite.vercel.app/",
    image: "/projects/leadnite.png",
    gradient: "from-cyan-600/40 to-slate-900/60",
  },
  {
    id: "wedding-aisle",
    title: "WeddingAisle",
    description:
      "A UK wedding marketplace connecting couples with venues, photographers, videographers, and car hire — search by city and category, browse services, book direct.",
    longDescription:
      "Built WeddingAisle, a UK-focused wedding services marketplace connecting couples with vendors: venues, photographers, videographers, and car hire, plus business listings for vendors themselves. Implemented location and category-based search, a services carousel, and clean booking-oriented flows across account sign-up and login.",
    tech: ["React", "Next.js"],
    category: "Web App",
    featured: false,
    github: null,
    demo: "https://weddingaisle.co.uk/",
    image: "/projects/wedding-aisle.png",
    gradient: "from-rose-600/40 to-pink-900/60",
  },
  {
    id: "verocta",
    title: "Verocta",
    description:
      "A financial intelligence tool that turns messy bank feeds into clear insight — upload a CSV, get AI-driven spend analysis, and receive a SpendScore with tailored recommendations.",
    longDescription:
      "Built the product site and flow for Verocta, a tool that finds waste in business spending without consultants or spreadsheets. Users upload a CSV of transactions, the system runs AI analysis over it, and returns a SpendScore alongside concrete, tailored recommendations for cutting overspending and closing efficiency gaps.",
    tech: ["Next.js", "Tailwind CSS"],
    category: "AI/ML",
    featured: false,
    github: null,
    demo: "https://verocta.vercel.app/product",
    image: "/projects/verocta.png",
    gradient: "from-indigo-600/40 to-blue-900/60",
  },
  {
    id: "chat-application",
    title: "Chat Application",
    description:
      "A real-time messaging app with one-on-one chat, message history, and live online status indicators, wrapped in a clean, responsive interface.",
    longDescription:
      "Built a real-time chat application with a responsive messaging interface, covering one-on-one conversations, persistent chat history, and live online status indicators so users always know who's actually reachable.",
    tech: ["React", "Next.js"],
    category: "Full Stack",
    featured: false,
    github: null,
    demo: null,
    image: null,
    gradient: "from-fuchsia-600/40 to-purple-900/60",
  },
  {
    id: "the-huddle",
    title: "The Huddle",
    description:
      "A playful, penguin-themed community landing page with bold oversized typography, a scrolling marquee banner, and a snowy animated background.",
    longDescription:
      "Built The Huddle, a fun, character-driven landing page for a penguin-themed collectibles community. Combined oversized outlined typography, a looping marquee announcement bar, and an animated snowy background to give the brand a distinct, playful personality instead of a generic template feel.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
    category: "Web App",
    featured: false,
    github: null,
    demo: "https://thehuddle.netlify.app/",
    image: "/projects/the-huddle.png",
    gradient: "from-violet-600/40 to-purple-900/60",
  },
  {
    id: "graph-charts",
    title: "Graph & Charts Dashboard",
    description:
      "An interactive data visualization site using Chart.js and Swiper.js — featuring dynamic charts, carousel content, and responsive data presentation.",
    longDescription:
      "Created a data-driven dashboard with Chart.js visualizations and Swiper.js for dynamic content slides. Built reusable chart configurations and ensured accessible color contrast and responsive chart resizing.",
    tech: ["HTML", "CSS", "JavaScript", "Chart.js", "Swiper.js"],
    category: "Dashboard",
    featured: false,
    github: null,
    demo: null,
    image: null,
    gradient: "from-amber-600/40 to-orange-900/60",
  },
];
