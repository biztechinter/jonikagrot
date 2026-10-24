import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import { MapPin, Compass, Shield, Trees, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Destination | Jonik Ndovu Farm",
  description: "Segera and Laikipia County regional landscape, conservation ecosystem, and sense of place.",
};

export default function DestinationPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-evergreen text-ivory py-20 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              The Setting
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              Segera, Laikipia County
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
              A high-altitude plateau where wildlife conservancies, traditional pastoral communities, and dramatic Kenyan horizons converge.
            </p>
          </div>
        </section>

        {/* Narrative & Visual Context */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-earth block">
                Regional Ecology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight">
                An Ecosystem of Global Significance
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
                <p>
                  Laikipia is one of Kenya’s most vital conservation landscapes, sustaining the country's second-highest density of wildlife outside the Maasai Mara. Situated between Mount Kenya to the southeast and the Great Rift Valley to the west, it represents a pioneering model of private, community, and pastoral conservancy management.
                </p>
                <p>
                  Jonik Ndovu Farm is located within the Segera sector, characterised by gently undulating savannah grasslands, rocky kopjes, and riverine woodlands of yellow-barked fever trees along tributaries of the Ewaso Nyiro River.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sand/30">
                <div className="p-4 bg-white border border-sand/30">
                  <span className="text-xs uppercase tracking-wider text-earth font-semibold">Elevation</span>
                  <p className="font-serif text-lg font-bold text-forest mt-0.5">~1,800m ASL</p>
                  <p className="text-xs text-charcoal/60 mt-1">Malaria-free, comfortable year-round highland climate.</p>
                </div>
                <div className="p-4 bg-white border border-sand/30">
                  <span className="text-xs uppercase tracking-wider text-earth font-semibold">Landscape</span>
                  <p className="font-serif text-lg font-bold text-forest mt-0.5">Highland Savannah</p>
                  <p className="text-xs text-charcoal/60 mt-1">Uninterrupted celestial views and expansive wildlife corridors.</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 sm:h-[480px] border border-sand/40 overflow-hidden shadow-elevated">
              <Image
                src="/images/landscape-nature.jpg"
                alt="Sweeping savannah landscape in Segera, Laikipia"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-evergreen/90 text-sand text-[10px] tracking-widest uppercase px-2.5 py-1">
                Regional Landscape Context
              </div>
            </div>
          </div>
        </section>

        {/* Map & Travel Placeholder Card (Strictly adhering to SiteGuide.md: do not invent unverified travel times) */}
        <section className="py-16 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-10 border border-sand/50 shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-forest/10 text-forest">
                  <MapPin className="w-5 h-5 text-earth" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-forest">
                    Site Access & Geographic Coordinates
                  </h3>
                  <span className="text-xs text-charcoal/60">
                    Segera Ward, Laikipia County, Republic of Kenya
                  </span>
                </div>
              </div>

              {/* Factual Information & Placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-charcoal/80">
                <div className="space-y-4">
                  <h4 className="font-serif text-base font-bold text-forest">
                    Access & Infrastructure
                  </h4>
                  <p className="text-xs leading-relaxed text-charcoal/70">
                    The property is accessible via the central Laikipia road network connecting to Nanyuki and Rumuruti. Detailed access route surveys, GPS boundary verifications, and airstrip coordination will be finalized during the technical diligence phase.
                  </p>
                  <div className="p-3 bg-sand/20 border-l-2 border-earth text-xs text-charcoal/70 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-earth flex-shrink-0 mt-0.5" />
                    <span>
                      Precise coordinates, transit durations, and aerial transfer protocols are reserved for the verified investor diligence package.
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif text-base font-bold text-forest">
                    Conservation Context
                  </h4>
                  <p className="text-xs leading-relaxed text-charcoal/70">
                    Jonik Ndovu Farm is committed to maintaining open borders for harmless wildlife migration, supporting community livestock pasture agreements, and partnering with local security networks.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/investor-access"
                      className="luxury-btn-primary text-xs !py-2.5 !px-5 tracking-widest inline-flex items-center space-x-2"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Request Site Diligence Brief</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
