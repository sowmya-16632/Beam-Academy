import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api, CertificateData } from "../api/client";
import { careerPaths, CareerPath } from "../data/careerPathsData";
import {
  Code2,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  Clock,
  BookOpen,
  Filter,
  ShieldCheck,
  ChevronRight,
  AlertCircle
} from "lucide-react";

export default function Roadmap() {
  const { user, activePathId, setActivePathId } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlPath = searchParams.get("path");

  const [selectedPathId, setSelectedPathId] = useState<string>(urlPath || activePathId || "sde");
  const [levelFilter, setLevelFilter] = useState<string>("All");

  useEffect(() => {
    const p = searchParams.get("path");
    if (p && careerPaths.some((cp) => cp.id === p)) {
      setSelectedPathId(p);
    }
  }, [searchParams]);

  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Certificate eligibility modal
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certEligibility, setCertEligibility] = useState<CertificateData | null>(null);
  const [certLoading, setCertLoading] = useState(false);
  const [certIssuing, setCertIssuing] = useState(false);
  const [issuedCert, setIssuedCert] = useState<CertificateData | null>(null);

  const currentPath: CareerPath =
    careerPaths.find((p) => p.id === selectedPathId) || careerPaths[0];

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    api.getAllCompletions(user.id)
      .then((map) => {
        const allCompleted: string[] = [];
        Object.values(map).forEach((arr) => {
          if (Array.isArray(arr)) allCompleted.push(...arr);
        });
        setCompletedTopicIds(allCompleted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const filteredPaths = careerPaths.filter((p) => {
    if (levelFilter === "All") return true;
    return p.level.toLowerCase() === levelFilter.toLowerCase();
  });

  const totalLessonsInPath = currentPath.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
  const completedLessonsInPath = currentPath.modules.reduce(
    (acc, m) =>
      acc + m.lessons.filter((l) => completedTopicIds.includes(l.id)).length,
    0
  );
  const progressPct =
    totalLessonsInPath > 0
      ? Math.round((completedLessonsInPath / totalLessonsInPath) * 100)
      : 0;

  async function handleCheckCertificate() {
    if (!user?.id) return;
    try {
      setCertModalOpen(true);
      setCertLoading(true);
      setIssuedCert(null);
      const data = await api.checkCertificateEligibility(user.id, currentPath.id);
      setCertEligibility(data);
      if (data.status === "VERIFIED" && data.certificateId) {
        setIssuedCert(data);
      }
    } catch (err) {
      alert("Failed to evaluate certification eligibility");
    } finally {
      setCertLoading(false);
    }
  }

  async function handleIssueCertificate() {
    if (!user?.id) return;
    try {
      setCertIssuing(true);
      const cert = await api.issueCertificate(user.id, currentPath.id, currentPath.title);
      setIssuedCert(cert);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Certificate requirements not met yet.");
    } finally {
      setCertIssuing(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto pb-16">
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                14 Structured Career Curricula
              </span>
              <span className="text-slate-400 text-xs">Beginner to Industry Verified</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              Career Path Explorer & Milestones
            </h1>
          </div>

          <button
            onClick={handleCheckCertificate}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition-all self-start md:self-auto"
          >
            <Award className="w-4 h-4" />
            <span>Check Certificate Eligibility</span>
          </button>
        </div>

        {/* CAREER PATH CATALOG STRIP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              Select Career Roadmap ({filteredPaths.length} of 14)
            </span>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-[11px]">
              {["All", "Beginner", "Intermediate"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    levelFilter === lvl
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* PATH CHIPS OVERFLOW CONTAINER */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {filteredPaths.map((p) => {
              const isActive = p.id === selectedPathId;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPathId(p.id);
                    setActivePathId(p.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isActive
                      ? "bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/15"
                      : "bg-slate-900/80 border-slate-800/80 hover:border-slate-700 text-slate-400"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono uppercase font-bold block ${
                      isActive ? "text-blue-400" : "text-slate-500"
                    }`}
                  >
                    {p.badge}
                  </span>
                  <span
                    className={`text-xs font-bold line-clamp-1 mt-0.5 ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {p.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE PATH OVERVIEW HERO */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 backdrop-blur-xl space-y-6 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  Target: {currentPath.targetRole}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  {currentPath.estimatedWeeks} Weeks ({currentPath.hoursPerWeek}h/week)
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
                  {currentPath.level} Level
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {currentPath.title}
              </h2>
              <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
                {currentPath.careerReadinessOutcome}
              </p>
            </div>

            {/* PROGRESS RING CARD */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center shrink-0 min-w-[160px] space-y-1">
              <span className="text-[11px] text-slate-400 font-mono block">Path Completion</span>
              <span className="text-3xl font-extrabold text-white font-mono">{progressPct}%</span>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 block pt-1">
                {completedLessonsInPath}/{totalLessonsInPath} Lessons Done
              </span>
            </div>
          </div>

          {/* SKILLS TAGS */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2">Skills Acquired:</span>
            {currentPath.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ORDERED MODULES & LESSONS TIMELINE */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <span>Ordered Learning Curriculum ({currentPath.modules.length} Modules)</span>
          </h3>

          <div className="space-y-6">
            {currentPath.modules.map((mod, modIdx) => (
              <div
                key={mod.id}
                className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                      Stage {mod.stage}: {mod.stageName}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-white mt-0.5">
                      {mod.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400">
                    {mod.lessons.length} structured lessons
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {mod.description}
                </p>

                {/* LESSONS LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {mod.lessons.map((lesson) => {
                    const isDone = completedTopicIds.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => navigate(`/learn/${currentPath.id}/${lesson.id}`)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isDone
                            ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                            : "bg-slate-950/70 border-slate-800 hover:border-blue-500/40 hover:bg-slate-950"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors block">
                              {lesson.title}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{lesson.difficulty}</span>
                              <span>•</span>
                              <span>{lesson.estimatedMinutes} mins</span>
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAPSTONE & CERTIFICATION SUMMARY CARD */}
        <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/90 border border-blue-500/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
                Final Milestone Requirement
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-1">
                Capstone: {currentPath.capstoneTitle}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {currentPath.capstoneDescription}
              </p>
            </div>

            <button
              onClick={handleCheckCertificate}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 shadow-lg shadow-blue-500/20 transition-colors"
            >
              Verify Certificate Rules
            </button>
          </div>
        </div>
      </div>

      {/* CERTIFICATE ELIGIBILITY & ISSUANCE MODAL */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Certification Eligibility</h3>
                  <span className="text-[11px] text-slate-400 font-mono">{currentPath.title}</span>
                </div>
              </div>
              <button
                onClick={() => setCertModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {certLoading ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Evaluating server-side criteria against database records...
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* ALREADY ISSUED */}
                {issuedCert && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Certificate Officially Issued & Verifiable!</span>
                    </div>
                    <p className="text-slate-300">
                      Credential ID: <span className="font-mono text-white font-bold">{issuedCert.certificateId}</span>
                    </p>
                    <Link
                      to={`/verify/${issuedCert.certificateId}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      <span>View & Print Official Credential</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* SATISFIED CRITERIA */}
                {certEligibility?.satisfiedCriteria && certEligibility.satisfiedCriteria.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Satisfied Requirements (✓)
                    </span>
                    <div className="space-y-1.5">
                      {certEligibility.satisfiedCriteria.map((c: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PENDING CRITERIA */}
                {certEligibility?.pendingCriteria && certEligibility.pendingCriteria.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                      Pending Requirements (Remaining)
                    </span>
                    <div className="space-y-1.5">
                      {certEligibility.pendingCriteria.map((c: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-slate-400">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACTION BUTTON */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">
                    {certEligibility?.eligible ? "All criteria satisfied!" : "Fulfill pending tasks to qualify"}
                  </span>
                  {certEligibility?.eligible && !issuedCert ? (
                    <button
                      onClick={handleIssueCertificate}
                      disabled={certIssuing}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      {certIssuing ? "Issuing..." : "Issue My Certificate"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setCertModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
