import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Command Center | Jonik Ndovu Farm",
  description: "Data room governance, access requests, user permissions, and security audit log.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/login?error=admin_required");
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      <AdminSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-sand/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-charcoal/60">
            <span className="font-semibold text-red-800 uppercase tracking-wider">
              Administration Console
            </span>
            <span>/</span>
            <span>Security & Governance</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="px-2.5 py-0.5 bg-red-100 text-red-800 font-mono font-bold text-[10px] uppercase">
              Super Admin Mode
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
