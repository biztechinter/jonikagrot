import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";

export const metadata = {
  title: "Privacy Policy | Jonik Ndovu Farm",
  description: "Privacy and data protection policy for Jonik Ndovu Farm visitors and registered investors.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 bg-ivory outline-none">
        <section className="bg-evergreen text-ivory py-16 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              Governance
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-ivory/70">
              Last Updated: October 2026
            </p>
          </div>
        </section>

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 border border-sand/50 shadow-card space-y-8 text-sm text-charcoal/80 leading-relaxed font-light">
            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">1. Information We Collect</h2>
              <p>
                We collect information provided directly by you when you request investor access, submit contact messages, or authenticate to our investor data room. This includes your name, business email address, organization name, country of domicile, investor category, investment interest, and any optional notes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">2. Purpose of Processing</h2>
              <p>
                Your information is processed strictly for:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-charcoal/70">
                <li>Evaluating and verifying accredited investor eligibility for Tier 2 and Tier 3 data room access.</li>
                <li>Communicating updates regarding Jonik Ndovu Farm's capital raising and development milestones.</li>
                <li>Complying with applicable Know-Your-Customer (KYC) and anti-money laundering (AML) regulatory standards.</li>
                <li>Maintaining secure audit logs of document downloads and data room interactions.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">3. Confidentiality and Security</h2>
              <p>
                We employ industry-standard encryption, role-based access control, and server-side authorization to protect your personal and commercial data. We never sell, rent, or share your contact information with unaffiliated third parties.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-3">4. Contact & Inquiries</h2>
              <p>
                For questions regarding your data or to request deletion of your investor profile, please email{" "}
                <span className="font-medium text-forest">{PROJECT_FACTS.contactPlaceholders.email}</span>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
