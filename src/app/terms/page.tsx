import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";

export const metadata = {
  title: "Terms of Access | Jonik Ndovu Farm",
  description: "Terms of portal access, confidentiality agreements, and diligence conditions for Jonik Ndovu Farm.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-24 bg-ivory">
        <section className="bg-evergreen text-ivory py-16 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              Legal & Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              Terms of Portal Access & Confidentiality
            </h1>
            <p className="text-xs sm:text-sm text-ivory/70">
              Last Updated: October 2026
            </p>
          </div>
        </section>

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 border border-sand/50 shadow-card space-y-8 text-sm text-charcoal/80 leading-relaxed font-light">
            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">1. Non-Reliance & No Securities Offer</h2>
              <p>
                The materials contained within this website and the Jonik Ndovu Farm Investor Portal are prepared solely for confidential discussion and evaluation. Nothing on this website constitutes a prospectus, an offer of securities, or an invitation to subscribe for shares in Kenya or any other jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">2. Confidentiality Undertaking</h2>
              <p>
                By accessing Tier 2 and Tier 3 materials, you acknowledge that all architectural concepts, financial models, site summaries, and diligence files are confidential proprietary property of Jonik Ndovu Farm. You agree not to distribute, publish, or disclose any confidential information to third parties without prior written consent from the project sponsors.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">3. Independent Due Diligence</h2>
              <p>
                Projections, models, and development concepts are preliminary working drafts. Prospective investors must conduct their own independent technical, financial, and legal due diligence before entering into binding agreements.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">4. Revocation of Access</h2>
              <p>
                The project management team reserves the right to suspend or revoke data room access at any time without notice.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
