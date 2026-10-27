"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types";
import {
  ShieldAlert,
  Users,
  UserCheck,
  FileText,
  Activity,
  LogOut,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

interface Props {
  user: User;
}

export default function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { label: "Executive Dashboard", href: "/admin", icon: ShieldAlert },
    { label: "Access Requests", href: "/admin/access-requests", icon: UserCheck },
    { label: "Investor Messages", href: "/admin/inquiries", icon: MessageSquare },
    { label: "Investor Directory", href: "/admin/investors", icon: Users },
    { label: "Document Registry", href: "/admin/documents", icon: FileText },
    { label: "Security Audit Log", href: "/admin/audit-log", icon: Activity },
  ];

  return (
    <aside className="w-full lg:w-72 bg-evergreen-dark text-ivory flex-shrink-0 flex flex-col border-r border-sand/20">
      {/* Brand Header */}
      <div className="p-6 border-b border-sand/20">
        <div className="flex items-center space-x-2 text-red-400 text-xs font-mono uppercase tracking-widest font-bold mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Admin Command Center</span>
        </div>
        <span className="font-serif text-lg font-bold tracking-wider text-ivory block">
          JONIK NDOVU FARM
        </span>

        {/* Admin User Card */}
        <div className="mt-4 p-3 bg-evergreen border border-sand/20">
          <span className="text-xs font-semibold text-ivory block">{user.name}</span>
          <span className="text-[11px] text-sand/80 font-mono block">{user.email}</span>
        </div>
      </div>

      {/* Nav */}
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
                  ? "bg-earth text-white font-bold shadow-sm"
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

        <div className="pt-4 mt-4 border-t border-sand/20 space-y-1">
          <Link
            href="/portal"
            className="flex items-center space-x-3 px-3.5 py-2 text-xs text-sand/80 hover:text-sand"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch to Investor Portal</span>
          </Link>
          <Link
            href="/"
            className="flex items-center space-x-3 px-3.5 py-2 text-xs text-sand/80 hover:text-sand"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Site</span>
          </Link>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-sand/20">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-2 text-xs uppercase tracking-wider text-ivory/70 hover:text-red-300 px-3 py-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin Console</span>
        </button>
      </div>
    </aside>
  );
}
