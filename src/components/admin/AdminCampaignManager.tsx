"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Plus,
  Shield,
  Layers,
} from "lucide-react";
import type { CampaignWindowConfig, CampaignRoundStatus } from "@/types";

interface Props {
  initialConfig?: CampaignWindowConfig;
}

export default function AdminCampaignManager({ initialConfig }: Props) {
  const [config, setConfig] = useState<CampaignWindowConfig | null>(initialConfig || null);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(!initialConfig);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form edit states
  const [roundName, setRoundName] = useState("");
  const [targetCapital, setTargetCapital] = useState("");
  const [closingDateInput, setClosingDateInput] = useState("");
  const [status, setStatus] = useState<CampaignRoundStatus>("active");
  const [enabled, setEnabled] = useState(true);
  const [institutionalNote, setInstitutionalNote] = useState("");

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/campaign");
      if (res.ok) {
        const data = await res.json();
        applyConfigToState(data.config, data.metrics.daysRemaining);
      }
    } catch (err) {
      console.error("Failed to load campaign schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyConfigToState = (cfg: CampaignWindowConfig, days: number) => {
    setConfig(cfg);
    setDaysRemaining(days);
    setRoundName(cfg.roundName || "");
    setTargetCapital(cfg.targetCapital || "US$2.4 Million");
    setStatus(cfg.status || "active");
    setEnabled(cfg.enabled ?? true);
    setInstitutionalNote(cfg.institutionalNote || "");

    // Format date for <input type="date"> (YYYY-MM-DD)
    if (cfg.closingDate) {
      const d = new Date(cfg.closingDate);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        setClosingDateInput(`${yyyy}-${mm}-${dd}`);
      }
    }
  };

  useEffect(() => {
    if (!initialConfig) {
      fetchConfig();
    } else {
      const diffMs = new Date(initialConfig.closingDate).getTime() - Date.now();
      const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      applyConfigToState(initialConfig, days);
    }
  }, [initialConfig]);

  const handleQuickAddDays = async (daysToAdd: number) => {
    try {
      setSaving(true);
      setMessage(null);
      const res = await fetch("/api/admin/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ daysToAdd }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        applyConfigToState(data.config, data.metrics.daysRemaining);
        setMessage({
          text: `Timetable extended by +${daysToAdd} days. Closing date updated to ${new Date(
            data.config.closingDate
          ).toLocaleDateString()}.`,
          type: "success",
        });
      } else {
        setMessage({ text: data.error || "Failed to extend campaign.", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);

      // Construct closingDate ISO string with end-of-day UTC
      const parsedDate = new Date(`${closingDateInput}T23:59:59.000Z`);
      if (isNaN(parsedDate.getTime())) {
        setMessage({ text: "Please enter a valid closing date.", type: "error" });
        setSaving(false);
        return;
      }

      const res = await fetch("/api/admin/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roundName,
          targetCapital,
          closingDate: parsedDate.toISOString(),
          status,
          enabled,
          institutionalNote,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        applyConfigToState(data.config, data.metrics.daysRemaining);
        setMessage({
          text: "Campaign closing schedule updated and logged in security audit trail.",
          type: "success",
        });
      } else {
        setMessage({ text: data.error || "Failed to save campaign settings.", type: "error" });
      }
    } catch {
      setMessage({ text: "Network error occurred while saving.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 border border-sand/40 text-xs text-charcoal/60">
        Loading campaign timetable manager...
      </div>
    );
  }

  const formattedCurrentDate = config
    ? new Date(config.closingDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-white border border-sand/50 shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-forest text-ivory flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sand text-[11px] font-mono uppercase tracking-widest font-bold mb-1">
            <Clock className="w-4 h-4 text-earth" />
            <span>Campaign Schedule & Timetable Control</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
            Capital Allocation & Diligence Window
          </h2>
          <p className="text-xs text-ivory/80 mt-1 max-w-xl">
            Control the scheduled closing date and investor countdown. Define a structured timetable to maintain institutional momentum and close the allocation book cleanly.
          </p>
        </div>

        {/* Live Days Left Pill */}
        <div className="bg-forest-dark/80 border border-sand/30 p-3 sm:px-5 sm:py-3 flex items-center space-x-4 self-start sm:self-auto flex-shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-sand/70 block">
              Diligence Window
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
              {daysRemaining !== null ? daysRemaining : "—"} Days Left
            </span>
          </div>
          <span className="text-xs text-sand/80 font-mono hidden sm:inline-block border-l border-sand/20 pl-3">
            Target: {formattedCurrentDate}
          </span>
        </div>
      </div>

      {/* Status Notice if any */}
      {message && (
        <div
          className={`p-4 text-xs flex items-center space-x-2 border-b ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Quick Extension Buttons */}
      <div className="p-6 bg-sand/15 border-b border-sand/30 space-y-2">
        <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">
          Quick Adjustments & Extensions
        </span>
        <p className="text-xs text-charcoal/70">
          Instantly extend the allocation window by adding days from now or the current closing date:
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {[
            { label: "+7 Days", days: 7 },
            { label: "+14 Days (2 Wks)", days: 14 },
            { label: "+30 Days (1 Mo)", days: 30 },
            { label: "+45 Days", days: 45 },
            { label: "+60 Days (2 Mo)", days: 60 },
          ].map((preset) => (
            <button
              key={preset.days}
              type="button"
              disabled={saving}
              onClick={() => handleQuickAddDays(preset.days)}
              className="px-3 py-1.5 bg-white border border-sand/60 hover:border-earth text-forest hover:text-earth text-xs font-mono font-semibold transition-colors disabled:opacity-50 flex items-center space-x-1"
            >
              <Plus className="w-3 h-3 text-earth" />
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveAll} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Closing Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest uppercase tracking-wider block">
              Target Closing Date
            </label>
            <input
              type="date"
              required
              value={closingDateInput}
              onChange={(e) => setClosingDateInput(e.target.value)}
              className="w-full text-xs font-mono p-2.5 border border-sand/60 focus:border-forest outline-none bg-white"
            />
            <span className="text-[11px] text-charcoal/60 block">
              The date at which the diligence book closes or transitions to final allocation review.
            </span>
          </div>

          {/* Round Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest uppercase tracking-wider block">
              Round Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CampaignRoundStatus)}
              className="w-full text-xs p-2.5 border border-sand/60 focus:border-forest outline-none bg-white"
            >
              <option value="active">Active · Book Open for Diligence</option>
              <option value="under_review">Under Final Review · Allocations in Diligence</option>
              <option value="extended">Extended · Diligence Window Extended</option>
              <option value="closed">Closed · Syndicate Concluded / Subscribed</option>
            </select>
            <span className="text-[11px] text-charcoal/60 block">
              Changes the label and status badge visible to investors.
            </span>
          </div>

          {/* Round Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest uppercase tracking-wider block">
              Round Name / Headline
            </label>
            <input
              type="text"
              value={roundName}
              onChange={(e) => setRoundName(e.target.value)}
              placeholder="e.g. Phase 1 Lead Partner & Syndicate Allocation"
              className="w-full text-xs p-2.5 border border-sand/60 focus:border-forest outline-none bg-white"
            />
          </div>

          {/* Target Capital */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest uppercase tracking-wider block">
              Target Capital
            </label>
            <input
              type="text"
              value={targetCapital}
              onChange={(e) => setTargetCapital(e.target.value)}
              placeholder="US$2.4 Million"
              className="w-full text-xs p-2.5 border border-sand/60 focus:border-forest outline-none bg-white font-mono"
            />
          </div>
        </div>

        {/* Institutional Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-forest uppercase tracking-wider block">
            Institutional Context & Diligence Note
          </label>
          <textarea
            rows={2}
            value={institutionalNote}
            onChange={(e) => setInstitutionalNote(e.target.value)}
            className="w-full text-xs p-2.5 border border-sand/60 focus:border-forest outline-none bg-white leading-relaxed"
            placeholder="Clarify diligence protocol and timeline rationale..."
          />
          <span className="text-[11px] text-charcoal/60 block">
            Appears on the timetable card on the public investment page and the investor portal.
          </span>
        </div>

        {/* Enable / Disable Public Display */}
        <div className="pt-2 flex items-center justify-between border-t border-sand/30">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="campaign-enabled"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 text-forest rounded border-sand/60 focus:ring-forest cursor-pointer"
            />
            <label htmlFor="campaign-enabled" className="text-xs text-forest font-semibold cursor-pointer">
              Enable Timetable & Countdown across Public Site & Portal
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="luxury-btn-primary text-xs !py-2.5 !px-6 tracking-wider flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving Schedule..." : "Save Timetable Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
