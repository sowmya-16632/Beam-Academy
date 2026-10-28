import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white animate-pulse shadow-lg shadow-blue-500/25 mb-4">
          <Sparkles className="w-6 h-6 animate-spin" />
        </div>
        <p className="text-slate-400 text-xs font-medium tracking-wide">
          Verifying Beam Academy session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}