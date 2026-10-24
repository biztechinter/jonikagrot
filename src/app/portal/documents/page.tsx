"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DiligenceDocument, DocumentCategory, User } from "@/types";
import {
  FileText,
  Download,
  Lock,
  Search,
  Filter,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export default function DocumentLibraryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<(DiligenceDocument & { userHasAccess: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/portal/documents")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setDocuments(data.documents);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    "Investment Overview",
    "Site and Development",
    "Financial Information",
    "Due Diligence",
    "Transaction and Investment Process",
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getFileIcon = (filetype: string) => {
    if (filetype === "XLSX") return <FileSpreadsheet className="w-5 h-5 text-emerald-700" />;
    return <FileText className="w-5 h-5 text-earth" />;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-sand/50 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-earth font-bold block mb-1">
            Secure Repository
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Investor Document Library
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 max-w-xl leading-relaxed">
            Directly browse and download Version 3.0 diligence briefs, financial models, site plans, and transaction frameworks.
          </p>
        </div>

        {user && (
          <div className="text-left md:text-right">
            <span className="text-[11px] text-charcoal/50 block">Your Clearance Tier:</span>
            <span className="inline-block mt-1 px-3 py-1 bg-forest text-sand text-xs font-mono uppercase font-bold">
              {user.role === "admin"
                ? "Super Admin"
                : user.role === "approved"
                ? "Tier 3 Approved"
                : "Tier 2 Registered"}
            </span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 border border-sand/40 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or filename..."
              className="w-full pl-10 pr-4 py-2 bg-ivory/50 border border-sand/80 focus:border-forest focus:outline-none focus:bg-white text-xs sm:text-sm text-charcoal"
            />
          </div>

          {/* Category Dropdown (mobile) */}
          <div className="sm:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-ivory/50 border border-sand/80 text-xs text-charcoal focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pill Tabs (desktop) */}
        <div className="hidden sm:flex flex-wrap gap-2 pt-2 border-t border-sand/20 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-colors ${
                selectedCategory === cat
                  ? "bg-forest text-sand font-bold shadow-sm"
                  : "bg-sand/20 text-charcoal hover:bg-sand/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document List Cards */}
      {loading ? (
        <div className="text-center py-12 text-xs text-charcoal/60">
          Loading document registry...
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="bg-white p-12 text-center border border-sand/40 text-charcoal/60 text-xs space-y-2">
          <p>No documents matched your search filter.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-earth font-semibold hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="luxury-card p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(doc.filetype)}
                    <span className="text-[10px] font-mono uppercase bg-sand/30 text-charcoal px-2 py-0.5 font-bold">
                      {doc.filetype} · {doc.filesize}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 font-bold ${
                      doc.confidentiality === "Tier 3 Approved"
                        ? "bg-earth text-white"
                        : "bg-forest text-sand"
                    }`}
                  >
                    {doc.confidentiality}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-forest mb-1.5 leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-charcoal/70 leading-relaxed mb-3">
                  {doc.description}
                </p>

                <div className="text-[11px] text-charcoal/50 flex items-center space-x-3 pt-2 border-t border-sand/15">
                  <span>Version: <strong>{doc.version}</strong></span>
                  <span>·</span>
                  <span>Date: {doc.date}</span>
                  <span>·</span>
                  <span>Category: {doc.category}</span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {doc.userHasAccess ? (
                  <a
                    href={`/api/portal/documents/${doc.id}/download`}
                    className="luxury-btn-primary w-full !py-2.5 text-xs tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Download className="w-3.5 h-3.5 text-sand" />
                    <span>Download File ({doc.filetype})</span>
                  </a>
                ) : (
                  <div className="p-3 bg-red-50/70 border border-red-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 text-red-800">
                      <Lock className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-[11px] font-semibold">
                        Requires Tier 3 Approval
                      </span>
                    </div>
                    <Link
                      href="/portal/messages"
                      className="text-[11px] font-bold text-earth hover:text-forest underline"
                    >
                      Request Tier Upgrade
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
