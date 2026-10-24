import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";
import { Compass, CheckCircle2, Download, Layers, ShieldCheck } from "lucide-react";

export default async function DevelopmentPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card">
        <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
          Diligence Brief · Section 02
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
          Site & Development Strategy
        </h1>
        <p className="text-xs text-charcoal/70 mt-1.5 max-w-2xl leading-relaxed">
          Spatial planning, land expansion parameters, and comparative analysis of phased versus coordinated development programmes.
        </p>
      </div>

      {/* Comparative Options: Phased vs Full Build */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option A */}
        <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-sand text-evergreen font-bold">
              Option A
            </span>
            <span className="text-xs text-charcoal/50">Phased Capital Deployment</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-forest">
            Phased Development Approach
          </h3>

          <div className="space-y-3 text-xs text-charcoal/75 leading-relaxed">
            <p>
              <strong>Phase 1:</strong> Secure the land expansion, install core utilities (borehole, solar-battery microgrid, perimeter access), establish primary agro-forestry terraces, and construct 8–10 guest suites with central dining lounge.
            </p>
            <p>
              <strong>Phase 2:</strong> Expand with remaining 4–5 guest suites, wellness deck, and extended activity facilities once initial occupancy stabilizes.
            </p>
            <div className="p-3 bg-sand/20 border-l-2 border-forest mt-2 space-y-1">
              <span className="font-semibold text-forest block">Strategic Trade-offs:</span>
              <p>Reduces upfront capital risk and allows market testing; however, introduces longer operational disturbance and higher overall mobilization costs.</p>
            </div>
          </div>
        </div>

        {/* Option B */}
        <div className="bg-white p-6 sm:p-8 border-2 border-earth/60 space-y-4 shadow-elevated">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-earth text-white font-bold">
              Option B
            </span>
            <span className="text-xs text-earth font-semibold">Recommended Base Case</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-forest">
            Full 12–15 Unit Coordinated Build
          </h3>

          <div className="space-y-3 text-xs text-charcoal/75 leading-relaxed">
            <p>
              <strong>Single Mobilization:</strong> Execute land acquisition, full infrastructure grid, complete 12–15 guest units, and comprehensive permaculture grounds in one unified 14–16 month construction timeline.
            </p>
            <p>
              <strong>Immediate Market Launch:</strong> Opens as a complete, premium destination with pristine guest quietness and full operational efficiency from day one.
            </p>
            <div className="p-3 bg-earth/10 border-l-2 border-earth mt-2 space-y-1">
              <span className="font-semibold text-forest block">Strategic Trade-offs:</span>
              <p>Requires full US$2.4M capital commitment at closing, but maximizes operational economics, brand reputation, and avoids construction noise during guest stays.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Direction Board Preview */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
        <h3 className="font-serif text-xl font-bold text-forest">
          Site Visual Direction & Masterplan Moodboard
        </h3>
        <p className="text-xs text-charcoal/70">
          The image below represents the conceptual design brief for spatial zoning, material palettes, and landscape integration.
        </p>

        <div className="relative h-80 sm:h-[420px] border border-sand/40 overflow-hidden">
          <Image
            src="/images/moodboard-concept.png"
            alt="Illustrative visual direction moodboard for Jonik Ndovu Farm"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
            Illustrative Visual Direction · Not an approved architectural plan
          </div>
        </div>
      </div>

      {/* Download Action */}
      <div className="p-6 bg-sand/30 border border-sand/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-base font-bold text-forest">
            Download Conceptual Site & Design Brief (DOCX)
          </h4>
          <span className="text-xs text-charcoal/60">
            Jonik_Ndovu_Farm_V3_Conceptual_Site_Design_Brief.docx · 52 KB
          </span>
        </div>

        <a
          href="/api/portal/documents/doc-05/download"
          className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-wider flex-shrink-0 flex items-center space-x-2"
        >
          <Download className="w-3.5 h-3.5 text-sand" />
          <span>Download Site Brief</span>
        </a>
      </div>
    </div>
  );
}
