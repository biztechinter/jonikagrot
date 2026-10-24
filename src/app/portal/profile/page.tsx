import { getCurrentUser } from "@/lib/auth";
import { User, Shield, CheckCircle2, Clock } from "lucide-react";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
          Account Credentials
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Investor Profile & Accreditation
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
          Manage your contact credentials and view current data room accreditation status.
        </p>
      </div>

      {/* Profile Card */}
      <div className="luxury-card p-6 sm:p-8 space-y-6">
        <h2 className="font-serif text-xl font-bold text-forest pb-3 border-b border-sand/20">
          Personal & Entity Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-charcoal/50 uppercase tracking-wider font-semibold block">Full Name</span>
            <p className="font-serif text-base font-bold text-forest">{user.name}</p>
          </div>

          <div className="space-y-1">
            <span className="text-charcoal/50 uppercase tracking-wider font-semibold block">Business Email</span>
            <p className="font-mono text-sm text-charcoal">{user.email}</p>
          </div>

          <div className="space-y-1">
            <span className="text-charcoal/50 uppercase tracking-wider font-semibold block">Organization</span>
            <p className="text-sm text-charcoal">{user.organization || "Private Individual"}</p>
          </div>

          <div className="space-y-1">
            <span className="text-charcoal/50 uppercase tracking-wider font-semibold block">Country of Domicile</span>
            <p className="text-sm text-charcoal">{user.country || "Not specified"}</p>
          </div>

          <div className="space-y-1">
            <span className="text-charcoal/50 uppercase tracking-wider font-semibold block">Investor Category</span>
            <p className="text-sm text-charcoal">{user.category || "General Investor"}</p>
          </div>

          <div className="space-y-1">
            <span className="text-charcoal/50 uppercase tracking-wider font-semibold block">Target Interest</span>
            <p className="text-sm text-charcoal">{user.interest || "Equity"}</p>
          </div>
        </div>

        {/* Accreditation Tier Box */}
        <div className="p-5 bg-sand/20 border border-sand/40 space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold text-forest">
              Data Room Clearance Level
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono uppercase bg-forest text-sand font-bold">
              {user.role}
            </span>
          </div>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            {user.role === "approved" || user.role === "admin"
              ? "You hold Tier 3 clearance. You have unrestricted access to all 15 Version 3.0 files including 10-Year Excel models, preliminary QS budgets, and land contracts."
              : "You hold Tier 2 Registered clearance. You have access to Executive Briefs and Teasers. To access full financial models and title records, request Tier 3 clearance."}
          </p>
        </div>
      </div>
    </div>
  );
}
