import Link from "next/link";
import { db } from "@/lib/storage";
import AdminCampaignManager from "@/components/admin/AdminCampaignManager";
import {
  Users,
  UserCheck,
  FileText,
  Activity,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const users = db.getUsers();
  const requests = db.getAccessRequests();
  const docs = db.getDocuments();
  const logs = db.getAuditLogs();
  const campaignWindow = db.getCampaignWindow();
  const inquiries = db.getInquiries();

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const newInquiries = inquiries.filter((i) => i.status === "new");
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

      {/* Actionable Alert Banner for Pending Requests or New Messages */}
      {(pendingRequests.length > 0 || newInquiries.length > 0) && (
        <div className="p-4 sm:p-5 bg-amber-50/90 border-l-4 border-l-amber-600 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider font-mono">
                Attention Required: Inbound Items Awaiting Admin Action
              </h3>
              <p className="text-xs text-amber-800 mt-1">
                {pendingRequests.length > 0 && (
                  <span className="font-semibold mr-3">
                    • {pendingRequests.length} Pending Accreditation Application{pendingRequests.length > 1 ? "s" : ""} (including {pendingRequests[0].fullName})
                  </span>
                )}
                {newInquiries.length > 0 && (
                  <span className="font-semibold">
                    • {newInquiries.length} New Investor Message{newInquiries.length > 1 ? "s" : ""} / Due Diligence Request{newInquiries.length > 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-center">
            {pendingRequests.length > 0 && (
              <Link
                href="/admin/access-requests"
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-mono uppercase tracking-wider font-bold inline-flex items-center space-x-1 transition-colors"
              >
                <span>Review Applications</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
            {newInquiries.length > 0 && (
              <Link
                href="/admin/inquiries"
                className="px-3 py-1.5 bg-forest hover:bg-forest-light text-sand text-[11px] font-mono uppercase tracking-wider font-bold inline-flex items-center space-x-1 transition-colors"
              >
                <span>View Messages ({newInquiries.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 border-l-4 border-l-amber-500 border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold">
              Pending Requests
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {pendingRequests.length}
          </span>
          <Link
            href="/admin/access-requests"
            className="text-[10px] text-earth font-bold hover:underline mt-2 inline-flex items-center space-x-1"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>

        <div className="bg-white p-5 border-l-4 border-l-blue-600 border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold">
              Inquiries & Msgs
            </span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {inquiries.length}
          </span>
          <Link
            href="/admin/inquiries"
            className="text-[10px] text-blue-700 font-bold hover:underline mt-2 inline-flex items-center space-x-1"
          >
            <span>{newInquiries.length} new unread</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>

        <div className="bg-white p-5 border-l-4 border-l-earth border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold">
              Tier 3 Approved
            </span>
            <UserCheck className="w-4 h-4 text-earth" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {approvedInvestors.length}
          </span>
          <span className="text-[10px] text-charcoal/60 mt-2 block">Full Data Room Access</span>
        </div>

        <div className="bg-white p-5 border-l-4 border-l-forest border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold">
              Tier 2 Registered
            </span>
            <Users className="w-4 h-4 text-forest" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {registeredInvestors.length}
          </span>
          <span className="text-[10px] text-charcoal/60 mt-2 block">Overview Access Only</span>
        </div>

        <div className="bg-white p-5 border-l-4 border-l-emerald-600 border border-sand/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold">
              Total Downloads
            </span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-serif text-3xl font-bold text-forest block mt-2">
            {totalDownloads}
          </span>
          <span className="text-[10px] text-charcoal/60 mt-2 block">Tracked across 15 files</span>
        </div>
      </div>

      {/* Campaign Timetable & Closing Window Governance */}
      <AdminCampaignManager initialConfig={campaignWindow} />

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

      {/* Inbound Investor Messages & Due Diligence Requests Overview */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-sand/20">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-700" />
            <h2 className="font-serif text-xl font-bold text-forest">
              Inbound Investor Inquiries & Messages ({inquiries.length})
            </h2>
            {newInquiries.length > 0 && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-mono font-bold uppercase">
                {newInquiries.length} New
              </span>
            )}
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs uppercase tracking-wider font-semibold text-earth hover:text-forest"
          >
            Open All Messages →
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-charcoal/60 py-4">No investor inquiries submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-sand/30">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3 border-b border-sand/30">From Investor</th>
                  <th className="p-3 border-b border-sand/30">Type</th>
                  <th className="p-3 border-b border-sand/30">Subject & Excerpt</th>
                  <th className="p-3 border-b border-sand/30">Status</th>
                  <th className="p-3 border-b border-sand/30">Date</th>
                  <th className="p-3 border-b border-sand/30 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-sand/10">
                    <td className="p-3 font-semibold text-forest">
                      {inq.userName}
                      <span className="block font-mono text-[10px] text-charcoal/60 font-normal">
                        {inq.userEmail}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold bg-sand/40 text-forest">
                        {inq.type}
                      </span>
                    </td>
                    <td className="p-3 max-w-xs">
                      <span className="font-semibold text-charcoal block">{inq.subject}</span>
                      <p className="text-[11px] text-charcoal/60 truncate">{inq.message}</p>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          inq.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : inq.status === "replied"
                            ? "bg-forest text-sand"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-charcoal/60">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href="/admin/inquiries"
                        className="text-[10px] font-mono uppercase tracking-wider text-earth hover:text-forest font-bold"
                      >
                        Reply →
                      </Link>
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
