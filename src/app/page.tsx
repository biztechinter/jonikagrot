import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import {
  ArrowRight,
  Shield,
  Sparkles,
  Compass,
  Sprout,
  Utensils,
  Sun,
  Trees,
  CheckCircle2,
  FileText,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-evergreen text-ivory pt-20">
          {/* Background Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-lodge.jpg"
              alt="Jonik Ndovu Farm illustrative concept lodge overlooking the savannah in Segera, Laikipia"
              fill
              priority
              className="object-cover object-center scale-105 animate-fade-in transition-transform duration-1000"
            />
            {/* Multi-stage Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-evergreen via-evergreen/40 to-evergreen/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-sand/30 bg-evergreen/60 backdrop-blur-md mb-6 text-sand text-xs tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-earth" />
              <span>Segera · Laikipia County · Kenya</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ivory max-w-4xl mx-auto leading-[1.12] mb-6">
              A Distinctive Destination in the Landscapes of Laikipia.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-ivory/85 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Envisioning a hospitality-led agro-tourism destination where considered accommodation, the African landscape, and meaningful agricultural experiences come together.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link
                href="/vision"
                className="luxury-btn-primary w-full sm:w-auto !py-4 !px-8 text-xs tracking-widest flex items-center justify-center space-x-2 shadow-elevated"
              >
                <span>Explore the Vision</span>
                <ArrowRight className="w-4 h-4 text-sand" />
              </Link>

              <Link
                href="/investment"
                className="luxury-btn-outline !text-ivory !border-sand/40 hover:!border-sand w-full sm:w-auto !py-4 !px-8 text-xs tracking-widest flex items-center justify-center space-x-2"
              >
                <span>Explore the Investment</span>
              </Link>
            </div>

            {/* Concept Image Note */}
            <p className="mt-8 text-[11px] text-ivory/50 uppercase tracking-widest">
              Illustrative AI concept visualization · Not an approved architectural plan
            </p>
          </div>
        </section>

        {/* FACTUAL PROJECT SNAPSHOT */}
        <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-sand/50 shadow-elevated grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sand/30">
            {/* Metric 1 */}
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-earth font-semibold mb-1">
                Total Capital Requirement
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-1.5">
                {PROJECT_FACTS.capitalRequirement.formatted}
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Includes proposed land expansion, infrastructure, 12–15 units, and contingency.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-earth font-semibold mb-1">
                Existing Landholding
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-1.5">
                8 Hectares
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Already owned by the project sponsors (subject to customary legal diligence).
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-earth font-semibold mb-1">
                Proposed Expansion
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-1.5">
                ~7 Hectares
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Adjacent land proposed for acquisition, creating an indicative ~15 ha ultimate holding.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-earth font-semibold mb-1">
                Planned Accommodation
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-1.5">
                12–15 Units
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Boutique, low-density scale designed for high guest privacy and low environmental impact.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECT INTRODUCTION */}
        <section className="py-20 lg:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-3">
            Hospitality-Led Agro-Tourism
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest leading-tight mb-6">
            Where thoughtful accommodation, organic agriculture, and the Laikipia wilderness meet.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-light">
            <p>
              Jonik Ndovu Farm is planned as a small, memorable destination in Segera, Laikipia County, Kenya. The guiding ambition is to anchor the business in boutique hospitality while weaving productive permaculture gardens, food sourcing, and nature interpretation seamlessly into every guest stay.
            </p>
            <p className="text-sm text-charcoal/60">
              Unlike generic safari resorts or purely commercial farms, Jonik Ndovu Farm unites both disciplines into an intimate retreat of 12 to 15 suites, offering guests quiet immersion in Kenya's highland savannah and regenerative agriculture.
            </p>
          </div>
        </section>

        {/* EXPERIENCE CARDS */}
        <section className="py-16 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
                Proposed Guest Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                The Jonik Ndovu Experience
              </h2>
              <p className="text-sm text-charcoal/70 mt-3">
                Every dimension of the planned destination is designed to foster connection, relaxation, and sensory engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Accommodation */}
              <div className="luxury-card flex flex-col group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/suite-interior.jpg"
                    alt="Illustrative concept of luxury accommodation suite at Jonik Ndovu Farm"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-evergreen/80 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                    Proposed Concept
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest mb-2">
                      Thoughtful Accommodation
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed">
                      12–15 low-impact eco-suites built with local stone, sustainable cedar, and natural canvas, oriented toward panoramic savannah views and Mount Kenya.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-sand/20">
                    <span className="text-xs uppercase tracking-wider text-earth font-medium flex items-center space-x-1">
                      <span>Low-density privacy</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Dining */}
              <div className="luxury-card flex flex-col group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/farm-dining.jpg"
                    alt="Illustrative concept of farm-to-table dining terrace at Jonik Ndovu Farm"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-evergreen/80 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                    Proposed Concept
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest mb-2">
                      Farm-to-Table Dining
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed">
                      Menus informed by daily garden harvests, pairing freshly harvested heritage vegetables and herbs with artisanal Kenyan farm ingredients.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-sand/20">
                    <span className="text-xs uppercase tracking-wider text-earth font-medium flex items-center space-x-1">
                      <span>Artisanal culinary narrative</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Nature & Landscape */}
              <div className="luxury-card flex flex-col group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/landscape-nature.jpg"
                    alt="Panoramic landscape of Segera Laikipia with acacia trees and distant wildlife"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-evergreen/80 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                    Destination Context
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest mb-2">
                      Landscape & Stewardship
                    </h3>
                    <p className="text-sm text-charcoal/75 leading-relaxed">
                      Situated within the Greater Ewaso wildlife corridor, emphasizing habitat conservation, indigenous flora restoration, and peaceful contemplation.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-sand/20">
                    <span className="text-xs uppercase tracking-wider text-earth font-medium flex items-center space-x-1">
                      <span>Ecosystem protection</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/experience"
                className="luxury-btn-outline text-xs tracking-widest inline-flex items-center space-x-2"
              >
                <span>View Full Experience Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* DEVELOPMENT VISION SHOWCASE */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.25em] uppercase text-earth">
                <Compass className="w-3.5 h-3.5" />
                <span>Site & Masterplan Logic</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
                Designed with deference to land and climate.
              </h2>

              <p className="text-base text-charcoal/80 leading-relaxed font-light">
                The masterplan framework prioritizes passive climatic design, renewable solar power, rainwater harvesting, and low site disturbance. The 8 hectares already owned form the initial development core, while the proposed 7-hectare expansion offers extended agricultural terraces and landscape buffers.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sm text-forest">Low-Impact Footprint:</span>
                    <p className="text-xs text-charcoal/70">
                      Dispersed pavilions preserving mature acacia trees and natural drainage swales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sm text-forest">Water & Energy Security:</span>
                    <p className="text-xs text-charcoal/70">
                      Planned solar-battery microgrid and rainwater catchment with greywater wetland filtration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sm text-forest">Verified Planning Pathway:</span>
                    <p className="text-xs text-charcoal/70">
                      NEMA environmental impact licensing and County Government development approvals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/vision"
                  className="luxury-btn-primary text-xs tracking-widest inline-flex items-center space-x-2"
                >
                  <span>Explore Masterplan & Site Brief</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sand" />
                </Link>
              </div>
            </div>

            {/* Right Visual Moodboard */}
            <div className="relative">
              <div className="relative h-[440px] sm:h-[500px] border border-sand/40 overflow-hidden shadow-elevated">
                <Image
                  src="/images/moodboard-concept.png"
                  alt="Jonik Ndovu Farm illustrative visual direction moodboard"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-ivory">
                  <span className="text-[10px] tracking-widest uppercase bg-earth/90 text-white px-2 py-0.5 font-semibold">
                    Illustrative Visual Concept
                  </span>
                  <p className="text-xs text-ivory/90 mt-1">
                    Visual direction moodboard capturing earth tones, organic textures, and agro-tourism spaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INVESTMENT INTRODUCTION TEASER */}
        <section className="py-20 bg-evergreen text-ivory border-t border-sand/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-forest border border-sand/30 text-sand text-xs tracking-widest uppercase">
              <Shield className="w-3.5 h-3.5 text-earth" />
              <span>Investment Opportunity</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
              Participate in the creation of a differentiated hospitality asset in Kenya.
            </h2>

            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
              We are seeking institutional, family office, and private hospitality partners for the US$2.4 million capital requirement to acquire the expansion parcel, construct the 12–15 unit destination, and deliver an authentic agro-tourism retreat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 max-w-3xl mx-auto text-left">
              <div className="bg-forest/50 p-6 border border-sand/20">
                <span className="text-xs uppercase tracking-widest text-sand font-semibold">Structure</span>
                <h4 className="font-serif text-lg font-bold text-ivory mt-1">Lead Partner + Syndicate</h4>
                <p className="text-xs text-ivory/70 mt-1.5">
                  Preferred path to align a credible anchor sponsor with aligned co-investors.
                </p>
              </div>

              <div className="bg-forest/50 p-6 border border-sand/20">
                <span className="text-xs uppercase tracking-widest text-sand font-semibold">Phasing</span>
                <h4 className="font-serif text-lg font-bold text-ivory mt-1">Phased vs Full Build</h4>
                <p className="text-xs text-ivory/70 mt-1.5">
                  Both 12-unit initial phase and full build options evaluated under the financial model.
                </p>
              </div>

              <div className="bg-forest/50 p-6 border border-sand/20">
                <span className="text-xs uppercase tracking-widest text-sand font-semibold">Diligence</span>
                <h4 className="font-serif text-lg font-bold text-ivory mt-1">Tiered Data Room</h4>
                <p className="text-xs text-ivory/70 mt-1.5">
                  Full access to financial model, land title diligence, and cost benchmarks upon NDA.
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/investment"
                className="luxury-btn-gold text-xs !py-3.5 !px-8 tracking-widest flex items-center space-x-2"
              >
                <span>Explore Investment Proposition</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/investor-access"
                className="luxury-btn-outline !text-ivory !border-sand/40 hover:!border-sand text-xs !py-3.5 !px-8 tracking-widest flex items-center space-x-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Request Investor Access</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-20 bg-ivory text-charcoal border-b border-sand/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Connect with the Jonik Ndovu Team
            </h2>
            <p className="text-base text-charcoal/70 max-w-xl mx-auto leading-relaxed">
              Whether you are an institutional investor, hospitality group, or prospective partner, we invite you to begin a conversation with our development team.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/investor-access"
                className="luxury-btn-primary text-xs !py-3.5 !px-8 tracking-widest"
              >
                Request Tiered Investor Access
              </Link>
              <Link
                href="/contact"
                className="luxury-btn-outline text-xs !py-3.5 !px-8 tracking-widest"
              >
                Send Direct Message
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
