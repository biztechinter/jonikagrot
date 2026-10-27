"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Lock,
  Shield,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams?.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError === "google_cancelled"
      ? "Google sign-in was cancelled."
      : urlError === "google_not_configured"
      ? "Google OAuth is currently in configuration. Please use email and password."
      : urlError === "suspended"
      ? "This account has been suspended by an administrator."
      : urlError === "invalid_client_secret"
      ? "Google Cloud Configuration Error: The Client Secret in .env.local does not match the Client ID."
      : null
  );
  const [adminNotice, setAdminNotice] = useState<boolean>(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAdminNotice(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.isAdmin) {
          setAdminNotice(true);
          throw new Error(data.error || "Administrative accounts must sign in via the Admin Command Center.");
        }
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/portal");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-8">
      <div className="luxury-card p-8 sm:p-10 border-sand/60">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-forest/10 text-forest mx-auto flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-earth" />
          </div>
          <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
            Restricted Access
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-1">
            Investor Portal Sign In
          </h1>
          <p className="text-xs text-charcoal/70 mt-2">
            Access your designated tier briefs, 10-year pro-forma model, and confidential due diligence archives.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Admin Notice */}
        {adminNotice && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Administrator Account Detected</span>
            </div>
            <p>
              To protect governance privileges and audit integrity, administrator logins require multi-factor passkey verification.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-800 text-white text-[11px] font-mono uppercase font-bold tracking-wider hover:bg-amber-900 transition-colors"
            >
              <span>Go to Admin Command Center Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Option 1: Continue with Google / Gmail */}
        <div className="space-y-4">
          <a
            href="/api/auth/google"
            className="w-full py-3 px-4 bg-white hover:bg-sand/20 border border-sand/80 text-forest text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-3 shadow-subtle"
          >
            {/* Official Google G Logo SVG */}
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
            <span>Continue with Google / Gmail</span>
          </a>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-sand/40 w-full" />
            <span className="bg-white px-3 text-[10px] uppercase font-mono tracking-widest text-charcoal/50 absolute">
              or sign in with password
            </span>
          </div>

          {/* Option 2: Email & Password Form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                Registered Business Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-earth hover:text-forest flex items-center space-x-1"
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
                className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-sm font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="luxury-btn-primary w-full !py-3.5 text-xs tracking-widest flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Authenticating..." : "Sign In with Password"}</span>
              <ArrowRight className="w-4 h-4 text-sand" />
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="mt-8 pt-6 border-t border-sand/30 space-y-3 text-center text-xs">
          <p className="text-charcoal/70">
            New investor?{" "}
            <Link href="/investor-access" className="font-semibold text-forest underline hover:text-earth">
              Request an Investor Account
            </Link>
          </p>

          <div className="pt-2">
            <Link
              href="/admin/login"
              className="text-[11px] font-mono text-earth hover:text-forest inline-flex items-center space-x-1"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Authorized Administrator Command Center →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 pb-20 bg-ivory flex items-center justify-center outline-none">
        <Suspense fallback={<div className="max-w-md w-full mx-auto p-12 text-center text-xs text-charcoal/60">Loading portal sign in...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
