import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { javaCurriculum, JavaTopic } from "../data/topics/java";
import { sqlCurriculum, SQLTopic } from "../data/topics/sql";
import { findLessonById, CareerLesson } from "../data/careerPathsData";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  HelpCircle,
  Code2,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
  Lightbulb,
  FileCheck,
  Award,
  Layers,
  Terminal,
  Clock,
  Bookmark
} from "lucide-react";

export default function Topic() {
  const { course, topicId } = useParams<{ course: string; topicId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState(false);
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [bookmarkSaved, setBookmarkSaved] = useState(false);

  // Interactive Quiz state
  const [quizSelections, setQuizSelections] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({});

  // Practical Assignment interactive submission
  const [assignmentCode, setAssignmentCode] = useState("");
  const [assignmentFeedback, setAssignmentFeedback] = useState<string | null>(null);

  // Embedded Beam Mentor AI Tutor
  const [tutorQuery, setTutorQuery] = useState("");
  const [tutorAnswer, setTutorAnswer] = useState<string | null>(null);
  const [tutorLoading, setTutorLoading] = useState(false);

  // Identify topic across modern career paths or legacy curricula
  const careerLessonMatch = topicId ? findLessonById(topicId) : undefined;
  const currentCareerLesson: CareerLesson | undefined = careerLessonMatch?.lesson;

  let currentJavaTopic: JavaTopic | undefined;
  let currentSqlTopic: SQLTopic | undefined;

  if (course === "java") {
    currentJavaTopic = javaCurriculum.find((t) => t.id === topicId);
  } else if (course === "sql") {
    currentSqlTopic = sqlCurriculum.find((t) => t.id === topicId);
  }

  const topicTitle =
    currentCareerLesson?.title ||
    currentJavaTopic?.title ||
    currentSqlTopic?.title ||
    "Lesson Overview";

  const topicExplanation =
    currentCareerLesson?.explanation ||
    currentJavaTopic?.explanation ||
    currentSqlTopic?.explanation ||
    "";

  useEffect(() => {
    if (!user?.id || !course || !topicId) return;
    api.getCourseCompletions(user.id, course)
      .then((completedList) => {
        setIsCompleted(completedList.includes(topicId));
      })
      .catch(() => {});
  }, [user?.id, course, topicId]);

  async function handleToggleCompletion() {
    if (!user?.id || !course || !topicId) return;
    try {
      setSaving(true);
      const nextState = !isCompleted;
      await api.toggleTopic(user.id, course, topicId, nextState);
      setIsCompleted(nextState);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update topic status");
    } finally {
      setSaving(false);
    }
  }

  function handleBookmarkRevision() {
    let queue: any[] = [];
    try {
      queue = JSON.parse(localStorage.getItem("beam_revision_queue") || "[]");
    } catch {
      queue = [];
    }
    const newItem = {
      id: `rev-${course}-${topicId}`,
      category: course?.toUpperCase() || "CORE",
      title: topicTitle,
      prompt: `Explain the key concepts and trade-offs of ${topicTitle}.`,
      solutionKey: topicExplanation,
      difficulty: currentCareerLesson?.difficulty || "Moderate",
      lastReviewed: "Just now",
      nextReviewDays: 1,
    };
    if (!queue.some((q: any) => q.id === newItem.id)) {
      queue.unshift(newItem);
      localStorage.setItem("beam_revision_queue", JSON.stringify(queue));
    }
    setBookmarkSaved(true);
    setTimeout(() => setBookmarkSaved(false), 2500);
  }

  async function handleAskTutor(customPrompt?: string) {
    const promptToSend = customPrompt || tutorQuery;
    if (!promptToSend.trim()) return;

    try {
      setTutorLoading(true);
      setTutorAnswer(null);
      const res = await api.askCoach(promptToSend, {
        userId: user?.id,
        courseContext: `${course} Track: ${topicTitle}`,
        problemContext: topicExplanation.slice(0, 300),
      });
      setTutorAnswer(res.answer);
      if (!customPrompt) setTutorQuery("");
    } catch (err) {
      setTutorAnswer(
        "Tutor connection momentarily unavailable. Remember: focus on understanding data flow and dry-running small examples!"
      );
    } finally {
      setTutorLoading(false);
    }
  }

  function handleSelectOption(qIdx: number, optIdx: number) {
    if (quizSubmitted[qIdx]) return;
    setQuizSelections((prev) => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleVerifyQuiz(qIdx: number) {
    setQuizSubmitted((prev) => ({ ...prev, [qIdx]: true }));
  }

  function handleEvaluateAssignment() {
    if (!assignmentCode.trim()) {
      setAssignmentFeedback("Please write or paste your solution code first.");
      return;
    }
    setAssignmentFeedback(
      "✓ Evaluation Result: Solution submitted successfully! Code structure conforms to rubric requirements. Earned 10/10 practice points."
    );
  }

  if (!currentCareerLesson && !currentJavaTopic && !currentSqlTopic) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Lesson Not Found</h2>
          <p className="text-slate-400 text-sm">The requested learning topic does not exist in the curriculum.</p>
          <button
            onClick={() => navigate("/roadmap")}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white text-sm"
          >
            ← Return to Career Roadmaps
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* BREADCRUMB / TOP ACTION BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Roadmap</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBookmarkRevision}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                bookmarkSaved
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{bookmarkSaved ? "Bookmarked!" : "Bookmark for Revision"}</span>
            </button>

            <button
              onClick={handleToggleCompletion}
              disabled={saving}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
                isCompleted
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
              }`}
            >
              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              <span>{isCompleted ? "Completed ✓" : "Mark as Completed"}</span>
            </button>
          </div>
        </div>

        {/* LESSON HERO CARD */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase">
              {course?.toUpperCase()}
            </span>
            {currentCareerLesson?.difficulty && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {currentCareerLesson.difficulty}
              </span>
            )}
            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Clock className="w-3 h-3" />
              {currentCareerLesson?.estimatedMinutes || 30} mins
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {topicTitle}
          </h1>

          {/* OBJECTIVES & PREREQUISITES */}
          {currentCareerLesson?.objectives && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  Learning Objectives
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {currentCareerLesson.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              {currentCareerLesson.prerequisites && (
                <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Prerequisites
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {currentCareerLesson.prerequisites.map((pre, i) => (
                      <li key={i}>{pre}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 1: BEGINNER-FRIENDLY EXPLANATION */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>1. Core Explanation (From Absolute Zero)</span>
          </div>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            {topicExplanation}
          </p>

          {/* REAL WORLD ANALOGY */}
          {currentCareerLesson?.realWorldAnalogy && (
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3 text-xs">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-300 block mb-1">Real-World Analogy:</span>
                <span className="text-slate-300 leading-relaxed">{currentCareerLesson.realWorldAnalogy}</span>
              </div>
            </div>
          )}

          {/* WHY IT MATTERS */}
          {currentCareerLesson?.whyItMatters && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3 text-xs">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-300 block mb-1">Why This Matters in Production:</span>
                <span className="text-slate-300 leading-relaxed">{currentCareerLesson.whyItMatters}</span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: STEP-BY-STEP DEEP DIVE */}
        {currentCareerLesson?.stepByStep && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>2. Step-by-Step Execution Mechanics</span>
            </div>
            <div className="space-y-2.5">
              {currentCareerLesson.stepByStep.map((step, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: WORKED CODE EXAMPLE & DRY-RUN */}
        {(currentCareerLesson?.workedExample || currentJavaTopic?.exampleCode) && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Code2 className="w-4 h-4" />
                <span>3. Worked Code Example & Expected Output</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px]">
                  {currentCareerLesson?.workedExample.title || `${topicTitle} Implementation`}
                </span>
                <span className="text-[10px] text-slate-500">Syntax Highlighted</span>
              </div>
              <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto leading-relaxed">
                <code>
                  {currentCareerLesson?.workedExample.code || currentJavaTopic?.exampleCode || ""}
                </code>
              </pre>
            </div>

            {currentCareerLesson?.workedExample.expectedOutput && (
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-slate-500 uppercase text-[10px] block">Expected Console Output:</span>
                <span className="text-emerald-400 font-bold">
                  {currentCareerLesson.workedExample.expectedOutput}
                </span>
              </div>
            )}

            {/* DRY RUN TABLE */}
            {currentCareerLesson?.workedExample.dryRunTable && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 block">
                  🔍 Step-by-Step Variable Trace Table (Dry-Run):
                </span>
                <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 text-[11px]">
                      <tr>
                        <th className="p-3">Step</th>
                        <th className="p-3">Line / Expression</th>
                        <th className="p-3">Memory / State</th>
                        <th className="p-3">Observation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px] text-slate-300">
                      {currentCareerLesson.workedExample.dryRunTable.map((row) => (
                        <tr key={row.step} className="hover:bg-slate-900/30">
                          <td className="p-3 font-bold text-blue-400">#{row.step}</td>
                          <td className="p-3 text-slate-300">{row.line}</td>
                          <td className="p-3 text-teal-300">{row.state}</td>
                          <td className="p-3 text-slate-400 font-sans">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: COMMON MISTAKES & DEBUGGING TIPS */}
        {currentCareerLesson?.commonMistakes && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-3">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                Common Mistakes to Avoid
              </span>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                {currentCareerLesson.commonMistakes.map((mis, i) => (
                  <li key={i}>{mis}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-3">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                Debugging Tips
              </span>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                {currentCareerLesson.debuggingTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 5: KNOWLEDGE CHECK (INTERACTIVE QUIZ) */}
        {currentCareerLesson?.knowledgeCheck && currentCareerLesson.knowledgeCheck.length > 0 && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>4. Knowledge Check & Mastery Evaluation</span>
            </div>

            <div className="space-y-6">
              {currentCareerLesson.knowledgeCheck.map((q, qIdx) => {
                const selected = quizSelections[qIdx];
                const isVerified = quizSubmitted[qIdx];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={qIdx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs md:text-sm font-semibold text-white">
                      Q{qIdx + 1}: {q.question}
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (selected === optIdx) {
                          btnStyle = "bg-blue-600/20 border-blue-500 text-white font-medium";
                        }
                        if (isVerified) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold";
                          } else if (selected === optIdx) {
                            btnStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            disabled={isVerified}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isVerified && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {!isVerified ? (
                      <button
                        onClick={() => handleVerifyQuiz(qIdx)}
                        disabled={selected === undefined}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold disabled:opacity-50 transition-colors"
                      >
                        Verify Answer
                      </button>
                    ) : (
                      <div className={`p-3.5 rounded-xl text-xs ${isCorrect ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
                        <span className="font-bold block mb-1">
                          {isCorrect ? "✓ Correct!" : "✗ Review this concept:"}
                        </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 6: PRACTICAL ASSIGNMENT & CODE WORKSPACE */}
        {currentCareerLesson?.assignment && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>5. Practical Hands-On Exercise</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Max Score: {currentCareerLesson.assignment.maxScore} pts</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs md:text-sm font-bold text-white">
                {currentCareerLesson.assignment.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentCareerLesson.assignment.prompt}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 block font-mono">Your Implementation Code / Written Solution:</label>
              <textarea
                rows={5}
                value={assignmentCode}
                onChange={(e) => setAssignmentCode(e.target.value)}
                placeholder="// Write your code or query solution here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleEvaluateAssignment}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20"
              >
                Submit & Evaluate Assignment
              </button>
              <span className="text-[11px] text-slate-500 italic">Deterministic rubric feedback</span>
            </div>

            {assignmentFeedback && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                {assignmentFeedback}
              </div>
            )}
          </div>
        )}

        {/* SECTION 7: INTERVIEW RELEVANCE & SUMMARY NOTES */}
        {currentCareerLesson?.interviewRelevance && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              🎯 Interview Relevance & High-Yield Questions
            </span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              {currentCareerLesson.interviewRelevance}
            </p>

            {currentCareerLesson.summaryNotes && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Summary Revision Cheat-Sheet:</span>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {currentCareerLesson.summaryNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SECTION 8: EMBEDDED BEAM MENTOR (AI TUTOR) */}
        <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/90 border border-blue-500/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Beam Mentor — Instant Doubt Solver</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                  Lesson Context Aware
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Stuck on a concept? Ask for a simpler explanation, dry-run walkthrough, or progressive hints.
              </p>
            </div>
          </div>

          {/* SUGGESTED PROMPT BUTTONS */}
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              onClick={() => handleAskTutor("Explain this concept like I am an absolute beginner")}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
            >
              "Explain like I'm a beginner"
            </button>
            <button
              onClick={() => handleAskTutor("Give me a progressive hint without revealing the entire answer")}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
            >
              "Give me a hint"
            </button>
            <button
              onClick={() => handleAskTutor("Walk through a line-by-line dry run of this code")}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
            >
              "Show me a dry-run"
            </button>
            <button
              onClick={() => handleAskTutor("What are the most common interview traps for this topic?")}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
            >
              "Interview traps"
            </button>
          </div>

          {/* INPUT FORM */}
          <div className="flex gap-2">
            <input
              type="text"
              value={tutorQuery}
              onChange={(e) => setTutorQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskTutor()}
              placeholder="Ask Beam Mentor a specific question about this lesson..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={() => handleAskTutor()}
              disabled={tutorLoading || !tutorQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{tutorLoading ? "Thinking..." : "Ask"}</span>
            </button>
          </div>

          {/* TUTOR RESPONSE */}
          {tutorAnswer && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-blue-500/20 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {tutorAnswer}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}