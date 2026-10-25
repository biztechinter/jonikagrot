import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import { Shield, Users, HeartHandshake, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About & Stewardship | Jonik Ndovu Farm",
  description: "The story, stewardship commitments, and project leadership behind Jonik Ndovu Farm in Segera, Laikipia.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 outline-none">
        {/* Hero Section */}
        <section className="bg-evergreen text-ivory py-20 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              The Genesis
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              About Jonik Ndovu Farm
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed font-light">
              Founded on the belief that luxury hospitality and regenerative African agriculture can reinforce one another to benefit land, wildlife, and surrounding communities.
            </p>
          </div>
        </section>

        {/* Narrative & Philosophy */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-charcoal/80 leading-relaxed font-light text-base sm:text-lg">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-forest">
              Jonik Ndovu Farm originated from a profound appreciation for the open landscapes of Laikipia County and the conviction that sustainable tourism must engage directly with the soil. While conventional safari lodges often exist in isolation from their immediate surroundings, Jonik Ndovu Farm is designed to integrate the agricultural life of the highlands with tranquil, considered accommodation—situated in Segera bordering major wildlife strongholds including Lewa Wildlife Conservancy and Ol Pejeta Conservancy.
            </p>
            <p>
              By establishing an operational agro-ecological farm alongside a 12 to 15 unit boutique lodge, the project creates authentic guest experiences while demonstrating sustainable dryland farming, water conservation, and soil restoration in an arid savannah climate.
            </p>
          </div>
        </section>

        {/* Stewardship Commitments */}
        <section className="py-16 bg-ivory-dark/40 border-y border-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
                Stewardship Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Our Environmental & Community Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="luxury-card p-8 space-y-4">
                <HeartHandshake className="w-8 h-8 text-earth" />
                <h3 className="font-serif text-xl font-bold text-forest">
                  Community Partnership
                </h3>
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  Committed to local employment, fair-wage hospitality careers, and sourcing farm supplies and construction labor directly from the Segera community.
                </p>
              </div>

              <div className="luxury-card p-8 space-y-4">
                <Shield className="w-8 h-8 text-earth" />
                <h3 className="font-serif text-xl font-bold text-forest">
                  Soil & Water Conservation
                </h3>
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  Employing swales, keyline water harvesting, organic composting, and drought-resistant agro-forestry to revitalize dryland soil vitality.
                </p>
              </div>

              <div className="luxury-card p-8 space-y-4">
                <Award className="w-8 h-8 text-earth" />
                <h3 className="font-serif text-xl font-bold text-forest">
                  Institutional Governance
                </h3>
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  Transparent investor reporting, rigorous environmental compliance (NEMA), independent cost auditing, and fiduciary integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Leadership & Governance Placeholders (strictly configurable placeholders per SiteGuide.md) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-earth block mb-2">
              Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Project Governance & Team Structure
            </h2>
            <p className="text-sm text-charcoal/70 mt-3">
              The project is steered by experienced local landholders and hospitality advisors. Full executive biographies and advisory board appointments are maintained in the investor data room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luxury-card p-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-sand/30 rounded-full flex items-center justify-center text-earth font-serif text-2xl font-bold">
                JN
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest">Project Sponsor & Developer</h4>
                <p className="text-xs text-earth uppercase tracking-wider font-semibold">Jonik Farm Management</p>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Primary landholder and visionary leading initial site preparation, acquisition strategy, and county regulatory approvals.
              </p>
            </div>

            <div className="luxury-card p-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-sand/30 rounded-full flex items-center justify-center text-earth font-serif text-2xl font-bold">
                HA
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest">Hospitality Advisory</h4>
                <p className="text-xs text-earth uppercase tracking-wider font-semibold">To be appointed with Lead Investor</p>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Specialist East African luxury lodge operator or boutique management partner to be selected jointly during capital formation.
              </p>
            </div>

            <div className="luxury-card p-6 text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-sand/30 rounded-full flex items-center justify-center text-earth font-serif text-2xl font-bold">
                TA
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest">Technical & Diligence Team</h4>
                <p className="text-xs text-earth uppercase tracking-wider font-semibold">Professional Consultants</p>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Licensed Kenyan legal counsel, quantity surveyors, hydrologists, and NEMA environmental impact consultants.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-evergreen text-ivory text-center border-t border-sand/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Join Our Development Journey
            </h2>
            <p className="text-sm text-ivory/80 max-w-xl mx-auto">
              Learn how you can participate in bringing Jonik Ndovu Farm to fruition as a capital partner or strategic hospitality collaborator.
            </p>
            <div className="pt-2">
              <Link
                href="/investor-access"
                className="luxury-btn-gold text-xs !py-3 !px-7 tracking-widest inline-flex items-center space-x-2"
              >
                <span>Request Investor Access</span>
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
