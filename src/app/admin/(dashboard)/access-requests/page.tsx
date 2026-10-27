"use client";

import { useState, useEffect } from "react";
import { AccessRequest, User, UserRole } from "@/types";
import { CheckCircle2, XCircle, Clock, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchRequests = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.accessRequests || []);
        setUsers(data.users || []);
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
    if (action === "REJECT_REQUEST") {
      const confirmed = window.confirm(
        "Are you sure you want to REJECT this access application?\n\n" +
        "• The request will be marked as 'Rejected' in the Accreditation Queue.\n" +
        "• The investor will NOT receive Tier 3 Diligence access.\n" +
        "• Their existing Tier 2 registered account (if already registered) will remain active.\n" +
        "• This action is logged in the Security Audit Trail.\n\n" +
        "Click OK to proceed with rejection."
      );
      if (!confirmed) return;
    }

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
    <div className="space-y-6 animate-fade-in">
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

      {/* Requests Table Container */}
      <div className="bg-white border border-sand/40 shadow-subtle overflow-hidden">
        {loading ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">Loading applications...</p>
        ) : requests.length === 0 ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">No access requests recorded.</p>
        ) : (
          <div className="overflow-x-auto table-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full text-left text-xs min-w-[760px] table-fixed">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3.5 border-b border-sand/30 w-[34%]">Applicant & Firm</th>
                  <th className="p-3.5 border-b border-sand/30 w-[24%]">Investor Profile</th>
                  <th className="p-3.5 border-b border-sand/30 w-[22%]">Accreditation Status</th>
                  <th className="p-3.5 border-b border-sand/30 text-right w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {requests.map((req) => {
                  const matchedUser = users.find(
                    (u) => u.email.toLowerCase() === req.businessEmail.toLowerCase()
                  );
                  const isAlreadyRegistered = matchedUser?.role === "registered";
                  const isAlreadyApproved = matchedUser?.role === "approved";

                  return (
                    <tr key={req.id} className="hover:bg-sand/10 transition-colors">
                      {/* Column 1: Applicant & Firm */}
                      <td className="p-3.5 align-top">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-forest block text-sm">{req.fullName}</span>
                          <span className="font-mono text-[11px] text-charcoal/70 block break-all">{req.businessEmail}</span>
                          {req.organization && req.organization !== "—" && (
                            <span className="text-[11px] text-earth font-medium block">
                              {req.organization}
                            </span>
                          )}
                          {req.message && (
                            <p className="text-[11px] text-charcoal/70 italic mt-1.5 p-2 bg-sand/15 border-l-2 border-sand rounded-none">
                              “{req.message}”
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Column 2: Investor Profile */}
                      <td className="p-3.5 align-top">
                        <div className="space-y-1">
                          <span className="font-semibold text-charcoal block">{req.category}</span>
                          <div className="text-[11px] text-charcoal/70 flex flex-wrap gap-x-1.5">
                            {req.country && req.country !== "—" && <span>{req.country} ·</span>}
                            <span>{req.interest}</span>
                          </div>
                          <div className="pt-1">
                            <span className="text-[10px] uppercase font-mono text-charcoal/50 block">Indicative:</span>
                            <span className="font-mono text-[11px] font-semibold text-forest">
                              {req.indicativeRange || "Not stated"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Column 3: Accreditation Status */}
                      <td className="p-3.5 align-top">
                        <div className="space-y-1.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold inline-block ${
                              req.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : req.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {req.status} {req.assignedRole && `(${req.assignedRole})`}
                          </span>

                          {isAlreadyApproved ? (
                            <span className="block text-[10px] font-mono text-emerald-800 font-bold">
                              ✓ Active Tier 3 Investor
                            </span>
                          ) : isAlreadyRegistered ? (
                            <span className="block text-[10px] font-mono text-earth font-bold">
                              • Tier 2 (Requesting Tier 3)
                            </span>
                          ) : null}

                          {req.emailVerified && (
                            <span className="block text-[10px] font-mono text-emerald-700">
                              ✓ Email Verified
                            </span>
                          )}

                          {req.message?.includes("NDA") && (
                            <span className="block text-[10px] font-mono text-earth font-bold">
                              ✓ Digital NDA Executed
                            </span>
                          )}

                          <span className="block text-[10px] font-mono text-charcoal/50 pt-0.5">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>

                      {/* Column 4: Review Actions */}
                      <td className="p-3.5 align-top text-right">
                        {req.status === "pending" ? (
                          <div className="flex flex-col items-end space-y-1.5">
                            <button
                              disabled={actionLoading === req.id}
                              onClick={() => handleAction(req.id, "APPROVE_REQUEST", "approved")}
                              className="w-full sm:w-auto px-3 py-1.5 bg-forest hover:bg-forest-light text-sand text-[10px] uppercase font-bold tracking-wider transition-colors shadow-sm text-center"
                            >
                              Approve Tier 3
                            </button>

                            <div className="flex items-center space-x-1.5">
                              {isAlreadyRegistered ? (
                                <button
                                  disabled={actionLoading === req.id}
                                  onClick={() => handleAction(req.id, "REJECT_REQUEST")}
                                  className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] uppercase font-bold transition-colors"
                                  title="Decline Tier 3 diligence upgrade while leaving user at Tier 2"
                                >
                                  Decline Upgrade
                                </button>
                              ) : (
                                <>
                                  <button
                                    disabled={actionLoading === req.id}
                                    onClick={() => handleAction(req.id, "APPROVE_REQUEST", "registered")}
                                    className="px-2.5 py-1 bg-sand hover:bg-sand-dark text-evergreen text-[10px] uppercase font-bold tracking-wider transition-colors"
                                  >
                                    Grant Tier 2
                                  </button>
                                  <button
                                    disabled={actionLoading === req.id}
                                    onClick={() => handleAction(req.id, "REJECT_REQUEST")}
                                    className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] uppercase font-bold transition-colors"
                                  >
                                    Decline
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-charcoal/50 text-right">
                            Reviewed by<br />
                            <span className="font-mono font-medium text-forest">{req.reviewedBy?.split("@")[0] || "admin"}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
