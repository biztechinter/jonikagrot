"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react";
import type { CampaignWindowConfig } from "@/types";

interface Props {
  initialConfig?: CampaignWindowConfig;
  variant?: "public" | "portal";
}

export default function CampaignTimetableCard({ initialConfig, variant = "public" }: Props) {
  const [config, setConfig] = useState<CampaignWindowConfig | null>(initialConfig || null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/campaign")
      .then((res) => res.json())
      .then((data) => {
        if (data.config) {
          setConfig(data.config);
          setDaysRemaining(data.metrics.daysRemaining);
        }
      })
      .catch((err) => console.error("Error fetching campaign data:", err));
  }, []);

  if (!config || !config.enabled) {
    return null;
  }

  const days =
    daysRemaining !== null
      ? daysRemaining
      : Math.max(
          0,
          Math.ceil((new Date(config.closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        );

  const formattedDate = new Date(config.closingDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isClosed = config.status === "closed" || days <= 0;
  const isUnderReview = config.status === "under_review" || (days <= 0 && config.status === "active");

  return (
    <div className="bg-forest text-ivory border border-sand/40 p-6 sm:p-8 shadow-elevated relative overflow-hidden">
      {/* Background Accent watermark */}
      <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none">
        <TrendingUp className="w-80 h-80 text-sand" />
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sand/20">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-earth" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-sand font-bold">
              Institutional Diligence & Allocation Schedule
            </span>
          </div>

          <div>
            {isClosed ? (
              <span className="px-3 py-1 bg-red-900/80 text-sand text-xs font-mono uppercase font-bold tracking-wider">
                Allocation Round Concluded
              </span>
            ) : isUnderReview ? (
              <span className="px-3 py-1 bg-amber-800 text-sand text-xs font-mono uppercase font-bold tracking-wider">
                Allocations Under Final Review
              </span>
            ) : (
              <span className="px-3 py-1 bg-sand text-forest text-xs font-mono uppercase font-bold tracking-wider">
                Active Diligence Round · Book Open
              </span>
            )}
          </div>
        </div>

        {/* Title and context */}
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
            {config.roundName}
          </h3>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-2xl leading-relaxed font-light">
            {config.institutionalNote ||
              "To maintain project momentum and prepare for site ground-breaking, the sponsors have instituted a structured capital allocation timetable rather than an open-ended offering. Indicative syndicate commitments and partner due diligence are evaluated on a rolling basis until the window closes."}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Metric 1 */}
          <div className="p-4 bg-forest-dark/60 border border-sand/20 space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-sand/70 block">
              Capital Target
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-sand">
              {config.targetCapital || "US$2.4 Million"}
            </span>
            <span className="text-[10px] text-ivory/60 block">12–15 Units · Turnkey</span>
          </div>

          {/* Metric 2 */}
          <div className="p-4 bg-forest-dark/60 border border-sand/20 space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-sand/70 block">
              Target Closing Date
            </span>
            <div className="flex items-center space-x-1.5 font-serif text-lg sm:text-xl font-bold text-ivory">
              <Calendar className="w-4 h-4 text-earth flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <span className="text-[10px] text-ivory/60 block">Diligence cutoff date</span>
          </div>

          {/* Metric 3: Countdown in Days */}
          <div className="p-4 bg-forest-dark/80 border border-earth/40 space-y-1 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-sand/70 block">
                Window Remaining
              </span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-300">
                {days}
              </span>
              <span className="text-xs uppercase font-mono tracking-wider text-sand font-bold">
                {days === 1 ? "Day Left" : "Days Remaining"}
              </span>
            </div>
            <span className="text-[10px] text-ivory/60 block">
              {isClosed ? "Submissions paused" : "Indicative submissions open"}
            </span>
          </div>

          {/* Metric 4 */}
          <div className="p-4 bg-forest-dark/60 border border-sand/20 space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-sand/70 block">
              Allocation Structure
            </span>
            <span className="font-serif text-base sm:text-lg font-bold text-ivory block mt-0.5">
              Lead or Syndicate
            </span>
            <span className="text-[10px] text-ivory/60 block">Single diligence process</span>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-sand/20">
          <div className="flex items-center space-x-2 text-xs text-sand/90">
            <CheckCircle2 className="w-4 h-4 text-earth flex-shrink-0" />
            <span>
              All expressions of interest subject to standard accredited investor accreditation and NDA.
            </span>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {variant === "public" ? (
              <>
                <Link
                  href="/investor-access"
                  className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-wider inline-flex items-center space-x-2"
                >
                  <span>Request Diligence Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/portal"
                  className="text-xs text-sand hover:text-white underline underline-offset-4 font-mono font-semibold"
                >
                  Sign In to Data Room →
                </Link>
              </>
            ) : (
              <Link
                href="/portal/messages"
                className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-wider inline-flex items-center space-x-2"
              >
                <span>Submit Diligence Inquiry / Term Sheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
