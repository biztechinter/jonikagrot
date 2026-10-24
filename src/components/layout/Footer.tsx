import Link from "next/link";
import { PROJECT_FACTS } from "@/data/projectData";
import { Shield, Lock, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-evergreen text-ivory border-t border-sand/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-sand/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-wider text-ivory">
                JONIK NDOVU FARM
              </span>
              <span className="block text-[11px] tracking-[0.25em] text-sand/80 uppercase font-sans mt-0.5">
                Segera · Laikipia County · Kenya
              </span>
            </Link>

            <p className="text-sm text-ivory/70 max-w-md leading-relaxed">
              Envisioning a distinctive hospitality-led agro-tourism destination in Laikipia, combining boutique accommodation, farm-to-table culinary experiences, and landscape stewardship.
            </p>

            <div className="pt-2 text-xs text-sand/90 space-y-1.5">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-earth" />
                <span>{PROJECT_FACTS.location.region}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-earth" />
                <span>{PROJECT_FACTS.contactPlaceholders.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-earth" />
                <span>{PROJECT_FACTS.contactPlaceholders.phone}</span>
              </div>
            </div>
          </div>

          {/* Destination & Vision Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-sand">
              Destination
            </h4>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li>
                <Link href="/vision" className="hover:text-sand transition-colors">
                  The Vision
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-sand transition-colors">
                  The Experience
                </Link>
              </li>
              <li>
                <Link href="/destination" className="hover:text-sand transition-colors">
                  Segera & Laikipia
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sand transition-colors">
                  About & Stewardship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sand transition-colors">
                  Direct Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Investment & Diligence Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-sand">
              Investment
            </h4>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li>
                <Link href="/investment" className="hover:text-sand transition-colors">
                  Investment Proposition
                </Link>
              </li>
              <li>
                <Link href="/investor-access" className="hover:text-sand transition-colors">
                  Request Tiered Access
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-sand transition-colors flex items-center space-x-1">
                  <span>Sign In to Portal</span>
                  <ExternalLink className="w-3 h-3 text-sand/60" />
                </Link>
              </li>
              <li>
                <Link href="/portal/financials" className="hover:text-sand transition-colors">
                  Financial Model Summary
                </Link>
              </li>
              <li>
                <Link href="/portal/due-diligence" className="hover:text-sand transition-colors">
                  Due Diligence Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Tiered Access Callout */}
          <div className="space-y-3 bg-forest/40 p-5 border border-sand/20">
            <div className="flex items-center space-x-2 text-sand">
              <Shield className="w-4 h-4 text-earth" />
              <h4 className="text-xs font-semibold tracking-wider uppercase">
                Investor Portal
              </h4>
            </div>
            <p className="text-xs text-ivory/75 leading-relaxed">
              Tier 2 and Tier 3 access offers verified financial models, legal title search records, and environmental documents under NDA.
            </p>
            <div className="pt-2">
              <Link
                href="/investor-access"
                className="inline-flex items-center justify-center w-full px-3 py-2 text-xs uppercase tracking-wider font-medium text-white bg-earth hover:bg-earth-dark transition-colors"
              >
                Apply for Access
              </Link>
            </div>
          </div>
        </div>

        {/* Factual Disclaimer */}
        <div className="pt-8 pb-6 border-b border-sand/10 text-[11px] text-ivory/60 leading-relaxed">
          <p className="font-semibold text-sand/80 uppercase tracking-wider mb-1">
            Important Information & Investment Disclaimer:
          </p>
          <p>{PROJECT_FACTS.disclaimer}</p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Jonik Ndovu Farm. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-ivory/70">
            <Link href="/privacy" className="hover:text-sand transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-sand transition-colors">
              Terms of Access
            </Link>
            <Link href="/login" className="hover:text-sand transition-colors flex items-center space-x-1">
              <Lock className="w-3 h-3 text-earth" />
              <span>Restricted Data Room</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
