"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types";
import {
  LayoutDashboard,
  TrendingUp,
  Compass,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  MessageSquare,
  User as UserIcon,
  LogOut,
  ShieldAlert,
  Lock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Props {
  user: User;
}

export default function PortalSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard Overview", href: "/portal", icon: LayoutDashboard },
    { label: "Investment Case", href: "/portal/opportunity", icon: TrendingUp },
    { label: "Site & Development", href: "/portal/development", icon: Compass },
    { label: "Financials & Model", href: "/portal/financials", icon: FileSpreadsheet },
    { label: "Due Diligence", href: "/portal/due-diligence", icon: ShieldCheck },
    { label: "Document Library", href: "/portal/documents", icon: FileText },
    { label: "Inquiries & Meetings", href: "/portal/messages", icon: MessageSquare },
    { label: "My Profile", href: "/portal/profile", icon: UserIcon },
  ];

  const getTierBadge = () => {
    if (user.role === "admin") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase bg-red-800 text-white font-bold">
          Super Admin
        </span>
      );
    }
    if (user.role === "approved") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase bg-earth text-white font-bold">
          Tier 3 Approved
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase bg-sand text-evergreen font-bold">
        Tier 2 Registered
      </span>
    );
  };

  return (
    <aside className="w-full lg:w-72 bg-evergreen text-ivory flex-shrink-0 flex flex-col border-r border-sand/20">
      {/* Brand Header */}
      <div className="p-6 border-b border-sand/20">
        <Link href="/" className="block">
          <span className="font-serif text-lg font-bold tracking-wider text-ivory block">
            JONIK NDOVU FARM
          </span>
          <span className="text-[9px] tracking-[0.25em] text-sand/80 uppercase font-sans">
            Investor Portal
          </span>
        </Link>

        {/* User Card */}
        <div className="mt-4 p-3 bg-forest/60 border border-sand/20 flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-ivory truncate">{user.name}</span>
            {getTierBadge()}
          </div>
          <span className="text-[11px] text-sand/70 truncate">{user.email}</span>
          {user.organization && (
            <span className="text-[10px] text-ivory/60 truncate">{user.organization}</span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                isActive
                  ? "bg-earth text-white shadow-sm"
                  : "text-ivory/80 hover:bg-forest/50 hover:text-sand"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5" />}
            </Link>
          );
        })}

        {/* Admin Link if admin */}
        {user.role === "admin" && (
          <div className="pt-4 mt-4 border-t border-sand/20">
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-3.5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-forest text-sand hover:bg-forest-light transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Admin Console</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Footer / Sign Out */}
      <div className="p-4 border-t border-sand/20 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs text-sand/70 hover:text-sand px-3 py-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Public Website</span>
        </Link>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-2 text-xs uppercase tracking-wider text-ivory/70 hover:text-red-300 hover:bg-forest/40 px-3 py-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
