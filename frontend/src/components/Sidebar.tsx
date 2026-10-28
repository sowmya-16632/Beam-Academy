import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Coffee,
  Database,
  Code2,
  BrainCircuit,
  HelpCircle,
  Bot,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Sparkles,
  Target,
  Layers,
  RotateCcw,
  ShieldAlert,
  Award,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  onClose?: () => void;
  className?: string;
}

export default function Sidebar({ onClose, className = "" }: SidebarProps) {
  const { user, logout } = useAuth();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/assessment", label: "Skill Diagnostic", icon: Target, badge: "Test" },
    { to: "/roadmap", label: "Career Roadmaps", icon: Map, badge: "14 Paths" },
    { to: "/java", label: "Java Core", icon: Coffee, badge: "11 Topics" },
    { to: "/sql", label: "SQL Database", icon: Database, badge: "12 Topics" },
    { to: "/dsa", label: "DSA Patterns", icon: Code2, badge: "12 Patterns" },
    { to: "/aptitude", label: "Aptitude & Quants", icon: BrainCircuit },
    { to: "/interview", label: "Mock Interview", icon: HelpCircle },
    { to: "/projects", label: "Guided Projects", icon: Layers },
    { to: "/revision", label: "Memory Revision", icon: RotateCcw },
    { to: "/ai", label: "AI Coach", icon: Bot, highlight: true },
    { to: "/verify", label: "Verify Certificate", icon: Award },
    { to: "/progress", label: "Analytics", icon: BarChart3 },
    { to: "/resume", label: "Career Toolkit", icon: FileText },
    { to: "/admin", label: "Admin Telemetry", icon: ShieldAlert },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none ${className}`}>
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <NavLink to="/dashboard" onClick={() => onClose?.()} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent">
              Beam
            </span>
            <span className="text-xs uppercase tracking-wider block font-semibold text-blue-400">
              Academy
            </span>
          </div>
        </NavLink>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Target Role Tag */}
      {user && (
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Target Role</p>
          <p className="text-xs font-semibold text-blue-300 truncate mt-0.5">
            {user.targetRole || "Java Backend Developer"}
          </p>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 custom-scrollbar">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : link.highlight
                    ? "text-blue-400 hover:text-blue-300 hover:bg-blue-950/40"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-sm font-medium text-slate-200 truncate">{user?.name || "Student"}</p>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          title="Logout"
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}