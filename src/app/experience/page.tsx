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

      <main className="flex-1 pt-24">
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
                  alt="Illustrative concept of outdoor dining deck with farm-fresh produce"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                  Illustrative Concept Dining Experience
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[0.2em] uppercase text-earth">
                  <Utensils className="w-4 h-4" />
                  <span>Gastronomy & Agriculture</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                  Farm-to-Fork Dining
                </h2>
                <p className="text-base text-charcoal/80 leading-relaxed font-light">
                  Food at Jonik Ndovu Farm is conceived as an interactive journey. The lodge restaurant will feature daily seasonal menus anchored in organic harvests picked that morning from the onsite permaculture gardens, paired with select ingredients from neighbouring pastoral and artisanal producers.
                </p>
                <div className="space-y-2 text-sm text-charcoal/70">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Herb and edible flower garden dining terraces</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Open hearth and wood-fired artisanal bread baking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-earth rounded-full" />
                    <span>Private sunset dining nestled under wild acacia canopies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Agro-Tourism */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
              Meaningful Activities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Agricultural Immersion & Nature Trails
            </h2>
            <p className="text-sm text-charcoal/70 mt-3">
              Planned guest activities that invite visitors to slow down, learn regenerative land techniques, and explore the Segera savannah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luxury-card p-6 space-y-3">
              <Leaf className="w-8 h-8 text-earth" />
              <h3 className="font-serif text-xl font-bold text-forest">
                Permaculture Masterclasses
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Guided harvesting sessions, companion planting workshops, and indigenous agroforestry walks led by the farm agronomy team.
              </p>
            </div>

            <div className="luxury-card p-6 space-y-3">
              <Compass className="w-8 h-8 text-earth" />
              <h3 className="font-serif text-xl font-bold text-forest">
                Guided Walking Safaris
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Low-impact bush walks interpreting wildlife tracks, native flora, and community conservation initiatives along the Ewaso ecosystem.
              </p>
            </div>

            <div className="luxury-card p-6 space-y-3">
              <Sun className="w-8 h-8 text-earth" />
              <h3 className="font-serif text-xl font-bold text-forest">
                Wellness & Night Sky Astronomy
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Morning yoga on private savannah decks followed by pristine stargazing under the zero-light-pollution skies of Laikipia.
              </p>
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
