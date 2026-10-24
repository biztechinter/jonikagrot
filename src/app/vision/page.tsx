import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import { Compass, CheckCircle2, ArrowRight, Layers, Sun, Shield, FileText } from "lucide-react";

export const metadata = {
  title: "The Vision | Jonik Ndovu Farm",
  description: "Architectural philosophy, site planning, low-impact design, and agro-tourism masterplan logic for Jonik Ndovu Farm.",
};

export default function VisionPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1 pt-24">
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
                Landscape Deference
              </h3>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Rather than imposing heavy monumental structures, each accommodation unit is positioned following the natural contours of the 8-hectare holding, protecting indigenous trees and animal migratory pathways.
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
                    alt="Illustrative masterplan moodboard concept for Jonik Ndovu Farm"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                    Concept Visualisation
                  </div>
                </div>
                <p className="text-[11px] text-charcoal/60 text-center uppercase tracking-wider">
                  Illustrative concept plan — not an approved surveyed architectural drawing
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
