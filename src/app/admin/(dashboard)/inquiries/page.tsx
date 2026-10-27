"use client";

import { useState, useEffect, useCallback } from "react";
import { InvestorInquiry } from "@/types";
import {
  MessageSquare,
  RefreshCw,
  Clock,
  Mail,
  Building2,
  CheckCircle2,
  AlertCircle,
  Filter,
} from "lucide-react";

const TYPE_COLOURS: Record<string, string> = {
  "Due Diligence Request": "bg-earth text-white",
  "Meeting Request": "bg-forest text-sand",
  "Term Sheet Discussion": "bg-red-800 text-white",
  "General Question": "bg-sand text-evergreen",
};

const STATUS_COLOURS: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  read: "bg-emerald-100 text-emerald-800",
  replied: "bg-forest text-sand",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InvestorInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchInquiries = useCallback(() => {
    setLoading(true);
    // Admin call — passes through the admin session cookie automatically
    fetch("/api/portal/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data.inquiries || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const markStatus = async (id: string, status: "read" | "replied") => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
      showToast("success", `Inquiry marked as ${status}.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Operation failed";
      showToast("error", msg);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered =
    filter === "all"
      ? inquiries
      : filter === "new"
      ? inquiries.filter((i) => i.status === "new")
      : inquiries.filter((i) => i.type === filter);

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center space-x-2 p-4 shadow-lg border text-xs font-medium animate-fade-in ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-red-800 font-bold block mb-1">
            Direct Sponsor Channel
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Investor Inquiries &amp; Messages
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            All investor messages, meeting requests, and due diligence queries submitted via the portal.
            {newCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
                {newCount} new
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-sand/40 p-4 flex flex-wrap items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-charcoal/50" />
        <span className="text-[10px] uppercase tracking-wider text-charcoal/60 font-semibold mr-2">Filter:</span>
        {["all", "new", "Due Diligence Request", "Meeting Request", "Term Sheet Discussion", "General Question"].map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1 text-[10px] font-mono uppercase font-bold tracking-wider transition-colors ${
              filter === opt
                ? "bg-forest text-sand"
                : "bg-sand/30 text-charcoal/70 hover:bg-sand/60"
            }`}
          >
            {opt === "all" ? "All Messages" : opt}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
        {loading ? (
          <p className="text-xs text-charcoal/60 p-10 text-center">Loading investor inquiries…</p>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <MessageSquare className="w-10 h-10 text-sand mx-auto" />
            <p className="text-sm text-charcoal/60">No inquiries match the current filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-sand/20">
            {filtered.map((inq) => (
              <div
                key={inq.id}
                className={`transition-colors ${inq.status === "new" ? "bg-amber-50/30" : "bg-white"}`}
              >
                {/* Row summary */}
                <button
                  className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-sand/10 transition-colors"
                  onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                  id={`inquiry-${inq.id}`}
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold ${
                          TYPE_COLOURS[inq.type] || "bg-sand text-forest"
                        }`}
                      >
                        {inq.type}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[9px] font-mono uppercase font-bold ${
                          STATUS_COLOURS[inq.status || "new"] || "bg-sand text-forest"
                        }`}
                      >
                        {inq.status || "new"}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-forest">{inq.subject}</h3>
                    <div className="flex flex-wrap gap-3 text-[11px] text-charcoal/60">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{inq.userEmail}</span>
                      </span>
                      {inq.userName && (
                        <span className="flex items-center space-x-1">
                          <Building2 className="w-3 h-3" />
                          <span>{inq.userName}</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(inq.createdAt).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal/50 whitespace-nowrap self-start sm:self-center">
                    {expanded === inq.id ? "▲ Collapse" : "▼ Expand"}
                  </span>
                </button>

                {/* Expanded detail */}
                {expanded === inq.id && (
                  <div className="px-5 pb-5 space-y-4 animate-fade-in">
                    <div className="bg-sand/15 border-l-4 border-earth p-4">
                      <p className="text-xs text-charcoal/80 leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>

                    {inq.preferredDate && (
                      <div className="flex items-center space-x-2 text-xs text-earth font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Preferred date / time: {inq.preferredDate}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={`mailto:${inq.userEmail}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                        className="luxury-btn !py-1.5 !px-4 text-[10px] tracking-wider flex items-center space-x-1.5"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Reply via Email</span>
                      </a>

                      {inq.status !== "read" && inq.status !== "replied" && (
                        <button
                          disabled={actionLoading === inq.id}
                          onClick={() => markStatus(inq.id, "read")}
                          className="luxury-btn-outline !py-1.5 !px-3 text-[10px] tracking-wider flex items-center space-x-1.5 disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark as Read</span>
                        </button>
                      )}

                      {inq.status !== "replied" && (
                        <button
                          disabled={actionLoading === inq.id}
                          onClick={() => markStatus(inq.id, "replied")}
                          className="px-3 py-1.5 bg-forest hover:bg-forest-light text-sand text-[10px] font-mono uppercase font-bold tracking-wider transition-colors disabled:opacity-50 flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark as Replied</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
