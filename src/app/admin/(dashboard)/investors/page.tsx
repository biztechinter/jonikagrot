"use client";

import { useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import {
  Users,
  Shield,
  UserX,
  UserCheck,
  RefreshCw,
  UserPlus,
  ShieldAlert,
  Check,
  AlertCircle,
  ExternalLink,
  Trash2,
} from "lucide-react";

export default function InvestorsDirectoryPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Add Admin state
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [addAdminMsg, setAddAdminMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId: string, targetRole: UserRole, status?: "active" | "suspended") => {
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_USER_ROLE",
          userId,
          targetRole,
          status,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to update user");
      }
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Operation failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string, name: string, email: string) => {
    if (
      !confirm(
        `Are you sure you want to permanently delete investor "${name}" (${email})?\n\nThis will remove their portal account, data room requests, and inquiries. This cannot be undone.`
      )
    ) {
      return;
    }
    setActionLoading(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "DELETE_USER",
          userId,
        }),
      });

      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Failed to delete investor");

      alert(d.message || "Investor deleted successfully.");
      fetchUsers();
    } catch (err: any) {
      alert(err.message || "Operation failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddAdminMsg(null);
    setAddAdminLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ADD_ADMIN",
          email: newAdminEmail,
          name: newAdminName,
        }),
      });

      const d = await res.json();
      if (!res.ok) {
        throw new Error(d.error || "Failed to authorize administrator");
      }

      setAddAdminMsg({
        type: "success",
        text: `Administrator authorized! ${newAdminEmail} can now sign in with Google.`,
      });
      setNewAdminEmail("");
      setNewAdminName("");
      fetchUsers();
      setTimeout(() => setShowAddAdmin(false), 2500);
    } catch (err: any) {
      setAddAdminMsg({
        type: "error",
        text: err.message || "Failed to add administrator.",
      });
    } finally {
      setAddAdminLoading(false);
    }
  };

  const adminUsers = users.filter((u) => u.role === "admin");
  const investorUsers = users.filter((u) => u.role !== "admin");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-red-800 font-bold block mb-1">
            User Directory & Access Governance
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Investor Directory & Permission Matrix
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            Manage multi-administrator privileges, investor access tiers, and suspend or restore platform access.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button
            onClick={() => setShowAddAdmin(!showAddAdmin)}
            className="luxury-btn !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{showAddAdmin ? "Close Add Form" : "+ Authorize Admin"}</span>
          </button>
          <button
            onClick={fetchUsers}
            className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Authorize New Admin Form (Expandable) */}
      {showAddAdmin && (
        <div className="bg-sand/15 border border-sand p-6 shadow-subtle animate-fade-in space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-700" />
            <h2 className="font-serif text-base font-bold text-forest">Authorize New Administrator</h2>
          </div>
          <p className="text-xs text-charcoal/70">
            Designate a new team member as an administrator. Once authorized, they can log in instantly using their Google / Gmail account or password.
          </p>

          {addAdminMsg && (
            <div
              className={`p-3 text-xs flex items-center space-x-2 border ${
                addAdminMsg.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-red-50 text-red-800 border-red-300"
              }`}
            >
              {addAdminMsg.type === "success" ? (
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              )}
              <span>{addAdminMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-forest font-semibold mb-1">
                Admin Full Name
              </label>
              <input
                type="text"
                required
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                placeholder="e.g. Sarah Mwangi"
                className="w-full px-3 py-2 bg-white border border-sand/60 text-xs text-forest focus:outline-none focus:border-forest"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-forest font-semibold mb-1">
                Google / Corporate Email
              </label>
              <input
                type="email"
                required
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="e.g. sarah@gmail.com"
                className="w-full px-3 py-2 bg-white border border-sand/60 text-xs font-mono text-forest focus:outline-none focus:border-forest"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={addAdminLoading}
                className="w-full py-2.5 px-4 bg-red-800 hover:bg-red-900 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {addAdminLoading ? "Authorizing..." : "Grant Admin Access"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Authorized Admins Card */}
      <div className="bg-white border border-sand/40 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-sand/30 pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-red-800" />
            <h2 className="font-serif text-sm font-bold text-forest">
              Authorized Administrators ({adminUsers.length})
            </h2>
          </div>
          <span className="text-[10px] font-mono uppercase text-charcoal/60">
            Multi-Administrator Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {adminUsers.map((adm) => (
            <div
              key={adm.id}
              className="p-3 bg-sand/10 border border-sand/30 flex items-start justify-between space-x-2"
            >
              <div>
                <span className="font-bold text-xs text-forest block">{adm.name}</span>
                <span className="text-[11px] font-mono text-charcoal/70 block">{adm.email}</span>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="px-1.5 py-0.5 bg-red-800 text-white text-[9px] font-mono uppercase font-bold">
                    Admin
                  </span>
                  <span className="text-[10px] text-charcoal/50">
                    {adm.authProvider === "google" ? "Google OAuth" : "Master Password"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
        <div className="px-6 py-4 border-b border-sand/30 flex items-center justify-between">
          <h2 className="font-serif text-sm font-bold text-forest">
            Investor Accounts ({investorUsers.length})
          </h2>
          <span className="text-[10px] font-mono text-charcoal/60 uppercase">
            Registered & Approved Investors
          </span>
        </div>

        {loading ? (
          <p className="text-xs text-charcoal/60 p-8 text-center">Loading investor accounts...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/20 text-forest uppercase font-semibold">
                <tr>
                  <th className="p-3.5 border-b border-sand/30">Investor Name</th>
                  <th className="p-3.5 border-b border-sand/30">Email Address</th>
                  <th className="p-3.5 border-b border-sand/30">Current Tier</th>
                  <th className="p-3.5 border-b border-sand/30">Account Status</th>
                  <th className="p-3.5 border-b border-sand/30">Joined</th>
                  <th className="p-3.5 border-b border-sand/30 text-right">Access Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/20 text-charcoal/80">
                {investorUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-3.5">
                      <span className="font-semibold text-forest block">{u.name}</span>
                      <span className="text-[10px] text-charcoal/50 block">{u.organization || "Individual"}</span>
                      {u.websiteOrLinkedin && (
                        <a
                          href={u.websiteOrLinkedin.startsWith("http") ? u.websiteOrLinkedin : `https://${u.websiteOrLinkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-forest underline hover:text-earth flex items-center space-x-1 pt-0.5"
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate max-w-[160px]">Website / Profile</span>
                        </a>
                      )}
                    </td>

                    <td className="p-3.5 font-mono text-[11px] text-charcoal/80">{u.email}</td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold inline-block ${
                          u.role === "approved"
                            ? "bg-earth text-white"
                            : "bg-sand text-evergreen"
                        }`}
                      >
                        {u.role}
                      </span>
                      {u.ndaAccepted ? (
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold block mt-1">
                          ✓ NDA Executed
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-800 font-semibold block mt-1">
                          ⚠ NDA Not Signed
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          u.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap text-charcoal/60">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        {u.role === "registered" ? (
                          u.ndaAccepted ? (
                            <button
                              disabled={actionLoading === u.id}
                              onClick={() => handleUpdateRole(u.id, "approved")}
                              className="px-2.5 py-1 bg-earth hover:bg-earth-dark text-white text-[10px] uppercase font-bold"
                            >
                              Upgrade Tier 3
                            </button>
                          ) : (
                            <button
                              disabled={true}
                              title="Investor must execute the Non-Disclosure Agreement (NDA) before Tier 3 clearance can be granted."
                              className="px-2.5 py-1 bg-sand/40 text-charcoal/40 text-[10px] uppercase font-bold border border-sand/60 cursor-not-allowed"
                            >
                              NDA Required
                            </button>
                          )
                        ) : (
                          <button
                            disabled={actionLoading === u.id}
                            onClick={() => handleUpdateRole(u.id, "registered")}
                            className="px-2.5 py-1 bg-sand/60 hover:bg-sand text-evergreen text-[10px] uppercase font-bold"
                          >
                            Set Tier 2
                          </button>
                        )}

                        {/* Promote to Admin button */}
                        <button
                          disabled={actionLoading === u.id}
                          onClick={() => {
                            if (confirm(`Grant full Administrator privileges to ${u.name} (${u.email})?`)) {
                              handleUpdateRole(u.id, "admin");
                            }
                          }}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-900 text-[10px] uppercase font-bold"
                          title="Promote to Super Administrator"
                        >
                          Make Admin
                        </button>

                        {u.status === "active" ? (
                          <button
                            disabled={actionLoading === u.id}
                            onClick={() => handleUpdateRole(u.id, u.role, "suspended")}
                            className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] uppercase font-bold"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            disabled={actionLoading === u.id}
                            onClick={() => handleUpdateRole(u.id, u.role, "active")}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold"
                          >
                            Reactivate
                          </button>
                        )}

                        {/* Delete Investor button */}
                        <button
                          disabled={actionLoading === u.id}
                          onClick={() => handleDeleteUser(u.id, u.name, u.email)}
                          className="p-1.5 bg-red-50 hover:bg-red-200 text-red-700 hover:text-red-900 border border-red-200 transition-colors"
                          title={`Permanently Delete ${u.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
