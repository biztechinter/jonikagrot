"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import {
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { InvestorCategory, InvestmentInterest } from "@/types";

export default function InvestorAccessPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    organization: "",
    country: "",
    category: "Private Investor" as InvestorCategory,
    interest: "Equity" as InvestmentInterest,
    indicativeRange: "",
    websiteOrLinkedin: "",
    message: "",
    privacyAccepted: false,
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 8) {
      setError("Please create a password of at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    if (!formData.privacyAccepted) {
      setError("Please acknowledge the confidentiality and privacy notice to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/investor-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 bg-ivory outline-none">
        {/* Header Hero */}
        <section className="bg-evergreen text-ivory py-16 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              Accredited Access
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              Tiered Investor Access
            </h1>
            <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto leading-relaxed font-light">
              To safeguard commercial sensitivity and comply with hospitality investment standards, access to detailed financial models and land documentation is structured in verified tiers.
            </p>
          </div>
        </section>

        {/* 3-Tier Explanation Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier 1 */}
            <div className="p-6 bg-white border border-sand/40 relative flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-charcoal/60 font-semibold block">
                  Level 1
                </span>
                <h3 className="font-serif text-xl font-bold text-forest mt-1 mb-2">
                  Public Overview
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                  Open to all visitors. High-level vision, location context, factual metrics, and general investment thesis.
                </p>
              </div>
              <div className="pt-3 border-t border-sand/20 text-xs text-charcoal/60 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>No registration required</span>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-6 bg-white border-2 border-sand relative flex flex-col justify-between shadow-subtle">
              <div className="absolute -top-3 right-4 bg-sand text-evergreen text-[10px] tracking-wider uppercase font-bold px-2 py-0.5">
                Instant Access
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-earth font-semibold block">
                  Level 2
                </span>
                <h3 className="font-serif text-xl font-bold text-forest mt-1 mb-2">
                  Registered Investor
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                  Verified email account. Access to the Investor Brief (5-min overview), visual boards, executive FAQ, and personal portal profile.
                </p>
              </div>
              <div className="pt-3 border-t border-sand/20 text-xs text-earth font-medium flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-earth" />
                <span>Available upon form registration</span>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="p-6 bg-forest text-ivory border border-forest-light relative flex flex-col justify-between shadow-elevated">
              <div className="absolute -top-3 right-4 bg-earth text-white text-[10px] tracking-wider uppercase font-bold px-2 py-0.5">
                Restricted Diligence
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-sand font-semibold block">
                  Level 3
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory mt-1 mb-2">
                  Approved Institutional / Lead
                </h3>
                <p className="text-xs text-ivory/80 leading-relaxed mb-4">
                  Explicit approval by project administrators. Complete 10-year Excel model, Sources & Uses, title diligence, and term-sheet framework.
                </p>
              </div>
              <div className="pt-3 border-t border-sand/20 text-xs text-sand flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-earth" />
                <span>Requires admin credential authorization</span>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form / Success State */}
        <section className="py-12 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card p-8 sm:p-12 border-sand/60">
            {submitted ? (
              <div className="text-center py-8 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-forest/10 text-forest mx-auto flex items-center justify-center rounded-full">
                  <CheckCircle2 className="w-10 h-10 text-earth" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                  Registration Received for Review
                </h3>
                <div className="text-sm text-charcoal/80 max-w-lg mx-auto leading-relaxed space-y-3 font-light">
                  <p>
                    Thank you, <strong>{formData.fullName}</strong>. Your investor registration profile has been recorded in our data room registry under <strong>{formData.businessEmail}</strong>.
                  </p>
                  <div className="p-4 bg-sand/20 border border-sand/50 text-xs text-left text-charcoal/80 space-y-2">
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-earth flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-forest">Next Steps:</span>
                        <p className="mt-0.5">
                          In accordance with our governance protocol, submissions undergo identity and accreditation review. You may log in immediately using the credentials provided to access <strong>Tier 2 Overview Materials</strong>, and our administrator will review your profile for <strong>Tier 3 Data Room clearance</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href={`/verify-email?email=${encodeURIComponent(formData.businessEmail)}&code=123456`}
                    className="luxury-btn-gold text-xs !py-3 !px-7 tracking-widest inline-flex items-center space-x-2"
                  >
                    <span>Verify Business Email</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>
                  <Link
                    href="/portal"
                    className="luxury-btn-primary text-xs !py-3 !px-7 tracking-widest inline-flex items-center space-x-2"
                  >
                    <span>Enter Portal</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8 pb-6 border-b border-sand/30">
                  <span className="text-xs uppercase tracking-widest text-earth font-bold block mb-1">
                    Accreditation Request Form
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                    Request Investor Access
                  </h2>
                  <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
                    Please provide your professional contact information. Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                {/* Fast Option: Continue with Google / Gmail */}
                <div className="mb-6 space-y-3">
                  <a
                    href="/api/auth/google"
                    className="w-full py-3 px-4 bg-white hover:bg-sand/20 border border-sand/80 text-forest text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-3 shadow-subtle"
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
                    <span>Instant Registration with Google / Gmail</span>
                  </a>

                  <div className="relative flex items-center justify-center py-1">
                    <div className="border-t border-sand/40 w-full" />
                    <span className="bg-white px-3 text-[10px] uppercase font-mono tracking-widest text-charcoal/50 absolute">
                      or complete manual application
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                  {/* Row 1: Name & Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        placeholder="e.g. john@investmentgroup.com"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 1.5: Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Create Password * (min 8 characters)
                      </label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        required
                        minLength={8}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Row 2: Organization & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Organization / Firm
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Serengeti Capital"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Country of Domicile *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Kenya, United Kingdom, Switzerland"
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 3: Category & Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Investor Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value as InvestorCategory })
                        }
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                      >
                        <option value="Private Investor">Private Investor</option>
                        <option value="Family Office or Investment Company">
                          Family Office or Investment Company
                        </option>
                        <option value="Hospitality or Strategic Investor">
                          Hospitality or Strategic Investor
                        </option>
                        <option value="Institutional Investor">Institutional Investor</option>
                        <option value="Professional Adviser">Professional Adviser</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Investment Interest *
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) =>
                          setFormData({ ...formData, interest: e.target.value as InvestmentInterest })
                        }
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                      >
                        <option value="Equity">Equity Participation</option>
                        <option value="Debt or Structured Financing">
                          Debt or Structured Financing
                        </option>
                        <option value="Joint Venture or Strategic Partnership">
                          Joint Venture / Strategic Partnership
                        </option>
                        <option value="Exploring Options">Exploring Options</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Optional Indicative Range */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Optional Indicative Ticket Size (USD)
                    </label>
                    <select
                      value={formData.indicativeRange}
                      onChange={(e) => setFormData({ ...formData, indicativeRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                    >
                      <option value="">Prefer not to state at this stage</option>
                      <option value="US$100,000 – US$250,000">US$100,000 – US$250,000</option>
                      <option value="US$250,000 – US$500,000">US$250,000 – US$500,000</option>
                      <option value="US$500,000 – US$1,000,000">US$500,000 – US$1,000,000</option>
                      <option value="US$1,000,000 – US$2,400,000 (Lead Partner)">
                        US$1,000,000 – US$2,400,000 (Lead Partner)
                      </option>
                    </select>
                    <span className="text-[11px] text-charcoal/50 mt-1 block">
                      Indicative only. No capital commitment is required or inferred.
                    </span>
                  </div>

                  {/* Corporate Website or LinkedIn Profile */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Corporate Website or Professional LinkedIn Profile (Recommended)
                    </label>
                    <input
                      type="url"
                      value={formData.websiteOrLinkedin}
                      onChange={(e) => setFormData({ ...formData, websiteOrLinkedin: e.target.value })}
                      placeholder="https://www.linkedin.com/in/... or https://yourfirm.com"
                      className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm font-mono"
                    />
                    <span className="text-[11px] text-charcoal/50 mt-1 block">
                      Assists project directors in expediting verification for Tier 3 data room clearance.
                    </span>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Brief Message or Specific Area of Interest
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline any specific diligence queries or strategic considerations..."
                      className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal transition-colors text-sm"
                    />
                  </div>

                  {/* Privacy / NDA Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.privacyAccepted}
                        onChange={(e) =>
                          setFormData({ ...formData, privacyAccepted: e.target.checked })
                        }
                        className="mt-1 h-4 w-4 rounded-none text-forest border-sand focus:ring-forest cursor-pointer"
                      />
                      <span className="text-xs text-charcoal/70 leading-relaxed">
                        I confirm that all information provided is accurate, and I agree to the{" "}
                        <Link href="/privacy" className="underline text-forest font-medium hover:text-earth">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms" className="underline text-forest font-medium hover:text-earth">
                          Confidentiality Terms of Portal Access
                        </Link>
                        . I understand that access to Tier 3 diligence documents is subject to administrator approval. *
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="luxury-btn-primary w-full !py-4 text-xs tracking-widest flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 text-sand" />
                          <span>Submit Request for Investor Access</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Existing Account Note */}
                <div className="mt-8 pt-6 border-t border-sand/30 text-center text-xs text-charcoal/60">
                  Already have an approved account or demo credentials?{" "}
                  <Link href="/login" className="font-semibold text-forest underline hover:text-earth">
                    Sign in here
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
