import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { PROJECT_FACTS, INITIAL_DOCUMENTS } from "@/data/projectData";
import CampaignTimetableCard from "@/components/campaign/CampaignTimetableCard";
import TierUpgradeModal from "@/components/portal/TierUpgradeModal";
import TierUpgradeTrigger from "@/components/portal/TierUpgradeTrigger";
import {
  Shield,
  Lock,
  ArrowRight,
  Download,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default async function PortalDashboard() {
  const user = await getCurrentUser();
  if (!user) return null;

  const isApproved = user.role === "approved" || user.role === "admin";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome & Tier Banner */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
            Data Room Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            You are logged into the confidential investor portal for Jonik Ndovu Farm. All documents downloaded from this environment are subject to non-disclosure obligations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-charcoal/60">Current Access Tier:</span>
            {isApproved ? (
              <span className="px-3 py-1 bg-forest text-sand text-xs font-mono uppercase font-bold tracking-wider">
                Tier 3 Approved Investor
              </span>
            ) : (
              <span className="px-3 py-1 bg-sand text-evergreen text-xs font-mono uppercase font-bold tracking-wider">
                Tier 2 Registered User
              </span>
            )}
          </div>
          <span className="text-[11px] text-charcoal/50">
            Account Status: <strong className="text-forest capitalize">{user.status}</strong>
          </span>
        </div>
      </div>

      {/* Structured Diligence & Allocation Window */}
      <CampaignTimetableCard variant="portal" />

      {/* Email Verification Banner */}
      {user.emailVerified === false && (
        <div className="p-4 bg-amber-50 border-l-4 border-amber-600 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-semibold text-amber-900 block">
              Identity Notice: Email Verification Pending
            </span>
            <p className="text-amber-800">
              Please verify your business email address ({user.email}) to complete your accredited investor registration.
            </p>
          </div>
          <Link
            href={`/verify-email?email=${encodeURIComponent(user.email)}`}
            className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-[11px] uppercase tracking-wider flex-shrink-0 text-center"
          >
            Verify Email Now
          </Link>
        </div>
      )}

      {/* Tier 3 Diligence Elevation & NDA Status */}
      <TierUpgradeModal user={user} />

      {/* Factual Metrics Bar */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-earth mb-3">
          Verified Development Parameters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 border border-sand/40">
            <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block">Capital Target</span>
            <span className="font-serif text-2xl font-bold text-forest block mt-1">
              {PROJECT_FACTS.capitalRequirement.formatted}
            </span>
            <span className="text-[11px] text-charcoal/60 mt-0.5 block">Total fundraising round</span>
          </div>

          <div className="bg-white p-5 border border-sand/40">
            <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block">Current Land</span>
            <span className="font-serif text-2xl font-bold text-forest block mt-1">8 Hectares</span>
            <span className="text-[11px] text-charcoal/60 mt-0.5 block">Owned unencumbered core</span>
          </div>

          <div className="bg-white p-5 border border-sand/40">
            <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block">Proposed Expansion</span>
            <span className="font-serif text-2xl font-bold text-forest block mt-1">~7 Hectares</span>
            <span className="text-[11px] text-charcoal/60 mt-0.5 block">Subject to transaction close</span>
          </div>

          <div className="bg-white p-5 border border-sand/40">
            <span className="text-[10px] uppercase tracking-wider text-charcoal/60 block">Scale</span>
            <span className="font-serif text-2xl font-bold text-forest block mt-1">12–15 Units</span>
            <span className="text-[11px] text-charcoal/60 mt-0.5 block">Developer-surveyed brief</span>
          </div>
        </div>
      </div>

      {/* Key Diligence Documents Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-earth">
              Priority Documents
            </h2>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Instant download of authorized documents for your security tier.
            </p>
          </div>
          <Link
            href="/portal/documents"
            className="text-xs font-semibold text-forest hover:text-earth flex items-center space-x-1"
          >
            <span>View All 17 Documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Doc 1: Investor Teaser (Tier 2 Available) */}
          <div className="luxury-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-sand text-evergreen font-bold">
                  PDF · 5.3 KB
                </span>
                <span className="text-[10px] uppercase tracking-wider text-earth font-semibold">
                  Tier 2
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-1.5">
                One-Page Investor Teaser
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                High-level visual executive summary of the hospitality-led agro-tourism opportunity and landholding.
              </p>
            </div>
            <a
              href="/api/portal/documents/doc-01/download"
              className="luxury-btn-primary !py-2.5 !px-4 text-xs tracking-wider flex items-center justify-center space-x-2"
            >
              <Download className="w-3.5 h-3.5 text-sand" />
              <span>Download Teaser (PDF)</span>
            </a>
          </div>

          {/* Doc 2: Investor Brief (Tier 2 Available) */}
          <div className="luxury-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-sand text-evergreen font-bold">
                  DOCX · 41.7 KB
                </span>
                <span className="text-[10px] uppercase tracking-wider text-earth font-semibold">
                  Tier 2
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-1.5">
                Investor Brief (5-Min Overview)
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                Comprehensive 5-minute briefing detailing proposition, commercial positioning, and diligence expectations.
              </p>
            </div>
            <a
              href="/api/portal/documents/doc-02/download"
              className="luxury-btn-primary !py-2.5 !px-4 text-xs tracking-wider flex items-center justify-center space-x-2"
            >
              <Download className="w-3.5 h-3.5 text-sand" />
              <span>Download Brief (DOCX)</span>
            </a>
          </div>

          {/* Doc 3: 10-Year Financial Model (Tier 3 Protected) */}
          <div className="luxury-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-sand text-evergreen font-bold">
                  XLSX · 13.7 KB
                </span>
                <span className="text-[10px] uppercase tracking-wider text-red-700 font-semibold">
                  Tier 3 Only
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-forest mb-1.5">
                10-Year Financial Model
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                Integrated pro-forma model covering 12–15 units, room revenue build, food & beverage, and capex phasing.
              </p>
            </div>

            {isApproved ? (
              <a
                href="/api/portal/documents/doc-07/download"
                className="luxury-btn-gold !py-2.5 !px-4 text-xs tracking-wider flex items-center justify-center space-x-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Model (XLSX)</span>
              </a>
            ) : (
              <div className="p-2.5 bg-sand/20 border border-sand/40 text-[11px] text-charcoal/70 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-red-700 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Restricted to Tier 3</span>
                </div>
                {user.ndaAccepted ? (
                  <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 border border-amber-300">
                    Review Pending (NDA Signed)
                  </span>
                ) : (
                  <TierUpgradeTrigger className="text-earth font-bold hover:underline cursor-pointer">
                    Request Access (Sign NDA)
                  </TierUpgradeTrigger>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sections Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <Link
          href="/portal/opportunity"
          className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-all shadow-subtle group"
        >
          <span className="text-xs font-semibold text-earth uppercase tracking-wider block mb-1">
            Section 01
          </span>
          <h3 className="font-serif text-xl font-bold text-forest group-hover:text-earth transition-colors">
            Master Investment Case
          </h3>
          <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
            Read the detailed thesis, commercial model, target demographic, and market context.
          </p>
        </Link>

        <Link
          href="/portal/financials"
          className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-all shadow-subtle group"
        >
          <span className="text-xs font-semibold text-earth uppercase tracking-wider block mb-1">
            Section 02
          </span>
          <h3 className="font-serif text-xl font-bold text-forest group-hover:text-earth transition-colors">
            Financial Analysis & Capex
          </h3>
          <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
            Examine Sources & Uses worksheets, capital expenditure benchmarks, and return assumptions.
          </p>
        </Link>

        <Link
          href="/portal/due-diligence"
          className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-all shadow-subtle group"
        >
          <span className="text-xs font-semibold text-earth uppercase tracking-wider block mb-1">
            Section 03
          </span>
          <h3 className="font-serif text-xl font-bold text-forest group-hover:text-earth transition-colors">
            Due Diligence Index
          </h3>
          <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
            Review status checklists for legal title, NEMA approvals, hydrological surveys, and risk register.
          </p>
        </Link>
      </div>
    </div>
  );
}
