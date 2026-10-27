"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Users,
} from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const urlEmail = searchParams.get("email");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = () => {
    if (error) return error;
    if (!urlError) return null;

    switch (urlError) {
      case "unauthorized_admin":
        return `Access Denied: The Google account (${urlEmail || "provided"}) is not registered as an authorized administrator. Please sign in with an authorized account or contact governance.`;
      case "google_not_configured":
        return "Google OAuth credentials are not configured in .env. Please sign in using your Admin Email and Password below, or add GOOGLE_CLIENT_ID to your environment configuration.";
      case "admin_required":
        return "Administrator privileges are required to access the Governance Command Center. Please sign in below.";
      case "suspended":
        return "This administrative account is currently suspended. Access denied.";
      case "invalid_client_secret":
        return "Google Cloud Configuration Error: The GOOGLE_CLIENT_SECRET in .env.local was rejected by Google for this Client ID. Please re-check the Client Secret in your Google Cloud Console Credentials tab.";
      case "invalid_oauth_state":
      case "token_exchange_failed":
        return "Google sign-in could not be completed securely. Please try again.";
      default:
        return "Authentication error. Please retry or contact platform operations.";
    }
  };

  const activeError = getErrorMessage();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Access denied.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-evergreen-dark text-ivory flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-red-900/40 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <span className="text-[10px] tracking-[0.3em] font-mono text-sand/80 uppercase font-bold block pt-2">
            Governance & Security Center
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ivory tracking-wider">
            Super Administrator Access
          </h1>
          <p className="text-xs text-ivory/70 max-w-sm mx-auto leading-relaxed">
            Restricted entry for Jonik Ndovu Farm project directors and governance personnel.
          </p>
        </div>

        {/* Multi-Admin Note */}
        <div className="mt-5 p-3 bg-forest/40 border border-sand/20 text-[11px] text-ivory/80 flex items-start space-x-2.5">
          <Users className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-sand block">Multi-Admin Supported:</span>
            <span>Any authorized administrator Google / Gmail account can log in directly.</span>
          </div>
        </div>

        {/* Login Box */}
        <div className="mt-5 bg-evergreen border border-sand/30 p-8 shadow-elevated space-y-6">
          {activeError && (
            <div className="p-3.5 bg-red-900/50 border border-red-500/50 text-red-200 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{activeError}</span>
            </div>
          )}

          {/* Option 1: Primary - Sign in as Admin with Google */}
          <div>
            <a
              href="/api/auth/google?target=admin"
              className="w-full py-3.5 px-4 bg-white hover:bg-ivory text-forest font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-3 shadow-card border border-sand hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in as Admin with Google</span>
            </a>
            <span className="text-[10px] text-sand/60 text-center block mt-2 font-mono">
              Sufficient for any registered administrator Gmail or Google account
            </span>
          </div>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-sand/20"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono tracking-widest text-sand/60 uppercase">
              Or Master Password
            </span>
            <div className="flex-grow border-t border-sand/20"></div>
          </div>

          {/* Option 2: Fallback Credentials Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-sand/90 mb-1 font-semibold">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jonikndovufarm.com"
                className="w-full px-3.5 py-2.5 bg-evergreen-dark border border-sand/30 focus:border-sand focus:outline-none text-ivory text-sm font-mono placeholder:text-ivory/30"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-sand/90 font-semibold">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-sand/70 hover:text-sand flex items-center space-x-1"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-evergreen-dark border border-sand/30 focus:border-sand focus:outline-none text-ivory text-sm font-mono placeholder:text-ivory/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-earth hover:bg-earth/90 text-white text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 mt-4 shadow-elevated disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-sand" />
              <span>{loading ? "Authenticating Session..." : "Authorize with Password"}</span>
            </button>
          </form>

          {/* Return link */}
          <div className="pt-4 border-t border-sand/20 text-center">
            <Link
              href="/login"
              className="text-xs text-sand/80 hover:text-sand flex items-center justify-center space-x-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Switch to Investor Portal Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-evergreen-dark flex items-center justify-center text-sand font-mono text-xs">
          Loading Security Center...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
