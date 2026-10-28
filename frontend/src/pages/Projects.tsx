import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import {
  Layers,
  Sparkles,
  ExternalLink,
  FolderGit2,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  BookOpen,
  Terminal,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileCode,
  ArrowRight,
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

interface GuidedProject {
  id: string;
  title: string;
  category: "Full-Stack" | "Backend API" | "AI & Systems" | "Data Analytics";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  architecture: string;
  stack: string[];
  prerequisites: string[];
  milestones: Milestone[];
  testingChecklist: string[];
  interviewExplanation: {
    situation: string;
    task: string;
    action: string;
    result: string;
    sampleQuestions: string[];
  };
}

const guidedProjectsBank: GuidedProject[] = [
  {
    id: "proj-placement-portal",
    title: "Placement Readiness Portal & Candidate Tracker",
    category: "Full-Stack",
    difficulty: "Intermediate",
    duration: "2-3 Weeks",
    description:
      "A production-grade web application featuring JWT authentication, relational data persistence with MySQL, interactive coding pattern drills, and placement metrics calculations.",
    architecture:
      "Client: React 18 + TypeScript + Vite\nBackend: Spring Boot 3 REST API + Spring Security (Stateless JWT)\nDatabase: MySQL 8 (7 relational entities, HikariCP)\nExternal: Isolated AI Coach proxy with heuristic fallback",
    stack: ["Spring Boot 3", "Java 17", "React 18", "TypeScript", "MySQL 8", "Tailwind CSS"],
    prerequisites: ["Core Java OOP", "Basic SQL SELECT & JOIN queries", "React Hooks fundamentals"],
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Database Schema & Entity Design",
        description: "Design relational entities for Users, Topics, DSA Attempts, Aptitude Records, and Study Plans with foreign keys and unique indexes.",
        deliverables: ["Entity classes with JPA annotations", "Repository interfaces with derived queries", "MySQL migration verification"],
      },
      {
        id: "m2",
        title: "Milestone 2: Stateless Security & RESTful Services",
        description: "Configure Spring Security filter chain with BCrypt password hashing and custom JWT authentication filters.",
        deliverables: ["AuthController with /signup and /login endpoints", "SecurityConfig with CORS filters", "Stateless session creation policy"],
      },
      {
        id: "m3",
        title: "Milestone 3: Dynamic Readiness Calculation Engine",
        description: "Implement service methods calculating interview readiness index, streak counters, and personalized daily recommendations.",
        deliverables: ["ProgressService calculations", "DashboardController endpoints", "Actuator health monitor verification"],
      },
      {
        id: "m4",
        title: "Milestone 4: Interactive React SPA Client",
        description: "Build clean glassmorphic components, coding workspace with progressive hints, and responsive charts.",
        deliverables: ["Vite client setup", "Context-based auth management", "Typed API client"],
      },
    ],
    testingChecklist: [
      "BCrypt salted password hashes verified in database (no plain text).",
      "Expired or invalid JWT tokens return 401 Unauthorized.",
      "CORS headers restrict untrusted domain calls.",
      "Zero SQL injection via parameterized Spring Data JPA queries.",
    ],
    interviewExplanation: {
      situation: "College students often prepare across disconnected sites without unified progress tracking or realistic feedback.",
      task: "Engineered an end-to-end placement readiness system providing automated diagnostic evaluations, algorithmic drills, and real progress metrics.",
      action: "Built a 3-tier stateless Spring Boot 3 + MySQL backend integrated with a typed React 18 frontend. Designed relational schemas, safe progressive hint reveals, and AI evaluation with zero server crashes.",
      result: "Reduced preparation fragmentation, achieving sub-100ms API response times with comprehensive database persistence across 7 normalized entities.",
      sampleQuestions: [
        "Why did you choose stateless JWT over server-side HTTP sessions?",
        "How do you calculate the candidate's interview readiness index dynamically?",
        "How did you prevent user-submitted code from compromising your backend server?",
      ],
    },
  },
  {
    id: "proj-task-queue",
    title: "High-Throughput E-Commerce Order & Inventory Engine",
    category: "Backend API",
    difficulty: "Advanced",
    duration: "3 Weeks",
    description:
      "Enterprise REST API simulating high-concurrency flash sales, optimistic concurrency control to prevent inventory overselling, and Redis caching.",
    architecture:
      "Gateway: Spring Boot REST\nCache: Redis 7 (In-memory product lookup)\nDatabase: PostgreSQL / MySQL with @Version optimistic locking\nQueue: Background event processor",
    stack: ["Java 17", "Spring Boot", "Redis", "MySQL", "Docker", "JUnit 5"],
    prerequisites: ["ACID transaction principles", "Multithreading concepts", "REST API architecture"],
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Relational Schema & Optimistic Locking",
        description: "Define products, stock inventory, and orders with JPA @Version columns to prevent double-booking under race conditions.",
        deliverables: ["Schema with foreign keys and check constraints", "OptimisticLockException handlers"],
      },
      {
        id: "m2",
        title: "Milestone 2: High-Performance Cache Layer",
        description: "Integrate Redis to cache popular product catalogs, implementing cache-aside pattern with TTL expiration.",
        deliverables: ["RedisTemplate configuration", "Cache invalidation on inventory update"],
      },
      {
        id: "m3",
        title: "Milestone 3: Concurrency Stress Testing",
        description: "Simulate 500 concurrent buyer threads attempting to reserve 10 units of inventory using JMeter or multi-threaded JUnit.",
        deliverables: ["Thread safety test report", "Zero oversold inventory guarantee"],
      },
    ],
    testingChecklist: [
      "Zero negative stock balances under concurrent purchase attempts.",
      "Redis cache hit ratio > 85% for catalog read requests.",
      "Global transaction rollback if payment or deduction fails.",
    ],
    interviewExplanation: {
      situation: "Flash sales cause sudden concurrency spikes that lead to dirty reads and overselling in traditional systems.",
      task: "Designed and implemented an inventory reservation microservice capable of guaranteeing exact zero-oversell consistency.",
      action: "Leveraged JPA @Version optimistic locking on database rows combined with Redis atomic operations for inventory decrements.",
      result: "Maintained 100% stock data integrity under simulated 500-thread concurrent bursts with sub-40ms latency.",
      sampleQuestions: [
        "What is the difference between Optimistic and Pessimistic Locking?",
        "How do you handle Redis cache stampede when keys expire?",
        "How did you ensure database transactions remain ACID compliant?",
      ],
    },
  },
  {
    id: "proj-ai-resume",
    title: "AI Resume & Placement Cover Letter Evaluator",
    category: "AI & Systems",
    difficulty: "Intermediate",
    duration: "2 Weeks",
    description:
      "Career tool that extracts skills from PDF/Markdown resumes, computes ATS match scores against job descriptions, and generates STAR-method talking points.",
    architecture:
      "Frontend: React + File Parser\nBackend: Spring Boot / Python API\nAI: LLM Prompt Orchestration with structured JSON schemas and offline keyword matcher",
    stack: ["React", "TypeScript", "Spring Boot", "OpenAI API", "Tailwind CSS"],
    prerequisites: ["JSON schemas", "Prompt engineering principles", "Client-side file handling"],
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: ATS Keyword Matching Algorithm",
        description: "Implement deterministic text matching comparing candidate skills with recruiter job descriptions.",
        deliverables: ["TF-IDF / keyword intersection analyzer", "Missing high-priority keywords report"],
      },
      {
        id: "m2",
        title: "Milestone 2: AI Prompt Pipeline with Fallback",
        description: "Structure prompts requesting actionable bullet-point improvements following Google's 'Accomplished [X] by measuring [Y]' framework.",
        deliverables: ["Robust server-side proxy", "Offline regex fallback when API key is missing"],
      },
    ],
    testingChecklist: [
      "Graceful degradation when candidate uploads non-standard resume formats.",
      "Strict data privacy: uploaded resumes are not persisted without consent.",
    ],
    interviewExplanation: {
      situation: "Freshers submit resumes filled with vague responsibilities rather than quantified achievements, leading to ATS rejections.",
      task: "Created an intelligent ATS evaluator that critiques resumes against targeted job roles and quantifies impact.",
      action: "Combined deterministic keyword extraction with LLM feedback prompting that rewrites bullet points into measurable achievements.",
      result: "Helped candidates increase resume keyword match rates by an average of 40% before company application submission.",
      sampleQuestions: [
        "How do ATS scanners parse and score PDF resumes?",
        "How did you prevent prompt injection when users pasted malicious resume text?",
      ],
    },
  },
];

