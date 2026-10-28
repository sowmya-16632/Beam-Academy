import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface BeamUser {
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
  activePathId?: string;
}

interface AuthContextType {
  user: BeamUser | null;
  isLoaded: boolean;
  login: (user: BeamUser) => void;
  logout: () => void;
  updateUser: (partial: Partial<BeamUser>) => void;
  activePathId: string;
  setActivePathId: (pathId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<BeamUser | null>(null);
  const [activePathId, setActivePathIdState] = useState<string>("sde");

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("beam_user");
      if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.activePathId) {
          setActivePathIdState(parsed.activePathId);
        }
      }
      const savedPath = localStorage.getItem("beam_active_career_path");
      if (savedPath) {
        setActivePathIdState(savedPath);
      }
    } catch (e) {
      console.warn("Failed to parse saved user session", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      localStorage.setItem("beam_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("beam_user");
    }
  }, [user, isLoaded]);

  const login = (nextUser: BeamUser) => {
    setUser(nextUser);
    localStorage.setItem("beam_user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("beam_user");
  };

  const updateUser = (partial: Partial<BeamUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };
      localStorage.setItem("beam_user", JSON.stringify(updated));
      return updated;
    });
  };

  const setActivePathId = (pathId: string) => {
    setActivePathIdState(pathId);
    localStorage.setItem("beam_active_career_path", pathId);
    if (user) {
      updateUser({ activePathId: pathId });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout, updateUser, activePathId, setActivePathId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
