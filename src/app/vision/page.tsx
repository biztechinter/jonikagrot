import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import { Compass, CheckCircle2, ArrowRight, Layers, Sun, Shield, FileText, Flame, Droplets, ShoppingBag, Sprout, Utensils } from "lucide-react";

export const metadata = {
  title: "The Vision | Jonik Ndovu Farm",
  description: "Architectural philosophy, site planning, low-impact design, and agro-tourism masterplan logic for Jonik Ndovu Farm.",
};

export default function VisionPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 outline-none">
        {/* Header Hero Banner */}
        <section className="bg-evergreen text-ivory py-20 border-b border-sand/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              Development Philosophy
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              The Vision for Jonik Ndovu Farm
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
              Designing an intimate, low-density retreat where regenerative agriculture and understated hospitality exist in harmony with Laikipia's open savannah.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luxury-card p-8 space-y-4">
              <div className="w-12 h-12 bg-forest/10 flex items-center justify-center text-forest">
                <Compass className="w-6 h-6 text-earth" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Corridor & Landscape Deference
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Rather than imposing heavy monumental structures or impenetrable fortress fencing, each accommodation unit is positioned following natural contours, respecting the open wildlife corridors linking Segera to neighboring Lewa and Ol Pejeta conservancies.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <div className="w-12 h-12 bg-forest/10 flex items-center justify-center text-forest">
                <Layers className="w-6 h-6 text-earth" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Agro-Tourism Integration
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Agriculture is not an afterthought; organic permaculture gardens, heirloom orchards, and beekeeping are physically woven between guest pathways, providing both kitchen produce and rich educational guest experiences.
              </p>
            </div>

            <div className="luxury-card p-8 space-y-4">
              <div className="w-12 h-12 bg-forest/10 flex items-center justify-center text-forest">
                <Sun className="w-6 h-6 text-earth" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest">
                Ecological Sovereignty
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Independent solar-battery microgrid, borehole water supply supplemented by extensive rainwater harvesting, and bio-digester waste recycling engineered for complete off-grid reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Masterplan & Phasing Section */}
        <section className="py-16 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
                  Site Strategy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-4">
                  Landholding & Expansion Logic
                </h2>
                <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed font-light">
                  <p>
                    The project commences from a secure foundation of <strong>8 hectares already owned</strong> by the development team. To optimize spatial privacy and create expansive agro-forestry buffers, the acquisition of an <strong>additional ~7 adjacent hectares</strong> is proposed within the US$2.4 million capital plan.
                  </p>
                  <p>
                    Upon completion of the land transaction, the property will span approximately <strong>15 hectares (37 acres)</strong>, accommodating 12 to 15 discreet guest pavilions, central dining lounge, wellness deck, and 5+ hectares of productive agro-ecological cultivation.
                  </p>
                  <p className="text-xs text-charcoal/70 bg-sand/20 p-3.5 border-l-2 border-earth">
                    <strong>Contiguity with Premier Conservancies:</strong> Segera borders major neighboring wildlife zones in the Laikipia ecosystem, including Lewa Wildlife Conservancy and Ol Pejeta Conservancy. Our site planning incorporates permeable boundaries and natural bioswales, respecting historic elephant and predator migration routes across the Greater Ewaso ecosystem.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-sand/40 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 border border-sand/30">
                    <span className="text-[11px] uppercase tracking-wider text-earth font-bold">Phase 1 Basis</span>
                    <p className="font-serif text-lg font-bold text-forest mt-0.5">8 Hectares Core</p>
                    <p className="text-xs text-charcoal/60 mt-1">Infrastructure, primary suites, central lodge, kitchen gardens.</p>
                  </div>
                  <div className="bg-white p-4 border border-sand/30">
                    <span className="text-[11px] uppercase tracking-wider text-earth font-bold">Ultimate Scale</span>
                    <p className="font-serif text-lg font-bold text-forest mt-0.5">~15 Hectares</p>
                    <p className="text-xs text-charcoal/60 mt-1">Extended agro-forestry, walking trails, and conservation buffer.</p>
                  </div>
                </div>
              </div>

              {/* Masterplan Concept Image */}
              <div className="space-y-2">
                <div className="relative h-96 sm:h-[450px] border border-sand/50 shadow-card overflow-hidden">
                  <Image
                    src="/images/masterplan-concept.jpg"
                    alt="Illustrative masterplan layout for Jonik Ndovu Farm"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                    Conceptual Masterplan Footprint
                  </div>
                </div>
                <p className="text-[11px] text-charcoal/60 text-center uppercase tracking-wider">
                  Illustrative concept plan — subject to professional topographical survey and approvals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CIRCULAR AGRO-ECOLOGICAL SYSTEMS & PRODUCTIVE LAYOUT */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
                Closed-Loop Infrastructure
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Circular Agro-Ecological Architecture
              </h2>
              <p className="text-sm text-charcoal/75 leading-relaxed font-light">
                Our masterplan allocates US$980,000 (over 40% of the US$2.4M capital program) towards creating a self-sustaining ecological engine where clean energy, water security, organic livestock, farm machinery, commercial catering, and retail commerce reinforce each other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Sun className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Solar Microgrid</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">60 kWp / 120 kWh Storage</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Bifacial solar panels with automated solar tracking paired with LiFePO4 battery banks powering lodge suites and cold storage with zero fossil reliance.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Flame className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Circular Biogas</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Waste-to-Energy Digester</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Commercial anaerobic digester consuming animal manure and kitchen waste to produce pressurized cooking gas for the lodge kitchen plus nutrient-rich bio-slurry.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Droplets className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Hydrology & Drip</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Precision Irrigation</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  10k L/hr solar borehole feeding 200kL gravity storage tanks, automated drip lines across 5.3 ha, and constructed reed-bed wetlands treating greywater.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Compass className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Landscaping & Swales</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Keyline Earthworks</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Contour swales that intercept rainwater runoff, stabilizing soil moisture, combined with indigenous acacia shelterbelts and multi-canopy agroforestry orchards.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Sprout className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Livestock & Dairy</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Ethical Animal Structures</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Rotational sheep paddocks for holistic pasture regeneration, solarized milking dairy station, free-range poultry, and 40+ Langstroth apiary hives.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Layers className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Clean Farm Fleet</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Farm Machinery Depot</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Compact low-till tractors, compost spreaders, solar charging infrastructure, and silent zero-emission electric utility buggies for clean logistics.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <Utensils className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Catering Hub</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Commercial Lodge Kitchen</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  HACCP-compliant commercial lodge kitchen, stone sourdough hearth bakery, solar walk-in cold rooms, and charcuterie pantry supporting farm-to-table dining.
                </p>
              </div>

              <div className="p-6 bg-sand/15 border border-sand/40 space-y-2.5">
                <div className="flex items-center space-x-2 text-forest">
                  <ShoppingBag className="w-5 h-5 text-earth" />
                  <span className="text-xs font-mono font-bold uppercase">Farm Gate Market</span>
                </div>
                <h4 className="font-serif text-base font-bold text-forest">Farm Produce Sale Shop</h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Dedicated on-site retail boutique offering branded raw honey, artisanal oils, herbal teas, fruit preserves, and fresh farm hampers to guests and day visitors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Materiality */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
              Tactile Palette
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Materiality & Vernacular Design
            </h2>
            <p className="text-sm text-charcoal/70 mt-3">
              Constructed using indigenous masonry, sustainably sourced cedar, woven thatch, and muted canvas fabrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="luxury-card p-6 border-t-4 border-t-earth">
              <h4 className="font-serif text-lg font-bold text-forest mb-2">Laikipia Natural Stone</h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Hand-cut dry-stone walls delivering thermal mass to naturally regulate interior room temperatures between warm days and cool highland nights.
              </p>
            </div>

            <div className="luxury-card p-6 border-t-4 border-t-forest">
              <h4 className="font-serif text-lg font-bold text-forest mb-2">Certified Timbers</h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Sustainably harvested cedar and reclaimed hardwoods providing warm flooring, ceiling rafters, and panoramic shaded verandahs.
              </p>
            </div>

            <div className="luxury-card p-6 border-t-4 border-t-sand">
              <h4 className="font-serif text-lg font-bold text-forest mb-2">Highland Thatch</h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Thick pitched thatch roofs echoing classic East African safari architecture, offering acoustic quietness and superior insulation.
              </p>
            </div>

            <div className="luxury-card p-6 border-t-4 border-t-charcoal">
              <h4 className="font-serif text-lg font-bold text-forest mb-2">Glazed Openings</h4>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Floor-to-ceiling sliding glass panels creating uninterrupted vistas over the acacia plains while maintaining insect-free comfort.
              </p>
            </div>
          </div>

        </section>

        {/* CTA to Due Diligence */}
        <section className="py-16 bg-evergreen text-ivory text-center border-t border-sand/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Review the Conceptual Site & Design Brief
            </h2>
            <p className="text-sm text-ivory/80 leading-relaxed font-light">
              Registered and approved investors can download the full architectural design narrative, room spatial schedules, and planning pathway documents in our data room.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/investor-access"
                className="luxury-btn-gold text-xs !py-3 !px-7 tracking-widest flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Request Investor Access</span>
              </Link>
              <Link
                href="/investment"
                className="luxury-btn-outline !text-ivory !border-sand/40 hover:!border-sand text-xs !py-3 !px-7 tracking-widest"
              >
                View Investment Thesis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
