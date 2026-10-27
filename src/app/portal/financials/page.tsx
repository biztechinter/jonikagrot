import { getCurrentUser } from "@/lib/auth";
import { PROJECT_FACTS, SOURCES_AND_USES_ITEMS } from "@/data/projectData";
import { FileSpreadsheet, Download, AlertTriangle, Lock, CheckCircle2, Shield } from "lucide-react";
import Link from "next/link";
import TierUpgradeTrigger from "@/components/portal/TierUpgradeTrigger";

export default async function FinancialsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const isApproved = user.role === "approved" || user.role === "admin";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
          Diligence Brief · Section 03
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Financial Model & Capital Framework
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 max-w-2xl leading-relaxed">
          Illustrative 10-year pro-forma financials, room yield economics, and third-party verification schedule for the fixed US$2.4 million capital plan.
        </p>
      </div>

      {/* Model Caution Banner */}
      <div className="p-5 bg-amber-50 border-l-4 border-amber-600 text-xs text-amber-950 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold block uppercase tracking-wider">
            Important Financial Diligence Notice:
          </span>
          <p className="leading-relaxed">
            All financial assumptions and line-item allocations within the 10-year model are illustrative templates and working drafts. They must be validated against final contractor bids, quantity-surveyor cost plans, and hospitality operating agreements before binding capital commitments. No guaranteed returns are represented.
          </p>
        </div>
      </div>

      {/* Excel Download Card */}
      <div className="bg-forest text-ivory p-6 sm:p-8 border border-forest-light shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sand text-xs font-mono uppercase font-bold">
            <FileSpreadsheet className="w-4 h-4 text-earth" />
            <span>Interactive Financial Model (XLSX)</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-ivory">
            10-Year Illustrative Financial Model
          </h3>
          <p className="text-xs text-ivory/80 max-w-xl leading-relaxed font-light">
            Includes sheets: <em>Read Me</em>, <em>Inputs</em>, <em>10-Year Model</em>, <em>Sources & Uses</em>, and <em>Scenario Compare</em>.
          </p>
        </div>

        <div>
          {isApproved ? (
            <a
              href="/api/portal/documents/doc-07/download"
              className="luxury-btn-gold text-xs !py-3.5 !px-6 tracking-widest inline-flex items-center space-x-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Model (XLSX)</span>
            </a>
          ) : (
            <div className="p-4 bg-forest-dark border border-sand/30 text-xs text-sand space-y-2 text-right">
              <div className="flex items-center justify-end space-x-1.5 text-red-300 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Tier 3 Approved Clearance Required</span>
              </div>
              <p className="text-[11px] text-ivory/60 max-w-xs">
                Your current tier is Registered (Tier 2). Please request an administrative upgrade to unlock the financial spreadsheet.
              </p>
              {user.ndaAccepted ? (
                <div className="flex items-center justify-end space-x-1.5 text-amber-300 font-mono text-[11px] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>NDA Signed · Diligence Review Pending</span>
                </div>
              ) : (
                <TierUpgradeTrigger className="inline-block text-xs uppercase tracking-wider font-bold text-earth underline hover:text-sand cursor-pointer">
                  Request Tier Upgrade (Sign NDA)
                </TierUpgradeTrigger>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sources & Uses Verification Schedule */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sand/30 gap-2">
          <div>
            <h3 className="font-serif text-xl font-bold text-forest">
              Sources & Uses Verification Schedule
            </h3>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Target Capital: <strong>US$2,400,000</strong> (inclusive of proposed ~7 ha acquisition).
            </p>
          </div>
          <a
            href="/api/portal/documents/doc-08/download"
            className="text-xs text-forest hover:text-earth flex items-center space-x-1 font-semibold flex-shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Worksheet PDF</span>
          </a>
        </div>

        {/* Greener Ecosystem Banner */}
        <div className="p-4 bg-sand/20 border-l-4 border-earth text-xs space-y-1">
          <span className="font-bold text-forest block uppercase tracking-wider">
            Green Ecosystem & Productive Assets Allocation: US$980,000 (40.8% of Capex)
          </span>
          <p className="text-charcoal/75 leading-relaxed">
            Over 40% of the $2.4M capital program directly finances circular and productive assets: Solar Microgrid ($160k), Circular Biogas ($80k), Hydrology & Drip Irrigation ($240k), Contour Landscaping ($120k), Animal Structures ($80k), Clean Fleet ($60k), and Commercial Catering Kitchen & Farm Produce Shop ($240k).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-sand/30">
            <thead className="bg-sand/20 text-forest uppercase font-semibold tracking-wider">
              <tr>
                <th className="p-3 border-b border-sand/30">Capital Heading</th>
                <th className="p-3 border-b border-sand/30 text-right">Allocation</th>
                <th className="p-3 border-b border-sand/30 text-right">Share</th>
                <th className="p-3 border-b border-sand/30">Description & Scope</th>
                <th className="p-3 border-b border-sand/30">Required Third-Party Evidence</th>
                <th className="p-3 border-b border-sand/30">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20 text-charcoal/80">
              {SOURCES_AND_USES_ITEMS.map((item, idx) => (
                <tr key={idx} className="hover:bg-sand/10 transition-colors">
                  <td className="p-3 font-semibold text-forest whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="p-3 font-mono font-bold text-forest text-right whitespace-nowrap">
                    ${(item.allocationUSD).toLocaleString()}
                  </td>
                  <td className="p-3 font-mono text-earth text-right whitespace-nowrap">
                    {item.sharePct}
                  </td>
                  <td className="p-3 leading-relaxed max-w-xs">{item.notes}</td>
                  <td className="p-3 leading-relaxed text-charcoal/70">{item.evidenceRequired}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-sand/30 text-charcoal font-semibold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-forest text-ivory font-bold">
                <td className="p-3.5">TOTAL USES</td>
                <td className="p-3.5 text-right font-mono text-sand text-sm whitespace-nowrap">
                  US$2,400,000
                </td>
                <td className="p-3.5 text-right font-mono text-sand whitespace-nowrap">
                  100.0%
                </td>
                <td colSpan={2} className="p-3.5">
                  Reconciled against certified quantity surveyor cost plan and signed land contracts
                </td>
                <td className="p-3.5 whitespace-nowrap text-sand text-[11px] uppercase">
                  Turnkey Budget
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
