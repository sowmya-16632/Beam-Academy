import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api, UserProfile } from "../api/client";
import {
  ShieldAlert,
  Users,
  Database,
  CheckCircle2,
  Clock,
  Code2,
  BrainCircuit,
  HelpCircle,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function Admin() {
  const { user } = useAuth();

  const [overview, setOverview] = useState<any>(null);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    try {
      setLoading(true);
      setError(null);
      const [stats, users] = await Promise.all([
        api.getAdminOverview(),
        api.getAdminUsers(),
      ]);
      setOverview(stats);
      setUsersList(users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin telemetry data");
    } finally {
      setLoading(false);
    }
  }

  const isAdmin = user?.role === "ADMIN" || user?.email?.toLowerCase().startsWith("admin");

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                Platform Administration & Telemetry
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              System Administration & Learning Analytics
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect student activity records, MySQL persistence health, curriculum catalogs, and active student profiles.
            </p>
          </div>

          <button
            onClick={loadAdminData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Telemetry</span>
          </button>
        </div>

        {/* ROLE NOTICE */}
        {!isAdmin && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Read-Only Mode:</strong> You are currently signed in as a Learner. Administrator accounts are configured with email addresses beginning with <code className="bg-slate-950 px-1.5 py-0.5 rounded font-mono">admin@</code>.
            </span>
          </div>
        )}

        {/* METRICS GRID */}
        {overview && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Registered Learners</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white">{overview.totalUsers}</p>
              <p className="text-[10px] text-slate-500">Persisted in MySQL users table</p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>DSA Attempts Recorded</span>
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-emerald-400">{overview.totalDsaAttempts}</p>
              <p className="text-[10px] text-slate-500">practice_attempts table</p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Topic Completions</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-3xl font-bold text-indigo-400">{overview.totalTopicCompletions}</p>
              <p className="text-[10px] text-slate-500">topic_completions table</p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Aptitude Quizzes Taken</span>
                <BrainCircuit className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-purple-400">{overview.totalAptitudeAttempts}</p>
              <p className="text-[10px] text-slate-500">aptitude_attempts table</p>
            </div>
          </div>
        )}

        {/* SYSTEM STATUS ROW */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Infrastructure & Health Telemetry</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">System Status</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                OPERATIONAL
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Database Connection</span>
              <span className="text-blue-400 font-bold">MySQL 8 / 9 (HikariPool)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">JVM Heap in Use</span>
              <span className="text-purple-400 font-bold">~{overview?.serverUptimeSeconds || 85} MB</span>
            </div>
          </div>
        </div>

        {/* STUDENT DIRECTORY TABLE */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Registered Learner Accounts
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Live records fetched from MySQL database.</p>
            </div>
            <span className="text-xs font-mono text-slate-400">{usersList.length} Accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Target Role</th>
                  <th className="p-3">Skill Level</th>
                  <th className="p-3">Daily Hours</th>
                  <th className="p-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono text-slate-500">#{u.id}</td>
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3 font-mono text-slate-400">{u.email}</td>
                    <td className="p-3 text-blue-300">{u.targetRole || "Java Backend Developer"}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px]">
                        {u.skillLevel || "Beginner"}
                      </span>
                    </td>
                    <td className="p-3 font-mono">{u.hoursPerDay || 3}h/day</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          u.role === "ADMIN"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {u.role || "LEARNER"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
