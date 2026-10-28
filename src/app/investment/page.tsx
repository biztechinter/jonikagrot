import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CampaignTimetableCard from "@/components/campaign/CampaignTimetableCard";
import { PROJECT_FACTS, SOURCES_AND_USES_ITEMS } from "@/data/projectData";
import { Shield, CheckCircle2, ArrowRight, Lock, FileSpreadsheet, Layers, PieChart, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Investment Proposition & Capital Strategy",
  description:
    "Public investment overview for Jonik Ndovu Farm: US$2.4M capital requirement, 12–15 boutique suites, regenerative bio-economy in Segera Laikipia, and accredited diligence pathway.",
  alternates: {
    canonical: "/investment",
  },
};

const investmentFaqs = [
  {
    q: "What is the capital requirement for Jonik Ndovu Farm?",
    a: "The total capital requirement is US$2.4 million, allocated across boutique lodge infrastructure ($980,000 / 40.8%), off-grid bio-economy & agro-forestry ($420,000 / 17.5%), land acquisition & titles ($400,000 / 16.7%), working capital ($350,000 / 14.6%), and contingency ($250,000 / 10.4%).",
  },
  {
    q: "Where is the property situated in Kenya?",
    a: "Jonik Ndovu Farm is situated in Segera, Laikipia County, Kenya, at an elevation of ~1,800m, bordering the renowned Lewa Wildlife Conservancy and Ol Pejeta Conservancy in the Greater Ewaso wildlife corridor.",
  },
  {
    q: "How many accommodation units are planned for the lodge?",
    a: "The development plans an intimate, low-density 12 to 15 key boutique luxury eco-lodge (accommodating 24 to 30 guests maximum) ensuring low environmental footprint, high average daily rates (ADR), and personalized culinary and safari immersion.",
  },
  {
    q: "What is the land ownership status and expansion strategy?",
    a: "8 hectares are currently owned by the project sponsors (subject to customary title verification). Acquisition of approximately 7 adjacent hectares is currently under negotiation to establish a contiguous 15-hectare regenerative stewardship buffer.",
  },
  {
    q: "How do accredited investors access confidential financial models?",
    a: "Accredited investors and institutional funds can register via the Investor Access portal, execute an electronic NDA, and obtain credentials to review the data room, 10-year financial model, and architectural drawings.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: investmentFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function InvestmentPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 outline-none">
        {/* Hero Section */}
        <section className="bg-evergreen text-ivory py-20 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-forest border border-sand/30 text-sand text-xs tracking-widest uppercase">
              <Shield className="w-3.5 h-3.5 text-earth" />
              <span>Investment Overview</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              The Investment Proposition
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
              An opportunity to participate in developing a distinctive hospitality-led agro-tourism destination in Segera, Laikipia County, Kenya.
            </p>
          </div>
        </section>

        {/* Campaign Allocation & Diligence Timetable */}
        <section className="pt-12 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CampaignTimetableCard variant="public" />
        </section>

        {/* Executive Investment Thesis */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
              Core Commercial Proposition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Why Jonik Ndovu Farm?
            </h2>
            <p className="text-base text-charcoal/75 leading-relaxed font-light">
              Boutique hospitality provides the principal commercial engine, while integrated regenerative agriculture and direct adjacency to premier wildlife sanctuaries (Lewa and Ol Pejeta) create an irreproducible competitive moat and premium ADR pricing power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="luxury-card p-8 space-y-4">
              <span className="text-xs font-bold text-earth tracking-widest uppercase">01 / Positioning</span>
              <h3 className="font-serif text-xl font-bold text-forest">Hospitality-Led Economics</h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Accommodation yields, destination dining, wellness retreats, and curated agricultural activities form the primary revenue streams, establishing robust operating margins.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <span className="text-xs font-bold text-earth tracking-widest uppercase">02 / Scale</span>
              <h3 className="font-serif text-xl font-bold text-forest">Boutique 12–15 Units</h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                A disciplined, low-density scale designed for high average daily rates (ADR), personal service, and environmental sustainability, avoiding the commodity risks of large-scale resort assets.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <span className="text-xs font-bold text-earth tracking-widest uppercase">03 / Land Strategy</span>
              <h3 className="font-serif text-xl font-bold text-forest">8 ha Owned + ~7 ha Proposed</h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                The development starts from 8 unencumbered hectares already owned. The US$2.4M target funds acquisition of ~7 adjacent hectares to secure an indicative ~15-hectare total sanctuary.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <span className="text-xs font-bold text-earth tracking-widest uppercase">04 / Phasing Flexibility</span>
              <h3 className="font-serif text-xl font-bold text-forest">Tested Execution Options</h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Both a phased build (Phase 1 core + Phase 2 expansion) and a single coordinated build have been structured within our illustrative 10-year model for investor review.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <span className="text-xs font-bold text-earth tracking-widest uppercase">05 / Wildlife Proximity</span>
              <h3 className="font-serif text-xl font-bold text-forest">Bordering Lewa & Ol Pejeta</h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Segera borders world-renowned rhino and predator sanctuaries (Lewa Wildlife Conservancy and Ol Pejeta Conservancy), generating strong halo guest demand from global safari travelers and Nairobi weekenders.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <span className="text-xs font-bold text-earth tracking-widest uppercase">06 / Governance</span>
              <h3 className="font-serif text-xl font-bold text-forest">Institutional Diligence</h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Data room equipped with title verification check-lists, NEMA planning roadmaps, quantity-surveyor cost benchmarking, and transparent risk registers.
              </p>
            </div>
          </div>
        </section>

        {/* Capital Requirement & Framework */}
        <section className="py-20 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
                  Capital Planning
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                  US$2.4 Million Total Requirement
                </h2>
                <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed font-light">
                  <p>
                    The overall capital requirement of <strong>US$2.4 million</strong> has been established to take the project from current concept design through land acquisition, infrastructure installation, construction of 12–15 guest units, pre-opening working capital, and contingency.
                  </p>
                  <p>
                    In accordance with prudent real estate standards, the line-by-line allocation between categories is subject to reconciliation with a certified Quantity Surveyor (QS) cost plan and negotiated vendor pricing before investor subscription.
                  </p>
                </div>

                <div className="p-5 bg-white border border-sand/40 space-y-3">
                  <div className="flex items-center space-x-2 text-forest font-serif font-bold text-lg">
                    <FileSpreadsheet className="w-5 h-5 text-earth" />
                    <span>Sources & Uses Evidence Framework</span>
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Our data room includes the formal <em>Sources & Uses Verification Worksheet</em> mapping each expenditure heading to required third-party verification evidence.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/investor-access"
                      className="text-xs uppercase tracking-wider font-semibold text-earth hover:text-forest flex items-center space-x-1"
                    >
                      <span>Request access to Financial Model & Worksheet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Capital Headings Table */}
              <div className="bg-white border border-sand/50 shadow-card p-6 sm:p-8">
                <div className="flex items-center justify-between pb-3 border-b border-sand/30 mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest">
                      Capital Allocation Headings
                    </h3>
                    <span className="text-xs text-charcoal/60">Fixed US$2.4M Turnkey Development Budget</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 bg-forest text-sand">
                    12 Categories
                  </span>
                </div>

                {/* Greener Ecosystem Highlight Box */}
                <div className="mb-4 p-4 bg-sand/20 border-l-4 border-earth text-xs space-y-1">
                  <span className="font-bold text-forest block uppercase tracking-wider">
                    Green Ecosystem & Productive Assets Subtotal: US$980,000 (40.8%)
                  </span>
                  <p className="text-charcoal/75 leading-relaxed">
                    Over 40% of capital is deployed into circular infrastructure: solar-hybrid microgrid ($160k), circular biogas ($80k), precision irrigation ($240k), contour landscaping ($120k), animal structures ($80k), farm machinery ($60k), and catering hub & produce shop ($240k).
                  </p>
                </div>

                <div className="divide-y divide-sand/20">
                  {SOURCES_AND_USES_ITEMS.map((item, idx) => (
                    <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-sm font-semibold text-forest">
                          {item.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-earth">
                            ${(item.allocationUSD).toLocaleString()} ({item.sharePct})
                          </span>
                          <span className="text-[10px] font-mono bg-sand/30 text-charcoal/80 px-2 py-0.5 rounded-none uppercase">
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                        {item.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Evaluation Process */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
              Structured Roadmap
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              The Investor Onboarding Process
            </h2>
            <p className="text-sm text-charcoal/70 mt-3">
              We guide qualified prospective partners through a disciplined, transparent evaluation timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-sand/40 relative">
              <span className="text-2xl font-serif font-bold text-earth/50">01</span>
              <h4 className="font-serif text-lg font-bold text-forest mt-2 mb-2">
                Registration & NDA
              </h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Submit an accreditation request via our Investor Access portal and agree to confidential evaluation terms.
              </p>
            </div>

            <div className="p-6 bg-white border border-sand/40 relative">
              <span className="text-2xl font-serif font-bold text-earth/50">02</span>
              <h4 className="font-serif text-lg font-bold text-forest mt-2 mb-2">
                Tier 2 Review
              </h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Gain immediate access to executive briefings, project visual boards, and master investment documentation.
              </p>
            </div>

            <div className="p-6 bg-white border border-sand/40 relative">
              <span className="text-2xl font-serif font-bold text-earth/50">03</span>
              <h4 className="font-serif text-lg font-bold text-forest mt-2 mb-2">
                Admin Diligence Approval
              </h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                The sponsorship team reviews qualifications and grants Tier 3 access to financial models and title records.
              </p>
            </div>

            <div className="p-6 bg-white border border-sand/40 relative">
              <span className="text-2xl font-serif font-bold text-earth/50">04</span>
              <h4 className="font-serif text-lg font-bold text-forest mt-2 mb-2">
                Term Sheet & Structuring
              </h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Participate in sponsor meetings, discuss indicative term sheet options, and align on syndication terms.
              </p>
            </div>
          </div>
        </section>

        {/* Investment FAQs & Structured Data for Search Engine Indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <section className="py-16 bg-white border-b border-sand/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-ivory border border-sand/40 text-forest text-xs tracking-widest uppercase">
                <HelpCircle className="w-3.5 h-3.5 text-earth" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                Investment & Due Diligence Clarifications
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 max-w-xl mx-auto">
                Key questions addressed for private equity sponsors, family offices, and institutional investors.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {investmentFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-ivory/50 border border-sand/40 hover:border-sand transition-colors"
                >
                  <h3 className="font-serif text-base font-bold text-forest flex items-start space-x-3">
                    <span className="text-earth font-mono text-sm">0{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed mt-2.5 pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer Card */}
        <section className="py-12 bg-ivory max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-white border border-sand/60 text-xs text-charcoal/70 leading-relaxed space-y-2">
            <p className="font-semibold uppercase tracking-wider text-charcoal">
              Regulatory & Legal Notice:
            </p>
            <p>{PROJECT_FACTS.disclaimer}</p>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-evergreen text-ivory text-center border-t border-sand/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-serif text-3xl font-bold">
              Ready to Evaluate the Opportunity?
            </h2>
            <p className="text-sm text-ivory/80 max-w-lg mx-auto">
              Request credentials to review the complete data room index, illustrative financial statements, and conceptual site brief.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/investor-access"
                className="luxury-btn-gold text-xs !py-3.5 !px-8 tracking-widest flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Request Investor Access</span>
              </Link>
              <Link
                href="/login"
                className="luxury-btn-outline !text-ivory !border-sand/40 hover:!border-sand text-xs !py-3.5 !px-8 tracking-widest flex items-center justify-center space-x-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In to Existing Account</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
