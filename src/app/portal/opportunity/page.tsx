import { getCurrentUser } from "@/lib/auth";
import { PROJECT_FACTS } from "@/data/projectData";
import { TrendingUp, CheckCircle2, Download, HelpCircle, FileText } from "lucide-react";

export default async function OpportunityPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const faqs = [
    {
      q: "What is the capital requirement?",
      a: "US$2.4 million in total, inclusive of the proposed acquisition of approximately 7 additional hectares. The line-item cost allocation is subject to quantity-surveyor benchmarking.",
    },
    {
      q: "How many accommodation units are planned?",
      a: "The current developer-surveyed brief is 12–15 units. An earlier 24-unit preliminary figure was superseded and is erroneous.",
    },
    {
      q: "What is the land status?",
      a: "8 hectares are already owned by the project sponsors (subject to customary title due diligence). Acquisition of approximately 7 adjacent hectares is currently being negotiated.",
    },
    {
      q: "What is the preferred fundraising structure?",
      a: "Identifying a credible lead equity partner or strategic hospitality group, then building a small aligned syndicate around a single diligence process.",
    },
    {
      q: "Are financial returns guaranteed?",
      a: "No. All financial projections in the 10-year model are illustrative templates and working drafts for investor evaluation. No returns are guaranteed.",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
          Diligence Brief · Section 01
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Master Investment Case & Strategy
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 max-w-2xl leading-relaxed">
          Comprehensive synthesis of the hospitality-led commercial thesis, revenue drivers, target guest segments, and operational architecture.
        </p>
      </div>

      {/* 90-Second Pitch Script */}
      <div className="bg-forest text-ivory p-6 sm:p-8 border border-forest-light shadow-elevated space-y-3">
        <span className="text-[10px] tracking-widest uppercase text-sand font-mono font-bold block">
          Executive Pitch Brief
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
          90-Second Executive Summary
        </h3>
        <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed font-light">
          “Jonik Ndovu Farm is a hospitality-led agro-tourism destination being developed in Segera, Laikipia County, Kenya. The premise is to create a boutique 12–15 unit destination where comfortable accommodation, farm-to-table dining, and authentic agricultural experiences form one compelling product. Hospitality is our commercial engine; agriculture provides differentiation, guest engagement, food authenticity, and landscape stewardship. We start from 8 hectares already owned, with approximately 7 additional hectares proposed for acquisition within the US$2.4 million capital plan.”
        </p>
      </div>

      {/* Detailed Thesis Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 border border-sand/40 space-y-3">
          <h3 className="font-serif text-lg font-bold text-forest">
            Concept Architecture
          </h3>
          <div className="space-y-2.5 text-xs text-charcoal/80">
            <p>
              <strong>Stay:</strong> 12–15 low-density suites built with natural stone and cedar, delivering high privacy, panoramic views, and low environmental disturbance.
            </p>
            <p>
              <strong>Eat:</strong> Farm-informed seasonal menus pairing onsite organic harvests with local artisanal dairy and pastoral ingredients.
            </p>
            <p>
              <strong>Experience:</strong> Guided agricultural walks, permaculture workshops, nature trails along the Ewaso riverine corridor, and quiet night-sky astronomy.
            </p>
            <p>
              <strong>Stewardship:</strong> Completely off-grid solar-battery microgrid, integrated rainwater harvesting, and community employment agreements.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 border border-sand/40 space-y-3">
          <h3 className="font-serif text-lg font-bold text-forest">
            Commercial Positioning & Demographics
          </h3>
          <div className="space-y-2.5 text-xs text-charcoal/80">
            <p>
              <strong>Resilient High-Yield Market:</strong> Laikipia commands strong average daily rates from international conservation and safari travelers.
            </p>
            <p>
              <strong>Domestic Weekend Demand:</strong> Strong year-round drive-in demand from Nairobi professionals seeking tranquil nature retreats.
            </p>
            <p>
              <strong>Diversified Revenue:</strong> Accommodation revenue supplemented by experiential dining covers, wellness retreats, and guided educational programs.
            </p>
            <p>
              <strong>Capital Discipline:</strong> Focused boutique scale avoids heavy overheads and high fixed operating costs associated with high-inventory resorts.
            </p>
          </div>
        </div>
      </div>

      {/* Investor FAQ Accordion/Cards */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-6">
        <div className="flex items-center space-x-2 pb-4 border-b border-sand/30">
          <HelpCircle className="w-5 h-5 text-earth" />
          <h2 className="font-serif text-xl font-bold text-forest">
            Frequently Asked Diligence Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-sand/15 border border-sand/30 space-y-1.5">
              <span className="text-xs font-bold text-forest block">
                {faq.q}
              </span>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Relevant Document Download */}
      <div className="p-6 bg-sand/30 border border-sand/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-earth flex-shrink-0" />
          <div>
            <h4 className="font-serif text-base font-bold text-forest">
              Download Full Master Investment Case (DOCX)
            </h4>
            <span className="text-xs text-charcoal/60">
              Jonik_Ndovu_Farm_V3_Master_Investment_Case.docx · 56 KB
            </span>
          </div>
        </div>

        <a
          href="/api/portal/documents/doc-04/download"
          className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-wider flex-shrink-0 flex items-center space-x-2"
        >
          <Download className="w-3.5 h-3.5 text-sand" />
          <span>Download Document</span>
        </a>
      </div>
    </div>
  );
}
