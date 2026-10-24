"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Lock, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Vision", href: "/vision" },
    { label: "The Experience", href: "/experience" },
    { label: "Destination", href: "/destination" },
    { label: "About", href: "/about" },
    { label: "Investment", href: "/investment" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-earth focus:text-white focus:outline-none focus:ring-2 focus:ring-white text-xs uppercase tracking-widest font-semibold"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? "bg-evergreen/95 backdrop-blur-md shadow-elevated border-b border-sand/20 py-3.5"
            : "bg-gradient-to-b from-evergreen/80 via-evergreen/30 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Wordmark */}
            <Link href="/" className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand p-1">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-ivory group-hover:text-sand transition-colors">
              JONIK NDOVU FARM
            </span>
            <span className="text-[10px] tracking-[0.25em] text-sand/80 uppercase font-sans -mt-0.5">
              Segera · Laikipia · Kenya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-sand border-b border-sand"
                      : "text-ivory/85 hover:text-sand"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-xs uppercase tracking-widest text-sand hover:text-white transition-colors flex items-center space-x-1.5 px-3 py-2 border border-sand/30 hover:border-sand"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Login</span>
            </Link>

            <Link
              href="/investor-access"
              className="luxury-btn-gold text-xs !py-2.5 !px-5 tracking-widest shadow-sm flex items-center space-x-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Investor Access</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link
              href="/login"
              className="text-xs uppercase tracking-wider text-sand px-2 py-1 border border-sand/30"
            >
              Portal
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-ivory hover:text-sand transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-evergreen border-b border-sand/30 px-5 pt-4 pb-8 space-y-4 shadow-elevated">
          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm tracking-widest uppercase text-ivory/90 hover:text-sand py-2 border-b border-sand/10"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-sand/50" />
              </Link>
            ))}
          </nav>

          <div className="pt-4 flex flex-col space-y-3">
            <Link
              href="/investor-access"
              onClick={() => setIsMobileMenuOpen(false)}
              className="luxury-btn-gold text-xs text-center !py-3 tracking-widest flex items-center justify-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Request Investor Access</span>
            </Link>

            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="luxury-btn-outline !text-ivory !border-sand/40 hover:!border-sand text-xs text-center !py-2.5 tracking-widest flex items-center justify-center space-x-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In to Investor Portal</span>
            </Link>
          </div>
        </div>
      )}
      </header>
    </>
  );
}
