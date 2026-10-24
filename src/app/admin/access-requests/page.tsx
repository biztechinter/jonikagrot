"use client";

import { useState, useEffect } from "react";
import { AccessRequest, UserRole } from "@/types";
import { CheckCircle2, XCircle, Clock, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchRequests = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.accessRequests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (requestId: string, action: "APPROVE_REQUEST" | "REJECT_REQUEST", targetRole?: UserRole) => {
    setActionLoading(requestId);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          requestId,
          targetRole: targetRole || "approved",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setMessage(`Request successfully ${action === "APPROVE_REQUEST" ? "approved with role " + targetRole : "rejected"}.`);
      fetchRequests();
    } catch (err: any) {
      alert(err.message || "Operation failed");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-red-800 font-bold block mb-1">
            Accreditation Queue
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Investor Access Applications
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            Review inbound questionnaires, evaluate investor suitability, and grant Tier 2 or Tier 3 data room permissions.
          </p>
        </div>

        <button
          onClick={fetchRequests}
          className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Queue</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Requests Table */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
        {loading ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">Loading applications...</p>
        ) : requests.length === 0 ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">No access requests recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3.5 border-b border-sand/30">Applicant & Firm</th>
                  <th className="p-3.5 border-b border-sand/30">Category & Interest</th>
                  <th className="p-3.5 border-b border-sand/30">Country</th>
                  <th className="p-3.5 border-b border-sand/30">Indicative Size</th>
                  <th className="p-3.5 border-b border-sand/30">Status</th>
                  <th className="p-3.5 border-b border-sand/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-3.5">
                      <span className="font-semibold text-forest block text-sm">{req.fullName}</span>
                      <span className="font-mono text-[11px] text-charcoal/60 block">{req.businessEmail}</span>
                      {req.organization && (
                        <span className="text-[11px] text-earth font-medium block mt-0.5">
                          {req.organization}
                        </span>
                      )}
                      {req.message && (
                        <p className="text-[11px] text-charcoal/70 italic mt-1.5 p-2 bg-sand/15 border-l-2 border-sand max-w-xs">
                          “{req.message}”
                        </p>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className="font-semibold text-charcoal block">{req.category}</span>
                      <span className="text-[11px] text-charcoal/60 block mt-0.5">{req.interest}</span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">{req.country}</td>

                    <td className="p-3.5 whitespace-nowrap font-mono text-[11px]">
                      {req.indicativeRange || "Not stated"}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          req.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : req.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {req.status} {req.assignedRole && `(${req.assignedRole})`}
                      </span>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      {req.status === "pending" ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            disabled={actionLoading === req.id}
                            onClick={() => handleAction(req.id, "APPROVE_REQUEST", "approved")}
                            className="px-2.5 py-1 bg-forest hover:bg-forest-light text-sand text-[10px] uppercase font-bold tracking-wider"
                          >
                            Approve Tier 3
                          </button>
                          <button
                            disabled={actionLoading === req.id}
                            onClick={() => handleAction(req.id, "APPROVE_REQUEST", "registered")}
                            className="px-2.5 py-1 bg-sand hover:bg-sand-dark text-evergreen text-[10px] uppercase font-bold tracking-wider"
                          >
                            Set Tier 2
                          </button>
                          <button
                            disabled={actionLoading === req.id}
                            onClick={() => handleAction(req.id, "REJECT_REQUEST")}
                            className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] uppercase font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="text-[11px] text-charcoal/50">
                          Reviewed by {req.reviewedBy?.split("@")[0] || "admin"}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
