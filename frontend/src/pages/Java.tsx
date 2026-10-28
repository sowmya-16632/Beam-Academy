import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { javaCurriculum } from "../data/topics/java";
import {
  Coffee,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function Java() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (!user?.id) return;
    api.getCourseCompletions(user.id, "java")
      .then(setCompletedIds)
      .catch(() => {});
  }, [user?.id]);

  const categories = ["All", "Fundamentals", "Core Java", "Backend Spring Boot"];

  const filteredTopics = activeCategory === "All"
    ? javaCurriculum
    : javaCurriculum.filter((t) => t.category === activeCategory);

  const completedCount = javaCurriculum.filter((t) => completedIds.includes(t.id)).length;
  const progressPercent = Math.round((completedCount / javaCurriculum.length) * 100);

  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Coffee className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                  Primary Placement Language
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Java & Spring Boot Mastery
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                Comprehensive curriculum from JVM bytecode and Core OOP to Collections internals, Streams, and production Spring Boot REST APIs.
              </p>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 text-center shrink-0 min-w-40">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">Readiness</span>
              <span className="text-3xl font-extrabold text-amber-400 block my-1">{progressPercent}%</span>
              <span className="text-xs text-slate-400">{completedCount} of {javaCurriculum.length} Completed</span>
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* TOPIC LIST */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTopics.map((topic, index) => {
            const isDone = completedIds.includes(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/learn/java/${topic.id}`)}
                className={`group p-6 rounded-2xl border cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isDone
                    ? "bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50"
                    : "bg-slate-900/90 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="mt-1 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {topic.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {topic.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 max-w-2xl">
                      {topic.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{topic.estimatedMinutes} min</span>
                  </div>
                  <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 group-hover:bg-amber-500 text-amber-400 group-hover:text-slate-950 border border-amber-500/30 transition-all flex items-center gap-1.5">
                    <span>{isDone ? "Review" : "Start"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}