"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Lock, Shield, ArrowRight, AlertCircle, Key, UserCheck, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (targetEmail: string) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 pb-20 bg-ivory flex items-center justify-center outline-none">
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
                Access your designated tier materials, financial model, and due diligence archives.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Direct Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              className="space-y-4"
            >
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

              <button
                type="submit"
                disabled={loading}
                className="luxury-btn-primary w-full !py-3.5 text-xs tracking-widest flex items-center justify-center space-x-2"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
                <ArrowRight className="w-4 h-4 text-sand" />
              </button>
            </form>

            {/* Quick Demo Switcher */}
            <div className="mt-8 pt-6 border-t border-sand/30">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-earth block mb-3 text-center">
                Review & Testing Quick Logins
              </span>
              <div className="space-y-2">
                {/* Admin Demo */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("admin@jonikndovufarm.com");
                    handleLogin("admin@jonikndovufarm.com");
                  }}
                  className="w-full text-left p-2.5 bg-sand/20 hover:bg-sand/40 border border-sand/40 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-forest" />
                    <div>
                      <span className="font-semibold text-forest block">Super Administrator</span>
                      <span className="text-[10px] text-charcoal/60">admin@jonikndovufarm.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-forest text-sand px-1.5 py-0.5">
                    Admin
                  </span>
                </button>

                {/* Approved Investor Demo */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("investor.approved@example.com");
                    handleLogin("investor.approved@example.com");
                  }}
                  className="w-full text-left p-2.5 bg-sand/20 hover:bg-sand/40 border border-sand/40 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-earth" />
                    <div>
                      <span className="font-semibold text-forest block">Approved Investor</span>
                      <span className="text-[10px] text-charcoal/60">investor.approved@example.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-earth text-white px-1.5 py-0.5">
                    Tier 3
                  </span>
                </button>

                {/* Registered Investor Demo */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail("investor.registered@example.com");
                    handleLogin("investor.registered@example.com");
                  }}
                  className="w-full text-left p-2.5 bg-sand/20 hover:bg-sand/40 border border-sand/40 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-charcoal/70" />
                    <div>
                      <span className="font-semibold text-forest block">Registered Investor</span>
                      <span className="text-[10px] text-charcoal/60">investor.registered@example.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-sand text-charcoal px-1.5 py-0.5">
                    Tier 2
                  </span>
                </button>
              </div>
            </div>

            {/* Registration Link */}
            <div className="mt-6 pt-4 text-center text-xs text-charcoal/70">
              Need access?{" "}
              <Link href="/investor-access" className="font-semibold text-forest underline hover:text-earth">
                Request an Investor Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
