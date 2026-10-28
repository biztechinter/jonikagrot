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
  Flame,
  Droplets,
  ShoppingBag,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
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
            {/* Radiant Natural Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-evergreen/90 via-evergreen/35 to-black/35" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-evergreen/40 pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 border border-sand/40 bg-evergreen/75 backdrop-blur-md mb-6 text-sand text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase shadow-md max-w-full">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-earth flex-shrink-0" />
              <span className="leading-tight">Agro-Tourism Destination · Segera, Laikipia · Kenya</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ivory max-w-4xl mx-auto leading-[1.12] mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
              A Distinctive Destination in the Landscapes of Laikipia.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-ivory/95 max-w-2xl mx-auto leading-relaxed mb-10 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
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
        <section className="py-20 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
            Hospitality-Led Agro-Tourism
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
            Where thoughtful accommodation, organic agriculture, and the Laikipia wilderness meet.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-charcoal/80 leading-relaxed font-light max-w-3xl mx-auto">
            <p>
              Jonik Ndovu Farm is planned as an intimate 12–15 unit destination in Segera, Laikipia County, Kenya. Our guiding ambition is to unite boutique hospitality, closed-loop permaculture, and immediate proximity to Kenya&apos;s most celebrated wildlife sanctuaries into one unparalleled guest experience.
            </p>
            <p className="text-sm text-charcoal/65">
              Unlike generic safari resorts or commercial farms, Jonik Ndovu Farm combines intimate high-touch hospitality with an active $980k greener bio-economy, nestled right at the threshold of world-renowned conservation strongholds.
            </p>
          </div>

          {/* Wildlife & Conservancies Proximity Banner */}
          <div className="p-6 bg-ivory-dark/60 border border-sand/60 text-left max-w-4xl mx-auto shadow-subtle space-y-3">
            <div className="flex items-center space-x-2 text-forest">
              <Compass className="w-4 h-4 text-earth flex-shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                Strategic Wildlife Geography · Segera Ecosystem
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
              Segera borders major neighboring wildlife zones in the Laikipia ecosystem, including the <strong>Lewa Wildlife Conservancy</strong> (UNESCO World Heritage rhino stronghold and Grevy&apos;s zebra sanctuary) and <strong>Ol Pejeta Conservancy</strong> (East Africa&apos;s largest black rhino sanctuary and apex predator haven). Guests enjoy dawn game drives tracking rhinos and lions, returning to peaceful farm-to-table tranquility.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-forest text-sand font-semibold">
                Neighboring Lewa Conservancy
              </span>
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-earth text-white font-semibold">
                Neighboring Ol Pejeta Conservancy
              </span>
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-sand text-evergreen font-semibold">
                Greater Ewaso Wildlife Corridor
              </span>
            </div>
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
              <div className="luxury-card p-8 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 bg-forest/10 text-forest flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-sand transition-colors">
                    <Compass className="w-6 h-6 text-earth" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-3">
                    Thoughtful Accommodation
                  </h3>
                  <p className="text-sm text-charcoal/75 leading-relaxed">
                    12–15 low-impact eco-suites built with local stone, sustainable cedar, and natural canvas, oriented toward panoramic savannah views and Mount Kenya.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-sand/30">
                  <span className="text-xs uppercase tracking-wider text-earth font-medium flex items-center space-x-1">
                    <span>Low-density privacy</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Dining */}
              <div className="luxury-card p-8 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 bg-forest/10 text-forest flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-sand transition-colors">
                    <Utensils className="w-6 h-6 text-earth" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-3">
                    Farm-to-Table Dining
                  </h3>
                  <p className="text-sm text-charcoal/75 leading-relaxed">
                    Menus informed by daily garden harvests, pairing freshly harvested heritage vegetables and herbs with artisanal Kenyan farm ingredients.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-sand/30">
                  <span className="text-xs uppercase tracking-wider text-earth font-medium flex items-center space-x-1">
                    <span>Artisanal culinary narrative</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Nature & Landscape */}
              <div className="luxury-card p-8 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 bg-forest/10 text-forest flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-sand transition-colors">
                    <Trees className="w-6 h-6 text-earth" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-3">
                    Landscape & Wildlife Corridors
                  </h3>
                  <p className="text-sm text-charcoal/75 leading-relaxed">
                    Bordering Lewa Wildlife Conservancy and Ol Pejeta Conservancy within the Greater Ewaso ecosystem, harmonizing big-game wilderness with permeable agro-ecological stewardship.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-sand/30">
                  <span className="text-xs uppercase tracking-wider text-earth font-medium flex items-center space-x-1">
                    <span>Lewa & Ol Pejeta adjacency</span>
                  </span>
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

        {/* GREENER ECOSYSTEM & PRODUCTIVE INFRASTRUCTURE */}
        <section className="py-20 lg:py-24 bg-white border-b border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
                Sustainable Infrastructure & Productive Assets
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
                A Greener Ecosystem by Design
              </h2>
              <p className="text-base text-charcoal/80 mt-4 leading-relaxed font-light">
                Over <strong className="font-semibold text-forest">40% of the US$2.4 million capital plan (US$980,000)</strong> is dedicated to closed-loop renewable energy, circular bio-waste recovery, precision hydrology, regenerative agriculture, and guest-facing culinary facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1: Solar */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Sun className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Energy Security · $160k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Solar-Hybrid Microgrid</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  60 kWp solar PV array and 120 kWh LiFePO4 battery bank providing 100% clean, silent off-grid electricity.
                </p>
              </div>

              {/* Pillar 2: Biogas */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Flame className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Circular Utility · $80k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Biogas Generation</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Commercial anaerobic biodigester converting livestock manure and kitchen scraps into clean cooking gas and rich bio-fertilizer.
                </p>
              </div>

              {/* Pillar 3: Irrigation */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Water Security · $240k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Smart Drip Irrigation</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  10,000 L/hr solar borehole, 200,000L buffer storage, automated drip network across 5.3 ha, and reed-bed greywater wetland.
                </p>
              </div>

              {/* Pillar 4: Farmland Landscaping */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Trees className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Regenerative Earthworks · $120k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Farmland Landscaping</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Contour swales for natural moisture retention, indigenous acacia shelterbelts, and multi-tier fruit orchards (citrus, avocado).
                </p>
              </div>

              {/* Pillar 5: Animal Structures */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Livestock & Apiary · $80k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Animal Structures</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Sheltered rotational sheep paddocks, ethical free-range poultry houses, solarized milking dairy station, and apiary hives.
                </p>
              </div>

              {/* Pillar 6: Farm Machinery */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Compass className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Clean Fleet · $60k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Farm Machinery</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Compact low-till agricultural tractors, compost spreaders, solar charging stations, and zero-emission electric utility carts.
                </p>
              </div>

              {/* Pillar 7: Catering Hub */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Culinary Core · $160k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Commercial Catering Hub</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Farm-to-fork commercial lodge kitchen, artisanal sourdough bakery with stone hearth, and solar-powered cold-chain larder.
                </p>
              </div>

              {/* Pillar 8: Farm Produce Shop */}
              <div className="p-6 bg-sand/15 border border-sand/40 space-y-3 hover:border-earth/60 transition-colors">
                <div className="w-10 h-10 bg-forest text-sand flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-sand" />
                </div>
                <div className="text-[11px] font-mono uppercase text-earth font-bold">Retail Destination · $80k</div>
                <h3 className="font-serif text-lg font-bold text-forest">Farm Produce Sale Shop</h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  On-site boutique farm shop offering guests and day visitors packaged acacia honey, cold-pressed oils, preserves, and seasonal harvests.
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-evergreen text-ivory flex flex-col md:flex-row items-center justify-between gap-6 border border-sand/20">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs font-mono uppercase text-sand font-bold">Capital Efficiency & Operational Resilience</div>
                <p className="text-sm text-ivory/80">
                  Investing in circular self-sufficiency cuts lodge energy & water opex by over 35% while creating an authentic guest experience.
                </p>
              </div>
              <Link
                href="/vision"
                className="luxury-btn-gold text-xs !py-3 !px-6 tracking-widest flex items-center space-x-2 flex-shrink-0"
              >
                <span>Explore Circular Systems</span>
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

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-sm text-forest">Wildlife Corridor Permeability:</span>
                    <p className="text-xs text-charcoal/70">
                      Corridor-friendly boundary buffers respecting historic wildlife movement between Lewa and Ol Pejeta.
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

            {/* Right Visual Moodboard / Masterplan Architecture */}
            <div className="relative">
              <div className="relative h-[440px] sm:h-[500px] border border-sand/40 overflow-hidden shadow-elevated">
                <Image
                  src="/images/masterplan-aerial-vision.jpg"
                  alt="Jonik Ndovu Farm envisioned aerial masterplan layout"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 text-ivory">
                  <span className="text-[10px] tracking-widest uppercase bg-earth/95 text-white px-2.5 py-0.5 font-semibold font-mono">
                    Envisioned Masterplan · 15 ha Vision
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                    Harmonious Agro-Hospitality Layout
                  </p>
                  <p className="text-xs text-ivory/85 leading-relaxed mt-0.5">
                    Hillside guest enclave, permaculture poly-tunnels, solar microgrid depot, and central hydrology lake.
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
