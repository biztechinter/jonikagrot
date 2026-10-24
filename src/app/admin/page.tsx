import Link from "next/link";
import { db } from "@/lib/storage";
import {
  Users,
  UserCheck,
  FileText,
  Activity,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const users = db.getUsers();
  const requests = db.getAccessRequests();
  const docs = db.getDocuments();
  const logs = db.getAuditLogs();

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedInvestors = users.filter((u) => u.role === "approved");
  const registeredInvestors = users.filter((u) => u.role === "registered");
  const totalDownloads = docs.reduce((acc, d) => acc + (d.downloadsCount || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-red-800 font-bold block mb-1">
          Governance Center
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Investor Relations & Data Room Operations
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
          Monitor inbound investor registrations, grant Tier 3 diligence permissions, inspect document access volumes, and audit security events.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 border-l-4 border-l-amber-500 border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              Pending Requests
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {pendingRequests.length}
          </span>
          <Link
            href="/admin/access-requests"
            className="text-[11px] text-earth font-bold hover:underline mt-2 inline-flex items-center space-x-1"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-white p-6 border-l-4 border-l-earth border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              Tier 3 Approved
            </span>
            <UserCheck className="w-4 h-4 text-earth" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {approvedInvestors.length}
          </span>
          <span className="text-[11px] text-charcoal/60 mt-1 block">Full Data Room Access</span>
        </div>

        <div className="bg-white p-6 border-l-4 border-l-forest border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              Tier 2 Registered
            </span>
            <Users className="w-4 h-4 text-forest" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {registeredInvestors.length}
          </span>
          <span className="text-[11px] text-charcoal/60 mt-1 block">Overview Access Only</span>
        </div>

        <div className="bg-white p-6 border-l-4 border-l-emerald-600 border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-charcoal/60 font-semibold">
              Total Downloads
            </span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {totalDownloads}
          </span>
          <span className="text-[11px] text-charcoal/60 mt-1 block">Tracked across 15 files</span>
        </div>
      </div>

      {/* Pending Access Requests Overview */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-sand/20">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-earth" />
            <h2 className="font-serif text-xl font-bold text-forest">
              Pending Investor Applications ({pendingRequests.length})
            </h2>
          </div>
          <Link
            href="/admin/access-requests"
            className="text-xs uppercase tracking-wider font-semibold text-earth hover:text-forest"
          >
            Manage All Requests →
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <p className="text-xs text-charcoal/60 py-4">No pending investor requests at this time.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-sand/30">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3 border-b border-sand/30">Applicant</th>
                  <th className="p-3 border-b border-sand/30">Organization</th>
                  <th className="p-3 border-b border-sand/30">Category</th>
                  <th className="p-3 border-b border-sand/30">Interest</th>
                  <th className="p-3 border-b border-sand/30">Indicative Size</th>
                  <th className="p-3 border-b border-sand/30">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {pendingRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-sand/10">
                    <td className="p-3 font-semibold text-forest">
                      {req.fullName}
                      <span className="block font-mono text-[10px] text-charcoal/60 font-normal">
                        {req.businessEmail}
                      </span>
                    </td>
                    <td className="p-3">{req.organization || "—"}</td>
                    <td className="p-3">{req.category}</td>
                    <td className="p-3">{req.interest}</td>
                    <td className="p-3 font-mono text-[11px]">{req.indicativeRange || "Not stated"}</td>
                    <td className="p-3 whitespace-nowrap text-charcoal/60">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Security Audit Stream */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-sand/20">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-forest" />
            <h2 className="font-serif text-xl font-bold text-forest">
              Recent Security Audit Activity
            </h2>
          </div>
          <Link
            href="/admin/audit-log"
            className="text-xs uppercase tracking-wider font-semibold text-earth hover:text-forest"
          >
            Full Audit Trail →
          </Link>
        </div>

        <div className="space-y-3">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="p-3 bg-sand/15 border border-sand/30 flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] uppercase bg-forest text-sand px-1.5 py-0.2 font-bold">
                    {log.action}
                  </span>
                  <span className="font-semibold text-forest">{log.actorEmail}</span>
                  <span className="text-charcoal/50 text-[11px]">({log.actorRole})</span>
                </div>
                <p className="text-charcoal/80 text-[11px]">{log.details}</p>
              </div>
              <span className="text-[10px] text-charcoal/50 whitespace-nowrap font-mono">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
