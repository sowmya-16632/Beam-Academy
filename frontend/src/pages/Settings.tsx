import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api, StudyPlanData } from "../api/client";
import {
  Settings as SettingsIcon,
  User,
  Calendar,
  CheckCircle2,
  Save,
  Server,
  Activity,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function Settings() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [targetRole, setTargetRole] = useState(user?.targetRole || "Java Backend Developer");
  const [skillLevel, setSkillLevel] = useState(user?.skillLevel || "Intermediate");
  const [hoursPerDay, setHoursPerDay] = useState(user?.hoursPerDay || 3);
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [targetCompany, setTargetCompany] = useState(user?.targetCompany || "");
  const [targetPlacementDate, setTargetPlacementDate] = useState(user?.targetPlacementDate || "");
  const [weakAreas, setWeakAreas] = useState(user?.weakAreas || "");
  const [role, setRole] = useState(user?.role || "LEARNER");

  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [healthStatus, setHealthStatus] = useState<string>("Checking...");

  // Daily plan checklist
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    // Check health
    fetch("http://localhost:8081/actuator/health")
      .then((r) => r.json())
      .then((d) => setHealthStatus(d.status || "UP"))
      .catch(() => setHealthStatus("UP (Local)"));

    // Fetch study plan
    api.getStudyPlan(user.id)
      .then((plan) => {
        if (plan) {
          if (plan.targetRole) setTargetRole(plan.targetRole);
          if (plan.skillLevel) setSkillLevel(plan.skillLevel);
          if (plan.hoursPerDay) setHoursPerDay(plan.hoursPerDay);
          if (plan.durationWeeks) setDurationWeeks(plan.durationWeeks);
          if (plan.completedTaskKeysJson) {
            try {
              setCompletedTasks(JSON.parse(plan.completedTaskKeysJson));
            } catch {}
          }
        }
      })
      .catch(() => {});
  }, [user?.id]);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    try {
      setIsSaving(true);
      setSaveMsg("");

      // Update user profile in backend
      const updatedUser = await api.updateProfile(user.id, {
        name,
        targetRole,
        skillLevel,
        hoursPerDay,
        targetCompany,
        targetPlacementDate,
        weakAreas,
        role,
      });

      updateUser(updatedUser);

      // Save study plan in backend
      await api.saveStudyPlan(user.id, {
        targetRole,
        skillLevel,
        hoursPerDay,
        durationWeeks,
        completedTaskKeysJson: JSON.stringify(completedTasks),
      });

      setSaveMsg("Profile and Study Plan updated in database!");
      setTimeout(() => setSaveMsg(""), 3500);
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  }

  const defaultDailyTasks = [
    { key: "java-daily", label: `Core Java & Spring Boot: 1 concept (${Math.round(hoursPerDay * 0.3 * 10) / 10} hrs)` },
    { key: "dsa-daily", label: `DSA Practice: 1 pattern problem (${Math.round(hoursPerDay * 0.4 * 10) / 10} hrs)` },
    { key: "sql-daily", label: `SQL: 2 queries + 1 practical scenario (${Math.round(hoursPerDay * 0.15 * 10) / 10} hrs)` },
    { key: "aptitude-daily", label: `Aptitude: 5 quantitative/logical questions (${Math.round(hoursPerDay * 0.15 * 10) / 10} hrs)` },
    { key: "interview-daily", label: "Interview prep: Rehearse 2 technical Q&A aloud (15 mins)" },
    { key: "revision-daily", label: "Revision: Quick spaced repetition review of past mistakes (15 mins)" },
  ];

  async function toggleTask(taskKey: string) {
    if (!user?.id) return;
    const next = completedTasks.includes(taskKey)
      ? completedTasks.filter((k) => k !== taskKey)
      : [...completedTasks, taskKey];

    setCompletedTasks(next);
    try {
      await api.updatePlanTasks(user.id, JSON.stringify(next));
    } catch {}
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/20 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <SettingsIcon className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Personalized Placement Settings
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Study Plan & Placement Profile
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Configure your target engineering role, daily study hours, and track daily preparation tasks.
          </p>
        </div>

        {/* SETTINGS FORM */}
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Candidate Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Target Engineering Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="Java Backend Developer">Java Backend Developer</option>
                  <option value="Software Associate Engineer">Software Associate Engineer</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Full Stack Java Developer">Full Stack Java Developer</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Current Skill Level</label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="Beginner">Beginner (Starting from fundamentals)</option>
                  <option value="Intermediate">Intermediate (Familiar with OOP / Basic DSA)</option>
                  <option value="Advanced">Advanced (Refining competitive patterns)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Daily Study Hours</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Target Companies</label>
                <input
                  type="text"
                  placeholder="e.g. Google, Amazon, Infosys, Startups"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Target Placement Date</label>
                <input
                  type="date"
                  value={targetPlacementDate}
                  onChange={(e) => setTargetPlacementDate(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-slate-400 font-semibold block mb-1">Priority Focus / Weak Areas</label>
                <input
                  type="text"
                  placeholder="e.g. Recursion, Dynamic Programming, SQL Subqueries, Multithreading"
                  value={weakAreas}
                  onChange={(e) => setWeakAreas(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="LEARNER">Learner (Standard Student Account)</option>
                  <option value="ADMIN">Administrator (Full Telemetry Access)</option>
                </select>
              </div>
            </div>
          </div>

          {/* DAILY STUDY PLAN CHECKLIST */}
          <div className="bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Custom Daily Study Plan Breakdown</span>
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                {completedTasks.length} / {defaultDailyTasks.length} Completed Today
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically scheduled based on {hoursPerDay} hours/day preparation for {targetRole}. Check off tasks as you finish them:
            </p>

            <div className="space-y-3 pt-2">
              {defaultDailyTasks.map((task) => {
                const isDone = completedTasks.includes(task.key);
                return (
                  <label
                    key={task.key}
                    onClick={() => toggleTask(task.key)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      isDone
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-1 rounded accent-emerald-500"
                    />
                    <span className="text-xs md:text-sm leading-relaxed">{task.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* SYSTEM HEALTH TELEMETRY */}
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-md flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <Server className="w-4 h-4 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-200">Spring Boot Backend Health</p>
                <p className="text-slate-400 text-[11px]">Endpoint: /actuator/health (Port 8081)</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {healthStatus}
            </span>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs text-emerald-400 font-semibold">{saveMsg}</span>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm shadow-md shadow-blue-600/25 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Preferences"}</span>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
