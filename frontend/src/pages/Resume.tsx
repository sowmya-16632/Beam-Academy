import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { api, ResumeData } from "../api/client";
import {
  FileText,
  Save,
  CheckCircle2,
  Copy,
  Sparkles,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  ShieldCheck,
  UserCheck,
  Target,
  Plus,
  Trash2,
  Check,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface JobApplication {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  stage: "Applied" | "Online Assessment" | "Technical Round" | "HR Round" | "Selected" | "Rejected";
  interviewDate?: string;
  notes: string;
}

export default function Resume() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"resume" | "self-intro" | "star" | "checklist" | "tracker">("resume");

  const [formData, setFormData] = useState<ResumeData>({
    fullName: user?.name || "Student",
    headline: "Aspiring Java Backend Developer | Software Engineer",
    contactEmail: user?.email || "student@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    githubUrl: "https://github.com/my-profile",
    linkedinUrl: "https://linkedin.com/in/my-profile",
    educationJson: "Bachelor of Technology in Computer Science & Engineering (2021 - 2025) | CGPA: 8.6/10",
    skillsJson: "Java 17/22, Spring Boot 3, Spring Data JPA, Hibernate, MySQL, REST APIs, Spring Security, BCrypt, React 18, TypeScript, Vite, TailwindCSS, Git, Maven, Docker",
    projectsJson: `Beam Academy — AI-Powered Placement Preparation Platform
Tech Stack: Java, Spring Boot 3, MySQL, Spring Security, React 18, TypeScript, Vite, OpenAI API
• Architected a 3-tier placement preparation SaaS featuring structured Java/SQL roadmaps, DSA pattern practice, aptitude testing, and an AI placement coach.
• Designed and developed secure backend RESTful APIs using Spring Boot, Spring Data JPA, BCrypt password hashing, and MySQL relational persistence.
• Built an interactive DSA coding workspace with progressive hints (Think → Hint → Approach → Code → Complexity) and persistent attempt tracking.
• Implemented an AI placement coach endpoint using Spring RestClient integration with graceful offline fallback, ensuring zero client-side credential exposure.`,
    internshipsJson: "Software Engineering Intern | Tech Solutions (Summer 2024)\n• Built backend microservices and automated testing suites.",
    certificationsJson: "Oracle Certified Associate Java Programmer (OCAJP) • Spring Professional Certification",
    achievementsJson: "Solved 150+ DSA problems on LeetCode • 1st Place in College Hackathon",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Self-intro builder state
  const [degree, setDegree] = useState("B.Tech in Computer Science");
  const [primaryLang, setPrimaryLang] = useState("Java and Spring Boot");
  const [coreFocus, setCoreFocus] = useState("scalable backend systems, REST APIs, and database optimization");
  const [dreamGoal, setDreamGoal] = useState("contribute as a high-impact Software Engineer");

  // STAR method builder state
  const [starTitle, setStarTitle] = useState("Resolved High Concurrency Race Condition");
  const [starS, setStarS] = useState("During peak testing of our flash-sale project, multiple concurrent orders led to negative inventory counts.");
  const [starT, setStarT] = useState("My goal was to eliminate dirty reads and prevent stock overselling under 500 concurrent threads.");
  const [starA, setStarA] = useState("Implemented JPA @Version optimistic locking and backed critical operations with Redis atomic counters.");
  const [starR, setStarR] = useState("Achieved zero stock discrepancies under 500-thread load tests while maintaining sub-40ms latency.");

  // Applications tracker state
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const defaultApps = [
      {
        id: "app-1",
        company: "Infosys / TCS Digital",
        role: "Systems Engineer / Digital Cadre",
        appliedDate: "2026-10-01",
        stage: "Online Assessment",
        interviewDate: "2026-10-15",
        notes: "Revise Java collections and speed distance aptitude.",
      },
      {
        id: "app-2",
        company: "Product Startup",
        role: "Associate Backend Developer",
        appliedDate: "2026-10-05",
        stage: "Technical Round",
        interviewDate: "2026-10-18",
        notes: "Prepare STAR explanation for Beam Academy project.",
      },
    ];
    try {
      const saved = localStorage.getItem("beam_job_applications");
      return saved ? JSON.parse(saved) : defaultApps;
    } catch {
      return defaultApps;
    }
  });

  const [newApp, setNewApp] = useState<Partial<JobApplication>>({
    company: "",
    role: "",
    appliedDate: new Date().toISOString().split("T")[0],
    stage: "Applied",
    notes: "",
  });

  useEffect(() => {
    localStorage.setItem("beam_job_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if (!user?.id) return;
    api.getResume(user.id)
      .then((data) => {
        if (data) {
          setFormData((prev) => ({
            ...prev,
            ...data,
            fullName: data.fullName || prev.fullName,
            contactEmail: data.contactEmail || prev.contactEmail,
          }));
        }
      })
      .catch(() => {});
  }, [user?.id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      await api.saveResume(user.id, formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCopyMarkdown() {
    const md = `# ${formData.fullName}
**${formData.headline}**
${formData.contactEmail} | ${formData.phone} | ${formData.location}
GitHub: ${formData.githubUrl} | LinkedIn: ${formData.linkedinUrl}

---

### Technical Skills
${formData.skillsJson}

---

### Featured Projects
${formData.projectsJson}

---

### Education
${formData.educationJson}

---

### Work & Internships
${formData.internshipsJson}

---

### Certifications & Achievements
${formData.certificationsJson}
${formData.achievementsJson}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const handleAddApplication = () => {
    if (!newApp.company?.trim()) return;
    const app: JobApplication = {
      id: `app-${Date.now()}`,
      company: newApp.company.trim(),
      role: newApp.role?.trim() || "Software Engineer",
      appliedDate: newApp.appliedDate || new Date().toISOString().split("T")[0],
      stage: (newApp.stage as any) || "Applied",
      notes: newApp.notes?.trim() || "",
    };
    setApplications((prev) => [...prev, app]);
    setNewApp({
      company: "",
      role: "",
      appliedDate: new Date().toISOString().split("T")[0],
      stage: "Applied",
      notes: "",
    });
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // ATS Checklist evaluation
  const hasActionVerbs = /(architected|engineered|designed|developed|implemented|optimized|built|integrated)/i.test(formData.projectsJson);
  const hasMetrics = /(\d+%|\d+ms|\d+\+|\d+)/.test(formData.projectsJson);
  const hasGitHub = formData.githubUrl.includes("github.com");
  const hasSkills = formData.skillsJson.length > 30;
  const atsScore = (hasActionVerbs ? 25 : 0) + (hasMetrics ? 25 : 0) + (hasGitHub ? 25 : 0) + (hasSkills ? 25 : 0);

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Briefcase className="w-4 h-4" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                Career Toolkit & Placement Assets
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Resume Builder & Career Launchpad
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
              Construct an ATS-optimized fresher resume, generate your interview self-introduction script, craft STAR answers, and track your campus application pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">ATS Readiness</p>
              <p className="text-2xl font-bold text-emerald-400 font-mono">{atsScore}%</p>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Job Pipeline</p>
              <p className="text-2xl font-bold text-blue-400 font-mono">{applications.length} Active</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "resume"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            ATS Resume Editor
          </button>
          <button
            onClick={() => setActiveTab("self-intro")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "self-intro"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            "Tell Me About Yourself" Builder
          </button>
          <button
            onClick={() => setActiveTab("star")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "star"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            STAR Behavioral Playbook
          </button>
          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "checklist"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Profile Audit Checklist
          </button>
          <button
            onClick={() => setActiveTab("tracker")}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === "tracker"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Job Application Tracker ({applications.length})
          </button>
        </div>

        {/* TAB 1: ATS RESUME BUILDER */}
        {activeTab === "resume" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* EDITOR FORM (LEFT 7 COLUMNS) */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Profile & Credentials</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied!" : "Copy Markdown"}</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? "Saving..." : saveSuccess ? "Saved ✓" : "Save to MySQL"}</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Target Headline</label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Technical Skills (Keywords)</label>
                  <textarea
                    rows={2}
                    value={formData.skillsJson}
                    onChange={(e) => setFormData({ ...formData, skillsJson: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none resize-none font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Projects & Contributions (Quantified Bullet Points)</label>
                  <textarea
                    rows={6}
                    value={formData.projectsJson}
                    onChange={(e) => setFormData({ ...formData, projectsJson: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none font-mono text-[11px] leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Education & Degrees</label>
                  <input
                    type="text"
                    value={formData.educationJson}
                    onChange={(e) => setFormData({ ...formData, educationJson: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                  />
                </div>
              </form>
            </div>

            {/* LIVE PREVIEW & ATS SCORE (RIGHT 5 COLUMNS) */}
            <div className="lg:col-span-5 space-y-6">
              {/* ATS SCORE CARD */}
              <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ATS Optimization Checks</span>
                  </h4>
                  <span className="text-lg font-bold text-emerald-400 font-mono">{atsScore}/100</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">Action Verbs Used (Architected, Built...)</span>
                    {hasActionVerbs ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-amber-400 text-[10px]">Add verbs</span>}
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">Quantifiable Metrics Included (%, ms, #)</span>
                    {hasMetrics ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-amber-400 text-[10px]">Add metrics</span>}
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">Valid GitHub Link Detected</span>
                    {hasGitHub ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-rose-400 text-[10px]">Add link</span>}
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-300">Core Technical Keywords Formatted</span>
                    {hasSkills ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-amber-400 text-[10px]">Add keywords</span>}
                  </div>
                </div>
              </div>

              {/* LIVE ATS CLEAN PREVIEW */}
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl space-y-4 text-xs font-sans">
                <div className="border-b border-slate-300 pb-3 text-center">
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">{formData.fullName}</h3>
                  <p className="text-[11px] font-semibold text-slate-700">{formData.headline}</p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    {formData.contactEmail} • {formData.phone} • {formData.location}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                    Technical Skills
                  </h4>
                  <p className="text-[10px] text-slate-700 leading-relaxed">{formData.skillsJson}</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                    Featured Projects
                  </h4>
                  <pre className="text-[10px] text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {formData.projectsJson}
                  </pre>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                    Education
                  </h4>
                  <p className="text-[10px] text-slate-700">{formData.educationJson}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SELF-INTRO BUILDER */}
        {activeTab === "self-intro" && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-lg space-y-6 max-w-3xl mx-auto">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>"Tell Me About Yourself" Fresher Introduction Script</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize your academic background and tech stack to generate a confident 90-second interview opening pitch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Your Degree / College</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Primary Tech Stack</label>
                <input
                  type="text"
                  value={primaryLang}
                  onChange={(e) => setPrimaryLang(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Core Engineering Focus</label>
                <input
                  type="text"
                  value={coreFocus}
                  onChange={(e) => setCoreFocus(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Career Goal</label>
                <input
                  type="text"
                  value={dreamGoal}
                  onChange={(e) => setDreamGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Polished 90-Second Interview Script
                </span>
                <button
                  onClick={() => {
                    const text = `Hello, I'm ${formData.fullName}. I am graduating with a ${degree}. Over the past several years, my core technical passion has been centered around ${primaryLang}. I have focused heavily on ${coreFocus}, solving 150+ algorithmic problems across core data structures and relational SQL databases. Most recently, I engineered full-stack applications like Beam Academy, where I implemented secure Spring Boot REST APIs and interactive UI clients. I am eager to bring my strong fundamentals and problem-solving drive to your engineering team to ${dreamGoal}.`;
                    navigator.clipboard.writeText(text);
                    alert("Script copied to clipboard!");
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Script</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                "Hello, I'm <strong>{formData.fullName}</strong>. I am graduating with a <strong>{degree}</strong>. Over the past several years, my core technical passion has been centered around <strong>{primaryLang}</strong>. I have focused heavily on <strong>{coreFocus}</strong>, solving 150+ algorithmic problems across core data structures and relational SQL databases. Most recently, I engineered full-stack applications like Beam Academy, where I implemented secure Spring Boot REST APIs and interactive UI clients. I am eager to bring my strong fundamentals and problem-solving drive to your engineering team to <strong>{dreamGoal}</strong>."
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: STAR METHOD BEHAVIORAL PLAYBOOK */}
        {activeTab === "star" && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-lg space-y-6 max-w-3xl mx-auto">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>STAR Method Behavioral Answer Builder</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Structure your answers for behavioral & HR interview rounds: Situation, Task, Action, and Result.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Scenario Title</label>
                <input
                  type="text"
                  value={starTitle}
                  onChange={(e) => setStarTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 outline-none"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-blue-400 block uppercase text-[10px]">S - Situation (Context & Challenge)</span>
                <textarea
                  rows={2}
                  value={starS}
                  onChange={(e) => setStarS(e.target.value)}
                  className="w-full bg-transparent text-slate-200 outline-none resize-none leading-relaxed"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400 block uppercase text-[10px]">T - Task (Your Exact Responsibility)</span>
                <textarea
                  rows={2}
                  value={starT}
                  onChange={(e) => setStarT(e.target.value)}
                  className="w-full bg-transparent text-slate-200 outline-none resize-none leading-relaxed"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block uppercase text-[10px]">A - Action (The Technical Steps Taken)</span>
                <textarea
                  rows={2}
                  value={starA}
                  onChange={(e) => setStarA(e.target.value)}
                  className="w-full bg-transparent text-slate-200 outline-none resize-none leading-relaxed"
                />
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block uppercase text-[10px]">R - Result (Measurable Outcome & Impact)</span>
                <textarea
                  rows={2}
                  value={starR}
                  onChange={(e) => setStarR(e.target.value)}
                  className="w-full bg-transparent text-slate-200 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE AUDIT CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 shadow-lg space-y-6 max-w-3xl mx-auto">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>GitHub & LinkedIn Placement Readiness Checklist</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ensure your external developer profile inspires immediate confidence in technical recruiters.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                "GitHub profile README highlights your primary stack (Java/Spring Boot) and recent projects.",
                "Top pinned repository has a comprehensive README with architecture diagram and setup guide.",
                "Git commits demonstrate consistent, descriptive messages (e.g. 'feat: add JWT filter') rather than 'update'.",
                "LinkedIn headline explicitly lists target role (e.g. 'Aspiring Java Backend Engineer').",
                "Resume PDF file is named professionally (e.g., 'FirstName_LastName_SoftwareEngineer_Resume.pdf').",
                "Contact email is professional and phone number includes country code (+91).",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: JOB APPLICATION TRACKER */}
        {activeTab === "tracker" && (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Campus & Off-Campus Application Pipeline</h3>
                <p className="text-xs text-slate-400">Track companies, interview stages, and follow-up deadlines.</p>
              </div>
            </div>

            {/* ADD APPLICATION ROW */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs items-end">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Company Name</label>
                <input
                  type="text"
                  value={newApp.company}
                  onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                  placeholder="e.g. Google / Microsoft / Oracle"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Role</label>
                <input
                  type="text"
                  value={newApp.role}
                  onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
                  placeholder="e.g. Software Engineer / SDE"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Stage</label>
                <select
                  value={newApp.stage}
                  onChange={(e) => setNewApp({ ...newApp, stage: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                >
                  <option value="Applied">Applied</option>
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Technical Round">Technical Round</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button
                onClick={handleAddApplication}
                disabled={!newApp.company?.trim()}
                className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white disabled:opacity-40 text-xs"
              >
                Add Application
              </button>
            </div>

            {/* APPLICATION LIST TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Company</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Applied Date</th>
                    <th className="p-3">Stage</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-bold text-white">{app.company}</td>
                      <td className="p-3 text-blue-300">{app.role}</td>
                      <td className="p-3 font-mono text-slate-400">{app.appliedDate}</td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            app.stage === "Selected"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : app.stage === "Technical Round"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                              : app.stage === "Online Assessment"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                          }`}
                        >
                          {app.stage}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px] max-w-xs truncate">{app.notes || "—"}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}