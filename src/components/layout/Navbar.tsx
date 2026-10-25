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
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On client-side route changes, ensure any lingering focus is cleanly cleared so skip link never pops up
  useEffect(() => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

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
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? "bg-evergreen/95 backdrop-blur-md shadow-elevated border-b border-sand/20 py-3"
            : "bg-gradient-to-b from-evergreen/95 via-evergreen/60 to-transparent py-4 sm:py-5"
        }`}
      >
        {/* Accessible Skip Link — in-flow banner that pushes nav items down when active; completely hidden and zero-height normally */}
        <a
          href="#main-content"
          onClick={(e) => {
            e.currentTarget.blur();
            const target = document.getElementById("main-content");
            if (target) {
              target.focus();
            }
          }}
          className="sr-only focus-visible:not-sr-only focus-visible:flex focus-visible:items-center focus-visible:justify-center focus-visible:gap-2 focus-visible:w-full focus-visible:py-2 focus-visible:px-4 focus-visible:bg-earth focus-visible:text-white focus-visible:text-xs focus-visible:font-semibold focus-visible:tracking-[0.25em] focus-visible:uppercase focus-visible:border-b focus-visible:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:mb-2.5 transition-all"
        >
          <span>Skip to main content</span>
          <span aria-hidden="true">&darr;</span>
        </a>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 xl:gap-8">
            {/* Brand Wordmark — locked on single line, shrink-0 prevents awkward wrapping */}
            <Link
              href="/"
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sand p-1 shrink-0"
            >
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-wider text-ivory group-hover:text-sand transition-colors whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                JONIK NDOVU FARM
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-sand/90 uppercase font-sans whitespace-nowrap -mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Segera · Laikipia · Kenya
              </span>
            </Link>

            {/* Desktop Navigation — responsive spacing & font size to prevent squishing */}
            <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-6 text-[11px] xl:text-xs font-medium tracking-wider xl:tracking-widest uppercase">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1.5 transition-colors border-b-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
                      isActive
                        ? "text-sand font-semibold border-sand"
                        : "text-ivory/90 hover:text-sand border-transparent hover:border-sand/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions — harmonized 40px height, aligned icons & text */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0">
              <Link
                href="/login"
                className="h-10 px-3.5 border border-sand/40 hover:border-sand text-sand hover:text-ivory bg-evergreen/40 hover:bg-evergreen/80 backdrop-blur-sm transition-all duration-200 text-xs uppercase tracking-widest font-medium flex items-center space-x-1.5 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-sand/90" />
                <span>Portal Login</span>
              </Link>

              <Link
                href="/investor-access"
                className="h-10 px-4 bg-earth hover:bg-earth-dark text-white border border-earth hover:border-earth-dark shadow-sm transition-all duration-200 text-xs uppercase tracking-widest font-semibold flex items-center space-x-1.5 active:scale-[0.99]"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Investor Access</span>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center space-x-2.5">
              <Link
                href="/login"
                className="text-xs uppercase tracking-wider text-sand px-2.5 py-1.5 border border-sand/40 bg-evergreen/40 backdrop-blur-sm flex items-center space-x-1"
              >
                <Lock className="w-3 h-3" />
                <span>Portal</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-ivory hover:text-sand transition-colors border border-sand/20 bg-evergreen/40"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-evergreen/98 backdrop-blur-lg border-b border-sand/30 px-5 pt-4 pb-8 space-y-4 shadow-elevated animate-fade-in">
            <nav className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs tracking-widest uppercase text-ivory/90 hover:text-sand py-2.5 border-b border-sand/10"
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
