import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Terminal,
  Compass,
  Bell,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "mission" | "revision" | "streak" | "alert";
  timestamp: string;
  read: boolean;
  link: string;
}

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export default function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Today's Learning Mission",
      message: "Java Core: HashMap internal collisions and treeification awaits completion.",
      type: "mission",
      timestamp: "10m ago",
      read: false,
      link: "/java",
    },
    {
      id: "notif-2",
      title: "Spaced Repetition Due",
      message: "2 flashcards scheduled for review in Memory Revision Vault.",
      type: "revision",
      timestamp: "1h ago",
      read: false,
      link: "/revision",
    },
    {
      id: "notif-3",
      title: "Target Role Alignment",
      message: `Your roadmap is configured for ${user?.targetRole || "Java Backend Developer"}.`,
      type: "alert",
      timestamp: "Today",
      read: false,
      link: "/roadmap",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>{getGreeting()}, {firstName}</span>
            <span className="text-xl">👋</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Placement Mission: <span className="text-blue-400 font-medium">{user?.targetRole || "Java Backend Developer"}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        <Link
          to="/roadmap"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span>Curriculum</span>
        </Link>

        <Link
          to="/dsa"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>DSA Drills</span>
        </Link>

        <Link
          to="/ai"
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Ask AI Coach</span>
          <span className="sm:hidden">AI Coach</span>
        </Link>

        {/* NOTIFICATION BELL */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Placement Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] text-slate-400 hover:text-blue-300 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 ${
                        n.read
                          ? "bg-slate-950/40 border-slate-800/60 opacity-70"
                          : "bg-slate-950 border-blue-500/30 shadow-sm"
                      }`}
                    >
                      <button
                        onClick={() => {
                          navigate(n.link);
                          setShowNotifications(false);
                        }}
                        className="text-left flex-1 min-w-0"
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {n.type === "mission" && <Clock className="w-3 h-3 text-blue-400" />}
                          {n.type === "revision" && <RotateCcw className="w-3 h-3 text-indigo-400" />}
                          {n.type === "alert" && <Target className="w-3 h-3 text-amber-400" />}
                          <span className="font-bold text-slate-200 truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-500 ml-auto">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{n.message}</p>
                      </button>

                      <button
                        onClick={() => removeNotification(n.id)}
                        className="text-slate-500 hover:text-rose-400 shrink-0 p-1"
                        title="Dismiss"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center">No new notifications.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* USER INITIAL AVATAR */}
        <Link
          to="/settings"
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white shadow-inner hover:scale-105 transition-transform"
          title="Account Settings"
        >
          {firstName.charAt(0).toUpperCase()}
        </Link>
      </div>
    </header>
  );
}