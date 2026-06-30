import { Zap, Brain, Target, Users, Code2, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  accent: 'blue' | 'violet';
}

export interface LearningPath {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: number;
  hours: string;
  skills: string[];
  description: string;
  gradient: string;
  popular?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const features: Feature[] = [
  {
    icon: Brain,
    title: 'Adaptive Learning Engine',
    description: 'Our AI tracks your pace and gaps, then reshapes every lesson in real time — no more grinding through content you already know.',
    tag: 'AI-Powered',
    accent: 'blue',
  },
  {
    icon: Code2,
    title: 'In-Browser Code Sandbox',
    description: 'Write, run, and debug real code without leaving the lesson. Instant feedback loops that teach you to think like a debugger.',
    tag: 'Interactive',
    accent: 'violet',
  },
  {
    icon: Target,
    title: 'Structured Learning Paths',
    description: 'Curated tracks built by engineers at FAANG companies. Each path takes you from concept to job-ready portfolio project.',
    tag: 'Career-Focused',
    accent: 'blue',
  },
  {
    icon: Users,
    title: 'Peer Code Reviews',
    description: 'Submit your projects and get reviewed by senior engineers and peers. Learn the craft of giving and receiving meaningful feedback.',
    tag: 'Community',
    accent: 'violet',
  },
  {
    icon: BarChart3,
    title: 'Skill Graph Dashboard',
    description: 'Visual progress mapping shows exactly where you stand and what to focus on next. No more guessing what to learn.',
    tag: 'Analytics',
    accent: 'blue',
  },
  {
    icon: Zap,
    title: 'Daily Coding Challenges',
    description: 'Five-minute micro-problems delivered each morning. Build a consistent practice that compounds into deep intuition.',
    tag: 'Practice',
    accent: 'violet',
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    level: 'Beginner',
    modules: 12,
    hours: '80+',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Testing'],
    description: 'From zero to shipping production UIs. Build real projects that belong in a portfolio, not a tutorial archive.',
    gradient: 'from-blue-beam/20 to-blue-dim/10',
    popular: true,
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    level: 'Intermediate',
    modules: 14,
    hours: '100+',
    skills: ['Node.js', 'Databases', 'REST APIs', 'Auth', 'Deployment'],
    description: 'Master the systems that power apps at scale — databases, APIs, auth, and cloud deployment done right.',
    gradient: 'from-violet-accent/20 to-violet-dim/10',
  },
  {
    id: 'dsa',
    title: 'Algorithms & Data Structures',
    level: 'Intermediate',
    modules: 10,
    hours: '60+',
    skills: ['Arrays', 'Trees', 'Graphs', 'DP', 'System Design'],
    description: 'The patterns that show up in every technical interview. Learn to recognize them, not memorize solutions.',
    gradient: 'from-blue-beam/15 to-violet-accent/15',
  },
  {
    id: 'ml',
    title: 'Machine Learning Foundations',
    level: 'Advanced',
    modules: 16,
    hours: '120+',
    skills: ['Python', 'PyTorch', 'Statistics', 'NLP', 'CV'],
    description: 'Build intuition for how models learn — from linear regression to fine-tuning transformers on real datasets.',
    gradient: 'from-violet-accent/20 to-blue-dim/10',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "I'd tried four other platforms. Beam Academy is the first that actually changed how I think about problems — not just syntax. Three months later, I'm at a Series B startup.",
    name: 'Arjun Mehta',
    role: 'Software Engineer',
    company: 'Fintech startup, SF',
    avatar: 'AM',
  },
  {
    quote: "The adaptive engine is uncanny. It found a gap in my async knowledge I didn't know I had, assigned a focused two-hour track, and I finally stopped cargo-culting Promises.",
    name: 'Sofia Reyes',
    role: 'Frontend Developer',
    company: 'E-commerce SaaS',
    avatar: 'SR',
  },
  {
    quote: "Used Beam to prep for interviews after a layoff. Cleared five rounds at a FAANG with concepts I learned here in eight weeks. The DSA track alone is worth the price.",
    name: 'Marcus Chen',
    role: 'Staff Engineer',
    company: 'FAANG Company',
    avatar: 'MC',
  },
  {
    quote: "I mentor junior devs and now I recommend Beam to every one of them. The peer review system teaches them how to read code critically — a skill school never covers.",
    name: 'Priya Nair',
    role: 'Engineering Manager',
    company: 'Scale-up, London',
    avatar: 'PN',
  },
];

export const stats: Stat[] = [
  { value: '94%', label: 'course completion rate' },
  { value: '180K+', label: 'engineers enrolled' },
  { value: '4.2× faster', label: 'skill acquisition vs solo study' },
  { value: '8 weeks', label: 'avg. time to first job offer' },
];

export const navLinks = [
  { label: 'Paths', href: '#paths' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
];

export const footerLinks = {
  Product: ['Learning Paths', 'Code Sandbox', 'Challenges', 'Skill Graph', 'Mobile App'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Brand'],
  Resources: ['Documentation', 'Community', 'Changelog', 'Status', 'API'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
};
