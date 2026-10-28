import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import {
  MapPin,
  Compass,
  Shield,
  Trees,
  AlertCircle,
  Award,
  Sun,
  Droplets,
  Flame,
  Sprout,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Destination & Wildlife Conservancies, Segera Laikipia",
  description:
    "Explore the Segera landscape in Laikipia County, Kenya. Bordering Lewa Wildlife Conservancy and Ol Pejeta Conservancy, home to black rhinos, predators, and migratory elephant corridors.",
  keywords: [
    "Segera Laikipia",
    "Lewa Wildlife Conservancy",
    "Ol Pejeta Conservancy",
    "Laikipia safari accommodation",
    "elephant migration corridor Kenya",
    "luxury conservation lodge Laikipia",
  ],
  alternates: {
    canonical: "/destination",
  },
  openGraph: {
    title: "Destination & Wildlife Conservancies | Jonik Ndovu Farm, Segera Laikipia",
    description:
      "A rare conservation buffer bordering Lewa and Ol Pejeta. Experience Kenya's greatest rhino strongholds and elephant migration routes.",
  },
};

export default function DestinationPage() {
  const conservancies = PROJECT_FACTS.location.nearbyConservancies;

  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 outline-none">
        {/* Hero Section */}
        <section className="bg-evergreen text-ivory py-20 lg:py-24 border-b border-sand/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-forest border border-sand/30 text-sand text-xs tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-earth" />
              <span>Regional Conservation Landscape</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ivory">
              Segera, Laikipia County
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 max-w-3xl mx-auto leading-relaxed font-light">
              At the crossroads of Africa’s most celebrated wildlife conservancies, dramatic highland plateaus, and regenerative agro-ecological living.
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
                An Ecosystem of Global Conservation Significance
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
                <p>
                  Laikipia is one of Kenya’s most vital conservation landscapes, sustaining the country&apos;s second-highest density of wildlife outside the Maasai Mara. Situated between Mount Kenya to the southeast and the Great Rift Valley to the west, it represents a pioneering model of private, community, and pastoral conservancy stewardship.
                </p>
                <p>
                  Jonik Ndovu Farm is located within the Segera sector, characterized by gently undulating highland savannah grasslands, rocky kopjes, and riverine woodlands along tributaries of the Ewaso Nyiro River.
                </p>
                <p className="font-medium text-forest">
                  Crucially, Segera directly borders major neighboring wildlife zones in the Laikipia ecosystem, including the Lewa Wildlife Conservancy and Ol Pejeta Conservancy—internationally recognized strongholds for rhinos, large predators, and elephant migration routes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sand/30">
                <div className="p-4 bg-white border border-sand/30 shadow-subtle">
                  <span className="text-xs uppercase tracking-wider text-earth font-semibold">Elevation</span>
                  <p className="font-serif text-lg font-bold text-forest mt-0.5">~1,800m ASL</p>
                  <p className="text-xs text-charcoal/60 mt-1">Malaria-free, comfortable year-round highland climate.</p>
                </div>
                <div className="p-4 bg-white border border-sand/30 shadow-subtle">
                  <span className="text-xs uppercase tracking-wider text-earth font-semibold">Landscape</span>
                  <p className="font-serif text-lg font-bold text-forest mt-0.5">Highland Savannah</p>
                  <p className="text-xs text-charcoal/60 mt-1">Uninterrupted celestial night skies and open wildlife corridors.</p>
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

        {/* NEARBY CONSERVANCIES SHOWCASE (Directly Addressing User Prompt) */}
        <section className="py-20 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
                Neighboring Conservation Strongholds
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
                {conservancies.headline}
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-light">
                {conservancies.narrative}
              </p>
            </div>

            {/* Conservancy Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lewa Wildlife Conservancy */}
              <div className="luxury-card p-8 flex flex-col justify-between border-t-4 border-t-forest space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-forest text-sand font-bold">
                      UNESCO World Heritage
                    </span>
                    <span className="text-xs font-mono text-earth font-bold">Bordering Sector</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-forest">
                    {conservancies.lewa.name}
                  </h3>

                  <div className="space-y-2 text-xs font-mono text-charcoal/70">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>~62,000 Acres Protected Wilderness</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>12% of Kenya&apos;s Eastern Black Rhinos</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>World&apos;s Largest Grevy&apos;s Zebra Population</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {conservancies.lewa.highlights} Lewa serves as the critical ecological conduit connecting Mount Kenya’s afro-alpine forest biome to the northern arid savannahs, safeguarding ancient elephant migratory routes.
                  </p>
                </div>

                <div className="p-3.5 bg-sand/20 border border-sand/40 text-[11px] text-charcoal/80">
                  <strong className="text-forest block mb-0.5">Guest Experience Synergy:</strong>
                  Early morning game drives for rhino tracking and private conservancy access within a short drive of Jonik Ndovu Farm.
                </div>
              </div>

              {/* Ol Pejeta Conservancy */}
              <div className="luxury-card p-8 flex flex-col justify-between border-t-4 border-t-earth space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-earth text-white font-bold">
                      Apex Predator Stronghold
                    </span>
                    <span className="text-xs font-mono text-earth font-bold">Bordering Sector</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-forest">
                    {conservancies.olPejeta.name}
                  </h3>

                  <div className="space-y-2 text-xs font-mono text-charcoal/70">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>90,000 Acres Wildlife Sanctuary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>Largest Black Rhino Sanctuary in East Africa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>Last 2 Northern White Rhinos Globally</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {conservancies.olPejeta.highlights} Ol Pejeta harbors Kenya&apos;s highest predator densities outside the Mara, sustaining thriving prides of lions, cheetahs, leopards, and endangered African wild dog packs.
                  </p>
                </div>

                <div className="p-3.5 bg-sand/20 border border-sand/40 text-[11px] text-charcoal/80">
                  <strong className="text-forest block mb-0.5">Guest Experience Synergy:</strong>
                  Exclusive predator tracking, Sweetwaters chimpanzee sanctuary visits, and big-five night drives pairing with relaxing farm evenings.
                </div>
              </div>

              {/* Greater Ewaso Wildlife Corridor */}
              <div className="luxury-card p-8 flex flex-col justify-between border-t-4 border-t-evergreen space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase bg-evergreen text-sand font-bold">
                      Open Continuum
                    </span>
                    <span className="text-xs font-mono text-earth font-bold">Segera Landscape</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-forest">
                    {conservancies.corridors.name}
                  </h3>

                  <div className="space-y-2 text-xs font-mono text-charcoal/70">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>Continuous Unfenced Wildlife Movement</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>Connecting Private & Pastoral Lands</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth"></span>
                      <span>15 Hectare Permeable Site Design</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-light">
                    {conservancies.corridors.highlights} The Segera sector forms the vital connective tissue of Laikipia, where elephants, reticulated giraffes, and plains game move freely across open grasslands under open skies.
                  </p>
                </div>

                <div className="p-3.5 bg-sand/20 border border-sand/40 text-[11px] text-charcoal/80">
                  <strong className="text-forest block mb-0.5">Permeability Philosophy:</strong>
                  Jonik Ndovu Farm adopts non-invasive hedgerows and bee-fence buffers rather than fortress fencing to preserve wildlife corridors.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY JONIK NDOVU FARM IS UNIQUE (Directly Addressing User Prompt) */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
              The Strategic Differentiator
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
              Why Jonik Ndovu Farm is Unique
            </h2>
            <p className="text-base text-charcoal/80 leading-relaxed font-light">
              Bridging the gap between vehicle-bound safari tourism and sustainable agricultural living.
            </p>
          </div>

          {/* Comparative Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1: Traditional Safari Lodge */}
            <div className="p-8 bg-sand/15 border border-sand/40 space-y-4">
              <span className="text-xs font-mono uppercase text-charcoal/60 font-bold block">
                Category 01
              </span>
              <h3 className="font-serif text-xl font-bold text-forest">
                Conventional Safari Lodges
              </h3>
              <ul className="space-y-2.5 text-xs text-charcoal/70 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-earth font-bold">•</span>
                  <span>Predominantly vehicle-based game viewing with minimal physical guest immersion in the land.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-earth font-bold">•</span>
                  <span>Heavy reliance on imported food flown or trucked hundreds of miles from urban centers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-earth font-bold">•</span>
                  <span>High overheads driven by noisy diesel generator fuel and remote supply logistics.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Conventional Farm */}
            <div className="p-8 bg-sand/15 border border-sand/40 space-y-4">
              <span className="text-xs font-mono uppercase text-charcoal/60 font-bold block">
                Category 02
              </span>
              <h3 className="font-serif text-xl font-bold text-forest">
                Commercial Monoculture Farms
              </h3>
              <ul className="space-y-2.5 text-xs text-charcoal/70 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-earth font-bold">•</span>
                  <span>Disruptive perimeter game fencing that cuts off historic wildlife migration corridors.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-earth font-bold">•</span>
                  <span>Zero hospitality infrastructure, guest education, or high-value experiential tourism revenue.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-earth font-bold">•</span>
                  <span>Intensive chemical inputs that deplete natural soil microbiomes and water catchments.</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Jonik Ndovu Farm */}
            <div className="p-8 bg-evergreen text-ivory border-2 border-sand shadow-elevated space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-sand font-bold">
                  Our Unique Synthesis
                </span>
                <Sparkles className="w-4 h-4 text-sand" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ivory">
                Jonik Ndovu Farm
              </h3>
              <ul className="space-y-2.5 text-xs text-ivory/85 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                  <span><strong>Conservancy Adjacency:</strong> Bordering Lewa & Ol Pejeta for world-class rhino and predator safaris at our doorstep.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                  <span><strong>Living Bio-Economy ($980k Capex):</strong> 100% solar microgrid, circular biogas, 10k L/hr solar borehole, and 5.3 ha drip irrigation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                  <span><strong>Intimate Scale (12–15 Units):</strong> Maximum 24–30 guests guaranteeing quiet privacy and commanding premium ADR pricing power.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                  <span><strong>Culinary Depth:</strong> Farm-to-table dining, stone-hearth bakery, apiaries, and on-site artisanal farm produce retail shop.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Map & Travel Diligence Card */}
        <section className="py-16 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 sm:p-10 border border-sand/50 shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-forest/10 text-forest">
                  <MapPin className="w-5 h-5 text-earth" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-forest">
                    Site Access & Geographic Diligence
                  </h3>
                  <span className="text-xs text-charcoal/60">
                    Segera Ward, Laikipia County, Republic of Kenya · Greater Ewaso Ecosystem
                  </span>
                </div>
              </div>

              {/* Factual Information & Placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-charcoal/80">
                <div className="space-y-4">
                  <h4 className="font-serif text-base font-bold text-forest">
                    Access & Infrastructure Corridors
                  </h4>
                  <p className="text-xs leading-relaxed text-charcoal/70">
                    The property is accessible via the central Laikipia road network connecting to Nanyuki (approx. 45–60 minutes depending on road conditions) and Rumuruti. Detailed access route surveys, airstrip transfer coordination (via neighboring Laikipia airstrips), and GPS boundary verifications are detailed in the verified investor diligence package.
                  </p>
                  <div className="p-3 bg-sand/20 border-l-2 border-earth text-xs text-charcoal/70 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-earth flex-shrink-0 mt-0.5" />
                    <span>
                      Precise surveyed coordinates and aerial transfer arrangements are provided within the verified data room.
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif text-base font-bold text-forest">
                    Conservation & Community Harmony
                  </h4>
                  <p className="text-xs leading-relaxed text-charcoal/70">
                    Jonik Ndovu Farm operates on open-corridor principles, maintaining cordial relations with neighboring pastoral communities, local grazing committees, and regional anti-poaching security networks anchored by Lewa and Ol Pejeta.
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
