"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const codeParam = searchParams.get("code") || "";

  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState(codeParam || "123456");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (emailParam) setEmail(emailParam);
    if (codeParam) setCode(codeParam);
  }, [emailParam, codeParam]);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

      setVerified(true);
    } catch (err: any) {
      setError(err.message || "Failed to verify email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="luxury-card p-8 sm:p-10 border-sand/60 text-center">
      {verified ? (
        <div className="space-y-5 animate-fade-in">
          <div className="w-16 h-16 bg-forest/10 text-forest mx-auto flex items-center justify-center rounded-full">
            <CheckCircle2 className="w-10 h-10 text-earth" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-forest">
            Email Address Verified
          </h2>
          <p className="text-xs text-charcoal/75 leading-relaxed font-light">
            Your identity has been authenticated. Tier 2 registered credentials are now active, and your application is placed in the administrator review queue for Tier 3 data room access.
          </p>
          <div className="pt-3">
            <Link
              href="/portal"
              className="luxury-btn-primary w-full text-xs !py-3.5 tracking-widest inline-flex items-center justify-center space-x-2"
            >
              <span>Enter Investor Portal</span>
              <ArrowRight className="w-4 h-4 text-sand" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="w-12 h-12 bg-forest/10 text-forest mx-auto flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-earth" />
            </div>
            <span className="text-[10px] tracking-[0.25em] text-earth uppercase font-semibold block">
              Security Step
            </span>
            <h1 className="font-serif text-2xl font-bold text-forest mt-1">
              Verify Your Business Email
            </h1>
            <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
              Please confirm your email address to activate Tier 2 access and submit your profile for administrator due diligence review.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2 text-left">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Business Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs sm:text-sm text-charcoal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3.5 py-2.5 font-mono text-center tracking-widest text-lg font-bold bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-forest"
              />
              <div className="p-2.5 bg-sand/20 border border-sand/30 mt-2 text-[11px] text-charcoal/70">
                <strong>Demo Environment Notice:</strong> A simulated code <code>123456</code> has been pre-filled for instant verification.
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="luxury-btn-primary w-full !py-3.5 text-xs tracking-widest flex items-center justify-center space-x-2 mt-4"
            >
              <ShieldCheck className="w-4 h-4 text-sand" />
              <span>{loading ? "Verifying..." : "Confirm & Activate Account"}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-24 pb-20 bg-ivory flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="luxury-card p-12 text-center text-xs text-charcoal/60">
                Loading verification form...
              </div>
            }
          >
            <VerifyEmailForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
