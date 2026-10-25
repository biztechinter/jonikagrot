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

      {/* Spatial Zoning of Greener Ecosystem & Productive Assets */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sand/30 gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase text-earth font-bold block">
              Masterplan Allocation
            </span>
            <h3 className="font-serif text-xl font-bold text-forest">
              Spatial Zoning of Greener Ecosystem & Productive Assets
            </h3>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Integrated across the owned 8 ha platform and proposed ~7 ha expansion parcel (15.0 ha total).
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-forest text-sand uppercase">
            US$980k Allocated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-sand/30">
            <thead className="bg-sand/20 text-forest uppercase font-semibold tracking-wider">
              <tr>
                <th className="p-3 border-b border-sand/30">Ecological / Productive Asset</th>
                <th className="p-3 border-b border-sand/30">Spatial Footprint</th>
                <th className="p-3 border-b border-sand/30">Capital Budget</th>
                <th className="p-3 border-b border-sand/30">Operational Role & Integration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20 text-charcoal/80">
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Solar-Hybrid Microgrid</td>
                <td className="p-3 font-mono">0.40 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$160,000</td>
                <td className="p-3">60 kWp ground solar PV array + 120 kWh LiFePO4 battery bank powering resort & cold chain.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Circular Biogas Digester</td>
                <td className="p-3 font-mono">0.30 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$80,000</td>
                <td className="p-3">Closed-loop bio-digester converting livestock manure & kitchen waste into cooking gas & bio-slurry.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Hydrology & Precision Drip</td>
                <td className="p-3 font-mono">5.30 ha (Net)</td>
                <td className="p-3 font-mono text-earth font-bold">$240,000</td>
                <td className="p-3">10k L/hr solar borehole, 200,000L storage, automated drip network & reed-bed wetland greywater loop.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Contour Swales & Landscaping</td>
                <td className="p-3 font-mono">2.50 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$120,000</td>
                <td className="p-3">Keyline swales for moisture retention, acacia windbreak shelterbelts, and multi-tier fruit orchards.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Animal Structures & Apiary</td>
                <td className="p-3 font-mono">1.80 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$80,000</td>
                <td className="p-3">Rotational sheep paddocks, poultry housing, solarized milking dairy station, and 40+ Langstroth hives.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Farm Machinery & Electric Fleet</td>
                <td className="p-3 font-mono">0.20 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$60,000</td>
                <td className="p-3">Maintenance depot, compact low-till tractors, compost spreaders, and solar EV utility buggies.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Commercial Catering Kitchen & Bakery</td>
                <td className="p-3 font-mono">0.40 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$160,000</td>
                <td className="p-3">Farm-to-fork commercial kitchen, sourdough stone-hearth bakery, cold-chain storage, curing larder.</td>
              </tr>
              <tr className="hover:bg-sand/10">
                <td className="p-3 font-semibold text-forest">Farm Produce Sale Shop</td>
                <td className="p-3 font-mono">0.30 ha</td>
                <td className="p-3 font-mono text-earth font-bold">$80,000</td>
                <td className="p-3">On-site boutique farm market selling honey, cold-pressed oils, herbal teas, preserves, and gift baskets.</td>
              </tr>
              <tr className="bg-sand/30 font-bold text-forest">
                <td className="p-3">SUBTOTAL GREEN ASSETS</td>
                <td className="p-3 font-mono">11.20 ha (Shared)</td>
                <td className="p-3 font-mono text-forest">$980,000</td>
                <td className="p-3">40.8% of Total US$2.4M Capital Budget</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Neighboring Conservancies & Migration Corridor Card */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-4">
        <div className="flex items-center space-x-2 text-forest">
          <ShieldCheck className="w-5 h-5 text-earth flex-shrink-0" />
          <h3 className="font-serif text-xl font-bold text-forest">
            Neighboring Wildlife Conservancies & Corridor Permeability
          </h3>
        </div>
        <p className="text-xs text-charcoal/75 leading-relaxed">
          Segera borders major neighboring wildlife zones in the Laikipia ecosystem, including <strong>Lewa Wildlife Conservancy</strong> (UNESCO World Heritage site, pioneering rhino stronghold, Grevy&apos;s zebra sanctuary) and <strong>Ol Pejeta Conservancy</strong> (East Africa&apos;s largest black rhino sanctuary and highest predator density in Kenya).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Corridor-Friendly Permeability</span>
            <p className="text-[11px] text-charcoal/70">
              The 15 ha masterplan avoids fortress game fencing, utilizing vegetative hedgerows and bee-fence deterrents that safeguard organic crops while allowing regional plains game and elephants to transit harmlessly.
            </p>
          </div>
          <div className="p-3.5 bg-sand/15 border border-sand/30 space-y-1">
            <span className="text-[11px] font-bold text-forest block">Strategic Commercial Differentiator</span>
            <p className="text-[11px] text-charcoal/70">
              Combines morning big-game safaris at neighboring Lewa and Ol Pejeta with midday farm-to-table culinary engagement, yielding a distinctive value proposition unavailable at conventional safari lodges.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Direction & Concept Renders */}
      <div className="bg-white p-6 sm:p-8 border border-sand/40 space-y-6">
        <div>
          <span className="text-[11px] font-mono uppercase text-earth font-bold block mb-1">
            Visual Diligence Material
          </span>
          <h3 className="font-serif text-xl font-bold text-forest">
            Concept Renders & Spatial Moodboard
          </h3>
          <p className="text-xs text-charcoal/70 mt-1">
            Visual reference materials submitted as part of the initial conceptual review package.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="relative h-64 sm:h-72 border border-sand/40 overflow-hidden shadow-subtle">
              <Image
                src="/images/masterplan-concept.jpg"
                alt="Masterplan Concept Plan"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                Masterplan Footprint
              </div>
            </div>
            <span className="text-xs font-semibold text-forest block">Site Zoning & Spatial Arrangement</span>
            <p className="text-[11px] text-charcoal/70">Reflects 12–15 unit core, buffer zones, and agricultural terraces.</p>
          </div>

          <div className="space-y-2">
            <div className="relative h-64 sm:h-72 border border-sand/40 overflow-hidden shadow-subtle">
              <Image
                src="/images/cover-visual.jpg"
                alt="Architectural Materiality & Concept Render"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-forest text-sand text-[10px] tracking-widest uppercase px-2.5 py-1 font-mono font-bold">
                Design Language
              </div>
            </div>
            <span className="text-xs font-semibold text-forest block">Materiality & Pavilion Design</span>
            <p className="text-[11px] text-charcoal/70">Stone, timber, and canvas architectural direction.</p>
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
