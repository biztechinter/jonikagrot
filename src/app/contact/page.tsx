"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECT_FACTS } from "@/data/projectData";
import { Mail, MapPin, Phone, CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeyPot: "", // spam protection
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeyPot) {
      // Spam detected
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send message.");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-24 bg-ivory">
        <section className="bg-evergreen text-ivory py-16 border-b border-sand/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand block">
              Inquiries
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-ivory">
              Connect With Us
            </h1>
            <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto leading-relaxed font-light">
              We welcome dialogue with prospective investors, hospitality operators, conservation partners, and future guests.
            </p>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information & Context */}
            <div className="space-y-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-earth block mb-2">
                  Headquarters & Site
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest mb-4">
                  Jonik Ndovu Farm
                </h3>
                <p className="text-sm text-charcoal/75 leading-relaxed font-light">
                  Direct inquiries are managed through our representative communications desk and reviewed by the project sponsors.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-sand/30 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-forest block">Location</span>
                    <p className="text-xs text-charcoal/70">{PROJECT_FACTS.location.region}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-forest block">Email</span>
                    <p className="text-xs text-charcoal/70">{PROJECT_FACTS.contactPlaceholders.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-earth flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-forest block">Telephone</span>
                    <p className="text-xs text-charcoal/70">{PROJECT_FACTS.contactPlaceholders.phone}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border border-sand/40 text-xs text-charcoal/70 space-y-2">
                <span className="font-semibold text-forest uppercase tracking-wider block">
                  Investor Inquiries:
                </span>
                <p>
                  For capital discussions, please use the dedicated{" "}
                  <a href="/investor-access" className="underline text-earth font-semibold hover:text-forest">
                    Investor Access portal
                  </a>{" "}
                  for expedited accreditation and data room clearance.
                </p>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-2 luxury-card p-8 sm:p-10 border-sand/60">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-earth mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-forest">
                    Message Successfully Dispatched
                  </h3>
                  <p className="text-sm text-charcoal/75 max-w-md mx-auto">
                    Thank you for reaching out. A representative of the Jonik Ndovu Farm project team will review your message and reply promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "", honeyPot: "" });
                    }}
                    className="luxury-btn-outline text-xs !py-2.5 !px-5 tracking-widest mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                  <h3 className="font-serif text-2xl font-bold text-forest pb-4 border-b border-sand/30">
                    Send a Direct Message
                  </h3>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Honeypot anti-spam field */}
                  <input
                    type="text"
                    value={formData.honeyPot}
                    onChange={(e) => setFormData({ ...formData, honeyPot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Hospitality Partnership or Media Inquiry"
                      className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="luxury-btn-primary w-full sm:w-auto !py-3.5 !px-8 text-xs tracking-widest inline-flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5 text-sand" />
                    <span>{isSubmitting ? "Sending Message..." : "Submit Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
