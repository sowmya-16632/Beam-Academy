import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import {
  Bot,
  Send,
  Sparkles,
  User as UserIcon,
  RotateCcw,
  BookOpen,
  Code2,
  HelpCircle,
  Briefcase,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  status?: string;
  model?: string;
}

export default function AICoach() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Hello ${user?.name ? user.name.split(" ")[0] : "there"}! 👋 I am your Beam Placement Coach.\n\nI can help you:\n• Master Java & Spring Boot backend concepts\n• Brainstorm algorithmic hints for DSA patterns\n• Practice tricky technical & SQL interview questions\n• Generate personalized day-by-day study plans\n• Review and optimize your resume project bullets\n\nWhat would you like to prepare today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize from search query parameters if navigated from topic/dsa
  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    if (urlPrompt) {
      setInputPrompt(urlPrompt);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage(promptToSend?: string) {
    const text = (promptToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const response = await api.askCoach(text, {
        userId: user?.id,
        targetRole: user?.targetRole,
      });

      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: response.status,
        model: response.model,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: `⚠️ Placement Coach is operating in standby mode: ${err instanceof Error ? err.message : "Service unavailable"}. Continue practicing curriculum lessons in the sidebar modules.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  const quickPrompts = [
    { label: "Explain from zero", prompt: "Explain this core concept from zero with a simple analogy so a complete beginner can understand." },
    { label: "Simple example", prompt: "Give me a simple, real-world practical example of how this is used in software engineering." },
    { label: "Why does code fail?", prompt: "Why does this approach fail on large test cases or edge cases? What common bugs happen here?" },
    { label: "Give me a hint", prompt: "Give me a subtle progressive hint for the optimal approach without revealing the solution yet." },
    { label: "Don't give answer yet", prompt: "I am stuck on this problem. Guide my thinking with questions—don't give me the answer yet." },
    { label: "Quiz me", prompt: "Quiz me with 2 quick technical questions on this topic to test my understanding." },
    { label: "Interviewer perspective", prompt: "Explain how an interviewer evaluates this question and what follow-up traps they ask." },
    { label: "Real-world use", prompt: "Give me a real-world production system design example of where this pattern is used at scale." },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 flex flex-col h-[calc(100vh-140px)]">
        {/* COACH HEADER */}
        <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Beam Mentor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h2>
              <p className="text-xs text-slate-400">
                Learning Companion for: <span className="text-blue-300 font-semibold">{user?.targetRole || "Java Backend Developer"}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages([
                {
                  id: "welcome-reset",
                  sender: "ai",
                  text: "Chat cleared. What placement topic would you like to explore next?",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            }}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Chat</span>
          </button>
        </div>

        {/* CHAT MESSAGES STREAM */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 custom-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 border border-slate-700 text-blue-400"
                  }`}
                >
                  {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                    isUser
                      ? "bg-blue-600 text-white rounded-tr-none shadow-md"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className={`mt-2 text-[10px] flex items-center gap-2 ${isUser ? "text-blue-200" : "text-slate-500"}`}>
                    <span>{msg.timestamp}</span>
                    {msg.status && (
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[9px] uppercase font-mono">
                        {msg.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-slate-300">Beam Coach is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* QUICK PROMPT CHIPS */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Prompts:
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp.prompt)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* INPUT BOX */}
        <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-xl shrink-0 flex items-center gap-3">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask about Java OOP, Collections, DSA pattern hints, SQL joins, or request a mock interview question..."
            rows={2}
            className="flex-1 bg-transparent text-slate-200 text-xs md:text-sm outline-none resize-none px-2 py-1 placeholder:text-slate-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputPrompt.trim()}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white shadow-md shadow-blue-600/20 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Layout>
  );
}