interface UserProject {
  id: string;
  title: string;
  role: string;
  repoUrl: string;
  demoUrl: string;
  techStack: string;
  status: "Planning" | "In Progress" | "Completed";
  notes: string;
}

export default function Projects() {
  const { user } = useAuth();

  const [selectedGuided, setSelectedGuided] = useState<GuidedProject>(guidedProjectsBank[0]);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("beam_completed_milestones");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userProjects, setUserProjects] = useState<UserProject[]>(() => {
    const defaultProjects = [
      {
        id: "up-1",
        title: "Beam Academy Full-Stack Platform",
        role: "Full-Stack Developer",
        repoUrl: "https://github.com/my-profile/beam-academy",
        demoUrl: "http://localhost:5173",
        techStack: "Spring Boot, React, MySQL, TypeScript",
        status: "In Progress",
        notes: "Implementing guided practice drills and MySQL analytics.",
      },
    ];
    try {
      const saved = localStorage.getItem("beam_user_projects");
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState<Partial<UserProject>>({
    title: "",
    role: "Full-Stack Developer",
    repoUrl: "",
    demoUrl: "",
    techStack: "",
    status: "In Progress",
    notes: "",
  });

  useEffect(() => {
    localStorage.setItem("beam_completed_milestones", JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  useEffect(() => {
    localStorage.setItem("beam_user_projects", JSON.stringify(userProjects));
  }, [userProjects]);

  const toggleMilestone = (milestoneId: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(milestoneId) ? prev.filter((id) => id !== milestoneId) : [...prev, milestoneId]
    );
  };

  const handleAddProject = () => {
    if (!newProject.title?.trim()) return;
    const proj: UserProject = {
      id: `up-${Date.now()}`,
      title: newProject.title.trim(),
      role: newProject.role || "Developer",
      repoUrl: newProject.repoUrl?.trim() || "",
      demoUrl: newProject.demoUrl?.trim() || "",
      techStack: newProject.techStack?.trim() || "Java, Spring Boot",
      status: (newProject.status as any) || "In Progress",
      notes: newProject.notes?.trim() || "",
    };
    setUserProjects((prev) => [...prev, proj]);
    setNewProject({
      title: "",
      role: "Full-Stack Developer",
      repoUrl: "",
      demoUrl: "",
      techStack: "",
      status: "In Progress",
      notes: "",
    });
    setShowAddModal(false);
  };

  const handleDeleteProject = (id: string) => {
    setUserProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Portfolio & Practical Experience
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Guided Portfolio Projects & Verification
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Build resume-worthy engineering projects with step-by-step architecture diagrams, testing checklists, and STAR-method interview talking points.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all self-start md:self-auto hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Personal Project</span>
          </button>
        </div>

        {/* GUIDED PROJECT SELECTOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guidedProjectsBank.map((proj) => {
            const isSelected = selectedGuided.id === proj.id;
            const completedCount = proj.milestones.filter((m) => completedMilestones.includes(m.id)).length;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedGuided(proj)}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? "bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {proj.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{proj.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug">{proj.title}</h3>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>Milestones</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {completedCount} / {proj.milestones.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE GUIDED PROJECT WORKSPACE */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-8">
          {/* PROJECT HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {selectedGuided.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-mono">Effort: {selectedGuided.duration}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedGuided.title}</h2>
              <p className="text-xs text-slate-400 mt-2 max-w-3xl leading-relaxed">
                {selectedGuided.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 self-start md:self-auto max-w-xs">
              {selectedGuided.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* SYSTEM ARCHITECTURE OVERVIEW */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Architecture Specification</span>
            </h4>
            <pre className="text-xs text-blue-200/90 font-mono leading-relaxed whitespace-pre-wrap">
              {selectedGuided.architecture}
            </pre>
          </div>

          {/* MILESTONES CHECKLIST */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Implementation Milestones</span>
            </h3>

            <div className="space-y-3">
              {selectedGuided.milestones.map((m, idx) => {
                const isCompleted = completedMilestones.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-slate-950/80 border-slate-800"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleMilestone(m.id)}
                          className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600" />
                          )}
                        </button>
                        <div>
                          <h4 className={`text-sm font-semibold ${isCompleted ? "text-emerald-300" : "text-slate-200"}`}>
                            {m.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">{m.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {m.deliverables.map((deliv, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                              >
                                ✓ {deliv}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {isCompleted ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* INTERVIEW EXPLANATION PLAYBOOK (STAR METHOD) */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                How to Explain This Project in Interviews (STAR Method)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-blue-400 uppercase text-[10px]">Situation</span>
                <p className="text-slate-300 leading-relaxed">{selectedGuided.interviewExplanation.situation}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 uppercase text-[10px]">Task</span>
                <p className="text-slate-300 leading-relaxed">{selectedGuided.interviewExplanation.task}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 uppercase text-[10px]">Action</span>
                <p className="text-slate-300 leading-relaxed">{selectedGuided.interviewExplanation.action}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 uppercase text-[10px]">Result</span>
                <p className="text-slate-300 leading-relaxed">{selectedGuided.interviewExplanation.result}</p>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-400 mb-2">Frequently Asked Technical Follow-ups:</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedGuided.interviewExplanation.sampleQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* LEARNER'S PERSONAL PROJECT TRACKER */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">Your Personal Resume Projects</h2>
              <p className="text-xs text-slate-400">Track and link your GitHub repositories and live deployments.</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Project</span>
            </button>
          </div>

          <div className="space-y-3">
            {userProjects.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{p.title}</h4>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        p.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">{p.techStack}</p>
                  {p.notes && <p className="text-xs text-slate-500">{p.notes}</p>}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
                      title="View GitHub Repository"
                    >
                      <FolderGit2 className="w-4 h-4" />
                    </a>
                  )}
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-2 rounded-lg bg-slate-900 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors"
                    title="Remove Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD PROJECT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <h3 className="text-base font-bold text-white">Add Personal Resume Project</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Distributed Cache & Job Queue"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Your Role</label>
                    <input
                      type="text"
                      value={newProject.role}
                      onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                      placeholder="e.g. Backend Lead"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Tech Stack</label>
                  <input
                    type="text"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    placeholder="e.g. Spring Boot, Redis, MySQL, Docker"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">GitHub Repository URL</label>
                    <input
                      type="text"
                      value={newProject.repoUrl}
                      onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Live Demo URL</label>
                    <input
                      type="text"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  disabled={!newProject.title?.trim()}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
