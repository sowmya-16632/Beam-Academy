import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, CertificateData } from "../api/client";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Search,
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Printer,
  Sparkles,
  ExternalLink,
  BookOpen,
  UserCheck
} from "lucide-react";

export default function VerifyCertificate() {
  const { certId: paramCertId } = useParams<{ certId?: string }>();
  const [searchId, setSearchId] = useState(paramCertId || "");
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (paramCertId) {
      performVerification(paramCertId);
    }
  }, [paramCertId]);

  async function performVerification(idToVerify: string) {
    const cleanId = idToVerify.trim();
    if (!cleanId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await api.verifyCertificate(cleanId);
      setCert(data);
    } catch (err) {
      setCert(null);
      setError(err instanceof Error ? err.message : "Certificate ID not found or invalid");
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    performVerification(searchId);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* TOP HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent">
                Beam Academy
              </span>
              <span className="block text-[10px] text-blue-400 font-mono tracking-wider uppercase">
                Credential Verification Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/dashboard"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-8">
        {/* SEARCH BOX */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Verify Course Completion Credential
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-md mx-auto">
              Every Beam Academy certificate is backed by server-side verification of completed curricula, quizzes, coding challenges, and capstone evaluations.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="e.g. BEAM-SDE-20261011-..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-800 outline-none focus:border-blue-500 transition-colors font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchId.trim()}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-semibold">Verification Unsuccessful</p>
              <p className="text-rose-400 mt-0.5">{error}. Please ensure the certificate ID was entered accurately.</p>
            </div>
          </div>
        )}

        {/* VERIFIED CERTIFICATE DISPLAY */}
        {cert && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Officially Verified Credential</span>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>

            {/* CERTIFICATE CANVAS CARD */}
            <div
              id="printable-certificate"
              className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-blue-500/30 p-8 md:p-14 shadow-2xl space-y-8"
            >
              {/* CORNER ORNAMENTS */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-400/40 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-blue-400/40 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl pointer-events-none" />

              {/* BACKGROUND WATERMARK */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Award className="w-96 h-96 text-blue-400" />
              </div>

              {/* CERTIFICATE HEADER */}
              <div className="text-center space-y-2 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-500/30 mb-3">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold">
                  Beam Academy — Certificate of Completion
                </h2>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Credential of Technical Excellence
                </h3>
                <p className="text-slate-400 text-xs">
                  This certifies that the recipient has satisfied all curriculum requirements, quizzes, coding drills, and capstone evaluations.
                </p>
              </div>

              {/* RECIPIENT NAME */}
              <div className="text-center py-4 border-y border-slate-800/80 space-y-1 relative z-10">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Awarded To</span>
                <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  {cert.recipientName}
                </h1>
                <p className="text-xs text-slate-400 font-mono">{cert.recipientEmail}</p>
              </div>

              {/* COURSE DETAILS */}
              <div className="text-center space-y-2 relative z-10">
                <p className="text-xs text-slate-400">For successfully mastering the comprehensive curriculum:</p>
                <h4 className="text-xl md:text-2xl font-bold text-white">
                  {cert.courseTitle}
                </h4>
                {cert.finalScore && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                    <span>Performance Mastery Score:</span>
                    <span className="text-white font-mono">{cert.finalScore}%</span>
                  </div>
                )}
              </div>

              {/* METADATA FOOTER GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 text-xs relative z-10">
                <div>
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">Credential ID</span>
                  <span className="font-mono text-slate-300 font-semibold">{cert.certificateId}</span>
                </div>
                <div className="md:text-center">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">Issue Date</span>
                  <span className="text-slate-300 font-semibold">
                    {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="md:text-right">
                  <span className="text-slate-500 block uppercase font-mono text-[10px]">Accreditation Authority</span>
                  <span className="text-slate-300 font-semibold">Beam Academy Board</span>
                </div>
              </div>

              {/* SECURITY HASH */}
              {cert.verificationHash && (
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-[10px] font-mono text-slate-500 break-all space-y-1 relative z-10">
                  <span className="text-slate-400 font-semibold block">Cryptographic SHA-256 Verification Digest:</span>
                  <span>{cert.verificationHash}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-6 px-6 text-center text-xs text-slate-500">
        <p>Beam Academy — A Free, AI-Powered Career Learning Platform for College Students & Engineers.</p>
      </footer>
    </div>
  );
}
