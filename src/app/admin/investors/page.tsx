"use client";

import { useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { Users, Shield, UserX, UserCheck, RefreshCw } from "lucide-react";

export default function InvestorsDirectoryPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

      if (!res.ok) throw new Error("Failed to update user");
      fetchUsers();
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
            User Directory
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Investor Directory & Permission Matrix
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            Manage registered and approved accounts, modify access tiers, and suspend or restore platform access.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          className="luxury-btn-outline !py-2 !px-4 text-xs tracking-wider flex items-center space-x-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh List</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-sand/40 overflow-hidden shadow-subtle">
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
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-3.5">
                      <span className="font-semibold text-forest block">{u.name}</span>
                      <span className="text-[10px] text-charcoal/50 block">{u.organization || "Individual"}</span>
                    </td>

                    <td className="p-3.5 font-mono text-[11px] text-charcoal/80">{u.email}</td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                          u.role === "admin"
                            ? "bg-red-800 text-white"
                            : u.role === "approved"
                            ? "bg-earth text-white"
                            : "bg-sand text-evergreen"
                        }`}
                      >
                        {u.role}
                      </span>
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
                      {u.role === "admin" ? (
                        <span className="text-[10px] text-charcoal/40 italic">System Owner</span>
                      ) : (
                        <div className="flex items-center justify-end space-x-2">
                          {u.role === "registered" ? (
                            <button
                              disabled={actionLoading === u.id}
                              onClick={() => handleUpdateRole(u.id, "approved")}
                              className="px-2.5 py-1 bg-earth hover:bg-earth-dark text-white text-[10px] uppercase font-bold"
                            >
                              Upgrade Tier 3
                            </button>
                          ) : (
                            <button
                              disabled={actionLoading === u.id}
                              onClick={() => handleUpdateRole(u.id, "registered")}
                              className="px-2.5 py-1 bg-sand/60 hover:bg-sand text-evergreen text-[10px] uppercase font-bold"
                            >
                              Set Tier 2
                            </button>
                          )}

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
