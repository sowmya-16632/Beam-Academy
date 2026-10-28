import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  Code2,
  BrainCircuit,
  Coffee,
  Database,
  ArrowRight,
  Eye,
} from "lucide-react";

interface RevisionItem {
  id: string;
  category: "DSA" | "Interview" | "Aptitude" | "CoreJava" | "SQL";
  title: string;
  prompt: string;
  solutionKey: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  lastReviewed: string;
  nextReviewDays: number;
}

const defaultRevisionBank: RevisionItem[] = [
  {
    id: "rev-1",
    category: "Interview",
    title: "HashMap Internals in Java 8+",
    prompt: "Why and when does a Java HashMap bucket convert from a LinkedList to a Red-Black Tree?",
    solutionKey:
      "When bucket size reaches 8 (TREEIFY_THRESHOLD) AND total table capacity >= 64. Converts back to linked list when size drops to 6 (UNTREEIFY_THRESHOLD). This guarantees O(log n) worst-case lookup during hash collisions, preventing denial-of-service hash attacks.",
    difficulty: "Hard",
    lastReviewed: "2 days ago",
    nextReviewDays: 1,
  },
  {
    id: "rev-2",
    category: "DSA",
    title: "Two Sum Optimal Pattern",
    prompt: "How do you achieve O(N) time and O(N) space for Two Sum instead of O(N²) brute force?",
    solutionKey:
      "Use a single-pass HashMap storing each number as key and its index as value. For each element x, check if (target - x) already exists in the map. If yes, return both indices; otherwise insert x and its index.",
    difficulty: "Moderate",
    lastReviewed: "Yesterday",
    nextReviewDays: 3,
  },
  {
    id: "rev-3",
    category: "SQL",
    title: "HAVING vs WHERE Clause in SQL",
    prompt: "Explain the difference in execution order between WHERE and HAVING.",
    solutionKey:
      "WHERE filters individual rows BEFORE aggregate functions and GROUP BY are executed. HAVING filters aggregated grouped rows AFTER GROUP BY (e.g., HAVING COUNT(*) > 5). WHERE cannot take aggregate functions like SUM() or AVG().",
    difficulty: "Easy",
    lastReviewed: "3 days ago",
    nextReviewDays: 7,
  },
  {
    id: "rev-4",
    category: "CoreJava",
    title: "String Immutability in Java",
    prompt: "Why is the String class immutable and marked final in Java?",
    solutionKey:
      "1. Security: used in network connections, file paths, and database URLs.\n2. Thread Safety: immutable objects can be shared safely across threads without synchronization.\n3. String Constant Pool (SCP): caching strings saves heap memory; mutability would corrupt shared references.\n4. HashCode Caching: computed once at creation, enabling fast hash table lookups.",
    difficulty: "Moderate",
    lastReviewed: "4 days ago",
    nextReviewDays: 3,
  },
  {
    id: "rev-5",
    category: "Aptitude",
    title: "Combined Work Rate Principle",
    prompt: "If A completes a task in X days and B in Y days, what is the combined 1-day work formula?",
    solutionKey:
      "1-day work = (1/X) + (1/Y) = (X + Y) / (X × Y). Total days to complete working together = (X × Y) / (X + Y) days.",
    difficulty: "Easy",
    lastReviewed: "5 days ago",
    nextReviewDays: 7,
  },
];

export default function Revision() {
  const { user } = useAuth();

  const [items, setItems] = useState<RevisionItem[]>(() => {
    try {
      const saved = localStorage.getItem("beam_revision_queue");
      return saved ? JSON.parse(saved) : defaultRevisionBank;
    } catch {
      return defaultRevisionBank;
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);

  useEffect(() => {
    localStorage.setItem("beam_revision_queue", JSON.stringify(items));
  }, [items]);

  const currentItem = items[currentIndex % items.length];

  const handleRate = (rating: "Easy" | "Moderate" | "Hard") => {
    let nextDays = 1;
    if (rating === "Easy") nextDays = 7;
    else if (rating === "Moderate") nextDays = 3;
    else nextDays = 1;

    const updated = [...items];
    updated[currentIndex % items.length] = {
      ...currentItem,
      difficulty: rating,
      lastReviewed: "Just now",
      nextReviewDays: nextDays,
    };

    setItems(updated);
    setShowAnswer(false);
    setCompletedToday((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <RotateCcw className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                Spaced Repetition & Revision Center
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Placement Concept Memory Vault
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Retain high-frequency interview definitions, algorithms, and SQL patterns using scientifically proven spaced repetition intervals (1 day, 3 days, 7 days).
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Reviewed Today</p>
              <p className="text-2xl font-bold text-emerald-400">{completedToday}</p>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">In Review Queue</p>
              <p className="text-2xl font-bold text-blue-400">{items.length}</p>
            </div>
          </div>
        </div>

        {/* ACTIVE FLASHCARD WORKSPACE */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {currentItem.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Card {((currentIndex % items.length) + 1)} of {items.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Next Review: in {currentItem.nextReviewDays} days</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">{currentItem.title}</h2>
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 min-h-[140px] flex items-center justify-center text-center">
              <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed">
                {currentItem.prompt}
              </p>
            </div>
          </div>

          {/* ANSWER REVEAL */}
          {!showAnswer ? (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAnswer(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-105"
              >
                <Eye className="w-4 h-4" />
                <span>Reveal Interview Answer & Key Concepts</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Model Interview Solution
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {currentItem.solutionKey}
                </p>
              </div>

              {/* RATING BUTTONS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-slate-300 text-center uppercase tracking-wider">
                  How well did you recall this concept?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleRate("Hard")}
                    className="p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all text-center"
                  >
                    <span className="block font-bold">Hard</span>
                    <span className="text-[10px] text-rose-400/80 font-normal">Review in 1 day</span>
                  </button>
                  <button
                    onClick={() => handleRate("Moderate")}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all text-center"
                  >
                    <span className="block font-bold">Moderate</span>
                    <span className="text-[10px] text-amber-400/80 font-normal">Review in 3 days</span>
                  </button>
                  <button
                    onClick={() => handleRate("Easy")}
                    className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all text-center"
                  >
                    <span className="block font-bold">Easy</span>
                    <span className="text-[10px] text-emerald-400/80 font-normal">Review in 7 days</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* REVISION QUEUE TABLE */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              All Stored Placement Flashcards
            </h3>
            <span className="text-xs text-slate-400">{items.length} Concepts Scheduled</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {items.map((it, idx) => (
              <div
                key={it.id}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <span className="text-slate-500 font-mono">#{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-blue-300 font-semibold text-[10px]">
                    {it.category}
                  </span>
                  <span className="font-semibold text-slate-200 truncate">{it.title}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0 text-slate-400">
                  <span
                    className={`font-semibold text-[10px] px-2 py-0.5 rounded ${
                      it.difficulty === "Easy"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : it.difficulty === "Moderate"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {it.difficulty}
                  </span>
                  <span className="font-mono text-[11px]">in {it.nextReviewDays}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
