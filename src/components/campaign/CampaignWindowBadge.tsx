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
    <div className="bg-forest-dark border-b border-sand/30 text-ivory text-xs px-3 sm:px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-earth/80 text-sand text-[10px] font-mono uppercase font-bold tracking-wider">
            <Clock className="w-3 h-3 text-sand" />
            <span>{isClosed ? "Book Closed" : isUnderReview ? "Allocation Review" : "Diligence Window"}</span>
          </span>

          <span className="font-serif font-medium text-ivory text-xs sm:text-[13px]">
            {config.roundName}:
          </span>

          <span className="text-sand font-mono text-xs font-semibold">
            {isClosed ? (
              "Window Concluded"
            ) : isUnderReview ? (
              "Allocations Under Final Diligence Review"
            ) : (
              <>
                Target Closing: {formattedDate} ·{" "}
                <span className="text-amber-300 font-bold">
                  {days} {days === 1 ? "Day" : "Days"} Remaining
                </span>
              </>
            )}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <Link
            href="/investment"
            className="text-sand hover:text-white underline underline-offset-4 font-medium flex items-center space-x-1 transition-colors"
          >
            <span>Review Investment Timetable</span>
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
