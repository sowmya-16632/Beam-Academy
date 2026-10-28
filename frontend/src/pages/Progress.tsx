import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api, DashboardStats, RecentActivity } from "../api/client";
import { javaCurriculum } from "../data/topics/java";
import { sqlCurriculum } from "../data/topics/sql";
import { dsaProblemBank } from "../data/topics/dsa";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  Coffee,
  Database,
  Code2,
  BrainCircuit,
  HelpCircle,
} from "lucide-react";

export default function Progress() {
  const { user } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [completedMap, setCompletedMap] = useState<Record<string, string[]>>({});
  const [solvedDsa, setSolvedDsa] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user?.id) return;
    loadProgress();
  }, [user?.id]);

  async function loadProgress() {
    if (!user?.id) return;
    try {
      setLoading(true);
      const [statsData, actData, compData, solvedData] = await Promise.all([
        api.getDashboardStats(user.id),
        api.getRecentActivity(user.id),
        api.getAllCompletions(user.id),
        api.getSolvedDsaSlugs(user.id),
      ]);
      setStats(statsData);
      setActivities(actData);
      setCompletedMap(compData);
      setSolvedDsa(solvedData);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const moduleBreakdown = [
    { name: "Java Core & Spring", progress: stats?.javaProgress ?? 0, icon: Coffee, color: "bg-amber-500", count: `${completedMap["java"]?.length || 0} / ${javaCurriculum.length}` },
    { name: "Relational SQL", progress: stats?.sqlProgress ?? 0, icon: Database, color: "bg-sky-500", count: `${completedMap["sql"]?.length || 0} / ${sqlCurriculum.length}` },
    { name: "DSA Problem Patterns", progress: stats?.dsaProgress ?? 0, icon: Code2, color: "bg-emerald-500", count: `${solvedDsa.length} / ${dsaProblemBank.length}` },
    { name: "Aptitude Tests", progress: stats?.aptitudeProgress ?? 0, icon: BrainCircuit, color: "bg-purple-500", count: `${stats?.aptitudeTestsCount ?? 0} tests` },
    { name: "Interview Q&A", progress: stats?.interviewProgress ?? 0, icon: HelpCircle, color: "bg-rose-500", count: `${stats?.masteredInterviewCount ?? 0} mastered` },
  ];

  // Identify weak areas (lowest 2 progress values < 60%)
  const weakModules = [...moduleBreakdown]
    .sort((a, b) => a.progress - b.progress)
    .filter((m) => m.progress < 70)
    .slice(0, 2);

  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/20 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                  Real Analytics & Placement Telemetry
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Progress & Readiness Analytics
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                Calculated dynamically from real completed lessons, evaluated code submissions, aptitude attempts, and interview practices in MySQL.
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-center shrink-0 min-w-44">
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Readiness</span>
              <p className="text-4xl font-black text-blue-400 my-1">{stats?.overallProgress ?? 0}%</p>
              <span className="text-xs text-slate-400">Zero Fake Percentages</span>
            </div>
          </div>
        </div>

        {/* 5-MODULE PROGRESS BARS */}
        <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Curriculum Progress Breakdown</span>
          </h2>

          <div className="space-y-5">
            {moduleBreakdown.map((mod) => {
              const Icon = mod.icon;
              return (
                <div key={mod.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center gap-2 font-semibold text-slate-200">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{mod.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-mono">{mod.count}</span>
                      <span className="font-bold text-white min-w-10 text-right">{mod.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${mod.color} transition-all duration-500`}
                      style={{ width: `${Math.max(mod.progress, 3)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WEAK AREAS ANALYSIS & ACTION PLAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Recommended Focus Areas</h3>
            </div>
            <p className="text-xs text-slate-400">
              Based on your current telemetry, prioritizing these modules will maximize your placement conversion rate:
            </p>

            <div className="space-y-3 pt-2">
              {weakModules.length > 0 ? (
                weakModules.map((wm) => (
                  <div
                    key={wm.name}
                    className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-amber-300">{wm.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Current Progress: {wm.progress}%</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      High Priority
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
                  🎉 Excellent balance! All modules are currently tracking above 70%.
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white">Placement Benchmark Metrics</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">DSA Pattern Target</span>
                <span className="font-bold text-slate-200">12 / 12 Standard Patterns</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Core Java OOP & Collections</span>
                <span className="font-bold text-slate-200">11 Topics Completed</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Relational SQL Joins & Schema</span>
                <span className="font-bold text-slate-200">16 Topics Completed</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Technical Q&A Mastered</span>
                <span className="font-bold text-slate-200">20 Questions in MySQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY TIMELINE */}
        <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Placement Activity Stream</span>
            </h3>
            <span className="text-xs text-slate-400">Live from backend</span>
          </div>

          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((act, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 font-bold">
                      {act.type.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 text-sm">{act.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{act.category} • {act.status}</p>
                    </div>
                  </div>
                  <span className="text-slate-500 font-mono text-xs">
                    {new Date(act.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-6 text-center">
              No activity recorded yet. Start practicing Java, SQL, or DSA!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}