import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api, DashboardStats, RecentActivity } from "../api/client";
import {
  Coffee,
  Database,
  Code2,
  BrainCircuit,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  Flame,
  Award,
  BookOpen,
  Target,
  Layers,
  RotateCcw,
  Play,
  Pause,
  RotateCcw as ResetIcon,
  FileText,
  TrendingUp,
  Info,
} from "lucide-react";

export interface DailyPlanItem {
  id: string;
  time: string;
  title: string;
  duration: string;
  link: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "SKIPPED" | "RESCHEDULED";
}

const INITIAL_DAILY_PLAN: DailyPlanItem[] = [
  { id: "dp-1", time: "09:00", title: "Learn Java Collections", duration: "30 min", link: "/java", status: "NOT_STARTED" },
  { id: "dp-2", time: "09:35", title: "HashMap Practice", duration: "35 min", link: "/dsa", status: "NOT_STARTED" },
  { id: "dp-3", time: "10:15", title: "SQL Quiz", duration: "20 min", link: "/sql", status: "NOT_STARTED" },
  { id: "dp-4", time: "10:40", title: "Review Weak Topic", duration: "15 min", link: "/revision", status: "NOT_STARTED" },
  { id: "dp-5", time: "11:00", title: "Interview Question", duration: "10 min", link: "/interview", status: "NOT_STARTED" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Daily planner state backed by MySQL database persistence
  const [dailyPlan, setDailyPlan] = useState<DailyPlanItem[]>(INITIAL_DAILY_PLAN);
  const [planSaving, setPlanSaving] = useState(false);


  // End of day reflection journal
  const [reflection, setReflection] = useState<string>(() => {
    return localStorage.getItem("beam_eod_reflection") || "";
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Study timer stopwatch
  const [timerSeconds, setTimerSeconds] = useState<number>(() => {
    const saved = localStorage.getItem("beam_study_seconds_today");
    return saved ? Number(saved) : 0;
  });
  const [timerRunning, setTimerRunning] = useState(false);

  // Readiness breakdown modal
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Daily motivation banner state
  const [motivationDismissed, setMotivationDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("beam_motivation_dismissed") === "true";
    } catch {
      return false;
    }
  });

  const getPersonalizedMotivation = () => {
    const solvedDsa = stats?.solvedDsaCount ?? 0;
    const completedTopics = stats?.completedTopicsCount ?? 0;
    const aptitudeCount = stats?.aptitudeTestsCount ?? 0;

    if (solvedDsa >= 2 && completedTopics >= 3) {
      return {
        quote: "You have built meaningful momentum by solving algorithmic drills and completing core modules.",
        recognition: `Recognizing ${solvedDsa} verified coding drills and ${completedTopics} curriculum lessons completed.`,
        nextStep: "Solve 1 sliding window or two-pointer problem in the DSA playground today.",
      };
    } else if (completedTopics > 0) {
      return {
        quote: "Every seasoned software engineer started as a beginner. Your daily curiosity is building real skill.",
        recognition: `Recognizing ${completedTopics} completed curriculum lessons in your active learning roadmap.`,
        nextStep: "Study the step-by-step dry run in your next scheduled curriculum lesson.",
      };
    } else if (solvedDsa > 0) {
      return {
        quote: "Writing test-passing algorithmic code builds deep problem-solving muscle for technical interview rounds.",
        recognition: `Recognizing ${solvedDsa} accepted problem submissions in the DSA playground.`,
        nextStep: "Review the time and space complexity trade-offs for the patterns you solved.",
      };
    } else if (aptitudeCount > 0) {
      return {
        quote: "Quantitative and logical accuracy sharpens your analytical agility for online placement tests.",
        recognition: `Recognizing ${aptitudeCount} completed diagnostic and aptitude tests.`,
        nextStep: "Open the coding playground or start Stage 1 Programming Fundamentals.",
      };
    } else {
      return {
        quote: "Welcome to Beam Academy! Consistent daily effort beats cramming every single time.",
        recognition: "Starting your placement preparation journey from absolute beginner level.",
        nextStep: "Begin with Stage 1 Computer Fundamentals or take the baseline diagnostic assessment.",
      };
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    loadDashboardData();
  }, [user?.id]);

  // Stopwatch effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev + 1;
          localStorage.setItem("beam_study_seconds_today", String(next));
          return next;
        });
      }, 1000);
    } else if (!timerRunning && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  async function loadDashboardData() {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const [statsData, actData, planData] = await Promise.all([
        api.getDashboardStats(user.id),
        api.getRecentActivity(user.id),
        api.getStudyPlan(user.id).catch(() => null),
      ]);
      setStats(statsData);
      setActivities(actData);
      if (planData?.completedTaskKeysJson) {
        try {
          const parsed = JSON.parse(planData.completedTaskKeysJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDailyPlan(parsed);
          }
        } catch {}
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  async function handlePlanAction(id: string, action: "START" | "CONTINUE" | "COMPLETE" | "SKIP" | "RESCHEDULE", destination?: string) {
    const next = dailyPlan.map((item) => {
      if (item.id !== id) return item;
      switch (action) {
        case "START":
        case "CONTINUE":
          return { ...item, status: "IN_PROGRESS" as const };
        case "COMPLETE":
          return { ...item, status: "COMPLETED" as const };
        case "SKIP":
          return { ...item, status: "SKIPPED" as const };
        case "RESCHEDULE":
          return { ...item, status: "RESCHEDULED" as const };
        default:
          return item;
      }
    });
    setDailyPlan(next);
    if (user?.id) {
      setPlanSaving(true);
      try {
        await api.updatePlanTasks(user.id, JSON.stringify(next));
      } catch (e) {
        console.warn("Failed to persist daily plan status to MySQL", e);
      } finally {
        setPlanSaving(false);
      }
    }
    if ((action === "START" || action === "CONTINUE") && destination) {
      navigate(destination);
    }
  }

  const handleSaveReflection = () => {
    localStorage.setItem("beam_eod_reflection", reflection);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const candidateName = user?.name || "Student";

  const progressCards = [
    { name: "Java Core & Spring", progress: stats?.javaProgress ?? 0, icon: Coffee, color: "from-amber-500 to-orange-500", link: "/java", count: `${stats?.completedTopicsCount ?? 0} topics` },
    { name: "Relational SQL", progress: stats?.sqlProgress ?? 0, icon: Database, color: "from-sky-500 to-blue-500", link: "/sql", count: "12 topics" },
    { name: "DSA Patterns", progress: stats?.dsaProgress ?? 0, icon: Code2, color: "from-emerald-500 to-teal-500", link: "/dsa", count: `${stats?.solvedDsaCount ?? 0}/12 solved` },
    { name: "Aptitude & Quants", progress: stats?.aptitudeProgress ?? 0, icon: BrainCircuit, color: "from-purple-500 to-indigo-500", link: "/aptitude", count: `${stats?.aptitudeTestsCount ?? 0} tests` },
    { name: "Interview Q&A", progress: stats?.interviewProgress ?? 0, icon: HelpCircle, color: "from-rose-500 to-pink-500", link: "/interview", count: `${stats?.masteredInterviewCount ?? 0} mastered` },
  ];

  // Formula calculations
  const dsaContribution = Math.round((stats?.dsaProgress ?? 0) * 0.35);
  const javaContribution = Math.round((stats?.javaProgress ?? 0) * 0.25);
  const sqlContribution = Math.round((stats?.sqlProgress ?? 0) * 0.20);
  const aptContribution = Math.round((stats?.aptitudeProgress ?? 0) * 0.20);
  const calculatedReadiness = dsaContribution + javaContribution + sqlContribution + aptContribution;

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* WELCOME HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/80 border border-blue-500/20 p-6 md:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Placement Preparation Command Center
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                  Target: {user?.targetRole || "Java Backend Developer"}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                {getGreeting()}, {candidateName}
              </h1>
              <p className="text-slate-300 mt-2 max-w-2xl text-xs md:text-sm leading-relaxed">
                Consistency is key for campus drives. Complete today's mission, verify test cases in coding drills, and retain concepts with memory revision.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
              >
                <Target className="w-4 h-4" />
                <span>Skill Diagnostic</span>
              </Link>
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs transition-all"
              >
                <Compass className="w-4 h-4 text-blue-400" />
                <span>Roadmap</span>
              </Link>
              <Link
                to="/ai"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Coach</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DAILY PERSONALIZED MOTIVATION BANNER */}
        {!motivationDismissed && (() => {
          const mot = getPersonalizedMotivation();
          return (
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-slate-900 border border-amber-500/20 rounded-3xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold font-mono text-amber-400 uppercase tracking-wider">
                      Daily Performance Recognition
                    </span>
                    <span className="text-[10px] text-slate-500">• {mot.recognition}</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed">
                    "{mot.quote}"
                  </p>
                  <p className="text-xs text-blue-300 font-semibold pt-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Next Achievable Step: {mot.nextStep}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  onClick={() => {
                    setMotivationDismissed(true);
                    localStorage.setItem("beam_motivation_dismissed", "true");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold border border-slate-800 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          );
        })()}

        {/* OVERALL READINESS BAR & STAT METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-4 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Overall Placement Readiness Index</h3>
                  <p className="text-[11px] text-slate-400">
                    Transparent formula based on DSA, Core Java, SQL, and Aptitude metrics.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFormulaModal(!showFormulaModal)}
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors font-semibold"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>How is this scored?</span>
                </button>
                <span className="text-3xl font-black text-blue-400 font-mono">
                  {calculatedReadiness}%
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(calculatedReadiness, 4)}%` }}
              />
            </div>

            {/* EXPANDABLE FORMULA BREAKDOWN */}
            {showFormulaModal && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs animate-in fade-in">
                <div className="font-mono text-blue-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-center">
                  Score = (35% × DSA: {stats?.dsaProgress ?? 0}%) + (25% × Java: {stats?.javaProgress ?? 0}%) + (20% × SQL: {stats?.sqlProgress ?? 0}%) + (20% × Aptitude: {stats?.aptitudeProgress ?? 0}%)
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">DSA Share (35%)</span>
                    <span className="font-bold text-emerald-400 font-mono">+{dsaContribution} pts</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Java Share (25%)</span>
                    <span className="font-bold text-amber-400 font-mono">+{javaContribution} pts</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">SQL Share (20%)</span>
                    <span className="font-bold text-sky-400 font-mono">+{sqlContribution} pts</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Aptitude (20%)</span>
                    <span className="font-bold text-purple-400 font-mono">+{aptContribution} pts</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Lessons Done</p>
              <p className="text-2xl font-bold text-white">{stats?.completedTopicsCount ?? 0}</p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">DSA Patterns Solved</p>
              <p className="text-2xl font-bold text-emerald-400">{stats?.solvedDsaCount ?? 0} / 12</p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Aptitude Tests</p>
              <p className="text-2xl font-bold text-purple-400">{stats?.aptitudeTestsCount ?? 0}</p>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Mastered Q&A</p>
              <p className="text-2xl font-bold text-rose-400">{stats?.masteredInterviewCount ?? 0}</p>
            </div>
          </div>
        </div>

        {/* 5 MODULE PROGRESS METRICS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Module Preparation Breakdown</h2>
            <span className="text-xs text-slate-400">Click any card to continue learning</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {progressCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  onClick={() => navigate(item.link)}
                  className="group bg-slate-900/90 rounded-2xl p-5 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-blue-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-200">
                      {item.progress}%
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-2">{item.count}</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${Math.max(item.progress, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DAILY LEARNING PLANNER & TIMER & ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TODAY'S MISSION & DAILY HABIT TRACKER */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendation Alert */}
            <div className="bg-gradient-to-r from-blue-950/60 to-slate-900/90 border border-blue-500/30 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">AI Placement Recommendation</h4>
                  <p className="text-xs md:text-sm text-slate-200 mt-1 leading-relaxed">
                    {stats?.aiRecommendation || "Start your daily roadmap lessons to calculate placement recommendations."}
                  </p>
                </div>
              </div>
            </div>

            {/* TODAY'S PLAN (TIME-BLOCKED & BACKEND PERSISTED) */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h3 className="text-base font-bold text-white">Today's Plan</h3>
                    {planSaving ? (
                      <span className="text-[10px] text-blue-400 font-mono animate-pulse">Syncing...</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400/80 font-mono">✓ Saved to Database</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Time-blocked study schedule with live state persistence</p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">
                    Progress: <strong className="text-emerald-400">{dailyPlan.filter((t) => t.status === "COMPLETED").length}</strong> / {dailyPlan.length}
                  </span>
                  <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.round(
                          (dailyPlan.filter((t) => t.status === "COMPLETED").length / dailyPlan.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {dailyPlan.map((item) => {
                  const isDone = item.status === "COMPLETED";
                  const isCurrent = item.status === "IN_PROGRESS";
                  const isSkipped = item.status === "SKIPPED";
                  const isRescheduled = item.status === "RESCHEDULED";

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all space-y-3 ${
                        isDone
                          ? "bg-emerald-950/20 border-emerald-500/30 text-slate-300"
                          : isCurrent
                          ? "bg-blue-950/30 border-blue-500/40 text-white shadow-md shadow-blue-500/10"
                          : isSkipped
                          ? "bg-slate-950/40 border-slate-800/60 opacity-60 text-slate-400"
                          : isRescheduled
                          ? "bg-amber-950/20 border-amber-500/30 text-slate-300"
                          : "bg-slate-950/80 border-slate-800/80 text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800/80 text-blue-300 border border-slate-700/60 shrink-0">
                            {item.time}
                          </span>
                          <span className={`text-sm font-semibold truncate ${isDone ? "line-through text-slate-400" : ""}`}>
                            {item.title}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">
                            {item.duration}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                          {isDone && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Completed
                            </span>
                          )}
                          {isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isSkipped && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              Skipped
                            </span>
                          )}
                          {isRescheduled && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Rescheduled
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons: Start, Continue, Complete, Skip, Reschedule */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60 text-xs">
                        {item.status === "NOT_STARTED" && (
                          <button
                            onClick={() => handlePlanAction(item.id, "START", item.link)}
                            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>Start</span>
                          </button>
                        )}

                        {item.status === "IN_PROGRESS" && (
                          <>
                            <button
                              onClick={() => navigate(item.link)}
                              className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center gap-1"
                            >
                              <ArrowRight className="w-3 h-3" />
                              <span>Continue</span>
                            </button>
                            <button
                              onClick={() => handlePlanAction(item.id, "COMPLETE")}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Complete</span>
                            </button>
                          </>
                        )}

                        {!isDone && (
                          <>
                            <button
                              onClick={() => handlePlanAction(item.id, "COMPLETE")}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-950/60 hover:text-emerald-300 text-slate-400 transition-colors"
                            >
                              Mark Complete
                            </button>
                            <button
                              onClick={() => handlePlanAction(item.id, "SKIP")}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                              Skip
                            </button>
                            <button
                              onClick={() => handlePlanAction(item.id, "RESCHEDULE")}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-950/40 hover:text-amber-300 text-slate-400 transition-colors"
                            >
                              Reschedule
                            </button>
                          </>
                        )}

                        {isDone && (
                          <button
                            onClick={() => handlePlanAction(item.id, "START", item.link)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          >
                            Review Lesson
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* END OF DAY REFLECTION JOURNAL */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>End-of-Day Placement Reflection Journal</span>
                </h4>
                {reflectionSaved && (
                  <span className="text-xs text-emerald-400 font-semibold animate-in fade-in">
                    ✓ Saved locally
                  </span>
                )}
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What new concepts did you learn today? What edge cases did you discover in DSA? What will you practice tomorrow?"
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none resize-none leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveReflection}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  Save Reflection Note
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STUDY TIMER + RECENT ACTIVITY */}
          <div className="space-y-6">
            {/* STUDY STOPWATCH TIMER */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Today's Study Session</span>
                </span>
                <span className="text-xs font-mono text-slate-400">Daily Goal: 2h</span>
              </div>

              <div className="text-center py-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-3xl font-black text-amber-300 font-mono tracking-tight">
                  {formatTimer(timerSeconds)}
                </p>
                <p className="text-[10px] text-slate-500 uppercase mt-1">Focus Time Logged Today</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    timerRunning
                      ? "bg-amber-600 hover:bg-amber-500 text-white"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
                  }`}
                >
                  {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{timerRunning ? "Pause Timer" : "Start Study Session"}</span>
                </button>

                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(0);
                    localStorage.setItem("beam_study_seconds_today", "0");
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                  title="Reset Stopwatch"
                >
                  <ResetIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* QUICK ACTIONS ROW */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Placement Accelerators
              </h4>
              <div className="space-y-2">
                <Link
                  to="/projects"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>Guided Portfolio Projects</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  to="/revision"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="w-4 h-4 text-indigo-400" />
                    <span>Memory Spaced Repetition</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  to="/resume"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-xs font-medium text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-teal-400" />
                    <span>ATS Resume & Job Pipeline</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>
            </div>

            {/* LIVE ACTIVITY FEED */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Recent Preparation Activity
              </h4>

              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {activities.length > 0 ? (
                  activities.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-200 truncate block">{act.title}</span>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                          <span className="text-blue-400">{act.category}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{act.status}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {new Date(act.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">No stored activity records yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}