import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import PortalSidebar from "@/components/portal/PortalSidebar";
import InvestorOnboardingModal from "@/components/portal/InvestorOnboardingModal";

export const metadata = {
  title: "Investor Portal | Jonik Ndovu Farm",
  description: "Confidential investor data room and project briefs for Jonik Ndovu Farm.",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.status === "suspended") {
    redirect("/login?error=suspended");
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      <InvestorOnboardingModal user={user} />
      <PortalSidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-sand/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-charcoal/60">
            <span className="font-semibold text-forest uppercase tracking-wider">
              Jonik Ndovu Farm
            </span>
            <span>/</span>
            <span>Data Room</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="hidden sm:inline text-charcoal/60">Confidential Session:</span>
            <span className="font-mono text-forest bg-sand/30 px-2 py-0.5 font-semibold">
              {user.email}
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
