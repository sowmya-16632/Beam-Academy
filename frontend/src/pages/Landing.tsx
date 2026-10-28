import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  ArrowRight,
  Code2,
  BrainCircuit,
  Coffee,
  Database,
  HelpCircle,
  FileText,
  CheckCircle2,
  Shield,
  Layers,
  Flame,
  TrendingUp,
  Target,
  ChevronDown,
  Terminal,
  Clock,
  Compass,
  Award,
  Zap,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>("sde");

  const tracks = [
    {
      id: "sde",
      title: "Software Developer (SDE)",
      badge: "High Demand",
      duration: "10-12 Weeks",
      desc: "Comprehensive roadmap covering Algorithms, Data Structures, OOP, System Design fundamentals, and core Computer Science subjects.",
      topics: ["Arrays & Sliding Window", "Trees & Graphs", "DBMS & SQL", "OS & Concurrency", "System Design Basics"],
    },
    {
      id: "java",
      title: "Java Developer",
      badge: "Enterprise Standard",
      duration: "8-10 Weeks",
      desc: "Deep dive into JVM memory models, Collections internals, Spring Boot REST APIs, JPA/Hibernate, and relational SQL optimization.",
      topics: ["JVM & Garbage Collection", "Concurrent Collections", "Spring Boot Architecture", "ACID & Indexing", "REST Security"],
    },
    {
      id: "python",
      title: "Python Developer",
      badge: "Rapid Growth",
      duration: "8 Weeks",
      desc: "Pythonic programming, algorithmic problem solving, SQL query mastery, APIs, and foundational data structures.",
      topics: ["Python Fundamentals", "DSA in Python", "Advanced SQL", "FastAPI / Django", "Data Structures"],
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      badge: "Placement Favorite",
      duration: "8-10 Weeks",
      desc: "Master modern React, TypeScript, RESTful backend services, database schemas, and clean client-server state management.",
      topics: ["React & TypeScript", "RESTful Architecture", "Relational Schema Design", "Auth & JWT", "Full-Stack Deployment"],
    },
    {
      id: "frontend",
      title: "Frontend Developer",
      badge: "UI Specialist",
      duration: "8 Weeks",
      desc: "Deep dive into modern React component architectures, state hooks, responsive styling, performance, and API integration.",
      topics: ["React 18 & 19", "TypeScript Typing", "Tailwind & CSS Architecture", "Client State Management", "Web Vitals & Performance"],
    },
    {
      id: "backend",
      title: "Backend Developer",
      badge: "System Core",
      duration: "10 Weeks",
      desc: "Architect scalable server-side systems, microservices, connection pooling, transactions, caching, and secure token auth.",
      topics: ["REST & API Design", "Database Query Tuning", "Authentication & Security", "Caching Strategies", "CI/CD & Deployment"],
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      badge: "Business Intelligence",
      duration: "6-8 Weeks",
      desc: "Master SQL aggregations, window functions, analytics data modeling, dashboards, and quantitative problem solving.",
      topics: ["SQL Window Functions", "Aggregation & Grouping", "Data Cleansing", "Metrics & KPIs", "Statistical Analysis"],
    },
    {
      id: "ai-ml",
      title: "AI / ML Engineer",
      badge: "Next Gen",
      duration: "10-12 Weeks",
      desc: "Foundations of machine learning, linear algebra, vector embeddings, RAG pipelines, and deploying LLM applications.",
      topics: ["Python for ML", "Data Pipelines & NumPy", "Vector Embeddings", "RAG & LLM Integration", "Model Serving & APIs"],
    },
    {
      id: "data-engineer",
      title: "Data Engineer",
      badge: "High Scale",
      duration: "10 Weeks",
      desc: "Build resilient ETL/ELT pipelines, distributed data storage schemas, stream processing, and dimensional warehousing.",
      topics: ["Data Warehousing & Star Schemas", "Columnar Storage", "ETL Architecture", "Distributed Querying", "Data Quality Testing"],
    },
    {
      id: "qa-engineer",
      title: "QA Automation Engineer",
      badge: "Quality Engineering",
      duration: "6-8 Weeks",
      desc: "End-to-end test automation, testing pyramid, API testing with REST clients, CI test pipelines, and defect prevention.",
      topics: ["Testing Pyramid & TDD", "API Test Automation", "Integration Testing", "Mocking & Test Fixtures", "CI/CD Test Gates"],
    },
    {
      id: "devops",
      title: "Cloud / DevOps Engineer",
      badge: "Infrastructure",
      duration: "8-10 Weeks",
      desc: "Containerization with Docker, multi-stage builds, cloud architecture, Infrastructure as Code, and CI/CD pipelines.",
      topics: ["Docker & Containers", "Linux Fundamentals", "CI/CD Automation", "Cloud Infrastructure Basics", "Observability & Metrics"],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Specialist",
      badge: "Security Defense",
      duration: "8-10 Weeks",
      desc: "OWASP Top 10 vulnerabilities, secure coding, authentication mechanisms, cryptography fundamentals, and API security auditing.",
      topics: ["OWASP Top 10 Defense", "SQL Injection & XSS", "Cryptographic Hashing", "Secure Auth (JWT/OAuth)", "API Hardening"],
    },
  ];


  const features = [
    {
      icon: Code2,
      color: "from-emerald-500 to-teal-500",
      title: "12 High-Yield DSA Patterns",
      desc: "Stop memorizing 500+ random problems. Learn the 12 underlying algorithmic patterns tested by top tech companies, with progressive 6-stage hints.",
      link: "/dsa",
    },
    {
      icon: BrainCircuit,
      color: "from-purple-500 to-indigo-500",
      title: "Quantitative & Aptitude Engine",
      desc: "Ace campus screening rounds with timed practice in Time & Work, Speed-Distance, Profit & Loss, Syllogisms, and step-by-step math breakdowns.",
      link: "/aptitude",
    },
    {
      icon: Coffee,
      color: "from-amber-500 to-orange-500",
      title: "Core CS & Java Curriculum",
      desc: "From JVM memory and multithreading to Relational SQL indexes and ACID guarantees — explained simply from beginner level to interview ready.",
      link: "/java",
    },
    {
      icon: HelpCircle,
      color: "from-rose-500 to-pink-500",
      title: "AI Mock Interview Simulator",
      desc: "Simulate real campus technical & HR interviews. Answer questions and receive instant scores, key missing concepts, and interviewer follow-ups.",
      link: "/interview",
    },
    {
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      title: "Portfolio Project Blueprints",
      desc: "Guided step-by-step fresher projects with architecture schemas, testing checklists, and STAR-method interview defense playbooks.",
      link: "/projects",
    },
    {
      icon: FileText,
      color: "from-teal-500 to-emerald-500",
      title: "ATS Resume & Career Toolkit",
      desc: "Structured fresher resume templates, ATS readability validator, 'Tell Me About Yourself' self-intro builder, and job application pipeline.",
      link: "/resume",
    },
  ];

  const faqs = [
    {
      q: "Is Beam Academy suitable for absolute beginners?",
      a: "Yes! Every track starts with fundamentals explained simply using analogies, visual diagrams, and code snippets before advancing to intermediate and interview-level concepts. Beginners start with our 15-minute diagnostic skill assessment.",
    },
    {
      q: "How does the Daily Learning Planner work?",
      a: "The planner generates an adaptive study schedule tailored to your daily available time (1 to 4 hours) and target role. It intelligently balances technical concepts, coding drills, aptitude practice, and spaced revision without overwhelming you.",
    },
    {
      q: "What happens if I miss a study day?",
      a: "Beam Academy uses a compassionate rollover system: missed tasks are gently redistributed across subsequent days without resetting your streaks or erasing previous progress.",
    },
    {
      q: "How does the AI Mock Interview provide feedback?",
      a: "Our placement engine evaluates your answer against key technical concepts, assessing accuracy, clarity, and depth. It provides a numeric score, identifies missed nuances, offers a model answer, and asks realistic follow-up questions.",
    },
    {
      q: "Is learner progress persistently saved?",
      a: "Yes. All topic completions, coding attempts, aptitude quiz scores, study plans, and resume drafts are saved securely in our MySQL database. Your progress is preserved across refreshes and logins.",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#080C14]/90 backdrop-blur-md border-b border-slate-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent">
              Beam
            </span>
            <span className="text-xs uppercase tracking-wider block font-semibold text-blue-400">
              Academy
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => scrollToSection("tracks")} className="hover:text-blue-400 transition-colors">
            Learning Paths
          </button>
          <button onClick={() => scrollToSection("features")} className="hover:text-blue-400 transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection("how-it-works")} className="hover:text-blue-400 transition-colors">
            Methodology
          </button>
          <Link to="/verify" className="hover:text-blue-400 transition-colors text-blue-300">
            Verify Certificate
          </Link>
          <button onClick={() => scrollToSection("faq")} className="hover:text-blue-400 transition-colors">
            FAQ
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Beam Academy • Free Engineering & Placement Preparation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Learn Skills. Build Proof.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              Become Career Ready.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A free, structured learning platform that helps students start from zero, master software skills, build real projects, practice interviews, track daily progress, and earn a Beam Academy completion certificate.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={user ? "/dashboard" : "/signup"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/25 transition-all hover:scale-105"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => scrollToSection("tracks")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Explore Career Paths</span>
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free for Students
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Progress
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Credentials
            </span>
          </div>
        </div>

        {/* VISUAL DASHBOARD PREVIEW CARD */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-1 border border-slate-700/60 shadow-2xl shadow-blue-950/40">
            <div className="bg-slate-950/90 rounded-xl p-6 sm:p-8 space-y-6">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">beam-academy / learner-portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-semibold">Live Preparation Engine</span>
                </div>
              </div>

              {/* Sample Dashboard Top Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Readiness Index</span>
                    <Award className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-white mt-2">78%</p>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "78%" }} />
                  </div>
                  <span className="text-[10px] text-blue-400 mt-1 block">Placement Benchmark: &gt;75%</span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Active Streak</span>
                    <Flame className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-2xl font-bold text-amber-400 mt-2">6 Days</p>
                  <p className="text-[10px] text-slate-400 mt-1">Consistent preparation pace</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Patterns Mastered</span>
                    <Code2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-emerald-400 mt-2">9 / 12</p>
                  <p className="text-[10px] text-slate-400 mt-1">Sliding Window, Two Pointers, Trees</p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Aptitude Accuracy</span>
                    <BrainCircuit className="w-4 h-4 text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-purple-400 mt-2">84%</p>
                  <p className="text-[10px] text-slate-400 mt-1">Speed: 42s / question</p>
                </div>
              </div>

              {/* Sample Mission + AI Guidance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Today's Recommended Mission
                    </span>
                    <span className="text-xs text-blue-400 font-semibold">2h Available Schedule</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-200">Java: HashMap Bucket Re-hashing & Red-Black Trees</p>
                        <p className="text-[11px] text-slate-400">30 mins • High Yield Concept</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Done</span>
                    </div>

                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-950/30 border border-blue-500/30">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-blue-200">DSA Drill: Two Sum with Optimal O(N) Hash Table</p>
                        <p className="text-[11px] text-blue-300/70">35 mins • High Priority Practice</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Next Up</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 p-4 rounded-xl border border-indigo-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Placement Coach Insight</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "You've shown strong mastery in Two Pointers and SQL Group By. Focus today on multithreading race conditions and your STAR resume intro."
                    </p>
                  </div>
                  <Link
                    to="/signup"
                    className="mt-4 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Start Your Personalized Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BEAM ACADEMY? SECTION */}
      <section className="py-20 bg-slate-950/70 border-t border-slate-800/80 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The Beam Academy Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Beam Academy?
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Built specifically for engineering students and freshers who want clear fundamentals, genuine coding practice, and verifiable proof of their skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">Start from Zero</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No prior coding experience required. Every concept starts with simple mental models, intuitive analogies, and clean step-by-step breakdowns.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Learn Step by Step</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured lessons provide clear learning objectives, prerequisite links, visual memory diagrams, worked code dry-runs, and common beginner mistakes.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Practice Every Day</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solve high-yield algorithmic patterns in the interactive browser playground, take timed quantitative aptitude drills, and build a lasting daily streak.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white">Ask AI Doubts (Beam Mentor)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask your dedicated learning companion for gentle hints, dry-run walkthroughs, simple analogies, or tricky interviewer-style follow-up questions.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                05
              </div>
              <h3 className="text-base font-bold text-white">Build Real Projects</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Portfolio-grade blueprints with complete architecture schemas, testing checklists, and STAR-method interview talking points for campus drives.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 space-y-3 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                06
              </div>
              <h3 className="text-base font-bold text-white">Track Genuine Progress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every completed lesson, quiz score, and code submission is persistently recorded in MySQL. No fake numbers or unearned vanity metrics.
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 p-6 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">07. Earn a Verified Completion Certificate</h3>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Completion certificates are granted strictly when backend evaluation proves you completed required curriculum modules, code challenges, and evaluations.
                  </p>
                </div>
              </div>
              <Link
                to="/verify"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors shrink-0"
              >
                View Certificate Verification
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL LEARNING JOURNEY PIPELINE */}
      <section className="py-20 bg-slate-950 border-y border-slate-800/80 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Your End-to-End Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The Beam Academy Learning Journey
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              From absolute zero to verified career readiness in 10 clear milestones.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 pt-4">
            {[
              { step: "01", label: "START", sub: "Join Free", color: "border-blue-500/40 bg-blue-950/40 text-blue-300" },
              { step: "02", label: "Skill Diagnostic", sub: "Baseline Test", color: "border-indigo-500/40 bg-indigo-950/40 text-indigo-300" },
              { step: "03", label: "Personal Roadmap", sub: "12 Curricula", color: "border-purple-500/40 bg-purple-950/40 text-purple-300" },
              { step: "04", label: "Daily Learning", sub: "Core Concepts", color: "border-sky-500/40 bg-sky-950/40 text-sky-300" },
              { step: "05", label: "Code Practice", sub: "DSA Playground", color: "border-emerald-500/40 bg-emerald-950/40 text-emerald-300" },
              { step: "06", label: "Assignments", sub: "Code Submissions", color: "border-teal-500/40 bg-teal-950/40 text-teal-300" },
              { step: "07", label: "Projects", sub: "Portfolio Lab", color: "border-amber-500/40 bg-amber-950/40 text-amber-300" },
              { step: "08", label: "Mock Interviews", sub: "Tech & HR Q&A", color: "border-rose-500/40 bg-rose-950/40 text-rose-300" },
              { step: "09", label: "Final Assessment", sub: "Evaluation", color: "border-violet-500/40 bg-violet-950/40 text-violet-300" },
              { step: "10", label: "Certificate", sub: "Verify & Share", color: "border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold" },
            ].map((st, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-center flex flex-col justify-between h-28 relative group hover:scale-105 transition-all ${st.color}`}
              >
                <span className="text-[10px] font-mono opacity-70 block">{st.step}</span>
                <p className="text-xs font-bold leading-tight my-auto">{st.label}</p>
                <span className="text-[10px] opacity-80 block truncate">{st.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-STEP METHODOLOGY SECTION */}
      <section id="how-it-works" className="py-20 bg-slate-950/50 border-b border-slate-800/80 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The 3-Step Placement Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How Beam Academy Guides Your Preparation
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              A transparent, structured system engineered to transform raw potential into verified technical confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 relative hover:border-slate-700 transition-all">
              <span className="text-5xl font-black text-slate-800 absolute top-6 right-6">01</span>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Assess Skills Baseline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take our 15-minute diagnostic assessment across programming logic, DSA patterns, aptitude, and core CS to identify your exact strengths and target focus areas.
              </p>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 relative hover:border-slate-700 transition-all">
              <span className="text-5xl font-black text-slate-800 absolute top-6 right-6">02</span>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Follow Your Adaptive Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive a daily customized study schedule based on your available hours (1-4 hours/day). Complete high-yield lessons, practice test cases, and review with spaced repetition.
              </p>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 relative hover:border-slate-700 transition-all">
              <span className="text-5xl font-black text-slate-800 absolute top-6 right-6">03</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Track Placement Readiness</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measure tangible readiness with our transparent multi-factor index. Build an ATS resume, simulate real mock interviews, and walk into campus drives with verified confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID SECTION */}
      <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Comprehensive Placement Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything Required for Campus & Off-Campus Hiring
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Integrated modules spanning algorithmic problem solving, quantitative reasoning, enterprise backend technologies, and behavioral rounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 hover:bg-slate-900 p-7 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-4 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                <Link
                  to={user ? feat.link : "/signup"}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* LEARNING TRACKS SECTION */}
      <section id="tracks" className="py-20 bg-slate-950 border-t border-slate-800/80 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Curated Career Roadmaps
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Role-Specific Placement Curricula
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-lg">
                Structured week-by-week learning paths designed for freshers targeting top product & service companies.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {tracks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedTrack === t.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Track Card */}
          {(() => {
            const current = tracks.find((t) => t.id === selectedTrack) || tracks[0];
            return (
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {current.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Estimated Effort: {current.duration}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{current.title}</h3>
                  </div>
                  <Link
                    to={user ? "/roadmap" : "/signup"}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
                  >
                    <span>Enroll in This Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{current.desc}</p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Core Modules in This Track
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {current.topics.map((top, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-medium">{top}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 12 CAREER PATH CARDS GRID */}
          <div className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                All 12 Placement & Engineering Paths
              </h3>
              <span className="text-xs text-slate-400">
                Click any path to view its full curriculum
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tracks.map((t) => (
                <div
                  key={t.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    selectedTrack === t.id
                      ? "bg-slate-900 border-blue-500/60 shadow-lg shadow-blue-500/10"
                      : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {t.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {t.duration}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white leading-snug">
                      {t.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedTrack(t.id)}
                      className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-medium"
                    >
                      Preview Topics
                    </button>
                    <Link
                      to={user ? `/roadmap?path=${t.id}` : `/signup`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Explore Path</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENT READINESS SCORE FORMULA */}
      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Data-Driven Confidence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Transparent Placement Readiness Scoring
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            We don't use arbitrary readiness percentages. Your score is computed deterministically from real stored activity records in MySQL:
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-blue-300 border border-slate-800/80 text-center">
            Readiness = (35% × DSA Mastery) + (25% × Core Java) + (20% × SQL Optimization) + (20% × Aptitude Accuracy)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400">35% DSA Patterns</span>
              <p className="text-slate-400 text-[11px]">Distinct patterns solved with optimal time & space complexity.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">25% Core Java / CS</span>
              <p className="text-slate-400 text-[11px]">JVM internals, OOP contracts, and concurrent collection topics.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="font-bold text-sky-400">20% Relational SQL</span>
              <p className="text-slate-400 text-[11px]">Complex joins, group filtering, window functions, and indexing.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="font-bold text-purple-400">20% Quants & Aptitude</span>
              <p className="text-slate-400 text-[11px]">Timed accuracy across campus quantitative & reasoning rounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-950 border-t border-slate-800/80 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-white">Got Questions? We Have Answers.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      activeFaq === idx ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-6 lg:px-12 text-center max-w-4xl mx-auto space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
          <Zap className="w-7 h-7" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Begin Your Placement Journey Today
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          A free, structured learning and career preparation platform designed for college students and aspiring software professionals.
        </p>
        <div className="pt-2">
          <Link
            to={user ? "/dashboard" : "/signup"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
          >
            <span>Start Free Preparation Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#060910] px-6 lg:px-12 py-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <span className="font-bold text-slate-300">Beam Academy</span>
            <span className="text-slate-600">|</span>
            <span>Placement Readiness & Career Platform</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-slate-300 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-slate-300 transition-colors">
              Student Registration
            </Link>
            <a href="http://localhost:8081/actuator/health" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              System Health
            </a>
          </div>

          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Beam Academy. Built for student career readiness.
          </p>
        </div>
      </footer>
    </div>
  );
}
