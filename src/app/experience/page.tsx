import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Utensils, Bed, Compass, Sun, Leaf, ArrowRight, Shield } from "lucide-react";

export const metadata = {
  title: "The Experience | Jonik Ndovu Farm",
  description: "Proposed hospitality, culinary, permaculture, and nature experiences at Jonik Ndovu Farm in Segera, Laikipia.",
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 outline-none">
        {/* Hero Section */}
        <section className="bg-evergreen text-ivory py-20 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              Hospitality & Sense of Place
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              The Proposed Guest Experience
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
              An intimate connection to the rhythms of an agro-tourism retreat, designed around serenity, gastronomy, and the raw beauty of Laikipia.
            </p>
          </div>
        </section>

        {/* Section 1: Accommodation */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-earth">
                <Bed className="w-4 h-4" />
                <span>Proposed Accommodation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                Boutique Suites Immersed in Nature
              </h2>
              <p className="text-base text-charcoal/80 leading-relaxed font-light">
                Planned as 12 to 15 stand-alone pavilions, the accommodation balances tactile African luxury with environmental consciousness. Each suite is conceived with open-air timber verandahs, private outdoor soaking tubs, high thatched ceilings, and deep daybeds for wildlife viewing.
              </p>
              <div className="space-y-2 text-sm text-charcoal/70">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                  <span>Floor-to-ceiling glass sliding doors framing savannah vistas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                  <span>Custom furniture handcrafted by local Kenyan artisans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                  <span>Solar-powered underfloor passive cooling and warm rain showers</span>
                </div>
              </div>
            </div>

            <div className="relative h-96 sm:h-[480px] border border-sand/40 overflow-hidden shadow-elevated">
              <Image
                src="/images/suite-interior.jpg"
                alt="Illustrative concept of bedroom pavilion at Jonik Ndovu Farm"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                Illustrative AI Concept · Not an approved architectural plan
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Farm-to-Table Culinary */}
        <section className="py-20 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative h-96 sm:h-[480px] border border-sand/40 overflow-hidden shadow-elevated">
                <Image
                  src="/images/farm-dining.jpg"
                  alt="Farm-to-table dining experience at Jonik Ndovu Farm"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                  Illustrative Concept · Seasonal Gastronomy
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-earth">
                  <Utensils className="w-4 h-4" />
                  <span>Gastronomy & Catering Hub</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                  Farm-to-Fork Commercial Catering & Bakery
                </h2>
                <p className="text-base text-charcoal/80 leading-relaxed font-light">
                  Food at Jonik Ndovu Farm is anchored by a state-of-the-art commercial lodge kitchen and artisanal stone-hearth bakery. Seasonal daily menus are informed directly by morning harvests from our 5+ hectares of organic permaculture grounds, paired with local artisanal pastoral products and clean biogas cooking systems.
                </p>
                <div className="space-y-2 text-sm text-charcoal/70">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Open hearth and wood-fired artisanal sourdough bakery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Solar-powered walk-in cold-chain larder and charcuterie curing pantry</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Interactive chef cooking masterclasses and herb terrace pairings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Private starlit bush dinners served under native acacia canopies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2B: Farm Produce Sale Shop & Artisanal Bakery */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-earth">
                <span className="w-2 h-2 rounded-full bg-earth" />
                <span>On-Site Farm Gate Commerce</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                The Farm Produce Sale Shop & Bakery
              </h2>
              <p className="text-base text-charcoal/80 leading-relaxed font-light">
                Designed as an authentic farm-gate boutique market, the Farm Produce Sale Shop offers resort guests and visiting travelers an opportunity to take home the organic bounty of Laikipia.
              </p>
              <div className="space-y-3 text-sm text-charcoal/75">
                <div className="p-4 bg-sand/20 border border-sand/40">
                  <span className="font-serif font-bold text-forest block mb-1">Cold-Pressed Acacia & Wildflower Honey</span>
                  <p className="text-xs text-charcoal/70">Raw, single-origin honey harvested from the farm&apos;s 40+ Langstroth apiary hives along the acacia woodland.</p>
                </div>
                <div className="p-4 bg-sand/20 border border-sand/40">
                  <span className="font-serif font-bold text-forest block mb-1">Artisanal Oils, Herbal Infusions & Preserves</span>
                  <p className="text-xs text-charcoal/70">Small-batch cold-pressed culinary oils, dried indigenous herbal teas, citrus marmalades, and sun-dried organic herbs.</p>
                </div>
                <div className="p-4 bg-sand/20 border border-sand/40">
                  <span className="font-serif font-bold text-forest block mb-1">Fresh Farm Gate Baskets</span>
                  <p className="text-xs text-charcoal/70">Custom-packed organic vegetable, heirloom fruit, and fresh free-range egg hampers for weekend retreaters returning to Nairobi.</p>
                </div>
              </div>
            </div>

            <div className="bg-sand/15 p-8 border border-sand/40 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-earth font-bold block">
                Agro-Tourism Commercial Synergy
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest">
                High-Margin Retail & Culinary Monetization
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                By producing value-added artisanal food products directly on the farm, Jonik Ndovu creates recurring retail revenue streams alongside overnight guest fees:
              </p>
              <ul className="space-y-2 text-xs text-charcoal/75">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                  <span>Estimated 65%+ gross retail margins on packaged honey, cold-pressed oils, and preserves</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                  <span>Captures external day-visitor traffic traveling between Nanyuki, Lewa, and Segera</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-forest rounded-full" />
                  <span>Deepens brand equity as guests take farm products back home to Nairobi and abroad</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Agro-Tourism & Ecological Immersion */}
        <section className="py-20 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
                Living Classroom & Wellness
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Agro-Ecological Immersion & Savanna Serenity
              </h2>
              <p className="text-sm text-charcoal/70 mt-3">
                Planned guest activities that invite visitors to slow down, learn regenerative land techniques, and explore the Segera savannah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="luxury-card p-6 space-y-3">
                <Leaf className="w-7 h-7 text-earth" />
                <h3 className="font-serif text-lg font-bold text-forest">
                  Permaculture Masterclasses
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Guided harvesting sessions, companion planting workshops, keyline swale water design, and agroforestry walks with our agronomists.
                </p>
              </div>

              <div className="luxury-card p-6 space-y-3">
                <Compass className="w-7 h-7 text-earth" />
                <h3 className="font-serif text-lg font-bold text-forest">
                  Ethical Animal Husbandry
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Interactive visits to our rotational grazing sheep paddocks, solarized dairy hygiene unit, free-range poultry, and apiary bee sanctuaries.
                </p>
              </div>

              <div className="luxury-card p-6 space-y-3">
                <Sun className="w-7 h-7 text-earth" />
                <h3 className="font-serif text-lg font-bold text-forest">
                  Circular Utility Discovery
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Educational interpretive trails showcasing our 60 kWp solar microgrid, anaerobic biogas digester, and reed-bed wastewater wetlands.
                </p>
              </div>

              <div className="luxury-card p-6 space-y-3">
                <Shield className="w-7 h-7 text-earth" />
                <h3 className="font-serif text-lg font-bold text-forest">
                  Savanna Wellness & Astronomy
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Morning yoga on savannah timber decks followed by evening stargazing under the unpolluted night skies of Laikipia.
                </p>
              </div>
            </div>


          </div>
        </section>

        {/* Section 4: Neighboring World-Class Wildlife Conservancies */}
        <section className="py-20 bg-white border-b border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
                World-Class Wildlife Safari Adjacency
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
                Nearby Conservancies & Safari Circuits
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
                Segera borders major neighboring wildlife zones in the Laikipia ecosystem, including the Lewa Wildlife Conservancy and Ol Pejeta Conservancy. Guests enjoy seamless transitions between big-game tracking and intimate farm sanctuary living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lewa Card */}
              <div className="p-8 bg-sand/15 border border-sand/40 space-y-4 hover:border-earth/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-forest text-sand font-bold">
                    UNESCO World Heritage
                  </span>
                  <span className="text-xs font-mono text-earth font-bold">Bordering Sector</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest">
                  Lewa Wildlife Conservancy Safaris
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Globally recognized sanctuary harboring over 12% of Kenya&apos;s black rhinos and the world&apos;s largest single population of endangered Grevy&apos;s zebras. Dawn game drives allow guests to witness iconic rhino conservation, elephant migration corridors connecting Mount Kenya to Samburu, and majestic cheetah plains.
                </p>
                <div className="p-3 bg-white/70 border-l-2 border-forest text-[11px] text-charcoal/70">
                  <strong className="text-forest">Guest Highlight:</strong> Guided rhino tracking with experienced rangers, followed by a scenic breakfast overlooking the Lewa-Borana landscape.
                </div>
              </div>

              {/* Ol Pejeta Card */}
              <div className="p-8 bg-sand/15 border border-sand/40 space-y-4 hover:border-earth/60 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-earth text-white font-bold">
                    Apex Predator Stronghold
                  </span>
                  <span className="text-xs font-mono text-earth font-bold">Bordering Sector</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest">
                  Ol Pejeta Conservancy Expeditions
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Spanning 90,000 acres, Ol Pejeta is East Africa&apos;s largest black rhino sanctuary and home to the world&apos;s last two remaining northern white rhinos. Boasting Kenya&apos;s highest predator densities outside the Mara, guests encounter resident lion prides, leopards, and thriving wild dog packs.
                </p>
                <div className="p-3 bg-white/70 border-l-2 border-earth text-[11px] text-charcoal/70">
                  <strong className="text-forest">Guest Highlight:</strong> Exclusive northern white rhino encounter, anti-poaching canine unit demonstrations, and nocturnal predator drives.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="py-16 bg-evergreen text-ivory text-center border-t border-sand/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Explore the Investment Behind the Experience
            </h2>
            <p className="text-sm text-ivory/80 max-w-xl mx-auto">
              Our financial model assesses room yields, average daily rates (ADR), occupancy scenarios, and food & beverage margins for the 12–15 unit concept.
            </p>
            <div className="pt-2">
              <Link
                href="/investment"
                className="luxury-btn-gold text-xs !py-3 !px-7 tracking-widest inline-flex items-center space-x-2"
              >
                <span>View Investment Thesis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
