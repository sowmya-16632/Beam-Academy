import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  BrainCircuit,
  Code2,
  Coffee,
  HelpCircle,
  Layers,
  Award,
  Clock,
  RotateCcw,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface AssessmentQuestion {
  id: string;
  category: "Programming" | "DSA" | "Aptitude" | "CoreCS" | "Projects" | "Interview";
  categoryLabel: string;
  question: string;
  options: { text: string; score: number }[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  // Programming Fundamentals
  {
    id: "prog-1",
    category: "Programming",
    categoryLabel: "Programming Fundamentals",
    question: "What will be the output of an integer division `7 / 2` in strongly typed languages like Java or C++?",
    options: [
      { text: "3.5 (floating point number)", score: 0 },
      { text: "3 (fractional part truncated)", score: 20 },
      { text: "4 (rounded up to nearest integer)", score: 0 },
      { text: "Throws an ArithmeticException", score: 0 },
    ],
  },
  {
    id: "prog-2",
    category: "Programming",
    categoryLabel: "Programming Fundamentals",
    question: "How comfortable are you with functions, parameters, return types, and scope?",
    options: [
      { text: "I struggle with how arguments are passed and return values work.", score: 5 },
      { text: "I can write basic functions but struggle with recursion and callbacks.", score: 12 },
      { text: "Comfortable with modular functions, parameters, and basic recursion.", score: 20 },
    ],
  },

  // DSA
  {
    id: "dsa-1",
    category: "DSA",
    categoryLabel: "Data Structures & Algorithms",
    question: "What is the average time complexity of looking up a key in a standard Hash Table (HashMap)?",
    options: [
      { text: "O(1) constant time", score: 20 },
      { text: "O(log n) logarithmic time", score: 5 },
      { text: "O(n) linear scan", score: 0 },
      { text: "O(n²) quadratic time", score: 0 },
    ],
  },
  {
    id: "dsa-2",
    category: "DSA",
    categoryLabel: "Data Structures & Algorithms",
    question: "When would you prefer a Linked List over an Array?",
    options: [
      { text: "When random access by index (O(1)) is needed constantly.", score: 0 },
      { text: "When memory locality and cache efficiency are top priorities.", score: 0 },
      { text: "When frequent insertions and deletions at arbitrary positions occur without resizing costs.", score: 20 },
      { text: "Linked lists are always strictly better than arrays.", score: 0 },
    ],
  },

  // Aptitude & Quants
  {
    id: "apt-1",
    category: "Aptitude",
    categoryLabel: "Quantitative & Logical Aptitude",
    question: "A train running at 54 km/h crosses a pole in 20 seconds. What is the length of the train?",
    options: [
      { text: "250 meters", score: 0 },
      { text: "300 meters (54 × 5/18 = 15 m/s; 15 × 20 = 300m)", score: 20 },
      { text: "360 meters", score: 0 },
      { text: "200 meters", score: 0 },
    ],
  },
  {
    id: "apt-2",
    category: "Aptitude",
    categoryLabel: "Quantitative & Logical Aptitude",
    question: "A can finish a work in 10 days, and B can finish the same work in 15 days. How many days will they take together?",
    options: [
      { text: "5 days", score: 0 },
      { text: "6 days (1/10 + 1/15 = 5/30 = 1/6)", score: 20 },
      { text: "8 days", score: 0 },
      { text: "12 days", score: 0 },
    ],
  },

  // Core CS (DBMS / OS / Networks)
  {
    id: "cs-1",
    category: "CoreCS",
    categoryLabel: "Core Computer Science",
    question: "What is the primary difference between `INNER JOIN` and `LEFT JOIN` in SQL?",
    options: [
      { text: "INNER JOIN returns only matching rows; LEFT JOIN returns all left table rows with NULLs for non-matches.", score: 20 },
      { text: "INNER JOIN is for numeric columns; LEFT JOIN is for strings.", score: 0 },
      { text: "LEFT JOIN ignores foreign keys; INNER JOIN requires them.", score: 0 },
      { text: "Both return identical rows but sort them differently.", score: 0 },
    ],
  },
  {
    id: "cs-2",
    category: "CoreCS",
    categoryLabel: "Core Computer Science",
    question: "In Operating Systems, what is the key difference between a Process and a Thread?",
    options: [
      { text: "Threads have separate virtual memory spaces; processes share heap.", score: 0 },
      { text: "Processes have independent memory address spaces; threads within a process share memory and code.", score: 20 },
      { text: "Threads can only execute on single-core processors.", score: 0 },
      { text: "There is no difference in modern OS kernels.", score: 0 },
    ],
  },

  // Practical Projects & Git
  {
    id: "proj-1",
    category: "Projects",
    categoryLabel: "Projects & Practical Experience",
    question: "What is your current hands-on development experience?",
    options: [
      { text: "I have only followed tutorial code snippets and haven't built standalone projects.", score: 5 },
      { text: "I have built 1-2 small projects (e.g. calculator, basic CRUD, portfolio).", score: 12 },
      { text: "I have built full-stack applications with databases, Git version control, and APIs.", score: 20 },
    ],
  },

  // Interview & Communication
  {
    id: "int-1",
    category: "Interview",
    categoryLabel: "Interview & Communication Readiness",
    question: "How confident are you explaining your thought process during a live technical interview?",
    options: [
      { text: "I freeze or find it difficult to articulate code and logic verbally.", score: 5 },
      { text: "I can explain what my code does, but struggle with complexity analysis and edge cases.", score: 12 },
      { text: "Confident explaining trade-offs, time/space complexities, and answering follow-ups.", score: 20 },
    ],
  },
];

export default function Assessment() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [targetHours, setTargetHours] = useState(2);
  const [preferredRole, setPreferredRole] = useState(user?.targetRole || "Java Backend Developer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<any>(null);

  const currentQ = assessmentQuestions[currentStep];
  const totalQuestions = assessmentQuestions.length;

  const handleSelectOption = (qId: string, score: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: score }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateAndSubmitReport();
    }
  };

  const calculateAndSubmitReport = async () => {
    setIsSubmitting(true);

    // Calculate category scores
    const categoryTotals: Record<string, { earned: number; max: number }> = {
      Programming: { earned: 0, max: 40 },
      DSA: { earned: 0, max: 40 },
      Aptitude: { earned: 0, max: 40 },
      CoreCS: { earned: 0, max: 40 },
      Projects: { earned: 0, max: 20 },
      Interview: { earned: 0, max: 20 },
    };

    assessmentQuestions.forEach((q) => {
      const score = selectedAnswers[q.id] || 0;
      if (categoryTotals[q.category]) {
        categoryTotals[q.category].earned += score;
      }
    });

    const progPct = Math.round((categoryTotals.Programming.earned / categoryTotals.Programming.max) * 100);
    const dsaPct = Math.round((categoryTotals.DSA.earned / categoryTotals.DSA.max) * 100);
    const aptPct = Math.round((categoryTotals.Aptitude.earned / categoryTotals.Aptitude.max) * 100);
    const csPct = Math.round((categoryTotals.CoreCS.earned / categoryTotals.CoreCS.max) * 100);
    const projPct = Math.round((categoryTotals.Projects.earned / categoryTotals.Projects.max) * 100);
    const intPct = Math.round((categoryTotals.Interview.earned / categoryTotals.Interview.max) * 100);

    const overallScore = Math.round((progPct + dsaPct + aptPct + csPct + projPct + intPct) / 6);

    let level = "Beginner";
    if (overallScore >= 70) {
      level = "Advanced";
    } else if (overallScore >= 45) {
      level = "Intermediate";
    }

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (progPct >= 60) strengths.push("Programming Fundamentals");
    else weaknesses.push("Programming Fundamentals & Syntax");

    if (dsaPct >= 60) strengths.push("Data Structures & Complexity");
    else weaknesses.push("DSA Pattern Recognition");

    if (aptPct >= 60) strengths.push("Quantitative & Aptitude Speed");
    else weaknesses.push("Aptitude & Speed Math");

    if (csPct >= 60) strengths.push("Core Computer Science (SQL & OS)");
    else weaknesses.push("Core Computer Science Foundations");

    if (projPct < 60) weaknesses.push("Hands-on Portfolio Projects");
    if (intPct < 60) weaknesses.push("Interview Communication & Defense");

    const generatedReport = {
      overallScore,
      level,
      strengths,
      weaknesses,
      scores: {
        programming: progPct,
        dsa: dsaPct,
        aptitude: aptPct,
        coreCs: csPct,
        projects: projPct,
        interview: intPct,
      },
      recommendedRole: preferredRole,
      recommendedHours: targetHours,
      completedAt: new Date().toISOString(),
    };

    setReport(generatedReport);

    // Save to backend user profile if user is logged in
    if (user?.id) {
      try {
        const updated = await api.updateProfile(user.id, {
          skillLevel: level,
          targetRole: preferredRole,
          hoursPerDay: targetHours,
          assessmentJson: JSON.stringify(generatedReport),
          weakAreas: weaknesses.join(", "),
        });
        login(updated);
      } catch (err) {
        console.error("Failed to save assessment to backend profile:", err);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Placement Readiness Assessment
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Diagnostic Skill & Placement Readiness Assessment
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Evaluate your baseline across core engineering fundamentals, algorithms, quantitative aptitude, and interview confidence to unlock your personalized roadmap.
          </p>

          {!report && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Question {currentStep + 1} of {totalQuestions}</span>
              <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(((currentStep + 1) / totalQuestions) * 100)}%` }}
                />
              </div>
              <span className="font-mono text-blue-400">{Math.round(((currentStep + 1) / totalQuestions) * 100)}%</span>
            </div>
          )}
        </div>

        {/* ACTIVE QUESTION OR REPORT */}
        {!report ? (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {currentQ.categoryLabel}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, opt.score)}
                    className={`w-full p-4 rounded-xl text-left text-xs md:text-sm flex items-start gap-3 transition-all ${
                      isSelected
                        ? "bg-blue-600/15 border-2 border-blue-500 text-white"
                        : "bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* PREFERENCE CONTROLS ON LAST STEP */}
            {currentStep === totalQuestions - 1 && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 pt-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Target Preferences for Your Study Plan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Target Placement Role</label>
                    <select
                      value={preferredRole}
                      onChange={(e) => setPreferredRole(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    >
                      <option value="Java Backend Developer">Java Backend Developer</option>
                      <option value="Software Development Engineer">Software Development Engineer (SDE)</option>
                      <option value="Full-Stack Developer">Full-Stack Developer (MERN / Spring + React)</option>
                      <option value="Python Developer">Python Developer</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Daily Study Time Available</label>
                    <select
                      value={targetHours}
                      onChange={(e) => setTargetHours(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    >
                      <option value={1}>1 hour / day (Focused pace)</option>
                      <option value={2}>2 hours / day (Recommended balanced pace)</option>
                      <option value={3}>3 hours / day (Intensive preparation)</option>
                      <option value={4}>4 hours / day (Full-time boot camp pace)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQ.id] === undefined || isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>{currentStep === totalQuestions - 1 ? (isSubmitting ? "Evaluating..." : "Generate Readiness Report") : "Next Question"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* ASSESSMENT REPORT */
          <div className="space-y-6">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Diagnostic Report Complete
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    Your Placement Readiness Baseline
                  </h2>
                </div>
                <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Baseline Score</p>
                    <p className="text-3xl font-extrabold text-blue-400">{report.overallScore}%</p>
                  </div>
                  <div className="w-px h-10 bg-slate-800" />
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Estimated Level</p>
                    <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                      {report.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* SKILL RADAR / BREAKDOWN BARS */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
                  Discipline-Wise Skill Evaluation
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(report.scores).map(([key, val]: [string, any]) => (
                    <div key={key} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="capitalize text-slate-300">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="font-mono text-blue-400">{val}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STRENGTHS AND WEAKNESSES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Identified Strengths</span>
                  </h4>
                  {report.strengths.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {report.strengths.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400">Great opportunity for comprehensive foundational learning.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Priority Focus & Weak Areas</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {report.weaknesses.map((w: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RECOMMENDED DAILY SCHEDULE */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Recommended Daily Routine ({targetHours}h / day)
                  </span>
                  <span className="text-xs text-blue-400 font-semibold">{preferredRole}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Technical Concept</span>
                    <span className="font-bold text-amber-400">{Math.round(targetHours * 17)} mins</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Core Java / CS Lesson</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">DSA Pattern Drill</span>
                    <span className="font-bold text-emerald-400">{Math.round(targetHours * 20)} mins</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">1-2 LeetCode style problems</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Aptitude & Quants</span>
                    <span className="font-bold text-purple-400">{Math.round(targetHours * 13)} mins</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">5-10 timed questions</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Review & Interview</span>
                    <span className="font-bold text-rose-400">{Math.round(targetHours * 10)} mins</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Q&A Flashcards & Reflection</p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setReport(null);
                    setCurrentStep(0);
                    setSelectedAnswers({});
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
                >
                  <span>Launch Daily Learning Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
