import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { PROJECT_FACTS } from "@/data/projectData";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 pt-24 pb-20 bg-ivory flex items-center justify-center outline-none">
        <div className="max-w-md w-full mx-auto px-4 py-8">
          <div className="luxury-card p-8 sm:p-10 border-sand/60 text-center space-y-6">
            <div className="w-12 h-12 bg-forest/10 text-forest mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6 text-earth" />
            </div>

            <h1 className="font-serif text-2xl font-bold text-forest">
              Password Assistance
            </h1>

            <p className="text-xs text-charcoal/70 leading-relaxed font-light">
              For security compliance and identity protection within the Jonik Ndovu Farm data room, credential resets are handled via our registered administrative security channel.
            </p>

            <div className="p-4 bg-sand/20 border border-sand/40 text-xs text-charcoal/80 space-y-2 text-left">
              <div className="flex items-center space-x-2 text-forest font-semibold">
                <Mail className="w-4 h-4 text-earth" />
                <span>Contact Security Officer:</span>
              </div>
              <p className="font-mono text-[11px]">{PROJECT_FACTS.contactPlaceholders.email}</p>
            </div>

            <div className="pt-2">
              <Link
                href="/login"
                className="luxury-btn-outline w-full text-xs !py-3 tracking-widest inline-flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
