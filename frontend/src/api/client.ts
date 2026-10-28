const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8081/api";

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({ message: "Server returned a non-JSON response" }));

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

// Types
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  targetRole?: string;
  skillLevel?: string;
  hoursPerDay?: number;
  role?: string;
  targetCompany?: string;
  targetPlacementDate?: string;
  weakAreas?: string;
  assessmentJson?: string;
  jobApplicationsJson?: string;
  revisionQueueJson?: string;
}

export interface AuthResponse {
  message: string;
  user: UserProfile;
}

export interface DashboardStats {
  overallProgress: number;
  javaProgress: number;
  sqlProgress: number;
  dsaProgress: number;
  aptitudeProgress: number;
  interviewProgress: number;
  solvedDsaCount: number;
  completedTopicsCount: number;
  aptitudeTestsCount: number;
  masteredInterviewCount: number;
  continueCourse?: string;
  continueTopicId?: string;
  continueTopicTitle?: string;
  todayMissions: string[];
  aiRecommendation?: string;
}

export interface RecentActivity {
  type: string;
  title: string;
  category: string;
  status: string;
  timestamp: string;
}

export interface ResumeData {
  fullName: string;
  headline: string;
  contactEmail: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  educationJson: string;
  skillsJson: string;
  projectsJson: string;
  internshipsJson: string;
  certificationsJson: string;
  achievementsJson: string;
}

export interface StudyPlanData {
  targetRole: string;
  skillLevel: string;
  hoursPerDay: number;
  durationWeeks: number;
  planJson?: string;
  completedTaskKeysJson?: string;
}

// API methods
export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signup: (name: string, email: string, password: string, targetRole?: string) =>
    apiRequest<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, targetRole }),
    }),

  getProfile: (userId: number) =>
    apiRequest<UserProfile>(`/auth/profile/${userId}`),

  updateProfile: (userId: number, profile: Partial<UserProfile>) =>
    apiRequest<UserProfile>(`/auth/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(profile),
    }),

  // Dashboard & Progress
  getDashboardStats: (userId: number) =>
    apiRequest<DashboardStats>(`/dashboard/stats/${userId}`),

  getRecentActivity: (userId: number) =>
    apiRequest<RecentActivity[]>(`/dashboard/recent-activity/${userId}`),

  // Courses
  getAllCompletions: (userId: number) =>
    apiRequest<Record<string, string[]>>(`/courses/completions/${userId}`),

  getCourseCompletions: (userId: number, course: string) =>
    apiRequest<string[]>(`/courses/${course}/completions/${userId}`),

  toggleTopic: (userId: number, course: string, topicId: string, completed: boolean) =>
    apiRequest<{ message: string }>(`/courses/toggle/${userId}`, {
      method: "POST",
      body: JSON.stringify({ course, topicId, completed }),
    }),

  // DSA
  recordDsaAttempt: (userId: number, problemSlug: string, status: string, code?: string, language?: string, executionOutput?: string) =>
    apiRequest<{ message: string; attemptId: number; status: string }>(`/dsa/attempt/${userId}`, {
      method: "POST",
      body: JSON.stringify({ problemSlug, status, code, language, executionOutput }),
    }),

  getDsaAttempts: (userId: number, problemSlug?: string) =>
    problemSlug
      ? apiRequest<any[]>(`/dsa/problem/${problemSlug}/attempts/${userId}`)
      : apiRequest<any[]>(`/dsa/attempts/${userId}`),

  getSolvedDsaSlugs: (userId: number) =>
    apiRequest<string[]>(`/dsa/solved/${userId}`),

  // Aptitude
  recordAptitudeAttempt: (userId: number, category: string, topic: string, score: number, totalQuestions: number, timeSpentSeconds?: number) =>
    apiRequest<{ message: string; score: number; totalQuestions: number }>(`/aptitude/attempt/${userId}`, {
      method: "POST",
      body: JSON.stringify({ category, topic, score, totalQuestions, timeSpentSeconds }),
    }),

  getAptitudeAttempts: (userId: number) =>
    apiRequest<any[]>(`/aptitude/attempts/${userId}`),

  // Interview
  recordInterviewPractice: (userId: number, questionId: string, category: string, mastered: boolean, userNotes?: string) =>
    apiRequest<{ message: string; questionId: string; mastered: boolean }>(`/interview/practice/${userId}`, {
      method: "POST",
      body: JSON.stringify({ questionId, category, mastered, userNotes }),
    }),

  getMasteredInterviewIds: (userId: number) =>
    apiRequest<string[]>(`/interview/mastered/${userId}`),

  // Study Plan
  getStudyPlan: (userId: number) =>
    apiRequest<any>(`/study-plan/${userId}`),

  saveStudyPlan: (userId: number, plan: StudyPlanData) =>
    apiRequest<any>(`/study-plan/${userId}`, {
      method: "POST",
      body: JSON.stringify(plan),
    }),

  updatePlanTasks: (userId: number, completedTaskKeysJson: string) =>
    apiRequest<any>(`/study-plan/${userId}/tasks`, {
      method: "POST",
      body: JSON.stringify({ completedTaskKeysJson }),
    }),

  // Resume
  getResume: (userId: number) =>
    apiRequest<ResumeData>(`/resume/${userId}`),

  saveResume: (userId: number, data: ResumeData) =>
    apiRequest<ResumeData>(`/resume/${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // AI Coach
  askCoach: (prompt: string, context?: { userId?: number; courseContext?: string; problemContext?: string; currentCode?: string; targetRole?: string }) =>
    apiRequest<{ answer: string; status: string; model: string }>(`/ai/coach${context?.userId ? `?userId=${context.userId}` : ""}`, {
      method: "POST",
      body: JSON.stringify({
        prompt,
        courseContext: context?.courseContext,
        problemContext: context?.problemContext,
        currentCode: context?.currentCode,
        targetRole: context?.targetRole,
      }),
    }),

  // Admin
  getAdminOverview: () =>
    apiRequest<any>("/admin/overview"),

  getAdminUsers: () =>
    apiRequest<UserProfile[]>("/admin/users"),

  // Certificates & Verification
  checkCertificateEligibility: (userId: number, courseId: string) =>
    apiRequest<CertificateData>(`/certificates/eligibility/${userId}/${courseId}`),

  issueCertificate: (userId: number, courseId: string, courseTitle: string) =>
    apiRequest<CertificateData>(`/certificates/issue/${userId}`, {
      method: "POST",
      body: JSON.stringify({ courseId, courseTitle }),
    }),

  getUserCertificates: (userId: number) =>
    apiRequest<CertificateData[]>(`/certificates/user/${userId}`),

  verifyCertificate: (certificateId: string) =>
    apiRequest<CertificateData>(`/certificates/verify/${certificateId}`),
};

export interface CertificateData {
  id?: number;
  userId: number;
  courseId: string;
  courseTitle: string;
  certificateId: string;
  recipientName: string;
  recipientEmail: string;
  issuedAt: string;
  status: string;
  verificationHash?: string;
  finalScore?: number;
  requirementsSummary?: string;
  eligible: boolean;
  satisfiedCriteria?: string[];
  pendingCriteria?: string[];
  verificationUrl?: string;
}
