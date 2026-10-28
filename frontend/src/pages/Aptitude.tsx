import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { aptitudeQuestionBank, AptitudeQuestion } from "../data/topics/aptitude";
import {
  BrainCircuit,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  History,
} from "lucide-react";

export default function Aptitude() {
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState<"All" | "Quantitative" | "Logical Reasoning" | "Verbal">("Quantitative");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(300); // 5 min timer
  const [pastAttempts, setPastAttempts] = useState<any[]>([]);

  // Filter questions for active quiz
  const questions: AptitudeQuestion[] = activeCategory === "All"
    ? aptitudeQuestionBank
    : aptitudeQuestionBank.filter((q) => q.category === activeCategory);

  useEffect(() => {
    if (!user?.id) return;
    api.getAptitudeAttempts(user.id).then(setPastAttempts).catch(() => {});
  }, [user?.id]);

  useEffect(() => {
    let timer: any;
    if (quizStarted && !quizSubmitted && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizSubmitted, secondsRemaining]);

  function startQuiz(cat: typeof activeCategory) {
    setActiveCategory(cat);
    setQuizStarted(true);
    setQuizSubmitted(false);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSecondsRemaining(300);
  }

  function handleSelectOption(optIdx: number) {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  }

  async function handleAutoSubmit() {
    await submitQuiz();
  }

  async function submitQuiz() {
    setQuizSubmitted(true);
    let calculatedScore = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        calculatedScore++;
      }
    });

    if (user?.id) {
      const timeSpent = 300 - secondsRemaining;
      try {
        await api.recordAptitudeAttempt(
          user.id,
          activeCategory,
          `${activeCategory} Speed Quiz`,
          calculatedScore,
          questions.length,
          timeSpent
        );
        const updated = await api.getAptitudeAttempts(user.id);
        setPastAttempts(updated);
      } catch {}
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const scoreCount = questions.reduce((acc, q, idx) => (selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc), 0);
  const scorePercent = Math.round((scoreCount / questions.length) * 100);

  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER HERO */}
        <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <BrainCircuit className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400">
                  Campus Placement Aptitude Assessment
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Aptitude & Logical Reasoning
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-2xl">
                Quantitative techniques, logical puzzles, number series, and verbal ability modules tested in first-round online placement tests.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
              <span className="text-xs text-slate-400">Total Attempts in DB:</span>
              <span className="text-2xl font-black text-purple-400">{pastAttempts.length} Quizzes</span>
            </div>
          </div>
        </div>

        {/* QUIZ INTERFACE OR CATEGORY PICKER */}
        {!quizStarted ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Select Quiz Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  cat: "Quantitative" as const,
                  title: "Quantitative Aptitude",
                  desc: "Percentages, Profit & Loss, Time & Work, Speed, Ratios, Probability.",
                  color: "border-purple-500/30 hover:border-purple-500",
                },
                {
                  cat: "Logical Reasoning" as const,
                  title: "Logical Reasoning",
                  desc: "Number Series, Coding-Decoding, Blood Relations, Directions, Puzzles.",
                  color: "border-blue-500/30 hover:border-blue-500",
                },
                {
                  cat: "Verbal" as const,
                  title: "Verbal Ability",
                  desc: "Grammar, Sentence Correction, Vocabulary, Reading Comprehension.",
                  color: "border-emerald-500/30 hover:border-emerald-500",
                },
              ].map((item) => (
                <div
                  key={item.cat}
                  className={`bg-slate-900/90 rounded-2xl p-6 border ${item.color} flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg`}
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => startQuiz(item.cat)}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Start 5-Min Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAST ATTEMPT HISTORY */}
            {pastAttempts.length > 0 && (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-md">
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                  <History className="w-4 h-4 text-purple-400" />
                  <span>Previous Quiz History (Recorded in MySQL)</span>
                </h3>
                <div className="divide-y divide-slate-800">
                  {pastAttempts.map((att) => (
                    <div key={att.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-200">{att.topic}</span>
                        <span className="text-slate-500 text-[11px] block mt-0.5">
                          Category: {att.category} • Time: {att.timeSpentSeconds || 0}s
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-400">
                          {att.score} / {att.totalQuestions} ({Math.round(((att.score || 0) / (att.totalQuestions || 1)) * 100)}%)
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {new Date(att.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ACTIVE QUIZ WORKSPACE */
          <div className="space-y-6">
            {/* QUIZ TOP BAR */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-purple-400">
                  {activeCategory} Test
                </span>
                <p className="text-sm font-semibold text-white">
                  Question {currentIdx + 1} of {questions.length}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                  secondsRemaining < 60
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse"
                    : "bg-slate-800 text-slate-300 border-slate-700"
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>

                <button
                  onClick={() => setQuizStarted(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Exit Quiz
                </button>
              </div>
            </div>

            {/* ACTIVE QUESTION OR SCORE REPORT */}
            {!quizSubmitted ? (
              <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">
                    Topic: {questions[currentIdx].topic}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mt-2 leading-relaxed">
                    {questions[currentIdx].question}
                  </h3>
                </div>

                {/* 4 OPTIONS */}
                <div className="space-y-3">
                  {questions[currentIdx].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentIdx] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(oIdx)}
                        className={`w-full p-4 rounded-2xl text-left border text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-purple-600/20 border-purple-500 text-purple-200"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? "bg-purple-500 text-white" : "bg-slate-800 text-slate-400"
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* NAVIGATION CONTROLS */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <button
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((i) => i - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {currentIdx < questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIdx((i) => i + 1)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        onClick={submitQuiz}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* RESULTS REPORT */
              <div className="space-y-6">
                <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl text-center space-y-4">
                  <Award className="w-12 h-12 text-amber-400 mx-auto" />
                  <h2 className="text-2xl font-extrabold text-white">Quiz Evaluation Complete!</h2>
                  <div className="flex items-center justify-center gap-6 my-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Score</p>
                      <p className="text-3xl font-black text-emerald-400">{scoreCount} / {questions.length}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-800" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase">Accuracy</p>
                      <p className="text-3xl font-black text-purple-400">{scorePercent}%</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setQuizStarted(false)}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Take Another Quiz
                  </button>
                </div>

                {/* DETAILED EXPLANATIONS */}
                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white mb-2">Step-by-Step Question Breakdown</h3>
                  {questions.map((q, idx) => {
                    const chosen = selectedAnswers[idx];
                    const isCorrect = chosen === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-200">
                            Q{idx + 1}: {q.question}
                          </p>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] text-rose-400 font-bold shrink-0">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          <strong>Correct Option:</strong> {q.options[q.correctAnswer]}
                        </p>
                        <p className="text-xs text-purple-300/90 bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/20 leading-relaxed">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
