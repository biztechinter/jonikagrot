"use client";

import { useState, useEffect } from "react";
import { AuditEvent } from "@/types";
import { Activity, ShieldAlert, RefreshCw, Filter } from "lucide-react";

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>("ALL");

  const fetchLogs = () => {
    setLoading(true);
    fetch("/api/admin/audit-log")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    if (filterAction === "ALL") return true;
    return l.action === filterAction;
  });

  const getActionBadge = (action: string) => {
    if (action.includes("APPROVED")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    }
    if (action.includes("REJECTED") || action.includes("SUSPENDED")) {
      return "bg-red-100 text-red-800 border-red-300";
    }
    if (action.includes("DOWNLOADED")) {
      return "bg-blue-100 text-blue-800 border-blue-300";
    }
    return "bg-sand text-charcoal border-sand";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-red-800 font-bold block mb-1">
            Compliance & Security
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Security & Diligence Audit Trail
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            Immutable chronological record of logins, access permissions, confidential document downloads, and administrative actions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Audit Trail</span>
        </button>
      </div>

      {/* Action Filter */}
      <div className="flex items-center space-x-3 text-xs">
        <span className="text-charcoal/60 font-semibold uppercase">Filter by Event:</span>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="px-3 py-1.5 bg-white border border-sand/80 text-xs text-charcoal focus:outline-none"
        >
          <option value="ALL">All Event Types</option>
          <option value="USER_LOGIN">User Logins</option>
          <option value="DOCUMENT_DOWNLOADED">Document Downloads</option>
          <option value="ACCESS_REQUEST_SUBMITTED">Access Requests Submitted</option>
          <option value="ACCESS_REQUEST_APPROVED">Approvals</option>
          <option value="USER_ROLE_CHANGED">Role Changes</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
        {loading ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">Loading audit events...</p>
        ) : filteredLogs.length === 0 ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">No audit records match the current filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3.5 border-b border-sand/30 whitespace-nowrap">Timestamp</th>
                  <th className="p-3.5 border-b border-sand/30">Action</th>
                  <th className="p-3.5 border-b border-sand/30">Actor (Role)</th>
                  <th className="p-3.5 border-b border-sand/30">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80 font-mono text-[11px]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-3.5 whitespace-nowrap text-charcoal/60">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[9px] uppercase font-bold border ${getActionBadge(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-forest block">{log.actorEmail}</span>
                      <span className="text-[10px] text-charcoal/50 capitalize font-sans">{log.actorRole}</span>
                    </td>

                    <td className="p-3.5 font-sans text-xs text-charcoal leading-relaxed max-w-lg">
                      {log.details}
                      {log.targetResource && (
                        <span className="block font-mono text-[10px] text-earth mt-0.5">
                          Target: {log.targetResource}
                        </span>
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
