import { getCurrentUser } from "@/lib/auth";
import { ShieldCheck, CheckCircle2, Download, FileText, AlertCircle } from "lucide-react";

export default async function DueDiligencePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const dataRoomSections = [
    {
      title: "A. Corporate & Ownership",
      items: [
        "Project company incorporation and constitutional documents",
        "Shareholder register and beneficial ownership breakdown",
        "Director profiles, management IDs, and governance framework",
        "Kenya Revenue Authority (KRA) tax registration and compliance evidence",
      ],
      status: "In Data Room",
    },
    {
      title: "B. Land & Title Diligence",
      items: [
        "Certified official land registry search and deed plan for owned 8 ha",
        "Boundary and topographic survey by registered surveyor",
        "Draft Sale & Purchase Agreement for proposed ~7 ha acquisition",
        "Encumbrance check, county rates clearance, and road access easements",
      ],
      status: "Verification In Progress",
    },
    {
      title: "C. Technical, Planning & Environmental",
      items: [
        "National Environment Management Authority (NEMA) Project Report & License",
        "County Government of Laikipia physical planning change-of-user approvals",
        "Hydrological survey, borehole drilling permit, and water quality laboratory assay",
        "Geotechnical soil load-bearing analysis for lodge pavilion foundations",
      ],
      status: "Consultant Brief Active",
    },
    {
      title: "D. Commercial & Market Context",
      items: [
        "Laikipia luxury safari competitor benchmark (Rates, Occupancy, Inclusions)",
        "Target guest demographics: international conservationists vs domestic weekenders",
        "Hospitality operator management proposals and fee benchmarks",
      ],
      status: "In Data Room",
    },
    {
      title: "E. Financial Model & Cost Control",
      items: [
        "10-Year Illustrative Financial Model (XLSX)",
        "Sources & Uses Verification Worksheet ($2.4M target reconciliation)",
        "Quantity Surveyor (QS) independent preliminary cost plan",
        "Pre-opening staffing and working capital runway schedule",
      ],
      status: "Model Prepared",
    },
    {
      title: "F. Investment Governance & Terms",
      items: [
        "Indicative Term-Sheet Framework (Discussion draft)",
        "Board representation and reserved matters schedule",
        "Information rights, reporting frequency, and pre-emption rights",
      ],
      status: "In Data Room",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
          Diligence Brief · Section 04
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Due Diligence Index & Status Tracker
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 max-w-2xl leading-relaxed">
          Structured index of legal, regulatory, technical, and commercial due diligence materials compiled for institutional and private investor review.
        </p>
      </div>

      {/* Grid of Data Room Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataRoomSections.map((sec, idx) => (
          <div key={idx} className="luxury-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-sand/20">
                <h3 className="font-serif text-base font-bold text-forest">{sec.title}</h3>
                <span className="text-[9px] font-mono uppercase bg-sand/30 text-charcoal/80 px-2 py-0.5 font-bold">
                  {sec.status}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-charcoal/75">
                {sec.items.map((it, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-earth flex-shrink-0 mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Checklist Downloads */}
      <div className="p-6 bg-sand/30 border border-sand/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-base font-bold text-forest">
            Download Reconciliation & Diligence Checklist (DOCX)
          </h4>
          <span className="text-xs text-charcoal/60">
            Jonik_Ndovu_Farm_V3_Reconciliation_Diligence_Checklist.docx · 44 KB
          </span>
        </div>

        <a
          href="/api/portal/documents/doc-10/download"
          className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-wider flex-shrink-0 flex items-center space-x-2"
        >
          <Download className="w-3.5 h-3.5 text-sand" />
          <span>Download Checklist</span>
        </a>
      </div>
    </div>
  );
}
