"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, X } from "lucide-react";
import type { CampaignWindowConfig } from "@/types";

interface Props {
  initialConfig?: CampaignWindowConfig;
}

export default function CampaignWindowBadge({ initialConfig }: Props) {
  const [config, setConfig] = useState<CampaignWindowConfig | null>(initialConfig || null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // If not passed as prop, fetch from API
    fetch("/api/campaign")
      .then((res) => res.json())
      .then((data) => {
        if (data.config) {
          setConfig(data.config);
          setDaysRemaining(data.metrics.daysRemaining);
        }
      })
      .catch((err) => console.error("Error loading campaign timetable:", err));
  }, []);

  if (!config || !config.enabled || dismissed) {
    return null;
  }

  // Calculate days if not yet set
  const days =
    daysRemaining !== null
      ? daysRemaining
      : Math.max(
          0,
          Math.ceil((new Date(config.closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        );

  const formattedDate = new Date(config.closingDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isClosed = config.status === "closed" || days <= 0;
  const isUnderReview = config.status === "under_review" || (days <= 0 && config.status === "active");

  return (
    <div className="bg-forest-dark border-b border-sand/30 text-ivory text-xs px-3 sm:px-4 py-1.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
        {/* Left: Badge + Info */}
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-earth/80 text-sand text-[10px] font-mono uppercase font-bold tracking-wider whitespace-nowrap flex-shrink-0">
            <Clock className="w-3 h-3 text-sand" />
            <span>{isClosed ? "Book Closed" : isUnderReview ? "Under Review" : "Diligence Window"}</span>
          </span>

          {/* Round name — hidden on xs, truncated on sm */}
          <span className="hidden sm:inline font-serif font-medium text-ivory text-[13px] truncate min-w-0">
            {config.roundName}:
          </span>

          <span className="text-sand font-mono text-[11px] font-semibold whitespace-nowrap flex-shrink-0">
            {isClosed ? (
              "Window Concluded"
            ) : isUnderReview ? (
              "Final Review"
            ) : (
              <>
                {formattedDate} ·{" "}
                <span className="text-amber-300 font-bold">
                  {days} {days === 1 ? "Day" : "Days"}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Right: Link + Dismiss */}
        <div className="flex items-center gap-2 flex-shrink-0 text-[11px]">
          <Link
            href="/investment"
            className="hidden sm:flex text-sand hover:text-white underline underline-offset-4 font-medium items-center gap-1 transition-colors whitespace-nowrap"
          >
            <span>Review Timetable</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss campaign banner"
            className="text-ivory/60 hover:text-ivory p-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
