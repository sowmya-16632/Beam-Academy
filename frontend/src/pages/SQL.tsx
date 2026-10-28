import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { sqlCurriculum } from "../data/topics/sql";
import {
  Database,
  CheckCircle2,
  Circle,
  ArrowRight,
  Code2,
} from "lucide-react";

export default function SQL() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>("All");

  useEffect(() => {
    if (!user?.id) return;
    api.getCourseCompletions(user.id, "sql")
      .then(setCompletedIds)
      .catch(() => {});
  }, [user?.id]);

  const filteredTopics = filterDifficulty === "All"
    ? sqlCurriculum
    : sqlCurriculum.filter((t) => t.difficulty === filterDifficulty);

  const completedCount = sqlCurriculum.filter((t) => completedIds.includes(t.id)).length;
  const percent = Math.round((completedCount / sqlCurriculum.length) * 100);

  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-500/20 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Database className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-sky-400">
                  Relational Database Engineering
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                SQL & Relational Database Track
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                Master query design, multi-table joins, subqueries, grouping, normalization, indexing, transactions and query performance tuning.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center shrink-0 min-w-40">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Readiness</span>
              <span className="text-3xl font-extrabold text-sky-400 block my-1">{percent}%</span>
              <span className="text-xs text-slate-400">{completedCount} of {sqlCurriculum.length} Completed</span>
            </div>
          </div>
        </div>

        {/* DIFFICULTY FILTER */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          {["All", "Easy", "Medium", "Hard"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterDifficulty(lvl)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                filterDifficulty === lvl
                  ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* SQL TOPICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.map((topic, i) => {
            const isDone = completedIds.includes(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/learn/sql/${topic.id}`)}
                className={`group p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isDone
                    ? "bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50"
                    : "bg-slate-900/90 border-slate-800 hover:border-sky-500/40 hover:bg-slate-800/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        topic.difficulty === "Easy"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : topic.difficulty === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {topic.difficulty}
                    </span>

                    {isDone ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {topic.explanation}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-sky-300 overflow-x-auto truncate">
                    <code>{topic.exampleQuery.split("\n")[0]}</code>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    🎯 {topic.practicalUse}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-sky-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Practice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}