"use client";

import { useState, useEffect } from "react";
import { InvestorInquiry } from "@/types";
import { MessageSquare, Send, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function MessagesPage() {
  const [inquiries, setInquiries] = useState<InvestorInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    subject: "",
    type: "Due Diligence Request" as const,
    preferredDate: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInquiries = () => {
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
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/portal/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit request.");

      setSuccess(true);
      setFormData({
        subject: "",
        type: "Due Diligence Request",
        preferredDate: "",
        message: "",
      });
      loadInquiries();
    } catch (err: any) {
      setError(err.message || "Failed to submit inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
          Direct Sponsor Channel
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Investor Inquiries & Meeting Scheduling
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
          Submit technical questions, request confidential sponsor briefing calls, or petition for Tier 3 data room access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inquiry Form */}
        <div className="luxury-card p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-xl font-bold text-forest pb-3 border-b border-sand/20">
            Submit a Diligence Query / Request Meeting
          </h2>

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Your message has been received by the project team.</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Inquiry Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as any })
                }
                className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal"
              >
                <option value="Due Diligence Request">Due Diligence Query / Tier 3 Upgrade</option>
                <option value="Meeting Request">Schedule Sponsor Video Conference</option>
                <option value="Term Sheet Discussion">Indicative Term Sheet Discussion</option>
                <option value="General Question">General Project Question</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Subject Line *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Requesting Tier 3 Clearance to inspect 10-Yr Model"
                className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Preferred Meeting Date / Timezone (Optional)
              </label>
              <input
                type="text"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                placeholder="e.g. Next Tuesday at 14:00 EAT (UTC+3)"
                className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-charcoal mb-1">
                Message Content *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Provide details on your institution, area of focus, or discussion agenda..."
                className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-charcoal"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="luxury-btn-primary w-full !py-3 tracking-widest flex items-center justify-center space-x-2 text-xs"
            >
              <Send className="w-3.5 h-3.5 text-sand" />
              <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
            </button>
          </form>
        </div>

        {/* Previous Inquiries History */}
        <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
          <h2 className="font-serif text-xl font-bold text-forest pb-3 border-b border-sand/20">
            Your Communication History
          </h2>

          {loading ? (
            <p className="text-xs text-charcoal/60">Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center border border-sand/30 text-xs text-charcoal/60 space-y-2">
              <MessageSquare className="w-8 h-8 text-sand mx-auto" />
              <p>No previous inquiries or meeting requests submitted.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 bg-sand/15 border border-sand/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-forest text-sand px-2 py-0.5 font-bold">
                      {inq.type}
                    </span>
                    <span className="text-[10px] text-charcoal/50">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-forest">{inq.subject}</h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed">{inq.message}</p>
                  {inq.preferredDate && (
                    <div className="text-[11px] text-earth font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Preferred: {inq.preferredDate}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
