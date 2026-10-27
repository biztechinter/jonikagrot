import { getCurrentUser } from "@/lib/auth";
import { PROJECT_FACTS } from "@/data/projectData";
import CampaignTimetableCard from "@/components/campaign/CampaignTimetableCard";
import TierUpgradeModal from "@/components/portal/TierUpgradeModal";
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

      {/* Campaign Diligence Timetable */}
      <CampaignTimetableCard variant="portal" />

      {/* Tier 3 Diligence Elevation & NDA Status */}
      <TierUpgradeModal user={user} />

      {/* 90-Second Pitch Script */}
      <div className="bg-forest text-ivory p-6 sm:p-8 border border-forest-light shadow-elevated space-y-3">
        <span className="text-[10px] tracking-widest uppercase text-sand font-mono font-bold block">
          Executive Pitch Brief
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
          90-Second Executive Summary
        </h3>
        <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed font-light">
          “Jonik Ndovu Farm is a hospitality-led agro-tourism destination being developed in Segera, Laikipia County, Kenya. Situated directly at the threshold of world-renowned wildlife strongholds—bordering Lewa Wildlife Conservancy and Ol Pejeta Conservancy—the premise is to create an intimate 12–15 unit retreat where understated luxury, farm-to-table culinary authenticity, and premier rhino and predator safari access converge. Hospitality is our primary commercial engine; our closed-loop $980,000 greener bio-economy delivers over 35% utility and food opex savings alongside unforgettable guest immersion. We start from 8 unencumbered hectares already owned, with approximately 7 adjacent hectares proposed for acquisition within the US$2.4 million capital plan.”
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
              <strong>Safari & Conservancies:</strong> Direct adjacency to Lewa (UNESCO rhino stronghold, Grevy&apos;s zebra) and Ol Pejeta (largest black rhino sanctuary, apex predators), pairing big-game safaris with quiet farm immersion.
            </p>
            <p>
              <strong>Eat:</strong> Farm-informed seasonal menus pairing onsite organic harvests with local artisanal dairy, honey from our apiary, and wood-fired hearth baking.
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
              <strong>World-Class Conservation Halo:</strong> Bordering Lewa and Ol Pejeta captures premium safari circuit overflow and justifies top-tier boutique ADRs ($380–$560).
            </p>
            <p>
              <strong>Domestic Weekend Demand:</strong> Strong year-round drive-in demand from Nairobi professionals seeking tranquil nature retreats (malaria-free, ~1,800m ASL).
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

      {/* Circular Bio-Economy Capital Allocation Box */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-sand/30 gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-earth font-bold block">
              Ecosystem Economics
            </span>
            <h3 className="font-serif text-xl font-bold text-forest">
              Circular Bio-Economy & Productive Assets: US$980,000 (40.8%)
            </h3>
          </div>
          <span className="px-3 py-1 bg-forest text-sand text-xs font-mono font-bold uppercase">
            Over 40% of Capex
          </span>
        </div>
        <p className="text-xs text-charcoal/75 leading-relaxed">
          Unlike conventional hotels that treat utilities and landscaping as sunk overheads, Jonik Ndovu Farm deploys $980,000 into closed-loop assets that directly reduce lifecycle operating costs and generate new revenues:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Solar-Hybrid Microgrid ($160k)</span>
            <p className="text-[11px] text-charcoal/70">60 kWp solar PV + 120 kWh LiFePO4 batteries deliver near-zero fuel cost.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Circular Biogas ($80k)</span>
            <p className="text-[11px] text-charcoal/70">Converts manure and kitchen waste to pressurized cooking gas and bio-fertilizer.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Hydrology & Drip ($240k)</span>
            <p className="text-[11px] text-charcoal/70">10k L/hr solar borehole, 200kL tanks, and 5.3 ha automated drip irrigation.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Contour Swales ($120k)</span>
            <p className="text-[11px] text-charcoal/70">Earthworks retain soil moisture; agroforestry orchards yield fruit & shelter.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Animal Structures ($80k)</span>
            <p className="text-[11px] text-charcoal/70">Rotational sheep paddocks, poultry houses, dairy station, and 40+ apiary hives.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Clean Farm Fleet ($60k)</span>
            <p className="text-[11px] text-charcoal/70">Low-till tractors, compost spreaders, and zero-emission electric utility buggies.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Catering Kitchen ($160k)</span>
            <p className="text-[11px] text-charcoal/70">Commercial farm-to-table lodge kitchen, stone bakery, and solar walk-in chiller.</p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Farm Produce Shop ($80k)</span>
            <p className="text-[11px] text-charcoal/70">On-site boutique retail market selling branded honey, cold-pressed oils, and produce.</p>
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
