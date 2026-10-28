import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { interviewQuestionsBank, InterviewQuestionItem } from "../data/topics/interview";
import {
  HelpCircle,
  CheckCircle2,
  Circle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  MessageSquare,
  Award,
  Play,
  RotateCcw,
} from "lucide-react";

export default function Interview() {
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [openQuestionIdx, setOpenQuestionIdx] = useState<string | null>(null);

  // Mock interview mode state
  const [mockMode, setMockMode] = useState<boolean>(false);
  const [mockIdx, setMockIdx] = useState<number>(0);
  const [candidateAnswer, setCandidateAnswer] = useState<string>("");
  const [aiReview, setAiReview] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<boolean>(false);

  const categories = [
    "All",
    "Java",
    "OOP",
    "SQL",
    "DBMS",
    "DSA",
    "Spring Boot",
    "REST APIs",
    "Operating Systems",
    "Computer Networks",
    "HR",
  ];

  useEffect(() => {
    if (!user?.id) return;
    api.getMasteredInterviewIds(user.id).then(setMasteredIds).catch(() => {});
  }, [user?.id]);

  const filteredQuestions = activeCategory === "All"
    ? interviewQuestionsBank
    : interviewQuestionsBank.filter((q) => q.category === activeCategory);

  async function handleToggleMastered(question: InterviewQuestionItem) {
    if (!user?.id) return;
    const isMastered = masteredIds.includes(question.id);
    const nextMastered = !isMastered;

    try {
      await api.recordInterviewPractice(
        user.id,
        question.id,
        question.category,
        nextMastered
      );

      if (nextMastered) {
        setMasteredIds((prev) => [...prev, question.id]);
      } else {
        setMasteredIds((prev) => prev.filter((id) => id !== question.id));
      }
    } catch (err) {
      alert("Failed to update question status");
    }
  }

  async function handleRequestAiReview(question: InterviewQuestionItem) {
    if (!candidateAnswer.trim()) return;
    try {
      setReviewing(true);
      setAiReview(null);
      const res = await api.askCoach(
        `I am practicing for a placement interview. Question: "${question.question}". My answer: "${candidateAnswer}". Please critique my response, give a score out of 10, highlight missed technical edge cases, and suggest a concise model answer.`,
        {
          userId: user?.id,
          courseContext: "Interview Preparation",
          problemContext: question.question,
          targetRole: user?.targetRole,
        }
      );
      setAiReview(res.answer);
    } catch (err) {
      setAiReview("AI Coach review currently unavailable. Please verify OPENAI_API_KEY.");
    } finally {
      setReviewing(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/20 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                  Placement Interview Question Bank
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Technical & HR Interview Preparation
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                High-frequency interview questions across 10 engineering domains with concise answers, deep explanations, follow-up traps, and mock practice.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center min-w-36">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Mastered</span>
                <p className="text-2xl font-black text-rose-400 my-0.5">
                  {masteredIds.length} / {interviewQuestionsBank.length}
                </p>
                <span className="text-[10px] text-slate-500">Saved in MySQL</span>
              </div>

              <button
                onClick={() => {
                  setMockMode(!mockMode);
                  setMockIdx(0);
                  setCandidateAnswer("");
                  setAiReview(null);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{mockMode ? "Exit Mock Mode" : "Start Mock Interview"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* MOCK INTERVIEW SIMULATOR */}
        {mockMode ? (
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold text-rose-400">
                  Mock Interview Question {mockIdx + 1} of {filteredQuestions.length}
                </span>
                <span className="ml-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                  {filteredQuestions[mockIdx]?.category}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Difficulty: {filteredQuestions[mockIdx]?.difficulty}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white leading-relaxed">
                {filteredQuestions[mockIdx]?.question}
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">
                Type your answer (or explain aloud, then summarize here for AI evaluation):
              </label>
              <textarea
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Structure your answer with definition, key mechanics, and an example..."
                rows={5}
                className="w-full bg-slate-950 text-slate-200 text-xs md:text-sm p-4 rounded-2xl border border-slate-800 outline-none leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleRequestAiReview(filteredQuestions[mockIdx])}
                disabled={reviewing || !candidateAnswer.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-blue-600/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{reviewing ? "AI Reviewing..." : "Get AI Coach Feedback"}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={mockIdx === 0}
                  onClick={() => {
                    setMockIdx((i) => i - 1);
                    setCandidateAnswer("");
                    setAiReview(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  disabled={mockIdx >= filteredQuestions.length - 1}
                  onClick={() => {
                    setMockIdx((i) => i + 1);
                    setCandidateAnswer("");
                    setAiReview(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Next Question →
                </button>
              </div>
            </div>

            {/* AI REVIEW FEEDBACK */}
            {aiReview && (
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-2 mt-4">
                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Coach Feedback
                </h4>
                <p className="text-xs md:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {aiReview}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* STANDARD QUESTION BROWSER */
          <div className="space-y-6">
            {/* CATEGORY TABS */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                      : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* QUESTIONS LIST */}
            <div className="space-y-4">
              {filteredQuestions.map((q) => {
                const isOpen = openQuestionIdx === q.id;
                const isMastered = masteredIds.includes(q.id);

                return (
                  <div
                    key={q.id}
                    className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-sm"
                  >
                    <div className="p-5 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-rose-400 border border-slate-700">
                            {q.category}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              q.difficulty === "Easy"
                                ? "text-emerald-400"
                                : q.difficulty === "Medium"
                                ? "text-amber-400"
                                : "text-rose-400"
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-snug">
                          {q.question}
                        </h3>
                        <p className="text-xs text-slate-300 mt-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                          <strong className="text-rose-400">Concise Answer: </strong>
                          {q.conciseAnswer}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <button
                          onClick={() => handleToggleMastered(q)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            isMastered
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                          }`}
                        >
                          {isMastered ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mastered</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-3.5 h-3.5" />
                              <span>Mark Mastered</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setOpenQuestionIdx(isOpen ? null : q.id)}
                          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                        >
                          <span>{isOpen ? "Hide Details" : "Deep Dive"}</span>
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3 bg-slate-950/40">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Detailed Technical Explanation
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                            {q.detailedExplanation}
                          </p>
                        </div>

                        {q.followUpQuestion && (
                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs">
                            <strong className="text-amber-400 block mb-0.5">Potential Follow-Up Question:</strong>
                            <span className="text-amber-200/90">{q.followUpQuestion}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}