"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import type { User } from "@/types";

interface Props {
  user: User;
  modalOnly?: boolean;
}

export default function TierUpgradeModal({ user, modalOnly = false }: Props) {
  const isTier3 = user.role === "approved" || user.role === "admin";
  const isDeclined = user.diligenceStatus === "declined";
  const isPending = !isTier3 && !isDeclined && Boolean(user.diligenceRequestedAt || user.diligenceStatus === "pending");
  const alreadyRequested = isPending;

  const [isOpen, setIsOpen] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [indicativeRange, setIndicativeRange] = useState(user.indicativeRange || "US$500,000 – US$1,000,000");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      if (!isTier3) setIsOpen(true);
    };
    window.addEventListener("open-tier-upgrade", handleOpen);

    // Also support #upgrade-tier or ?upgrade=tier3 in the URL
    if (
      typeof window !== "undefined" &&
      !isTier3 &&
      (window.location.hash === "#upgrade-tier" ||
        window.location.search.includes("upgrade=tier3"))
    ) {
      setIsOpen(true);
    }

    return () => window.removeEventListener("open-tier-upgrade", handleOpen);
  }, [isTier3]);

  if (isTier3) {
    if (modalOnly) return null;
    return (
      <div className="p-4 bg-forest/10 border-l-4 border-forest text-xs text-forest flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
          <span className="font-semibold">
            Tier 3 Full Due Diligence Access Granted: 10-Year Pro-Forma Model and all 15 Package Documents Unlocked.
          </span>
        </div>
        <span className="px-2.5 py-0.5 bg-forest text-sand text-[10px] font-mono font-bold uppercase">
          Accredited Investor
        </span>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaAccepted) {
      setError("You must acknowledge and accept the Non-Disclosure Agreement to apply.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/request-upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ndaAccepted: true,
          indicativeRange,
          message: notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");

      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  const renderModal = () => (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto border border-sand/60 shadow-elevated p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sand/30">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-earth font-bold block">
              Confidential Diligence Agreement
            </span>
            <h3 className="font-serif text-xl font-bold text-forest mt-0.5">
              Tier 3 Non-Disclosure & Accreditation
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-charcoal/50 hover:text-charcoal p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-forest mx-auto animate-bounce" />
            <h4 className="font-serif text-lg font-bold text-forest">Application & NDA Recorded</h4>
            <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
              Your application has been routed to the project directors. Once diligence suitability is confirmed, your account will instantly upgrade to Tier 3 Approved.
            </p>
          </div>
        ) : alreadyRequested ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-forest mx-auto" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-earth font-bold block">
              Accreditation Pending Review
            </span>
            <h4 className="font-serif text-lg font-bold text-forest">
              NDA Already Executed & Application Under Review
            </h4>
            <p className="text-xs text-charcoal/70 max-w-sm mx-auto leading-relaxed">
              You have already digitally executed the confidential Non-Disclosure Agreement {user.ndaAcceptedAt && `on ${new Date(user.ndaAcceptedAt).toLocaleDateString()}`}.
            </p>
            <p className="text-[11px] text-charcoal/60 max-w-sm mx-auto">
              You do <strong>not</strong> need to sign the NDA again. Once the administrator verifies your accreditation suitability, all Tier 3 financial spreadsheets and package documents will unlock automatically.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="luxury-btn-primary text-xs !py-2.5 !px-6"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Legal Summary Box */}
            <div className="p-4 bg-sand/15 border border-sand/40 max-h-40 overflow-y-auto space-y-2 text-[11px] text-charcoal/80 leading-relaxed font-mono">
              <p className="font-bold text-forest">CONFIDENTIALITY & NON-DISCLOSURE UNDERTAKING:</p>
              <p>
                1. The recipient acknowledges that the documents in Tier 3 (including the 10-Year Pro-Forma Financial Model in Microsoft Excel format, capital budgets, title diligence, and development specifications) contain proprietary commercial trade secrets of Jonik Ndovu Farm Management.
              </p>
              <p>
                2. All materials are furnished solely for evaluating a potential lead equity, syndicate, or strategic hospitality co-investment.
              </p>
              <p>
                3. The recipient agrees not to disclose, duplicate, reverse-engineer, or distribute any financial calculations, room revenue yields, or land contracts to third parties without prior written consent.
              </p>
            </div>

            {/* Signatory Profile Summary (Already Captured at Registration) */}
            <div className="p-3 bg-sand/15 border border-sand/40 grid grid-cols-2 gap-2.5 text-[11px]">
              <div>
                <span className="text-[10px] uppercase font-mono text-charcoal/50 block">Signatory</span>
                <span className="font-semibold text-forest block truncate">{user.name}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-charcoal/50 block">Organization</span>
                <span className="font-semibold text-forest block truncate">{user.organization || "Private Investor"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-charcoal/50 block">Account Email</span>
                <span className="font-mono text-charcoal/80 block truncate">{user.email}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-charcoal/50 block">Registered Ticket Size</span>
                <span className="font-mono font-semibold text-forest block truncate">
                  {user.indicativeRange || "US$250,000 – US$500,000"}
                </span>
              </div>
            </div>

            {/* Diligence Focus Notes */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-forest uppercase tracking-wider">
                Primary Diligence Focus / Advisory Representatives (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Legal structuring, biodiversity covenants, pro-forma yield review"
                className="w-full p-2.5 bg-ivory/50 border border-sand/80 focus:border-forest text-xs"
              />
            </div>

            {/* Checkbox */}
            <div className="pt-2 flex items-start space-x-2.5">
              <input
                type="checkbox"
                id="nda-checkbox"
                checked={ndaAccepted}
                onChange={(e) => setNdaAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-forest border-sand/80 rounded focus:ring-forest cursor-pointer"
              />
              <label htmlFor="nda-checkbox" className="text-[11px] text-charcoal/90 cursor-pointer leading-normal">
                <strong>I confirm accredited investor eligibility</strong> and formally execute the confidential Non-Disclosure Agreement for Jonik Ndovu Farm project assets.
              </label>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-sand/30">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-sand/60 text-charcoal/70 hover:text-charcoal text-xs tracking-wider uppercase"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !ndaAccepted}
                className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-wider flex items-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? "Recording NDA..." : "Sign NDA & Submit Application"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sand" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  if (modalOnly) {
    return isOpen ? renderModal() : null;
  }

  return (
    <>
      {/* Banner */}
      <div className="bg-sand/30 border border-sand/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-earth" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-earth font-bold">
              Tier 3 Diligence Elevation
            </span>
          </div>
          <h4 className="font-serif text-base font-bold text-forest">
            Unlock the 10-Year Financial Model & Full Diligence Room
          </h4>
          <p className="text-xs text-charcoal/75 max-w-xl">
            You currently have Tier 2 overview access. {isDeclined
              ? "Your previous Tier 3 diligence request was reviewed by the investment committee and not approved at this time. You retain full Tier 2 Registered access to all overview documents and financial summaries. If your investment mandate or capital range updates, you may submit an updated application below."
              : "Execute the confidential NDA and submit your accreditation profile to unlock the unredacted pro-forma XLSX model, Sources & Uses budget, and master architectural briefs."}
          </p>
        </div>

        <div>
          {isPending ? (
            <div className="flex items-center space-x-2 px-3.5 py-2 bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-mono font-semibold">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>Diligence Application Under Review</span>
            </div>
          ) : isDeclined ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-800 text-xs font-mono font-semibold text-center">
                Upgrade Declined (Tier 2 Active)
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="luxury-btn-primary text-xs !py-2 !px-3.5 tracking-wider flex items-center justify-center space-x-1"
              >
                <span>Re-Apply for Tier 3</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="luxury-btn-primary text-xs !py-3 !px-5 tracking-wider flex items-center space-x-2 flex-shrink-0"
            >
              <FileCheck2 className="w-4 h-4 text-sand" />
              <span>Execute NDA & Unlock Tier 3</span>
            </button>
          )}
        </div>
      </div>

      {isOpen && renderModal()}
    </>
  );
}
