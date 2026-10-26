import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import { Compass, CheckCircle2, ArrowRight, Layers, Sun, Shield, FileText, Flame, Droplets, ShoppingBag, Sprout, Utensils, Trees, Fence, Sparkles } from "lucide-react";

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

        {/* Envisioned Masterplan Blueprint & Spatial Architecture */}
        <section className="py-20 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block">
                Spatial Blueprint & Site Architecture
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                The Envisioned Masterplan
              </h2>
              <p className="text-sm text-charcoal/75 leading-relaxed font-light">
                A seamless integration of low-density luxury hospitality, intensive organic permaculture, closed-loop water harvesting, and renewable agro-infrastructure nestled within Laikipia&apos;s rolling savanna.
              </p>
            </div>

            {/* Masterplan Aerial Showcase Hero */}
            <div className="bg-white border border-sand/40 p-4 sm:p-6 shadow-elevated">
              <div className="relative h-[380px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden border border-sand/30">
                <Image
                  src="/images/masterplan-aerial-vision.jpg"
                  alt="Envisioned Masterplan Aerial Visual for Jonik Ndovu Farm"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-evergreen/95 text-sand text-[11px] font-mono tracking-widest uppercase px-3 py-1 font-semibold backdrop-blur-sm border border-sand/30">
                    Envisioned Estate Masterplan · Aerial Blueprint
                  </span>
                  <span className="bg-earth/95 text-white text-[11px] font-mono tracking-wider uppercase px-3 py-1 font-semibold backdrop-blur-sm">
                    8 ha Owned Core + ~7 ha Expansion (15 ha Total)
                  </span>
                </div>

                {/* Bottom Callout Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-ivory">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-forest/90 backdrop-blur-md p-3.5 sm:p-4 border border-sand/30">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-sand block">Hospitality Scale</span>
                      <p className="font-serif text-sm sm:text-base font-bold text-ivory">12–15 Eco-Suites</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-sand block">Total Land Holding</span>
                      <p className="font-serif text-sm sm:text-base font-bold text-ivory">~15 Hectares (37 ac)</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-sand block">Green Asset Capex</span>
                      <p className="font-serif text-sm sm:text-base font-bold text-ivory">US$980k (40.8%)</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-sand block">Ecological Contiguity</span>
                      <p className="font-serif text-sm sm:text-base font-bold text-ivory">Lewa & Ol Pejeta</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-charcoal/60 text-center uppercase tracking-wider mt-3">
                Architectural & Agro-Spatial Blueprint Concept — Designed for staged execution across the 8 ha core and adjacent 7 ha expansion parcel
              </p>
            </div>

            {/* The 6 Core Blueprint Spatial Zones */}
            <div className="space-y-6">
              <div className="border-b border-sand/30 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-earth">Blueprint Anatomy</span>
                <h3 className="font-serif text-2xl font-bold text-forest">
                  Six Core Spatial Zones of the Envisioned Layout
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Zone 1 */}
                <div className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-colors shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-earth px-2 py-0.5 bg-sand/20">Zone 01 · Foreground</span>
                    <Compass className="w-4 h-4 text-forest" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    Clubhouse & Arrival Sanctum
                  </h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    Gable-roof stone lodge housing reception, dining terrace, wine cellar, and library. Features an open-air swimming pool, courtyard gardens, and discreet guest parking with a manicured arrival porte-cochère.
                  </p>
                  <ul className="text-[11px] text-charcoal/70 space-y-1 pt-1 border-t border-sand/20 font-mono">
                    <li>• Stone lodge with passive thermal regulation</li>
                    <li>• Heated swimming pool & relaxation loungers</li>
                    <li>• Farm-to-fork dining verandah</li>
                  </ul>
                </div>

                {/* Zone 2 */}
                <div className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-colors shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-earth px-2 py-0.5 bg-sand/20">Zone 02 · Left Ridge</span>
                    <Trees className="w-4 h-4 text-forest" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    Hillside Eco-Suite Enclave
                  </h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    12 to 15 detached luxury pavilions stepped along natural contours. Pedestrian-only stone pathways maintain quiet serenity, orienting each suite outward toward Mount Kenya and open savanna vistas with zero sightline overlap.
                  </p>
                  <ul className="text-[11px] text-charcoal/70 space-y-1 pt-1 border-t border-sand/20 font-mono">
                    <li>• 12–15 low-density guest pavilions</li>
                    <li>• Private shaded verandahs & outdoor tubs</li>
                    <li>• Pedestrian-only meandering stone paths</li>
                  </ul>
                </div>

                {/* Zone 3 */}
                <div className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-colors shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-earth px-2 py-0.5 bg-sand/20">Zone 03 · Center Valley</span>
                    <Sprout className="w-4 h-4 text-forest" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    Permaculture & Poly-Tunnels
                  </h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    Terraced companion-planted vegetable beds, high-tunnel greenhouses for year-round organic greens and heirloom tomatoes, and multi-tier fruit orchards (avocado, citrus, banana) acting as a lush visual and sensory buffer.
                  </p>
                  <ul className="text-[11px] text-charcoal/70 space-y-1 pt-1 border-t border-sand/20 font-mono">
                    <li>• Geometric organic crop & herb terraces</li>
                    <li>• Clean poly-tunnel micro-climate greenhouses</li>
                    <li>• Multi-canopy fruit & avocado groves</li>
                  </ul>
                </div>

                {/* Zone 4 */}
                <div className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-colors shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-earth px-2 py-0.5 bg-sand/20">Zone 04 · North Basin</span>
                    <Droplets className="w-4 h-4 text-forest" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    Hydrology & Retention Lake
                  </h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    Engineered rainwater harvesting lake and surface runoff basin with an aerating solar fountain. Surrounded by a perimeter wellness boardwalk and an overwater thatched gazebo pavilion for yoga and sunset meditation.
                  </p>
                  <ul className="text-[11px] text-charcoal/70 space-y-1 pt-1 border-t border-sand/20 font-mono">
                    <li>• High-capacity surface runoff retention lake</li>
                    <li>• Solar aeration fountain preventing stagnation</li>
                    <li>• Overwater thatched gazebo pavilion</li>
                  </ul>
                </div>

                {/* Zone 5 */}
                <div className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-colors shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-earth px-2 py-0.5 bg-sand/20">Zone 05 · Center-Right</span>
                    <Fence className="w-4 h-4 text-forest" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    Ethical Husbandry & Dairy Barn
                  </h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    Modern covered dairy shelter and zero-grazing feeding barn designed for livestock comfort and hygiene. Features fenced green pasture paddocks for rotational grazing and manure collection feeding the circular bio-digester.
                  </p>
                  <ul className="text-[11px] text-charcoal/70 space-y-1 pt-1 border-t border-sand/20 font-mono">
                    <li>• Well-ventilated covered dairy structure</li>
                    <li>• Rotational pasture paddocks for livestock</li>
                    <li>• Direct manure capture for biogas energy</li>
                  </ul>
                </div>

                {/* Zone 6 */}
                <div className="bg-white p-6 border border-sand/40 hover:border-earth/60 transition-colors shadow-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-earth px-2 py-0.5 bg-sand/20">Zone 06 · Bottom-Right</span>
                    <Sun className="w-4 h-4 text-forest" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    Solar Microgrid & Machinery Depot
                  </h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    Large agricultural processing warehouse fitted with an extensive rooftop 60 kWp solar array and LiFePO4 battery hub. Staging yard for low-till farm tractors, composting bays, and silent electric utility vehicles.
                  </p>
                  <ul className="text-[11px] text-charcoal/70 space-y-1 pt-1 border-t border-sand/20 font-mono">
                    <li>• Rooftop 60 kWp solar PV & battery storage</li>
                    <li>• Tractor maintenance & compost staging yard</li>
                    <li>• Zero-emission electric farm buggy fleet</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* EXPANDING TO 15 HECTARES: THE EXTENDED AMENITY ECOSYSTEM */}
            <div className="bg-forest text-ivory p-8 sm:p-10 border border-sand/30 space-y-8">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-sand block">
                  Vision Enhancement · The Larger Footprint
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                  Expanding the Blueprint: The 15-Hectare Amenity Program
                </h3>
                <p className="text-sm text-ivory/80 leading-relaxed font-light">
                  While the blueprint illustrates a harmonious integration of agriculture and guest pavilions, expanding the estate to the full <strong>~15-hectare total holding</strong> (8 ha owned core + ~7 ha adjacent expansion parcel) resolves the core tension of agro-resorts: <em>delivering public-facing farm commerce and rich recreational amenities while preserving pure tranquility for overnight guests.</em>
                </p>
              </div>

              {/* Three Concentric Rings of Estate Zoning */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                {/* Ring 1 */}
                <div className="bg-evergreen/80 p-6 border border-sand/20 space-y-4">
                  <div className="flex items-center space-x-2 text-sand">
                    <ShoppingBag className="w-5 h-5 text-earth" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Ring 1 · Public Gateway</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-ivory">
                    Farm-Gate Market & Artisanal Bakery
                  </h4>
                  <p className="text-xs text-ivory/75 leading-relaxed">
                    Positioned at the outer perimeter along the primary Segera access road, capturing transit safari travelers and Nanyuki weekenders without compromising guest privacy.
                  </p>
                  <div className="space-y-2 text-xs text-ivory/80 pt-2 border-t border-sand/15">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Farm Produce Sale Shop ($80k):</strong> Branded honey, cold-pressed oils, preserves, and farm produce hampers.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Artisanal Sourdough Bakery ($80k):</strong> Stone-hearth oven producing fresh sourdough and pastries for retail and lodge dining.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Agro-Education Welcome Center:</strong> Staging point for educational day visits and regenerative farming masterclasses.</span>
                    </div>
                  </div>
                </div>

                {/* Ring 2 */}
                <div className="bg-evergreen/80 p-6 border border-sand/20 space-y-4">
                  <div className="flex items-center space-x-2 text-sand">
                    <Sparkles className="w-5 h-5 text-earth" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Ring 2 · Resident Sanctuary</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-ivory">
                    Secluded Wellness & Bush Dining
                  </h4>
                  <p className="text-xs text-ivory/75 leading-relaxed">
                    Tucked deep within the core estate landscape, reserved exclusively for resident overnight guests paying premium safari rates ($650–$1,200/night).
                  </p>
                  <div className="space-y-2 text-xs text-ivory/80 pt-2 border-t border-sand/15">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Savanna Wellness & Yoga Deck:</strong> Elevated open-air platform on a quiet southern knoll with direct Mount Kenya vistas and cedar hot tubs.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Starlit Bush Dinner Boma:</strong> Acacia-enclosed open fire-pit for nocturnal banquets, Maasai storytelling, and unpolluted stargazing.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Lake Meditation Gazebo:</strong> Overwater pavilion for dawn breathwork, mindfulness, and private sunset cocktails.</span>
                    </div>
                  </div>
                </div>

                {/* Ring 3 */}
                <div className="bg-evergreen/80 p-6 border border-sand/20 space-y-4">
                  <div className="flex items-center space-x-2 text-sand">
                    <Trees className="w-5 h-5 text-earth" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Ring 3 · Outer Conservation</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-ivory">
                    Wildlife Corridor & Nature Trails
                  </h4>
                  <p className="text-xs text-ivory/75 leading-relaxed">
                    Spanning the outer ~7-hectare expansion parcel, providing a natural ecological transition to neighboring Lewa and Ol Pejeta conservancies.
                  </p>
                  <div className="space-y-2 text-xs text-ivory/80 pt-2 border-t border-sand/15">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Constructed Reed-Bed Wetlands:</strong> Biological filtration cells that naturally purify greywater before entering the lake.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>3.5 km Agroforestry Trail Loop:</strong> Shaded walking, running, and birdwatching trails winding past acacia copses and apiaries.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" />
                      <span><strong>Beehive Deterrent Fence:</strong> Protects organic crops with 40+ Langstroth hives while leaving regional elephant corridors open.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spatial Matrix Comparison Table */}
              <div className="pt-4 border-t border-sand/20 space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-sand block">Comparative Spatial Matrix</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-sand/30">
                    <thead className="bg-evergreen text-sand uppercase font-semibold">
                      <tr>
                        <th className="p-3 border-b border-sand/30">Amenity / Dimension</th>
                        <th className="p-3 border-b border-sand/30">Phase 1 Owned Core (8.0 ha)</th>
                        <th className="p-3 border-b border-sand/30">Enhanced 15-Hectare Masterplan (~15.0 ha)</th>
                        <th className="p-3 border-b border-sand/30">Strategic Value Unlocked</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand/20 text-ivory/80">
                      <tr>
                        <td className="p-3 font-semibold text-ivory">Guest Accommodation</td>
                        <td className="p-3">12–15 Boutique Suites</td>
                        <td className="p-3 font-bold text-sand">12–15 Boutique Suites (Same Density)</td>
                        <td className="p-3">Preserves ultra-exclusivity; no overcrowding of guest capacity.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-ivory">Guest Buffer Distance</td>
                        <td className="p-3">15–30 meters from farm activities</td>
                        <td className="p-3 font-bold text-sand">75–150 meters multi-tier tree buffer</td>
                        <td className="p-3">Total visual and acoustic seclusion between suites and working farm.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-ivory">Commercial Retail & Bakery</td>
                        <td className="p-3">Internal lodge gift cabinet</td>
                        <td className="p-3 font-bold text-sand">Dedicated roadside Produce Shop & Sourdough Bakery</td>
                        <td className="p-3">Generates significant non-resident daytime revenue ($150k+/yr).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-ivory">Recreational Trail System</td>
                        <td className="p-3">800 m garden footpaths</td>
                        <td className="p-3 font-bold text-sand">3.5 km agroforestry & birdwatching nature loop</td>
                        <td className="p-3">Transforms the stay into an active, multi-day retreat experience.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-ivory">Wildlife Contiguity</td>
                        <td className="p-3">Standard site boundary</td>
                        <td className="p-3 font-bold text-sand">Permeable corridor with beehive fence buffers</td>
                        <td className="p-3">Harmonizes with Lewa & Ol Pejeta elephant migration pathways.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-ivory">Water Infrastructure</td>
                        <td className="p-3">100kL storage + borehole</td>
                        <td className="p-3 font-bold text-sand">200kL storage + retention lake + reed-bed wetlands</td>
                        <td className="p-3">100% closed-loop drought resilience and bio-filtration.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
