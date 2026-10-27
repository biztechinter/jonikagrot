"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Building2,
  Globe2,
  Briefcase,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";
import type { User, InvestorCategory, InvestmentInterest } from "@/types";

interface Props {
  user: User;
}

export default function InvestorOnboardingModal({ user }: Props) {
  // If user is admin, they don't need investor onboarding
  if (user.role === "admin") return null;

  // Determine if onboarding is required
  const isProfileIncomplete =
    !user.profileCompleted ||
    !user.termsAcceptedAt ||
    !user.organization ||
    user.organization === "—" ||
    !user.country ||
    user.country === "—";

  const [isOpen, setIsOpen] = useState(isProfileIncomplete);
  const [organization, setOrganization] = useState(
    user.organization && user.organization !== "—" ? user.organization : ""
  );
  const [country, setCountry] = useState(
    user.country && user.country !== "—" ? user.country : ""
  );
  const [category, setCategory] = useState<InvestorCategory>(
    user.category || "Private Investor"
  );
  const [interest, setInterest] = useState<InvestmentInterest>(
    user.interest || "Equity"
  );
  const [indicativeRange, setIndicativeRange] = useState(
    user.indicativeRange || "US$250,000 – US$500,000"
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must acknowledge and accept the Confidentiality Terms & Privacy Policy to proceed.");
      return;
    }
    if (!organization.trim()) {
      setError("Please specify your firm, organization, or family office name.");
      return;
    }
    if (!country.trim()) {
      setError("Please specify your country of domicile.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization: organization.trim(),
          country: country.trim(),
          category,
          interest,
          indicativeRange,
          termsAccepted: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile.");

      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 1200);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-xl w-full my-8 border border-sand/60 shadow-2xl overflow-hidden animate-fade-in">
        {/* Header Banner */}
        <div className="bg-evergreen text-ivory p-6 sm:p-7 border-b border-sand/20">
          <div className="flex items-center space-x-2 text-earth font-mono text-[11px] uppercase tracking-widest font-bold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Accreditation Onboarding Gate</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-ivory">
            Complete Your Investor Profile
          </h2>
          <p className="text-xs text-sand/80 mt-1.5 leading-relaxed">
            Welcome to the Jonik Ndovu Farm Private Data Room. Please confirm your professional investment details and accept the portal confidentiality terms to activate your access.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-forest mx-auto animate-bounce" />
              <h3 className="font-serif text-xl font-bold text-forest">
                Profile Activated Successfully
              </h3>
              <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                Your accreditation profile and terms agreement have been recorded. Entering the investor portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Verified Identity Read-Only Pill */}
              <div className="p-3 bg-sand/20 border border-sand/40 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-charcoal/60 block font-semibold">
                    Authenticated Identity (Google / Email)
                  </span>
                  <span className="font-semibold text-forest text-sm">{user.name}</span>
                  <span className="font-mono text-xs text-charcoal/70 block">{user.email}</span>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                  ✓ Verified
                </span>
              </div>

              {/* Organization & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Organization / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Serengeti Capital / Vance Family Office"
                    className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Country of Domicile *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Kenya, United Kingdom, Switzerland"
                    className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs"
                  />
                </div>
              </div>

              {/* Category & Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Investor Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as InvestorCategory)}
                    className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs"
                  >
                    <option value="Private Investor">Private Investor / Angel</option>
                    <option value="Family Office or Investment Company">Family Office / Investment Company</option>
                    <option value="Hospitality or Strategic Investor">Hospitality / Strategic Operator</option>
                    <option value="Institutional Investor">Institutional / Development Finance</option>
                    <option value="Professional Adviser">Professional Adviser / Legal</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Investment Interest *
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value as InvestmentInterest)}
                    className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs"
                  >
                    <option value="Equity">Equity Participation</option>
                    <option value="Debt or Structured Financing">Debt / Structured Financing</option>
                    <option value="Joint Venture or Strategic Partnership">Joint Venture / Co-Development</option>
                    <option value="Exploring Options">General Syndication Review</option>
                  </select>
                </div>
              </div>

              {/* Indicative Range */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Indicative Capital Ticket Range (Optional)
                </label>
                <select
                  value={indicativeRange}
                  onChange={(e) => setIndicativeRange(e.target.value)}
                  className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs font-mono"
                >
                  <option value="US$250,000 – US$500,000">US$250,000 – US$500,000 (Syndicate Participant)</option>
                  <option value="US$500,000 – US$1,000,000">US$500,000 – US$1,000,000 (Major Syndicate Partner)</option>
                  <option value="US$1,000,000 – US$2,400,000 (Lead Partner)">US$1,000,000 – US$2,400,000 (Lead Equity Partner)</option>
                  <option value="Prefer not to state at this stage">Prefer not to state at this stage</option>
                </select>
              </div>

              {/* Legal Terms & Privacy Box */}
              <div className="p-3 bg-sand/15 border border-sand/40 text-[11px] text-charcoal/80 space-y-1.5 leading-relaxed font-mono">
                <span className="font-bold text-forest uppercase text-[10px] tracking-wider block">
                  Terms of Portal Access & Confidentiality Notice:
                </span>
                <p>
                  By accessing this portal, you agree that all executive briefs, architectural masterplans, and development summaries are proprietary materials of Jonik Ndovu Farm Management. Unredacted financial models and formal investment contracts remain locked in Tier 3 until formal bilateral NDA execution.
                </p>
              </div>

              {/* Mandatory Checkbox */}
              <div className="pt-2 flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="onboarding-terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-forest border-sand/80 rounded focus:ring-forest cursor-pointer"
                />
                <label htmlFor="onboarding-terms" className="text-[11px] text-charcoal cursor-pointer leading-normal">
                  <strong>I confirm that all information provided is accurate</strong>, and I formally agree to the{" "}
                  <a href="/privacy" target="_blank" className="underline text-earth font-bold hover:text-forest">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <span className="font-bold text-forest">
                    Confidentiality Terms of Portal Access
                  </span>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-sand/30">
                <button
                  type="submit"
                  disabled={loading || !termsAccepted}
                  className="luxury-btn-primary w-full !py-3 text-xs tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{loading ? "Activating Profile..." : "Activate Investor Portal Access"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sand" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
